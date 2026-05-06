'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const APPLICANT_TYPES = [
  { value: 'builder', label: 'Builder / Developer' },
  { value: 'organizer', label: 'Event Organizer' },
  { value: 'partner', label: 'Partner / Sponsor' },
  { value: 'media', label: 'Media' },
] as const

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    type: 'builder',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: string, val: string) =>
    setFormData(prev => ({ ...prev, [field]: val }))

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
            <p className="font-body text-text-secondary" style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', maxWidth: '520px', lineHeight: 1.75 }}>
              Whether you&apos;re a builder, organizer, or brand looking to partner — applying to WGC is your first step.
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
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    margin: '0 auto 32px',
                    background: 'rgba(170,223,46,0.1)',
                    border: '1px solid var(--lime)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '32px', color: 'var(--lime)' }}>✓</span>
                </div>
                <h2
                  className="font-heading font-bold text-text-primary"
                  style={{ fontSize: 'var(--type-h3)', marginBottom: '16px' }}
                >
                  Application Received
                </h2>
                <p className="font-body text-text-secondary" style={{ fontSize: '15px', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto' }}>
                  We&apos;ll review your application and get back to you within 7 business days.
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
                          onFocus={e => (e.target.style.borderColor = 'var(--lime-dim)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--bg-border)')}
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
                          onFocus={e => (e.target.style.borderColor = 'var(--lime-dim)')}
                          onBlur={e => (e.target.style.borderColor = 'var(--bg-border)')}
                        />
                      </div>
                    </div>

                    {/* Organization */}
                    <div>
                      <label htmlFor="apply-org" style={labelStyle}>Organization</label>
                      <input
                        id="apply-org"
                        type="text"
                        value={formData.organization}
                        onChange={e => update('organization', e.target.value)}
                        placeholder="Company or org name (optional)"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'var(--lime-dim)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--bg-border)')}
                      />
                    </div>

                    {/* Application type */}
                    <div>
                      <label htmlFor="apply-type" style={labelStyle}>Application Type</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {APPLICANT_TYPES.map(t => (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => update('type', t.value)}
                            style={{
                              padding: '10px 18px',
                              fontFamily: 'var(--font-mono), monospace',
                              fontSize: '11px',
                              fontWeight: 600,
                              letterSpacing: '0.08em',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              background: formData.type === t.value ? 'var(--lime)' : 'transparent',
                              color: formData.type === t.value ? 'var(--text-inverse)' : 'var(--text-secondary)',
                              border: `1px solid ${formData.type === t.value ? 'var(--lime)' : 'var(--bg-border)'}`,
                            }}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="apply-message" style={labelStyle}>Why WGC?</label>
                      <textarea
                        id="apply-message"
                        rows={5}
                        value={formData.message}
                        onChange={e => update('message', e.target.value)}
                        placeholder="Tell us why you want to join, what you bring to the ecosystem..."
                        style={{
                          ...inputStyle,
                          resize: 'none',
                          verticalAlign: 'top',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--lime-dim)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--bg-border)')}
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="font-mono" style={{ fontSize: '12px', color: '#ff6b6b' }}>
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
                  Applications are reviewed within 7 business days. We&apos;ll contact you at the email provided.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
