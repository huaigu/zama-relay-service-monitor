# Service Status Monitor - Live Demo

This is a Next.js 15 application demonstrating the usage of `zama-service-status-monitor` package.

## ✅ No Special Configuration Needed!

This example demonstrates the `zama-service-status-monitor` package using the default configuration. The package now includes a hosted proxy service, so:

✅ **No API routes needed** - The example no longer requires local proxy routes
✅ **Works immediately** - Just install and use the component
✅ **No CORS issues** - The hosted proxy handles everything

The component automatically fetches data from `https://zama-relay-service-monitor-example.vercel.app/api/status`.

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
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

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
    "zama-service-status-monitor": "workspace:*"
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
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main demo page
│   └── globals.css         # Global styles + Tailwind
├── public/                 # Static assets
├── package.json
├── next.config.js          # Next.js config with package transpilation
├── tailwind.config.js      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

### Component Usage

Simple! No special configuration needed:

```tsx
<ServiceStatusBadge
  onStatusChange={handleStatusChange}
  style={darkMode ? { /* dark mode styles */ } : {}}
/>
```

The component automatically uses the hosted proxy service.

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
- **Package**: zama-service-status-monitor (workspace)

## 🔗 Links

- [Package README](../packages/core/README.md)
- [Root README](../README.md)
- [Zama Website](https://www.zama.ai)

---

Built with Next.js 15 and ❤️
