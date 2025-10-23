// LinkedIn API integration utilities

export interface LinkedInProfile {
  id: string
  firstName: string
  lastName: string
  publicProfileUrl: string
  profilePicture: {
    displayImage: {
      urn: string
    }
  }
  location: {
    name: string
  }
  position: {
    title: string
    companyName: string
  }
  skills: string[]
  endorsements: number
  connections: number
}

export interface LinkedInAccessToken {
  access_token: string
  expires_in: number
}

export class LinkedInAPI {
  private static readonly API_BASE = 'https://api.linkedin.com/v2'
  private static readonly AUTH_BASE = 'https://www.linkedin.com/oauth/v2'

  static async getAccessToken(code: string, clientId: string, clientSecret: string, redirectUri: string): Promise<LinkedInAccessToken> {
    const response = await fetch(`${this.AUTH_BASE}/accessToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getProfile(accessToken: string): Promise<LinkedInProfile> {
    const response = await fetch(`${this.API_BASE}/people/~`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getProfileSkills(accessToken: string, profileId: string): Promise<string[]> {
    const response = await fetch(`${this.API_BASE}/people/${profileId}/skills`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.elements?.map((skill: any) => skill.name) || []
  }

  static generateAuthUrl(clientId: string, redirectUri: string, state?: string): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      redirect_uri: redirectUri,
      state: state || '',
      scope: 'r_liteprofile r_emailaddress w_member_social',
    })

    return `${this.AUTH_BASE}/authorization?${params.toString()}`
  }

  static async refreshAccessToken(refreshToken: string, clientId: string, clientSecret: string): Promise<LinkedInAccessToken> {
    const response = await fetch(`${this.AUTH_BASE}/accessToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    })

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`)
    }

    return response.json()
  }

  static isTokenExpired(token: LinkedInAccessToken): boolean {
    const now = Math.floor(Date.now() / 1000)
    return now >= (token.expires_in || 0)
  }
}

// Utility functions for LinkedIn integration
export function getLinkedInProfileUrl(profileId: string): string {
  return `https://www.linkedin.com/in/${profileId}`
}

export function formatLinkedInProfile(profile: LinkedInProfile): {
  name: string
  title: string
  location: string
  profileUrl: string
  skills: string[]
  connections: number
} {
  return {
    name: `${profile.firstName} ${profile.lastName}`,
    title: profile.position?.title || 'Professional',
    location: profile.location?.name || 'Unknown',
    profileUrl: profile.publicProfileUrl,
    skills: profile.skills || [],
    connections: profile.connections || 0,
  }
}

export function validateLinkedInProfileId(profileId: string): boolean {
  // LinkedIn profile IDs are typically 10-20 characters, alphanumeric
  return /^[a-zA-Z0-9-]{5,30}$/.test(profileId)
}