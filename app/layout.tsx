import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/design-system/ThemeProvider'

const geist = Geist({
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
          <div className="relative min-h-screen bg-background">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}