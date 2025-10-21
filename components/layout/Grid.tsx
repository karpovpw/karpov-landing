'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Responsive Grid System - 6-breakpoint grid implementation
 * Breakpoints: 320px, 768px, 1024px, 1440px, 1920px
 */

const gridVariants = cva(
  /* Base grid styles with CSS Grid and mobile-first approach */
  'grid w-full',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6',
        12: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-12',
        auto: 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
        'auto-sm': 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
        'auto-lg': 'grid-cols-[repeat(auto-fit,minmax(350px,1fr))]',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-2',
        sm: 'gap-3',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-12',
      },
      glassmorphism: {
        none: '',
        subtle: 'bg-white/5 backdrop-blur-sm',
        default: 'bg-white/10 backdrop-blur-md',
        enhanced: 'bg-white/15 backdrop-blur-lg',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 'md',
      glassmorphism: 'none',
    },
  }
);

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Custom responsive column configuration
   */
  responsive?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
    'extra-large'?: number;
  };

  /**
   * Enable glassmorphism background effects
   */
  glass?: boolean;

  /**
   * Glassmorphism intensity
   */
  glassIntensity?: 'subtle' | 'default' | 'enhanced';

  /**
   * Custom breakpoint values (overrides defaults)
   */
  breakpoints?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
    large?: string;
    'extra-large'?: string;
  };
}

/**
 * ResponsiveGrid - Advanced responsive grid with glassmorphism integration
 *
 * Features:
 * - 6-breakpoint responsive system (320px, 768px, 1024px, 1440px, 1920px)
 * - Mobile-first approach with progressive enhancement
 * - Optional glassmorphism background effects
 * - Custom responsive column configurations
 * - Touch-optimized spacing for mobile devices
 */
