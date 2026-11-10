/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/megha',
        destination: '/Megha',
      },
      {
        source: '/birthday',
        destination: '/Megha',
      },
    ];
  },
};

module.exports = nextConfig;
