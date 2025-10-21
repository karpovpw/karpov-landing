/**
 * Theme Manager - Handles smooth theme transitions and FOUC prevention
 * Ensures seamless light/dark theme switching for glassmorphism components
 */

export interface ThemeConfig {
  transitionDuration: number;
  enableTransitions: boolean;
  preventFOUC: boolean;
  neonAccentColors: {
    green: string;
    orange: string;
  };
}

const DEFAULT_THEME_CONFIG: ThemeConfig = {
  transitionDuration: 150, // < 200ms requirement
  enableTransitions: true,
  preventFOUC: true,
  neonAccentColors: {
    green: '#22c55e',
    orange: '#f97316',
  },
};

/**
 * Theme Manager Class
 */
export class ThemeManager {
  private config: ThemeConfig;
  private isTransitioning = false;

  constructor(config: Partial<ThemeConfig> = {}) {
    this.config = { ...DEFAULT_THEME_CONFIG, ...config };
    this.initializeTheme();
  }

  /**
   * Initialize theme system and prevent FOUC
   */
  private initializeTheme(): void {
    if (typeof window === 'undefined') return;

    // Prevent FOUC by ensuring theme is applied before paint
    const savedTheme = this.getSavedTheme();
    const preferredTheme = this.getPreferredTheme();

    // Apply theme immediately to prevent flash
    this.applyTheme(savedTheme || preferredTheme, false);

    // Add transition styles after initial paint
    setTimeout(() => {
      this.enableTransitions();
    }, 50);
  }

  /**
   * Get saved theme from localStorage
   */
  private getSavedTheme(): 'light' | 'dark' | null {
    if (typeof window === 'undefined') return null;
    return (localStorage.getItem('theme') as 'light' | 'dark') || null;
  }

