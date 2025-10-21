'use client';

import React, { useState, useEffect } from 'react';
import { GlassButton } from '../design-system/atoms/GlassButton';
import { useTheme } from '../design-system/ThemeProvider';

/**
 * Mobile Navigation Drawer - Slide-in glassmorphism navigation for mobile devices
 *
 * Features:
 * - Smooth slide-in animation with glassmorphism effects
 * - Touch-optimized navigation items
 * - Keyboard accessibility
 * - Auto-close on route change
 * - Overlay backdrop with blur effect
 */

interface MobileNavigationProps {
  /**
   * Navigation items to display in the drawer
   */
  items?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }>;

  /**
   * Custom trigger button for opening the drawer
   */
  trigger?: React.ReactNode;

  /**
   * Position of the drawer (left or right)
   */
  position?: 'left' | 'right';

  /**
   * Drawer width (CSS value or percentage)
   */
  width?: string;

  /**
   * Whether the drawer is currently open
   */
  isOpen?: boolean;

  /**
   * Callback when drawer open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;

  /**
   * Enable glassmorphism effects on drawer
   */
  glassmorphism?: boolean;

  /**
   * Glassmorphism intensity for the drawer
   */
  glassIntensity?: 'subtle' | 'default' | 'enhanced';
}

const DEFAULT_NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Articles', href: '/articles' },
  { label: 'Crypto', href: '/crypto' },
  { label: 'Contact', href: '/contact' },
];

export function MobileNavigation({
  items = DEFAULT_NAV_ITEMS,
  trigger,
  position = 'left',
  width = 'min(300px, 80vw)',
  isOpen: controlledIsOpen,
  onOpenChange,
  glassmorphism = true,
  glassIntensity = 'default',
}: MobileNavigationProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  // Use controlled or internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (newIsOpen: boolean) => {
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newIsOpen);
    }
    onOpenChange?.(newIsOpen);
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.mobile-nav-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, setIsOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setIsOpen]);

  // Handle navigation item click
  const handleNavItemClick = (item: typeof items[0]) => {
    if (item.onClick) {
      item.onClick();
    }
    // Close drawer after navigation
    setIsOpen(false);
  };

  const glassStyles = React.useMemo(() => {
    if (!glassmorphism) return {};

    const intensityConfig = {
      subtle: { backgroundOpacity: 0.08, blur: '8px' },
      default: { backgroundOpacity: 0.12, blur: '10px' },
      enhanced: { backgroundOpacity: 0.18, blur: '12px' },
    };

    const config = intensityConfig[glassIntensity];

    return {
      background: `rgba(var(--glass-background), ${config.backgroundOpacity})`,
      backdropFilter: `blur(${config.blur})`,
      borderColor: `rgba(var(--glass-border), var(--glass-border-opacity))`,
    };
  }, [glassmorphism, glassIntensity]);

  return (
    <>
      {/* Trigger Button */}
      <div className="mobile-nav-container">
        {trigger || (
          <GlassButton
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden touch-target"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </GlassButton>
        )}
      </div>

      {/* Overlay Backdrop */}
      <div
        className={`mobile-nav-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
        style={{
          background: `rgba(0, 0, 0, ${isOpen ? 0.5 : 0})`,
          backdropFilter: isOpen ? 'blur(8px)' : 'none',
        }}
      />

      {/* Navigation Drawer */}
      <nav
        className={`mobile-nav-drawer ${isOpen ? 'open' : ''}`}
        style={{
          width,
          [position]: 0,
          ...glassStyles,
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold">Menu</h2>
          <GlassButton
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="touch-target"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </GlassButton>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2">
          {items.map((item, index) => (
            <NavigationItem
              key={`${item.href}-${index}`}
              item={item}
              onClick={() => handleNavItemClick(item)}
              isMobile
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Theme: <span className="capitalize">{resolvedTheme}</span>
          </div>
        </div>
      </nav>
    </>
  );
}

/**
 * Navigation Item Component - Individual nav item with glassmorphism styling
 */
interface NavigationItemProps {
  item: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  };
  onClick: () => void;
  isMobile?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  onClick,
  isMobile = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (item.onClick) {
    // Button-style navigation item
    return (
      <GlassButton
        variant="ghost"
        className={`
          w-full justify-start text-left touch-friendly
          ${isMobile ? 'touch-target px-4 py-3' : 'px-3 py-2'}
          ${isHovered ? 'glass-interactive' : ''}
        `}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.icon && <span className="mr-3">{item.icon}</span>}
        {item.label}
      </GlassButton>
    );
  }

  // Link-style navigation item
  return (
    <a
      href={item.href}
      className={`
        flex items-center w-full text-left no-hover-on-touch touch-friendly
        ${isMobile ? 'touch-target px-4 py-3' : 'px-3 py-2'}
        rounded-lg transition-colors duration-200
        hover:bg-accent hover:text-accent-foreground
        ${isHovered ? 'glass-interactive' : ''}
      `}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {item.icon && <span className="mr-3">{item.icon}</span>}
      {item.label}
    </a>
  );
};

/**
 * Mobile Navigation Hook - For managing mobile nav state in components
 */
export function useMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}

/**
 * Responsive Navigation - Auto-switches between mobile drawer and desktop menu
 */
interface ResponsiveNavigationProps {
  mobileItems?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  desktopItems?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
}

export function ResponsiveNavigation({
  mobileItems,
  desktopItems = DEFAULT_NAV_ITEMS,
  className = '',
}: ResponsiveNavigationProps) {
  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavigation items={mobileItems || desktopItems} />
      </div>

      {/* Desktop Navigation */}
      <nav className={`hidden md:flex items-center space-x-6 ${className}`}>
        {desktopItems.map((item, index) => (
          <NavigationItem
            key={`${item.href}-${index}`}
            item={item}
            onClick={() => {}}
          />
        ))}
      </nav>
    </>
  );
}

export default MobileNavigation;