/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  // Critical: Ensure proper static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Image optimization - disable for static export
  images: {
    unoptimized: true,
  },

  // Disable server-side features for static deployment
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',

  // Security headers
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
        ],
      },
    ]
  },

  // Performance optimizations
  swcMinify: true,
  compress: true,

  // Webpack configuration for static export
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },

  // Generate build ID
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },

  // Disable static optimization that breaks static export
  generateEtags: false,
}

module.exports = nextConfig