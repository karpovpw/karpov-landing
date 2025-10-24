'use client'

import { motion } from 'framer-motion'
import { BackButton, ThemeToggle } from './ThemeToggle'

export function NavigationBar() {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 bg-background/20 backdrop-blur-md border-b border-border/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex items-center">
        <BackButton />
      </div>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </motion.nav>
  )
}