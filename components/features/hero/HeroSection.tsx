'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BaseComponentProps } from '@/types'
import { PROFILE_DATA } from '@/content/profile'
import { AnimatedText } from '@/components/hero/AnimatedText'
import { GlassCard } from '@/components/design-system/GlassCard'

const waveKeyframes = `
@keyframes wave {
  0% { border-radius: 50%; }
  25% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  75% { border-radius: 40% 70% 60% 30% / 40% 70% 60% 50%; }
  100% { border-radius: 50%; }
}
`

export function HeroSection({ className }: BaseComponentProps) {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

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

  return (
    <>
      <style>{waveKeyframes}</style>
      <section className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20 dark:from-primary/10 dark:via-background dark:to-secondary/10 ${className || ''}`}>
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
                clipPath: `polygon(${Math.random() * 20 + 10}% ${Math.random() * 20 + 10}%, ${Math.random() * 20 + 70}% ${Math.random() * 20 + 10}%, ${Math.random() * 20 + 90}% ${Math.random() * 20 + 30}%, ${Math.random() * 20 + 90}% ${Math.random() * 20 + 70}%, ${Math.random() * 20 + 70}% ${Math.random() * 20 + 90}%, ${Math.random() * 20 + 10}% ${Math.random() * 20 + 90}%, ${Math.random() * 20 + 10}% ${Math.random() * 20 + 70}%)`,
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
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex flex-col items-center space-y-6">

              {/* Name and Title */}
              <div className="space-y-4 z-10 relative">
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-primary bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl"
                  variants={itemVariants}
                >
                  {PROFILE_DATA.personal.name}
                </motion.h1>

                <motion.div variants={itemVariants}>
                  <AnimatedText
                    text={PROFILE_DATA.personal.title}
                    speed={100}
                    className="text-xl md:text-2xl text-primary bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl block"
                  />
                </motion.div>

                <motion.p
                  className="text-lg text-primary bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-2xl max-w-2xl mx-auto"
                  variants={itemVariants}
                >
                  {PROFILE_DATA.personal.tagline}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <motion.button
                  className="px-8 py-4 text-lg font-semibold bg-white/5 backdrop-blur-2xl text-primary border-2 border-white/30 rounded-2xl shadow-2xl hover:bg-white/15 hover:border-white/50 transition-all duration-500 hover:shadow-3xl animate-wiggle"
                  onClick={() => router.push('/portfolio')}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.button>
                <motion.button
                  className="px-8 py-4 text-lg font-semibold bg-white/5 backdrop-blur-2xl text-primary border-2 border-white/30 rounded-2xl shadow-2xl hover:bg-white/15 hover:border-white/50 transition-all duration-500 hover:shadow-3xl animate-wiggle"
                  onClick={() => router.push('/articles')}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Articles
                </motion.button>
                <motion.button
                  className="px-8 py-4 text-lg font-semibold bg-white/5 backdrop-blur-2xl text-primary border-2 border-white/30 rounded-2xl shadow-2xl hover:bg-white/15 hover:border-white/50 transition-all duration-500 hover:shadow-3xl animate-wiggle"
                  onClick={() => router.push('/contact')}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </div>
          </motion.div>



        </motion.div>
      </div>

    </section>
    </>)
}