'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface BlockchainMetricsProps extends BaseComponentProps {
  projectId: string
  networks: string[]
  refreshInterval?: number
}

interface MetricData {
  tvl: string
  users: string
  volume: string
  transactions: string
}

export function BlockchainMetrics({
  projectId,
  networks,
  refreshInterval = 30000,
  className = '',
  ...props
}: BlockchainMetricsProps) {
  // Mock data - in a real app, this would come from blockchain APIs
  const [metrics, setMetrics] = useState<MetricData>({
    tvl: '$2.5M',
    users: '1,234',
    volume: '$156K',
    transactions: '8,901',
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        tvl: `$${(parseFloat(prev.tvl.slice(1).replace('M', '')) + (Math.random() - 0.5) * 0.1).toFixed(1)}M`,
        users: (parseInt(prev.users.replace(',', '')) + Math.floor(Math.random() * 10)).toLocaleString(),
        volume: `$${(parseFloat(prev.volume.slice(1).replace('K', '')) + (Math.random() - 0.5) * 10).toFixed(0)}K`,
        transactions: (parseInt(prev.transactions.replace(',', '')) + Math.floor(Math.random() * 100)).toLocaleString(),
      }))
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  const metricsData = [
    {
      label: 'Total Value Locked',
      value: metrics.tvl,
      icon: DollarSign,
      color: 'text-green-500',
    },
    {
      label: 'Active Users',
      value: metrics.users,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: '24h Volume',
      value: metrics.volume,
      icon: TrendingUp,
      color: 'text-purple-500',
    },
    {
      label: 'Transactions',
      value: metrics.transactions,
      icon: Activity,
      color: 'text-orange-500',
    },
  ]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <GlassCard className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary mb-2">
            Blockchain Metrics
          </h3>
          <div className="flex flex-wrap gap-2">
            {networks.map((network) => (
              <span
                key={network}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
              >
                {network}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricsData.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted mb-2`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div className="text-lg font-bold text-primary">
                {metric.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-muted">
          <p className="text-xs text-muted-foreground text-center">
            Data updates every {refreshInterval / 1000} seconds
          </p>
        </div>
      </GlassCard>
    </motion.div>
  )
}