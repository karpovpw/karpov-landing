'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { GlassCard } from '@/components/design-system/GlassCard'
import { GlassInput } from '@/components/design-system/GlassInput'
import { BaseComponentProps } from '@/types'
import { PROJECT_CATEGORIES, PROJECT_TECHNOLOGIES } from '@/content/projects'

interface FilterBarProps extends BaseComponentProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  onTechnologyFilter: (technology: string) => void
  selectedCategory: string
  selectedTechnology: string
  searchQuery: string
}

export function FilterBar({
  onSearch,
  onCategoryFilter,
  onTechnologyFilter,
  selectedCategory,
  selectedTechnology,
  searchQuery,
  className = '',
  ...props
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  const handleCategoryChange = (category: string) => {
    onCategoryFilter(category)
  }

  const handleTechnologyChange = (technology: string) => {
    onTechnologyFilter(technology)
  }

  const clearFilters = () => {
    onSearch('')
    onCategoryFilter('all')
    onTechnologyFilter('')
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedTechnology

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {/* Search and Filter Toggle */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <GlassInput
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 rounded-lg glass-card hover:bg-muted transition-colors"
          aria-label="Toggle filters"
        >
          <Filter className="w-5 h-5" />
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="p-2 rounded-lg glass-card hover:bg-muted transition-colors"
            aria-label="Clear all filters"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <GlassCard className="p-6">
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-primary">Category</h3>
              <div className="flex flex-wrap gap-2">
                {PROJECT_CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Technology Filter */}
            <div>
              <h3 className="text-sm font-medium mb-3 text-primary">Technologies</h3>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {PROJECT_TECHNOLOGIES.map((technology) => (
                  <button
                    key={technology}
                    onClick={() => handleTechnologyChange(
                      selectedTechnology === technology ? '' : technology
                    )}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTechnology === technology
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {technology}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  )
}