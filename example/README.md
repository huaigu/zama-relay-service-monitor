# Service Status Monitor - Live Demo

This is a Next.js 15 application demonstrating the usage of `@zama-ai/service-status-monitor` package.

## ⚠️ Important: CORS Proxy Requirement

**This example uses a Next.js API route as a proxy** to work around CORS limitations of the Betterstack API.

The Betterstack status API (`https://status.zama.ai/index.json`) does not include CORS headers, which means direct browser requests will fail with:
```
Access to fetch at 'https://status.zama.ai/index.json' from origin 'http://localhost:3000'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

### Solution: Server-Side Proxy

This example implements a Next.js API route (`/api/status/route.ts`) that:
- Fetches status data server-side (no CORS restrictions)
- Adds appropriate CORS headers to the response
- Caches responses for 30 seconds to improve performance
- Returns data to the client

**For other frameworks**, you'll need similar backend proxy solutions. See the [CORS Solutions Guide](../CORS_SOLUTIONS.md) for framework-specific implementations.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- pnpm 8+

### Installation

From the root of the monorepo:

```bash
pnpm install
```

### Development

Run the example app with hot reload:

```bash
# From root directory
pnpm dev:example

# Or from this directory
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the demo.

## ✨ Features Demonstrated

This example showcases:

- ✅ **Basic Usage**: Default badge configuration
- ✅ **Live Status**: Real-time Zama Relayer - Testnet status
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Status Callbacks**: Log status changes in real-time
- ✅ **Code Examples**: View implementation code for each feature
- ✅ **API Documentation**: Complete props reference
- ✅ **Responsive Design**: Mobile and desktop layouts

## 🎨 Customization Examples

### Basic Badge

```tsx
import { ServiceStatusBadge } from '@zama-ai/service-status-monitor';
import '@zama-ai/service-status-monitor/dist/style.css';

export default function App() {
  return <ServiceStatusBadge />;
}
```

### With Dark Mode

```tsx
<ServiceStatusBadge
  style={{
    '--zss-badge-bg': '#1f2937',
    '--zss-badge-text-color': '#ffffff',
  }}
/>
```

### With Status Callback

```tsx
<ServiceStatusBadge
  onStatusChange={(status) => {
    console.log('Status changed to:', status);
  }}
/>
```

## 📦 Package Development

This example is part of a monorepo and uses the local package via workspace reference:

```json
{
  "dependencies": {
    "@zama-ai/service-status-monitor": "workspace:*"
  }
}
```

Changes to the package in `../packages/core/src` will automatically trigger:
1. Package rebuild (via Vite watch mode)
2. Example app hot reload (via Next.js HMR)

## 🏗️ Project Structure

```
example/
├── app/
│   ├── api/
│   │   └── status/
│   │       └── route.ts    # ⭐ Server-side proxy for CORS
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main demo page
│   └── globals.css         # Global styles + Tailwind
├── public/                 # Static assets
├── package.json
├── next.config.js          # Next.js config with package transpilation
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

### API Route Implementation

The `/api/status/route.ts` is a critical component that enables the component to work:

```typescript
export async function GET() {
  const response = await fetch('https://status.zama.ai/index.json', {
    next: { revalidate: 30 }, // Cache for 30 seconds
  });
  const data = await response.json();

  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
    },
  });
}
```

The component then uses this proxy endpoint:
```tsx
<ServiceStatusBadge
  apiUrl="/api/status"  // ← Uses proxy instead of direct API
  onStatusChange={handleStatusChange}
/>
```

## 🚀 Deployment

This example can be deployed to Vercel:

```bash
# From root directory
vercel --prod
```

The Vercel configuration is in the root `vercel.json` file.

## 📝 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package**: @zama-ai/service-status-monitor (workspace)

## 🔗 Links

- [Package README](../packages/core/README.md)
- [Root README](../README.md)
- [Zama Website](https://www.zama.ai)

---

Built with Next.js 15 and ❤️
