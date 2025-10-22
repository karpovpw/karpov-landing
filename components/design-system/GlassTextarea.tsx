'use client'

import { forwardRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { BaseComponentProps } from '@/types'
import { getGlassBackground, getGlassBorder, getGlassShadow } from '@/lib/design-tokens'
import { useTheme } from './ThemeProvider'

interface GlassTextareaProps extends BaseComponentProps, Omit<HTMLMotionProps<"textarea">, keyof BaseComponentProps> {
  label?: string
  placeholder?: string
  variant?: 'default' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  error?: string
  success?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  rows?: number
  maxLength?: number
  fullWidth?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-5 py-4 text-lg',
}

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
}

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(({
  label,
  placeholder,
  variant = 'default',
  size = 'md',
  error,
  success = false,
  resize = 'vertical',
  rows = 4,
  maxLength,
  fullWidth = false,
  disabled = false,
  readOnly = false,
  required = false,
  className = '',
  ...motionProps
}, ref) => {
  const { theme } = useTheme()

  const hasError = Boolean(error)
  const showSuccess = success && !hasError

  const glassStyles = {
    background: getGlassBackground(theme),
    border: `1px solid ${hasError ? 'hsl(var(--destructive))' : showSuccess ? 'hsl(var(--success))' : getGlassBorder(theme)}`,
    boxShadow: hasError
      ? '0 0 0 2px hsl(var(--destructive) / 0.2)'
      : showSuccess
      ? '0 0 0 2px hsl(var(--success) / 0.2)'
      : getGlassShadow(theme),
  }

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <motion.label
          className={`
            ${sizeClasses[size].replace('px-', 'text-')}
            font-medium
            ${hasError ? 'text-destructive' : showSuccess ? 'text-success' : 'text-foreground'}
            ${disabled ? 'opacity-50' : ''}
          `}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </motion.label>
      )}

      <motion.textarea
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={`
          ${sizeClasses[size]}
          ${resizeClasses[resize]}
          ${fullWidth ? 'w-full' : ''}
          ${variant === 'filled' ? 'bg-white/10' : 'bg-transparent'}
          rounded-lg
          border
          font-normal
          transition-all duration-300 ease-out
          focus:outline-none
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted/20
          read-only:bg-muted/10 read-only:cursor-default
          ${hasError ? 'border-destructive focus:border-destructive' : ''}
          ${showSuccess ? 'border-success focus:border-success' : ''}
          ${className}
        `}
        style={glassStyles}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${label}-error` : undefined}
        whileFocus={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...motionProps}
      />

      <div className="flex justify-between items-center">
        {hasError && (
          <motion.p
            id={`${label}-error`}
            className="text-sm text-destructive"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}

        {maxLength && (
          <p className={`text-sm ml-auto ${hasError ? 'text-destructive' : 'text-muted-foreground'}`}>
            <span className="char-count">0</span>/{maxLength}
          </p>
        )}
      </div>
    </div>
  )
})

GlassTextarea.displayName = 'GlassTextarea'