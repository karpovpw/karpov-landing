'use client';

import React from 'react';
import GlassCard from '../GlassCard';
import { GlassButton } from '../atoms/GlassButton';
import { GlassHeading, GlassText } from '../atoms/Typography';

/**
 * GlassCardHeader - Molecule component that combines GlassCard with header content
 * Perfect for section headers, article cards, or content blocks
 */

interface GlassCardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  variant?: 'default' | 'hero' | 'compact' | 'featured';
  className?: string;
  children?: React.ReactNode;
}

/**
 * GlassCardHeader - A molecule combining GlassCard with header elements
 */
export const GlassCardHeader: React.FC<GlassCardHeaderProps> = ({
  title,
  subtitle,
  actions,
  variant = 'default',
  className = '',
  children,
}) => {
  const variantConfig = {
    default: {
      cardIntensity: 'default' as const,
      titleLevel: 3 as const,
      spacing: 'p-6',
    },
    hero: {
      cardIntensity: 'enhanced' as const,
      titleLevel: 2 as const,
      spacing: 'p-8',
    },
    compact: {
      cardIntensity: 'subtle' as const,
      titleLevel: 4 as const,
      spacing: 'p-4',
    },
    featured: {
      cardIntensity: 'enhanced' as const,
      titleLevel: 2 as const,
      spacing: 'p-10',
    },
  };

  const config = variantConfig[variant];

  return (
    <GlassCard
      intensity={config.cardIntensity}
      className={`${config.spacing} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <GlassHeading level={config.titleLevel} className="mb-2">
            {title}
          </GlassHeading>
          {subtitle && (
            <GlassText intensity="normal" className="text-muted-foreground">
              {subtitle}
            </GlassText>
          )}
          {children}
        </div>
        {actions && (
          <div className="flex items-center space-x-2 ml-4">
            {actions}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

/**
 * GlassCardWithActions - A complete card with header and action buttons
 */
export const GlassCardWithActions: React.FC<{
  title: string;
  subtitle?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: React.ReactNode;
}> = ({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  className,
  children,
}) => {
  const actions = (
    <>
      {secondaryAction && (
        <GlassButton
          variant="ghost"
          size="sm"
          onClick={secondaryAction.onClick}
        >
          {secondaryAction.label}
        </GlassButton>
      )}
      {primaryAction && (
        <GlassButton
          variant="accent"
          size="sm"
          onClick={primaryAction.onClick}
        >
          {primaryAction.label}
        </GlassButton>
      )}
    </>
  );

  return (
    <GlassCardHeader
      title={title}
      subtitle={subtitle}
      actions={actions}
      className={className}
    >
      {children}
    </GlassCardHeader>
  );
};

/**
 * GlassStatCard - Statistical display card with glassmorphism
 */
export const GlassStatCard: React.FC<{
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
  className?: string;
}> = ({
  title,
  value,
  change,
  icon,
  className = '',
}) => {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-muted-foreground',
  };

  return (
    <GlassCard intensity="subtle" className={`p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <GlassText intensity="subtle" className="text-sm text-muted-foreground mb-1">
            {title}
          </GlassText>
          <div className="text-2xl font-bold">{value}</div>
          {change && (
            <div className={`text-sm ${trendColors[change.trend]}`}>
              {change.trend === 'up' && '↗'}
              {change.trend === 'down' && '↘'}
              {change.trend === 'neutral' && '→'}
              {change.value}
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default GlassCardHeader;