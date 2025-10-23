'use client'

import { useState } from 'react'
import { Search, X, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearch } from './SearchProvider'
import { GlassCard } from '@/components/design-system/GlassCard'
import { GlassInput } from '@/components/design-system/GlassInput'
import { BaseComponentProps } from '@/types'

interface SearchBarProps extends BaseComponentProps {
  onSearch?: (query: string, filters: SearchFilters) => void
  placeholder?: string
  showFilters?: boolean
}

interface SearchFilters {
  type: 'all' | 'projects' | 'articles' | 'pages'
  sortBy: 'relevance' | 'date' | 'title'
}

export function SearchBar({
  onSearch,
  placeholder = 'Search projects, articles, and more...',
  showFilters = true,
  className = '',
  ...props
}: SearchBarProps) {
  const { query, setQuery, results, isSearching, search, clearResults } = useSearch()
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    sortBy: 'relevance',
  })
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)

    if (newQuery.trim()) {
      search(newQuery)
      setShowResults(true)
    } else {
      clearResults()
      setShowResults(false)
    }
  }

  const handleResultClick = (result: any) => {
    // Navigate to result URL
    window.location.href = result.url
    setShowResults(false)
  }

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onSearch?.(query, updatedFilters)
  }

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <GlassInput
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pl-10 pr-10"
          onFocus={() => {
            if (results.length > 0) setShowResults(true)
          }}
          onBlur={() => {
            // Delay hiding to allow clicking on results
            setTimeout(() => setShowResults(false), 200)
          }}
        />

        {query && (
          <button
            onClick={() => {
              setQuery('')
              clearResults()
              setShowResults(false)
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Filters */}
      {showFilters && (
        <div className="mt-2 flex items-center space-x-2">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange({ type: e.target.value as any })}
            className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Content</option>
            <option value="projects">Projects</option>
            <option value="articles">Articles</option>
            <option value="pages">Pages</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
            className="px-3 py-1 text-sm bg-muted text-muted-foreground rounded-full border-none focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      )}

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {results.map((result) => (
                  <motion.div
                    key={result.id}
                    className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleResultClick(result)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-primary">
                            {result.title}
                          </span>
                          <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full capitalize">
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground ml-2">
                        {Math.round(result.relevance * 100)}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-muted">
                <p className="text-xs text-muted-foreground text-center">
                  {results.length} results found
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2">
          <GlassCard className="p-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-muted-foreground">Searching...</span>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  )
}