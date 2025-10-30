# Usage Examples

## Table of Contents
- [Basic Usage](#basic-usage)
- [Next.js Examples](#nextjs-examples)
- [Advanced Customization](#advanced-customization)
- [Using the Hook](#using-the-hook)
- [Status Monitoring](#status-monitoring)

## Basic Usage

### Simple React App

```tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

function App() {
  return (
    <div className="app">
      <h1>My Application</h1>
      <p>Welcome to my app!</p>

      {/* Status badge will appear in bottom-right corner */}
      <ServiceStatusBadge />
    </div>
  );
}

export default App;
```

## Next.js Examples

### App Router (app directory)

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'My App',
  description: 'My awesome application',
};

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

### Pages Router (_app.tsx)

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ServiceStatusBadge
        serviceName="Relayer - Testnet"
        refreshInterval={60}
        position="bottom-right"
      />
    </>
  );
}
```

### Client Component (App Router)

If you need to use it in a server component context:

```tsx
// app/components/StatusMonitor.tsx
'use client';

import { ServiceStatusBadge } from 'zama-service-status-monitor';

export function StatusMonitor() {
  return <ServiceStatusBadge />;
}
```

```tsx
// app/layout.tsx
import { StatusMonitor } from './components/StatusMonitor';
import 'zama-service-status-monitor/dist/style.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <StatusMonitor />
      </body>
    </html>
  );
}
```

## Advanced Customization

### Dark Mode

```tsx
// Using inline styles
<ServiceStatusBadge
  style={{
    '--zss-badge-bg': '#1f2937',
    '--zss-badge-text-color': '#f9fafb',
    '--zss-primary-color': '#60a5fa',
  }}
/>
```

```css
/* Or in your global CSS */
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

### Custom Position

```tsx
// Top left corner
<ServiceStatusBadge position="top-left" />

// Bottom left corner
<ServiceStatusBadge position="bottom-left" />

// Top right corner
<ServiceStatusBadge position="top-right" />

// Bottom right corner (default)
<ServiceStatusBadge position="bottom-right" />
```

### Custom Styling

```tsx
<ServiceStatusBadge
  className="my-custom-badge"
  style={{
    '--zss-badge-padding': '16px 24px',
    '--zss-badge-border-radius': '12px',
    '--zss-badge-shadow': '0 8px 24px rgba(0, 0, 0, 0.2)',
    '--zss-badge-font-size': '16px',
    '--zss-indicator-size': '12px',
  }}
/>
```

### Monitoring Different Services

```tsx
// Monitor Gateway service
<ServiceStatusBadge serviceName="Gateway - Mainnet" />

// Monitor custom service
<ServiceStatusBadge
  serviceName="My Custom Service"
  apiUrl="https://status.example.com/index.json"
/>
```

### Custom Refresh Interval

```tsx
// Refresh every 2 minutes
<ServiceStatusBadge refreshInterval={120} />

// Refresh every 30 seconds (minimum)
<ServiceStatusBadge refreshInterval={30} />

// Refresh every 5 minutes (maximum)
<ServiceStatusBadge refreshInterval={300} />
```

## Using the Hook

### Custom Dashboard Component

```tsx
import { useServiceStatus } from 'zama-service-status-monitor';
import { formatAvailability } from 'zama-service-status-monitor';

function ServiceDashboard() {
  const {
    status,
    availability,
    serviceName,
    lastUpdated,
    isLoading,
    error,
    refresh
  } = useServiceStatus({
    serviceName: 'Relayer - Testnet',
    apiUrl: 'https://status.zama.ai/index.json',
    refreshInterval: 60,
  });

  if (isLoading) {
    return <div className="loading">Loading service status...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>{serviceName}</h2>
      <div className="status">
        <span className={`indicator ${status}`}></span>
        <span>{status}</span>
      </div>
      <div className="metrics">
        <div>Uptime: {formatAvailability(availability)}</div>
        <div>Last Updated: {lastUpdated.toLocaleString()}</div>
      </div>
      <button onClick={refresh}>Refresh Now</button>
    </div>
  );
}
```

