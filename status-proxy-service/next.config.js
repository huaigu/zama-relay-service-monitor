/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Use edge runtime by default for API routes
    runtime: 'edge',
  },

  // Disable telemetry
  telemetry: false,

  // Compress responses
  compress: true,

  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  // Headers for security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
