'use client'

import Image from 'next/image'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Council', href: '/council' },
  { label: 'Partners', href: '/partners' },
  { label: 'News', href: '/news' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out h-[64px] flex flex-col justify-center ${
          scrolled
            ? 'backdrop-blur-[16px] bg-[rgba(5,5,5,0.85)] border-b border-[var(--bg-border)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            {/* LEFT: Logo & Brand */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/image.png"
                alt="World Gaming Council"
                width={48}
                height={48}
                className="object-contain transition-opacity duration-300 group-hover:opacity-90"
                priority
              />
            </Link>

            {/* CENTER: Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative font-body font-medium text-[14px] transition-colors duration-300 group ${
                      isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {item.label}
                    {/* Hover & Active Underline */}
                    <span 
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--lime)] transition-transform duration-300 origin-center ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`} 
                    />
                  </Link>
                )
              })}
            </div>

            {/* RIGHT: Apply Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/apply"
                className="hidden md:flex items-center justify-center border border-[var(--lime-dim)] text-[var(--lime)] font-body font-medium text-[13px] px-5 py-2 hover:bg-[var(--lime)] hover:text-[var(--text-inverse)] hover:glow-lime transition-all duration-200"
              >
                APPLY TO JOIN ↗
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden relative z-[60] p-2 text-[var(--text-primary)]"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between relative">
                  <motion.span
                    animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-[2px] bg-current block"
                  />
                  <motion.span
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-[2px] bg-current block"
                  />
                  <motion.span
                    animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-[2px] bg-current block"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU FULL-SCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[40] bg-[var(--bg-void)]/97 backdrop-blur-sm flex flex-col justify-center px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 mt-16">
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="font-playfair text-[48px] font-bold text-[var(--text-primary)] hover:text-[var(--lime)] transition-colors inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: NAV_LINKS.length * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center border border-[var(--lime-dim)] text-[var(--lime)] font-body font-medium text-[16px] px-8 py-4 hover:bg-[var(--lime)] hover:text-[var(--text-inverse)] hover:glow-lime transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  APPLY TO JOIN ↗
                </Link>
              </motion.div>
            </div>

            {/* Social Icons Row at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-12 left-6 right-6 flex items-center gap-6 border-t border-[var(--bg-border)] pt-8"
            >
              <Link href="https://twitter.com" className="text-[var(--text-secondary)] hover:text-[var(--lime)] transition-colors font-body text-sm">
                X / Twitter
              </Link>
              <Link href="https://discord.com" className="text-[var(--text-secondary)] hover:text-[var(--lime)] transition-colors font-body text-sm">
                Discord
              </Link>
              <Link href="https://linkedin.com" className="text-[var(--text-secondary)] hover:text-[var(--lime)] transition-colors font-body text-sm">
                LinkedIn
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
