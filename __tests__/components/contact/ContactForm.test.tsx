import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ContactForm } from '@/components/contact/ContactForm'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}))

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Send: () => <span data-testid="send-icon">Send</span>,
  Loader2: () => <span data-testid="loader-icon">Loader</span>,
}))

// Mock GlassInput and GlassTextarea
jest.mock('@/components/design-system/GlassInput', () => ({
  GlassInput: ({ id, value, onChange, placeholder, className }: any) => (
    <input
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      data-testid={`glass-input-${id}`}
    />
  ),
}))

jest.mock('@/components/design-system/GlassTextarea', () => ({
  GlassTextarea: ({ id, value, onChange, placeholder, rows, className }: any) => (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={className}
      data-testid={`glass-textarea-${id}`}
    />
  ),
}))

// Mock GlassCard
jest.mock('@/components/design-system/GlassCard', () => ({
  GlassCard: ({ children, className }: any) => <div className={className} data-testid="glass-card">{children}</div>,
}))

describe('ContactForm', () => {
  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('renders form fields', () => {
    render(<ContactForm onSubmit={mockOnSubmit} />)

    expect(screen.getByLabelText('Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('Email *')).toBeInTheDocument()
    expect(screen.getByLabelText('Message *')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Message is required')).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('validates email format', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />)

    const emailInput = screen.getByLabelText('Email *')
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('validates message length', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />)

    const messageInput = screen.getByLabelText('Message *')
    fireEvent.change(messageInput, { target: { value: 'short' } })

    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Message must be at least 10 characters long')).toBeInTheDocument()
    })

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText('Name *')
    const emailInput = screen.getByLabelText('Email *')
    const messageInput = screen.getByLabelText('Message *')

    fireEvent.change(nameInput, { target: { value: 'Test Name' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'This is a test message with enough characters.' } })

    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: 'Test Name',
        email: 'test@example.com',
        message: 'This is a test message with enough characters.',
      })
    })
  })

  it('shows loading state', () => {
    render(<ContactForm onSubmit={mockOnSubmit} loading={true} />)

    expect(screen.getByText('Sending...')).toBeInTheDocument()
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('displays error message', () => {
    render(<ContactForm onSubmit={mockOnSubmit} error="Submission failed" />)

    expect(screen.getByText('Submission failed')).toBeInTheDocument()
  })

  it('clears errors when user starts typing', async () => {
    render(<ContactForm onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByLabelText('Name *')
    fireEvent.change(nameInput, { target: { value: '' } })

    const submitButton = screen.getByRole('button', { name: /send message/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    fireEvent.change(nameInput, { target: { value: 'Test' } })

    await waitFor(() => {
      expect(screen.queryByText('Name is required')).not.toBeInTheDocument()
    })
  })
})