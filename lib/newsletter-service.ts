// Newsletter service utilities

export interface NewsletterSubscription {
  email: string
  name?: string
  interests: string[]
  subscribedAt: string
}

export interface NewsletterConfig {
  apiKey: string
  listId: string
  provider: 'mailchimp' | 'convertkit' | 'custom'
}

export class NewsletterService {
  private static config: NewsletterConfig | null = null

  static configure(config: NewsletterConfig) {
    this.config = config
  }

  static async subscribe(data: {
    email: string
    name?: string
    interests?: string[]
  }): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.config) {
        // Fallback: store locally or simulate success
        console.log('Newsletter subscription (local):', data)
        return { success: true }
      }

      switch (this.config.provider) {
        case 'mailchimp':
          return await this.subscribeToMailchimp(data)
        case 'convertkit':
          return await this.subscribeToConvertKit(data)
        case 'custom':
          return await this.subscribeToCustom(data)
        default:
          throw new Error('Unsupported newsletter provider')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      return {
        success: false,
        error: 'Failed to subscribe. Please try again later.'
      }
    }
  }

  private static async subscribeToMailchimp(data: {
    email: string
    name?: string
    interests?: string[]
  }): Promise<{ success: boolean; error?: string }> {
    const response = await fetch(`/api/newsletter/mailchimp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        interests: data.interests,
        listId: this.config!.listId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${response.statusText}`)
    }

    return response.json()
  }

  private static async subscribeToConvertKit(data: {
    email: string
    name?: string
    interests?: string[]
  }): Promise<{ success: boolean; error?: string }> {
    const formData = new FormData()
    formData.append('email', data.email)
    if (data.name) formData.append('name', data.name)
    if (data.interests) formData.append('tags', data.interests.join(','))

    const response = await fetch(`https://api.convertkit.com/v3/forms/${this.config!.listId}/subscribe`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`ConvertKit API error: ${response.statusText}`)
    }

    return response.json()
  }

  private static async subscribeToCustom(data: {
    email: string
    name?: string
    interests?: string[]
  }): Promise<{ success: boolean; error?: string }> {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Custom API error: ${response.statusText}`)
    }

    return response.json()
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static generateSubscriptionId(): string {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  static async getSubscriptionStatus(email: string): Promise<{
    subscribed: boolean
    subscription?: NewsletterSubscription
  }> {
    try {
      // In a real app, check with your newsletter provider
      const response = await fetch(`/api/newsletter/status?email=${encodeURIComponent(email)}`)

      if (response.ok) {
        return response.json()
      }

      return { subscribed: false }
    } catch (error) {
      console.error('Error checking subscription status:', error)
      return { subscribed: false }
    }
  }

  static async unsubscribe(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      if (!this.config) {
        console.log('Newsletter unsubscription (local):', email)
        return { success: true }
      }

      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error(`Unsubscribe error: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('Newsletter unsubscription error:', error)
      return {
        success: false,
        error: 'Failed to unsubscribe. Please try again later.'
      }
    }
  }
}

// Utility functions
export function formatNewsletterInterests(interests: string[]): string {
  return interests.map(interest =>
    interest.charAt(0).toUpperCase() + interest.slice(1)
  ).join(', ')
}

export function getNewsletterStats(): {
  totalSubscribers: number
  growthRate: number
  openRate: number
} {
  // In a real app, this would come from your newsletter provider
  return {
    totalSubscribers: 0,
    growthRate: 0,
    openRate: 0,
  }
}