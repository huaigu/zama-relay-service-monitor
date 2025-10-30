# Zama Status Proxy Service

Lightweight Next.js proxy service for the Zama Betterstack status API. This service provides a CORS-enabled endpoint that can be used by the `zama-service-status-monitor` npm package and any frontend application.

## 🎯 Purpose

The Betterstack status API (`https://status.zama.ai/index.json`) does not include CORS headers, which prevents direct browser requests. This proxy service:

- ✅ Bypasses CORS restrictions
- ✅ Adds proper CORS headers for cross-origin access
- ✅ Implements 30-second caching for performance
- ✅ Runs on Vercel Edge Runtime for global low-latency
- ✅ Provides health check endpoint for monitoring
- ✅ Includes security headers and error handling

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Test the endpoint
curl http://localhost:3000/api/status
```

### Build for Production

```bash
pnpm build
pnpm start
```

## 📚 API Endpoints

### `GET /api/status`

Proxies the Betterstack status API with CORS support.

**Response:**
```json
{
  "data": { ... },
  "included": [ ... ]
}
```

**Headers:**
- `Access-Control-Allow-Origin: *`
- `Cache-Control: public, s-maxage=30, stale-while-revalidate=60`

**Caching:**
- Responses are cached for 30 seconds
- Stale-while-revalidate for 60 seconds
- Reduces load on Betterstack API

### `GET /api/health`

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "zama-status-proxy",
  "version": "1.0.0",
  "uptime": "3600s"
}
```

## 🌐 Deployment to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Select `status-proxy-service` as root directory
5. Click "Deploy"

### Option 3: GitHub Integration

1. Push to GitHub
2. Connect repository to Vercel
3. Set project root directory to `status-proxy-service`
4. Deploy automatically on push

## 🔧 Configuration

### Environment Variables

Currently, no environment variables are required. All configuration is in the code.

If you need to add rate limiting or API keys in the future:

```env
# .env.local
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000
```

### Regions

The service is configured to run in `iad1` (US East) by default. You can change this in `vercel.json`:

```json
{
  "regions": ["iad1", "sfo1", "fra1"]
}
```

Available regions:
- `iad1` - Washington, D.C., USA
- `sfo1` - San Francisco, USA
- `fra1` - Frankfurt, Germany
- See [Vercel Regions](https://vercel.com/docs/concepts/edge-network/regions) for more

## 📊 Performance

### Edge Runtime

This service uses Vercel Edge Runtime for:
- ⚡ Global distribution
- 🚀 Sub-100ms response times
- 📈 Auto-scaling
- 💰 Cost-effective (no cold starts)

### Caching Strategy

```typescript
// Next.js Data Cache (30s revalidation)
fetch(url, { next: { revalidate: 30 } });

// HTTP Cache Headers (CDN layer)
'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'
```

**Result:**
- First request: ~200-300ms (fetches from Betterstack)
- Cached requests: ~50-100ms (served from edge cache)
- Stale requests: ~50ms (serves cached, revalidates in background)

## 🔒 Security

### Headers

The service implements security headers:

```javascript
{
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Access-Control-Allow-Origin': '*'
}
```

### Rate Limiting (Future)

Consider adding rate limiting for production:

```typescript
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 m'),
});
```

## 📈 Monitoring

### Vercel Analytics

Enable in Vercel dashboard:
- Request metrics
- Response times
- Error rates
- Geographic distribution

### Custom Logging

```typescript
console.log('[Status API] Request from:', req.headers.get('x-forwarded-for'));
console.log('[Status API] Cache status:', 'HIT' | 'MISS');
```

### Health Checks

Use `/api/health` for:
- Uptime monitoring (UptimeRobot, Pingdom, etc.)
- Load balancer health checks
- Internal monitoring systems

## 🧪 Testing

### Local Testing

```bash
# Test status endpoint
curl http://localhost:3000/api/status | jq

# Test health endpoint
curl http://localhost:3000/api/health

# Test CORS headers
curl -I http://localhost:3000/api/status
```

### Production Testing

```bash
# Replace with your deployed URL
export API_URL=https://your-proxy.vercel.app

# Test status
curl $API_URL/api/status | jq

# Test CORS
curl -H "Origin: https://example.com" -I $API_URL/api/status
```

## 📦 Integration with npm Package

After deployment, update the npm package to use this proxy URL:

**File:** `packages/core/src/hooks/useServiceStatus.ts`

```typescript
// Change default apiUrl from:
const DEFAULT_API_URL = 'https://status.zama.ai/index.json';

// To your deployed URL:
const DEFAULT_API_URL = 'https://your-proxy.vercel.app/api/status';
```

Then publish a new version of the package:

```bash
cd packages/core
npm version minor
npm publish
```

## 🚨 Troubleshooting

### CORS errors still occurring

- Verify CORS headers are present: `curl -I <your-url>/api/status`
- Check Vercel function logs for errors
- Ensure you're using the correct proxy URL

### High response times

- Check Vercel region configuration
- Verify caching is working (should see cache headers)
- Consider adding more edge regions

### Rate limiting issues

- Monitor Betterstack API rate limits
- Implement local rate limiting if needed
- Consider caching for longer periods (60s+)

### 500 errors

- Check Vercel function logs: `vercel logs <deployment-url>`
- Verify Betterstack API is accessible
- Check network connectivity

## 📄 License

MIT © [Zama](https://www.zama.ai)

## 🔗 Links

- [Zama Website](https://www.zama.ai)
- [npm Package](https://www.npmjs.com/package/zama-service-status-monitor)
- [Main Repository](../)
- [Vercel Documentation](https://vercel.com/docs)

---

Made with ❤️ by the Zama team
