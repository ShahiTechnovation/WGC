'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HERO_STATS } from '@/lib/constants'

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(170,223,46,0.05) 0%, transparent 65%)'
      }} />
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025]">
        <svg width="80vw" height="80vw" viewBox="0 0 400 400" fill="none" style={{ maxWidth: '900px', maxHeight: '900px' }}>
          <path d="M60 20H340L380 60V340L340 380H60L20 340V60L60 20Z" stroke="var(--text-primary)" strokeWidth="1" />
          <path d="M80 40H320L360 80V320L320 360H80L40 320V80L80 40Z" stroke="var(--text-primary)" strokeWidth="0.5" />
          <ellipse cx="200" cy="200" rx="120" ry="120" stroke="var(--text-primary)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  )
}

export function HeroSection() {
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
  })

  return (
    <section
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden scanline"
      id="hero"
    >
      <HeroBackground />

      {/* Centered column — everything inside is center-aligned */}
      <div
        className="relative z-10 w-full mx-auto px-6"
        style={{
          maxWidth: '820px',
          paddingTop: '10vh',
          paddingBottom: '6vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* WGC Logo */}
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: '28px' }}>
          <div style={{ filter: 'drop-shadow(0 0 24px rgba(170,223,46,0.15))' }}>
            <Image
              src="/image.png"
              alt="World Gaming Council"
              width={90}
              height={90}
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Label */}
        <motion.p
          {...fadeUp(0.25)}
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: 'var(--lime)',
            textAlign: 'center',
            marginBottom: '28px',
          }}
        >
          ESTABLISHED 2025 · GAMING AUTHORITY
        </motion.p>

        {/* Headline */}
        <div style={{ marginBottom: '28px', width: '100%' }}>
          <motion.h1
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.7, delay: 0.4 } }}
            className="font-playfair font-black text-text-primary"
            style={{ fontSize: 'var(--type-hero)', lineHeight: 1.05, textAlign: 'center' }}
          >
            The council
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.7, delay: 0.58 } }}
            className="font-playfair font-black italic"
            style={{ fontSize: 'var(--type-hero)', lineHeight: 1.05, textAlign: 'center' }}
          >
            <span className="text-text-primary">governing Asia&apos;s </span>
            <span className="text-lime">game.</span>
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(0.75)}
          className="font-body text-text-secondary"
          style={{
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            lineHeight: 1.75,
            maxWidth: '500px',
            textAlign: 'center',
            marginBottom: '36px',
          }}
        >
          World Gaming Council unites builders, players, and ecosystems across Asia — setting standards for the next era of competitive gaming.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.9)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '48px',
          }}
        >
          <Link href="/apply" className="btn-primary">
            JOIN THE COUNCIL <span>↗</span>
          </Link>
          <Link href="/about" className="btn-secondary">
            VIEW OUR MISSION <span>→</span>
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div {...fadeUp(1.05)}>
          <div style={{
            display: 'flex',
            alignItems: 'stretch',
            border: '1px solid var(--bg-border)',
          }}>
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: '16px 32px',
                  textAlign: 'center',
                  borderLeft: i > 0 ? '1px solid var(--bg-border)' : 'none',
                  minWidth: '100px',
                }}
              >
                <p
                  className="font-bebas text-lime"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', lineHeight: 1 }}
                >
                  {stat.number}
                </p>
                <p
                  className="font-mono text-text-secondary"
                  style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.16em', marginTop: '4px' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-px h-10 bg-bg-border origin-top animate-scroll-line" />
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary">SCROLL</p>
      </motion.div>
    </section>
  )
}
