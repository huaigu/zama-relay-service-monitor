# CORS Solutions Guide

## Why Do You Need This?

The Betterstack status API (`https://status.zama.ai/index.json`) does not include CORS (Cross-Origin Resource Sharing) headers. This means browsers will block direct requests from your web application with an error like:

```
Access to fetch at 'https://status.zama.ai/index.json' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Solution**: Proxy the API requests through your backend, which is not subject to CORS restrictions.

## Framework-Specific Solutions

### 1. Next.js (App Router) ✅ Recommended

Next.js API routes run on the server, bypassing CORS restrictions entirely.

#### Step 1: Create API Route

Create `app/api/status/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://status.zama.ai/index.json', {
      headers: {
        'Accept': 'application/json',
      },
      // Cache for 30 seconds to avoid rate limits
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return with CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('[API Route] Error fetching status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service status' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
```

#### Step 2: Use the Proxy

```tsx
import { ServiceStatusBadge } from '@zama-ai/service-status-monitor';
import '@zama-ai/service-status-monitor/dist/style.css';

export default function Page() {
  return (
    <ServiceStatusBadge
      apiUrl="/api/status"
      serviceName="Relayer - Testnet"
    />
  );
}
```

**Benefits**:
- ✅ Server-side caching (30s revalidation)
- ✅ Error handling
- ✅ No CORS issues
- ✅ Works in production

---

### 2. Next.js (Pages Router)

#### Step 1: Create API Route

Create `pages/api/status.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const response = await fetch('https://status.zama.ai/index.json', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60');
    res.status(200).json(data);
  } catch (error) {
    console.error('[API] Error fetching status:', error);
    res.status(500).json({ error: 'Failed to fetch service status' });
  }
}
```

#### Step 2: Use the Proxy

```tsx
// pages/_app.tsx
import { ServiceStatusBadge } from '@zama-ai/service-status-monitor';
import '@zama-ai/service-status-monitor/dist/style.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ServiceStatusBadge apiUrl="/api/status" />
    </>
  );
}
```

---

### 3. Create React App (CRA)

CRA provides a built-in proxy feature for development.

#### Development Setup

Add to `package.json`:

```json
{
  "proxy": "https://status.zama.ai"
}
```

Then use:

```tsx
<ServiceStatusBadge apiUrl="/index.json" />
```

#### Production Setup

For production, you need a backend proxy. Here's an Express example:

**server.js:**

```javascript
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// API proxy endpoint
app.get('/api/status', async (req, res) => {
  try {
    const response = await fetch('https://status.zama.ai/index.json');
    const data = await response.json();

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Cache-Control', 'public, max-age=30');
    res.json(data);
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ error: 'Failed to fetch status' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Update component:

```tsx
<ServiceStatusBadge apiUrl="/api/status" />
```

---

### 4. Vite + React

Vite provides powerful proxy configuration for development.

#### Development Setup

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/status': {
        target: 'https://status.zama.ai',
        changeOrigin: true,
        rewrite: (path) => '/index.json',
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
```

Then use:

```tsx
<ServiceStatusBadge apiUrl="/api/status" />
```

#### Production Setup

Similar to CRA, you need a backend proxy for production. See Express example above or use serverless functions.

---

### 5. Express Backend

If you have a separate Express backend:

```javascript
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/api/status', async (req, res) => {
  try {
    const response = await fetch('https://status.zama.ai/index.json', {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Cache for 30 seconds
    res.header('Cache-Control', 'public, max-age=30');
    res.json(data);
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ error: 'Failed to fetch service status' });
  }
});

app.listen(3001, () => {
  console.log('API server running on port 3001');
});
```

Frontend usage:

```tsx
<ServiceStatusBadge apiUrl="http://localhost:3001/api/status" />
```

---

### 6. Vercel Serverless Functions

Create `api/status.ts`:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.status(200).end();
    return;
  }

  try {
    const response = await fetch('https://status.zama.ai/index.json');
    const data = await response.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch status' });
  }
}
```

Usage:

```tsx
<ServiceStatusBadge apiUrl="/api/status" />
```

---

### 7. Netlify Functions

Create `netlify/functions/status.ts`:

```typescript
import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      body: '',
    };
  }

  try {
    const response = await fetch('https://status.zama.ai/index.json');
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=30',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch status' }),
    };
  }
};
```

Usage:

```tsx
<ServiceStatusBadge apiUrl="/.netlify/functions/status" />
```

---

### 8. AWS Lambda + API Gateway

Create Lambda function:

```javascript
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const response = await fetch('https://status.zama.ai/index.json');
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Cache-Control': 'public, max-age=30',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch status' }),
    };
  }
};
```

---

## Performance Optimization

### Caching Strategy

All proxy solutions should implement caching to reduce API calls:

```typescript
// Next.js
next: { revalidate: 30 }

// Express
res.header('Cache-Control', 'public, max-age=30');

// Serverless
headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate' }
```

### Error Handling

Always implement proper error handling:

```typescript
try {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  // ... handle success
} catch (error) {
  console.error('Error fetching status:', error);
  // ... return error response
}
```

### Rate Limiting

Consider implementing rate limiting if your application has high traffic:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 // limit each IP to 60 requests per windowMs
});

