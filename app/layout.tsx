import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Karpov Portfolio',
  description: 'Modern portfolio showcasing projects with liquid glass design',
  keywords: ['portfolio', 'developer', 'projects', 'liquid glass design'],
  authors: [{ name: 'karpovpw' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="hidden font-bold sm:inline-block">
                    Karpov Portfolio
                  </span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a href="/about">About</a>
                  <a href="/portfolio">Portfolio</a>
                  <a href="/articles">Articles</a>
                  <a href="/crypto">Crypto</a>
                  <a href="/contact">Contact</a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with Next.js 15 and TypeScript.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}