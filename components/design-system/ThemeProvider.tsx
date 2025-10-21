'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeManager } from './utils/theme-manager';
import type {
  Theme,
  ThemeMode,
  ThemeConfig,
  ThemeContextValue,
  ThemeProviderProps,
  ThemeState,
} from '@/types/theme';

/**
 * Theme Context - Provides theme state and management functions to the entire app
 */
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Custom hook to use theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

/**
 * ThemeProvider - React context provider for global theme management
 *
 * Features:
 * - Global theme state management with React Context API
 * - Automatic initialization from localStorage and system preferences
 * - Smooth theme transitions with glassmorphism optimization
 * - FOUC prevention for seamless theme switching
 * - Integration with existing glassmorphism design system
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system" enableSystem>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  config = {},
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  // Initialize theme manager with configuration
  const [themeManager] = useState(() => new ThemeManager(config));
  const [state, setState] = useState<ThemeState>(() => {
    const currentTheme = themeManager.getCurrentTheme();
    const resolvedTheme = currentTheme === 'system' && enableSystem
      ? (themeManager.getCurrentTheme() as ThemeMode)
      : currentTheme as ThemeMode;

    return {
      currentTheme: currentTheme as Theme,
      resolvedTheme,
      isTransitioning: false,
      config: themeManager.getConfig(),
    };
  });

  /**
   * Update internal state when theme changes
   */
  const updateState = useCallback((newTheme: Theme, newResolvedTheme: ThemeMode) => {
    setState(prevState => ({
      ...prevState,
      currentTheme: newTheme,
      resolvedTheme: newResolvedTheme,
      isTransitioning: true,
    }));

    // Clear transition flag after animation completes
    setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        isTransitioning: false,
      }));
    }, state.config.transitionDuration);
  }, [state.config.transitionDuration]);

  /**
   * Set theme with smooth transitions
   */
  const setTheme = useCallback((newTheme: Theme) => {
    if (state.isTransitioning) return;

    // Determine resolved theme
    let resolvedTheme: ThemeMode;
    if (newTheme === 'system' && enableSystem) {
      resolvedTheme = themeManager.getCurrentTheme() as ThemeMode;
    } else {
      resolvedTheme = newTheme as ThemeMode;
    }

    // Apply theme with transition
    themeManager.setTheme(resolvedTheme);
    updateState(newTheme, resolvedTheme);
  }, [state.isTransitioning, enableSystem, themeManager, updateState]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    if (state.isTransitioning) return;

    const currentResolved = state.resolvedTheme;
    const newResolved: ThemeMode = currentResolved === 'light' ? 'dark' : 'light';
    const newTheme: Theme = newResolved;

    themeManager.setTheme(newResolved);
    updateState(newTheme, newResolved);
  }, [state.isTransitioning, state.resolvedTheme, themeManager, updateState]);

  /**
   * Update theme configuration
   */
  const updateConfig = useCallback((newConfig: Partial<ThemeConfig>) => {
    themeManager.updateConfig(newConfig);

    setState(prevState => ({
      ...prevState,
      config: themeManager.getConfig(),
    }));
  }, [themeManager]);

  /**
   * Validate current theme implementation
   */
  const validateTheme = useCallback(() => {
    return themeManager.validateThemeCompatibility();
  }, [themeManager]);

  /**
   * Initialize theme on mount and handle system theme changes
   */
  useEffect(() => {
    // Set initial theme
    let initialTheme: Theme = defaultTheme;

    if (defaultTheme === 'system' && enableSystem) {
      // Use system preference
      const systemTheme = themeManager.getCurrentTheme() as ThemeMode;
      initialTheme = 'system';
      themeManager.setTheme(systemTheme);
    } else {
      // Use explicit theme
      themeManager.setTheme(defaultTheme as ThemeMode);
    }

    // Set initial state
    setState(prevState => ({
      ...prevState,
      currentTheme: initialTheme,
      resolvedTheme: themeManager.getCurrentTheme() as ThemeMode,
    }));

    // Listen for system theme changes
    if (enableSystem && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (state.currentTheme === 'system') {
          const systemTheme = e.matches ? 'dark' : 'light';
          themeManager.setTheme(systemTheme);
          updateState('system', systemTheme);
        }
      };

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
      }
      // Fallback for older browsers
      else if (mediaQuery.addListener) {
        mediaQuery.addListener(handleSystemThemeChange);
        return () => mediaQuery.removeListener(handleSystemThemeChange);
      }
    }
  }, [defaultTheme, enableSystem, themeManager, state.currentTheme, updateState]);

  /**
   * Apply neon accent colors when theme changes
   */
  useEffect(() => {
    themeManager.applyNeonAccents();
  }, [state.resolvedTheme, themeManager]);

  // Context value
  const contextValue: ThemeContextValue = {
    theme: state.currentTheme,
    resolvedTheme: state.resolvedTheme,
    isTransitioning: state.isTransitioning,
    config: state.config,
    setTheme,
    toggleTheme,
    updateConfig,
    validateTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * ThemeScript - Script component to prevent FOUC by applying theme before React hydration
 *
 * This should be placed in the document head or before the app renders to prevent
 * the flash of unstyled content during theme initialization.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            // Apply theme immediately to prevent FOUC
            const savedTheme = localStorage.getItem('theme');
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            const theme = savedTheme || systemTheme;

            // Apply theme class immediately
            document.documentElement.classList.toggle('dark', theme === 'dark');

            // Add loading class to prevent transitions during initial load
            document.documentElement.classList.add('theme-loading');

            // Remove loading class after a short delay to allow React to take over
            setTimeout(() => {
              document.documentElement.classList.remove('theme-loading');
            }, 100);
          } catch (e) {
            // Fallback if localStorage or matchMedia is not available
            console.warn('Theme script failed:', e);
          }
        `,
      }}
    />
  );
}

/**
 * useThemeTransition - Hook for handling theme transitions in components
 */
export function useThemeTransition() {
  const { isTransitioning, resolvedTheme } = useTheme();

  return {
    isTransitioning,
    currentTheme: resolvedTheme,
    shouldAnimate: !isTransitioning,
  };
}

/**
 * withTheme - HOC for injecting theme context into components
 */
export function withTheme<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ThemeComponent(props: P) {
    const theme = useTheme();

    return <Component {...props} theme={theme} />;
  };
}

export default ThemeProvider;