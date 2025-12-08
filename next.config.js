/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Evita inferência incorreta do root quando existem múltiplos lockfiles no usuário
  outputFileTracingRoot: __dirname,
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.pandami.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pandami.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

module.exports = nextConfig; 