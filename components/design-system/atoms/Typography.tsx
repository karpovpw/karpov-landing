'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/glassmorphism-utils';

/**
 * Typography System - Atomic typography components with glassmorphism support
 * Provides consistent text styling with optional glassmorphism backgrounds
 */

const typographyVariants = cva(
  /* Base typography styles */
  'font-geist text-foreground',
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
        p: 'leading-7 [&:not(:first-child)]:mt-6',
        blockquote: 'mt-6 border-l-2 pl-6 italic',
        code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        lead: 'text-xl text-muted-foreground',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-sm text-muted-foreground',
      },
      glassVariant: {
        none: '',
        subtle: 'glass-text-subtle',
        floating: 'glass-text-floating',
        highlighted: 'glass-text-highlighted',
      },
    },
    defaultVariants: {
      variant: 'p',
      glassVariant: 'none',
    },
  }
);

/**
 * GlassTypography - Typography component with glassmorphism text effects
 */
export interface GlassTypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /**
   * HTML element to render as
   */
  as?: keyof JSX.IntrinsicElements;

  /**
   * Glassmorphism effect for text background
   */
  glassEffect?: 'none' | 'subtle' | 'floating' | 'highlighted';

  /**
   * Custom glassmorphism configuration for text
   */
  glassConfig?: {
    backgroundOpacity?: number;
    blur?: number;
    padding?: string;
  };
}

const GlassTypography = forwardRef<HTMLElement, GlassTypographyProps>(
  (
    {
      className,
      variant,
      glassVariant,
      as,
      glassEffect,
      glassConfig,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as || (variant?.startsWith('h') ? variant as keyof JSX.IntrinsicElements : 'p');

    // Generate glassmorphism styles for text backgrounds
    const glassStyles: React.CSSProperties = React.useMemo(() => {
      if (!glassVariant && !glassEffect) return {};

      const config = {
        backgroundOpacity: glassConfig?.backgroundOpacity || 0.1,
        blur: glassConfig?.blur || 8,
        padding: glassConfig?.padding || '0.25rem 0.5rem',
      };

      return {
        background: `rgba(var(--glass-background), ${config.backgroundOpacity})`,
        backdropFilter: `blur(${config.blur}px)`,
        borderRadius: '0.375rem',
        padding: config.padding,
        margin: '0.125rem 0',
        display: 'inline-block',
      };
    }, [glassVariant, glassEffect, glassConfig]);

    return (
      <Component
        className={cn(typographyVariants({ variant, glassVariant: glassVariant || glassEffect }), className)}
        style={{ ...glassStyles, ...style }}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

GlassTypography.displayName = 'GlassTypography';

/**
 * GlassText - Simple text component with glassmorphism background
 */
export const GlassText: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'normal' | 'strong';
}> = ({ children, className, intensity = 'normal' }) => {
  const intensityClasses = {
    subtle: 'bg-white/5 backdrop-blur-sm rounded px-2 py-1',
    normal: 'bg-white/10 backdrop-blur-md rounded px-2 py-1',
    strong: 'bg-white/15 backdrop-blur-lg rounded px-3 py-1 font-medium',
  };

  return (
    <span className={cn(intensityClasses[intensity], className)}>
      {children}
    </span>
  );
};

/**
 * GlassHeading - Heading component with enhanced glassmorphism
 */
export const GlassHeading: React.FC<{
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
  glassIntensity?: 'subtle' | 'normal' | 'enhanced';
}> = ({ level = 2, children, className, glassIntensity = 'normal' }) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;
  const intensityClasses = {
    subtle: 'bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm',
    normal: 'bg-gradient-to-r from-white/10 to-white/15 backdrop-blur-md',
    enhanced: 'bg-gradient-to-r from-white/15 to-white/20 backdrop-blur-lg shadow-lg',
  };

  return (
    <Component
      className={cn(
        'rounded-lg px-4 py-2 font-bold',
        intensityClasses[glassIntensity],
        level === 1 && 'text-3xl lg:text-4xl',
        level === 2 && 'text-2xl lg:text-3xl',
        level === 3 && 'text-xl lg:text-2xl',
        level === 4 && 'text-lg lg:text-xl',
        className
      )}
    >
      {children}
    </Component>
  );
};

/**
 * GlassCode - Code/inline code with glassmorphism background
 */
export const GlassCode: React.FC<{
  children: React.ReactNode;
  className?: string;
  block?: boolean;
}> = ({ children, className, block = false }) => {
  const baseClasses = block
    ? 'block bg-slate-900/90 backdrop-blur-md border border-white/10 rounded-lg p-4 font-mono text-sm text-white'
    : 'inline bg-slate-800/80 backdrop-blur-sm rounded px-2 py-1 font-mono text-sm text-white';

  return (
    <code className={cn(baseClasses, className)}>
      {children}
    </code>
  );
};

export default GlassTypography;