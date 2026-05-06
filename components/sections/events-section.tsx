'use client'

import { motion } from 'framer-motion'
import { EVENTS_ROADMAP, type WGCEvent } from '@/lib/constants'
import Link from 'next/link'

export type { WGCEvent }

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
        {/* Gold top stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#C4963A' }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
          <div style={{ flex: 1, minWidth: '260px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              <span
                style={{
                  padding: '4px 12px',
                  background: '#C4963A',
                  color: '#050505',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                ★ FLAGSHIP EVENT
              </span>
              <span
                style={{
                  padding: '4px 12px',
                  background: 'var(--bg-elevated)',
                  color: 'var(--lime)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--bg-border)',
                }}
              >
                GTA VI LAUNCH DAY
              </span>
            </div>

            <p className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.12em', marginBottom: '10px' }}>
              NOV 19 · 2026
            </p>
            <h3
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.05, marginBottom: '8px' }}
            >
              {event.title}
            </h3>
            {event.description && (
              <p className="font-body text-text-secondary" style={{ fontSize: '14px' }}>
                {event.description}
              </p>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '0', border: '1px solid rgba(196,150,58,0.3)', flexShrink: 0 }}>
            {[
              { val: event.prizePool, label: 'Prize Pool' },
              { val: event.builders, label: 'Builders' },
              { val: event.city, label: 'Scope' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '16px 20px',
                  textAlign: 'center',
                  borderRight: i < 2 ? '1px solid rgba(196,150,58,0.3)' : 'none',
                  minWidth: '90px',
                }}
              >
                <p
                  className="font-mono"
                  style={{ fontSize: 'clamp(16px, 1.8vw, 22px)', fontWeight: 700, color: 'var(--lime)', lineHeight: 1, marginBottom: '4px' }}
                >
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
            <span className="font-mono" style={{ fontSize: '11px', color: 'var(--lime)', fontWeight: 600, letterSpacing: '0.1em' }}>
              CONFIRMED
            </span>
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
        background: 'var(--bg-void)',
        border: '1px solid var(--bg-border)',
        padding: '20px',
        transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
        cursor: 'pointer',
      }}
      whileHover={{
        borderColor: 'var(--lime-dim)',
        background: 'var(--bg-surface)',
        y: -2,
      } as any}
    >
      <h4
        className="font-body text-text-primary"
        style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.3, marginBottom: '6px' }}
      >
        {event.title}
      </h4>
      <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginBottom: '14px', letterSpacing: '0.05em' }}>
        {event.city} · {event.date}
      </p>
      <StatusBadge status={event.status} />
    </motion.div>
  )
}

export function EventsSection({ events = EVENTS_ROADMAP }: { events?: WGCEvent[] }) {
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
            <h2
              className="font-heading font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}
            >
              Events Roadmap
            </h2>
          </div>
          <p className="font-mono text-text-secondary" style={{ fontSize: '12px', letterSpacing: '0.08em', textAlign: 'right' }}>
            {totalEvents} events · {totalCities} cities across Asia
          </p>
        </motion.div>

        {/* Events by month */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {months.map(month => {
            const monthEvents = events.filter(e => e.month === month)
            const nonFlagship = monthEvents.filter(e => !e.flagship)
            const flagship = monthEvents.find(e => e.flagship)

            return (
              <div key={month}>
                {/* Month separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <span
                    className="font-mono"
                    style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
                  >
                    {month}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'var(--bg-border)' }} />
                </div>

                {/* Cards grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: nonFlagship.length === 1 ? '1fr' : nonFlagship.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                    gap: '1px',
                    background: 'var(--bg-border)',
                    border: '1px solid var(--bg-border)',
                  }}
                >
                  {/* Non-flagship first */}
                  {nonFlagship.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                  {/* Flagship goes full-width below */}
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
      </div>
    </section>
  )
}
