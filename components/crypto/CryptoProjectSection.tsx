'use client'

import { motion } from 'framer-motion'
import { CryptoProject } from '@/types'
import { BlockchainMetrics } from './BlockchainMetrics'
import { TokenChart } from '@/components/charts/TokenChart'
import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { BaseComponentProps } from '@/types'

interface CryptoProjectSectionProps extends BaseComponentProps {
  projects: CryptoProject[]
  showMetrics?: boolean
  interactive?: boolean
}

export function CryptoProjectSection({
  projects,
  showMetrics = true,
  interactive = true,
  className = '',
  ...props
}: CryptoProjectSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={`space-y-8 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
          Blockchain & Crypto Projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore my work in decentralized finance, smart contracts, and blockchain innovation.
          Real-time metrics and interactive features showcase the live nature of these projects.
        </p>
      </motion.div>

      {/* Blockchain Metrics */}
      {showMetrics && (
        <motion.div variants={itemVariants}>
          <BlockchainMetrics
            projectId="crypto-showcase"
            networks={['Ethereum', 'Polygon', 'BSC']}
            refreshInterval={30000}
          />
        </motion.div>
      )}

      {/* Token Chart */}
      <motion.div variants={itemVariants}>
        <TokenChart
          tokenAddress="0x1234567890abcdef"
          timeRange="24h"
          chartType="price"
        />
      </motion.div>

      {/* Crypto Projects Grid */}
      <motion.div variants={itemVariants}>
        <ProjectGrid
          initialProjects={projects}
          filterable
          layout="grid"
        />
      </motion.div>

      {/* Additional Info */}
      <motion.div variants={itemVariants}>
        <div className="text-center">
          <p className="text-muted-foreground">
            All blockchain projects are deployed on mainnet with verified smart contracts.
            Security audits and comprehensive testing ensure production readiness.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}