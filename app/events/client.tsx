'use client'

import { motion } from 'framer-motion'
import { AFKRoadmap, MoreEventsPlaceholder } from '@/components/sections/events-section'
import type { WGCEvent } from '@/lib/constants'

// ── Full events list (revealed) ───────────────────────────────────────────────
function EventsRevealedPage({ events }: { events: WGCEvent[] }) {
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

      {/* AFK Roadmap showcase */}
      <AFKRoadmap />

      {/* More Events Coming Soon Placeholder */}
      <MoreEventsPlaceholder />

    </div>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function EventsClient({ events = [] }: { events?: WGCEvent[] }) {
  return <EventsRevealedPage events={events} />
}
