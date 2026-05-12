'use client'

import { motion } from 'framer-motion'
import { PARTNERS, PARTNER_BENEFITS, type Partner } from '@/lib/constants'
import { detectSocial } from '@/lib/social'
import Link from 'next/link'

// ── Helpers (same as partner-section) ────────────────────────────────────────
function SocialIcon({ url }: { url: string }) {
  if (!url) return null
  const social = detectSocial(url)
  if (!social.href) return null
  return (
    <a href={social.href} target="_blank" rel="noopener noreferrer" title={social.name}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '4px 10px', border: '1px solid var(--bg-border)',
        background: 'var(--bg-elevated)', textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = social.color; e.currentTarget.style.background = `${social.color}18` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.background = 'var(--bg-elevated)' }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill={social.color}><path d={social.icon} /></svg>
      <span className="font-mono" style={{ fontSize: '9px', color: social.color, letterSpacing: '0.08em' }}>{social.name}</span>
    </a>
  )
}

function PartnerLogo({ partner, size = 'md' }: { partner: Partner; size?: 'sm' | 'md' | 'lg' }) {
  const h = size === 'lg' ? 44 : size === 'md' ? 32 : 22
  const nameFontSize = size === 'lg' ? '15px' : size === 'md' ? '13px' : '11px'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {partner.logoUrl ? (
        <div style={{ height: `${h}px`, display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={partner.logoUrl} alt={partner.name} style={{
            maxHeight: `${h}px`, maxWidth: size === 'lg' ? '130px' : '95px',
            objectFit: 'contain', objectPosition: 'left center',
          }} />
        </div>
      ) : null}
      <p className="font-body text-text-primary" style={{ fontWeight: 600, fontSize: nameFontSize, lineHeight: 1.2 }}>
        {partner.name}
      </p>
    </div>
  )
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

const TIER_LABELS: Record<string, { label: string; accent: string }> = {
  title:     { label: 'TITLE SPONSORS',    accent: '#C4963A' },
  org:       { label: 'ORG PARTNERS',      accent: 'var(--lime)' },
  media:     { label: 'MEDIA PARTNERS',    accent: 'var(--lime)' },
  community: { label: 'COMMUNITY PARTNERS', accent: 'var(--lime)' },
}

export default function PartnersClient({ partners = PARTNERS as Partner[] }: { partners?: Partner[] }) {
  const tiers = ['title', 'org', 'media', 'community'] as const

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* ── PAGE HEADER ────────────────────────────────────────── */}
      <section style={{
        paddingTop: 'var(--section-py)', paddingBottom: '56px',
        borderBottom: '1px solid var(--bg-border)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 60% at 0% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>PARTNERS</span>
            <h1 className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}>
              The ecosystem{' '}
              <em className="text-lime not-italic">that moves with us.</em>
            </h1>
            <p className="font-body text-text-secondary"
              style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', maxWidth: '560px', lineHeight: 1.75 }}>
              From title sponsors to community builders — the companies and organizations powering WGC across Asia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PARTNER TIERS ──────────────────────────────────────── */}
      {tiers.map((tier, ti) => {
        // Use the Airtable-fetched `partners` prop, not the hardcoded PARTNERS constant
        const tierPartners = partners.filter(p => p.tier === tier)
        if (tierPartners.length === 0) return null  // hide empty tiers cleanly

        const { label, accent } = TIER_LABELS[tier]
        const isTitleTier = tier === 'title'

        return (
          <section
            key={tier}
            style={{
              paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)',
              borderBottom: '1px solid var(--bg-border)',
              background: ti % 2 === 0 ? 'var(--bg-void)' : 'var(--bg-surface)',
            }}
          >
            <div className="wgc-container">
              <motion.div
                {...fadeUp(0)}
                style={{ marginBottom: '40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}
              >
                <div>
                  <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', color: accent, display: 'block', marginBottom: '8px' }}>
                    {label}
                  </span>
                  <span className="font-mono text-text-secondary" style={{ fontSize: '11px' }}>
                    {tierPartners.length} partner{tierPartners.length > 1 ? 's' : ''}
                  </span>
                </div>
              </motion.div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isTitleTier
                  ? 'repeat(auto-fit, minmax(240px, 1fr))'
                  : 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1px',
                background: 'var(--bg-border)', border: '1px solid var(--bg-border)',
              }}>
                {tierPartners.map((partner, i) => (
                  <div key={partner.id} style={{
                    background: ti % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-void)',
                    padding: isTitleTier ? '32px' : '20px 18px',
                    transition: 'background 0.2s ease', position: 'relative',
                    display: 'flex', flexDirection: 'column', gap: '12px',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                    onMouseLeave={e => (e.currentTarget.style.background = ti % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-void)')}
                  >
                    {isTitleTier && (
                      <span style={{
                        display: 'inline-block', padding: '3px 8px', background: '#C4963A',
                        color: '#050505', fontFamily: 'var(--font-mono), monospace',
                        fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                        textTransform: 'uppercase', alignSelf: 'flex-start',
                      }}>TITLE</span>
                    )}
                    <PartnerLogo partner={partner} size={isTitleTier ? 'lg' : 'md'} />
                    {!partner.logoUrl && (
                      <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.06em' }}>{partner.name}</p>
                    )}
                    <SocialIcon url={partner.handle} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── BENEFITS ───────────────────────────────────────────── */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', borderBottom: '1px solid var(--bg-border)' }}>
        <div className="wgc-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'clamp(40px, 6vw, 80px)', alignItems: 'center' }}>
            <motion.div {...fadeUp(0)}>
              <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>WHY PARTNER</span>
              <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginBottom: '20px' }}>
                Partner with{' '}
                <em className="text-lime not-italic">WGC</em>
              </h2>
              <p className="font-body text-text-secondary" style={{ fontSize: '16px', lineHeight: 1.75 }}>
                Join the backbone of Asia&apos;s gaming ecosystem. We connect brands with builders, players, and audiences across 20+ cities.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid var(--bg-border)' }}>
              {PARTNER_BENEFITS.map((benefit, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '24px',
                    borderBottom: i < PARTNER_BENEFITS.length - 1 ? '1px solid var(--bg-border)' : 'none',
                    background: 'var(--bg-surface)', transition: 'background 0.2s ease',
                  }}
                  whileHover={{ background: 'var(--bg-elevated)' } as any}
                >
                  <span className="font-mono" style={{ fontSize: '14px', color: 'var(--lime)', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✦</span>
                  <p className="font-body text-text-primary" style={{ fontSize: '14px', lineHeight: 1.65 }}>{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BECOME A PARTNER CTA ───────────────────────────────── */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(170,223,46,0.06) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ maxWidth: '640px', position: 'relative' }}>
          <motion.div {...fadeUp(0)}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>JOIN THE ECOSYSTEM</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginBottom: '20px' }}>
              Become a Partner
            </h2>
            <p className="font-body text-text-secondary" style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '40px' }}>
              Ready to connect your brand with Asia&apos;s gaming future? Let&apos;s talk.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/apply?type=partner" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>
                PARTNER WITH US <span>↗</span>
              </Link>
              <a href="mailto:council@wgc.global" className="btn-secondary" style={{ fontSize: '14px', padding: '14px 32px' }}>
                CONTACT US <span>→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
