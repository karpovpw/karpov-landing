'use client';

import React, { useEffect, useState } from 'react';

/**
 * Browser compatibility detection for backdrop-filter support
 * Provides fallbacks for browsers that don't support glassmorphism effects
 */

// Browser compatibility data for backdrop-filter
const BROWSER_SUPPORT = {
  chrome: '88',
  firefox: '70',
  safari: '14',
  edge: '88',
  ios: '14',
  android: '88',
};

/**
 * Detects if the current browser supports backdrop-filter
 */
function detectBackdropFilterSupport(): boolean {
  // Check for CSS feature support
  if (typeof window === 'undefined') return false;

  // Direct feature detection
  if ('CSS' in window && 'supports' in (window.CSS as any)) {
    return (window.CSS as any).supports('backdrop-filter', 'blur(10px)');
  }

  // Fallback: Check user agent for known supported browsers
  const userAgent = navigator.userAgent.toLowerCase();

  // Chrome (desktop and mobile)
  if (userAgent.includes('chrome') && !userAgent.includes('edg/')) {
    const version = userAgent.match(/chrome\/(\d+)/)?.[1];
    return version ? parseInt(version) >= 88 : false;
  }

  // Firefox
  if (userAgent.includes('firefox')) {
    const version = userAgent.match(/firefox\/(\d+)/)?.[1];
    return version ? parseInt(version) >= 70 : false;
  }

  // Safari (desktop and iOS)
  if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    // iOS Safari
    if (userAgent.includes('mobile')) {
      const version = userAgent.match(/version\/(\d+)/)?.[1];
      return version ? parseInt(version) >= 14 : false;
    }
    // Desktop Safari
    const version = userAgent.match(/version\/(\d+)/)?.[1];
    return version ? parseInt(version) >= 14 : false;
  }

  // Edge (Chromium-based)
  if (userAgent.includes('edg/')) {
    const version = userAgent.match(/edg\/(\d+)/)?.[1];
    return version ? parseInt(version) >= 88 : false;
  }

  // Default to false for unsupported browsers
  return false;
}

/**
 * GlassCard Fallback component that detects browser support and provides alternatives
 */
interface GlassCardWithFallbackProps {
  children: React.ReactNode;
  fallbackClassName?: string;
  showWarning?: boolean;
  warningComponent?: React.ReactNode;
}

/**
 * GlassCardWithFallback - Automatically detects backdrop-filter support and applies fallbacks
 *
 * Features:
 * - Automatic browser compatibility detection
 * - Graceful degradation for unsupported browsers
 * - Optional warning message for users with unsupported browsers
 * - Maintains visual hierarchy even without glassmorphism effects
 */
export const GlassCardWithFallback: React.FC<GlassCardWithFallbackProps> = ({
  children,
  fallbackClassName = 'bg-card border border-border shadow-md',
  showWarning = false,
  warningComponent,
}) => {
  const [supportsBackdropFilter, setSupportsBackdropFilter] = useState<boolean | null>(null);

  useEffect(() => {
    setSupportsBackdropFilter(detectBackdropFilterSupport());
  }, []);

  // Show loading state while detecting browser support
  if (supportsBackdropFilter === null) {
    return (
      <div className={`animate-pulse ${fallbackClassName} rounded-lg p-4`}>
        <div className="h-4 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    );
  }

  // Render warning for unsupported browsers
  if (!supportsBackdropFilter && showWarning) {
    if (warningComponent) {
      return (
        <>
          {warningComponent}
          <div className={`${fallbackClassName} rounded-lg p-4`}>
            {children}
          </div>
        </>
      );
    }

    return (
      <>
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            💡 Your browser doesn't support glassmorphism effects.
            Consider updating to the latest version of Chrome, Firefox, Safari, or Edge for the best experience.
          </p>
        </div>
        <div className={`${fallbackClassName} rounded-lg p-4`}>
          {children}
        </div>
      </>
    );
  }

  // Render with glassmorphism effects for supported browsers
  if (supportsBackdropFilter) {
    return (
      <div className="glass-card rounded-lg p-4">
        {children}
      </div>
    );
  }

  // Fallback for unsupported browsers
  return (
    <div className={`${fallbackClassName} rounded-lg p-4`}>
      {children}
    </div>
  );
};

/**
 * Browser Support Info Component
 */
export const BrowserSupportInfo: React.FC = () => (
  <div className="text-xs text-muted-foreground space-y-1">
    <p><strong>Glassmorphism Effects Supported In:</strong></p>
    <ul className="list-disc list-inside space-y-1 ml-2">
      <li>Chrome 88+</li>
      <li>Firefox 70+</li>
      <li>Safari 14+</li>
      <li>Edge 88+</li>
      <li>iOS Safari 14+</li>
    </ul>
  </div>
);

export default GlassCardWithFallback;
export { detectBackdropFilterSupport, BROWSER_SUPPORT };