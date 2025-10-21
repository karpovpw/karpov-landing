import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider, ThemeScript } from '@/components/design-system/ThemeProvider'
import { HeaderThemeToggle } from '@/components/design-system/ThemeToggle'
import { ResponsiveNavigation } from '@/components/layout/MobileNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Karpov Portfolio',
  description: 'Modern portfolio showcasing projects with liquid glass design and seamless theme switching',
  keywords: ['portfolio', 'developer', 'projects', 'liquid glass design', 'theme switching', 'glassmorphism'],
  authors: [{ name: 'karpovpw' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeScript />
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                  <a className="mr-6 flex items-center space-x-2" href="/">
                    <span className="hidden font-bold sm:inline-block">
                      Karpov Portfolio
                    </span>
                  </a>
                  <ResponsiveNavigation />
                </div>
                <HeaderThemeToggle />
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t py-6 md:px-8 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built with Next.js 15, TypeScript, and Liquid Glass Design System.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}