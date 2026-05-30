'use client'

import { useState, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Check,
  X,
  Calendar,
  Clock,
  Trophy,
  Users,
  Shield,
  Rocket,
  Target,
  Send,
  ArrowRight,
  Info,
  ChevronRight,
  Code,
  Flame,
  Award
} from 'lucide-react'
import type { Partner, WGCEvent } from '@/lib/constants'
import { AFKRoadmap } from '@/components/sections/events-section'

// ── CONSTANTS & MOCK DATA ────────────────────────────────────────────────────

const STATS = [
  { value: '50,000+', label: 'Gaming ecosystem reach across India' },
  { value: '36 HOURS', label: 'Immense Buildathon Experience' },
  { value: '300+', label: 'Gaming events across IITs, NITs & top institutes' },
  { value: '50+', label: 'Gaming brands & Web3 ecosystem partners' }
]

const DOMAINS = [
  {
    title: 'Game Development',
    desc: 'Build high-fidelity 2D/3D games, sandbox worlds, or fast-paced hypercasual engines.',
    icon: '🎮'
  },
  {
    title: 'AI-Driven NPCs',
    desc: 'Implement dynamic AI behavior, smart agents, and conversational player interactions.',
    icon: '🤖'
  },
  {
    title: 'Virtual Economies',
    desc: 'Design mod-compatible in-game currencies, digital trading assets, and market mechanics.',
    icon: '💰'
  },
  {
    title: 'Modding & Mod Tools',
    desc: 'Create expansion systems, level editors, mod kits, and scripting layers for players.',
    icon: '🛠️'
  },
  {
    title: 'Immersive Storytelling',
    desc: 'Craft branching player narratives, multi-choice decision loops, and narrative engines.',
    icon: '📜'
  },
  {
    title: 'Real-Time Multiplayer',
    desc: 'Setup high-speed lobbies, multiplayer synch protocols, and live matchmaking engines.',
    icon: '🌐'
  }
]

const SPONSOR_FEATURES = [
  { name: 'Logo on website, banners and posters', tiers: [true, true, true, true, true] },
  { name: 'Social Media Shoutout', tiers: [true, true, true, true, true] },
  { name: 'Pre/Post Event Mail', tiers: [true, true, true, true, false] },
  { name: 'Logo on swags and id cards', tiers: [true, true, true, false, false] },
  { name: 'Conduct Workshops', tiers: [true, true, true, false, false] },
  { name: 'Ads on Screen on Venue', tiers: [true, true, false, false, false] },
  { name: 'Setup Booths on the venue', tiers: [true, true, false, false, false] },
  { name: '15 Min Slot During the Ceremony', tiers: [true, false, false, false, false] },
  { name: 'Include Powered By alongside hackathon', tiers: [true, false, false, false, false] }
]

const SPONSOR_TIERS = [
  { name: 'Title', price: '$1,500', color: '#AADF2E' },
  { name: 'Platinum', price: '$1,000', color: '#E5E7EB' },
  { name: 'Gold', price: '$600', color: '#C4963A' },
  { name: 'Silver', price: '$300', color: '#888880' },
  { name: 'In Kind', price: 'Products', color: '#7BAA1E' }
]

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// 1. Live Countdown Timer
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set target date: 45 days from current date for hackathon kickoff simulation
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 45)
    targetDate.setHours(9, 0, 0, 0)

    const timer = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime()
      if (difference <= 0) {
        clearInterval(timer)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginTop: '24px',
        fontFamily: 'var(--font-mono), monospace'
      }}
    >
      {[
        { val: timeLeft.days, label: 'DAYS' },
        { val: timeLeft.hours, label: 'HOURS' },
        { val: timeLeft.minutes, label: 'MINUTES' },
        { val: timeLeft.seconds, label: 'SECONDS' }
      ].map((t, idx) => (
        <div
          key={idx}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--bg-border)',
            padding: '16px 20px',
            minWidth: '90px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Neon side indicator */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '2px', bottom: 0, background: 'var(--lime)' }} />
          <span style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 'bold', color: 'var(--text-primary)', display: 'block', lineHeight: 1 }}>
            {String(t.val).padStart(2, '0')}
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginTop: '6px' }}>
            {t.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// 2. Partner Connected Tree (Image 2 representation)
function PartnerCard({ p }: { p: { title: string, type: string, desc: string } }) {
  return (
    <motion.div
      whileHover={{ borderColor: 'var(--lime)', translateY: -2 }}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-border)',
        padding: '24px',
        borderRadius: '4px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        width: '100%',
        height: '210px'
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '10px', color: 'var(--lime)', fontWeight: 700, letterSpacing: '0.12em', marginBottom: '8px', display: 'block' }}>
        {p.type}
      </span>
      <h4 className="font-bebas text-xl text-text-primary" style={{ marginBottom: '12px', letterSpacing: '0.04em' }}>
        {p.title}
      </h4>
      <p className="font-body text-text-secondary" style={{ fontSize: '12.5px', lineHeight: 1.6 }}>
        {p.desc}
      </p>
    </motion.div>
  )
}

