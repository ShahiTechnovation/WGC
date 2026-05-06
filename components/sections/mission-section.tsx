'use client'

import { motion } from 'framer-motion'
import { PRINCIPLES } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, delay },
})

export function MissionSection() {
  return (
    <section
      id="mission"
      style={{
        width: '100%',
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--bg-border)',
        borderBottom: '1px solid var(--bg-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(170,223,46,0.04) 0%, transparent 60%)',
      }} />

      <div className="wgc-container" style={{ position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Mission Text ─────────────────────────── */}
          <motion.div {...fadeUp(0)}>
            <span className="label-section accent">THE MANDATE</span>

            <h2
              className="font-playfair font-bold text-text-primary"
              style={{
                fontSize: 'var(--type-h2)',
                lineHeight: 1.1,
                marginBottom: '32px',
                marginTop: '4px',
              }}
            >
              Every great game<br />
              needs a governing<br />
              <em className="text-lime not-italic" style={{ fontStyle: 'italic' }}>body.</em>
            </h2>

            {/* Blockquote */}
            <div style={{
              paddingLeft: '20px',
              borderLeft: '3px solid var(--lime)',
              marginBottom: '40px',
            }}>
              <p
                className="font-body text-text-secondary"
                style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.85 }}
              >
                World Gaming Council exists to organize, amplify, and legitimize gaming as a serious competitive and cultural force across Asia. We don&apos;t just run events — we build the infrastructure that makes them matter.
              </p>
            </div>

            {/* Bottom stat strip */}
            <div style={{
              display: 'flex',
              gap: '0',
              borderTop: '1px solid var(--bg-border)',
              borderBottom: '1px solid var(--bg-border)',
            }}>
              {[
                { val: '20+', label: 'Cities' },
                { val: '2026', label: 'Launch Year' },
                { val: 'Asia', label: 'Scope' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    borderRight: i < 2 ? '1px solid var(--bg-border)' : 'none',
                    textAlign: 'center',
                  }}
                >
                  <p className="font-bebas text-lime" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1, marginBottom: '4px' }}>
                    {s.val}
                  </p>
                  <p className="font-mono text-text-secondary" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.16em' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Principle Cards ─────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p.number}
                {...fadeUp(0.1 + i * 0.1)}
                style={{
                  padding: '28px 0',
                  borderBottom: '1px solid var(--bg-border)',
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr',
                  gap: '16px',
                  alignItems: 'start',
                  borderTop: i === 0 ? '1px solid var(--bg-border)' : 'none',
                }}
              >
                {/* Number */}
                <span
                  className="font-mono text-lime"
                  style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', paddingTop: '2px' }}
                >
                  {p.number}
                </span>

                <div>
                  <p
                    className="font-body text-text-primary"
                    style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}
                  >
                    {p.title}
                  </p>
                  <p
                    className="font-body text-text-secondary"
                    style={{ fontSize: 'clamp(13px, 1vw, 15px)', lineHeight: 1.75 }}
                  >
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
