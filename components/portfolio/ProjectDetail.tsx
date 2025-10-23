'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import { Project } from '@/types'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface ProjectDetailProps extends BaseComponentProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export function ProjectDetail({
  project,
  isOpen,
  onClose,
  className = '',
  ...props
}: ProjectDetailProps) {
  if (!project) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <motion.div
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto ${className}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            {...props}
          >
            <GlassCard className="p-6">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
                aria-label="Close project details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Project Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1
                      id="project-title"
                      className="text-3xl font-bold text-primary mb-2"
                    >
                      {project.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date().getFullYear()}
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 glass-button rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 inline" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 glass-button rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Github className="w-4 h-4 mr-2 inline" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Images */}
              {project.images.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative w-full h-64 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={image}
                          alt={`${project.title} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3 text-primary">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Features (if available) */}
              {project.featured && (
                <div className="mb-6">
                  <GlassCard className="p-4 bg-primary/10 border-primary/20">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                      <span className="font-medium text-primary">
                        Featured Project
                      </span>
                    </div>
                  </GlassCard>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}