app.use('/api/status', limiter);
```

---

## Testing Your Proxy

### Test CORS Headers

```bash
curl -I http://localhost:3000/api/status
```

Should include:
```
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=30
```

### Test Response

```bash
curl http://localhost:3000/api/status | jq
```

Should return the Betterstack API response.

### Test from Browser

```javascript
fetch('/api/status')
  .then(res => res.json())
  .then(data => console.log('Status:', data))
  .catch(err => console.error('Error:', err));
```

---

## Troubleshooting

### Still Getting CORS Errors?

1. **Check proxy configuration** - Ensure your proxy is correctly configured
2. **Verify endpoint** - Make sure you're using `/api/status` (or your proxy path)
3. **Check headers** - Use browser DevTools Network tab to verify CORS headers
4. **Clear cache** - Browser cache might be serving old responses

### Proxy Not Working?

1. **Restart dev server** - Configuration changes require restart
2. **Check server logs** - Look for proxy errors in terminal
3. **Verify target URL** - Ensure `https://status.zama.ai/index.json` is accessible
4. **Test directly** - `curl https://status.zama.ai/index.json` should work

### Performance Issues?

1. **Add caching** - Implement 30-60s cache to reduce API calls
2. **Use CDN** - Cache responses at edge locations
3. **Monitor rate limits** - Betterstack may have rate limits

---

## Security Considerations

### Don't Expose Sensitive Data

If you're proxying other APIs (not just status), be careful not to expose:
- API keys
- Authentication tokens
- Internal service URLs

### Validate Requests

```typescript
// Example: Validate request origin
const allowedOrigins = ['https://yourdomain.com', 'http://localhost:3000'];
const origin = req.headers.origin;

if (allowedOrigins.includes(origin)) {
  res.setHeader('Access-Control-Allow-Origin', origin);
}
```

### Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
// Simple in-memory rate limiting
const requests = new Map();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60000; // 1 minute window

  const ipRequests = requests.get(ip) || [];
  const recentRequests = ipRequests.filter(time => time > windowStart);

  if (recentRequests.length >= 60) {
    return false; // Rate limit exceeded
  }

  recentRequests.push(now);
  requests.set(ip, recentRequests);
  return true;
}
```

---

## Complete Working Example

See the [example app](./example) for a complete, production-ready implementation with:
- ✅ Next.js 15 App Router
- ✅ Server-side API proxy
- ✅ Caching strategy
- ✅ Error handling
- ✅ TypeScript
- ✅ Dark mode support

Clone and run:

```bash
git clone https://github.com/zama-ai/service-status-monitor.git
cd service-status-monitor
pnpm install
pnpm dev
```

Visit http://localhost:3000 to see it in action!

---

## Need Help?

- 📧 Email: support@zama.ai
- 🐛 Issues: [GitHub Issues](https://github.com/zama-ai/service-status-monitor/issues)
- 📚 Documentation: [Package README](./packages/core/README.md)

---

Made with ❤️ by the Zama team
