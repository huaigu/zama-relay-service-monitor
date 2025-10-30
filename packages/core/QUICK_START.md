# Quick Start Guide

Get up and running with `zama-service-status-monitor` in under 5 minutes!

## 📋 Prerequisites

- Node.js 16+ installed
- React 16.8+ or Next.js project
- npm, yarn, or pnpm package manager

## 🚀 Installation Steps

### Step 1: Install Dependencies

First, install the development dependencies to build the package:

```bash
npm install
```

### Step 2: Build the Package

```bash
npm run build
```

This will create the `dist/` folder with:
- `index.js` (ESM)
- `index.cjs` (CommonJS)
- `index.d.ts` (TypeScript definitions)
- `style.css` (CSS styles)

### Step 3: Link for Local Development (Optional)

If you want to test in another project locally:

```bash
npm link
```

Then in your React/Next.js project:

```bash
npm link zama-service-status-monitor
```

### Step 4: Use in Your Project

#### React App

```tsx
// App.tsx
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <ServiceStatusBadge />
    </div>
  );
}

export default App;
```

#### Next.js (App Router)

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

## 📦 Publishing to npm

### Step 1: Login to npm

```bash
npm login
```

### Step 2: Publish

```bash
npm publish --access public
```

> **Note**: The package name `zama-service-status-monitor` requires the `@zama-ai` scope to exist on npm. If you don't have access, you can:
> 1. Change the name in `package.json` to something else
> 2. Or publish under your own scope: `@your-username/service-status-monitor`

## 🧪 Testing

### Manual Testing

1. Build the package:
   ```bash
   npm run build
   ```

2. Create a test React app:
   ```bash
   npx create-react-app test-app
   cd test-app
   ```

3. Link your package:
   ```bash
   npm link zama-service-status-monitor
   ```

4. Add to your `test-app/src/App.tsx`:
   ```tsx
   import { ServiceStatusBadge } from 'zama-service-status-monitor';
   import 'zama-service-status-monitor/dist/style.css';

   function App() {
     return (
       <div className="App">
         <header className="App-header">
           <h1>Testing Service Status Monitor</h1>
           <p>Look at the bottom-right corner!</p>
         </header>
         <ServiceStatusBadge />
       </div>
     );
   }

   export default App;
   ```

5. Start the test app:
   ```bash
   npm start
   ```

6. You should see the status badge in the bottom-right corner!

## 🔧 Development Workflow

### Watch Mode

For development, you can run Vite in watch mode:

```bash
npm run dev
```

This will rebuild automatically when you change source files.

### Type Checking

Check types without building:

```bash
npm run typecheck
```

### Preview Built Package

After building, preview the bundle:

```bash
npm run preview
```

## 📝 Configuration Options

### Default Configuration

The badge uses these defaults if you don't specify props:

```tsx
<ServiceStatusBadge
  serviceName="Relayer - Testnet"
  apiUrl="https://status.zama.ai/index.json"
  refreshInterval={60}
  position="bottom-right"
/>
```

### Custom Configuration

```tsx
<ServiceStatusBadge
  serviceName="Your Service Name"
  apiUrl="https://your-status-page.com/index.json"
  refreshInterval={120}
  position="top-left"
  onStatusChange={(status) => {
    console.log('Status changed:', status);
  }}
/>
```

## 🎨 Styling

### Using CSS Variables

The easiest way to customize appearance:

```tsx
<ServiceStatusBadge
  style={{
    '--zss-badge-bg': '#1f2937',
    '--zss-badge-text-color': '#ffffff',
    '--zss-primary-color': '#3b82f6',
  }}
/>
```

### Global CSS Override

In your global CSS:

```css
:root {
  --zss-badge-bg: #ffffff;
  --zss-badge-text-color: #000000;
  --zss-primary-color: #3b82f6;
  --zss-badge-border-radius: 24px;
}

[data-theme='dark'] {
  --zss-badge-bg: #1f2937;
  --zss-badge-text-color: #f9fafb;
}
```

## 🐛 Troubleshooting

### Badge doesn't appear

1. Make sure you imported the CSS:
   ```tsx
   import 'zama-service-status-monitor/dist/style.css';
   ```

2. Check browser console for errors

3. Verify the API endpoint is accessible:
   ```bash
   curl https://status.zama.ai/index.json
   ```

### CORS errors

If you see CORS errors in the console:
- The Betterstack API should have CORS headers enabled
- Check if you're running on localhost (usually fine)
- For production, ensure your domain is allowed

### Next.js SSR issues

If you get "window is not defined" errors:

```tsx
// Use dynamic import with ssr: false
import dynamic from 'next/dynamic';

const ServiceStatusBadge = dynamic(
  () => import('zama-service-status-monitor').then(m => m.ServiceStatusBadge),
  { ssr: false }
);
```

### TypeScript errors

Make sure you have the peer dependencies installed:

```bash
npm install --save-dev @types/react @types/react-dom
```

## 📚 Next Steps

- Read the full [README.md](./README.md) for detailed API documentation
- Check out [EXAMPLES.md](./EXAMPLES.md) for more usage examples
- Review [CHANGELOG.md](./CHANGELOG.md) for version history

## 💡 Tips

1. **Development**: Use `npm run dev` for hot reloading during development
2. **Testing**: Test in multiple browsers before publishing
3. **Versioning**: Follow semantic versioning when updating
4. **Documentation**: Update CHANGELOG.md for each release

## 🆘 Getting Help

- Check the [README.md](./README.md) for common issues
- Open an issue on GitHub
- Contact Zama support

---

Happy monitoring! 🎉
