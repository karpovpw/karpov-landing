/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // Optimize for static generation and Cloudflare Pages
  output: 'standalone',
  trailingSlash: true,

  // Image optimization for Cloudflare Pages
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    // Use Cloudflare Images or optimize locally
    unoptimized: process.env.NODE_ENV === 'production',
  },

  // Security headers (additional to _headers file)
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
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // Performance optimizations
  swcMinify: true,

  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    analyze: true,
  }),

  // Webpack optimizations for production
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      )
    }

    return config
  },

  // Redirects and rewrites
  async redirects() {
    return [
      // Legacy URL redirects (if any)
      {
        source: '/old-about',
        destination: '/about',
        permanent: true,
      },
    ]
  },

  // Enable compression
  compress: true,

  // Generate build ID
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
}

module.exports = nextConfig