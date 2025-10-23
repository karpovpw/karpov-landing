'use client'

import dynamic from 'next/dynamic'

const HeroSection = dynamic(() => import('@/components/features/hero/HeroSection').then(mod => mod.HeroSection), {
  ssr: false,
  loading: () => <div>Loading hero section...</div>
})

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
    </main>
  )
}