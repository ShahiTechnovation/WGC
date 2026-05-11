import { HeroSection } from '@/components/sections/hero-section'
import { Ticker } from '@/components/ui/ticker'
import { MissionSection } from '@/components/sections/mission-section'
import { StatsSection } from '@/components/sections/stats-section'
import { MapSection } from '@/components/sections/map-section'
import { EventsSection } from '@/components/sections/events-section'
import { CouncilSection } from '@/components/sections/council-section'
import { PartnerSection } from '@/components/sections/partner-section'
import { FinaleCTASection } from '@/components/sections/finale-cta-section'
import { SpotlightCarousel } from '@/components/sections/spotlight-carousel'
import {
  getEvents,
  getCouncilMembers,
  getPartners,
  getSiteStats,
  getCities,
  getSpotlights,
} from '@/lib/airtable'

export const dynamic = 'force-dynamic'

// ── Toggle these to true once your Airtable tables are populated ──────────────
const EVENTS_REVEALED  = false   // set true when events table has data
const COUNCIL_REVEALED = false   // set true when council table has data

export default async function Home() {
  // Fetch all data in parallel — mock fallback is built into each function
  const [events, members, partners, stats, cities, spotlights] = await Promise.all([
    getEvents(),
    getCouncilMembers(),
    getPartners(),
    getSiteStats(),
    getCities(),
    getSpotlights(),
  ])

  return (
    <>
      <HeroSection stats={stats} />
      <Ticker />
      <MissionSection />
      <StatsSection stats={stats} />
      <MapSection cities={cities} />
      <SpotlightCarousel spotlights={spotlights} />
      <EventsSection events={events} revealed={EVENTS_REVEALED} />
      <CouncilSection members={members} revealed={COUNCIL_REVEALED} />
      <PartnerSection partners={partners} />
      <FinaleCTASection stats={stats} />
    </>
  )
}
