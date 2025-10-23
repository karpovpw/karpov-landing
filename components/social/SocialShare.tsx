'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Twitter, Facebook, Linkedin, Copy } from 'lucide-react'
import { GlassCard } from '@/components/design-system/GlassCard'
import { BaseComponentProps } from '@/types'

interface SocialShareProps extends BaseComponentProps {
  url: string
  title: string
  description?: string
  hashtags?: string[]
  platforms?: string[]
}

export function SocialShare({
  url,
  title,
  description = '',
  hashtags = [],
  platforms = ['twitter', 'facebook', 'linkedin'],
  className = '',
  ...props
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${hashtags.join(',')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleShare = (platform: string) => {
    const shareUrl = shareUrls[platform as keyof typeof shareUrls]
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-primary">Share this content</h3>
          <Share2 className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex items-center space-x-2">
          {platforms.includes('twitter') && (
            <motion.button
              onClick={() => handleShare('twitter')}
              className="p-2 rounded-lg glass-card hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on Twitter"
            >
              <Twitter className="w-4 h-4 text-blue-500" />
            </motion.button>
          )}

          {platforms.includes('facebook') && (
            <motion.button
              onClick={() => handleShare('facebook')}
              className="p-2 rounded-lg glass-card hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on Facebook"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
            </motion.button>
          )}

          {platforms.includes('linkedin') && (
            <motion.button
              onClick={() => handleShare('linkedin')}
              className="p-2 rounded-lg glass-card hover:bg-muted transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-blue-700" />
            </motion.button>
          )}

          <motion.button
            onClick={handleCopyLink}
            className="p-2 rounded-lg glass-card hover:bg-muted transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Copy link"
          >
            <Copy className={`w-4 h-4 ${copied ? 'text-green-500' : 'text-muted-foreground'}`} />
          </motion.button>
        </div>

        {copied && (
          <motion.div
            className="mt-2 text-sm text-green-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Link copied to clipboard!
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  )
}