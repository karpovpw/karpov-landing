/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use Turbopack with minimal configuration for Next.js 16
  turbopack: {},

  // Static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Image optimization - disable for static export
  images: {
    unoptimized: true,
  },

  // Enable build caching for faster rebuilds
  generateBuildId: async () => {
    return 'build-cache-' + Date.now()
  },

  // Performance optimizations for Next.js 16
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    scrollRestoration: true,
  },
}

module.exports = nextConfig