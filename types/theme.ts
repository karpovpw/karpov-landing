/**
 * Theme System TypeScript Interfaces and Types
 * Defines the complete theme system structure for light/dark theme management
 */

export type Theme = 'light' | 'dark' | 'system';

export type ThemeMode = 'light' | 'dark';

export interface NeonAccentColors {
  green: string;
  orange: string;
}

export interface ThemeColors {
  // Base colors
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  input: string;

  // Theme specific colors
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;

  // Glassmorphism specific colors
  glass: {
    background: string;
    backgroundOpacity: number;
    border: string;
    borderOpacity: number;
    blur: string;
    shadow: string;
    shadowColor: string;
    shadowOpacity: number;
  };

  // Neon accent colors
  neon: NeonAccentColors;
}

export interface LightThemeColors extends ThemeColors {
  // Light theme specific overrides
  background: string; // white with purple gradient
  glass: {
    background: string; // white
    backgroundOpacity: number; // 0.1 for light theme
    border: string; // purple accents
    borderOpacity: number; // 0.2 for light theme
    blur: string; // 10px
    shadow: string; // purple tinted shadow
    shadowColor: string; // white
    shadowOpacity: number; // 0.37 for light theme
  };
}

export interface DarkThemeColors extends ThemeColors {
  // Dark theme specific overrides (AMOLED black)
  background: string; // pure black for AMOLED
  glass: {
    background: string; // black
    backgroundOpacity: number; // 0.15 for dark theme
    border: string; // white
    borderOpacity: number; // 0.1 for dark theme
    blur: string; // 12px for dark theme
    shadow: string; // black shadow
    shadowColor: string; // black
    shadowOpacity: number; // 0.5 for dark theme
  };
}

export interface ThemeConfig {
  transitionDuration: number;
  enableTransitions: boolean;
  preventFOUC: boolean;
  neonAccentColors: NeonAccentColors;
}

export interface ThemeState {
  currentTheme: Theme;
  resolvedTheme: ThemeMode;
  isTransitioning: boolean;
  config: ThemeConfig;
}

export interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ThemeMode;
  isTransitioning: boolean;
  config: ThemeConfig;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  updateConfig: (config: Partial<ThemeConfig>) => void;
  validateTheme: () => {
    lightTheme: boolean;
    darkTheme: boolean;
    neonAccents: boolean;
    transitions: boolean;
  };
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  config?: Partial<ThemeConfig>;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export interface ThemeCSSVariables {
  // CSS custom properties for runtime theme switching
  ':root': Record<string, string>;
  '.light': Record<string, string>;
  '.dark': Record<string, string>;
}

export interface GlassmorphismThemeTokens {
  // Theme-aware glassmorphism tokens
  light: {
    '--glass-background': string;
    '--glass-background-opacity': string;
    '--glass-border': string;
    '--glass-border-opacity': string;
    '--glass-blur': string;
    '--glass-shadow': string;
    '--glass-shadow-color': string;
    '--glass-shadow-opacity': string;
    '--glass-primary': string;
    '--glass-secondary': string;
    '--glass-accent': string;
    '--glass-accent-secondary': string;
  };
  dark: {
    '--glass-background': string;
    '--glass-background-opacity': string;
    '--glass-border': string;
    '--glass-border-opacity': string;
    '--glass-blur': string;
    '--glass-shadow': string;
    '--glass-shadow-color': string;
    '--glass-shadow-opacity': string;
    '--glass-primary': string;
    '--glass-secondary': string;
    '--glass-accent': string;
    '--glass-accent-secondary': string;
  };
}

// Utility types for theme management
export type ThemePreference = 'light' | 'dark' | 'system';

export type SystemTheme = 'light' | 'dark' | 'no-preference';

export interface PersistedThemeData {
  theme: Theme;
  timestamp: number;
  version: string;
}

export interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  lightThemeScore: number;
  darkThemeScore: number;
  accessibilityScore: number;
}

export default {
  Theme,
  ThemeMode,
  ThemeConfig,
  ThemeState,
  ThemeContextValue,
  ThemeProviderProps,
  LightThemeColors,
  DarkThemeColors,
  NeonAccentColors,
  ThemeCSSVariables,
  GlassmorphismThemeTokens,
};