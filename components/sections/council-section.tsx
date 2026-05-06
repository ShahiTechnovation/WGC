'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { COUNCIL_MEMBERS, WGC_DIVISIONS, type CouncilMember } from '@/lib/constants'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

type Division = typeof WGC_DIVISIONS[number]

function MemberCard({ member, index }: { member: CouncilMember; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px 0',
        borderBottom: '1px solid var(--bg-border)',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: '48px',
        height: '48px',
        flexShrink: 0,
        overflow: 'hidden',
        border: '1px solid var(--bg-border)',
        position: 'relative',
      }}>
        <Image
          src={member.avatar}
          alt={member.name}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(20%)' }}
          sizes="48px"
        />
      </div>

      {/* Index */}
      <span
        className="font-mono text-lime"
        style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', minWidth: '20px', flexShrink: 0 }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Name + Role */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span
            className="font-body text-text-primary"
            style={{ fontWeight: 600, fontSize: '14px', lineHeight: 1.2 }}
          >
            {member.name}
          </span>
          {member.founding && (
            <span style={{
              padding: '2px 6px',
              background: 'var(--lime)',
              color: 'var(--text-inverse)',
              fontFamily: 'var(--font-mono), monospace',
              fontSize: '7px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              flexShrink: 0,
              lineHeight: 1.6,
            }}>
              FOUNDING
            </span>
          )}
        </div>
        <span
          className="font-body text-text-secondary"
          style={{ fontSize: '12px', display: 'block', marginTop: '2px' }}
        >
          {member.role}
        </span>
      </div>

      {/* Org */}
      <span
        className="font-mono text-text-secondary"
        style={{ fontSize: '10px', letterSpacing: '0.06em', flexShrink: 0, textAlign: 'right' }}
      >
        {member.org}
      </span>
    </motion.div>
  )
}

function DivisionRow({ division, index }: { division: typeof WGC_DIVISIONS[number]; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid var(--bg-border)' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
          <span
            className="font-mono text-lime"
            style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', flexShrink: 0, minWidth: '24px' }}
          >
            {division.number}
          </span>
          <span className="font-body text-text-primary" style={{ fontWeight: 600, fontSize: '14px' }}>
            {division.name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-mono), monospace',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
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

export function CouncilSection({
  hideHeader = false,
  members = COUNCIL_MEMBERS as CouncilMember[],
  divisions = WGC_DIVISIONS as Division[],
}: {
  hideHeader?: boolean
  members?: CouncilMember[]
  divisions?: Division[]
}) {
  return (
    <section
      className="wgc-section bg-bg-void"
      id="council"
      style={{ borderTop: '1px solid var(--bg-border)' }}
    >
      <div className="wgc-container">

        {/* ── Section Header ─────────────────────────────── */}
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
              <h2
                className="font-heading font-bold text-text-primary"
                style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}
              >
                Who&apos;s running the game.
              </h2>
            </div>
            <a
              href="/council"
              className="font-body text-text-secondary"
              style={{ fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--lime)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              View All {members.length} Members →
            </a>
          </motion.div>
        )}

        {/* ── Members Grid ───────────────────────────────── */}
        <div style={{ marginBottom: '48px', borderTop: '1px solid var(--bg-border)' }}>
          {members.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* ── Divisions ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="label-section accent" style={{ marginBottom: '20px' }}>WGC DIVISIONS</span>
          <div style={{ borderTop: '1px solid var(--bg-border)' }}>
            {divisions.map((div, i) => (
              <DivisionRow key={div.number} division={div} index={i} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
