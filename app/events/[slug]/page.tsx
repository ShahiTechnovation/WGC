'use client'

import Link from 'next/link'

export default function EventDetailPage() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="label-section accent mb-4">EVENT DETAILS</p>
          <h1 className="font-playfair font-bold text-text-primary mb-6" style={{ fontSize: 'var(--type-h2)' }}>
            Event details coming soon.
          </h1>
          <p className="text-text-secondary mb-8">
            Individual event pages will be populated as the 2026 schedule is finalized.
          </p>
          <Link href="/events" className="btn-secondary">
            ← Back to Events
          </Link>
        </div>
      </section>
    </div>
  )
}
