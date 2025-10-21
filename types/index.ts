// Core types for the portfolio application

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Article {
  id: string
  title: string
  description: string
  content: string
  image?: string
  tags: string[]
  published: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface NavItem {
  title: string
  href: string
  description?: string
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}