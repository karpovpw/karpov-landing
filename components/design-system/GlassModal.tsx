'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { BaseComponentProps } from '@/types'
import { getGlassBackground, getGlassBorder, getGlassShadow } from '@/lib/design-tokens'
import { useTheme } from './ThemeProvider'
import { trapFocus } from '@/lib/accessibility-utils'

interface GlassModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  children: React.ReactNode
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full h-full',
}

export function GlassModal({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
  children,
  className = '',
}: GlassModalProps) {
  const { theme } = useTheme()
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeOnEscape, onClose])

  // Focus trap
  useEffect(() => {
    if (isOpen && modalRef.current) {
      return trapFocus(modalRef.current)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  }

  const modalVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -50,
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const glassStyles = {
    background: getGlassBackground(theme),
    border: `1px solid ${getGlassBorder(theme)}`,
    boxShadow: getGlassShadow(theme),
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onClick={closeOnOverlay ? onClose : undefined}
        >
          <motion.div
            ref={modalRef}
            className={`
              ${sizeClasses[size]}
              w-full max-h-[90vh] overflow-auto
              rounded-xl p-6
              ${className}
            `}
            style={glassStyles}
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {title && (
              <div className="flex items-center justify-between mb-6">
                <h2 id="modal-title" className="text-2xl font-semibold text-foreground">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="
                    w-8 h-8 rounded-full
                    bg-muted/20 hover:bg-muted/40
                    flex items-center justify-center
                    text-muted-foreground hover:text-foreground
                    transition-colors duration-200
                    focus:outline-none focus:ring-2 focus:ring-primary/20
                  "
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="text-foreground">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}