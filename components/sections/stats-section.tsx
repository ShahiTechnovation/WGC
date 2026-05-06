'use client'

import { useCountUp } from '@/hooks/use-count-up'
import { STATS_BAR } from '@/lib/constants'
import type { WGCStat } from '@/lib/airtable'

type StatShape = {
  label: string
  value: number
  suffix: string
  prefix: string
}

function StatItem({ label, value, suffix, prefix }: StatShape) {
  const { ref, formatted } = useCountUp(value, 1500, prefix, suffix)

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-8 px-6 text-center">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary mb-2 whitespace-nowrap">
        {label}
      </p>
      <p className="font-bebas text-lime leading-none" style={{ fontSize: 'var(--type-stat)' }}>
        {formatted}
      </p>
    </div>
  )
}

function toStatShape(s: WGCStat | typeof STATS_BAR[number]): StatShape {
  return {
    label:  s.label,
    value:  s.value,
    suffix: s.suffix,
    prefix: s.prefix,
  }
}

export function StatsSection({ stats }: { stats?: (WGCStat | typeof STATS_BAR[number])[] }) {
  const data = (stats ?? STATS_BAR).map(toStatShape)

  return (
    <section className="w-full bg-bg-surface border-t border-b border-bg-border overflow-hidden" id="stats">
      {/* Desktop: columns with dividers */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length}, 1fr)` }} className="hidden sm:grid">
        {data.map((stat, i) => (
          <div key={stat.label} className={i > 0 ? 'border-l border-bg-border' : ''}>
            <StatItem {...stat} />
          </div>
        ))}
      </div>

      {/* Mobile: 2×2 + centered last */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2">
          {data.slice(0, 4).map((stat, i) => (
            <div
              key={stat.label}
              className={[
                i % 2 !== 0 ? 'border-l border-bg-border' : '',
                i >= 2 ? 'border-t border-bg-border' : '',
              ].join(' ')}
            >
              <StatItem {...stat} />
            </div>
          ))}
        </div>
        {data[4] && (
          <div className="border-t border-bg-border">
            <StatItem {...data[4]} />
          </div>
        )}
      </div>
    </section>
  )
}
