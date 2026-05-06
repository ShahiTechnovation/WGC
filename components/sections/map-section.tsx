'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MAP_CITIES } from '@/lib/constants'

// City coordinates [lng, lat]
const CITY_COORDS: Record<string, [number, number]> = {
  delhi: [77.1025, 28.7041],
  mumbai: [72.8777, 19.0760],
  bangalore: [77.5946, 12.9716],
  seoul: [126.9780, 37.5665],
  tokyo: [139.6917, 35.6895],
  singapore: [103.8198, 1.3521],
  jakarta: [106.8456, -6.2088],
  bangkok: [100.5018, 13.7563],
  kualalumpur: [101.6869, 3.1390],
  dubai: [55.2708, 25.2048],
  hongkong: [114.1694, 22.3193],
  taipei: [121.5654, 25.0330],
}

// Asia center
const INITIAL_CENTER: [number, number] = [100, 25]
const INITIAL_ZOOM = 1.8
const GLOBE_ZOOM = 1.5

interface CityPopup {
  id: string
  name: string
  status: string
  quarter: string
  builders: string
}

export function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [hoveredCity, setHoveredCity] = useState<CityPopup | null>(null)
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 })
  const [tokenMissing, setTokenMissing] = useState(false)

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token || token.includes('REPLACE_WITH_REAL_TOKEN')) {
      setTokenMissing(true)
      return
    }

    let mapboxgl: typeof import('mapbox-gl')
    let map: import('mapbox-gl').Map

    import('mapbox-gl').then((mb) => {
      mapboxgl = mb.default as unknown as typeof import('mapbox-gl')
      // @ts-ignore
      mapboxgl.accessToken = token

      if (!mapContainer.current) return

      map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: INITIAL_CENTER,
        zoom: GLOBE_ZOOM,
        projection: 'globe' as unknown as mapboxgl.ProjectionSpecification,
        attributionControl: false,
        logoPosition: 'bottom-right',
        antialias: true,
      })

      mapRef.current = map

      map.on('style.load', () => {
        // Dark atmosphere / fog
        map.setFog({
          color: 'rgb(5, 5, 5)',
          'high-color': 'rgb(10, 10, 10)',
          'horizon-blend': 0.08,
          'space-color': 'rgb(2, 2, 2)',
          'star-intensity': 0.6,
        } as Parameters<typeof map.setFog>[0])

        // Override water + land colors for dark editorial look
        map.setPaintProperty('water', 'fill-color', '#0a0f12')
        map.setPaintProperty('land', 'background-color', '#0e1014')

        // Add city markers
        MAP_CITIES.forEach((city) => {
          const coords = CITY_COORDS[city.id]
          if (!coords) return

          // Custom DOM marker
          const el = document.createElement('div')
          el.style.cssText = `
            position: relative;
            width: 12px;
            height: 12px;
            cursor: pointer;
          `

          // Outer pulse ring
          const ring = document.createElement('div')
          ring.style.cssText = `
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 1px solid ${city.status === 'confirmed' ? '#AADF2E' : '#666666'};
            animation: pulse-ring 2s ease-out infinite;
            opacity: 0.5;
          `

          // Inner dot
          const dot = document.createElement('div')
          dot.style.cssText = `
            position: absolute;
            inset: 2px;
            border-radius: 50%;
            background: ${city.status === 'confirmed' ? '#AADF2E' : '#888888'};
            box-shadow: ${city.status === 'confirmed' ? '0 0 8px rgba(170,223,46,0.8)' : 'none'};
          `

          el.appendChild(ring)
          el.appendChild(dot)

          // Hover events
          el.addEventListener('mouseenter', (e) => {
            const rect = el.getBoundingClientRect()
            const container = mapContainer.current!.getBoundingClientRect()
            setPopupPos({
              x: rect.left - container.left + 16,
              y: rect.top - container.top - 10,
            })
            setHoveredCity({
              id: city.id,
              name: city.name,
              status: city.status,
              quarter: city.quarter,
              builders: city.builders,
            })
            dot.style.transform = 'scale(1.5)'
          })

          el.addEventListener('mouseleave', () => {
            setHoveredCity(null)
            dot.style.transform = 'scale(1)'
          })

          const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
            .setLngLat(coords)
            .addTo(map)

          markersRef.current.push(marker)
        })

        // Auto-rotate the globe slowly
        let rotateStart: number
        const secondsPerRevolution = 120
        const maxSpinZoom = 5
        const slowSpinZoom = 3
        let userInteracting = false
        let spinEnabled = true

        function spinGlobe() {
          const zoom = map.getZoom()
          if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution
            if (zoom > slowSpinZoom) {
              const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom)
              distancePerSecond *= zoomDif
            }
            const center = map.getCenter()
            center.lng -= distancePerSecond / 60
            map.easeTo({ center, duration: 1000, easing: (n) => n })
          }
        }

        map.on('mousedown', () => { userInteracting = true })
        map.on('dragstart', () => { userInteracting = true })
        map.on('mouseup', () => { userInteracting = false; spinGlobe() })
        map.on('touchend', () => { userInteracting = false; spinGlobe() })
        map.on('moveend', () => { spinGlobe() })

        spinGlobe()
        setMapLoaded(true)
      })
    })

    return () => {
      markersRef.current.forEach(m => m.remove())
      markersRef.current = []
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  const confirmedCount = MAP_CITIES.filter(c => c.status === 'confirmed').length
  const upcomingCount = MAP_CITIES.filter(c => c.status === 'upcoming').length

  return (
    <section
      id="map"
      style={{
        width: '100%',
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        background: 'var(--bg-void)',
        borderTop: '1px solid var(--bg-border)',
      }}
    >
      {/* Inject pulse animation */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          70% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        .mapboxgl-ctrl-logo { opacity: 0.3 !important; filter: grayscale(1); }
        .mapboxgl-ctrl-attrib { display: none !important; }
      `}</style>

      <div className="wgc-container">
        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}
        >
          <div>
            <span className="label-section accent">WHERE WE OPERATE</span>
            <h2
              className="font-playfair font-bold text-text-primary"
              style={{ fontSize: 'var(--type-h2)', lineHeight: 1.1, marginTop: '4px' }}
            >
              Every major city.<br />
              <em className="not-italic" style={{ fontStyle: 'italic' }}>Every serious builder.</em>
            </h2>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'flex', border: '1px solid var(--bg-border)', flexShrink: 0 }}>
            {[
              { val: '20+', label: 'Cities' },
              { val: '12+', label: 'Nations' },
              { val: 'Asia', label: 'Wide' },
              { val: 'Nov 19', label: '2026' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '12px 20px',
                  borderLeft: i > 0 ? '1px solid var(--bg-border)' : 'none',
                  textAlign: 'center',
                  minWidth: '72px',
                }}
              >
                <p className="font-bebas text-lime" style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1 }}>
                  {s.val}
                </p>
                <p className="font-mono text-text-secondary" style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: '3px' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Globe Container ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(400px, 55vw, 620px)',
            border: '1px solid var(--bg-border)',
            overflow: 'hidden',
            background: '#020408',
          }}
        >
          {/* Mapbox map div */}
          <div ref={mapContainer} style={{ position: 'absolute', inset: 0 }} />

          {/* Loading overlay */}
          {!mapLoaded && !tokenMissing && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#020408', flexDirection: 'column', gap: '16px',
            }}>
              <div style={{
                width: '40px', height: '40px', border: '1px solid var(--lime)',
                borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite',
              }} />
              <p className="font-mono text-text-secondary" style={{ fontSize: '11px', letterSpacing: '0.14em' }}>
                LOADING GLOBE...
              </p>
            </div>
          )}

          {/* Token missing fallback */}
          {tokenMissing && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#020408', flexDirection: 'column', gap: '12px', padding: '24px',
            }}>
              <div style={{
                width: '48px', height: '48px', border: '1px solid var(--lime)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '20px' }}>🌐</span>
              </div>
              <p className="font-mono text-text-primary" style={{ fontSize: '13px', fontWeight: 600, textAlign: 'center' }}>
                MAPBOX TOKEN REQUIRED
              </p>
              <p className="font-mono text-text-secondary" style={{ fontSize: '11px', textAlign: 'center', maxWidth: '320px', lineHeight: 1.7 }}>
                Add your token to <code style={{ color: 'var(--lime)' }}>.env.local</code>:<br />
                <code style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>NEXT_PUBLIC_MAPBOX_TOKEN=pk.ey...</code>
              </p>
              <a
                href="https://account.mapbox.com/access-tokens/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '8px', padding: '10px 20px', border: '1px solid var(--lime)',
                  color: 'var(--lime)', fontFamily: 'var(--font-mono), monospace',
                  fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none',
                  textTransform: 'uppercase', transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(170,223,46,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                Get Free Token →
              </a>
            </div>
          )}

          {/* City hover tooltip */}
          <AnimatePresence>
            {hoveredCity && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  left: popupPos.x,
                  top: popupPos.y,
                  transform: 'translateY(-100%)',
                  background: 'rgba(5,5,5,0.95)',
                  border: '1px solid var(--bg-border)',
                  borderTop: '2px solid var(--lime)',
                  padding: '12px 16px',
                  minWidth: '180px',
                  pointerEvents: 'none',
                  zIndex: 10,
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: hoveredCity.status === 'confirmed' ? 'var(--lime)' : 'var(--text-secondary)',
                    flexShrink: 0,
                    boxShadow: hoveredCity.status === 'confirmed' ? '0 0 6px rgba(170,223,46,0.8)' : 'none',
                  }} />
                  <p className="font-body text-text-primary" style={{ fontWeight: 700, fontSize: '14px' }}>
                    {hoveredCity.name}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.08em' }}>
                    {hoveredCity.quarter} · {hoveredCity.status.toUpperCase()}
                  </p>
                  <p className="font-mono text-lime" style={{ fontSize: '11px', fontWeight: 600 }}>
                    {hoveredCity.builders} builders expected
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend — bottom left */}
          <div style={{
            position: 'absolute', bottom: '16px', left: '16px',
            background: 'rgba(5,5,5,0.85)', border: '1px solid var(--bg-border)',
            padding: '10px 14px', backdropFilter: 'blur(8px)',
            display: 'flex', gap: '20px', zIndex: 5,
          }}>
            {[
              { color: 'var(--lime)', label: `Confirmed (${confirmedCount})`, glow: true },
              { color: 'var(--text-secondary)', label: `Upcoming (${upcomingCount})`, glow: false },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: l.color, flexShrink: 0,
                  boxShadow: l.glow ? '0 0 6px rgba(170,223,46,0.7)' : 'none',
                }} />
                <span className="font-mono text-text-secondary" style={{ fontSize: '10px', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>

          {/* Top-right overlay: drag hint */}
          {mapLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                background: 'rgba(5,5,5,0.75)', border: '1px solid var(--bg-border)',
                padding: '8px 12px', backdropFilter: 'blur(8px)', zIndex: 5,
              }}
            >
              <p className="font-mono text-text-secondary" style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                DRAG TO EXPLORE · SCROLL TO ZOOM
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Spin animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
