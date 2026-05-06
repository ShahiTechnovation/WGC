'use client'

import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CustomCursor } from '@/components/ui/custom-cursor'

/**
 * LayoutShell — client-only wrapper that provides Navbar, Footer, and CustomCursor
 * to every page via the root server layout. Keeps the root layout as a server component.
 */
export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
