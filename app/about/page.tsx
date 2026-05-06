'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { WGC_BRAND, PRINCIPLES, WGC_DIVISIONS } from '@/lib/constants'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '64px' }}>

      {/* ── PAGE HEADER ─────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: '64px',
          borderBottom: '1px solid var(--bg-border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle lime glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 0% 50%, rgba(170,223,46,0.05) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>
              ABOUT WGC
            </span>
            <h1
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '24px', maxWidth: '700px' }}
            >
              The governing body{' '}
              <em className="text-lime not-italic">for Asian gaming.</em>
            </h1>
            <p
              className="font-body text-text-secondary"
              style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', maxWidth: '560px', lineHeight: 1.75, textWrap: 'balance' } as React.CSSProperties}
            >
              {WGC_BRAND.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────── */}
      <section
        style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', borderBottom: '1px solid var(--bg-border)' }}
      >
        <div className="wgc-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start',
            }}
          >
            {/* Left: Mission text */}
            <motion.div {...fadeUp(0)}>
              <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>OUR MISSION</span>
              <h2
                className="font-heading font-bold text-text-primary"
                style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginBottom: '32px' }}
              >
                Organize.<br />Legitimize.<br />
                <em className="text-lime not-italic">Dominate.</em>
              </h2>
              <div style={{ paddingLeft: '20px', borderLeft: '3px solid var(--lime)', marginBottom: '24px' }}>
                <p className="font-body text-text-secondary" style={{ lineHeight: 1.75, marginBottom: '16px' }}>
                  World Gaming Council exists to organize, amplify, and legitimize gaming as a serious competitive and cultural force across Asia.
                </p>
                <p className="font-body text-text-secondary" style={{ lineHeight: 1.75 }}>
                  We don&apos;t just run events — we build the infrastructure that makes them matter. From city-level builder nights to the Pan-Asia Hackathon, every touchpoint is designed to elevate.
                </p>
              </div>
            </motion.div>

            {/* Right: Principles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {PRINCIPLES.map((p, i) => (
                <motion.div
                  key={p.number}
                  {...fadeUp(0.1 + i * 0.1)}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--bg-border)',
                    padding: '24px',
                    transition: 'border-color 0.2s ease',
                    cursor: 'default',
                  }}
                  whileHover={{ borderColor: 'var(--lime-dim)' } as any}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <span
                      className="font-mono"
                      style={{ fontSize: '11px', color: 'var(--lime)', fontWeight: 600, letterSpacing: '0.15em' }}
                    >
                      {p.number}
                    </span>
                    <div style={{ width: '1px', height: '16px', background: 'var(--bg-border)' }} />
                    <span className="font-body" style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
                      {p.title}
                    </span>
                  </div>
                  <div style={{ height: '1px', background: 'var(--bg-border)', marginBottom: '10px' }} />
                  <p className="font-body text-text-secondary" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                    {p.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNEY TIMELINE ─────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          borderBottom: '1px solid var(--bg-border)',
          background: 'var(--bg-surface)',
        }}
      >
        <div className="wgc-container">
          <motion.div {...fadeUp(0)} style={{ marginBottom: '60px' }}>
            <span className="label-section" style={{ marginBottom: '16px', display: 'block' }}>ROADMAP</span>
            <h2
              className="font-heading font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}
            >
              Our Journey
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { year: '2025', event: 'WGC Founded', desc: 'Established as the governing body for gaming across Asia.' },
              { year: '2025', event: 'First City Events', desc: 'Launched builder nights in Delhi, Seoul, and Dubai.' },
              { year: '2026', event: 'Pan-Asia Expansion', desc: 'Scaling to 20+ cities across 12+ nations in the region.' },
              { year: 'NOV 2026', event: 'WGC Hackathon 2026', desc: "Asia's biggest gaming hackathon. GTA VI launch day. ₹1CR+ prize pool." },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}
              >
                {/* Year column */}
                <div style={{ minWidth: '90px', paddingTop: '4px' }}>
                  <span
                    className="font-mono"
                    style={{ fontSize: '12px', fontWeight: 700, color: 'var(--lime)', letterSpacing: '0.1em' }}
                  >
                    {item.year}
                  </span>
                </div>
                {/* Timeline line + content */}
                <div
                  style={{
                    paddingLeft: '24px',
                    paddingBottom: i < 3 ? '40px' : '0',
                    borderLeft: '1px solid var(--lime-dim)',
                    flex: 1,
                    position: 'relative',
                  }}
                >
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: '-5px', top: '4px',
                    width: '9px', height: '9px',
                    background: 'var(--lime)', borderRadius: '50%',
                  }} />
                  <h3
                    className="font-body"
                    style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '6px' }}
                  >
                    {item.event}
                  </h3>
                  <p className="font-body text-text-secondary" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNCIL DIVISIONS ────────────────────────────────────── */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)', borderBottom: '1px solid var(--bg-border)' }}>
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: 'var(--bg-border)',
              border: '1px solid var(--bg-border)',
            }}
          >
            {WGC_DIVISIONS.map((div, i) => (
              <motion.div
                key={div.number}
                {...fadeUp(i * 0.08)}
                style={{
                  background: 'var(--bg-surface)',
                  padding: '32px',
                  position: 'relative',
                  transition: 'background 0.2s ease',
                }}
                whileHover={{ background: 'var(--bg-elevated)' } as any}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: '11px', color: 'var(--lime)', fontWeight: 600, display: 'block', marginBottom: '16px' }}
                >
                  {div.number}
                </span>
                <h3
                  className="font-body"
                  style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '6px' }}
                >
                  {div.name}
                </h3>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginBottom: '16px', letterSpacing: '0.08em' }}>
                  {div.desc}
                </p>
                <p className="font-body text-text-secondary" style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
                  {div.details}
                </p>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: div.status === 'ACTIVE' ? 'var(--lime)' : 'var(--bg-elevated)',
                    color: div.status === 'ACTIVE' ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    border: div.status === 'ACTIVE' ? 'none' : '1px solid var(--bg-border)',
                  }}
                >
                  {div.status === 'ACTIVE' && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />}
                  {div.status}
                </span>
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
            <span className="label-section" style={{ marginBottom: '16px', display: 'block', justifyContent: 'center' }}>
              GET INVOLVED
            </span>
            <h2
              className="font-heading font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginBottom: '20px' }}
            >
              Join the Movement
            </h2>
            <p className="font-body text-text-secondary" style={{ fontSize: '16px', lineHeight: 1.75, marginBottom: '40px' }}>
              Whether you&apos;re a builder, organizer, or brand — there&apos;s a place for you in WGC.
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
