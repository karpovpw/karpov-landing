'use client'

import { motion } from 'framer-motion'
import { Linkedin, Users, Award, Calendar } from 'lucide-react'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface LinkedInProfileProps extends BaseComponentProps {
  profileId: string
  showEndorsements?: boolean
  compact?: boolean
}

export function LinkedInProfile({
  profileId,
  showEndorsements = true,
  compact = false,
  className = '',
  ...props
}: LinkedInProfileProps) {
  // Mock LinkedIn data - in a real app, this would come from LinkedIn API
  const profileData = {
    name: 'Karpov',
    title: 'Full Stack Developer & Multi-Agent Systems Architect',
    location: 'Bangkok, Thailand',
    connections: 500,
    endorsements: 25,
    skills: ['React', 'TypeScript', 'Node.js', 'Blockchain', 'AI/ML'],
    experience: '5+ years',
    education: 'Bachelor of Computer Science',
  }

  if (compact) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary">{profileData.name}</h3>
              <p className="text-sm text-muted-foreground">{profileData.title}</p>
            </div>
            <motion.a
              href={`https://linkedin.com/in/${profileId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 glass-button rounded-lg text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.a>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <GlassCard className="p-6">
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <Linkedin className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-primary mb-1">
              {profileData.name}
            </h2>
            <p className="text-muted-foreground mb-2">{profileData.title}</p>
            <p className="text-sm text-muted-foreground">{profileData.location}</p>
          </div>
          <motion.a
            href={`https://linkedin.com/in/${profileId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 glass-button rounded-lg font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Profile
          </motion.a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="w-4 h-4 text-primary mr-1" />
              <span className="text-lg font-bold text-primary">
                {profileData.connections}+
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Connections</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Award className="w-4 h-4 text-primary mr-1" />
              <span className="text-lg font-bold text-primary">
                {profileData.endorsements}+
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Endorsements</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4 text-primary mr-1" />
              <span className="text-lg font-bold text-primary">
                {profileData.experience}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Experience</p>
          </div>

          <div className="text-center">
            <div className="mb-1">
              <span className="text-lg font-bold text-primary">
                {profileData.education}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Education</p>
          </div>
        </div>

        {showEndorsements && (
          <div>
            <h3 className="font-semibold mb-3 text-primary">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}