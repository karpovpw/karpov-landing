'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BaseComponentProps } from '@/types'
import { PROFILE_DATA } from '@/content/profile'
import { AnimatedText } from '@/components/hero/AnimatedText'
import { GlassCard } from '@/components/design-system/GlassCard'
import { ThemeToggle } from '@/components/design-system/ThemeToggle'

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

  return (
    <>
      <style>{waveKeyframes}</style>
      <section className={`relative min-h-screen flex items-center justify-center ${className || ''}`}>
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
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
              {/* Profile Image */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-2 rounded-lg" style={{ borderStyle: 'wavy', borderWidth: '4px', borderColor: 'var(--primary)', animation: 'wave 2s infinite' }}>
                  <div className="relative w-32 h-auto md:w-40 md:h-auto rounded-lg overflow-hidden">
                    <Image
                      src={PROFILE_DATA.profileImage.src}
                      alt={PROFILE_DATA.profileImage.alt}
                      width={PROFILE_DATA.profileImage.width}
                      height={PROFILE_DATA.profileImage.height}
                      className="object-contain"
                      priority
                    />
                  </div>
                </GlassCard>
              </motion.div>

              {/* Name and Title */}
              <div className="space-y-4">
                <motion.h1
                  className="text-5xl md:text-7xl font-bold text-primary"
                  variants={itemVariants}
                >
                  {PROFILE_DATA.personal.name}
                </motion.h1>

                <motion.div variants={itemVariants}>
                  <AnimatedText
                    text={PROFILE_DATA.personal.title}
                    speed={100}
                    className="text-xl md:text-2xl text-muted-foreground block"
                  />
                </motion.div>

                <motion.p
                  className="text-lg text-muted-foreground max-w-2xl mx-auto"
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
                  className="px-8 py-4 text-lg font-semibold bg-accent text-accent-foreground rounded-lg border-2 border-accent hover:bg-accent/80 transition-colors"
                  onClick={() => router.push('/portfolio')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.button>
                <motion.button
                  className="px-8 py-4 text-lg font-semibold bg-accent text-accent-foreground rounded-lg border-2 border-accent hover:bg-accent/80 transition-colors"
                  onClick={() => router.push('/articles')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Articles
                </motion.button>
                <motion.button
                  className="px-8 py-4 text-lg font-semibold bg-accent text-accent-foreground rounded-lg border-2 border-accent hover:bg-accent/80 transition-colors"
                  onClick={() => router.push('/contact')}
                  whileHover={{ scale: 1.05 }}
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