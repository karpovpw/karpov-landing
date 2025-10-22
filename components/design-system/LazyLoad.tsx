'use client'

import { useEffect, useRef, useState } from 'react'
import { BaseComponentProps } from '@/types'

interface LazyLoadProps extends BaseComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  onLoad?: () => void
}

export function LazyLoad({
  children,
  fallback,
  threshold = 0.1,
  rootMargin = '50px',
  triggerOnce = true,
  onLoad,
  className = '',
  ...props
}: LazyLoadProps) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          if (triggerOnce) {
            setHasLoaded(true)
          }
          onLoad?.()

          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, onLoad])

  return (
    <div ref={ref} className={className} {...props}>
      {isIntersecting ? children : fallback || <div style={{ height: '200px' }} />}
    </div>
  )
}

// Lazy image component with blur placeholder
interface LazyImageProps extends BaseComponentProps {
  src: string
  alt: string
  width?: number
  height?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  priority?: boolean
  sizes?: string
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  placeholder = 'empty',
  blurDataURL,
  priority = false,
  sizes,
  className = '',
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    )
  }

  return (
    <LazyLoad
      fallback={
        <div
          className={`bg-muted animate-pulse ${className}`}
          style={{ width, height }}
        />
      }
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            backgroundImage: placeholder === 'blur' && blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          {...props}
        />
      ) : (
        <div
          className={`bg-muted flex items-center justify-center ${className}`}
          style={{ width, height }}
        >
          <span className="text-muted-foreground text-sm">Failed to load</span>
        </div>
      )}
    </LazyLoad>
  )
}

// Lazy section component for below-fold content
interface LazySectionProps extends BaseComponentProps {
  delay?: number
}

export function LazySection({
  children,
  delay = 0,
  className = '',
  ...props
}: LazySectionProps) {
  const [shouldRender, setShouldRender] = useState(delay === 0)

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setShouldRender(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [delay])

  if (!shouldRender) {
    return <div className={`min-h-[400px] ${className}`} {...props} />
  }

  return (
    <section className={className} {...props}>
      {children}
    </section>
  )
}