'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Calendar, Clock, Tag, Share2 } from 'lucide-react'
import { Article } from '@/types'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface ArticleReaderProps extends BaseComponentProps {
  article: Article
  showProgress?: boolean
  showTOC?: boolean
  onClose?: () => void
}

export function ArticleReader({
  article,
  showProgress = false,
  showTOC = false,
  onClose,
  className = '',
  ...props
}: ArticleReaderProps) {
  const [readingProgress, setReadingProgress] = useState(0)

  // Simulate reading progress (in a real app, you'd calculate this based on scroll position)
  useEffect(() => {
    const timer = setTimeout(() => {
      setReadingProgress(100)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <motion.div
      className={`max-w-4xl mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <GlassCard className="p-8">
        {/* Header */}
        <div className="mb-8">
          {onClose && (
            <button
              onClick={onClose}
              className="mb-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readingTime} min read
              </div>
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full capitalize">
                {article.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-primary">
              {article.title}
            </h1>

            <p className="text-lg text-muted-foreground">
              {article.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 glass-button rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Reading Progress */}
        {showProgress && (
          <div className="mb-8">
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${readingProgress}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <pre className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
            {article.content}
          </pre>
        </div>

        {/* Article Footer */}
        <div className="mt-8 pt-8 border-t border-muted">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Published on {new Date(article.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground capitalize">
                {article.category}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}