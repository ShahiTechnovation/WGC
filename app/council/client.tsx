'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { WGC_DIVISIONS, type CouncilMember } from '@/lib/constants'
import Link from 'next/link'
import { NewsletterModal } from '@/components/sections/events-section'

// ── Toggle true when council Airtable table has data ─────────────────────────
const REVEALED = false

type Division = typeof WGC_DIVISIONS[number]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
})

// ── Revealing Soon overlay ────────────────────────────────────────────────────
function CouncilRevealingPage({ onOpenNewsletter }: { onOpenNewsletter: () => void }) {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Header */}
      <section style={{
        paddingTop: 'var(--section-py)', paddingBottom: '56px',
        borderBottom: '1px solid var(--bg-border)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>THE COUNCIL</span>
            <h1 className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}>
              Who&apos;s running{' '}
              <em className="text-lime not-italic">the game.</em>
            </h1>
            <p className="font-body text-text-secondary"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: '480px', lineHeight: 1.75 }}>
              Asia&apos;s most influential gaming leaders. Their identities will be revealed when the council officially convenes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Revealing Soon body — Council */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', borderBottom: '1px solid var(--bg-border)' }}>
        <div className="wgc-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              position: 'relative', overflow: 'hidden',
              border: '1px solid var(--bg-border)', background: 'var(--bg-surface)',
              padding: 'clamp(48px, 8vw, 80px) 32px',
            }}
          >
            {/* Scan line */}
            <motion.div
              animate={{ y: ['-100%', '500%'] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'linear', repeatDelay: 0.5 }}
              style={{
                position: 'absolute', left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, rgba(170,223,46,0.4) 50%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Ghost avatar grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1px', background: 'var(--bg-border)',
              border: '1px solid var(--bg-border)',
              marginBottom: '40px',
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 + i * 0.4, ease: 'easeInOut', delay: i * 0.3 }}
                  style={{ background: 'var(--bg-surface)', padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}
                >
                  {/* Ghost avatar circle */}
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--bg-border)" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  {/* Redacted name bar */}
                  <div style={{ width: '70%', height: '10px', background: 'var(--bg-elevated)', borderRadius: '2px' }} />
                  <div style={{ width: '50%', height: '8px', background: 'var(--bg-elevated)', borderRadius: '2px', opacity: 0.7 }} />
                </motion.div>
              ))}
            </div>

            {/* Center status message */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {/* Pulsing label */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '5px 14px', border: '1px solid rgba(170,223,46,0.3)',
                  background: 'rgba(170,223,46,0.05)',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--lime)', display: 'inline-block' }} />
                <span className="font-mono" style={{ fontSize: '10px', color: 'var(--lime)', letterSpacing: '0.2em', fontWeight: 700 }}>
                  COUNCIL SELECTION IN PROGRESS
                </span>
              </motion.div>

              <h2 className="font-heading font-black text-text-primary" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.05 }}>
                Members Revealing Soon
              </h2>
              <p className="font-body text-text-secondary" style={{ fontSize: '16px', maxWidth: '440px', lineHeight: 1.75 }}>
                The World Gaming Council is assembling its founding members across Asia. Names and roles will be revealed when the time is right.
              </p>

              {/* Redacted member list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', maxWidth: '480px', marginTop: '8px' }}>
                {[{ w: '65%' }, { w: '52%' }, { w: '70%' }].map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', border: '1px solid var(--bg-border)', background: 'var(--bg-elevated)', opacity: 1 - i * 0.25 }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-border)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: '9px', background: 'var(--bg-border)', width: row.w, borderRadius: '2px', marginBottom: '6px' }} />
                      <div style={{ height: '7px', background: 'var(--bg-border)', width: '40%', borderRadius: '2px', opacity: 0.6 }} />
                    </div>
                    <span className="font-mono" style={{ fontSize: '9px', color: 'var(--bg-border)', letterSpacing: '0.12em', border: '1px solid var(--bg-border)', padding: '2px 8px' }}>REDACTED</span>
                  </div>
                ))}
              </div>

              <a
                href="https://twitter.com/WGCEsports"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ marginTop: '8px', padding: '12px 28px', fontSize: '12px' }}
              >
                FOLLOW WGC FOR THE ANNOUNCEMENT →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divisions — still visible even when council is unrevealed */}
      <section style={{
        paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)',
        borderBottom: '1px solid var(--bg-border)', background: 'var(--bg-surface)',
      }}>
        <div className="wgc-container">
          <motion.div {...fadeUp(0)} style={{ marginBottom: '48px' }}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>STRUCTURE</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>
              Council Divisions
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {WGC_DIVISIONS.map((div, i) => (
              <motion.div
                key={div.number}
                {...fadeUp(i * 0.08)}
                style={{ border: '1px solid var(--bg-border)', background: 'var(--bg-void)', padding: '32px', transition: 'border-color 0.2s ease' }}
                whileHover={{ borderColor: 'var(--lime-dim)' } as any}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <span className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>{div.number}</span>
                  <span style={{
                    padding: '4px 10px', fontSize: '10px', fontFamily: 'var(--font-mono), monospace',
                    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    background: div.status === 'ACTIVE' ? 'var(--lime)' : 'var(--bg-elevated)',
                    color: div.status === 'ACTIVE' ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  }}>{div.status}</span>
                </div>
                <h3 className="font-body" style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '6px' }}>{div.name}</h3>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginBottom: '16px', letterSpacing: '0.08em' }}>{div.desc}</p>
                <p className="font-body text-text-secondary" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>{div.details}</p>
                <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '16px', display: 'flex', gap: '24px' }}>
                  {[{ label: 'Cities', val: div.stats.cities }, { label: 'Members', val: div.stats.members }, { label: 'Events', val: div.stats.events }].map(s => (
                    <div key={s.label}>
                      <p className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '4px' }}>{s.val}</p>
                      <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(170,223,46,0.07) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ maxWidth: '640px', position: 'relative' }}>
          <motion.div {...fadeUp(0)}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>GET INVOLVED</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginBottom: '20px' }}>
              Shape Asia&apos;s Gaming Future
            </h2>
            <p className="font-body text-text-secondary" style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '40px' }}>
              Whether you&apos;re a builder, organizer, or partner — the Council is looking for the best across Asia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link href="/apply" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>
                APPLY TO JOIN <span>↗</span>
              </Link>
              <button
                onClick={onOpenNewsletter}
                className="btn-secondary"
                style={{ fontSize: '14px', padding: '14px 32px', cursor: 'pointer', border: '1px solid var(--bg-border)', background: 'transparent', color: 'var(--text-secondary)' }}
              >
                REGISTER FOR UPDATES <span>→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ── Full council (revealed) ───────────────────────────────────────────────────
