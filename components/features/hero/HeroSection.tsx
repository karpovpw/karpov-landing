'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BaseComponentProps } from '@/types'
import { PROFILE_DATA } from '@/content/profile'
import { AnimatedText } from '../../hero/AnimatedText'
import { ProfileBio } from '@/components/profile/ProfileBio'
import { SkillsShowcase } from '@/components/profile/SkillsShowcase'
import { SearchBar } from '@/components/search/SearchBar'
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup'
import { GlassCard } from '@/components/design-system/GlassCard'
import { ThemeToggle } from '@/components/design-system/ThemeToggle'

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
                <GlassCard className="p-2 rounded-full">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden">
                    <Image
                      src={PROFILE_DATA.profileImage.src}
                      alt={PROFILE_DATA.profileImage.alt}
                      fill
                      className="object-cover"
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
                  className="glass-button px-8 py-4 text-lg font-semibold"
                  onClick={() => router.push('/portfolio')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.button>
                <motion.button
                  className="glass-button px-8 py-4 text-lg font-semibold"
                  onClick={() => router.push('/articles')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Articles
                </motion.button>
                <motion.button
                  className="glass-button px-8 py-4 text-lg font-semibold"
                  onClick={() => router.push('/contact')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <ProfileBio compact showStats />
          </motion.div>

          {/* Skills Showcase */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Top Skills
              </h2>
              <p className="text-muted-foreground">
                Technologies and tools I work with
              </p>
            </div>
            <SkillsShowcase maxSkills={8} layout="grid" />
          </motion.div>

          {/* Search and Newsletter */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Search My Content
              </h2>
              <p className="text-muted-foreground mb-4">
                Find projects, articles, and insights across my portfolio.
              </p>
              <SearchBar />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                Stay Connected
              </h2>
              <p className="text-muted-foreground mb-4">
                Subscribe to get updates on new projects and articles.
              </p>
              <NewsletterSignup compact />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 glass-card rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 glass-card rounded-full opacity-30"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 glass-card rounded-full opacity-40"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-16 h-16 glass-card rounded-lg opacity-25"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-20 h-20 glass-card rounded-lg opacity-25"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />
      </div>
    </section>
  )
}