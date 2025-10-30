# zama-service-status-monitor

[![npm version](https://img.shields.io/npm/v/zama-service-status-monitor.svg)](https://www.npmjs.com/package/zama-service-status-monitor)
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
npm install zama-service-status-monitor
# or
pnpm add zama-service-status-monitor
```

### Basic Usage

```tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

function App() {
  return <ServiceStatusBadge />;
}
```

### Next.js App Router

```tsx
// app/layout.tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

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

## ✅ No CORS Issues - Works Out of the Box!

The package now uses a hosted proxy service at `https://zama-relay-service-monitor-example.vercel.app/api/status` by default, which means:

✅ **No backend required** - Works with pure frontend apps
✅ **No CORS configuration** - Just install and use
✅ **No proxy setup** - Everything works immediately
✅ **Global CDN** - Fast response times worldwide

```tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

function App() {
  return <ServiceStatusBadge />;
}
```

That's it! No configuration needed. The component will automatically use the hosted proxy service.

### Custom API URL (Optional)

If you want to use your own proxy service, you can still override the default:

```tsx
<ServiceStatusBadge apiUrl="https://your-proxy.example.com/api/status" />
```

For self-hosting the proxy service, see [status-proxy-service/](./status-proxy-service/) directory.

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

- [npm Package](https://www.npmjs.com/package/zama-service-status-monitor)
- [Zama Website](https://www.zama.ai)
- [GitHub Issues](https://github.com/zama-ai/service-status-monitor/issues)
- [Betterstack Status Pages](https://betterstack.com/better-uptime)

---

Made with ❤️ by the Zama team
