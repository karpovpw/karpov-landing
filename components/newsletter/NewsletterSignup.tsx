'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Check, Loader2 } from 'lucide-react'
import { NewsletterService } from '@/lib/newsletter-service'
import { GlassCard } from '@/components/design-system/GlassCard'
import { GlassInput } from '@/components/design-system/GlassInput'
import { BaseComponentProps } from '@/types'

interface NewsletterSignupProps extends BaseComponentProps {
  title?: string
  description?: string
  interests?: string[]
  compact?: boolean
}

export function NewsletterSignup({
  title = 'Stay Updated',
  description = 'Get the latest updates on my projects, articles, and insights delivered to your inbox.',
  interests = ['web development', 'blockchain', 'AI/ML'],
  compact = false,
  className = '',
  ...props
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!NewsletterService.validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    const result = await NewsletterService.subscribe({
      email,
      name: name || undefined,
      interests: selectedInterests.length > 0 ? selectedInterests : interests,
    })

    setLoading(false)

    if (result.success) {
      setSuccess(true)
      setEmail('')
      setName('')
      setSelectedInterests([])
    } else {
      setError(result.error || 'Failed to subscribe. Please try again.')
    }
  }

  if (success) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        {...props}
      >
        <GlassCard className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold text-primary mb-2">
            Welcome aboard!
          </h3>
          <p className="text-muted-foreground mb-4">
            Thank you for subscribing. You'll receive updates on my latest projects and insights.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-sm text-primary hover:underline"
          >
            Subscribe another email
          </button>
        </GlassCard>
      </motion.div>
    )
  }

  if (compact) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        {...props}
      >
        <GlassCard className="p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <GlassInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full glass-button py-2 text-sm font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Subscribe</span>
                </>
              )}
            </motion.button>
          </form>
        </GlassCard>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      <GlassCard className="p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name (optional)
            </label>
            <GlassInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email *
            </label>
            <GlassInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Interests (optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedInterests.includes(interest)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full glass-button py-3 font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <Mail className="w-5 h-5" />
                <span>Subscribe to Newsletter</span>
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-4 pt-4 border-t border-muted">
          <p className="text-xs text-muted-foreground text-center">
            No spam, unsubscribe at any time. Your email is safe with me.
          </p>
        </div>
      </GlassCard>
    </motion.div>
  )
}