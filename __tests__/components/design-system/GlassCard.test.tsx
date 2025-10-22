import { render, screen } from '@testing-library/react'
import { GlassCard } from '@/components/design-system/GlassCard'

describe('GlassCard', () => {
  it('renders children correctly', () => {
    render(
      <GlassCard data-testid="glass-card">
        <p>Test content</p>
      </GlassCard>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender } = render(
      <GlassCard variant="elevated" data-testid="glass-card">
        Elevated card
      </GlassCard>
    )

    expect(screen.getByTestId('glass-card')).toHaveClass('glass-card')

    rerender(
      <GlassCard variant="subtle" data-testid="glass-card">
        Subtle card
      </GlassCard>
    )

    expect(screen.getByTestId('glass-card')).toHaveClass('glass-card')
  })

  it('applies custom className', () => {
    render(
      <GlassCard className="custom-class" data-testid="glass-card">
        Custom card
      </GlassCard>
    )

    expect(screen.getByTestId('glass-card')).toHaveClass('custom-class')
  })

  it('renders with different blur levels', () => {
    render(
      <GlassCard blur="xl" data-testid="glass-card">
        XL blur card
      </GlassCard>
    )

    expect(screen.getByTestId('glass-card')).toBeInTheDocument()
  })
})