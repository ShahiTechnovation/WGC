'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { NAV_LINKS, SOCIAL_LINKS, WGC_BRAND } from '@/lib/constants'

const MILESTONES = [
  { val: '30+', label: 'Events 2026' },
  { val: '12+', label: 'Nations' },
  { val: 'AUGUST', label: 'Grand Finale' },
  { val: '₹1CR+', label: 'Prize Pool' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const currentYear = new Date().getFullYear()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setSubmitted(true)
        setEmail('')
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (err) {
      console.error('Footer newsletter submission failed:', err)
    }
  }

  return (
    <footer
      id="footer"
      style={{
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--bg-border)',
        width: '100%',
      }}
    >
      {/* ── ZONE 1: Brand Bar ──────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--bg-border)' }}>
        <div className="wgc-container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            padding: '40px 0',
            flexWrap: 'wrap',
          }}>
            {/* Left: Logo + Wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link href="/" style={{ display: 'block', flexShrink: 0 }}>
                <Image
                  src="/image.png"
                  alt="World Gaming Council"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </Link>
              <div>
                <p
                  className="font-playfair font-bold text-text-primary"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '4px' }}
                >
                  WGC
                </p>
                <p
                  className="font-mono text-text-secondary"
                  style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase' }}
                >
                  World Gaming Council
                </p>
              </div>
            </div>

            {/* Center: Lime divider line — hidden on mobile */}
            <div style={{ flex: 1, height: '1px', background: 'var(--lime)', opacity: 0.6, minWidth: '60px', display: 'block' }} />

            {/* Right: Tagline */}
            <p
              className="font-mono text-text-secondary"
              style={{
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textAlign: 'right',
                maxWidth: '260px',
                lineHeight: 1.7,
              }}
            >
              The Governing Body<br />For Asian Gaming.
            </p>
          </div>
        </div>
      </div>

      {/* ── ZONE 2: Main Content Grid ──────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--bg-border)' }}>
        <div className="wgc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            padding: '56px 0',
            gap: '0',
          }}>

            {/* Col 1: Navigate */}
            <div style={{ paddingRight: '40px', borderRight: '1px solid var(--bg-border)', paddingBottom: '24px' }}>
              <p
                className="font-mono"
                style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '24px' }}
              >
                NAVIGATE
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[...NAV_LINKS, { label: 'Apply', href: '/apply' }].map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-text-secondary"
                      style={{
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--lime)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Connect */}
            <div style={{ padding: '0 40px', borderRight: '1px solid var(--bg-border)', paddingBottom: '24px' }}>
              <p
                className="font-mono"
                style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '24px' }}
              >
                CONNECT
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {SOCIAL_LINKS.map(link => (
                  <li key={link.name}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <span
                        className="font-mono"
                        style={{ fontSize: '11px', fontWeight: 600, color: 'var(--lime)', display: 'block', marginBottom: '2px', letterSpacing: '0.06em' }}
                      >
                        {link.name}
                      </span>
                      <span
                        className="font-mono text-text-secondary"
                        style={{ fontSize: '11px', letterSpacing: '0.04em', opacity: 0.7 }}
                      >
                        {link.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Intel Drops */}
            <div style={{ padding: '0 40px', borderRight: '1px solid var(--bg-border)', paddingBottom: '24px' }}>
              <p
                className="font-mono"
                style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '24px' }}
              >
                INTEL DROPS
              </p>
              <p
                className="font-body text-text-secondary"
                style={{ fontSize: '13px', lineHeight: 1.75, marginBottom: '24px' }}
              >
                Stay ahead of every WGC announcement, event drop, and builder update.
              </p>
              {submitted ? (
                <p className="font-mono text-lime" style={{ fontSize: '12px', letterSpacing: '0.08em' }}>
                  ✓ YOU&apos;RE IN THE LOOP
                </p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <p
                    className="font-mono text-text-secondary"
                    style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '8px' }}
                  >
                    Your Email
                  </p>
                  <div style={{ display: 'flex', borderBottom: '1px solid var(--bg-border)', transition: 'border-color 0.2s' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      required
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        padding: '8px 0',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '12px',
                        color: 'var(--text-primary)',
                      }}
                      onFocus={e => (e.currentTarget.parentElement!.style.borderColor = 'var(--lime)')}
                      onBlur={e => (e.currentTarget.parentElement!.style.borderColor = 'var(--bg-border)')}
                    />
                    <button
                      type="submit"
                      style={{
                        background: 'var(--lime)',
                        border: 'none',
                        color: '#050505',
                        padding: '8px 14px',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'opacity 0.2s',
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      →
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Col 4: 2026 Milestones */}
            <div style={{ paddingLeft: '40px', paddingBottom: '24px' }}>
              <p
                className="font-mono"
                style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '24px' }}
              >
                2026 MILESTONES
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {MILESTONES.map((m, i) => (
                  <div
                    key={m.label}
                    style={{
                      padding: '14px 0',
                      borderTop: i === 0 ? 'none' : '1px solid var(--bg-border)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span
                      className="font-mono text-lime"
                      style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}
                    >
                      {m.val}
                    </span>
                    <span
                      className="font-mono text-text-secondary"
                      style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── ZONE 3: Legal Bar ──────────────────────────────────────────── */}
      <div className="wgc-container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p
            className="font-mono text-text-secondary"
            style={{ fontSize: '10px', letterSpacing: '0.08em' }}
          >
            © {currentYear} World Gaming Council. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Privacy Policy', 'Terms', 'Contact'].map((item, i) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <Link
                  href="#"
                  className="font-mono text-text-secondary"
                  style={{ fontSize: '10px', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--lime)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {item}
                </Link>
                {i < 2 && (
                  <span className="font-mono text-text-secondary" style={{ fontSize: '10px', opacity: 0.3 }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
