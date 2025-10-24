'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamicImport from 'next/dynamic'
import { Container } from '@/components/layout/Container'
import { GlassCard } from '@/components/design-system/GlassCard'

const ArticleList = dynamicImport(() => import('@/components/content/ArticleList').then(mod => mod.ArticleList), {
  ssr: false,
  loading: () => <div>Loading articles...</div>
})

const photos = [
  '/myPhoto.jpeg',
  '/Generated Image October 23, 2025 - 10_49PM.jpeg',
  '/Generated Image October 23, 2025 - 11_07PM.jpeg',
  '/Generated Image October 23, 2025 - 11_08PM.jpeg',
  '/Generated Image October 23, 2025 - 11_18PM (1).jpeg',
  '/Generated Image October 23, 2025 - 11_19PM.jpeg',
  '/Generated Image October 23, 2025 - 11_33PM.jpeg',
  '/Generated Image October 23, 2025 - 11_47PM.jpeg',
  '/generated-image (2).jpeg',
  '/generated-image (3).jpeg',
  '/generated-image.jpeg'
]

export default function Articles() {
  return (
    <main className="relative min-h-screen">
      {/* Background Photo Collage */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.8, 1.1, 0.8],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Image
              src={photo}
              alt={`Background photo ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>

      <Container size="xl" className="py-16 relative z-10">
        <GlassCard className="p-8 md:p-12">
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
        </GlassCard>
      </Container>
    </main>
  )
}