function CouncilRevealedPage({ members, divisions, onOpenNewsletter }: { members: CouncilMember[], divisions: Division[], onOpenNewsletter: () => void }) {
  return (
    <div style={{ paddingTop: '64px' }}>
      <section style={{
        paddingTop: 'var(--section-py)', paddingBottom: '56px',
        borderBottom: '1px solid var(--bg-border)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 60% at 100% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>THE COUNCIL</span>
            <h1 className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}>
              Who&apos;s running{' '}
              <em className="text-lime not-italic">the game.</em>
            </h1>
            <p className="font-body text-text-secondary"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: '480px', lineHeight: 1.75 }}>
              Meet the leaders shaping Asia&apos;s gaming future. From founding members to regional directors.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', borderBottom: '1px solid var(--bg-border)' }}>
        <div className="wgc-container">
          <motion.div {...fadeUp(0)} style={{ marginBottom: '48px' }}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>LEADERSHIP</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>Council Members</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: 'var(--bg-border)', border: '1px solid var(--bg-border)' }}>
            {members.map((member, i) => (
              <motion.div key={member.id} {...fadeUp(i * 0.07)}
                style={{ background: 'var(--bg-surface)', padding: '32px', position: 'relative', transition: 'background 0.2s ease' }}
                whileHover={{ background: 'var(--bg-elevated)' } as any}
              >
                {member.founding && (
                  <span style={{
                    display: 'inline-block', padding: '3px 10px', background: 'var(--lime)',
                    color: 'var(--text-inverse)', fontFamily: 'var(--font-mono), monospace',
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '20px',
                  }}>★ FOUNDING MEMBER</span>
                )}
                {!member.founding && <div style={{ marginBottom: '20px', height: '22px' }} />}
                <div style={{
                  width: '52px', height: '52px', background: 'var(--bg-elevated)',
                  border: '1px solid var(--bg-border)', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="font-heading font-bold" style={{ fontSize: '20px', color: 'var(--lime)' }}>{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-body" style={{ fontWeight: 700, fontSize: '17px', color: 'var(--text-primary)', marginBottom: '6px' }}>{member.name}</h3>
                <p className="font-body text-text-secondary" style={{ fontSize: '14px', marginBottom: '8px' }}>{member.role}</p>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>{member.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)',
        borderBottom: '1px solid var(--bg-border)', background: 'var(--bg-surface)',
      }}>
        <div className="wgc-container">
          <motion.div {...fadeUp(0)} style={{ marginBottom: '48px' }}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>STRUCTURE</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>Council Divisions</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {WGC_DIVISIONS.map((div, i) => (
              <motion.div key={div.number} {...fadeUp(i * 0.08)}
                style={{ border: '1px solid var(--bg-border)', background: 'var(--bg-void)', padding: '32px', transition: 'border-color 0.2s ease' }}
                whileHover={{ borderColor: 'var(--lime-dim)' } as any}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <span className="font-mono" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>{div.number}</span>
                  <span style={{
                    padding: '4px 10px', fontSize: '10px', fontFamily: 'var(--font-mono), monospace',
                    fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                    background: div.status === 'ACTIVE' ? 'var(--lime)' : 'var(--bg-elevated)',
                    color: div.status === 'ACTIVE' ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  }}>{div.status}</span>
                </div>
                <h3 className="font-body" style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '6px' }}>{div.name}</h3>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginBottom: '16px', letterSpacing: '0.08em' }}>{div.desc}</p>
                <p className="font-body text-text-secondary" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>{div.details}</p>
                <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '16px', display: 'flex', gap: '24px' }}>
                  {[{ label: 'Cities', val: div.stats.cities }, { label: 'Members', val: div.stats.members }, { label: 'Events', val: div.stats.events }].map(s => (
                    <div key={s.label}>
                      <p className="font-mono" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '4px' }}>{s.val}</p>
                      <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(170,223,46,0.07) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ maxWidth: '640px', position: 'relative' }}>
          <motion.div {...fadeUp(0)}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>GET INVOLVED</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginBottom: '20px' }}>Shape Asia&apos;s Gaming Future</h2>
            <p className="font-body text-text-secondary" style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '40px' }}>
              Whether you&apos;re a builder, organizer, or partner — the Council is looking for the best across Asia.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link href="/apply" className="btn-primary" style={{ fontSize: '14px', padding: '14px 32px' }}>APPLY TO JOIN <span>↗</span></Link>
              <button
                onClick={onOpenNewsletter}
                className="btn-secondary"
                style={{ fontSize: '14px', padding: '14px 32px', cursor: 'pointer', border: '1px solid var(--bg-border)', background: 'transparent', color: 'var(--text-secondary)' }}
              >
                REGISTER FOR UPDATES <span>→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function CouncilClient({
  members = [],
  divisions = [],
}: {
  members?: CouncilMember[]
  divisions?: Division[]
}) {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false)

  return (
    <>
      {REVEALED ? (
        <CouncilRevealedPage
          members={members}
          divisions={divisions}
          onOpenNewsletter={() => setIsNewsletterOpen(true)}
        />
      ) : (
        <CouncilRevealingPage onOpenNewsletter={() => setIsNewsletterOpen(true)} />
      )}
      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </>
  )
}
