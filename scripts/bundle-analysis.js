#!/usr/bin/env node

// Bundle analysis script for monitoring bundle sizes
const fs = require('fs')
const path = require('path')

const BUDGET_LIMITS = {
  total: 500 * 1024,    // 500KB total JS
  vendor: 200 * 1024,   // 200KB vendor libraries
  main: 100 * 1024,     // 100KB main bundle
  css: 50 * 1024,       // 50KB CSS
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function analyzeBundle() {
  const buildStatsPath = path.join(process.cwd(), '.next/build-manifest.json')
  const analyzePath = path.join(process.cwd(), '.next/analyze')

  console.log('🔍 Analyzing bundle size and performance...\n')

  try {
    // Check if build manifest exists
    if (!fs.existsSync(buildStatsPath)) {
      console.log('❌ Build manifest not found. Run "npm run build" first.')
      process.exit(1)
    }

    const manifest = JSON.parse(fs.readFileSync(buildStatsPath, 'utf8'))

    // Check build output directory for actual bundle sizes
    const buildDir = path.join(process.cwd(), '.next/static')

    if (!fs.existsSync(buildDir)) {
      console.log('❌ Build directory not found.')
      process.exit(1)
    }

    // Analyze chunks directory
    const chunksDir = path.join(buildDir, 'chunks')

    if (fs.existsSync(chunksDir)) {
      const chunks = fs.readdirSync(chunksDir)
        .filter(file => file.endsWith('.js') || file.endsWith('.css'))

      console.log('📦 Bundle Analysis Results:\n')

      let totalSize = 0
      const bundleFiles = []

      chunks.forEach(file => {
        const filePath = path.join(chunksDir, file)
        const stats = fs.statSync(filePath)
        const size = stats.size

        totalSize += size
        bundleFiles.push({
          name: file,
          size,
          type: file.endsWith('.css') ? 'CSS' : 'JavaScript'
        })
      })

      // Display results
      console.log(`📊 Total Bundle Size: ${formatBytes(totalSize)}`)
      console.log(`📊 Gzipped Estimate: ${formatBytes(Math.round(totalSize * 0.3))}`)
      console.log(`📊 Number of Chunks: ${chunks.length}\n`)

      // Budget check
      const gzippedSize = Math.round(totalSize * 0.3)

      if (gzippedSize > BUDGET_LIMITS.total) {
        console.log('❌ Bundle size exceeds budget!')
        console.log(`   Target: ${formatBytes(BUDGET_LIMITS.total)}`)
        console.log(`   Actual: ${formatBytes(gzippedSize)}`)
        console.log(`   Over by: ${formatBytes(gzippedSize - BUDGET_LIMITS.total)}\n`)
      } else {
        console.log('✅ Bundle size within budget')
        console.log(`   Budget: ${formatBytes(BUDGET_LIMITS.total)}`)
        console.log(`   Actual: ${formatBytes(gzippedSize)}`)
        console.log(`   Under by: ${formatBytes(BUDGET_LIMITS.total - gzippedSize)}\n`)
      }

      // Bundle composition
      console.log('📋 Bundle Composition:')
      bundleFiles.forEach(file => {
        console.log(`   ${file.name}: ${formatBytes(file.size)} (${file.type})`)
      })

      // Recommendations
      console.log('\n💡 Optimization Recommendations:')

      if (gzippedSize > BUDGET_LIMITS.total) {
        console.log('   • Enable code splitting for large components')
        console.log('   • Implement lazy loading for heavy libraries')
        console.log('   • Consider tree shaking unused dependencies')
        console.log('   • Optimize images and static assets')
      } else {
        console.log('   • Bundle size is optimal!')
        console.log('   • Consider implementing service worker caching')
        console.log('   • Monitor for bundle size regressions')
      }

      // Performance metrics
      console.log('\n⚡ Performance Indicators:')
      console.log('   • Bundle Count: Good' +
        (chunks.length > 20 ? ' (Consider reducing)' : ' ✅'))
      console.log('   • Largest Chunk: ' +
        formatBytes(Math.max(...bundleFiles.map(f => f.size))))

      if (gzippedSize > 400 * 1024) {
        console.log('   • Bundle Size: Large (Monitor closely)')
      } else if (gzippedSize > 200 * 1024) {
        console.log('   • Bundle Size: Medium (Good for performance)')
      } else {
        console.log('   • Bundle Size: Small (Excellent!)')
      }

      console.log('\n🎯 Next Steps:')
      console.log('   • Run "npm run test:performance" for Lighthouse audit')
      console.log('   • Run "npm run test:accessibility" for a11y testing')
      console.log('   • Monitor Core Web Vitals in production')

    } else {
      console.log('❌ Chunks directory not found. Bundle analysis incomplete.')
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message)
    process.exit(1)
  }
}

// Main execution
if (require.main === module) {
  analyzeBundle()
}

module.exports = { analyzeBundle }