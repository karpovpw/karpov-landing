'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Container } from '@/components/layout/Container'
import { ContactFormData } from '@/types'

const ContactForm = dynamic(() => import('@/components/contact/ContactForm').then(mod => mod.ContactForm), {
  ssr: false,
  loading: () => <div>Loading contact form...</div>
})

const LinkedInProfile = dynamic(() => import('@/components/contact/LinkedInProfile').then(mod => mod.LinkedInProfile), {
  ssr: false,
  loading: () => <div>Loading LinkedIn profile...</div>
})

const SocialShare = dynamic(() => import('@/components/social/SocialShare').then(mod => mod.SocialShare), {
  ssr: false,
  loading: () => <div>Loading social share...</div>
})

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (data: ContactFormData) => {
    setLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In a real app, you'd send this to your backend
      console.log('Contact form submitted:', data)

      setSuccess(true)
      setLoading(false)
    } catch (err) {
      setError('Failed to send message. Please try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main className="relative">
        <Container className="py-16 max-w-full sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-full 2xl:max-w-full">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">
              Thank You!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your message has been sent successfully. I'll get back to you soon.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="glass-button px-6 py-3 text-lg font-semibold"
            >
              Send Another Message
            </button>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="relative">
      <Container size="lg" className="py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Let's Work Together
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Whether it's a new project,
            collaboration, or just a chat about technology, I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full mx-auto">
          {/* Contact Form */}
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-primary mb-6">Send a Message</h2>
            <ContactForm
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </div>

          {/* LinkedIn Profile */}
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-primary mb-6">Connect on LinkedIn</h2>
              <LinkedInProfile
                profileId="karpovpw"
                showEndorsements
              />
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-primary mb-6">Share This Page</h2>
              <SocialShare
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title="Contact Karpov - Context Engineer"
                description="Get in touch for projects, collaborations, or just to chat about technology."
                hashtags={['webdev', 'blockchain', 'AI', 'portfolio']}
              />
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}