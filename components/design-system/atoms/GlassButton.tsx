'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { createGlassmorphismStyles, cn, isGlassmorphismSupported } from '../utils/glassmorphism-utils';

/**
 * GlassButton - Atomic glassmorphism button component
 * The foundational interactive element with glassmorphism effects
 */

const glassButtonVariants = cva(
  /* Base styles for all button variants */
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'glass-interactive hover:translate-y-[-2px] active:translate-y-0',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        accent: 'glass-accent hover:brightness-110',
        'accent-secondary': 'glass-accent-secondary hover:brightness-110',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-lg px-8',
        icon: 'h-10 w-10',
      },
      intensity: {
        subtle: 'subtle-glass',
        default: 'glass',
        enhanced: 'enhanced-glass',
      },
      shape: {
        default: 'rounded-lg',
        pill: 'rounded-full',
        square: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      intensity: 'default',
      shape: 'default',
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  /**
   * Custom glassmorphism configuration
   */
  glassConfig?: {
    blur?: number;
    backgroundOpacity?: number;
    borderOpacity?: number;
    shadowIntensity?: 'low' | 'medium' | 'high';
  };

  /**
   * Disable glassmorphism effects for fallback
   */
  disableGlass?: boolean;

  /**
   * Show loading state
   */
  loading?: boolean;

  /**
   * Loading spinner position
   */
  loadingPosition?: 'left' | 'right';

  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;
}

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant,
      size,
      intensity,
      shape,
      glassConfig,
      disableGlass = false,
      loading = false,
      loadingPosition = 'left',
      loadingComponent,
      children,
      style,
      disabled,
      ...props
    },
    ref
  ) => {
    // Generate glassmorphism styles
    const glassStyles = React.useMemo(() => {
      if (disableGlass || !isGlassmorphismSupported()) {
        return {};
      }

      const baseConfig = {
        blur: glassConfig?.blur || (intensity === 'enhanced' ? 16 : intensity === 'subtle' ? 8 : 12),
        backgroundOpacity: glassConfig?.backgroundOpacity || (intensity === 'enhanced' ? 0.18 : intensity === 'subtle' ? 0.08 : 0.12),
        borderOpacity: glassConfig?.borderOpacity || (intensity === 'enhanced' ? 0.2 : intensity === 'subtle' ? 0.1 : 0.15),
        shadowIntensity: glassConfig?.shadowIntensity || (intensity === 'enhanced' ? 'high' : intensity === 'subtle' ? 'low' : 'medium'),
      };

      return createGlassmorphismStyles(baseConfig, {
        mobileOptimized: true,
        disableAnimations: loading,
      });
    }, [glassConfig, intensity, disableGlass, loading]);

    // Default loading spinner
    const defaultLoadingSpinner = (
      <svg
        className="animate-spin -ml-1 mr-3 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    );

    const loadingElement = loadingComponent || defaultLoadingSpinner;
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          glassButtonVariants({ variant, size, intensity, shape }),
          className
        )}
        style={{
          ...glassStyles,
          ...style,
        }}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && loadingPosition === 'left' && loadingElement}
        {children}
        {loading && loadingPosition === 'right' && loadingElement}
      </button>
    );
  }
);

GlassButton.displayName = 'GlassButton';

/**
 * Specialized GlassButton variants for common use cases
 */

// Primary action button with enhanced glassmorphism
export const GlassButtonPrimary: React.FC<Omit<GlassButtonProps, 'variant'>> = (props) => (
  <GlassButton {...props} variant="accent" intensity="enhanced" />
);

// Secondary action button
export const GlassButtonSecondary: React.FC<Omit<GlassButtonProps, 'variant'>> = (props) => (
  <GlassButton {...props} variant="accent-secondary" />
);

// Ghost button for subtle actions
export const GlassButtonGhost: React.FC<Omit<GlassButtonProps, 'variant'>> = (props) => (
  <GlassButton {...props} variant="ghost" />
);

export default GlassButton;