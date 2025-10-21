/**
 * Glassmorphism Utility Functions and Mixins
 * Provides foundational utilities for glassmorphism effects and calculations
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind classes with glassmorphism effects
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Glassmorphism configuration interface
 */
export interface GlassmorphismConfig {
  blur?: number;
  backgroundOpacity?: number;
  borderOpacity?: number;
  shadowIntensity?: 'low' | 'medium' | 'high';
  variant?: 'light' | 'dark' | 'auto';
}

/**
 * Default glassmorphism configurations
 */
export const GLASSMORPHISM_PRESETS = {
  subtle: {
    blur: 8,
    backgroundOpacity: 0.08,
    borderOpacity: 0.1,
    shadowIntensity: 'low' as const,
  },
  default: {
    blur: 12,
    backgroundOpacity: 0.12,
    borderOpacity: 0.15,
    shadowIntensity: 'medium' as const,
  },
  enhanced: {
    blur: 16,
    backgroundOpacity: 0.18,
    borderOpacity: 0.2,
    shadowIntensity: 'high' as const,
  },
  interactive: {
    blur: 14,
    backgroundOpacity: 0.15,
    borderOpacity: 0.18,
    shadowIntensity: 'medium' as const,
  },
} as const;

/**
 * Generate CSS custom properties for glassmorphism effects
 */
