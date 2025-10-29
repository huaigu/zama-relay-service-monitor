/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@zama-ai/service-status-monitor'],
  // Enable watching changes in workspace packages
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules([\\]+|\/)+(?!@zama-ai)/,
    };
    return config;
  },
};

module.exports = nextConfig;
