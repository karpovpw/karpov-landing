import type { Meta, StoryObj } from '@storybook/react';
import GlassCard from './GlassCard';
import { GlassCardWithActions, GlassStatCard } from './molecules/GlassCardHeader';

const meta: Meta<typeof GlassCard> = {
  title: 'Design System/Atoms/GlassCard',
  component: GlassCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A foundational glassmorphism card component with backdrop-filter blur effects and configurable properties.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'default', 'enhanced'],
      description: 'Glassmorphism intensity affecting background opacity and blur',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'interactive', 'hero', 'nav', 'content'],
      description: 'Card variant for different use cases',
    },
    children: {
      control: { type: 'text' },
      description: 'Card content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Default Glass Card</h3>
        <p className="text-muted-foreground">
          This is a basic glassmorphism card with default styling.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: (
      <div className="p-4 cursor-pointer">
        <h3 className="text-lg font-semibold mb-2">Interactive Glass Card</h3>
        <p className="text-muted-foreground">
          Hover me to see the interactive effects!
        </p>
      </div>
    ),
  },
};

export const Enhanced: Story = {
  args: {
    intensity: 'enhanced',
    children: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Enhanced Glass Card</h3>
        <p className="text-muted-foreground">
          This card has stronger glassmorphism effects for maximum visual impact.
        </p>
      </div>
    ),
  },
};

export const Hero: Story = {
  args: {
    variant: 'hero',
    intensity: 'enhanced',
    children: (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Hero Section Card</h2>
        <p className="text-muted-foreground mb-4">
          Perfect for hero sections and featured content areas.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            Primary Action
          </button>
          <button className="px-4 py-2 border border-border rounded-lg">
            Secondary Action
          </button>
        </div>
      </div>
    ),
  },
};

/**
 * Molecule Stories - GlassCardHeader combinations
 */
export const WithActions: Story = {
  render: () => (
    <GlassCardWithActions
      title="Project Dashboard"
      subtitle="Manage your projects and team collaboration"
      primaryAction={{
        label: 'Create Project',
        onClick: () => alert('Create project clicked!'),
      }}
      secondaryAction={{
        label: 'View All',
        onClick: () => alert('View all clicked!'),
      }}
    >
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-muted-foreground">Active Projects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">34</div>
          <div className="text-sm text-muted-foreground">Team Members</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">89%</div>
          <div className="text-sm text-muted-foreground">Completion Rate</div>
        </div>
      </div>
    </GlassCardWithActions>
  ),
};

export const StatCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      <GlassStatCard
        title="Total Revenue"
        value="$45,231"
        change={{ value: '+20.1%', trend: 'up' }}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        }
      />
      <GlassStatCard
        title="Active Users"
        value="2,350"
        change={{ value: '+15.3%', trend: 'up' }}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
      />
      <GlassStatCard
        title="Conversion Rate"
        value="3.24%"
        change={{ value: '-2.1%', trend: 'down' }}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
    </div>
  ),
};

/**
 * Responsive Examples
 */
export const Responsive: Story = {
  render: () => (
    <div className="space-y-4">
      <GlassCard className="p-4 md:p-6 lg:p-8">
        <h3 className="text-base md:text-lg lg:text-xl font-semibold mb-2">
          Responsive Glass Card
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          This card automatically adjusts padding and typography based on screen size for optimal mobile and desktop experience.
        </p>
      </GlassCard>
    </div>
  ),
};

/**
 * Dark Theme Example
 */
export const DarkTheme: Story = {
  parameters: {
    themes: {
      themeOverride: 'dark',
    },
  },
  render: () => (
    <div className="space-y-4">
      <GlassCard intensity="enhanced" className="p-6">
        <h3 className="text-lg font-semibold mb-2">Dark Theme Glass Card</h3>
        <p className="text-muted-foreground">
          Optimized for dark themes with AMOLED-friendly backgrounds and enhanced contrast for better readability.
        </p>
      </GlassCard>
    </div>
  ),
};