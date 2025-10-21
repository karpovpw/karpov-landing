/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // Enable modern bundling optimizations
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react', 'react-dom'],
    // Enable CSS optimization
    optimizeCss: true,
  },

  // Performance optimization settings
  poweredByHeader: false, // Remove "Powered by Next.js" header for security

  // Bundle analyzer configuration (enabled when ANALYZE=true)
  ...(process.env.ANALYZE === 'true' && {
    experimental: {
      ...nextConfig.experimental,
      bundleAnalyzer: {
        enabled: true,
        openAnalyzer: true,
      },
    },
  }),

  // Image optimization with comprehensive format support
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [320, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Code splitting and chunk optimization
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunk for third-party libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // Common chunk for shared components
          common: {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 5,
          },
          // Design system chunk for UI components
          designSystem: {
            test: /[\\/]components[\\/]design-system[\\/]/,
            name: 'design-system',
            chunks: 'all',
            priority: 8,
          },
          // Layout chunk for layout components
          layout: {
            test: /[\\/]components[\\/]layout[\\/]/,
            name: 'layout',
            chunks: 'all',
            priority: 7,
          },
        },
      },
    };

    // Bundle size monitoring
    if (!dev && !isServer) {
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 512000, // 500KB target
        maxAssetSize: 512000,
      };
    }

    // Optimize CSS loading
    config.module.rules.push({
      test: /\.css$/,
      use: ['postcss-loader'],
    });

    return config;
  },

  // Performance headers for caching optimization
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Static assets caching (1 year for optimal performance)
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Images caching (1 week for fresh content)
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // API routes (no cache for dynamic content)
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },

  // Redirect configuration for SEO and performance
  async redirects() {
    return [
      // Performance: Redirect old routes to new ones if needed
    ];
  },

  // Sitemap and robots configuration for SEO performance
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      // Performance: Redirect heavy assets through CDN if configured
      ...(process.env.CDN_URL ? [
        {
          source: '/images/:path*',
          destination: `${process.env.CDN_URL}/images/:path*`,
        },
      ] : []),
    ];
  },

  // Compression and optimization
  compress: true,
  generateEtags: true,

  // Performance monitoring (development only)
  ...(dev && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000, // 25 seconds
      pagesBufferLength: 2,
    },
  }),
};

export default nextConfig