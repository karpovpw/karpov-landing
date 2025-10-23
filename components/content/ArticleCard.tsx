'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, Eye } from 'lucide-react'
import { Article } from '@/types'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface ArticleCardProps extends BaseComponentProps {
  article: Article
  featured?: boolean
  onClick?: (article: Article) => void
}

export function ArticleCard({
  article,
  featured = false,
  onClick,
  className = '',
  ...props
}: ArticleCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(article)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      <GlassCard
        className={`p-6 cursor-pointer hover:shadow-xl transition-all duration-300 ${
          featured ? 'ring-2 ring-primary/20' : ''
        }`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-label={`Read article: ${article.title}`}
      >
        {/* Article Header */}
        <div className="mb-4">
          {featured && (
            <div className="mb-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                Featured
              </span>
            </div>
          )}
          <h3 className="text-xl font-semibold mb-2 text-primary line-clamp-2">
            {article.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        {/* Article Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
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
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
              +{article.tags.length - 3}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full capitalize">
            {article.category}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Eye className="w-4 h-4 mr-1" />
            Read Article
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}