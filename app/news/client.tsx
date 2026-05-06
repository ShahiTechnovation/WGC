'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { NEWS_POSTS, type NewsPost } from '@/lib/constants'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
})

const CATEGORIES = ['Announcement', 'News', 'Partnership'] as const

export default function NewsPage({ posts = NEWS_POSTS }: { posts?: NewsPost[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = posts.filter(post => {
    const q = searchQuery.toLowerCase()
    const matchesSearch = post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
          background: 'radial-gradient(ellipse 50% 60% at 100% 30%, rgba(170,223,46,0.04) 0%, transparent 70%)',
        }} />
        <div className="wgc-container" style={{ position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="label-section accent" style={{ marginBottom: '20px', display: 'block' }}>INTEL</span>
            <h1
              className="font-heading font-black text-text-primary"
              style={{ fontSize: 'var(--type-h1)', lineHeight: 1.05, marginBottom: '20px' }}
            >
              WGC News &amp;{' '}
              <em className="text-lime not-italic">Insights</em>
            </h1>
            <p className="font-body text-text-secondary" style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', maxWidth: '520px', lineHeight: 1.75 }}>
              The latest from the council. Events, partnerships, and the future of gaming in Asia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SEARCH & FILTER BAR ─────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--bg-border)', background: 'var(--bg-surface)' }}>
        <div className="wgc-container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
              padding: '20px 0',
            }}
          >
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <svg
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--bg-border)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '12px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--lime-dim)')}
                onBlur={e => (e.target.style.borderColor = 'var(--bg-border)')}
              />
            </div>

            {/* Category filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  border: '1px solid var(--bg-border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: !selectedCategory ? 'var(--lime)' : 'transparent',
                  color: !selectedCategory ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  borderColor: !selectedCategory ? 'var(--lime)' : 'var(--bg-border)',
                }}
              >
                ALL
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                  style={{
                    padding: '8px 16px',
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    border: '1px solid var(--bg-border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: selectedCategory === cat ? 'var(--lime)' : 'transparent',
                    color: selectedCategory === cat ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    borderColor: selectedCategory === cat ? 'var(--lime)' : 'var(--bg-border)',
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES LIST ────────────────────────────────────────── */}
      <section style={{ paddingTop: '48px', paddingBottom: 'var(--section-py)' }}>
        <div className="wgc-container">
          {filteredPosts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p className="font-mono text-text-secondary" style={{ fontSize: '14px' }}>
                No articles found.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--bg-border)', border: '1px solid var(--bg-border)' }}>
              {filteredPosts.map((post, i) => (
                <motion.div key={post._id} {...fadeUp(i * 0.05)}>
                  <Link
                    href={`/news/${post.slug}`}
                    style={{ display: 'block', background: 'var(--bg-surface)', textDecoration: 'none', transition: 'background 0.2s ease' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--bg-surface)'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '24px',
                        padding: '28px 32px',
                      }}
                    >
                      {/* Left: meta */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          minWidth: '160px',
                          flexShrink: 0,
                          paddingTop: '3px',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            background: 'rgba(170,223,46,0.1)',
                            color: 'var(--lime)',
                            fontFamily: 'var(--font-mono), monospace',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.06em' }}>
                          {formatDate(post.publishedAt)}
                        </span>
                      </div>

                      {/* Center: content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          className="font-heading font-bold text-text-primary"
                          style={{ fontSize: 'clamp(16px, 1.4vw, 20px)', lineHeight: 1.3, marginBottom: '10px', transition: 'color 0.2s ease' }}
                        >
                          {post.title}
                        </h3>
                        <p
                          className="font-body text-text-secondary"
                          style={{ fontSize: '14px', lineHeight: 1.65, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const }}
                        >
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Right: arrow */}
                      <span
                        className="text-lime"
                        style={{ fontSize: '18px', flexShrink: 0, marginTop: '4px', opacity: 0.7, transition: 'opacity 0.2s ease' }}
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Result count */}
          {filteredPosts.length > 0 && (
            <p className="font-mono text-text-secondary" style={{ fontSize: '11px', marginTop: '16px', textAlign: 'right', letterSpacing: '0.08em' }}>
              {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
