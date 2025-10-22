// Design Tokens for Liquid Glass Design System
export const DESIGN_TOKENS = {
  // Glass morphism tokens
  glass: {
    background: {
      light: 'rgba(255, 255, 255, 0.15)',
      dark: 'rgba(0, 0, 0, 0.3)',
    },
    border: {
      light: 'rgba(255, 255, 255, 0.2)',
      dark: 'rgba(255, 255, 255, 0.1)',
    },
    shadow: {
      light: '0 8px 32px rgba(0, 0, 0, 0.1)',
      dark: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
    blur: {
      sm: '8px',
      md: '16px',
      lg: '20px',
      xl: '24px',
    },
  },

  // Animation tokens
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    easing: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Color tokens
  colors: {
    primary: {
      50: 'hsl(217, 91%, 95%)',
      100: 'hsl(217, 91%, 90%)',
      200: 'hsl(217, 91%, 80%)',
      300: 'hsl(217, 91%, 70%)',
      400: 'hsl(217, 91%, 60%)',
      500: 'hsl(217, 91%, 50%)',
      600: 'hsl(217, 91%, 45%)',
      700: 'hsl(217, 91%, 35%)',
      800: 'hsl(217, 91%, 25%)',
      900: 'hsl(217, 91%, 15%)',
    },
    neon: {
      green: 'hsl(142, 76%, 36%)',
      orange: 'hsl(32, 95%, 44%)',
    },
  },

  // Spacing tokens
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  // Border radius tokens
  radius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Typography tokens
  typography: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Breakpoint tokens
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index scale
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
  },
}

// Utility functions for design tokens
export function getGlassBackground(theme: 'light' | 'dark' = 'light') {
  return DESIGN_TOKENS.glass.background[theme]
}

export function getGlassBorder(theme: 'light' | 'dark' = 'light') {
  return DESIGN_TOKENS.glass.border[theme]
}

export function getGlassShadow(theme: 'light' | 'dark' = 'light') {
  return DESIGN_TOKENS.glass.shadow[theme]
}

export function getGlassBlur(size: keyof typeof DESIGN_TOKENS.glass.blur) {
  return DESIGN_TOKENS.glass.blur[size]
}

export function getAnimationDuration(size: keyof typeof DESIGN_TOKENS.animations.duration) {
  return DESIGN_TOKENS.animations.duration[size]
}

export function getAnimationEasing(easing: keyof typeof DESIGN_TOKENS.animations.easing) {
  return DESIGN_TOKENS.animations.easing[easing]
}

export function getColorToken(color: keyof typeof DESIGN_TOKENS.colors) {
  return DESIGN_TOKENS.colors[color]
}

export function getSpacingToken(size: keyof typeof DESIGN_TOKENS.spacing | string) {
  return DESIGN_TOKENS.spacing[size as keyof typeof DESIGN_TOKENS.spacing] || '1rem'
}

export function getRadiusToken(size: keyof typeof DESIGN_TOKENS.radius) {
  return DESIGN_TOKENS.radius[size]
}