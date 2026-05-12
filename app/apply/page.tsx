'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const APPLICANT_TYPES = [
  { value: 'builder',   label: 'Builder / Developer', icon: '🛠️' },
  { value: 'organizer', label: 'Event Organizer',      icon: '🎪' },
  { value: 'partner',   label: 'Partner / Sponsor',    icon: '🤝' },
  { value: 'media',     label: 'Media',                icon: '📡' },
  { value: 'kol',       label: 'KOL / Influencer',     icon: '⭐' },
] as const

const FOLLOWERS_RANGES = [
  '1K – 10K',
  '10K – 50K',
  '50K – 250K',
  '250K – 1M',
  '1M+',
]

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: 'builder',
    message: '',
    socialHandle: '',
    followersRange: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: string, val: string) =>
    setFormData(prev => ({ ...prev, [field]: val }))

  const isKol = formData.type === 'kol'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--bg-void)',
    border: '1px solid var(--bg-border)',
    padding: '12px 16px',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body), sans-serif',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-mono), monospace',
    fontSize: '10px',
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)',
    marginBottom: '8px',
  }

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = 'var(--lime-dim)')
  const blurHandler  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.target.style.borderColor = 'var(--bg-border)')

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
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(170,223,46,0.06) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative', maxWidth: '720px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>APPLY</span>
            <h1
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}
            >
              Join the{' '}
              <em className="text-lime not-italic">Council</em>
            </h1>
            <p className="font-body text-text-secondary" style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', maxWidth: '560px', lineHeight: 1.75 }}>
              Whether you&apos;re a builder, organizer, brand, or influencer looking to amplify the ecosystem —
              applying to WGC is your first move.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FORM SECTION ────────────────────────────────────────── */}
      <section style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
        <div className="wgc-container" style={{ maxWidth: '680px' }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                style={{ textAlign: 'center', padding: '80px 0' }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 32px',
                    background: 'rgba(170,223,46,0.1)',
                    border: '1px solid var(--lime)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '36px', color: 'var(--lime)' }}>✓</span>
                </motion.div>
                <h2
                  className="font-heading font-bold text-text-primary"
                  style={{ fontSize: 'var(--type-h3)', marginBottom: '16px' }}
                >
                  You&apos;re on the Radar
                </h2>
                <p className="font-body text-text-secondary" style={{ fontSize: '15px', lineHeight: 1.75, maxWidth: '420px', margin: '0 auto 12px' }}>
                  Your application has been received. Check your inbox — we&apos;ve sent you a confirmation.
                </p>
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.06em', opacity: 0.6 }}>
                  We&apos;ll review and respond within 7 business days.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 }}
              >
                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--bg-border)',
                    padding: 'clamp(28px, 4vw, 48px)',
                    position: 'relative',
                  }}
                >
                  {/* Top lime accent stripe */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, var(--lime), transparent)' }} />

                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Application type */}
                    <div>
                      <label style={labelStyle}>I am a…</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {APPLICANT_TYPES.map(t => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => update('type', t.value)}
                            style={{
                              padding: '10px 16px',
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.08em',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              background: formData.type === t.value ? 'var(--lime)' : 'transparent',
                              color: formData.type === t.value ? 'var(--text-inverse)' : 'var(--text-secondary)',
                              border: `1px solid ${formData.type === t.value ? 'var(--lime)' : 'var(--bg-border)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                            }}
                          >
                            <span>{t.icon}</span>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name + Email row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      <div>
                        <label htmlFor="apply-name" style={labelStyle}>Full Name</label>
                        <input
                          id="apply-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => update('name', e.target.value)}
                          placeholder="Your name"
                          style={inputStyle}
                          onFocus={focusHandler}
                          onBlur={blurHandler}
                        />
                      </div>
                      <div>
                        <label htmlFor="apply-email" style={labelStyle}>Email Address</label>
                        <input
                          id="apply-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => update('email', e.target.value)}
                          placeholder="you@email.com"
                          style={inputStyle}
                          onFocus={focusHandler}
                          onBlur={blurHandler}
                        />
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label htmlFor="apply-org" style={labelStyle}>
                        {isKol ? 'Agency / Management (optional)' : 'Organization'}
                      </label>
                      <input
                        id="apply-org"
                        type="text"
                        value={formData.organization}
                        onChange={e => update('organization', e.target.value)}
                        placeholder={isKol ? 'Agency or management company' : 'Company or org name (optional)'}
                        style={inputStyle}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                      />
                    </div>

                    {/* KOL-specific fields */}
                    <AnimatePresence>
                      {isKol && (
                        <motion.div
                          key="kol-fields"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            {/* Social Handle */}
                            <div>
                              <label htmlFor="apply-social" style={labelStyle}>Primary Social Handle</label>
                              <input
                                id="apply-social"
                                type="text"
                                value={formData.socialHandle}
                                onChange={e => update('socialHandle', e.target.value)}
                                placeholder="@yourhandle (Twitter / X, TikTok, Instagram…)"
                                style={inputStyle}
                                onFocus={focusHandler}
                                onBlur={blurHandler}
                              />
                            </div>

                            {/* Followers range */}
                            <div>
                              <label htmlFor="apply-followers" style={labelStyle}>Follower Range</label>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {FOLLOWERS_RANGES.map(range => (
                                  <button
                                    key={range}
                                    type="button"
                                    onClick={() => update('followersRange', range)}
                                    style={{
                                      padding: '8px 14px',
                                      fontFamily: 'var(--font-mono), monospace',
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      letterSpacing: '0.06em',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s ease',
                                      background: formData.followersRange === range ? 'rgba(170,223,46,0.15)' : 'transparent',
                                      color: formData.followersRange === range ? 'var(--lime)' : 'var(--text-secondary)',
                                      border: `1px solid ${formData.followersRange === range ? 'var(--lime-dim)' : 'var(--bg-border)'}`,
                                    }}
                                  >
                                    {range}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* KOL callout */}
                            <div style={{
                              padding: '16px',
                              background: 'rgba(170,223,46,0.04)',
                              border: '1px solid rgba(170,223,46,0.15)',
                              display: 'flex',
                              gap: '12px',
                              alignItems: 'flex-start',
                            }}>
                              <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>⭐</span>
                              <div>
                                <p className="font-mono" style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--lime)', textTransform: 'uppercase' }}>KOL Programme</p>
                                <p className="font-body text-text-secondary" style={{ margin: 0, fontSize: '13px', lineHeight: 1.6 }}>
                                  As a WGC KOL, you get exclusive content drops, event access, and co-marketing opportunities across the Web3 gaming ecosystem.
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Message */}
                    <div>
                      <label htmlFor="apply-message" style={labelStyle}>
                        {isKol ? 'Your Pitch' : 'Why WGC?'}
                      </label>
                      <textarea
                        id="apply-message"
                        rows={5}
                        value={formData.message}
                        onChange={e => update('message', e.target.value)}
                        placeholder={isKol
                          ? 'Tell us about your audience, content style, and how you want to collaborate…'
                          : 'Tell us why you want to join, what you bring to the ecosystem…'
                        }
                        style={{
                          ...inputStyle,
                          resize: 'none',
                          verticalAlign: 'top',
                        }}
                        onFocus={focusHandler}
                        onBlur={blurHandler}
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="font-mono" style={{ fontSize: '12px', color: '#ff6b6b', margin: 0 }}>
                        ⚠ {error}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '16px',
                        fontSize: '14px',
                        opacity: loading ? 0.6 : 1,
                        cursor: loading ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {loading ? 'SUBMITTING…' : (
                        <>SUBMIT APPLICATION <span>↗</span></>
                      )}
                    </button>
                  </form>
                </div>

                {/* Fine print */}
                <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginTop: '16px', lineHeight: 1.6, letterSpacing: '0.06em' }}>
                  Applications are reviewed within 7 business days. A confirmation will be sent to the email you provide.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
