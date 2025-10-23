// Contact form utilities and validation

import { ContactFormData } from '@/types'

export interface ContactValidationResult {
  isValid: boolean
  errors: Partial<ContactFormData>
}

export function validateContactForm(data: ContactFormData): ContactValidationResult {
  const errors: Partial<ContactFormData> = {}

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required'
  } else if (data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long'
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Message must be less than 1000 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function sanitizeContactData(data: ContactFormData): ContactFormData {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
  }
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    // In a real application, you would send this to your backend API
    // For now, we'll simulate an API call

    const sanitizedData = sanitizeContactData(data)

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate success (in real app, handle actual API response)
    console.log('Contact form submitted:', sanitizedData)

    return { success: true }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      success: false,
      error: 'Failed to send message. Please try again later.'
    }
  }
}

export function generateContactEmailTemplate(data: ContactFormData): string {
  return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This message was sent from the portfolio contact form.
  `.trim()
}

export function getContactFormAnalytics(): {
  totalSubmissions: number
  successfulSubmissions: number
  averageResponseTime: number
} {
  // In a real app, this would come from your analytics service
  return {
    totalSubmissions: 0,
    successfulSubmissions: 0,
    averageResponseTime: 0,
  }
}