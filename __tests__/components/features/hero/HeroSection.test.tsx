import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/features/hero/HeroSection'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  useScroll: () => ({
    scrollYProgress: 0,
  }),
}))

// Mock AnimatedText
jest.mock('@/components/hero/AnimatedText', () => ({
  AnimatedText: ({ text, className }: any) => <span className={className}>{text}</span>,
}))

// Mock PROFILE_DATA
jest.mock('@/content/profile', () => ({
  PROFILE_DATA: {
    personal: {
      name: 'Test Name',
      title: 'Test Title',
      tagline: 'Test Tagline',
    },
  },
}))

describe('HeroSection', () => {
  it('renders the hero section with name, title, and tagline', () => {
    render(<HeroSection />)

    expect(screen.getByText('Test Name')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Tagline')).toBeInTheDocument()
  })

  it('renders action buttons', () => {
    render(<HeroSection />)

    expect(screen.getByText('View LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Read Articles')).toBeInTheDocument()
    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<HeroSection className="custom-class" />)

    expect(container.firstChild).toHaveClass('custom-class')
  })
})