'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { COUNCIL_MEMBERS, WGC_DIVISIONS, type CouncilMember } from '@/lib/constants'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

type Division = typeof WGC_DIVISIONS[number]

// ── "Revealing Soon" overlay for council ─────────────────────────────────────
function CouncilRevealingOverlay() {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--bg-border)',
        background: 'var(--bg-surface)',
        padding: 'clamp(40px, 6vw, 72px) 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        textAlign: 'center',
        marginBottom: '48px',
      }}
    >
      {/* Scanline bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(170,223,46,0.025) 3px, rgba(170,223,46,0.025) 4px)',
        backgroundSize: '100% 4px',
      }} />

      {/* Pulsing lime sweep */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', repeatDelay: 2 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(105deg, transparent 20%, rgba(170,223,46,0.06) 50%, transparent 80%)',
        }}
      />

      {/* Ghost member avatars */}
      <div style={{ display: 'flex', gap: '-8px', position: 'relative', zIndex: 1 }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 2 + i * 0.3, delay: i * 0.4, ease: 'easeInOut' }}
            style={{
              width: '52px', height: '52px',
              borderRadius: '50%',
              background: `rgba(170,223,46,${0.03 + i * 0.01})`,
              border: '1px solid rgba(170,223,46,0.15)',
              marginLeft: i > 0 ? '-14px' : '0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(170,223,46,0.3)" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Central text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="font-mono"
          style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.28em', color: 'var(--lime)', textTransform: 'uppercase', marginBottom: '16px' }}
        >
          ◆ COUNCIL SELECTION IN PROGRESS ◆
        </motion.p>
        <h3
          className="font-heading font-black text-text-primary"
          style={{ fontSize: 'clamp(22px, 3vw, 36px)', lineHeight: 1.1, marginBottom: '14px' }}
        >
          Members Revealing Soon
        </h3>
        <p
          className="font-body text-text-secondary"
          style={{ fontSize: '14px', maxWidth: '420px', lineHeight: 1.75 }}
        >
          The World Gaming Council is assembling its founding members across Asia. Names will be revealed when the time is right.
        </p>
      </div>

      {/* Redacted member rows */}
      <div style={{ width: '100%', maxWidth: '480px', borderTop: '1px solid var(--bg-border)', position: 'relative', zIndex: 1 }}>
        {[1, 0.75, 0.5].map((opacity, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '14px 0', borderBottom: '1px solid var(--bg-border)',
              opacity,
            }}
          >
            {/* Ghost avatar */}
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="font-mono" style={{ fontSize: '8px', color: 'var(--bg-border)' }}>?</span>
            </div>
            {/* Redacted name */}
            <div style={{ flex: 1 }}>
              <div style={{
                height: '10px', width: `${60 + i * 20}%`,
                background: 'var(--bg-elevated)', marginBottom: '6px',
                border: '1px solid var(--bg-border)',
              }} />
              <div style={{
                height: '8px', width: `${30 + i * 10}%`,
                background: 'rgba(170,223,46,0.06)', border: '1px solid rgba(170,223,46,0.1)',
              }} />
            </div>
            {/* FOUNDING badge placeholder */}
            {i === 0 && (
              <div style={{
                padding: '3px 8px', border: '1px solid rgba(170,223,46,0.2)',
                background: 'rgba(170,223,46,0.04)',
              }}>
                <span className="font-mono" style={{ fontSize: '7px', color: 'rgba(170,223,46,0.4)', letterSpacing: '0.1em' }}>REDACTED</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', position: 'relative', zIndex: 1 }}>
        FOLLOW WGC FOR THE ANNOUNCEMENT →
      </p>
    </div>
  )
}

// ── Member card ───────────────────────────────────────────────────────────────
function MemberCard({ member, index }: { member: CouncilMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 0', borderBottom: '1px solid var(--bg-border)' }}
    >
      {/* Avatar */}
      <div style={{ width: '48px', height: '48px', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--bg-border)', position: 'relative' }}>
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(20%)' }}
          sizes="48px"
        />
      </div>

      <span className="font-mono text-lime" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', minWidth: '20px', flexShrink: 0 }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="font-body text-text-primary" style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.2 }}>
            {member.name}
          </span>
          {member.founding && (
            <span style={{
              padding: '2px 6px', background: 'var(--lime)', color: 'var(--text-inverse)',
              fontFamily: 'var(--font-mono), monospace', fontSize: '7px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0, lineHeight: 1.6,
            }}>
              FOUNDING
            </span>
          )}
        </div>
        <span className="font-body text-text-secondary" style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}>
          {member.role}
        </span>
      </div>

      <span className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.06em', flexShrink: 0, textAlign: 'right' }}>
        {member.org}
      </span>
    </motion.div>
  )
}

// ── Division row ──────────────────────────────────────────────────────────────
function DivisionRow({ division }: { division: typeof WGC_DIVISIONS[number] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid var(--bg-border)' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
          <span className="font-mono text-lime" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', flexShrink: 0, minWidth: '24px' }}>
            {division.number}
          </span>
          <span className="font-body text-text-primary" style={{ fontWeight: 600, fontSize: '14px' }}>
            {division.name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-mono), monospace', fontSize: '10px', fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: division.status === 'ACTIVE' ? 'var(--lime)' : 'var(--text-secondary)',
          }}>
            {division.status}
          </span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 0 20px 40px' }}>
              <p className="font-body text-text-secondary" style={{ fontSize: '13px', lineHeight: 1.7 }}>
                {division.details}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────
export function CouncilSection({
  hideHeader = false,
  members = COUNCIL_MEMBERS as CouncilMember[],
  divisions = WGC_DIVISIONS as Division[],
  revealed = true,
}: {
  hideHeader?: boolean
  members?: CouncilMember[]
  divisions?: Division[]
  revealed?: boolean
}) {
  return (
    <section
      className="wgc-section bg-bg-void"
      id="council"
      style={{ borderTop: '1px solid var(--bg-border)' }}
    >
      <div className="wgc-container">

        {/* Section Header */}
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}
          >
            <div>
              <span className="label-section accent" style={{ marginBottom: '12px' }}>THE COUNCIL</span>
              <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>
                Who&apos;s running the game.
              </h2>
            </div>
            {revealed && members.length > 0 && (
              <a
                href="/council"
                className="font-body text-text-secondary"
                style={{ fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--lime)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                View All {members.length} Members →
              </a>
            )}
          </motion.div>
        )}

        {/* Members — revealed or overlay */}
        {!revealed || members.length === 0 ? (
          <CouncilRevealingOverlay />
        ) : (
          <div style={{ marginBottom: '48px', borderTop: '1px solid var(--bg-border)' }}>
            {members.map((member, i) => (
              <MemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        )}

        {/* Divisions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="label-section accent" style={{ marginBottom: '20px' }}>WGC DIVISIONS</span>
          <div style={{ borderTop: '1px solid var(--bg-border)' }}>
            {divisions.map((div, i) => (
              <DivisionRow key={div.number} division={div} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
