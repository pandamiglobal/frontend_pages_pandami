const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Evita inferência incorreta do root quando existem múltiplos lockfiles no usuário
  outputFileTracingRoot: __dirname,

  // ============================================================================
  // Image Optimization
  // ============================================================================
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
  },

  // ============================================================================
  // Performance Optimizations (Turbopack compatible)
  // ============================================================================
  experimental: {
    // Optimize package imports - tree-shake heavy libraries
    // Works with both Webpack and Turbopack
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'date-fns',
      '@radix-ui/react-accordion',
      '@radix-ui/react-tabs',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-avatar',
      '@radix-ui/react-popover',
      '@radix-ui/react-label',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-slot',
    ],
    // Reduce legacy polyfills for modern browsers
    // Uses browserslist config to determine which polyfills are needed
    optimizeCss: true,
  },

  // ============================================================================
  // Turbopack Configuration (for dev mode)
  // ============================================================================
  turbopack: {
    // Resolve aliases for Turbopack
    resolveAlias: {},
  },

  // ============================================================================
  // Caching Headers for Static Assets
  // ============================================================================
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: '/lp/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  // ============================================================================
  // Compiler Optimizations (SWC - works with Turbopack)
  // ============================================================================
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },


  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles
  
  // Compress output
  compress: true,
};

module.exports = withBundleAnalyzer(nextConfig);