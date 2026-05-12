'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { PARTNERS, PARTNER_BENEFITS, type Partner } from '@/lib/constants'
import { detectSocial } from '@/lib/social'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

// ── Social icon button ────────────────────────────────────────────────────────
function SocialIcon({ url }: { url: string }) {
  if (!url) return null
  const social = detectSocial(url)
  if (!social.href) return null

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      title={`${social.name} profile`}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: '28px', height: '28px', flexShrink: 0,
        border: '1px solid var(--bg-border)',
        background: 'var(--bg-elevated)',
        transition: 'border-color 0.2s, background 0.2s',
        textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = social.color
        e.currentTarget.style.background = `${social.color}18`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--bg-border)'
        e.currentTarget.style.background = 'var(--bg-elevated)'
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill={social.color}>
        <path d={social.icon} />
      </svg>
    </a>
  )
}

// ── Partner logo or name fallback ─────────────────────────────────────────────
function PartnerLogo({ partner, size = 'md' }: { partner: Partner; size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'lg' ? 44 : size === 'md' ? 32 : 22
  const nameFontSize = size === 'lg' ? '15px' : size === 'md' ? '13px' : '11px'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {partner.logoUrl ? (
        <div style={{ height: `${h}px`, display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={partner.logoUrl}
            alt={partner.name}
            style={{
              maxHeight: `${h}px`,
              maxWidth: size === 'lg' ? '130px' : size === 'md' ? '100px' : '72px',
              objectFit: 'contain', objectPosition: 'left center',
            }}
          />
        </div>
      ) : null}
      <p className="font-body text-text-primary" style={{ fontWeight: 600, fontSize: nameFontSize, lineHeight: 1.2 }}>
        {partner.name}
      </p>
    </div>
  )
}

// ── Partner card — title tier ─────────────────────────────────────────────────
function TitleCard({ partner, delay }: { partner: Partner; delay: number }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        background: 'var(--bg-surface)',
        padding: '24px',
        borderLeft: '2px solid #C4963A',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px',
        transition: 'background 0.2s ease',
        minHeight: '110px',
      }}
      whileHover={{ background: 'var(--bg-elevated)' } as any}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <span style={{
          display: 'inline-block', padding: '2px 7px', background: '#C4963A',
          color: '#050505', fontFamily: 'var(--font-mono), monospace',
          fontSize: '8px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', flexShrink: 0,
        }}>TITLE</span>
        <SocialIcon url={partner.handle} />
      </div>
      <PartnerLogo partner={partner} size="md" />
      {!partner.logoUrl && (
        <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.06em', marginTop: '-8px' }}>
          {partner.name}
        </p>
      )}
    </motion.div>
  )
}