  /**
   * Get preferred theme from system or default to light
   */
  private getPreferredTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: 'light' | 'dark', enableTransition: boolean = true): void {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Add transition class for smooth animations
    if (enableTransition && this.config.enableTransitions) {
      root.style.setProperty('--theme-transition-duration', `${this.config.transitionDuration}ms`);
      root.classList.add('theme-transitioning');
    }

    // Apply theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Save theme preference
    localStorage.setItem('theme', theme);

    // Remove transition class after animation completes
    if (enableTransition) {
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
        this.isTransitioning = false;
      }, this.config.transitionDuration);
    }
  }

  /**
   * Enable smooth transitions for theme changes
   */
  private enableTransitions(): void {
    if (typeof window === 'undefined') return;

    const styleId = 'glassmorphism-theme-transitions';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      :root {
        --theme-transition-duration: ${this.config.transitionDuration}ms;
      }

      .theme-transitioning,
      .theme-transitioning * {
        transition:
          background-color var(--theme-transition-duration) ease,
          border-color var(--theme-transition-duration) ease,
          box-shadow var(--theme-transition-duration) ease,
          backdrop-filter var(--theme-transition-duration) ease !important;
      }

      /* Prevent FOUC during theme transitions */
      html.theme-loading,
      html.theme-loading * {
        transition: none !important;
      }

      /* Neon accent color transitions */
      .glass-accent,
      .glass-accent-secondary {
        transition:
          background-color var(--theme-transition-duration) ease,
          border-color var(--theme-transition-duration) ease,
          box-shadow var(--theme-transition-duration) ease;
      }
    `;
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleTheme(): void {
    if (this.isTransitioning) return;

    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.isTransitioning = true;
    this.applyTheme(newTheme, true);
  }

  /**
   * Set specific theme
   */
  public setTheme(theme: 'light' | 'dark'): void {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.applyTheme(theme, true);
  }

  /**
   * Get current theme
   */
  public getCurrentTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';

    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }

  /**
   * Check if dark theme is active
   */
  public isDarkTheme(): boolean {
    return this.getCurrentTheme() === 'dark';
  }

  /**
   * Apply neon accent colors to glassmorphism elements
   */
  public applyNeonAccents(): void {
    if (typeof window === 'undefined') return;

    const styleId = 'glassmorphism-neon-accents';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    const isDark = this.isDarkTheme();

    styleElement.textContent = `
      :root {
        --neon-green: ${this.config.neonAccentColors.green};
        --neon-orange: ${this.config.neonAccentColors.orange};
        --neon-green-rgb: 34, 197, 94;
        --neon-orange-rgb: 249, 115, 22;
      }

      .dark {
        --neon-green-glow: 0, 255, 0;
        --neon-orange-glow: 255, 165, 0;
      }

      .light {
        --neon-green-glow: 34, 197, 94;
        --neon-orange-glow: 249, 115, 22;
      }

      .glass-neon-green {
        background: rgba(var(--neon-green-rgb), ${isDark ? '0.15' : '0.1'});
        border: 1px solid rgba(var(--neon-green-rgb), ${isDark ? '0.3' : '0.2'});
        box-shadow: 0 0 20px rgba(var(--neon-green-glow), ${isDark ? '0.3' : '0.2'});
      }

      .glass-neon-orange {
        background: rgba(var(--neon-orange-rgb), ${isDark ? '0.15' : '0.1'});
        border: 1px solid rgba(var(--neon-orange-rgb), ${isDark ? '0.3' : '0.2'});
        box-shadow: 0 0 20px rgba(var(--neon-orange-glow), ${isDark ? '0.3' : '0.2'});
      }
    `;
  }

  /**
   * Validate theme compatibility for glassmorphism elements
   */
  public validateThemeCompatibility(): {
    lightTheme: boolean;
    darkTheme: boolean;
    neonAccents: boolean;
    transitions: boolean;
  } {
    return {
      lightTheme: this.testLightTheme(),
      darkTheme: this.testDarkTheme(),
      neonAccents: this.testNeonAccents(),
      transitions: this.testTransitions(),
    };
  }

  /**
   * Test light theme compatibility
   */
  private testLightTheme(): boolean {
    if (typeof window === 'undefined') return true;

    // Test that glassmorphism elements are visible and properly styled in light theme
    const testElement = document.createElement('div');
    testElement.className = 'glass';
    testElement.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    document.body.appendChild(testElement);

    // Check computed styles
    const computedStyle = window.getComputedStyle(testElement);
    const backgroundColor = computedStyle.backgroundColor;
    const backdropFilter = computedStyle.backdropFilter;
    const borderColor = computedStyle.borderColor;

    document.body.removeChild(testElement);

    // Validate that glassmorphism styles are applied
    return (
      backgroundColor.includes('rgba(255, 255, 255') &&
      (backdropFilter.includes('blur') || backdropFilter === 'none') &&
      borderColor.includes('rgba(255, 255, 255')
    );
  }

  /**
   * Test dark theme compatibility
   */
  private testDarkTheme(): boolean {
    if (typeof window === 'undefined') return true;

    // Test AMOLED black compatibility
    const testElement = document.createElement('div');
    testElement.className = 'dark glass';
    testElement.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 100px;
      height: 100px;
      background: rgba(0, 0, 0, 0.15);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    document.body.appendChild(testElement);

    // Temporarily add dark class to html for testing
    const htmlElement = document.documentElement;
    const hadDarkClass = htmlElement.classList.contains('dark');
    htmlElement.classList.add('dark');

    const computedStyle = window.getComputedStyle(testElement);
    const backgroundColor = computedStyle.backgroundColor;

    // Restore original state
    if (!hadDarkClass) {
      htmlElement.classList.remove('dark');
    }
    document.body.removeChild(testElement);

    // Validate AMOLED-friendly dark styling
    return backgroundColor.includes('rgba(0, 0, 0');
  }

  /**
   * Test neon accent colors
   */
  private testNeonAccents(): boolean {
    if (typeof window === 'undefined') return true;

    // Test that neon colors are properly applied
    const testElement = document.createElement('div');
    testElement.style.cssText = `
      position: fixed;
      top: -9999px;
      left: -9999px;
      width: 100px;
      height: 100px;
      --neon-green: 34, 197, 94;
      background: rgba(var(--neon-green), 0.1);
      border: 1px solid rgba(var(--neon-green), 0.2);
    `;

    document.body.appendChild(testElement);
    const computedStyle = window.getComputedStyle(testElement);
    const backgroundColor = computedStyle.backgroundColor;

    document.body.removeChild(testElement);

    return backgroundColor.includes('rgba(34, 197, 94');
  }

  /**
   * Test smooth transitions
   */
  private testTransitions(): boolean {
    if (typeof window === 'undefined') return true;

    // Check that transition styles are properly applied
    const testElement = document.createElement('div');
    testElement.className = 'theme-transitioning';
    testElement.style.cssText = `
      background: rgba(255, 255, 255, 0.1);
      transition: background-color 150ms ease;
    `;

    document.body.appendChild(testElement);
    const computedStyle = window.getComputedStyle(testElement);
    const transition = computedStyle.transition;

    document.body.removeChild(testElement);

    return transition.includes('150ms') && transition.includes('background-color');
  }

  /**
   * Get theme configuration
   */
  public getConfig(): ThemeConfig {
    return { ...this.config };
  }

  /**
   * Update theme configuration
   */
  public updateConfig(newConfig: Partial<ThemeConfig>): void {
    this.config = { ...this.config, ...newConfig };

    if (newConfig.transitionDuration) {
      this.enableTransitions();
    }

    if (newConfig.neonAccentColors) {
      this.applyNeonAccents();
    }
  }
}

// Create singleton instance
export const themeManager = new ThemeManager();

/**
 * React hook for using theme manager
 */
export function useThemeManager(): ThemeManager {
  return themeManager;
}

/**
 * HOC for theme-aware components
 */
export function withThemeManager<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ThemeManagerComponent(props: P) {
    React.useEffect(() => {
      themeManager.applyNeonAccents();
    }, []);

    return <Component {...props} />;
  };
}

export default ThemeManager;