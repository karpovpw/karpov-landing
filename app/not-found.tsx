'use client'

export const dynamic = 'force-dynamic'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20">
      <div className="p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
        <p className="text-muted-foreground mb-6">Page not found</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}