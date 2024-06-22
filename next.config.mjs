/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['assets.suitdev.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://suitmedia-backend.suitdev.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;