function PartnerTree() {
  const partners = [
    {
      title: 'Fastest Growing Gaming Community',
      type: 'COMMUNITY',
      desc: 'Reach 50,000+ gamers, developers, creators, and tech enthusiasts across India’s leading gaming ecosystem.'
    },
    {
      title: 'Content & Community Amplification',
      type: 'AMPLIFICATION',
      desc: 'Generate viral content, creator-led engagement, and organic reach across gaming and tech communities.'
    },
    {
      title: 'Connect With Top Talent',
      type: 'TALENT',
      desc: 'Engage directly with students and innovators from IITs, NITs, and 300+ premier campus gaming events.'
    },
    {
      title: 'Recruitment Ecosystem Growth',
      type: 'GROWTH',
      desc: 'Discover emerging talent, future founders, and expand your presence in India’s rapidly growing gaming ecosystem.'
    },
    {
      title: 'High-Impact Brand Visibility',
      type: 'VISIBILITY',
      desc: 'Gain strong digital and on-ground exposure through creator campaigns, livestreams, and event branding.'
    }
  ]

  return (
    <div style={{ position: 'relative', padding: '40px 0', marginTop: '40px', overflowX: 'auto' }}>
      {/* Grid layout for Desktop (5 columns, 3 rows) */}
      <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '0 24px', minWidth: '960px' }}>

        {/* Row 1: Top Row Cards */}
        {/* Col 1: Card 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
          <PartnerCard p={partners[0]} />
        </div>
        {/* Col 2: Empty */}
        <div></div>
        {/* Col 3: Card 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
          <PartnerCard p={partners[2]} />
        </div>
        {/* Col 4: Empty */}
        <div></div>
        {/* Col 5: Card 5 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
          <PartnerCard p={partners[4]} />
        </div>

        {/* Row 2: The Lines (spans 5 columns) */}
        <div style={{ gridColumn: 'span 5', height: '80px', position: 'relative' }}>
          {/* Main Horizontal Line */}
          <div style={{ position: 'absolute', top: '50%', left: '10%', right: '10%', height: '2px', background: 'var(--lime)', opacity: 0.6, transform: 'translateY(-50%)' }} />

          {/* Center Node (Green Dot) between Col 3 and Col 4 (at 60% of the grid width) */}
          <div style={{
            position: 'absolute',
            left: '60%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'var(--lime)',
            border: '3px solid var(--bg-void)',
            boxShadow: '0 0 10px var(--lime)',
            zIndex: 10
          }} />

          {/* Vertical Connector lines */}
          {/* Col 1 connector: top half (extends from 50% to 0%) */}
          <div style={{ position: 'absolute', left: '10%', top: 0, bottom: '50%', width: '2px', background: 'var(--lime)', opacity: 0.6 }} />
          {/* Col 2 connector: bottom half (extends from 50% to 100%) */}
          <div style={{ position: 'absolute', left: '30%', top: '50%', bottom: 0, width: '2px', background: 'var(--lime)', opacity: 0.6 }} />
          {/* Col 3 connector: top half */}
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: '50%', width: '2px', background: 'var(--lime)', opacity: 0.6 }} />
          {/* Col 4 connector: bottom half */}
          <div style={{ position: 'absolute', left: '70%', top: '50%', bottom: 0, width: '2px', background: 'var(--lime)', opacity: 0.6 }} />
          {/* Col 5 connector: top half */}
          <div style={{ position: 'absolute', left: '90%', top: 0, bottom: '50%', width: '2px', background: 'var(--lime)', opacity: 0.6 }} />
        </div>

        {/* Row 3: Bottom Row Cards */}
        {/* Col 1: Empty */}
        <div></div>
        {/* Col 2: Card 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
          <PartnerCard p={partners[1]} />
        </div>
        {/* Col 3: Empty */}
        <div></div>
        {/* Col 4: Card 4 */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
          <PartnerCard p={partners[3]} />
        </div>
        {/* Col 5: Empty */}
        <div></div>

      </div>

      {/* Mobile View: Linear stack with simple indicators */}
      <div className="flex md:hidden flex-col gap-6">
        {partners.map((p, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PartnerCard p={p} />
            {idx < partners.length - 1 && (
              <div style={{ width: '2px', height: '20px', background: 'var(--lime)', opacity: 0.4, margin: '8px 0' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── CLIENT COMPONENT EXPORT ───────────────────────────────────────────────────

export default function AFKHacksClient({
  initialPartners = [],
  initialEvents = []
}: {
  initialPartners?: Partner[]
  initialEvents?: WGCEvent[]
}) {
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [formType, setFormType] = useState<'builder' | 'partner'>('builder')

  // Form State
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: 'builder',
    message: '',
    city: '',
    country: 'India'
  })

  // Synchronize dynamic type field in form when modal opens
  const openModal = (type: 'builder' | 'partner') => {
    setFormType(type)
    setFormData(prev => ({ ...prev, type }))
    setModalOpen(true)
    setFormSubmitted(false)
    setFormError(null)
  }

  const updateForm = (field: string, val: string) =>
    setFormData(prev => ({ ...prev, [field]: val }))

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError(null)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setFormSubmitted(true)
      } else {
        const data = await res.json()
        setFormError(data.error || 'Failed to submit application. Please verify details.')
      }
    } catch (err) {
      setFormError('Network error. Check connection and try again.')
    } finally {
      setFormLoading(false)
    }
  }

  // Filter events to show roadmap leading to AFK Hacks flagship event
  const roadmapEvents = initialEvents
    .filter(e => e.id !== 'flagship') // flagship itself is the target
    .slice(0, 4) // show top 4 leading events

  return (
    <div
      style={{
        background: 'var(--bg-void)',
        minHeight: '100vh',
        color: 'var(--text-primary)',
        position: 'relative'
      }}
      className="scanline"
    >
      {/* HUD Borders / Retro Tech Frame */}
      <div
        className="hidden xl:block"
        style={{
          position: 'fixed',
          top: '20px',
          bottom: '20px',
          left: '20px',
          right: '20px',
          border: '1px solid rgba(170,223,46,0.08)',
          pointerEvents: 'none',
          zIndex: 40
        }}
      >
        <span
          className="font-mono text-text-secondary"
          style={{ fontSize: '9px', position: 'absolute', top: '10px', left: '12px', letterSpacing: '0.12em' }}
        >
          ........................SYS_STATUS: ACTIVE // LOC_GLOBAL
        </span>
        <span
          className="font-mono text-text-secondary"
          style={{ fontSize: '9px', position: 'absolute', top: '10px', right: '12px', letterSpacing: '0.12em' }}
        >
          AFK_HACKS_v2.026
        </span>
        <div style={{ position: 'absolute', bottom: '10px', left: '12px', width: '6px', height: '6px', background: 'var(--lime)' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '32px 32px',
          backgroundImage: 'linear-gradient(to right, rgba(170,223,46,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(170,223,46,0.02) 1px, transparent 1px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* ── 1. HERO SECTION ───────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'clamp(100px, 12vh, 160px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--bg-border)'
        }}
      >
        {/* Glow backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(170,223,46,0.08) 0%, transparent 70%)',
            zIndex: 1
          }}
        />

        <div className="wgc-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Branding Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: '11px',
                fontWeight: 900,
                color: 'var(--text-inverse)',
                background: 'var(--lime)',
                padding: '4px 10px',
                letterSpacing: '0.15em'
              }}
            >
              WGC PRESENTS
            </div>
            <div style={{ width: '1px', height: '16px', background: 'var(--bg-border)' }} />
            <span
              className="font-mono text-text-secondary"
              style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em' }}
            >
              COMPETITIVE ARENA
            </span>
          </motion.div>

          {/* Glitch Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="font-bebas text-text-primary"
            style={{
              fontSize: 'clamp(64px, 10vw, 120px)',
              lineHeight: 0.85,
              letterSpacing: '0.02em',
              fontWeight: 900,
              textShadow: '0 0 40px rgba(170,223,46,0.1)'
            }}
          >
            AFK HACKS
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontSize: 'clamp(14px, 2.2vw, 24px)',
              fontWeight: 800,
              letterSpacing: '0.3em',
              color: 'var(--lime)',
              fontFamily: 'var(--font-bebas), sans-serif',
              marginTop: '16px',
              textTransform: 'uppercase'
            }}
          >
            Asia&apos;s Biggest Gaming Hackathon
          </motion.div>

          {/* Subtitle / Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-body text-text-secondary"
            style={{
              maxWidth: '640px',
              margin: '28px auto 40px',
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              lineHeight: 1.8,
              textWrap: 'balance'
            }}
          >
            A high-energy sandbox hackathon challenging developers, designers, and storytellers to build at the intersection of game tech, virtual economies, and immersive worlds.
          </motion.p>

          {/* Live countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ marginBottom: '48px' }}
          >
            <CountdownTimer />
          </motion.div>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}
          >
            <button
              onClick={() => openModal('builder')}
              className="btn-primary"
              style={{
                fontSize: '13px',
                padding: '16px 36px',
                boxShadow: '0 0 20px rgba(170,223,46,0.35)'
              }}
            >
              REGISTER FOR BUILDATHON <span>↗</span>
            </button>
            <button
              onClick={() => openModal('partner')}
              className="btn-secondary"
              style={{
                fontSize: '13px',
                padding: '16px 36px'
              }}
            >
              BECOME A SPONSOR <span>→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 2. KEY STATS SECTION ──────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-surface)',
          paddingTop: '64px',
          paddingBottom: '64px',
          borderBottom: '1px solid var(--bg-border)',
          position: 'relative'
        }}
      >
        <div className="wgc-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '32px'
            }}
          >
            {STATS.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  borderLeft: '2px solid var(--lime)',
                  paddingLeft: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <span
                  className="font-bebas text-text-primary"
                  style={{ fontSize: 'var(--type-stat)', lineHeight: 1.0, fontWeight: 900 }}
                >
                  {s.value}
                </span>
                <span
                  className="font-body text-text-secondary"
                  style={{ fontSize: '13px', marginTop: '10px', lineHeight: 1.6 }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SANDBOX & DOMAINS EXPLORER ──────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          borderBottom: '1px solid var(--bg-border)',
          position: 'relative'
        }}
      >
        <div className="wgc-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'start'
            }}
          >
            {/* Left Column: Concept description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="label-section accent" style={{ marginBottom: '16px', display: 'block' }}>
                HACKATHON THEME
              </span>
              <h2
                className="font-heading font-black text-text-primary"
                style={{ fontSize: 'var(--type-h2)', lineHeight: 1.05, marginBottom: '28px' }}
              >
                Building The Future of{' '}
                <em className="text-lime not-italic">Immersive Gaming.</em>
              </h2>
              <p
                className="font-body text-text-secondary"
                style={{ lineHeight: 1.8, fontSize: '15px', marginBottom: '20px' }}
              >
                AFK Hacks is envisioned as Asia&apos;s biggest gaming hackathon, bringing together developers, designers, storytellers, and gaming enthusiasts to innovate at the intersection of technology and immersive gameplay.
              </p>
              <p
                className="font-body text-text-secondary"
                style={{ lineHeight: 1.8, fontSize: '15px', marginBottom: '28px' }}
              >
                Inspired by the open-world chaos and creative freedom of the legendary Grand Theft Auto (GTA) series, the hackathon challenges participants to push the boundaries of interactive experiences. Set in a high-energy, sandbox-style environment, AFK Hacks encourages teams to build projects that capture the essence of GTA dynamic worlds, nonlinear storytelling, and player-driven narratives.
              </p>

              {/* GTA Vibe callout box */}
              <div
                style={{
                  background: 'rgba(170,223,46,0.03)',
                  border: '1px solid rgba(170,223,46,0.15)',
                  padding: '24px',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '3px', background: 'var(--lime)' }} />
                <span className="font-mono text-xs text-lime" style={{ fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  THE SANDBOX CONCEPT
                </span>
                <p className="font-body text-text-secondary" style={{ fontSize: '13.5px', lineHeight: 1.6 }}>
                  Build dynamic worlds, AI behavior scripts for smart NPCs, virtual economic simulators, custom modding suites, and branching storylines where players make actual choices.
                </p>
              </div>
            </motion.div>

            {/* Right Column: Domains Explorer */}
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '16px'
                }}
              >
                {DOMAINS.map((d, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--bg-border)',
                      padding: '28px 24px',
                      transition: 'border-color 0.2s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    whileHover={{ borderColor: 'var(--lime)' }}
                  >
                    <span style={{ fontSize: '28px', display: 'block', marginBottom: '16px' }}>
                      {d.icon}
                    </span>
                    <h4
                      className="font-body font-bold text-text-primary"
                      style={{ fontSize: '16px', marginBottom: '10px' }}
                    >
                      {d.title}
                    </h4>
                    <p
                      className="font-body text-text-secondary"
                      style={{ fontSize: '13px', lineHeight: 1.6 }}
                    >
                      {d.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ROADMAP / QUALIFIERS SECTION (3 MAIN EVENTS) ─────────────────── */}
      <AFKRoadmap />


      {/* ── 6. WHY PARTNER SECTION ────────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--bg-surface)',
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          borderBottom: '1px solid var(--bg-border)',
          position: 'relative'
        }}
      >
        <div className="wgc-container">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className="label-section accent">ECOSYSTEM IMPACT</span>
            <h2
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h2)' }}
            >
              Why Partner With AFK Hacks?
            </h2>
          </div>

          <PartnerTree />

          {/* Dynamic Partner Logos Ticker (Fetched from Main Site) */}
          {initialPartners.length > 0 && (
            <div style={{ marginTop: '56px', borderTop: '1px solid var(--bg-border)', paddingTop: '40px' }}>
              <p className="font-mono text-text-secondary text-[10px] text-center letter-spacing-[0.16em] uppercase mb-8">
                ECOSYSTEM SPONSORS & PARTNERS
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
                {initialPartners.map(partner => (
                  <a
                    key={partner.id}
                    href={partner.handle}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'var(--bg-void)',
                      border: '1px solid var(--bg-border)',
                      padding: '10px 20px',
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--lime)'
                      e.currentTarget.style.color = 'var(--lime)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--bg-border)'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }}
                  >
                    {partner.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 7. SPONSORSHIP TIERS SECTION ────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 'var(--section-py)',
          paddingBottom: 'var(--section-py)',
          borderBottom: '1px solid var(--bg-border)',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(170,223,46,0.04) 0%, transparent 70%)',
          zIndex: 1
        }} />

        <div className="wgc-container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label-section accent">COLLABORATION LEVEL</span>
            <h2
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h2)' }}
            >
              Sponsorship Tier Details
            </h2>
            <p className="font-body text-text-secondary" style={{ marginTop: '12px', fontSize: '15px' }}>
              Hover over a header to highlight that specific sponsorship channel.
            </p>
          </div>

          {/* Interactive Desktop Grid Table */}
          <div className="hidden lg:block overflow-x-auto">
            <div style={{ minWidth: '900px' }}>
              {/* Header row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2.5fr repeat(5, 1fr)',
                  borderBottom: '1px solid var(--bg-border)',
                  paddingBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="font-mono text-[10px] text-text-secondary letter-spacing-[0.16em]">
                    DELIVERABLES
                  </span>
                </div>
                {SPONSOR_TIERS.map((tier, tIdx) => {
                  const isHovered = hoveredCol === tIdx
                  return (
                    <div
                      key={tIdx}
                      onMouseEnter={() => setHoveredCol(tIdx)}
                      onMouseLeave={() => setHoveredCol(null)}
                      style={{
                        textAlign: 'center',
                        padding: '16px 8px',
                        background: isHovered ? 'rgba(170,223,46,0.06)' : 'transparent',
                        border: isHovered ? '1px solid rgba(170,223,46,0.2)' : '1px solid transparent',
                        borderRadius: '4px',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <span
                        className="font-bebas"
                        style={{ fontSize: '20px', color: tier.color, display: 'block', letterSpacing: '0.05em' }}
                      >
                        {tier.name}
                      </span>
                      <span
                        className="font-mono text-text-primary font-bold"
                        style={{ fontSize: '12px', marginTop: '6px', display: 'block' }}
                      >
                        {tier.price}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Rows */}
              {SPONSOR_FEATURES.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.5fr repeat(5, 1fr)',
                    borderBottom: '1px solid var(--bg-border)',
                    alignItems: 'center',
                    padding: '16px 0'
                  }}
                  className="hover:bg-bg-surface/40 transition-colors"
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="font-body text-text-primary" style={{ fontSize: '13.5px' }}>
                      {feat.name}
                    </span>
                  </div>

                  {feat.tiers.map((hasIt, tIdx) => {
                    const isHovered = hoveredCol === tIdx
                    return (
                      <div
                        key={tIdx}
                        onMouseEnter={() => setHoveredCol(tIdx)}
                        onMouseLeave={() => setHoveredCol(null)}
                        style={{
                          textAlign: 'center',
                          padding: '4px 8px',
                          background: isHovered ? 'rgba(170,223,46,0.03)' : 'transparent',
                          transition: 'all 0.2s ease',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {hasIt ? (
                          <Check size={18} style={{ color: 'var(--lime)', filter: 'drop-shadow(0 0 4px rgba(170,223,46,0.3))' }} />
                        ) : (
                          <X size={16} style={{ color: 'var(--bg-border)' }} />
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Tier List Layout */}
          <div className="lg:hidden flex flex-col gap-6">
            {SPONSOR_TIERS.map((tier, tIdx) => (
              <div
                key={tIdx}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--bg-border)',
                  padding: '24px',
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--bg-border)', paddingBottom: '12px' }}>
                  <span className="font-bebas text-2xl" style={{ color: tier.color }}>{tier.name}</span>
                  <span className="font-mono text-text-primary font-bold text-sm">{tier.price}</span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {SPONSOR_FEATURES.map((feat, fIdx) => {
                    const hasIt = feat.tiers[tIdx]
                    return (
                      <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: hasIt ? 1 : 0.4 }}>
                        {hasIt ? (
                          <Check size={14} style={{ color: 'var(--lime)', flexShrink: 0 }} />
                        ) : (
                          <X size={14} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                        )}
                        <span className="font-body" style={{ fontSize: '12px', color: hasIt ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                          {feat.name}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom sponsor callout */}
          <div style={{ marginTop: '56px', textAlign: 'center' }}>
            <button
              onClick={() => openModal('partner')}
              className="btn-primary"
              style={{ padding: '14px 32px', fontSize: '13px' }}
            >
              APPLY FOR SPONSORSHIP <span>↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 8. FOOTER SECTION (CUSTOM SUB-FOOTER) ─────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid var(--bg-border)',
          background: 'var(--bg-surface)',
          paddingTop: '56px',
          paddingBottom: '56px'
        }}
      >
        <div className="wgc-container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px', alignItems: 'center' }}>
            <div>
              <span className="font-mono text-[10px] text-text-secondary letter-spacing-[0.16em] display-block">
                HACKATHON HOST
              </span>
              <h4 className="font-bebas text-text-primary text-2xl" style={{ marginTop: '4px', letterSpacing: '0.04em' }}>
                WORLD GAMING COUNCIL
              </h4>
              <p className="font-body text-text-secondary" style={{ fontSize: '12px', marginTop: '6px' }}>
                Setting governing standards for the next era of competitive gaming in Asia.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                onClick={() => openModal('builder')}
                style={{ fontSize: '12px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                className="hover:text-lime transition-colors font-mono"
              >
                BUILDER REGISTRATION
              </button>
              <button
                onClick={() => openModal('partner')}
                style={{ fontSize: '12px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                className="hover:text-lime transition-colors font-mono"
              >
                SPONSOR CHANNEL
              </button>
            </div>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid var(--bg-border)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px' }}>
            <span className="font-mono text-text-secondary" style={{ fontSize: '10px' }}>
              © 2026 WORLD GAMING COUNCIL. ALL RIGHTS RESERVED.
            </span>
            <span className="font-mono text-text-secondary" style={{ fontSize: '10px' }}>
              GTA VI Launch Arena Campaign
            </span>
          </div>
        </div>
      </footer>

      {/* ── 9. SLIDE-OVER REGISTRATION MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              justifyContent: 'flex-end',
              zIndex: 50,
              pointerEvents: 'auto'
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#000'
              }}
            />

            {/* Modal Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '560px',
                height: '100%',
                background: 'var(--bg-surface)',
                borderLeft: '1px solid var(--bg-border)',
                boxShadow: '-10px 0 40px rgba(0,0,0,0.8)',
                zIndex: 51,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Green indicator bar on side */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '3px', background: 'var(--lime)' }} />

              {/* Close Button & Header */}
              <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--bg-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="font-mono text-[9px] text-lime" style={{ fontWeight: 700, letterSpacing: '0.14em', display: 'block', textTransform: 'uppercase' }}>
                    {formType === 'builder' ? 'HACKATHON BUILDER PIPELINE' : 'PARTNERSHIP & SPONSOR LOG'}
                  </span>
                  <h3 className="font-heading font-black text-text-primary" style={{ fontSize: '20px', marginTop: '4px' }}>
                    {formType === 'builder' ? 'Apply to Register' : 'Become a Partner'}
                  </h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--bg-border)',
                    padding: '8px',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    marginLeft: 'auto'
                  }}
                  className="hover:border-lime hover:text-lime transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                {formSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div
                      style={{
                        width: '72px',
                        height: '72px',
                        margin: '0 auto 24px',
                        background: 'rgba(170,223,46,0.1)',
                        border: '1px solid var(--lime)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Check size={32} style={{ color: 'var(--lime)' }} />
                    </div>
                    <h4 className="font-heading font-bold text-text-primary" style={{ fontSize: '20px', marginBottom: '12px' }}>
                      Transmission Complete.
                    </h4>
                    <p className="font-body text-text-secondary" style={{ fontSize: '14px', lineHeight: 1.6, maxWidth: '360px', margin: '0 auto 20px' }}>
                      Your query has been logged into WGC&apos;s database. A confirmation mail is heading to your inbox.
                    </p>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="btn-secondary"
                      style={{ padding: '10px 24px', fontSize: '12px' }}
                    >
                      CLOSE PIPELINE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* Toggle form type inside modal */}
                    <div>
                      <label className="font-mono text-[9px] text-text-secondary" style={{ letterSpacing: '0.12em', display: 'block', marginBottom: '8px' }}>
                        APPLICATION STREAM
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[
                          { val: 'builder', label: 'Builder / Developer', icon: '🛠️' },
                          { val: 'partner', label: 'Partner / Sponsor', icon: '🤝' }
                        ].map((t, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setFormType(t.val as 'builder' | 'partner')
                              updateForm('type', t.val)
                            }}
                            style={{
                              flex: 1,
                              padding: '10px 14px',
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              background: formType === t.val ? 'var(--lime)' : 'transparent',
                              color: formType === t.val ? 'var(--text-inverse)' : 'var(--text-secondary)',
                              border: `1px solid ${formType === t.val ? 'var(--lime)' : 'var(--bg-border)'}`,
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                          >
                            <span>{t.icon}</span>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label htmlFor="modal-name" className="font-mono text-[9px] text-text-secondary" style={{ letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
                        FULL NAME
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => updateForm('name', e.target.value)}
                        placeholder="Master builder name"
                        style={{
                          width: '100%',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--bg-border)',
                          padding: '12px 16px',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="modal-email" className="font-mono text-[9px] text-text-secondary" style={{ letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
                        EMAIL ADDRESS
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => updateForm('email', e.target.value)}
                        placeholder="you@email.com"
                        style={{
                          width: '100%',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--bg-border)',
                          padding: '12px 16px',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    {/* Organization / College */}
                    <div>
                      <label htmlFor="modal-org" className="font-mono text-[9px] text-text-secondary" style={{ letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
                        {formType === 'builder' ? 'COLLEGE / INDEPENDENT' : 'COMPANY / ORG'}
                      </label>
                      <input
                        id="modal-org"
                        type="text"
                        value={formData.organization}
                        onChange={e => updateForm('organization', e.target.value)}
                        placeholder={formType === 'builder' ? 'IIT Delhi, BITS Pilani, etc.' : 'Brand or organization name'}
                        style={{
                          width: '100%',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--bg-border)',
                          padding: '12px 16px',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="modal-city" className="font-mono text-[9px] text-text-secondary" style={{ letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
                        CITY / LOCATION
                      </label>
                      <input
                        id="modal-city"
                        type="text"
                        value={formData.city}
                        onChange={e => updateForm('city', e.target.value)}
                        placeholder="Delhi, Mumbai, Singapore, etc."
                        style={{
                          width: '100%',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--bg-border)',
                          padding: '12px 16px',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    {/* Message / Cover Note */}
                    <div>
                      <label htmlFor="modal-message" className="font-mono text-[9px] text-text-secondary" style={{ letterSpacing: '0.12em', display: 'block', marginBottom: '6px' }}>
                        {formType === 'builder' ? 'STACK & PROJECT INTENT' : 'PARTNERSHIP BRIEF'}
                      </label>
                      <textarea
                        id="modal-message"
                        rows={4}
                        value={formData.message}
                        onChange={e => updateForm('message', e.target.value)}
                        placeholder={formType === 'builder' ? 'Tell us what tech stack you prefer, links to your Github/projects, and what you aim to build...' : 'Describe how your organization wants to collaborate, sponsorship levels, or in-kind assets...'}
                        style={{
                          width: '100%',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--bg-border)',
                          padding: '12px 16px',
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-body), sans-serif',
                          fontSize: '14px',
                          outline: 'none',
                          resize: 'none'
                        }}
                      />
                    </div>

                    {formError && (
                      <p className="font-mono" style={{ fontSize: '11px', color: '#ff6b6b', margin: 0 }}>
                        ⚠ {formError}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '16px',
                        fontSize: '13px',
                        opacity: formLoading ? 0.6 : 1,
                        cursor: formLoading ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {formLoading ? 'TRANSMITTING...' : 'ESTABLISH LINK'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
