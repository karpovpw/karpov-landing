// GlassSelect component interface and styles (Non-JSX implementation)

import { BaseComponentProps } from '@/types'

export interface GlassSelectProps extends BaseComponentProps {
  label?: string
  placeholder?: string
  options: Array<{ value: string; label: string; disabled?: boolean }>
  value?: string
  variant?: 'default' | 'filled' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  error?: string
  success?: boolean
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  fullWidth?: boolean
  onChange?: (value: string | string[]) => void
  onFocus?: () => void
  onBlur?: () => void
}

export interface GlassSelectStyles {
  container: string
  label: string
  select: string
  error: string
  success: string
}

export function getGlassSelectStyles(
  variant: GlassSelectProps['variant'] = 'default',
  size: GlassSelectProps['size'] = 'md',
  error?: string,
  success?: boolean,
  disabled?: boolean,
  fullWidth?: boolean,
  theme: 'light' | 'dark' = 'light'
): GlassSelectStyles {
  const sizeClasses = {
    sm: {
      select: 'px-3 py-2 text-sm',
      label: 'text-sm',
    },
    md: {
      select: 'px-4 py-2 text-base',
      label: 'text-base',
    },
    lg: {
      select: 'px-5 py-3 text-lg',
      label: 'text-lg',
    },
  }

  const hasError = Boolean(error)
  const showSuccess = success && !hasError

  const glassBackground = theme === 'light'
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(0, 0, 0, 0.3)'

  const glassBorder = theme === 'light'
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(255, 255, 255, 0.1)'

  const glassShadow = theme === 'light'
    ? '0 8px 32px rgba(0, 0, 0, 0.1)'
    : '0 8px 32px rgba(0, 0, 0, 0.3)'

  return {
    container: `
      flex flex-col gap-2
      ${fullWidth ? 'w-full' : ''}
    `.trim(),

    label: `
      ${sizeClasses[size].label}
      font-medium
      ${hasError ? 'text-red-500' : showSuccess ? 'text-green-500' : 'text-gray-900'}
      ${disabled ? 'opacity-50' : ''}
    `.trim(),

    select: `
      ${sizeClasses[size].select}
      ${fullWidth ? 'w-full' : ''}
      ${variant === 'filled' ? 'bg-white/10' : 'bg-transparent'}
      rounded-lg
      border
      font-normal
      transition-all duration-300 ease-out
      focus:outline-none
      disabled:opacity-50 disabled:cursor-not-allowed
      ${hasError ? 'border-red-500 focus:border-red-500' : ''}
      ${showSuccess ? 'border-green-500 focus:border-green-500' : ''}
    `.trim(),

    error: `
      text-sm text-red-500
    `.trim(),

    success: `
      text-sm text-green-500
    `.trim(),
  }
}

export function createGlassSelect(props: GlassSelectProps) {
  const styles = getGlassSelectStyles(
    props.variant,
    props.size,
    props.error,
    props.success,
    props.disabled,
    props.fullWidth
  )

  return {
    containerProps: {
      className: styles.container,
    },

    labelProps: {
      className: styles.label,
      children: props.label,
    },

    selectProps: {
      className: styles.select,
      disabled: props.disabled,
      required: props.required,
      multiple: props.multiple,
      'aria-invalid': Boolean(props.error),
      'aria-describedby': props.error ? `${props.label}-error` : undefined,
      children: props.options.map(option => ({
        value: option.value,
        label: option.label,
        disabled: option.disabled,
      })),
    },

    errorProps: props.error ? {
      id: `${props.label}-error`,
      className: styles.error,
      children: props.error,
    } : null,

    successProps: props.success && !props.error ? {
      className: styles.success,
      children: '✓ Valid selection',
    } : null,
  }
}