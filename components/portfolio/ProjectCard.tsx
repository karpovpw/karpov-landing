'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ExternalLink, Github, Eye } from 'lucide-react'
import { Project } from '@/types'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface ProjectCardProps extends BaseComponentProps {
  project: Project
  featured?: boolean
  onClick?: (project: Project) => void
}

export function ProjectCard({
  project,
  featured = false,
  onClick,
  className = '',
  ...props
}: ProjectCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(project)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
      {...props}
    >
      <GlassCard
        className={`p-6 cursor-pointer hover:shadow-xl transition-all duration-300 ${
          featured ? 'ring-2 ring-primary/20' : ''
        }`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        aria-label={`View project: ${project.title}`}
      >
        {/* Project Image */}
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image
            src={project.images[0] || '/images/placeholder-project.jpg'}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {featured && (
            <div className="absolute top-2 left-2">
              <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-semibold mb-2 text-primary line-clamp-2">
          {project.title}
        </h3>

        {/* Project Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                aria-label={`View demo for ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                aria-label={`View source code for ${project.title}`}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}