### Multiple Services Monitor

```tsx
import { useServiceStatus } from 'zama-service-status-monitor';

const SERVICES = [
  'Relayer - Testnet',
  'Gateway - Testnet',
  'KMS - Testnet',
];

function MultiServiceMonitor() {
  const services = SERVICES.map(serviceName => ({
    name: serviceName,
    data: useServiceStatus({
      serviceName,
      apiUrl: 'https://status.zama.ai/index.json',
      refreshInterval: 60,
    }),
  }));

  return (
    <div className="service-grid">
      {services.map(({ name, data }) => (
        <div key={name} className="service-card">
          <h3>{name}</h3>
          <div className={`status ${data.status}`}>
            {data.status}
          </div>
          {data.error && <p className="error">{data.error}</p>}
        </div>
      ))}
    </div>
  );
}
```

## Status Monitoring

### Status Change Callback

```tsx
import { ServiceStatusBadge, ServiceStatus } from 'zama-service-status-monitor';
import { useState } from 'react';

function App() {
  const [statusHistory, setStatusHistory] = useState<ServiceStatus[]>([]);

  const handleStatusChange = (newStatus: ServiceStatus) => {
    console.log('Status changed to:', newStatus);

    // Add to history
    setStatusHistory(prev => [...prev, newStatus]);

    // Send notification
    if (newStatus === 'downtime') {
      alert('⚠️ Service is down!');
    }

    // Log to analytics
    // analytics.track('service_status_change', { status: newStatus });
  };

  return (
    <>
      <ServiceStatusBadge onStatusChange={handleStatusChange} />

      <div className="status-history">
        <h3>Status History</h3>
        <ul>
          {statusHistory.map((status, index) => (
            <li key={index}>{status}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
```

### Integration with Analytics

```tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';

function App() {
  const handleStatusChange = (status: ServiceStatus) => {
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'service_status_change', {
        event_category: 'monitoring',
        event_label: status,
      });
    }

    // Mixpanel
    if (typeof window !== 'undefined' && window.mixpanel) {
      window.mixpanel.track('Service Status Change', {
        status,
        timestamp: new Date().toISOString(),
      });
    }
  };

  return <ServiceStatusBadge onStatusChange={handleStatusChange} />;
}
```

### Custom Toast Notifications

```tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import { toast } from 'react-hot-toast'; // or your preferred toast library

function App() {
  const handleStatusChange = (status: ServiceStatus) => {
    const messages = {
      operational: '✅ Service is operational',
      degraded: '⚠️ Service performance degraded',
      downtime: '🔴 Service is down',
      maintenance: '🔧 Service under maintenance',
    };

    toast(messages[status], {
      icon: status === 'downtime' ? '🔴' : '🟢',
      duration: 5000,
    });
  };

  return <ServiceStatusBadge onStatusChange={handleStatusChange} />;
}
```

## TypeScript Examples

### Typed Component

```tsx
import { ServiceStatusBadge, ServiceStatusBadgeProps } from 'zama-service-status-monitor';

const config: ServiceStatusBadgeProps = {
  serviceName: 'Relayer - Testnet',
  apiUrl: 'https://status.zama.ai/index.json',
  refreshInterval: 60,
  position: 'bottom-right',
  onStatusChange: (status) => {
    console.log('New status:', status);
  },
};

function App() {
  return <ServiceStatusBadge {...config} />;
}
```

### Type-safe Hook Usage

```tsx
import {
  useServiceStatus,
  ServiceStatusData,
  ServiceStatus
} from 'zama-service-status-monitor';

function useZamaServiceMonitor() {
  const statusData: ServiceStatusData = useServiceStatus({
    serviceName: 'Relayer - Testnet',
    apiUrl: 'https://status.zama.ai/index.json',
    refreshInterval: 60,
    onStatusChange: (status: ServiceStatus) => {
      // Type-safe status handling
      switch (status) {
        case 'operational':
          console.log('All systems operational');
          break;
        case 'downtime':
          console.error('System down!');
          break;
      }
    },
  });

  return statusData;
}
```

---

For more information, see the [README.md](./README.md) file.
