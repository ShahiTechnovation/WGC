'use client'

import { TICKER_TEXT } from '@/lib/constants'

export function Ticker() {
  const segments = TICKER_TEXT.split('◆')

  const renderContent = () => (
    <div className="flex items-center gap-0 whitespace-nowrap">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center">
          <span className="font-mono text-xs text-text-secondary">{seg.trim()}</span>
          {i < segments.length - 1 && (
            <span className="text-lime mx-4 text-xs">◆</span>
          )}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="relative w-full overflow-hidden bg-bg-surface border-t border-b border-bg-border group"
      style={{ height: '44px' }}
    >
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg-surface), transparent)' }}
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg-surface), transparent)' }}
      />

      {/* Scrolling content */}
      <div
        className="flex items-center h-full animate-ticker group-hover:[animation-play-state:paused]"
        style={{ width: 'max-content' }}
      >
        <div className="flex items-center gap-4 px-8">
          {renderContent()}
        </div>
        <div className="flex items-center gap-4 px-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
