'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { GlassCard } from './design-system/GlassCard'
import { Typography } from './design-system/Typography'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // Call optional error handler
    this.props.onError?.(error, errorInfo)

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo })
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GlassCard variant="elevated" className="max-w-md w-full p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>

              <h2 className="text-2xl font-semibold mb-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Something went wrong
              </h2>

              <p className="text-muted-foreground mb-6 leading-7">
                We apologize for the inconvenience. An unexpected error occurred while rendering this page.
              </p>
            </div>

            <div className="space-y-3">
              <GlassCard
                as="button"
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center gap-2 py-3 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </GlassCard>

              <GlassCard
                as="button"
                onClick={this.handleGoHome}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-3 cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </GlassCard>
            </div>

            {/* Development error details */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Error Details (Development)
                </summary>
                <div className="mt-3 p-4 bg-muted rounded-lg text-xs font-mono text-left overflow-auto max-h-32">
                  <div className="text-red-500 font-semibold mb-2">
                    {this.state.error.name}: {this.state.error.message}
                  </div>
                  <pre className="whitespace-pre-wrap text-muted-foreground">
                    {this.state.error.stack}
                  </pre>
                </div>
              </details>
            )}
          </GlassCard>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for handling async errors in functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    console.error('Async error caught:', error, errorInfo)

    // In a real app, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // errorReportingService.captureException(error, { extra: errorInfo })
    }
  }
}

// Higher-order component for error boundary wrapper
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}