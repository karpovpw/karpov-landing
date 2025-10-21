'use client';

import React from 'react';
import GlassCard from './GlassCard';

/**
 * Responsive GlassCard variants for different use cases
 * These components provide pre-configured GlassCard instances for common scenarios
 */

interface GlassCardContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * GlassContainer - For larger content areas with enhanced glassmorphism
 */
export const GlassContainer: React.FC<GlassCardContainerProps> = ({
  children,
  className = '',
}) => (
  <GlassCard
    variant="content"
    intensity="enhanced"
    glassProps={{
      shadowIntensity: 'high',
      backgroundOpacity: 0.15,
    }}
    className={`p-8 ${className}`}
  >
    {children}
  </GlassCard>
);

/**
 * GlassPanel - For sidebar/navigation panels with subtle effects
 */
export const GlassPanel: React.FC<GlassCardContainerProps> = ({
  children,
  className = '',
}) => (
  <GlassCard
    variant="nav"
    intensity="subtle"
    glassProps={{
      shadowIntensity: 'low',
      backgroundOpacity: 0.08,
    }}
    className={`p-4 ${className}`}
  >
    {children}
  </GlassCard>
);

/**
 * GlassHero - For hero sections with maximum visual impact
 */
export const GlassHero: React.FC<GlassCardContainerProps> = ({
  children,
  className = '',
}) => (
  <GlassCard
    variant="hero"
    intensity="enhanced"
    glassProps={{
      shadowIntensity: 'high',
      backgroundOpacity: 0.12,
    }}
    className={`p-12 text-center ${className}`}
  >
    {children}
  </GlassCard>
);

/**
 * Mobile-optimized GlassCard variant
 */
export const GlassCardMobile: React.FC<GlassCardContainerProps> = ({
  children,
  className = '',
}) => (
  <GlassCard
    variant="interactive"
    intensity="subtle"
    glassProps={{
      blur: '8px', // Reduced blur for better mobile performance
      backgroundOpacity: 0.08,
      borderOpacity: 0.15,
    }}
    className={`p-4 md:p-6 ${className}`}
  >
    {children}
  </GlassCard>
);

/**
 * Compact GlassCard for smaller UI elements
 */
export const GlassCardCompact: React.FC<GlassCardContainerProps> = ({
  children,
  className = '',
}) => (
  <GlassCard
    variant="content"
    intensity="subtle"
    glassProps={{
      shadowIntensity: 'low',
      backgroundOpacity: 0.06,
      blur: '6px',
    }}
    className={`p-3 ${className}`}
  >
    {children}
  </GlassCard>
);

/**
 * Dark theme enhanced GlassCard
 */
export const GlassCardDarkEnhanced: React.FC<GlassCardContainerProps> = ({
  children,
  className = '',
}) => (
  <GlassCard
    variant="interactive"
    intensity="enhanced"
    glassProps={{
      shadowIntensity: 'high',
      backgroundOpacity: 0.18, // Higher opacity for dark backgrounds
      borderOpacity: 0.15,
    }}
    className={`dark:glass-enhanced-dark ${className}`}
  >
    {children}
  </GlassCard>
);

/**
 * High contrast GlassCard for accessibility
 */
export const GlassCardHighContrast: React.FC<GlassCardContainerProps> = ({
  children,
  className = '',
}) => (
  <GlassCard
    variant="content"
    intensity="enhanced"
    glassProps={{
      shadowIntensity: 'medium',
      backgroundOpacity: 0.25, // Higher contrast
      borderOpacity: 0.3,
      blur: '4px', // Reduced blur for better contrast
    }}
    className={`glass-high-contrast border-2 ${className}`}
  >
    {children}
  </GlassCard>
);

export default {
  GlassContainer,
  GlassPanel,
  GlassHero,
  GlassCardMobile,
  GlassCardCompact,
  GlassCardDarkEnhanced,
  GlassCardHighContrast,
};