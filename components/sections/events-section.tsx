'use client'

import { motion } from 'framer-motion'
import type { WGCEvent } from '@/lib/constants'
import Link from 'next/link'

export type { WGCEvent }

// ── "Revealing Soon" overlay ──────────────────────────────────────────────────
function RevealingSoonOverlay() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        border: '1px solid var(--bg-border)',
        background: 'var(--bg-surface)',
        padding: 'clamp(48px, 8vw, 80px) 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        textAlign: 'center',
      }}
    >
      {/* Animated background grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.06,
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,var(--lime) 39px,var(--lime) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,var(--lime) 39px,var(--lime) 40px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Lime sweep animation */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 1.5 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(105deg, transparent 30%, rgba(170,223,46,0.07) 50%, transparent 70%)',
        }}
      />

      {/* Scanning line */}
      <motion.div
        animate={{ y: ['-100%', '400%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 0.5 }}
        style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--lime) 50%, transparent 100%)',
          opacity: 0.4, pointerEvents: 'none',
        }}
      />

      {/* Lock icon */}
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{
          width: '56px', height: '56px',
          border: '1px solid rgba(170,223,46,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(170,223,46,0.04)',
          position: 'relative', zIndex: 1,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="1" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </motion.div>

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          className="font-mono"
          style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: '12px' }}
        >
          ◆ CLASSIFIED ◆
        </p>
        <h3
          className="font-heading font-black text-text-primary"
          style={{ fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.1, marginBottom: '12px' }}
        >
          Events Revealing Soon
        </h3>
        <p
          className="font-body text-text-secondary"
          style={{ fontSize: '14px', maxWidth: '440px', lineHeight: 1.7 }}
        >
          The 2026 event roster is being finalized. Full schedule drops when the council gives the signal.
        </p>
      </div>

      {/* Redacted placeholders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {[0.8, 0.6, 0.45].map((opacity, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', opacity }}>
            <div style={{
              height: '36px', flex: 1,
              background: 'linear-gradient(90deg, var(--bg-elevated) 0%, rgba(170,223,46,0.08) 100%)',
              border: '1px solid var(--bg-border)',
              display: 'flex', alignItems: 'center', paddingLeft: '12px',
            }}>
              <span className="font-mono" style={{ fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.12em' }}>
                {'█'.repeat(Math.floor(8 + i * 5))} &nbsp; {'█'.repeat(4)}
              </span>
            </div>
            <div style={{
              height: '36px', width: '80px',
              background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="font-mono" style={{ fontSize: '9px', color: 'var(--bg-border)', letterSpacing: '0.1em' }}>██████</span>
            </div>
          </div>
        ))}
      </div>

      <Link href="/apply" className="btn-primary" style={{ position: 'relative', zIndex: 1, padding: '10px 28px', fontSize: '12px' }}>
        GET EARLY ACCESS ↗
      </Link>
    </div>
  )
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isConfirmed = status === 'CONFIRMED'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 9px',
        fontFamily: 'var(--font-mono), monospace',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        background: isConfirmed ? 'var(--lime)' : 'transparent',
        color: isConfirmed ? 'var(--text-inverse)' : 'var(--text-secondary)',
        border: isConfirmed ? 'none' : '1px solid var(--bg-border)',
      }}
    >
      {isConfirmed && (
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block', flexShrink: 0 }} />
      )}
      {status}
    </span>
  )
}

// ── Event card ────────────────────────────────────────────────────────────────
function EventCard({ event, index }: { event: WGCEvent; index: number }) {
  if (event.flagship) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          gridColumn: '1 / -1',
          border: '1px solid #C4963A',
          background: 'var(--bg-surface)',
          padding: 'clamp(24px, 3vw, 40px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#C4963A' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <span style={{
                padding: '4px 12px', background: '#C4963A', color: '#050505',
                fontFamily: 'var(--font-mono), monospace', fontSize: '10px',
                fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              }}>
                ★ FLAGSHIP EVENT
              </span>
              <span style={{
                padding: '4px 12px', background: 'var(--bg-elevated)', color: 'var(--lime)',
                fontFamily: 'var(--font-mono), monospace', fontSize: '10px',
                fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                border: '1px solid var(--bg-border)',
              }}>
                GTA VI LAUNCH DAY
              </span>
            </div>

            <p className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.12em', marginBottom: '10px' }}>
              NOV 19 · 2026
            </p>
            <h3 className="font-heading font-black text-text-primary" style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.05, marginBottom: '8px' }}>
              {event.title}
            </h3>
            {event.description && (
              <p className="font-body text-text-secondary" style={{ fontSize: '14px' }}>
                {event.description}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0', border: '1px solid rgba(196,150,58,0.3)', flexShrink: 0 }}>
            {[
              { val: event.prizePool, label: 'Prize Pool' },
              { val: event.builders, label: 'Builders' },
              { val: event.city,     label: 'Scope' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: '16px 20px', textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(196,150,58,0.3)' : 'none', minWidth: '90px',
              }}>
                <p className="font-mono" style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1, marginBottom: '4px' }}>
                  {s.val}
                </p>
                <p className="font-mono text-text-secondary" style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(196,150,58,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--lime)', display: 'inline-block' }} />
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--lime)', fontWeight: 600, letterSpacing: '0.1em' }}>CONFIRMED</span>
          </div>
          <Link href="/apply" className="btn-primary" style={{ padding: '10px 24px', fontSize: '13px' }}>
            REGISTER NOW <span>↗</span>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      style={{
        background: 'var(--bg-void)', border: '1px solid var(--bg-border)', padding: '20px',
        transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease', cursor: 'pointer',
      }}
      whileHover={{ borderColor: 'var(--lime-dim)', background: 'var(--bg-surface)', y: -2 } as any}
    >
      <h4 className="font-body text-text-primary" style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.3, marginBottom: '6px' }}>
        {event.title}
      </h4>
      <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginBottom: '14px', letterSpacing: '0.05em' }}>
        {event.city} · {event.date}
      </p>
      <StatusBadge status={event.status} />
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
interface EventsSectionProps {
  events?: WGCEvent[]
  revealed?: boolean
}

export function EventsSection({ events = [], revealed = true }: EventsSectionProps) {
  const months = Array.from(new Set(events.map(e => e.month)))
  const totalEvents = events.length
  const totalCities = new Set(events.map(e => e.city)).size

  return (
    <section
      className="wgc-section bg-bg-surface"
      id="events"
      style={{ borderTop: '1px solid var(--bg-border)' }}
    >
      <div className="wgc-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}
        >
          <div>
            <span className="label-section accent" style={{ display: 'block', marginBottom: '12px' }}>2026 SCHEDULE</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>
              Events Roadmap
            </h2>
          </div>
          {revealed && totalEvents > 0 && (
            <p className="font-mono text-text-secondary" style={{ fontSize: '12px', letterSpacing: '0.08em', textAlign: 'right' }}>
              {totalEvents} events · {totalCities} cities across Asia
            </p>
          )}
        </motion.div>

        {/* Revealed or Unrevealed */}
        {!revealed || events.length === 0 ? (
          <RevealingSoonOverlay />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {months.map(month => {
              const monthEvents = events.filter(e => e.month === month)
              const nonFlagship = monthEvents.filter(e => !e.flagship)
              const flagship = monthEvents.find(e => e.flagship)

              return (
                <div key={month}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <span className="font-mono" style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      {month}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--bg-border)' }} />
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: nonFlagship.length === 1 ? '1fr' : nonFlagship.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                    gap: '1px', background: 'var(--bg-border)', border: '1px solid var(--bg-border)',
                  }}>
                    {nonFlagship.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} />
                    ))}
                  </div>
                  {flagship && (
                    <div style={{ marginTop: nonFlagship.length > 0 ? '16px' : '0' }}>
                      <EventCard event={flagship} index={0} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
