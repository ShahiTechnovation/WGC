'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
})

export function FinaleCTASection({ stats: _stats }: { stats?: unknown[] } = {}) {
  return (
    <section
      id="finale-cta"
      style={{
        width: '100%',
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--bg-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Full-width layout: 60% content / 40% stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        minHeight: '460px',
      }}>

        {/* ── LEFT: Main CTA ─────────────────────────────── */}
        <div style={{
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 64px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          borderRight: '1px solid var(--bg-border)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Lime glow behind content */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', pointerEvents: 'none',
            background: 'radial-gradient(ellipse 70% 80% at 20% 100%, rgba(170,223,46,0.07) 0%, transparent 70%)',
          }} />

          <motion.div {...fadeUp(0)} style={{ position: 'relative' }}>
            <span className="label-section accent" style={{ marginBottom: '24px' }}>JOIN THE MOVEMENT</span>

            <h2
              className="font-playfair font-bold text-text-primary"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', lineHeight: 1.1, marginBottom: '20px' }}
            >
              The game hasn&apos;t started.<br />
              <em className="text-lime" style={{ fontStyle: 'italic' }}>We&apos;re deciding who plays.</em>
            </h2>

            <p
              className="font-body text-text-secondary"
              style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.8, maxWidth: '440px', marginBottom: '36px' }}
            >
              Applications open Q2 2026. Be in the first cohort of builders, organizers, and partners shaping Asia&apos;s gaming future.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Link href="/apply" className="btn-primary" style={{ fontSize: '13px', padding: '14px 28px' }}>
                APPLY TO JOIN WGC <span>↗</span>
              </Link>
              <Link href="/partners" className="btn-secondary" style={{ fontSize: '13px', padding: '14px 28px' }}>
                PARTNER WITH US <span>→</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Stats Panel ─────────────────────────── */}
        <div style={{
          background: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(40px, 5vw, 64px) clamp(24px, 4vw, 48px)',
          gap: '0',
        }}>
          <motion.div {...fadeUp(0.1)}>
            <p className="font-mono text-text-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: '32px' }}>
              2026 OPPORTUNITY
            </p>

            {[
              { val: 'Q2 2026', label: 'Applications Open', accent: true },
              { val: '10,000+', label: 'Builders in the ecosystem' },
              { val: '30+', label: 'Events across Asia' },
              { val: '₹1CR+', label: 'Prize Pool' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '20px 0',
                  borderTop: '1px solid var(--bg-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(18px, 2vw, 26px)',
                    fontWeight: 700,
                    color: s.accent ? 'var(--lime)' : 'var(--text-primary)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.val}
                </span>
                <span
                  className="font-body text-text-secondary"
                  style={{ fontSize: '12px', textAlign: 'right', lineHeight: 1.4 }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
