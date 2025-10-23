'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface TokenChartProps extends BaseComponentProps {
  tokenAddress: string
  timeRange: '24h' | '7d' | '30d'
  chartType: 'price' | 'volume'
}

interface ChartData {
  price: number
  change: number
  volume: number
  high: number
  low: number
}

export function TokenChart({
  tokenAddress,
  timeRange,
  chartType,
  className = '',
  ...props
}: TokenChartProps) {
  // Mock data - in a real app, this would come from a blockchain API
  const [chartData, setChartData] = useState<ChartData>({
    price: 0.00001234,
    change: 5.67,
    volume: 1234567,
    high: 0.00001345,
    low: 0.00001123,
  })

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * 0.000001,
        change: (Math.random() - 0.5) * 10,
        volume: prev.volume + Math.floor((Math.random() - 0.5) * 10000),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return `$${price.toFixed(8)}`
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(1)}M`
    } else if (volume >= 1000) {
      return `$${(volume / 1000).toFixed(1)}K`
    }
    return `$${volume.toFixed(0)}`
  }

  const isPositive = chartData.change >= 0

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <GlassCard className="p-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-primary">
              Token Metrics
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {timeRange}
              </span>
              <div className={`flex items-center space-x-1 ${
                isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {isPositive ? '+' : ''}{chartData.change.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold text-primary">
            {formatPrice(chartData.price)}
          </div>
        </div>

        {/* Simple Chart Visualization */}
        <div className="mb-6">
          <div className="relative h-32 bg-muted rounded-lg overflow-hidden">
            {/* Mock chart bars */}
            <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
              {Array.from({ length: 20 }, (_, i) => {
                const height = Math.random() * 100
                return (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-t"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {formatPrice(chartData.high)}
            </div>
            <div className="text-xs text-muted-foreground">24h High</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {formatPrice(chartData.low)}
            </div>
            <div className="text-xs text-muted-foreground">24h Low</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {formatVolume(chartData.volume)}
            </div>
            <div className="text-xs text-muted-foreground">Volume</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center">
              <Activity className="w-4 h-4 text-muted-foreground mr-1" />
              <span className="text-lg font-bold text-primary">
                Live
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Real-time</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-muted">
          <p className="text-xs text-muted-foreground text-center">
            Data from blockchain networks • Updates every 5 seconds
          </p>
        </div>
      </GlassCard>
    </motion.div>
  )
}