'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { PastEventSpotlight } from '@/lib/airtable'

interface SpotlightCarouselProps {
  spotlights?: PastEventSpotlight[]
}

export function SpotlightCarousel({ spotlights }: SpotlightCarouselProps) {
  const data = spotlights ?? []

  // Don't render the section at all if there are no images yet
  if (data.length === 0) return null

  return <SpotlightInner data={data} />
}

function SpotlightInner({ data }: { data: PastEventSpotlight[] }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [hovering, setHovering] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback((next: number, dir?: number) => {
    const clamped = (next + data.length) % data.length
    setDirection(dir ?? (next > current ? 1 : -1))
    setCurrent(clamped)
  }, [current, data.length])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => go(current + 1, 1), 5000)
  }, [current, go])

  useEffect(() => {
    if (!hovering) startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [current, hovering, startTimer])

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-60%' : '60%', opacity: 0, scale: 0.97 }),
  }

  return (
    <section
      id="spotlight"
      style={{
        width: '100%',
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--bg-border)',
      }}
    >
      <div className="wgc-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}
        >
          <div>
            <span className="label-section accent" style={{ display: 'block', marginBottom: '8px' }}>PAST EVENTS</span>
            <h2 className="font-heading font-bold text-text-primary" style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1 }}>
              Event Spotlight
            </h2>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {data.map((_, i) => (
              <button
                key={i}
                onClick={() => { if (timerRef.current) clearInterval(timerRef.current); go(i, i > current ? 1 : -1) }}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? '28px' : '6px',
                  height: '4px',
                  background: i === current ? 'var(--lime)' : 'var(--bg-border)',
                  border: 'none', cursor: 'pointer', padding: 0,
                  transition: 'all 0.35s ease', borderRadius: '2px',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ position: 'relative' }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Primary large slide */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(320px, 45vw, 560px)',
              border: '1px solid var(--bg-border)',
              overflow: 'hidden',
              background: '#080c0f',
            }}
          >
            {/* Progress bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--bg-border)', zIndex: 20 }}>
              {!hovering && (
                <motion.div
                  key={current}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  style={{ height: '100%', background: 'var(--lime)' }}
                />
              )}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image
                  src={data[current].imageUrl}
                  alt={data[current].caption || `WGC Event ${current + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority={current === 0}
                />

                {/* Subtle dark overlay at bottom */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
                  background: 'linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Caption */}
                {data[current].caption && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: 'absolute', bottom: '16px', left: '16px',
                      background: 'rgba(5,5,5,0.8)', border: '1px solid var(--bg-border)',
                      padding: '6px 12px', backdropFilter: 'blur(6px)',
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                      {data[current].caption}
                    </span>
                  </motion.div>
                )}

                {/* Slide counter */}
                <div style={{
                  position: 'absolute', bottom: '16px', right: '16px',
                  background: 'rgba(5,5,5,0.8)', border: '1px solid var(--bg-border)',
                  padding: '5px 10px', backdropFilter: 'blur(6px)',
                }}>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                    {String(current + 1).padStart(2, '0')} / {String(data.length).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow navigation */}
            <button
              onClick={() => { if (timerRef.current) clearInterval(timerRef.current); go(current - 1, -1) }}
              aria-label="Previous"
              style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', zIndex: 15,
                background: 'rgba(5,5,5,0.75)', border: '1px solid var(--bg-border)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)', transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime)'; e.currentTarget.style.background = 'rgba(170,223,46,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.background = 'rgba(5,5,5,0.75)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => { if (timerRef.current) clearInterval(timerRef.current); go(current + 1, 1) }}
              aria-label="Next"
              style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                width: '40px', height: '40px', zIndex: 15,
                background: 'rgba(5,5,5,0.75)', border: '1px solid var(--bg-border)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(4px)', transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lime)'; e.currentTarget.style.background = 'rgba(170,223,46,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.background = 'rgba(5,5,5,0.75)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Thumbnail strip — shows when there are 3+ images */}
          {data.length >= 3 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(data.length, 6)}, 1fr)`,
                gap: '4px',
                marginTop: '4px',
              }}
            >
              {data.slice(0, 6).map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => { if (timerRef.current) clearInterval(timerRef.current); go(i, i > current ? 1 : -1) }}
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                    background: '#080c0f',
                    border: i === current ? '1px solid var(--lime)' : '1px solid var(--bg-border)',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'border-color 0.2s',
                  }}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.caption || `Thumbnail ${i + 1}`}
                    fill
                    style={{
                      objectFit: 'cover',
                      opacity: i === current ? 1 : 0.45,
                      transition: 'opacity 0.2s',
                      filter: i === current ? 'none' : 'grayscale(40%)',
                    }}
                    sizes="15vw"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
