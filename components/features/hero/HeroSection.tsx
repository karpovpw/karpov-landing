'use client'

import { BaseComponentProps } from '@/types'
import { useRouter } from 'next/navigation'

export function HeroSection({ className }: BaseComponentProps) {
  const router = useRouter()
  return (
    <section className={`relative min-h-screen flex items-center justify-center ${className || ''}`}>
      <div className="container mx-auto px-4 text-center">
        <div
          className="max-w-4xl mx-auto"
        >
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-primary"
          >
            Karpov
          </h1>

          <p
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            Full Stack Developer & Multi-Agent Systems Architect
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="glass-button px-8 py-4 text-lg font-semibold" onClick={() => router.push('/portfolio')}>
              View Portfolio
            </button>
            <button className="glass-button px-8 py-4 text-lg font-semibold" onClick={() => router.push('/contact')}>
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 glass-card rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 glass-card rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 glass-card rounded-full opacity-40 animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  )
}