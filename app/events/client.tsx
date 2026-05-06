'use client'

import { motion } from 'framer-motion'
import { type WGCEvent } from '@/lib/constants'
import Link from 'next/link'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
})

export default function EventsPage({ events = [] }: { events?: WGCEvent[] }) {
  const months = Array.from(new Set(events.map(e => e.month)))

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
          background: 'radial-gradient(ellipse 50% 50% at 100% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>ALL EVENTS</span>
            <h1
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}
            >
              2026 Schedule
            </h1>
            <p className="font-body text-text-secondary" style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: '480px', lineHeight: 1.75, textWrap: 'balance' } as React.CSSProperties}>
              Every event, every city. Asia&apos;s most ambitious gaming calendar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--bg-border)', background: 'var(--bg-surface)' }}>
        <div className="wgc-container">
          <div style={{ display: 'flex', alignItems: 'stretch', flexWrap: 'wrap' }}>
            {[
              { val: '11+', label: 'Qualifier Events' },
              { val: '1', label: 'Flagship Hackathon' },
              { val: '8+', label: 'Nations' },
              { val: 'NOV 19', label: 'Grand Finale' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '20px 32px',
                  borderRight: '1px solid var(--bg-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  minWidth: '140px',
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}
                >
                  {s.val}
                </span>
                <span className="font-mono text-text-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS BY MONTH ─────────────────────────────────────── */}
      <section style={{ paddingTop: '56px', paddingBottom: 'var(--section-py)' }}>
        <div className="wgc-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {months.map((month, mi) => {
              const monthEvents = events.filter(e => e.month === month)
              return (
                <div key={month}>
                  {/* Month separator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}
                    >
                      {month} 2026
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--bg-border)' }} />
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {monthEvents.length} event{monthEvents.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Events grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                      gap: '16px',
                    }}
                  >
                    {monthEvents.map((event, i) => (
                      <motion.div
                        key={event.id}
                        {...fadeUp(i * 0.06)}
                        style={{ gridColumn: event.flagship ? '1 / -1' : undefined }}
                      >
                        {event.flagship ? (
                          /* Flagship card — full width gold accent */
                          <Link
                            href={`/events/${event.id}`}
                            style={{
                              display: 'block',
                              border: '1px solid #C4963A',
                              background: 'var(--bg-surface)',
                              padding: '36px',
                              position: 'relative',
                              overflow: 'hidden',
                              textDecoration: 'none',
                              transition: 'background 0.2s ease',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-surface)')}
                          >
                            {/* Gold top stripe */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#C4963A' }} />

                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '24px', alignItems: 'flex-start' }}>
                              <div style={{ flex: 1, minWidth: '280px' }}>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    background: '#C4963A',
                                    color: '#050505',
                                    fontFamily: 'var(--font-mono), monospace',
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    textTransform: 'uppercase',
                                    marginBottom: '16px',
                                  }}
                                >
                                  ★ FLAGSHIP EVENT
                                </span>
                                <h2
                                  className="font-heading font-black text-text-primary"
                                  style={{ fontSize: 'clamp(28px, 3vw, 44px)', lineHeight: 1.05, marginBottom: '12px' }}
                                >
                                  {event.title}
                                </h2>
                                {event.description && (
                                  <p className="font-body text-text-secondary" style={{ fontSize: '15px', marginBottom: '12px' }}>
                                    {event.description}
                                  </p>
                                )}
                                <p
                                  className="font-mono text-text-secondary"
                                  style={{ fontSize: '12px', letterSpacing: '0.1em' }}
                                >
                                  {event.city} &nbsp;·&nbsp; {event.date}
                                </p>
                              </div>
                              {/* Stats */}
                              <div style={{ display: 'flex', gap: '24px', flexShrink: 0 }}>
                                {event.prizePool && (
                                  <div style={{ textAlign: 'center' }}>
                                    <p className="font-mono" style={{ fontSize: 'clamp(22px, 2vw, 32px)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1, marginBottom: '4px' }}>
                                      {event.prizePool}
                                    </p>
                                    <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                                      Prize Pool
                                    </p>
                                  </div>
                                )}
                                {event.builders && (
                                  <div style={{ textAlign: 'center' }}>
                                    <p className="font-mono" style={{ fontSize: 'clamp(22px, 2vw, 32px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '4px' }}>
                                      {event.builders}
                                    </p>
                                    <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                                      Builders
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(196,150,58,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lime)', display: 'inline-block' }} />
                              <span className="font-mono" style={{ fontSize: '11px', color: 'var(--lime)', fontWeight: 600, letterSpacing: '0.1em' }}>
                                {event.status}
                              </span>
                              <span className="font-mono text-text-secondary" style={{ fontSize: '11px', marginLeft: 'auto' }}>
                                Register interest →
                              </span>
                            </div>
                          </Link>
                        ) : (
                          /* Regular event card */
                          <Link
                            href={`/events/${event.id}`}
                            style={{
                              display: 'block',
                              border: '1px solid var(--bg-border)',
                              background: 'var(--bg-surface)',
                              padding: '24px',
                              textDecoration: 'none',
                              transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
                              height: '100%',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.borderColor = 'var(--lime-dim)'
                              e.currentTarget.style.background = 'var(--bg-elevated)'
                              e.currentTarget.style.transform = 'translateY(-2px)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.borderColor = 'var(--bg-border)'
                              e.currentTarget.style.background = 'var(--bg-surface)'
                              e.currentTarget.style.transform = 'translateY(0)'
                            }}
                          >
                            <h3
                              className="font-body"
                              style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}
                            >
                              {event.title}
                            </h3>
                            <p className="font-mono text-text-secondary" style={{ fontSize: '12px', marginBottom: '16px', letterSpacing: '0.06em' }}>
                              {event.city} · {event.date}
                            </p>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '3px 10px',
                                fontSize: '10px',
                                fontFamily: 'var(--font-mono), monospace',
                                fontWeight: 600,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                background: event.status === 'CONFIRMED' ? 'var(--lime)' : 'var(--bg-elevated)',
                                color: event.status === 'CONFIRMED' ? 'var(--text-inverse)' : 'var(--text-secondary)',
                                border: event.status === 'CONFIRMED' ? 'none' : '1px solid var(--bg-border)',
                              }}
                            >
                              {event.status === 'CONFIRMED' && (
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                              )}
                              {event.status}
                            </span>
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