export function generateGlassmorphismCSS(config: GlassmorphismConfig): React.CSSProperties {
  const {
    blur = 12,
    backgroundOpacity = 0.12,
    borderOpacity = 0.15,
    shadowIntensity = 'medium',
    variant = 'auto',
  } = config;

  // Shadow configurations
  const shadowConfigs = {
    low: '0 4px 16px rgba(var(--glass-shadow-color), calc(var(--glass-shadow-opacity) - 0.2))',
    medium: 'var(--glass-shadow) rgba(var(--glass-shadow-color), var(--glass-shadow-opacity))',
    high: '0 12px 48px rgba(var(--glass-shadow-color), calc(var(--glass-shadow-opacity) + 0.2))',
  };

  return {
    background: `rgba(var(--glass-background), ${backgroundOpacity})`,
    backdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(var(--glass-border), ${borderOpacity})`,
    boxShadow: shadowConfigs[shadowIntensity],
    transition: 'all 0.2s ease-in-out',
  };
}

/**
 * Calculate responsive glassmorphism values based on screen size
 */
export function getResponsiveGlassmorphism(
  baseConfig: GlassmorphismConfig,
  screenSize: 'mobile' | 'tablet' | 'desktop' = 'desktop'
): GlassmorphismConfig {
  const multipliers = {
    mobile: { blur: 0.7, backgroundOpacity: 0.8, borderOpacity: 0.9 },
    tablet: { blur: 0.85, backgroundOpacity: 0.9, borderOpacity: 0.95 },
    desktop: { blur: 1, backgroundOpacity: 1, borderOpacity: 1 },
  };

  const multiplier = multipliers[screenSize];

  return {
    ...baseConfig,
    blur: Math.round((baseConfig.blur || 12) * multiplier.blur),
    backgroundOpacity: (baseConfig.backgroundOpacity || 0.12) * multiplier.backgroundOpacity,
    borderOpacity: (baseConfig.borderOpacity || 0.15) * multiplier.borderOpacity,
  };
}

/**
 * Animation keyframes for glassmorphism effects
 */
export const GLASSMORPHISM_ANIMATIONS = {
  shimmer: {
    '0%, 100%': {
      transform: 'translateX(-100%) translateY(-100%) rotate(45deg)',
    },
    '50%': {
      transform: 'translateX(100%) translateY(100%) rotate(45deg)',
    },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  glow: {
    '0%, 100%': { opacity: 0 },
    '50%': { opacity: 1 },
  },
} as const;

/**
 * Utility function to detect if glassmorphism is supported
 */
export function isGlassmorphismSupported(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for CSS feature support
  if ('CSS' in window && 'supports' in (window.CSS as any)) {
    return (window.CSS as any).supports('backdrop-filter', 'blur(10px)');
  }

  return false;
}

/**
 * Fallback styles for browsers that don't support backdrop-filter
 */
export function getFallbackStyles(config: GlassmorphismConfig): React.CSSProperties {
  const { backgroundOpacity = 0.12, shadowIntensity = 'medium' } = config;

  const fallbackShadows = {
    low: '0 4px 16px rgba(0, 0, 0, 0.1)',
    medium: '0 8px 32px rgba(0, 0, 0, 0.15)',
    high: '0 12px 48px rgba(0, 0, 0, 0.2)',
  };

  return {
    background: `rgba(var(--glass-background), ${backgroundOpacity})`,
    border: `1px solid rgba(var(--glass-border), ${config.borderOpacity || 0.15})`,
    boxShadow: fallbackShadows[shadowIntensity],
    transition: 'all 0.2s ease-in-out',
  };
}

/**
 * Theme-aware glassmorphism configuration
 */
export function getThemeAwareGlassmorphism(
  lightConfig: GlassmorphismConfig,
  darkConfig: GlassmorphismConfig,
  theme?: 'light' | 'dark' | 'auto'
): GlassmorphismConfig {
  const actualTheme = theme || 'auto';

  if (actualTheme === 'light') return lightConfig;
  if (actualTheme === 'dark') return darkConfig;

  // Auto-detect theme (client-side only)
  if (typeof window !== 'undefined') {
    const isDark = document.documentElement.classList.contains('dark') ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDark ? darkConfig : lightConfig;
  }

  return lightConfig; // Default fallback
}

/**
 * Performance-optimized glassmorphism for mobile devices
 */
export function getMobileOptimizedGlassmorphism(config: GlassmorphismConfig): GlassmorphismConfig {
  return {
    ...config,
    blur: Math.min(config.blur || 12, 8), // Limit blur on mobile
    backgroundOpacity: Math.min(config.backgroundOpacity || 0.12, 0.08), // Reduce opacity
  };
}

/**
 * Accessibility-enhanced glassmorphism configuration
 */
export function getAccessibleGlassmorphism(config: GlassmorphismConfig): GlassmorphismConfig {
  return {
    ...config,
    backgroundOpacity: Math.max(config.backgroundOpacity || 0.12, 0.2), // Higher contrast
    borderOpacity: Math.max(config.borderOpacity || 0.15, 0.25),
    blur: Math.min(config.blur || 12, 6), // Reduced blur for better readability
  };
}

/**
 * Generate CSS-in-JS styles for glassmorphism effects
 */
export function createGlassmorphismStyles(
  config: GlassmorphismConfig,
  options?: {
    disableAnimations?: boolean;
    mobileOptimized?: boolean;
    accessible?: boolean;
  }
): React.CSSProperties {
  let processedConfig = config;

  if (options?.mobileOptimized) {
    processedConfig = getMobileOptimizedGlassmorphism(processedConfig);
  }

  if (options?.accessible) {
    processedConfig = getAccessibleGlassmorphism(processedConfig);
  }

  let styles = isGlassmorphismSupported()
    ? generateGlassmorphismCSS(processedConfig)
    : getFallbackStyles(processedConfig);

  if (options?.disableAnimations) {
    delete styles.transition;
  }

  return styles;
}

export default {
  cn,
  GLASSMORPHISM_PRESETS,
  generateGlassmorphismCSS,
  getResponsiveGlassmorphism,
  isGlassmorphismSupported,
  getFallbackStyles,
  getThemeAwareGlassmorphism,
  getMobileOptimizedGlassmorphism,
  getAccessibleGlassmorphism,
  createGlassmorphismStyles,
  GLASSMORPHISM_ANIMATIONS,
};