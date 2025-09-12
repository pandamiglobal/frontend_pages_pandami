/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Evita inferência incorreta do root quando existem múltiplos lockfiles no usuário
  outputFileTracingRoot: __dirname,
  images: {
    domains: [
      'cms.pandami.com.br',
      'pandami.com.br',
      'images.pexels.com'
    ],
  }
};

module.exports = nextConfig; 