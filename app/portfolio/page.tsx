import { ProjectGrid } from '@/components/portfolio/ProjectGrid'
import { Container } from '@/components/layout/Container'

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