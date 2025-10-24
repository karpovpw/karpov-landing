import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/design-system/ThemeProvider'
import { SearchProvider } from '@/components/search/SearchProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { NavigationBar } from '@/components/design-system/NavigationBar'
import { initializeAccessibility } from '@/lib/accessibility-utils'
import { preloadCriticalResources } from '@/lib/optimization-utils'

const geist = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Karpov - Portfolio',
  description: 'Professional portfolio showcasing expertise in modern web development, blockchain technology, and multi-agent systems.',
  keywords: ['portfolio', 'web development', 'blockchain', 'typescript', 'react', 'next.js'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider>
          <SearchProvider>
            <NavigationBar />
            <div className="relative min-h-screen pt-24">
              {children}
            </div>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}