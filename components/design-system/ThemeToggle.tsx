'use client';

import React, { useState, useEffect } from 'react';
import { GlassButton } from './atoms/GlassButton';
import { useTheme, useThemeTransition } from './ThemeProvider';

/**
 * ThemeToggle - Interactive theme switching component with glassmorphism styling
 *
 * Features:
 * - Smooth theme transitions with glassmorphism effects
 * - Visual feedback during theme switching
 * - Keyboard accessibility
 * - Mobile-responsive design
 * - Integration with global theme context
 */

interface ThemeToggleProps {
  variant?: 'default' | 'compact' | 'icon-only';
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({
  variant = 'default',
  className = '',
  showLabel = true,
  size = 'md',
}: ThemeToggleProps) {
  const { theme, resolvedTheme, toggleTheme, isTransitioning } = useTheme();
  const { shouldAnimate } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`w-10 h-10 ${className}`}>
        <div className="w-full h-full bg-muted animate-pulse rounded-full"></div>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  // Icon based on current theme
  const ThemeIcon = () => {
    if (variant === 'icon-only') {
      return isDark ? '🌙' : '☀️';
    }

    return isDark ? (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    );
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  const buttonText = isDark ? 'Light' : 'Dark';
  const ariaLabel = `Switch to ${isDark ? 'light' : 'dark'} theme`;

  if (variant === 'icon-only') {
    return (
      <GlassButton
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        disabled={isTransitioning}
        className={`${sizeClasses[size]} ${className}`}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <ThemeIcon />
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </GlassButton>
    );
  }

  if (variant === 'compact') {
    return (
      <GlassButton
        variant="ghost"
        size={size === 'sm' ? 'sm' : 'default'}
        onClick={toggleTheme}
        disabled={isTransitioning}
        className={className}
        aria-label={ariaLabel}
      >
        <ThemeIcon />
        {showLabel && (
          <span className="ml-2">
            {isTransitioning ? 'Switching...' : buttonText}
          </span>
        )}
        {isTransitioning && (
          <div className="ml-2 w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
        )}
      </GlassButton>
    );
  }

  // Default variant with full styling
  return (
    <GlassButton
      variant="accent"
      size={size === 'sm' ? 'sm' : 'default'}
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`relative overflow-hidden ${className}`}
      aria-label={ariaLabel}
    >
      <div className="relative flex items-center space-x-2">
        <div className={`transition-transform duration-300 ${isTransitioning ? 'scale-75' : 'scale-100'}`}>
          <ThemeIcon />
        </div>

        {showLabel && (
          <span className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            {isTransitioning ? 'Switching...' : `${buttonText} Mode`}
          </span>
        )}

        {isTransitioning && (
          <div className="absolute right-2 w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"></div>
        )}
      </div>

      {/* Animated background gradient */}
      <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${isDark ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-yellow-400 to-orange-400'} ${isTransitioning ? 'opacity-10' : ''}`} />
    </GlassButton>
  );
}

/**
 * ThemeToggleWithIndicator - Shows current theme status
 */
export function ThemeToggleWithIndicator(props: ThemeToggleProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground capitalize">
        {resolvedTheme} Mode
      </span>
      <ThemeToggle {...props} showLabel={false} />
    </div>
  );
}

/**
 * FloatingThemeToggle - Fixed position theme toggle for easy access
 */
export function FloatingThemeToggle() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <ThemeToggle
        variant="icon-only"
        size="lg"
        className="shadow-lg glass-interactive"
      />
    </div>
  );
}

/**
 * HeaderThemeToggle - Theme toggle for navigation headers
 */
export function HeaderThemeToggle() {
  const { resolvedTheme } = useTheme();

  return (
    <nav className="flex items-center space-x-4">
      <span className="text-sm text-muted-foreground hidden sm:block">
        {resolvedTheme === 'dark' ? '🌙' : '☀️'} {resolvedTheme} mode
      </span>
      <ThemeToggle variant="compact" showLabel={false} />
    </nav>
  );
}

export default ThemeToggle;