// ── Partner chip — org tier ───────────────────────────────────────────────────
function OrgChip({ partner, delay }: { partner: Partner; delay: number }) {
  const social = partner.handle ? detectSocial(partner.handle) : null

  const inner = (
    <motion.div
      {...fadeUp(delay)}
      style={{
        background: 'var(--bg-surface)',
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
        transition: 'background 0.15s ease',
        height: '100%',
      }}
      whileHover={{ background: 'var(--bg-elevated)' } as any}
    >
      <PartnerLogo partner={partner} size="sm" />
      {social?.href && (
        <svg width="11" height="11" viewBox="0 0 24 24" fill={social.color} style={{ flexShrink: 0, opacity: 0.7 }}>
          <path d={social.icon} />
        </svg>
      )}
    </motion.div>
  )

  if (social?.href) {
    return (
      <a href={social.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
        {inner}
      </a>
    )
  }
  return inner
}

// ── Media / community row ─────────────────────────────────────────────────────
function PartnerRow({ partner }: { partner: Partner }) {
  const social = partner.handle ? detectSocial(partner.handle) : null

  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderBottom: '1px solid var(--bg-border)', gap: '12px',
    }}>
      <PartnerLogo partner={partner} size="sm" />
      {social?.href && (
        <a
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', textDecoration: 'none', flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill={social.color} style={{ opacity: 0.6, transition: 'opacity 0.2s' }}>
            <path d={social.icon} />
          </svg>
          <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>
            {social.name}
          </span>
        </a>
      )}
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
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

        {/* Header */}
        {!hideHeader && (
          <motion.div {...fadeUp(0)} className="mb-12">
            <span className="label-section accent" style={{ display: 'block', marginBottom: '16px' }}>TRUSTED BY THE ECOSYSTEM</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>
              Companies and protocols{' '}
              <em className="text-lime not-italic">that move with WGC.</em>
            </h2>
          </motion.div>
        )}

        {/* Title sponsors */}
        {titlePartners.length > 0 && (
          <motion.div {...fadeUp(0.05)} className="mb-12">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="font-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: '#C4963A', textTransform: 'uppercase' }}>
                TITLE SPONSORS
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(196,150,58,0.25)' }} />
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{titlePartners.length}</span>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1px', background: 'rgba(196,150,58,0.2)', border: '1px solid rgba(196,150,58,0.3)',
            }}>
              {titlePartners.map((p, i) => <TitleCard key={p.id} partner={p} delay={0.1 + i * 0.05} />)}
            </div>
          </motion.div>
        )}

        {/* Org partners */}
        {orgPartners.length > 0 && (
          <motion.div {...fadeUp(0.1)} className="mb-12">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="font-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase' }}>
                ORG PARTNERS
              </span>
              <div style={{ flex: 1, height: '1px', background: 'var(--bg-border)' }} />
              <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{orgPartners.length}</span>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '1px', background: 'var(--bg-border)', border: '1px solid var(--bg-border)',
            }}>
              {orgPartners.map((p, i) => <OrgChip key={p.id} partner={p} delay={0.1 + i * 0.025} />)}
            </div>
          </motion.div>
        )}

        {/* Media + Community side by side */}
        {(mediaPartners.length > 0 || communityPartners.length > 0) && (
          <motion.div {...fadeUp(0.15)} style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1px', background: 'var(--bg-border)', border: '1px solid var(--bg-border)',
            marginBottom: '48px',
          }}>
            {mediaPartners.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', padding: '28px' }}>
                <span className="font-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                  MEDIA PARTNERS — {mediaPartners.length}
                </span>
                <div style={{ borderTop: '1px solid var(--bg-border)' }}>
                  {mediaPartners.map(p => <PartnerRow key={p.id} partner={p} />)}
                </div>
              </div>
            )}
            {communityPartners.length > 0 && (
              <div style={{ background: 'var(--bg-surface)', padding: '28px' }}>
                <span className="font-mono" style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', color: 'var(--lime)', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
                  COMMUNITY PARTNERS — {communityPartners.length}
                </span>
                <div style={{ borderTop: '1px solid var(--bg-border)' }}>
                  {communityPartners.map(p => <PartnerRow key={p.id} partner={p} />)}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* CTA panel */}
        <motion.div {...fadeUp(0.2)} style={{
          background: 'var(--bg-surface)', border: '1px solid var(--bg-border)',
          padding: 'clamp(28px, 4vw, 48px)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, var(--lime), transparent)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'clamp(28px, 5vw, 56px)', alignItems: 'center' }}>
            <div>
              <span className="label-section accent mb-4">WHY PARTNER WITH WGC</span>
              <h3 className="font-heading font-bold text-text-primary" style={{ fontSize: 'clamp(22px, 2.5vw, 34px)', lineHeight: 1.2, marginBottom: '16px', marginTop: '16px' }}>
                <span className="text-lime">&ldquo;87%</span> of our partners return.&rdquo;
              </h3>
              <p className="font-body text-text-secondary" style={{ fontSize: '14px', lineHeight: 1.75 }}>
                WGC partners gain unmatched access to Asia&apos;s gaming builder community. From brand exposure across 20+ cities to co-hosting rights — we make partnerships count.
              </p>
            </div>
            <div>
              <div style={{ border: '1px solid var(--bg-border)', marginBottom: '20px' }}>
                {PARTNER_BENEFITS.map((benefit, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 20px',
                    borderBottom: i < PARTNER_BENEFITS.length - 1 ? '1px solid var(--bg-border)' : 'none',
                  }}>
                    <span style={{ color: 'var(--lime)', fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>✓</span>
                    <span className="font-body text-text-primary" style={{ fontSize: '13px', lineHeight: 1.55 }}>{benefit}</span>
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
