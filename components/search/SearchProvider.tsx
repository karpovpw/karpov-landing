'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { BaseComponentProps } from '@/types'

interface SearchContextType {
  query: string
  results: SearchResult[]
  isSearching: boolean
  setQuery: (query: string) => void
  search: (query: string) => void
  clearResults: () => void
}

interface SearchResult {
  id: string
  type: 'project' | 'article' | 'page'
  title: string
  description: string
  url: string
  relevance: number
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

interface SearchProviderProps extends BaseComponentProps {
  contentTypes?: string[]
  enableCache?: boolean
}

export function SearchProvider({
  children,
  contentTypes = ['projects', 'articles', 'pages'],
  enableCache = true,
  ...props
}: SearchProviderProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock search function - in a real app, this would search across your content
  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)

    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 300))

      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'project' as const,
          title: 'BMAD Multi-Agent System',
          description: 'A sophisticated multi-agent system for automated development workflows.',
          url: '/portfolio#1',
          relevance: 0.95,
        },
        {
          id: '2',
          type: 'article' as const,
          title: 'Building Multi-Agent Systems with BMAD Framework',
          description: 'Explore how the BMAD framework revolutionizes software development.',
          url: '/articles/1',
          relevance: 0.87,
        },
        {
          id: '3',
          type: 'project' as const,
          title: 'DeFi Yield Optimizer',
          description: 'Smart contract-based decentralized finance protocol.',
          url: '/portfolio#2',
          relevance: 0.78,
        },
      ].filter(result =>
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.description.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setResults(mockResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const clearResults = () => {
    setQuery('')
    setResults([])
  }

  const value: SearchContextType = {
    query,
    results,
    isSearching,
    setQuery,
    search,
    clearResults,
  }

  return (
    <SearchContext.Provider value={value} {...props}>
      {children}
    </SearchContext.Provider>
  )
}