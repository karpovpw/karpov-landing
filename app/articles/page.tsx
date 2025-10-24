'use client'

import dynamicImport from 'next/dynamic'
import { Container } from '@/components/layout/Container'

const ArticleList = dynamicImport(() => import('@/components/content/ArticleList').then(mod => mod.ArticleList), {
  ssr: false,
  loading: () => <div>Loading articles...</div>
})

export default function Articles() {
  return (
    <main className="min-h-screen">
      <Container size="2xl" className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights and tutorials on BMAD methodologies, blockchain technology,
            software architecture, and modern development practices.
          </p>
        </div>

        <ArticleList />
      </Container>
    </main>
  )
}