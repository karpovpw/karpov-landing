'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'
import { ContactFormData } from '@/types'
import { GlassCard } from '@/components/design-system/GlassCard'
import { GlassInput } from '@/components/design-system/GlassInput'
import { GlassTextarea } from '@/components/design-system/GlassTextarea'
import { BaseComponentProps } from '@/types'

interface ContactFormProps extends BaseComponentProps {
  onSubmit: (data: ContactFormData) => void
  loading?: boolean
  error?: string
}

export function ContactForm({
  onSubmit,
  loading = false,
  error,
  className = '',
  ...props
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof ContactFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <GlassCard className="p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Get In Touch
          </h2>
          <p className="text-muted-foreground">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <GlassInput
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Your full name"
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <GlassInput
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="your.email@example.com"
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <GlassTextarea
              id="message"
              value={formData.message}
              onChange={handleChange('message')}
              placeholder="Tell me about your project or how we can work together..."
              rows={6}
              className={errors.message ? 'border-destructive' : ''}
            />
            {errors.message && (
              <p className="text-destructive text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full glass-button px-6 py-3 text-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 pt-6 border-t border-muted">
          <p className="text-sm text-muted-foreground text-center">
            I typically respond within 24 hours. For urgent inquiries, feel free to reach out via LinkedIn.
          </p>
        </div>
      </GlassCard>
    </motion.div>
  )
}