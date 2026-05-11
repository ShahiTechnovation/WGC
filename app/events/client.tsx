'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { type WGCEvent } from '@/lib/constants'
import Link from 'next/link'

// ── Toggle true when your Events Airtable table has data ─────────────────────
const REVEALED = false

// ── Revealing Soon full-page overlay ─────────────────────────────────────────
function EventsRevealingPage() {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Header */}
      <section style={{
        paddingTop: 'var(--section-py)', paddingBottom: '56px',
        borderBottom: '1px solid var(--bg-border)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 50% at 100% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>ALL EVENTS</span>
            <h1 className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}>
              2026 Schedule
            </h1>
            <p className="font-body text-text-secondary"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: '480px', lineHeight: 1.75 }}>
              Every event, every city. Asia&apos;s most ambitious gaming calendar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Revealing Soon body */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
        <div className="wgc-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              position: 'relative', overflow: 'hidden',
              border: '1px solid var(--bg-border)', background: 'var(--bg-surface)',
              padding: 'clamp(56px, 10vw, 100px) 32px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', textAlign: 'center',
            }}
          >
            {/* Animated grid bg */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.05,
              backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,var(--lime) 39px,var(--lime) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,var(--lime) 39px,var(--lime) 40px)',
              backgroundSize: '40px 40px',
            }} />

            {/* Light sweep */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', repeatDelay: 1.5 }}
              style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'linear-gradient(105deg, transparent 30%, rgba(170,223,46,0.07) 50%, transparent 70%)',
              }}
            />

            {/* Scan line */}
            <motion.div
              animate={{ y: ['-100%', '400%'] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 0.5 }}
              style={{
                position: 'absolute', left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, var(--lime) 50%, transparent 100%)',
                opacity: 0.35, pointerEvents: 'none',
              }}
            />

            {/* Lock icon */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              style={{
                width: '64px', height: '64px',
                border: '1px solid rgba(170,223,46,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(170,223,46,0.04)', position: 'relative', zIndex: 1,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="1.5">
                <rect x="3" y="11" width="18" height="11" rx="1" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </motion.div>

            {/* Text */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p className="font-mono" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: '14px' }}>
                ◆ CLASSIFIED ◆
              </p>
              <h2 className="font-heading font-black text-text-primary" style={{ fontSize: 'clamp(26px, 4vw, 52px)', lineHeight: 1.05, marginBottom: '16px' }}>
                Events Revealing Soon
              </h2>
              <p className="font-body text-text-secondary" style={{ fontSize: '16px', maxWidth: '480px', lineHeight: 1.75 }}>
                The 2026 event roster is being finalized. The full schedule drops when the council gives the signal. Stay close.
              </p>
            </div>

            {/* Redacted row placeholders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '520px', position: 'relative', zIndex: 1 }}>
              {[{ w: '75%', opacity: 0.9 }, { w: '60%', opacity: 0.65 }, { w: '50%', opacity: 0.4 }].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', opacity: row.opacity }}>
                  <div style={{
                    height: '44px', flex: 1,
                    background: 'linear-gradient(90deg, var(--bg-elevated) 0%, rgba(170,223,46,0.06) 100%)',
                    border: '1px solid var(--bg-border)',
                    display: 'flex', alignItems: 'center', paddingLeft: '16px',
                  }}>
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                      {'█'.repeat(Math.floor(8 + i * 4))} &nbsp; {'█'.repeat(3 + i)}
                    </span>
                  </div>
                  <div style={{
                    height: '44px', width: '90px',
                    background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="font-mono" style={{ fontSize: '9px', color: 'var(--bg-border)' }}>██████</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats hinting at scale */}
            <div style={{ display: 'flex', border: '1px solid var(--bg-border)', position: 'relative', zIndex: 1 }}>
              {[
                { val: '30+', label: 'Events Planned' },
                { val: '12+', label: 'Nations' },
                { val: 'NOV 19', label: 'Grand Finale' },
              ].map((s, i) => (
                <div key={s.label} style={{ padding: '16px 28px', borderLeft: i > 0 ? '1px solid var(--bg-border)' : 'none', textAlign: 'center' }}>
                  <p className="font-bebas text-lime" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)', lineHeight: 1 }}>{s.val}</p>
                  <p className="font-mono text-text-secondary" style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <Link href="/apply" className="btn-primary" style={{ position: 'relative', zIndex: 1, padding: '12px 32px', fontSize: '13px' }}>
              GET EARLY ACCESS ↗
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const confirmed = status === 'CONFIRMED'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px',
      fontSize: '10px', fontFamily: 'var(--font-mono), monospace',
      fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
      background: confirmed ? 'var(--lime)' : 'var(--bg-elevated)',
      color: confirmed ? 'var(--text-inverse)' : 'var(--text-secondary)',
      border: confirmed ? 'none' : '1px solid var(--bg-border)',
    }}>
      {confirmed && <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />}
      {status}
    </span>
  )
}

