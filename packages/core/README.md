# zama-service-status-monitor

[![npm version](https://img.shields.io/npm/v/zama-service-status-monitor.svg)](https://www.npmjs.com/package/zama-service-status-monitor)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Lightweight React component for monitoring Betterstack service status with real-time updates. Works with any React framework (Create React App, Vite, Next.js, Remix, Gatsby). Display your service status as a sleek badge in the corner of your application.

## ✨ Features

- 🪶 **Lightweight** - Less than 5KB gzipped
- ⚡ **Real-time Updates** - Auto-refresh with configurable intervals (30-300s)
- 🎨 **Customizable** - CSS variables for easy styling
- 🔧 **Flexible** - Monitor any Betterstack service by name
- 📱 **Responsive** - Works seamlessly on mobile and desktop
- ⚛️ **React 16.8+** - Hooks-based API
- 🌐 **Framework Agnostic** - Works with any React setup (CRA, Vite, Next.js, etc.)
- 📦 **TypeScript** - Full type definitions included
- 🎯 **Zero Dependencies** - Only peer dependencies on React

## 📦 Installation

```bash
npm install zama-service-status-monitor
```

or with yarn:

```bash
yarn add zama-service-status-monitor
```

or with pnpm:

```bash
pnpm add zama-service-status-monitor
```

## 🚀 Quick Start

### ✅ No Configuration Needed!

The package now includes a hosted proxy service, so you can use it immediately without any backend setup:

```tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

function App() {
  return (
    <div>
      <h1>My Application</h1>
      <ServiceStatusBadge />
    </div>
  );
}
```

That's it! The component will automatically fetch status data from the hosted proxy service at `https://zama-relay-service-monitor-example.vercel.app/api/status`.

### Next.js App Router

```tsx
// app/layout.tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ServiceStatusBadge />
      </body>
    </html>
  );
}
```

### Next.js Pages Router

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ServiceStatusBadge />
    </>
  );
}
```

### Create React App

```tsx
// src/App.tsx or src/App.jsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App</h1>
      </header>
      <ServiceStatusBadge />
    </div>
  );
}

export default App;
```

### Vite + React

```tsx
// src/App.tsx or src/App.jsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      <ServiceStatusBadge />
    </>
  );
}

export default App;
```

## 🎯 Framework Compatibility

This package works seamlessly with any React application:

- ✅ **Create React App** - Full support for CRA projects
- ✅ **Vite + React** - Optimized for Vite's fast build system
- ✅ **Next.js** - Both App Router and Pages Router
- ✅ **Remix** - Works with Remix's React-based architecture
- ✅ **Gatsby** - Compatible with Gatsby's React framework
- ✅ **Pure React** - Works with vanilla React (CDN or bundled)

All frameworks benefit from the hosted proxy service - no backend configuration required!

## 📚 API Reference

### `<ServiceStatusBadge />`

Main component to display the service status badge.

#### Props

| Prop              | Type                                                      | Default                                 | Description                                         |
| ----------------- | --------------------------------------------------------- | --------------------------------------- | --------------------------------------------------- |
| `serviceName`     | `string`                                                  | `"Relayer - Testnet"`                   | Name of the service to monitor                      |
| `apiUrl`          | `string`                                                  | `"https://zama-relay-service-monitor-example.vercel.app/api/status"` | Proxy API URL (CORS-enabled)     |
| `refreshInterval` | `number`                                                  | `60`                                    | Auto-refresh interval in seconds (30-300)           |
| `position`        | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'`                        | Badge position on screen                            |
| `className`       | `string`                                                  | `''`                                    | Custom CSS class name                               |
| `style`           | `React.CSSProperties`                                     | `{}`                                    | Inline styles (supports CSS variables)              |
| `onStatusChange`  | `(status: ServiceStatus) => void`                         | `undefined`                             | Callback fired when service status changes          |

#### ServiceStatus Type

```typescript
type ServiceStatus = 'operational' | 'degraded' | 'downtime' | 'maintenance';
```

## 🎨 Customization

### Using CSS Variables

The component uses CSS variables for easy customization. You can override these in your global CSS or inline styles:

```tsx
<ServiceStatusBadge
  style={{
    '--zss-badge-bg': '#1f2937',
    '--zss-badge-text-color': '#ffffff',
    '--zss-primary-color': '#3b82f6',
    '--zss-badge-border-radius': '12px',
  }}
/>
```

### Available CSS Variables

```css
:root {
  /* Badge */
  --zss-badge-size: 50px;
  --zss-badge-padding: 12px 16px;
  --zss-badge-border-radius: 24px;
  --zss-badge-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  --zss-badge-bg: #ffffff;
  --zss-badge-text-color: #374151;
  --zss-badge-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --zss-badge-font-size: 14px;
  --zss-badge-font-weight: 500;
  --zss-badge-z-index: 9999;

  /* Indicator */
  --zss-indicator-size: 10px;
  --zss-indicator-margin-right: 8px;

  /* Popover */
  --zss-popover-width: 320px;
  --zss-popover-bg: #ffffff;
  --zss-popover-border-radius: 12px;
  --zss-popover-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  --zss-popover-padding: 20px;

  /* Colors */
  --zss-primary-color: #3b82f6;
  --zss-text-color: #111827;
  --zss-text-secondary: #6b7280;
  --zss-border-color: #e5e7eb;
  --zss-hover-bg: #f3f4f6;
}
```

