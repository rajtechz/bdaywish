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
      {
        source: '/A',
        destination: '/Allen',
      },
      {
        source: '/a',
        destination: '/Allen',
      },
      {
        source: '/L',
        destination: '/Allen',
      },
      {
        source: '/l',
        destination: '/Allen',
      },
      {
        source: '/E',
        destination: '/Allen',
      },
      {
        source: '/e',
        destination: '/Allen',
      },
      {
        source: '/N',
        destination: '/Allen',
      },
      {
        source: '/n',
        destination: '/Allen',
      },
    ];
  },
};

module.exports = nextConfig;
