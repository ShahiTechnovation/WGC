'use client'

import { motion } from 'framer-motion'
import { PARTNERS, PARTNER_BENEFITS, type Partner } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export function PartnerSection({
  hideHeader = false,
  partners = PARTNERS as Partner[],
}: {
  hideHeader?: boolean
  partners?: Partner[]
}) {
  const titlePartners     = partners.filter(p => p.tier === 'title')
  const orgPartners       = partners.filter(p => p.tier === 'org')
  const mediaPartners     = partners.filter(p => p.tier === 'media')
  const communityPartners = partners.filter(p => p.tier === 'community')

  return (
    <section className="wgc-section bg-bg-void" id="partners" style={{ borderTop: '1px solid var(--bg-border)' }}>
      <div className="wgc-container">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        {!hideHeader && (
          <motion.div {...fadeUp(0)} className="mb-12">
            <span className="label-section accent" style={{ display: 'block', marginBottom: '16px' }}>TRUSTED BY THE ECOSYSTEM</span>
            <h2
              className="font-heading font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}
            >
              Companies and protocols{' '}
              <em className="text-lime not-italic">that move with WGC.</em>
            </h2>
          </motion.div>
        )}

        {/* ── TITLE SPONSORS ────────────────────────────────────── */}
        <motion.div {...fadeUp(0.05)} className="mb-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span
              className="font-mono"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: '#C4963A', textTransform: 'uppercase' }}
            >
              TITLE SPONSORS
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(196,150,58,0.25)' }} />
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
              {titlePartners.length}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px',
              background: 'rgba(196,150,58,0.2)',
              border: '1px solid rgba(196,150,58,0.3)',
            }}
          >
            {titlePartners.map((p, i) => (
              <motion.div
                key={p.id}
                {...fadeUp(0.1 + i * 0.05)}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '20px 24px',
                  borderLeft: '2px solid #C4963A',
                  transition: 'background 0.2s ease',
                }}
                whileHover={{ background: 'var(--bg-elevated)' } as any}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '2px 7px',
                    background: '#C4963A',
                    color: '#050505',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                  }}
                >
                  TITLE
                </span>
                <p
                  className="font-body text-text-primary"
                  style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px', lineHeight: 1.2 }}
                >
                  {p.name}
                </p>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>
                  {p.handle}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── ORG PARTNERS ──────────────────────────────────────── */}
        <motion.div {...fadeUp(0.1)} className="mb-12">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span
              className="font-mono"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase' }}
            >
              ORG PARTNERS
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--bg-border)' }} />
            <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
              {orgPartners.length}
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1px',
              background: 'var(--bg-border)',
              border: '1px solid var(--bg-border)',
            }}
          >
            {orgPartners.map((p, i) => (
              <motion.div
                key={p.id}
                {...fadeUp(0.1 + i * 0.025)}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '12px 16px',
                  transition: 'background 0.15s ease',
                  cursor: 'default',
                }}
                whileHover={{ background: 'var(--bg-elevated)' } as any}
              >
                <p
                  className="font-body text-text-secondary"
                  style={{ fontSize: '13px', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {p.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── MEDIA + COMMUNITY ─────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.15)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px',
            background: 'var(--bg-border)',
            border: '1px solid var(--bg-border)',
            marginBottom: '48px',
          }}
        >
          {/* Media */}
          <div style={{ background: 'var(--bg-surface)', padding: '28px' }}>
            <span
              className="font-mono"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
            >
              MEDIA PARTNERS — {mediaPartners.length}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid var(--bg-border)' }}>
              {mediaPartners.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--bg-border)',
                  }}
                >
                  <span className="font-body text-text-primary" style={{ fontSize: '13px', fontWeight: 500 }}>
                    {p.name}
                  </span>
                  <span className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
                    {p.handle}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Community */}
          <div style={{ background: 'var(--bg-surface)', padding: '28px' }}>
            <span
              className="font-mono"
              style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
            >
              COMMUNITY PARTNERS — {communityPartners.length}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', borderTop: '1px solid var(--bg-border)' }}>
              {communityPartners.map((p, i) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--bg-border)',
                  }}
                >
                  <span className="font-body text-text-primary" style={{ fontSize: '13px', fontWeight: 500 }}>
                    {p.name}
                  </span>
                  <span className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.05em' }}>
                    {p.handle}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── CTA PANEL ─────────────────────────────────────────── */}
        <motion.div
          {...fadeUp(0.2)}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--bg-border)',
            padding: 'clamp(28px, 4vw, 48px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Left lime accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--lime), transparent)' }} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(28px, 5vw, 56px)',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="label-section accent mb-4">WHY PARTNER WITH WGC</span>
              <h3
                className="font-heading font-bold text-text-primary"
                style={{ fontSize: 'clamp(22px, 2.5vw, 34px)', lineHeight: 1.2, marginBottom: '16px', marginTop: '16px' }}
              >
                <span className="text-lime">&ldquo;87%</span> of our partners return.&rdquo;
              </h3>
              <p className="font-body text-text-secondary" style={{ fontSize: '14px', lineHeight: 1.75 }}>
                WGC partners gain unmatched access to Asia&apos;s gaming builder community. From brand exposure across 20+ cities to co-hosting rights — we make partnerships count.
              </p>
            </div>

            <div>
              <div style={{ border: '1px solid var(--bg-border)', marginBottom: '20px' }}>
                {PARTNER_BENEFITS.map((benefit, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '14px 20px',
                      borderBottom: i < PARTNER_BENEFITS.length - 1 ? '1px solid var(--bg-border)' : 'none',
                    }}
                  >
                    <span style={{ color: 'var(--lime)', fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    <span className="font-body text-text-primary" style={{ fontSize: '13px', lineHeight: 1.55 }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              <a href="/apply" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                GET IN TOUCH <span>↗</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
