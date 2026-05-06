import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Bebas_Neue, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LayoutShell } from '@/components/layout/layout-shell'
import './globals.css'
import 'mapbox-gl/dist/mapbox-gl.css'


const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "World Gaming Council — Asia's Gaming Authority",
  description: "WGC is the governing body organizing gaming hackathons and builder events across Asia. 20+ cities. Nov 2026.",
  keywords: ['gaming', 'hackathon', 'esports', 'Asia', 'WGC', 'World Gaming Council', 'competitive gaming'],
  authors: [{ name: 'World Gaming Council' }],
  openGraph: {
    title: "World Gaming Council — Asia's Gaming Authority",
    description: "WGC is the governing body organizing gaming hackathons and builder events across Asia. 20+ cities. Nov 2026.",
    type: 'website',
    locale: 'en_US',
    siteName: 'World Gaming Council',
  },
  twitter: {
    card: 'summary_large_image',
    title: "World Gaming Council — Asia's Gaming Authority",
    description: "WGC is the governing body organizing gaming hackathons and builder events across Asia.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">
        <LayoutShell>{children}</LayoutShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
