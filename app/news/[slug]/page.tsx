'use client'

import Link from 'next/link'

export default function NewsDetailPage() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="label-section accent mb-4">ARTICLE</p>
          <h1 className="font-playfair font-bold text-text-primary mb-6" style={{ fontSize: 'var(--type-h2)' }}>
            Full article coming soon.
          </h1>
          <p className="text-text-secondary mb-8">
            Individual news articles will be available as content is published.
          </p>
          <Link href="/news" className="btn-secondary">
            ← Back to News
          </Link>
        </div>
      </section>
    </div>
  )
}
