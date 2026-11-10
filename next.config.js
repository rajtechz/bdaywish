/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/allen',
        destination: '/Allen',
      },
      {
        source: '/megha',
        destination: '/Allen',
      },
      {
        source: '/Megha',
        destination: '/Allen',
      },
      {
        source: '/birthday',
        destination: '/Allen',
      },
    ];
  },
};

module.exports = nextConfig;
