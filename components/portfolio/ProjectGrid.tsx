'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Project } from '@/types'
import { PROJECTS } from '@/content/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectDetail } from './ProjectDetail'
import { FilterBar } from '@/components/filtering/FilterBar'
import { Grid } from '@/components/layout/Grid'
import { BaseComponentProps } from '@/types'

interface ProjectGridProps extends BaseComponentProps {
  filterable?: boolean
  sortable?: boolean
  layout?: 'grid' | 'list'
  initialProjects?: Project[]
}

export function ProjectGrid({
  filterable = true,
  sortable = true,
  layout = 'grid',
  initialProjects = PROJECTS,
  className = '',
  ...props
}: ProjectGridProps) {
  const [projects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTechnology, setSelectedTechnology] = useState('')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory)
    }

    // Technology filter
    if (selectedTechnology) {
      filtered = filtered.filter(project =>
        project.technologies.some(tech =>
          tech.toLowerCase().includes(selectedTechnology.toLowerCase())
        )
      )
    }

    // Sort: featured first, then by title
    if (sortable) {
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return a.title.localeCompare(b.title)
      })
    }

    return filtered
  }, [projects, searchQuery, selectedCategory, selectedTechnology, sortable])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDetailOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailOpen(false)
    setSelectedProject(null)
  }

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

  return (
    <div className={`space-y-8 ${className}`} {...props}>
      {/* Filter Bar */}
      {filterable && (
        <FilterBar
          onSearch={setSearchQuery}
          onCategoryFilter={setSelectedCategory}
          onTechnologyFilter={setSelectedTechnology}
          selectedCategory={selectedCategory}
          selectedTechnology={selectedTechnology}
          searchQuery={searchQuery}
        />
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
        {(searchQuery || selectedCategory !== 'all' || selectedTechnology) && (
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedTechnology('')
            }}
            className="text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid cols={3} gap="lg" className="md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard
                  project={project}
                  featured={project.featured}
                  onClick={handleProjectClick}
                />
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            No projects found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
              setSelectedTechnology('')
            }}
            className="text-primary hover:underline"
          >
            Clear filters to see all projects
          </button>
        </div>
      )}

      {/* Project Detail Modal */}
      <ProjectDetail
        project={selectedProject}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  )
}