'use client'

import { motion } from 'framer-motion'
import { GlassCard } from '@/components/design-system/GlassCard'
import { PROFILE_DATA } from '@/content/profile'
import { BaseComponentProps } from '@/types'

interface SkillsShowcaseProps extends BaseComponentProps {
  layout?: 'grid' | 'list'
  animated?: boolean
  maxSkills?: number
}

export function SkillsShowcase({
  className = '',
  layout = 'grid',
  animated = true,
  maxSkills = 6,
  ...props
}: SkillsShowcaseProps) {
  const allSkills = [
    ...PROFILE_DATA.skills.frontend.skills,
    ...PROFILE_DATA.skills.backend.skills,
    ...PROFILE_DATA.skills.blockchain.skills,
    ...PROFILE_DATA.skills.ai_ml.skills,
    ...PROFILE_DATA.skills.devops.skills,
  ].sort((a, b) => b.level - a.level).slice(0, maxSkills)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (layout === 'list') {
    return (
      <div className={`space-y-4 ${className}`} {...props}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={animated ? "visible" : "hidden"}
          className="space-y-3"
        >
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="flex items-center justify-between p-3 glass-card rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="font-medium text-primary">{skill.name}</span>
                <span className="text-sm text-muted-foreground">
                  {skill.years} years
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={animated ? { width: `${skill.level}%` } : { width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <span className="text-sm font-medium">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`} {...props}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={animated ? "visible" : "hidden"}
        className="space-y-4"
      >
        {allSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <GlassCard className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-primary">{skill.name}</h3>
                <span className="text-sm text-muted-foreground">
                  {skill.years}y
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={animated ? { width: `${skill.level}%` } : { width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
                <span className="text-sm font-medium min-w-[3rem]">
                  {skill.level}%
                </span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}