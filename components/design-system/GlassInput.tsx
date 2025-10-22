'use client'

import { forwardRef, useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { BaseComponentProps } from '@/types'
import { getGlassBackground, getGlassBorder, getGlassShadow } from '@/lib/design-tokens'
import { useTheme } from './ThemeProvider'
import { applyFocusRing } from '@/lib/accessibility-utils'

interface GlassInputProps extends BaseComponentProps, Omit<HTMLMotionProps<"input">, keyof BaseComponentProps | 'size'> {
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
  variant?: 'default' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  error?: string
  success?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  autoComplete?: string
  maxLength?: number
  pattern?: string
  inputMode?: 'text' | 'email' | 'tel' | 'url' | 'numeric' | 'decimal' | 'search'
}

const sizeClasses = {
  sm: {
    input: 'px-3 py-2 text-sm',
    label: 'text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    input: 'px-4 py-2 text-base',
    label: 'text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    input: 'px-5 py-3 text-lg',
    label: 'text-lg',
    icon: 'w-6 h-6',
  },
  xl: {
    input: 'px-6 py-4 text-xl',
    label: 'text-xl',
    icon: 'w-7 h-7',
  },
}

const inputVariants = {
  default: 'bg-transparent',
  filled: 'bg-white/10',
  outline: 'bg-transparent border-2',
}

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(({
  label,
  placeholder,
  type = 'text',
  variant = 'default',
  size = 'md',
  error,
  success = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  readOnly = false,
  required = false,
  className = '',
  value,
  onChange,
  onFocus,
  onBlur,
  ...motionProps
}, ref) => {
  const { theme } = useTheme()
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')

  const hasError = Boolean(error)
  const showSuccess = success && !hasError

  const glassStyles = {
    background: variant === 'filled' ? 'rgba(255, 255, 255, 0.1)' : getGlassBackground(theme),
    border: `1px solid ${hasError ? 'hsl(var(--destructive))' : showSuccess ? 'hsl(var(--success))' : getGlassBorder(theme)}`,
    boxShadow: hasError
      ? '0 0 0 2px hsl(var(--destructive) / 0.2)'
      : showSuccess
      ? '0 0 0 2px hsl(var(--success) / 0.2)'
      : getGlassShadow(theme),
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange?.(e)
  }

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <motion.label
          className={`
            ${sizeClasses[size].label}
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

      <div className="relative">
        {leftIcon && (
          <div className={`
            absolute left-3 top-1/2 transform -translate-y-1/2
            ${sizeClasses[size].icon}
            ${hasError ? 'text-destructive' : showSuccess ? 'text-success' : 'text-muted-foreground'}
            ${disabled ? 'opacity-50' : ''}
          `}>
            {leftIcon}
          </div>
        )}

        <motion.input
          ref={(el) => {
            if (el) {
              applyFocusRing(el)
              if (typeof ref === 'function') ref(el)
              else if (ref) ref.current = el
            }
          }}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            ${sizeClasses[size].input}
            ${inputVariants[variant]}
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${fullWidth ? 'w-full' : ''}
            rounded-lg
            border
            font-normal
            transition-all duration-300 ease-out
            focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted/20
            read-only:bg-muted/10 read-only:cursor-default
            ${hasError ? 'border-destructive focus:border-destructive' : ''}
            ${showSuccess ? 'border-success focus:border-success' : ''}
            ${isFocused ? 'ring-2 ring-primary/20' : ''}
            ${className}
          `}
          style={glassStyles}
          autoComplete={type === 'password' ? 'current-password' : 'off'}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${label}-error` : undefined}
          whileFocus={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...motionProps}
        />

        {rightIcon && (
          <div className={`
            absolute right-3 top-1/2 transform -translate-y-1/2
            ${sizeClasses[size].icon}
            ${hasError ? 'text-destructive' : showSuccess ? 'text-success' : 'text-muted-foreground'}
            ${disabled ? 'opacity-50' : ''}
          `}>
            {rightIcon}
          </div>
        )}
      </div>

      {hasError && (
        <motion.p
          id={`${label}-error`}
          className="text-sm text-destructive"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}

      {showSuccess && !hasError && (
        <motion.p
          className="text-sm text-success"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          ✓ Valid input
        </motion.p>
      )}
    </div>
  )
})

GlassInput.displayName = 'GlassInput'