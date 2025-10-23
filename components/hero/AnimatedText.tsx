'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { BaseComponentProps } from '@/types'

interface AnimatedTextProps extends BaseComponentProps {
  text: string
  delay?: number
  speed?: number
  repeat?: boolean
  className?: string
}

export function AnimatedText({
  text,
  delay = 0,
  speed = 50,
  repeat = false,
  className = '',
  ...props
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        startTyping()
      }, delay)
      return () => clearTimeout(timer)
    } else {
      startTyping()
    }
  }, [text, delay])

  const startTyping = () => {
    let index = 0
    setDisplayedText('')
    setIsTyping(true)

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
        setIsTyping(false)

        if (repeat) {
          setTimeout(() => {
            startTyping()
          }, 2000) // Pause before repeating
        }
      }
    }, speed)

    return () => clearInterval(typeInterval)
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      <span>{displayedText}</span>
      {isTyping && (
        <motion.span
          className="inline-block w-0.5 h-6 bg-primary ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  )
}