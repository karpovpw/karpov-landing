'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Article } from '@/types'
import { ARTICLES } from '@/content/articles'
import { ArticleCard } from './ArticleCard'
import { ArticleReader } from './ArticleReader'
import { FilterBar } from '@/components/filtering/FilterBar'
import { Grid } from '@/components/layout/Grid'
import { BaseComponentProps } from '@/types'
import { ARTICLE_CATEGORIES } from '@/content/articles'

interface ArticleListProps extends BaseComponentProps {
  filterable?: boolean
  sortable?: boolean
  layout?: 'grid' | 'list'
  initialArticles?: Article[]
}

export function ArticleList({
  filterable = true,
  sortable = true,
  layout = 'grid',
  initialArticles = ARTICLES,
  className = '',
  ...props
}: ArticleListProps) {
  const [articles] = useState<Article[]>(initialArticles)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [isReaderOpen, setIsReaderOpen] = useState(false)

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    // Sort: newest first
    if (sortable) {
      filtered.sort((a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    }

    return filtered
  }, [articles, searchQuery, selectedCategory, sortable])

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setIsReaderOpen(true)
  }

  const handleCloseReader = () => {
    setIsReaderOpen(false)
    setSelectedArticle(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className={`space-y-8 ${className}`} {...props}>
      {/* Filter Bar */}
      {filterable && (
        <FilterBar
          onSearch={setSearchQuery}
          onCategoryFilter={setSelectedCategory}
          onTechnologyFilter={() => {}} // Not used for articles
          selectedCategory={selectedCategory}
          selectedTechnology=""
          searchQuery={searchQuery}
        />
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
        {(searchQuery || selectedCategory !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid cols={3} gap="lg" className="md:grid-cols-2 xl:grid-cols-3">
            {filteredArticles.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <ArticleCard
                  article={article}
                  featured={article.category === 'bmad'}
                  onClick={handleArticleClick}
                />
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            No articles found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}
            className="text-primary hover:underline"
          >
            Clear filters to see all articles
          </button>
        </div>
      )}

      {/* Article Reader Modal */}
      {isReaderOpen && selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <ArticleReader
              article={selectedArticle}
              onClose={handleCloseReader}
              showProgress
            />
          </div>
        </div>
      )}
    </div>
  )
}