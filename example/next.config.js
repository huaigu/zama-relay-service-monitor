/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['zama-service-status-monitor'],
  // Enable watching changes in workspace packages
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules([\\]+|\/)+(?!zama-service-status-monitor)/,
    };
    return config;
  },
};

module.exports = nextConfig;