// ── Full events list (revealed) ───────────────────────────────────────────────
function EventsRevealedPage({ events }: { events: WGCEvent[] }) {
  const months = Array.from(new Set(events.map(e => e.month)))

  return (
    <div style={{ paddingTop: '64px' }}>

      {/* Header */}
      <section style={{
        paddingTop: 'var(--section-py)', paddingBottom: '56px',
        borderBottom: '1px solid var(--bg-border)', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 50% at 100% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>ALL EVENTS</span>
            <h1 className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}>
              2026 Schedule
            </h1>
            <p className="font-body text-text-secondary"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: '480px', lineHeight: 1.75 }}>
              Every event, every city. Asia&apos;s most ambitious gaming calendar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderBottom: '1px solid var(--bg-border)', background: 'var(--bg-surface)' }}>
        <div className="wgc-container">
          <div style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap' }}>
            {[
              { val: `${events.filter(e => !e.flagship).length}+`, label: 'Qualifier Events' },
              { val: '1', label: 'Flagship Hackathon' },
              { val: `${new Set(events.map(e => e.city)).size}`, label: 'Cities' },
              { val: 'NOV 19', label: 'Grand Finale' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: '20px 32px', borderRight: '1px solid var(--bg-border)',
                display: 'flex', flexDirection: 'column', gap: '4px', minWidth: '140px',
              }}>
                <span className="font-mono" style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>{s.val}</span>
                <span className="font-mono text-text-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events by month */}
      <section style={{ paddingTop: '56px', paddingBottom: 'var(--section-py)' }}>
        <div className="wgc-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {months.map((month) => {
              const monthEvents = events.filter(e => e.month === month)
              return (
                <div key={month}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}>
                      {month} 2026
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--bg-border)' }} />
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {monthEvents.length} event{monthEvents.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {monthEvents.map((event, i) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.06 }}
                        style={{ gridColumn: event.flagship ? '1 / -1' : undefined }}
                      >
                        {event.flagship ? (
                          <Link href={`/events/${event.id}`} style={{
                            display: 'block', border: '1px solid #C4963A',
                            background: 'var(--bg-surface)', padding: '36px',
                            position: 'relative', overflow: 'hidden', textDecoration: 'none',
                            transition: 'background 0.2s ease',
                          }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
                          >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#C4963A' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '24px', alignItems: 'flex-start' }}>
                              <div style={{ flex: 1, minWidth: '280px' }}>
                                <span style={{
                                  display: 'inline-block', padding: '4px 12px', background: '#C4963A',
                                  color: '#050505', fontFamily: 'var(--font-mono), monospace', fontSize: '10px',
                                  fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px',
                                }}>★ FLAGSHIP EVENT</span>
                                <h2 className="font-heading font-black text-text-primary" style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.05, marginBottom: '12px' }}>
                                  {event.title}
                                </h2>
                                {event.description && <p className="font-body text-text-secondary" style={{ fontSize: '15px', marginBottom: '12px' }}>{event.description}</p>}
                                <p className="font-mono text-text-secondary" style={{ fontSize: '12px', letterSpacing: '0.1em' }}>
                                  {event.city} &nbsp;·&nbsp; {event.date}
                                </p>
                              </div>
                              <div style={{ display: 'flex', gap: '24px', flexShrink: 0 }}>
                                {event.prizePool && (
                                  <div style={{ textAlign: 'center' }}>
                                    <p className="font-mono" style={{ fontSize: 'clamp(22px, 2vw, 32px)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1, marginBottom: '4px' }}>{event.prizePool}</p>
                                    <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Prize Pool</p>
                                  </div>
                                )}
                                {event.builders && (
                                  <div style={{ textAlign: 'center' }}>
                                    <p className="font-mono" style={{ fontSize: 'clamp(22px, 2vw, 32px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '4px' }}>{event.builders}</p>
                                    <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Builders</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(196,150,58,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lime)', display: 'inline-block' }} />
                              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--lime)', fontWeight: 600, letterSpacing: '0.1em' }}>{event.status}</span>
                              <span className="font-mono text-text-secondary" style={{ fontSize: '11px', marginLeft: 'auto' }}>Register interest →</span>
                            </div>
                          </Link>
                        ) : (
                          <Link href={`/events/${event.id}`} style={{
                            display: 'block', border: '1px solid var(--bg-border)',
                            background: 'var(--bg-surface)', padding: '24px',
                            textDecoration: 'none', height: '100%',
                            transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                          }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime-dim)'; e.currentTarget.style.background = 'var(--bg-elevated)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.transform = 'translateY(0)' }}
                          >
                            <h3 className="font-body" style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                              {event.title}
                            </h3>
                            <p className="font-mono text-text-secondary" style={{ fontSize: '12px', marginBottom: '16px', letterSpacing: '0.06em' }}>
                              {event.city} · {event.date}
                            </p>
                            <StatusBadge status={event.status} />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function EventsClient({ events = [] }: { events?: WGCEvent[] }) {
  return REVEALED ? <EventsRevealedPage events={events} /> : <EventsRevealingPage />
}