### Dark Mode Example

```css
/* In your global CSS */
[data-theme='dark'] {
  --zss-badge-bg: #1f2937;
  --zss-badge-text-color: #f9fafb;
  --zss-popover-bg: #111827;
  --zss-text-color: #f9fafb;
  --zss-text-secondary: #9ca3af;
  --zss-border-color: #374151;
  --zss-hover-bg: #1f2937;
}
```

## 🔧 Advanced Usage

### Monitor Different Services

```tsx
<ServiceStatusBadge serviceName="Gateway - Mainnet" />
```

### Custom Refresh Interval

```tsx
<ServiceStatusBadge
  refreshInterval={120} // Refresh every 2 minutes
/>
```

### Custom Position

```tsx
<ServiceStatusBadge position="top-left" />
```

### Status Change Callback

```tsx
function App() {
  const handleStatusChange = (status: ServiceStatus) => {
    console.log('Service status changed to:', status);

    // Send analytics event
    // Show notification
    // etc.
  };

  return (
    <ServiceStatusBadge onStatusChange={handleStatusChange} />
  );
}
```

### Using the Hook Directly

For advanced use cases, you can use the `useServiceStatus` hook directly:

```tsx
import { useServiceStatus } from 'zama-service-status-monitor';

function CustomStatusDisplay() {
  const { status, availability, isLoading, error, refresh } = useServiceStatus({
    serviceName: 'Relayer - Testnet',
    apiUrl: 'https://zama-relay-service-monitor-example.vercel.app/api/status',
    refreshInterval: 60,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Service Status: {status}</h2>
      <p>Uptime: {(availability * 100).toFixed(2)}%</p>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
}
```

## 🎯 Status Colors

The badge automatically displays different colors based on service status:

| Status        | Color  | Hex Code  | Meaning               |
| ------------- | ------ | --------- | --------------------- |
| operational   | 🟢 Green | `#10b981` | Service working normally |
| degraded      | 🟡 Yellow | `#f59e0b` | Service has issues    |
| downtime      | 🔴 Red   | `#ef4444` | Service is down       |
| maintenance   | ⚪ Gray  | `#6b7280` | Planned maintenance   |

## 📱 Responsive Design

The component is fully responsive and adapts to different screen sizes:

- Desktop: Full-sized badge with all information
- Mobile: Compact badge that scales appropriately
- Touch-friendly: Large tap targets for mobile users

## 🔒 TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  ServiceStatus,
  ServiceStatusBadgeProps,
  ServiceStatusData,
  BetterstackApiResponse,
} from 'zama-service-status-monitor';
```

## 🐛 Troubleshooting

### Badge not showing up

1. Make sure you've imported the CSS file:
   ```tsx
   import 'zama-service-status-monitor/dist/style.css';
   ```

2. Check if there are z-index conflicts. You can adjust the z-index:
   ```tsx
   <ServiceStatusBadge style={{ '--zss-badge-z-index': 10000 }} />
   ```

### CORS errors

✅ **No longer an issue!** The package uses a hosted proxy service by default at `https://zama-relay-service-monitor-example.vercel.app/api/status`, which handles all CORS requirements automatically.

**Custom Proxy (Optional):** If you want to use your own proxy service instead of the default hosted one, simply pass a custom `apiUrl` prop pointing to your backend endpoint:

```tsx
<ServiceStatusBadge apiUrl="https://your-backend.com/api/status" />
```

For self-hosting instructions, see the [status-proxy-service](../../status-proxy-service/) directory in the repository.

### Next.js SSR issues

The component is designed to be SSR-safe. However, if you encounter issues, you can dynamically import it:

```tsx
import dynamic from 'next/dynamic';

const ServiceStatusBadge = dynamic(
  () => import('zama-service-status-monitor').then(mod => mod.ServiceStatusBadge),
  { ssr: false }
);
```

### Refresh interval not working

- Make sure the interval is between 30-300 seconds
- The component automatically clamps values outside this range
- Check browser console for any errors

## 📄 License

MIT © [Zama](https://www.zama.ai)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- 📧 Email: support@zama.ai
- 🐛 Issues: [GitHub Issues](https://github.com/zama-ai/service-status-monitor/issues)
- 📚 Documentation: [GitHub Wiki](https://github.com/zama-ai/service-status-monitor/wiki)

## 🔗 Links

- [Zama](https://www.zama.ai)
- [Betterstack Status Pages](https://betterstack.com/better-uptime)
- [npm Package](https://www.npmjs.com/package/zama-service-status-monitor)

---

Made with ❤️ by the Zama team
