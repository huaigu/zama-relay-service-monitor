'use client';

import { useState } from 'react';
import { ServiceStatusBadge } from 'zama-service-status-monitor';
import 'zama-service-status-monitor/dist/style.css';
import type { ServiceStatus } from 'zama-service-status-monitor';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [statusLog, setStatusLog] = useState<string[]>([]);

  const handleStatusChange = (status: ServiceStatus) => {
    const timestamp = new Date().toLocaleTimeString();
    setStatusLog((prev) => [
      `[${timestamp}] Status changed to: ${status}`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Zama Service Status Monitor
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Lightweight React/Next.js component for real-time service monitoring
              </p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full mb-6">
              ✨ Version 1.0.0
            </div>
            <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Monitor Your Services in Style
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              A beautiful, lightweight badge component that displays real-time service status
              from Betterstack with auto-refresh and full customization support.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.npmjs.com/package/zama-service-status-monitor"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                View on npm
              </a>
              <a
                href="https://github.com/zama-ai/service-status-monitor"
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="py-16 container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Start
          </h3>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <code className="text-green-400">
              <span className="text-gray-500"># Install the package</span>
              <br />
              npm install zama-service-status-monitor
              <br />
              <br />
              <span className="text-gray-500"># Or with pnpm</span>
              <br />
              pnpm add zama-service-status-monitor
            </code>
          </div>
        </section>

        {/* Live Demo */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Live Demo
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Look at the <strong>bottom-right corner</strong> of this page to see the
                live status badge! Click it to view detailed information.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Features:
                  </h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li>✅ Real-time status updates</li>
                    <li>✅ Auto-refresh every 60 seconds</li>
                    <li>✅ Click to view details</li>
                    <li>✅ Responsive design</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Status Log:
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {statusLog.length > 0 ? (
                      statusLog.map((log, i) => <div key={i}>{log}</div>)
                    ) : (
                      <div className="text-gray-400">Waiting for status changes...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16 container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Usage Examples
          </h3>

          {/* Basic Usage */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Basic Usage
            </h4>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <code className="text-sm text-gray-300">
                <span className="text-purple-400">import</span>{' '}
                <span className="text-blue-400">{'{ ServiceStatusBadge }'}</span>{' '}
                <span className="text-purple-400">from</span>{' '}
                <span className="text-green-400">'zama-service-status-monitor'</span>;
                <br />
                <span className="text-purple-400">import</span>{' '}
                <span className="text-green-400">'zama-service-status-monitor/dist/style.css'</span>;
                <br />
                <br />
                <span className="text-purple-400">function</span>{' '}
                <span className="text-yellow-400">App</span>() {'{'}<br />
                {'  '}<span className="text-purple-400">return</span> {'<'}
                <span className="text-blue-400">ServiceStatusBadge</span> {'/>'};
                <br />
                {'}'}
              </code>
            </div>
          </div>

          {/* Custom Configuration */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Custom Configuration
            </h4>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {'<'}
                <span className="text-blue-400">ServiceStatusBadge</span>
                <br />
                {'  '}
                <span className="text-yellow-400">serviceName</span>=
                <span className="text-green-400">"Gateway - Mainnet"</span>
                <br />
                {'  '}
                <span className="text-yellow-400">refreshInterval</span>=
                <span className="text-orange-400">{'{120}'}</span>
                <br />
                {'  '}
                <span className="text-yellow-400">position</span>=
                <span className="text-green-400">"top-left"</span>
                <br />
                {'  '}
                <span className="text-yellow-400">onStatusChange</span>=
                <span className="text-orange-400">
                  {'{(status) => console.log(status)}'}
                </span>
                <br />
                {'/>'}
              </code>
            </div>
          </div>

          {/* Dark Mode */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Dark Mode Support
            </h4>
            <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {'<'}
                <span className="text-blue-400">ServiceStatusBadge</span>
                <br />
                {'  '}
                <span className="text-yellow-400">style</span>=
                <span className="text-orange-400">{'{'}</span>
                <span className="text-orange-400">{'{'}</span>
                <br />
                {'    '}
                <span className="text-green-400">&apos;--zss-badge-bg&apos;</span>:{' '}
                <span className="text-green-400">&apos;#1f2937&apos;</span>,
                <br />
                {'    '}
                <span className="text-green-400">&apos;--zss-badge-text-color&apos;</span>:{' '}
                <span className="text-green-400">&apos;#ffffff&apos;</span>,
                <br />
                {'    '}
                <span className="text-green-400">&apos;--zss-primary-color&apos;</span>:{' '}
                <span className="text-green-400">&apos;#3b82f6&apos;</span>,
                <br />
                {'  '}
                <span className="text-orange-400">{'}'}</span>
                <span className="text-orange-400">{'}'}</span>
                <br />
                {'/>'}
              </code>
            </div>
          </div>
        </section>

        {/* API Documentation */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              API Reference
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-gray-900 dark:text-white font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-mono text-sm">
                      serviceName
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      string
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      "Relayer - Testnet"
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      Name of the service to monitor
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-mono text-sm">
                      refreshInterval
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      number
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      60
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      Auto-refresh interval in seconds (30-300)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-mono text-sm">
                      position
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      string
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      "bottom-right"
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      Badge position on screen
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-gray-900 dark:text-white font-mono text-sm">
                      onStatusChange
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      function
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono text-sm">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      Callback when status changes
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              Made with ❤️ by the Zama team
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.zama.ai"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Website
              </a>
              <a
                href="https://github.com/zama-ai"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/zama_fhe"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Twitter
              </a>
            </div>
          </div>
        </footer>

        {/* The actual status badge component */}
        <ServiceStatusBadge
          onStatusChange={handleStatusChange}
          style={
            darkMode
              ? ({
                  '--zss-badge-bg': '#1f2937',
                  '--zss-badge-text-color': '#f9fafb',
                  '--zss-popover-bg': '#111827',
                  '--zss-text-color': '#f9fafb',
                  '--zss-text-secondary': '#9ca3af',
                  '--zss-border-color': '#374151',
                  '--zss-hover-bg': '#1f2937',
                } as React.CSSProperties)
              : {}
          }
        />
      </main>
    </div>
  );
}