const ResponsiveGrid = forwardRef<HTMLDivElement, GridProps>(
  ({
    className,
    cols,
    gap,
    glassmorphism,
    responsive,
    glass = false,
    glassIntensity = 'default',
    breakpoints,
    style,
    children,
    ...props
  }, ref) => {
    // Generate responsive classes based on custom configuration
    const responsiveClasses = React.useMemo(() => {
      if (!responsive) return '';

      const classes = [];

      if (responsive.mobile) {
        classes.push(`grid-cols-${responsive.mobile}`);
      }

      if (responsive.tablet) {
        classes.push(`md:grid-cols-${responsive.tablet}`);
      }

      if (responsive.desktop) {
        classes.push(`lg:grid-cols-${responsive.desktop}`);
      }

      if (responsive.large) {
        classes.push(`xl:grid-cols-${responsive.large}`);
      }

      if (responsive['extra-large']) {
        classes.push(`2xl:grid-cols-${responsive['extra-large']}`);
      }

      return classes.join(' ');
    }, [responsive]);

    // Generate glassmorphism styles
    const glassStyles = React.useMemo(() => {
      if (!glass) return {};

      const intensityConfig = {
        subtle: { backgroundOpacity: 0.05, blur: '8px' },
        default: { backgroundOpacity: 0.1, blur: '10px' },
        enhanced: { backgroundOpacity: 0.15, blur: '12px' },
      };

      const config = intensityConfig[glassIntensity];

      return {
        background: `rgba(var(--glass-background), ${config.backgroundOpacity})`,
        backdropFilter: `blur(${config.blur})`,
        border: `1px solid rgba(var(--glass-border), var(--glass-border-opacity))`,
        borderRadius: '0.75rem',
      };
    }, [glass, glassIntensity]);

    // Combine responsive classes with base grid classes
    const gridClasses = responsiveClasses || gridVariants({ cols, gap, glassmorphism: glass ? glassIntensity : 'none' });

    return (
      <div
        ref={ref}
        className={cn(gridClasses, className)}
        style={{ ...glassStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveGrid.displayName = 'ResponsiveGrid';

/**
 * Grid Item - Individual grid cell with responsive behavior
 */
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
    large?: number;
    'extra-large'?: number;
  };

  glass?: boolean;
  glassIntensity?: 'subtle' | 'default' | 'enhanced';
}

export const GridItem: React.FC<GridItemProps> = ({
  className,
  colSpan,
  glass = false,
  glassIntensity = 'default',
  style,
  children,
  ...props
}) => {
  // Generate responsive column span classes
  const colSpanClasses = React.useMemo(() => {
    if (!colSpan) return '';

    const classes = [];

    if (colSpan.mobile) {
      classes.push(`col-span-${colSpan.mobile}`);
    }

    if (colSpan.tablet) {
      classes.push(`md:col-span-${colSpan.tablet}`);
    }

    if (colSpan.desktop) {
      classes.push(`lg:col-span-${colSpan.desktop}`);
    }

    if (colSpan.large) {
      classes.push(`xl:col-span-${colSpan.large}`);
    }

    if (colSpan['extra-large']) {
      classes.push(`2xl:col-span-${colSpan['extra-large']}`);
    }

    return classes.join(' ');
  }, [colSpan]);

  // Generate glassmorphism styles for grid item
  const glassStyles = React.useMemo(() => {
    if (!glass) return {};

    const intensityConfig = {
      subtle: { backgroundOpacity: 0.03, blur: '6px' },
      default: { backgroundOpacity: 0.08, blur: '8px' },
      enhanced: { backgroundOpacity: 0.12, blur: '10px' },
    };

    const config = intensityConfig[glassIntensity];

    return {
      background: `rgba(var(--glass-background), ${config.backgroundOpacity})`,
      backdropFilter: `blur(${config.blur})`,
      border: `1px solid rgba(var(--glass-border), calc(var(--glass-border-opacity) - 0.05))`,
      borderRadius: '0.5rem',
    };
  }, [glass, glassIntensity]);

  return (
    <div
      className={cn(colSpanClasses, className)}
      style={{ ...glassStyles, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Responsive Container - Flexible container with glassmorphism support
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid';
  glass?: boolean;
  glassIntensity?: 'subtle' | 'default' | 'enhanced';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Container: React.FC<ContainerProps> = ({
  className,
  size = 'lg',
  glass = false,
  glassIntensity = 'default',
  padding = 'md',
  style,
  children,
  ...props
}) => {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
    fluid: 'max-w-none',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };

  // Generate glassmorphism styles for container
  const glassStyles = React.useMemo(() => {
    if (!glass) return {};

    const intensityConfig = {
      subtle: { backgroundOpacity: 0.05, blur: '8px' },
      default: { backgroundOpacity: 0.1, blur: '10px' },
      enhanced: { backgroundOpacity: 0.15, blur: '12px' },
    };

    const config = intensityConfig[glassIntensity];

    return {
      background: `rgba(var(--glass-background), ${config.backgroundOpacity})`,
      backdropFilter: `blur(${config.blur})`,
      border: `1px solid rgba(var(--glass-border), var(--glass-border-opacity))`,
      borderRadius: '1rem',
    };
  }, [glass, glassIntensity]);

  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizeClasses[size],
        paddingClasses[padding],
        className
      )}
      style={{ ...glassStyles, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Responsive Section - Layout section with responsive spacing
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  glass?: boolean;
  glassIntensity?: 'subtle' | 'default' | 'enhanced';
  as?: keyof JSX.IntrinsicElements;
}

export const Section: React.FC<SectionProps> = ({
  className,
  spacing = 'lg',
  glass = false,
  glassIntensity = 'default',
  as: Component = 'section',
  style,
  children,
  ...props
}) => {
  const spacingClasses = {
    none: 'py-0',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };

  // Generate glassmorphism styles for section
  const glassStyles = React.useMemo(() => {
    if (!glass) return {};

    const intensityConfig = {
      subtle: { backgroundOpacity: 0.03, blur: '6px' },
      default: { backgroundOpacity: 0.08, blur: '8px' },
      enhanced: { backgroundOpacity: 0.12, blur: '10px' },
    };

    const config = intensityConfig[glassIntensity];

    return {
      background: `rgba(var(--glass-background), ${config.backgroundOpacity})`,
      backdropFilter: `blur(${config.blur})`,
      border: `1px solid rgba(var(--glass-border), calc(var(--glass-border-opacity) - 0.05))`,
      borderRadius: '1.5rem',
      margin: '1rem 0',
    };
  }, [glass, glassIntensity]);

  return (
    <Component
      className={cn(spacingClasses[spacing], className)}
      style={{ ...glassStyles, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ResponsiveGrid;