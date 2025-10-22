// Enhanced Error Boundary component for React applications

'use client'

import { Component, ReactNode } from 'react'
import { reportError, ErrorContext } from '@/lib/error-handling-utils'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  context?: ErrorContext
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class GlassErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Report error using our error handling system
    reportError(error, {
      ...this.props.context,
      component: this.props.context?.component || 'ErrorBoundary',
      action: 'component-did-catch',
      metadata: {
        componentStack: errorInfo.componentStack,
        errorBoundary: true,
      },
    }, 'high')

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="glass-card p-6 rounded-xl m-4 border border-red-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-500">Something went wrong</h2>
          </div>

          <p className="text-muted-foreground mb-4">
            An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="glass-button bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg font-medium"
            >
              Refresh Page
            </button>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined, errorInfo: undefined })}
              className="glass-button bg-muted/20 hover:bg-muted/30 text-muted-foreground px-4 py-2 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 p-4 bg-muted/10 rounded-lg">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-red-500 overflow-auto max-h-32">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// Hook-based error boundary for functional components
export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null)

  const resetError = useCallback(() => setError(null), [])

  const captureError = useCallback((error: Error | string) => {
    const errorObj = typeof error === 'string' ? new Error(error) : error
    setError(errorObj)
    reportError(errorObj, { action: 'use-error-boundary' }, 'medium')
  }, [])

  if (error) {
    throw error
  }

  return { captureError, resetError }
}

// Export GlassErrorBoundary as ErrorBoundary for backward compatibility
export const ErrorBoundary = GlassErrorBoundary

// Async error boundary for promises
export async function withErrorBoundary<T>(
  asyncFn: () => Promise<T>,
  context?: ErrorContext
): Promise<T> {
  try {
    return await asyncFn()
  } catch (error) {
    reportError(error as Error, context, 'medium')
    throw error
  }
}