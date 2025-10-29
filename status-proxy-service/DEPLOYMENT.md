# Deployment Guide

Quick guide to deploy the Zama Status Proxy Service to Vercel.

## Prerequisites

- GitHub/GitLab account (for Git-based deployment)
- Vercel account ([vercel.com](https://vercel.com))
- Node.js 18+ (for local testing)

## Deployment Steps

### Option 1: Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Navigate to the proxy service directory
cd status-proxy-service

# 4. Deploy to production
vercel --prod
```

After deployment, Vercel will provide you with a URL like:
```
https://zama-status-proxy.vercel.app
```

### Option 2: Vercel Dashboard (Recommended for Teams)

1. **Push to Git**
   ```bash
   git add status-proxy-service/
   git commit -m "Add status proxy service"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git repository
   - Click "Import"

3. **Configure Project**
   - **Root Directory**: `status-proxy-service`
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - Click "Deploy"

4. **Get Your URL**
   - After deployment completes, copy the production URL
   - Example: `https://zama-status-proxy.vercel.app`

### Option 3: GitHub Actions (Auto-deploy on Push)

Create `.github/workflows/deploy-proxy.yml`:

```yaml
name: Deploy Proxy Service

on:
  push:
    branches: [main]
    paths:
      - 'status-proxy-service/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm i -g vercel
      - run: vercel --token=${{ secrets.VERCEL_TOKEN }} --prod --yes
        working-directory: ./status-proxy-service
```

## Post-Deployment

### 1. Test Your Deployment

```bash
# Test status endpoint
curl https://your-deployment-url.vercel.app/api/status

# Test health endpoint
curl https://your-deployment-url.vercel.app/api/health

# Test CORS headers
curl -I https://your-deployment-url.vercel.app/api/status
```

Expected response headers:
```
Access-Control-Allow-Origin: *
Cache-Control: public, s-maxage=30, stale-while-revalidate=60
```

### 2. Update npm Package

After successful deployment, update the default API URL in the npm package:

**File:** `packages/core/src/hooks/useServiceStatus.ts`

```typescript
// Line ~10: Update DEFAULT_API_URL
const DEFAULT_API_URL = 'https://your-deployment-url.vercel.app/api/status';
```

### 3. Publish New Package Version

```bash
cd packages/core

# Update version
npm version minor  # or patch, depending on semantic versioning

# Build
pnpm build

# Publish to npm
npm publish

# Commit version bump
git add package.json
git commit -m "chore: update default API URL to deployed proxy"
git push
```

### 4. Update Documentation

Update the following files to reference the new default URL:

- `README.md` - Main project README
- `packages/core/README.md` - Package README
- `CORS_SOLUTIONS.md` - CORS solutions guide
- `example/README.md` - Example README

Search and replace:
```bash
# Old URL (for documentation purposes)
https://status.zama.ai/index.json

# New URL (as default)
https://your-deployment-url.vercel.app/api/status
```

## Custom Domain (Optional)

### Add Custom Domain in Vercel

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `status-api.zama.ai`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate provisioning (~5 minutes)

### Update Package with Custom Domain

```typescript
const DEFAULT_API_URL = 'https://status-api.zama.ai/api/status';
```

## Monitoring Setup

### 1. Enable Vercel Analytics

```bash
# Install Vercel Analytics
cd status-proxy-service
pnpm add @vercel/analytics
```

Update `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Set Up Uptime Monitoring

Use services like:
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://www.pingdom.com
- **Better Uptime**: https://betterstack.com/better-uptime

Monitor endpoint:
```
https://your-deployment-url.vercel.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### 3. Configure Alerts

Set up alerts for:
- HTTP 5xx errors
- Response time > 1000ms
- Downtime > 1 minute

## Performance Optimization

### Verify Caching

```bash
# First request (cache MISS)
curl -I https://your-url.vercel.app/api/status

# Second request within 30s (cache HIT)
curl -I https://your-url.vercel.app/api/status
```

Check headers:
```
Cache-Control: public, s-maxage=30, stale-while-revalidate=60
X-Vercel-Cache: HIT  # Should show HIT on subsequent requests
```

### Multi-Region Deployment

Update `vercel.json` to deploy to multiple regions:

```json
{
  "regions": ["iad1", "sfo1", "fra1", "hnd1"]
}
```

Regions:
- `iad1` - US East (Washington, D.C.)
- `sfo1` - US West (San Francisco)
- `fra1` - Europe (Frankfurt)
- `hnd1` - Asia (Tokyo)

## Troubleshooting

### Deployment Fails

```bash
# Check build logs
vercel logs <deployment-url>

# Test build locally
cd status-proxy-service
pnpm install
pnpm build
```

### 500 Errors in Production

```bash
# View function logs
vercel logs --follow

# Common issues:
# 1. Betterstack API is down
# 2. Network timeout
# 3. Invalid JSON response
```

### CORS Still Not Working

```bash
# Verify CORS headers are present
curl -H "Origin: https://example.com" -I <your-url>/api/status

# Should include:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: GET, OPTIONS
```

### High Response Times

1. **Check region**: Ensure you're deploying to regions close to your users
2. **Verify caching**: Cache should be working after first request
3. **Check Betterstack API**: The upstream API might be slow

```bash
# Test upstream API directly
time curl https://status.zama.ai/index.json

# Test proxy
time curl <your-url>/api/status
```

## Security Checklist

- ✅ CORS headers configured correctly
- ✅ Rate limiting (optional, add if needed)
- ✅ Security headers enabled
- ✅ HTTPS only (enforced by Vercel)
- ✅ No sensitive data in logs
- ✅ Environment variables secured (if any)

## Cost Estimation

### Vercel Pricing (as of 2024)

**Hobby Plan (Free):**
- 100 GB bandwidth/month
- Unlimited API requests
- Global edge network
- SSL included

**Pro Plan ($20/month):**
- 1 TB bandwidth/month
- Advanced analytics
- Team collaboration
- Priority support

**Estimated Usage for Status Proxy:**
- Request size: ~10 KB
- With 30s cache: ~120 requests/hour = ~86,400/month
- Bandwidth: ~864 MB/month
- **Cost: $0** (well within free tier)

## Next Steps

After successful deployment:

1. ✅ Test all endpoints
2. ✅ Update npm package default URL
3. ✅ Publish new package version
4. ✅ Update documentation
5. ✅ Set up monitoring
6. ✅ Announce to users

## Support

- 📧 Email: support@zama.ai
- 🐛 Issues: [GitHub Issues](https://github.com/zama-ai/service-status-monitor/issues)
- 📚 Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

---

Made with ❤️ by the Zama team
