/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'django-backend',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    {
        protocol: 'https',
        hostname: 'arcadesticklabs',
        port: '7010',
        pathname: '/media/**',
      },
    ],
  },
};

module.exports = nextConfig;
