# @zama-ai/service-status-monitor

[![npm version](https://img.shields.io/npm/v/@zama-ai/service-status-monitor.svg)](https://www.npmjs.com/package/@zama-ai/service-status-monitor)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Lightweight React/Next.js component for monitoring Betterstack service status with real-time updates.

## 🏗️ Monorepo Structure

This project uses pnpm workspaces to manage a monorepo containing the npm package and a live example.

```
zama-relay-service-monitor/
├── packages/
│   └── core/                      # Main npm package
│       ├── src/
│       ├── dist/
│       └── package.json
├── example/                       # Next.js 15 live demo
│   ├── app/
│   ├── package.json
│   └── next.config.js
├── pnpm-workspace.yaml           # Workspace configuration
├── package.json                  # Root scripts
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- pnpm 8+ (required for workspaces)

Install pnpm globally if you haven't:

```bash
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/zama-ai/service-status-monitor.git
cd service-status-monitor

# Install all dependencies (package + example)
pnpm install
```

### Development

Run both the package in watch mode and the example app simultaneously:

```bash
# Start development environment (package + example)
pnpm dev
```

This will:
- Build the package in watch mode (auto-rebuilds on changes)
- Start Next.js dev server at http://localhost:3000
- Enable hot module replacement for both

Or run them separately:

```bash
# Run only the package in watch mode
pnpm dev:core

# Run only the example app
pnpm dev:example
```

### Build

```bash
# Build both package and example
pnpm build

# Build only the package
pnpm build:core

# Build only the example
pnpm build:example
```

### Type Checking

```bash
# Check types in all workspaces
pnpm typecheck
```

### Clean

```bash
# Remove build artifacts and node_modules
pnpm clean
```

## 📦 Using the Package

### Installation

```bash
npm install @zama-ai/service-status-monitor
# or
pnpm add @zama-ai/service-status-monitor
```

### Basic Usage

```tsx
import { ServiceStatusBadge } from '@zama-ai/service-status-monitor';
import '@zama-ai/service-status-monitor/dist/style.css';

function App() {
  return <ServiceStatusBadge />;
}
```

### Next.js App Router

```tsx
// app/layout.tsx
import { ServiceStatusBadge } from '@zama-ai/service-status-monitor';
import '@zama-ai/service-status-monitor/dist/style.css';

export default function RootLayout({ children }) {
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

For more examples and API documentation, see the [package README](./packages/core/README.md).

## ⚠️ CORS Limitation & Solutions

The Betterstack status API does not include CORS headers, which prevents direct browser requests from working. You'll see this error:

```
Access-Control-Allow-Origin header is present on the requested resource
```

### Solutions by Framework

**Next.js (Recommended)**: Use an API route as a server-side proxy (see [example/app/api/status/route.ts](./example/app/api/status/route.ts))

```tsx
// app/api/status/route.ts
export async function GET() {
  const response = await fetch('https://status.zama.ai/index.json');
  const data = await response.json();
  return NextResponse.json(data, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
}

// Component usage
<ServiceStatusBadge apiUrl="/api/status" />
```

**Create React App**: Use proxy in `package.json`
```json
{
  "proxy": "https://status.zama.ai"
}
```

**Vite**: Configure proxy in `vite.config.ts`
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api/status': {
        target: 'https://status.zama.ai',
        changeOrigin: true,
        rewrite: (path) => '/index.json'
      }
    }
  }
});
```

**Express Backend**: Create a dedicated proxy endpoint
```javascript
app.get('/api/status', async (req, res) => {
  const response = await fetch('https://status.zama.ai/index.json');
  const data = await response.json();
  res.header('Access-Control-Allow-Origin', '*');
  res.json(data);
});
```

For detailed implementation guides, see [CORS_SOLUTIONS.md](./CORS_SOLUTIONS.md).

## 🎨 Live Demo

The example app demonstrates all features of the package:

- **Basic usage**: Default configuration
- **Custom styling**: Dark mode support with CSS variables
- **Different positions**: Corner placement options
- **Status callbacks**: React to status changes
- **API reference**: Complete props documentation

Visit the live demo: [Link will be added after deployment]

## 🏗️ Project Architecture

### Package Development Workflow

1. Make changes to `packages/core/src/*`
2. Package automatically rebuilds (watch mode)
3. Example app hot-reloads with changes
4. Test changes in example app at http://localhost:3000

### Adding Features

1. Update package code in `packages/core/src/`
2. Update types in `packages/core/src/types/`
3. Test in example app
4. Update package README
5. Update CHANGELOG

### Publishing

```bash
# From packages/core directory
cd packages/core
npm version patch  # or minor/major
npm publish --access public
```

## 📚 Documentation

- [Package README](./packages/core/README.md) - Installation, usage, API reference
- [Examples](./packages/core/EXAMPLES.md) - Code examples for various use cases
- [Quick Start Guide](./packages/core/QUICK_START.md) - Get started in 5 minutes
- [Changelog](./packages/core/CHANGELOG.md) - Version history

## 🛠️ Tech Stack

- **Package**: TypeScript, React, Vite
- **Example**: Next.js 15, React 18, Tailwind CSS
- **Monorepo**: pnpm workspaces
- **Deployment**: Vercel

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes in `packages/core/src/`
4. Test in the example app (`pnpm dev`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

MIT © [Zama](https://www.zama.ai)

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@zama-ai/service-status-monitor)
- [Zama Website](https://www.zama.ai)
- [GitHub Issues](https://github.com/zama-ai/service-status-monitor/issues)
- [Betterstack Status Pages](https://betterstack.com/better-uptime)

---

Made with ❤️ by the Zama team
