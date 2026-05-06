'use client'

import { motion } from 'framer-motion'
import { COUNCIL_MEMBERS, WGC_DIVISIONS, type CouncilMember } from '@/lib/constants'
import Link from 'next/link'

type Division = typeof WGC_DIVISIONS[number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

export default function CouncilPage({
  members = COUNCIL_MEMBERS as CouncilMember[],
  divisions = WGC_DIVISIONS as Division[],
}: {
  members?: CouncilMember[]
  divisions?: Division[]
}) {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: '56px',
          borderBottom: '1px solid var(--bg-border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>THE COUNCIL</span>
            <h1
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}
            >
              Who&apos;s running{' '}
              <em className="text-lime not-italic">the game.</em>
            </h1>
            <p className="font-body text-text-secondary" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: '480px', lineHeight: 1.75, textWrap: 'balance' } as React.CSSProperties}>
              Meet the leaders shaping Asia&apos;s gaming future. From founding members to regional directors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── COUNCIL MEMBERS ─────────────────────────────────────── */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', borderBottom: '1px solid var(--bg-border)' }}>
        <div className="wgc-container">
          <motion.div {...fadeUp(0)} style={{ marginBottom: '48px' }}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>LEADERSHIP</span>
            <h2
              className="font-heading font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}
            >
              Council Members
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1px',
              background: 'var(--bg-border)',
              border: '1px solid var(--bg-border)',
            }}
          >
            {COUNCIL_MEMBERS.map((member, i) => (
              <motion.div
                key={member.id}
                {...fadeUp(i * 0.07)}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '32px',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
                whileHover={{ background: 'var(--bg-elevated)' } as any}
              >
                {member.founding && (
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      background: 'var(--lime)',
                      color: 'var(--text-inverse)',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      marginBottom: '20px',
                    }}
                  >
                    ★ FOUNDING MEMBER
                  </span>
                )}

                {!member.founding && <div style={{ marginBottom: '20px', height: '22px' }} />}

                {/* Avatar placeholder */}
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--bg-border)',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    className="font-heading font-bold"
                    style={{ fontSize: '20px', color: 'var(--lime)' }}
                  >
                    {member.name.charAt(0)}
                  </span>
                </div>

                <h3
                  className="font-body"
                  style={{ fontWeight: 700, fontSize: '17px', color: 'var(--text-primary)', marginBottom: '6px' }}
                >
                  {member.name}
                </h3>
                <p className="font-body text-text-secondary" style={{ fontSize: '14px', marginBottom: '8px' }}>
                  {member.role}
                </p>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>
                  {member.org}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVISIONS ───────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          borderBottom: '1px solid var(--bg-border)',
          background: 'var(--bg-surface)',
        }}
      >
        <div className="wgc-container">
          <motion.div {...fadeUp(0)} style={{ marginBottom: '48px' }}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>STRUCTURE</span>
            <h2
              className="font-heading font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}
            >
              Council Divisions
            </h2>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {WGC_DIVISIONS.map((div, i) => (
              <motion.div
                key={div.number}
                {...fadeUp(i * 0.08)}
                style={{
                  border: '1px solid var(--bg-border)',
                  background: 'var(--bg-void)',
                  padding: '32px',
                  transition: 'border-color 0.2s ease',
                }}
                whileHover={{ borderColor: 'var(--lime-dim)' } as any}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <span className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>
                    {div.number}
                  </span>
                  <span
                    style={{
                      padding: '4px 10px',
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono), monospace',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: div.status === 'ACTIVE' ? 'var(--lime)' : 'var(--bg-elevated)',
                      color: div.status === 'ACTIVE' ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    }}
                  >
                    {div.status}
                  </span>
                </div>
                <h3
                  className="font-body"
                  style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '6px' }}
                >
                  {div.name}
                </h3>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginBottom: '16px', letterSpacing: '0.08em' }}>
                  {div.desc}
                </p>
                <p className="font-body text-text-secondary" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
                  {div.details}
                </p>

                {/* Stats row */}
                <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '16px', display: 'flex', gap: '24px' }}>
                  {[
                    { label: 'Cities', val: div.stats.cities },
                    { label: 'Members', val: div.stats.members },
                    { label: 'Events', val: div.stats.events },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '4px' }}>
                        {s.val}
                      </p>
                      <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(170,223,46,0.07) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ maxWidth: '640px', position: 'relative' }}>
          <motion.div {...fadeUp(0)}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>GET INVOLVED</span>
            <h2
              className="font-heading font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginBottom: '20px' }}
            >
              Shape Asia&apos;s Gaming Future
            </h2>
            <p className="font-body text-text-secondary" style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '40px' }}>
              Whether you&apos;re a builder, organizer, or partner — the Council is looking for the best across Asia.
            </p>
            <Link href="/apply" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>
              APPLY TO JOIN <span>↗</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
