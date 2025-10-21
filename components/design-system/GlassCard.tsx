'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Glass morphism intensity - affects background opacity and blur
   * @default 'default'
   */
  intensity?: 'subtle' | 'default' | 'enhanced';

  /**
   * Card variant for different use cases
   * @default 'default'
   */
  variant?: 'default' | 'interactive' | 'hero' | 'nav' | 'content';

  /**
   * Custom glassmorphism properties
   */
  glassProps?: {
    blur?: string;
    backgroundOpacity?: number;
    borderOpacity?: number;
    shadowIntensity?: 'low' | 'medium' | 'high';
  };

  /**
   * Children content
   */
  children: React.ReactNode;

  /**
   * Disable glassmorphism effects (useful for fallbacks)
   * @default false
   */
  disableGlass?: boolean;
}

/**
 * GlassCard - A foundational glassmorphism card component with backdrop-filter effects
 *
 * Features:
 * - Configurable glassmorphism properties using CSS custom properties
 * - Theme-aware styling for light and dark modes
 * - Responsive design with mobile optimizations
 * - Multiple variants for different use cases
 * - Interactive hover states and animations
 * - Accessibility considerations
 *
 * @example
 * ```tsx
 * <GlassCard variant="interactive" className="p-6">
 *   <h2>Glass Card Content</h2>
 *   <p>This content has glassmorphism effects</p>
 * </GlassCard>
 * ```
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      intensity = 'default',
      variant = 'default',
      glassProps,
      children,
      disableGlass = false,
      style,
      ...props
    },
    ref
  ) => {
    // Generate dynamic styles based on glassmorphism configuration
    const glassStyles: React.CSSProperties = React.useMemo(() => {
      if (disableGlass) {
        return {};
      }

      const baseStyles: React.CSSProperties = {
        // Base glassmorphism effect using CSS custom properties
        background: `rgba(var(--glass-background), var(--glass-background-opacity))`,
        backdropFilter: `blur(var(--glass-blur))`,
        border: `1px solid rgba(var(--glass-border), var(--glass-border-opacity))`,
        borderRadius: '0.75rem', // rounded-lg equivalent
      };

      // Apply intensity modifiers
      if (intensity === 'subtle') {
        baseStyles.background = `rgba(var(--glass-background), calc(var(--glass-background-opacity) - 0.03))`;
        baseStyles.backdropFilter = `blur(calc(var(--glass-blur) - 2px))`;
        baseStyles.border = `1px solid rgba(var(--glass-border), calc(var(--glass-border-opacity) - 0.05))`;
      } else if (intensity === 'enhanced') {
        baseStyles.background = `rgba(var(--glass-background), calc(var(--glass-background-opacity) + 0.05))`;
        baseStyles.backdropFilter = `blur(calc(var(--glass-blur) + 4px))`;
        baseStyles.border = `1px solid rgba(var(--glass-border), calc(var(--glass-border-opacity) + 0.05))`;
      }

      // Apply custom properties if provided
      if (glassProps) {
        if (glassProps.blur) {
          baseStyles.backdropFilter = `blur(${glassProps.blur})`;
        }
        if (glassProps.backgroundOpacity !== undefined) {
          baseStyles.background = `rgba(var(--glass-background), ${glassProps.backgroundOpacity})`;
        }
        if (glassProps.borderOpacity !== undefined) {
          baseStyles.border = `1px solid rgba(var(--glass-border), ${glassProps.borderOpacity})`;
        }
      }

      // Apply shadow based on variant and shadow intensity
      const shadowIntensity = glassProps?.shadowIntensity || 'medium';
      if (shadowIntensity === 'low') {
        baseStyles.boxShadow = '0 4px 16px rgba(var(--glass-shadow-color), calc(var(--glass-shadow-opacity) - 0.2))';
      } else if (shadowIntensity === 'medium') {
        baseStyles.boxShadow = 'var(--glass-shadow) rgba(var(--glass-shadow-color), var(--glass-shadow-opacity))';
      } else if (shadowIntensity === 'high') {
        baseStyles.boxShadow = '0 12px 48px rgba(var(--glass-shadow-color), calc(var(--glass-shadow-opacity) + 0.2))';
      }

      return baseStyles;
    }, [intensity, glassProps, disableGlass]);

    // Determine CSS classes based on variant
    const variantClasses = React.useMemo(() => {
      const baseClasses = 'transition-all duration-200 ease-in-out';

      if (disableGlass) {
        return cn(baseClasses, 'bg-card border border-border', className);
      }

      switch (variant) {
        case 'interactive':
          return cn(
            baseClasses,
            'hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 cursor-pointer',
            className
          );
        case 'hero':
          return cn(baseClasses, 'glass-hero', className);
        case 'nav':
          return cn(baseClasses, 'glass-nav', className);
        case 'content':
          return cn(baseClasses, 'glass-content', className);
        default:
          return cn(baseClasses, className);
      }
    }, [variant, disableGlass, className]);

    // Combine styles
    const combinedStyles = { ...glassStyles, ...style };

    return (
      <div
        ref={ref}
        className={variantClasses}
        style={combinedStyles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;