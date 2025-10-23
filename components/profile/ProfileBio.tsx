'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/design-system/GlassCard'
import { PROFILE_DATA } from '@/content/profile'
import { BaseComponentProps } from '@/types'

interface ProfileBioProps extends BaseComponentProps {
  compact?: boolean
  showStats?: boolean
  animated?: boolean
}

export function ProfileBio({
  className = '',
  compact = false,
  showStats = true,
  animated = true,
  ...props
}: ProfileBioProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (compact) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={animated ? "visible" : "hidden"}
        className={`space-y-4 ${className}`}
        {...props}
      >
        <motion.div variants={itemVariants}>
          <GlassCard className="p-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {PROFILE_DATA.personal.bio}
            </p>
          </GlassCard>
        </motion.div>

        {showStats && (
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(PROFILE_DATA.stats).map(([key, stat]) => (
                <GlassCard key={key} className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">
                    {'count' in stat ? stat.count : stat.years}+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={animated ? "visible" : "hidden"}
      className={`space-y-6 ${className}`}
      {...props}
    >
      <motion.div variants={itemVariants}>
        <GlassCard className="p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4 text-primary">
              About Me
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              {PROFILE_DATA.personal.bio}
            </p>
            <p className="text-base text-muted-foreground italic">
              "{PROFILE_DATA.personal.tagline}"
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {showStats && (
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(PROFILE_DATA.stats).map(([key, stat]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {'count' in stat ? stat.count : stat.years}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div variants={itemVariants}>
        <GlassCard className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Expertise Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Primary Skills</h4>
              <ul className="space-y-1 text-muted-foreground">
                {PROFILE_DATA.expertise.primary.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Secondary Skills</h4>
              <ul className="space-y-1 text-muted-foreground">
                {PROFILE_DATA.expertise.secondary.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}