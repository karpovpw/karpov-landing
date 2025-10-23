'use client'

import dynamic from 'next/dynamic'
import { Container } from '@/components/layout/Container'

const ProjectGrid = dynamic(() => import('@/components/portfolio/ProjectGrid').then(mod => mod.ProjectGrid), {
  ssr: false,
  loading: () => <div>Loading projects...</div>
})

export default function Portfolio() {
  return (
    <main className="relative">
      <Container size="xl" className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore my featured projects and technical work across web development,
            blockchain technology, and innovative solutions.
          </p>
        </div>

        <ProjectGrid />
      </Container>
    </main>
  )
}