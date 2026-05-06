'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export function useCountUp(
  end: number,
  duration: number = 1500,
  prefix: string = '',
  suffix: string = ''
) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number | null = null
    let animationId: number

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const easedProgress = easeOutExpo(progress)
      
      setCount(Math.floor(easedProgress * end))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [hasStarted, end, duration])

  const formatted = `${prefix}${count.toLocaleString()}${suffix}`

  return { ref, formatted, count }
}
