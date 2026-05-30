'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WGCEvent } from '@/lib/constants'
import Link from 'next/link'

export type { WGCEvent }

// ── AFK Roadmap Showcase Component ───────────────────────────────────────────
export function AFKRoadmap() {
  return (
    <section style={{
      paddingTop: '48px',
      paddingBottom: '0px',
      borderBottom: '1px solid var(--bg-border)',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--bg-void)'
    }}>
      {/* Scope styles locally */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes grid-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        .cyber-grid-container {
          position: relative;
          width: 100%;
          height: 160px;
          background: linear-gradient(180deg, transparent 0%, rgba(170,223,46,0.06) 100%);
          overflow: hidden;
          margin-top: 40px;
          border-top: 1px dashed rgba(170,223,46,0.15);
        }
        .cyber-perspective-floor {
          position: absolute;
          inset: 0;
          perspective: 250px;
        }
        .cyber-grid-lines {
          position: absolute;
          width: 200%;
          height: 400%;
          left: -50%;
          top: -100%;
          background-image: 
            linear-gradient(90deg, rgba(170,223,46,0.15) 1px, transparent 1px),
            linear-gradient(0deg, rgba(170,223,46,0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: rotateX(75deg);
          transform-origin: center center;
          animation: grid-scroll 6s linear infinite;
        }
        .cyber-title {
          position: absolute;
          left: 50%;
          bottom: 30px;
          transform: translateX(-50%);
          font-family: var(--font-bebas), 'Bebas Neue', Impact, sans-serif;
          font-size: clamp(38px, 6vw, 72px);
          letter-spacing: 0.15em;
          line-height: 1;
          color: var(--text-primary);
          text-shadow: 0 0 10px rgba(170,223,46,0.3);
          white-space: nowrap;
          font-weight: 900;
          text-align: center;
        }
        .cyber-title span {
          color: var(--lime);
          text-shadow: 0 0 25px rgba(170,223,46,0.8);
        }

        .cyber-roadmap-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          position: relative;
          z-index: 10;
        }
        @media (min-width: 768px) {
          .cyber-roadmap-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 40px;
          }
        }

        .cyber-connector-desktop {
          display: none;
        }
        @media (min-width: 768px) {
          .cyber-connector-desktop {
            display: block;
            width: 100%;
            height: 70px;
            position: relative;
            margin-bottom: 24px;
          }
        }

        .cyber-card {
          position: relative;
          background: rgba(12, 12, 12, 0.7);
          border: 1px solid var(--bg-border);
          padding: 32px 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-height: 230px;
        }
        .cyber-card:hover {
          border-color: var(--lime);
          box-shadow: 0 0 30px rgba(170,223,46,0.15);
          background: rgba(20, 20, 20, 0.85);
          transform: translateY(-2px);
        }
        .cyber-card-title {
          font-family: var(--font-bebas), 'Bebas Neue', Impact, sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          margin-top: 16px;
          margin-bottom: 12px;
          transition: color 0.3s ease;
        }
        .cyber-card:hover .cyber-card-title {
          color: var(--lime);
          text-shadow: 0 0 10px rgba(170,223,46,0.3);
        }
        .cyber-card-desc {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 280px;
          transition: color 0.3s ease;
        }
        .cyber-card:hover .cyber-card-desc {
          color: var(--text-primary);
        }

        .cyber-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: var(--lime);
          border-style: solid;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cyber-card:hover .cyber-corner {
          opacity: 1;
        }
        .cyber-corner-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .cyber-corner-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
        .cyber-corner-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
        .cyber-corner-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
      ` }} />

      <div className="wgc-container">
        {/* Desktop SVG connectors */}
        <div className="cyber-connector-desktop">
          <svg style={{ width: '100%', height: '100%', display: 'block' }} viewBox="0 0 600 60" preserveAspectRatio="none">
            <line x1="300" y1="0" x2="300" y2="15" stroke="var(--lime)" strokeWidth="2.5" />
            <circle cx="300" cy="5" r="4.5" fill="var(--lime)" stroke="var(--bg-void)" strokeWidth="2" />
            <path d="M 300 15 L 285 25 L 115 25 L 100 35 L 100 60" stroke="var(--lime)" strokeWidth="2.5" fill="none" />
            <path d="M 300 15 L 300 60" stroke="var(--lime)" strokeWidth="2.5" fill="none" />
            <path d="M 300 15 L 315 25 L 485 25 L 500 35 L 500 60" stroke="var(--lime)" strokeWidth="2.5" fill="none" />
          </svg>
        </div>

        {/* Nodes and cards grid */}
        <div className="cyber-roadmap-grid">
          
          {/* Node 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Octagon Icon */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="rgba(170,223,46,0.04)" stroke="var(--lime)" strokeWidth="2.5" />
                <polygon points="32,9 68,9 91,32 91,68 68,91 32,91 9,68 9,32" fill="none" stroke="rgba(170,223,46,0.25)" strokeWidth="1" />
              </svg>
              {/* Double arrows indicators on sides */}
              <div className="font-mono text-lime" style={{ position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', letterSpacing: '-0.1em', fontWeight: 'bold' }}>»</div>
              <div className="font-mono text-lime" style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', letterSpacing: '-0.1em', fontWeight: 'bold' }}>«</div>
              {/* Swords Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
                <line x1="13" y1="19" x2="19" y2="13" />
                <line x1="16" y1="16" x2="20" y2="20" />
                <line x1="19" y1="21" x2="21" y2="19" />
                <polyline points="10 14 5 20" />
                <line x1="15" y1="9" x2="20" y2="4" />
              </svg>
            </div>

            {/* Card */}
            <div className="cyber-card" style={{ width: '100%' }}>
              <div className="cyber-corner cyber-corner-tl" />
              <div className="cyber-corner cyber-corner-tr" />
              <div className="cyber-corner cyber-corner-bl" />
              <div className="cyber-corner cyber-corner-br" />
              
              <h3 className="cyber-card-title">MAJOR GAMING EVENT I</h3>
              <p className="cyber-card-desc">SCALING THE ECOSYSTEM ACROSS COMPETITIVE GAMING AND CREATOR-LED SHOWCASES.</p>
            </div>
          </div>

          {/* Node 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Octagon Icon */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="rgba(170,223,46,0.04)" stroke="var(--lime)" strokeWidth="2.5" />
                <polygon points="32,9 68,9 91,32 91,68 68,91 32,91 9,68 9,32" fill="none" stroke="rgba(170,223,46,0.25)" strokeWidth="1" />
              </svg>
              {/* Double arrows indicators on sides */}
              <div className="font-mono text-lime" style={{ position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', letterSpacing: '-0.1em', fontWeight: 'bold' }}>»</div>
              <div className="font-mono text-lime" style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', letterSpacing: '-0.1em', fontWeight: 'bold' }}>«</div>
              {/* Target / Crosshair Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="22" y1="12" x2="18" y2="12" />
                <line x1="6" y1="12" x2="2" y2="12" />
                <line x1="12" y1="6" x2="12" y2="2" />
                <line x1="12" y1="22" x2="12" y2="18" />
              </svg>
            </div>

            {/* Card */}
            <div className="cyber-card" style={{ width: '100%' }}>
              <div className="cyber-corner cyber-corner-tl" />
              <div className="cyber-corner cyber-corner-tr" />
              <div className="cyber-corner cyber-corner-bl" />
              <div className="cyber-corner cyber-corner-br" />
              
              <h3 className="cyber-card-title">MAJOR GAMING EVENT II</h3>
              <p className="cyber-card-desc">DEEP-DIVE TECHNICAL INTEGRATIONS, WEB3 INNOVATION, AND BUILDER WORKSHOPS.</p>
            </div>
          </div>

          {/* Node 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Octagon Icon */}
            <div style={{
              position: 'relative',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 100 100">
                <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="rgba(170,223,46,0.04)" stroke="var(--lime)" strokeWidth="2.5" />
                <polygon points="32,9 68,9 91,32 91,68 68,91 32,91 9,68 9,32" fill="none" stroke="rgba(170,223,46,0.25)" strokeWidth="1" />
              </svg>
              {/* Double arrows indicators on sides */}
              <div className="font-mono text-lime" style={{ position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', letterSpacing: '-0.1em', fontWeight: 'bold' }}>»</div>
              <div className="font-mono text-lime" style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', letterSpacing: '-0.1em', fontWeight: 'bold' }}>«</div>
              {/* Trophy Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                <path d="M12 2a8.04 8.04 0 0 0-8 8v1.34c0 .9.38 1.78 1.03 2.4l1.53 1.48c.83.8 2.04.83 2.9.07l.21-.18A3.01 3.01 0 0 1 12 14c1.15 0 2.22.47 3 1.25l.21.19c.86.75 2.07.72 2.9-.08l1.53-1.48c.65-.62 1.03-1.5 1.03-2.4V10a8.04 8.04 0 0 0-8-8z" />
              </svg>
            </div>

            {/* Card */}
            <div className="cyber-card" style={{ width: '100%' }}>
              <div className="cyber-corner cyber-corner-tl" />
              <div className="cyber-corner cyber-corner-tr" />
              <div className="cyber-corner cyber-corner-bl" />
              <div className="cyber-corner cyber-corner-br" />
              
              <h3 className="cyber-card-title">MAJOR GAMING EVENT III</h3>
              <p className="cyber-card-desc">THE GRAND FINALE ECOSYSTEM SUMMIT UNITES DEVELOPERS AND TOP-TIER CORPORATE PARTNERS.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Cyber Grid Floor & AFK ROADMAP Title */}
      <div className="cyber-grid-container">
        <div className="cyber-perspective-floor">
          <div className="cyber-grid-lines" />
        </div>
        <h2 className="cyber-title">
          AFK <span>ROADMAP</span>
        </h2>
      </div>

    </section>
  )
}

// ── Newsletter Modal Component ───────────────────────────────────────────────
export interface NewsletterModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus('success')
      setEmail('')
      setTimeout(() => {
        onClose()
        setStatus('idle')
      }, 2500)
    } catch (err: any) {
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && onClose()}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(5, 5, 5, 0.85)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              background: 'var(--bg-void)',
              border: '1px solid var(--bg-border)',
              padding: '40px 32px',
              boxShadow: '0 0 40px rgba(170,223,46,0.08)',
              zIndex: 1,
            }}
          >
            {/* Top Accent Line */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--lime)' }} />

            {/* Close Button */}
            <button
              disabled={loading}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                fontSize: '22px',
                cursor: 'pointer',
                padding: '4px 8px',
                lineHeight: 1,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.color = 'var(--lime)' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              ×
            </button>

            {/* Header Icon */}
            <div style={{
              width: '48px',
              height: '48px',
              border: '1px solid rgba(170, 223, 46, 0.25)',
              background: 'rgba(170, 223, 46, 0.03)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              color: 'var(--lime)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            {/* Text Content */}
            <span className="font-mono text-lime" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              ◆ INCOMING DROPS ◆
            </span>
            <h3 className="font-bebas text-text-primary" style={{ fontSize: '32px', letterSpacing: '0.06em', marginBottom: '12px', fontWeight: 900 }}>
              SUBSCRIBE FOR UPDATES
            </h3>
            <p className="font-body text-text-secondary" style={{ fontSize: '13.5px', lineHeight: 1.6, marginBottom: '28px' }}>
              Enter your email address to receive priority intel on city qualifiers, regional bracket updates, and developer registrations.
            </p>

            {/* Success / Error Statuses */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  border: '1px solid var(--lime)',
                  background: 'rgba(170, 223, 46, 0.04)',
                  padding: '16px',
                  textAlign: 'center',
                }}
              >
                <p className="font-mono text-lime" style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em' }}>
                  ✓ YOU ARE NOW ENLISTED.
                </p>
                <p className="font-body text-text-secondary" style={{ fontSize: '11px', marginTop: '4px' }}>
                  Brackets & operations updates heading your way soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <input
                    type="email"
                    required
                    disabled={loading}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@ecosystem.com"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--bg-border)',
                      color: 'var(--text-primary)',
                      padding: '12px 16px',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '13px',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      width: '100%',
                    }}
                    onFocus={e => {
                      e.currentTarget.style.borderColor = 'var(--lime)'
                      e.currentTarget.style.boxShadow = '0 0 10px rgba(170, 223, 46, 0.1)'
                    }}
                    onBlur={e => {
                      e.currentTarget.style.borderColor = 'var(--bg-border)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-red-500" style={{ fontSize: '11px', letterSpacing: '0.02em', color: '#ff4d4d' }}>
                    ⚠ {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{
                    padding: '14px 20px',
                    fontSize: '12px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                  }}
                >
                  {loading ? 'TRANSMITTING...' : 'SUBSCRIBE TO UPDATES ↗'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// ── More Events Coming Soon Placeholder ───────────────────────────────────────
export function MoreEventsPlaceholder() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <section style={{ 
        paddingTop: '100px', 
        paddingBottom: '100px', 
        textAlign: 'center', 
        position: 'relative',
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--bg-border)'
      }}>
        {/* Animated grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,var(--lime) 39px,var(--lime) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,var(--lime) 39px,var(--lime) 40px)',
          backgroundSize: '40px 40px',
        }} />
        
        <div className="wgc-container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="font-mono text-lime" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            ◆ STATUS: IN QUEUE ◆
          </span>
          <h2 className="font-bebas text-text-primary" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '0.06em', marginBottom: '20px', fontWeight: 900 }}>
            MORE SCHEDULE DETAILS COMING SOON
          </h2>
          <p className="font-body text-text-secondary" style={{ fontSize: '15px', maxWidth: '520px', margin: '0 auto 36px auto', lineHeight: 1.75 }}>
            Future city qualifiers, regional sprints, and council operations across Asia are currently being scheduled. Register to get priority notifications.
          </p>
          <button 
            onClick={() => setIsOpen(true)}
            className="btn-primary" 
            style={{ padding: '14px 36px', fontSize: '13px', cursor: 'pointer', border: 'none' }}
          >
            REGISTER FOR UPDATES ↗
          </button>
        </div>
      </section>

      <NewsletterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
interface EventsSectionProps {
  events?: WGCEvent[]
  revealed?: boolean
}

export function EventsSection({ events = [], revealed = true }: EventsSectionProps) {
  return (
    <>
      <section
        className="wgc-section bg-bg-surface"
        id="events"
        style={{ borderTop: '1px solid var(--bg-border)', paddingBottom: '0px' }}
      >
        <div className="wgc-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '0px' }}
          >
            <div>
              <span className="label-section accent" style={{ display: 'block', marginBottom: '12px' }}>2026 SCHEDULE</span>
              <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>
                Events Roadmap
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      <AFKRoadmap />

      <MoreEventsPlaceholder />
    </>
  )
}
