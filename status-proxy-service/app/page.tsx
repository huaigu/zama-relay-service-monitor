export default function Home() {
  return (
    <main style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px 20px',
      lineHeight: '1.6',
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Zama Status Proxy Service
      </h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        CORS-enabled proxy for Betterstack status API
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>API Endpoints</h2>

        <div style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>
            <code>GET /api/status</code>
          </h3>
          <p style={{ margin: '0', color: '#666' }}>
            Proxies Betterstack status API with CORS headers
          </p>
        </div>

        <div style={{
          background: '#f5f5f5',
          padding: '1rem',
          borderRadius: '8px',
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>
            <code>GET /api/health</code>
          </h3>
          <p style={{ margin: '0', color: '#666' }}>
            Health check endpoint for monitoring
          </p>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Features</h2>
        <ul>
          <li>✅ CORS-enabled for cross-origin requests</li>
          <li>⚡ Edge Runtime for global low-latency</li>
          <li>💾 30-second caching for performance</li>
          <li>🔒 Security headers included</li>
          <li>📊 Health check endpoint</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Usage Example</h2>
        <pre style={{
          background: '#1a1a1a',
          color: '#fff',
          padding: '1rem',
          borderRadius: '8px',
          overflow: 'auto',
        }}>
{`// Fetch service status
fetch('/api/status')
  .then(res => res.json())
  .then(data => console.log(data));

// With zama-service-status-monitor
<ServiceStatusBadge
  apiUrl="${typeof window !== 'undefined' ? window.location.origin : ''}/api/status"
/>`}
        </pre>
      </section>

      <footer style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e0e0e0',
        textAlign: 'center',
        color: '#666',
      }}>
        <p>
          <a
            href="https://www.zama.ai"
            style={{ color: '#0070f3', textDecoration: 'none' }}
          >
            Zama
          </a>
          {' | '}
          <a
            href="https://github.com/zama-ai/service-status-monitor"
            style={{ color: '#0070f3', textDecoration: 'none' }}
          >
            GitHub
          </a>
          {' | '}
          <a
            href="https://www.npmjs.com/package/zama-service-status-monitor"
            style={{ color: '#0070f3', textDecoration: 'none' }}
          >
            npm
          </a>
        </p>
      </footer>
    </main>
  );
}
