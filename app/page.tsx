import { HeroSection } from '@/components/sections/hero-section'
import { Ticker } from '@/components/ui/ticker'
import { MissionSection } from '@/components/sections/mission-section'
import { StatsSection } from '@/components/sections/stats-section'
import { MapSection } from '@/components/sections/map-section'
import { EventsSection } from '@/components/sections/events-section'
import { CouncilSection } from '@/components/sections/council-section'
import { PartnerSection } from '@/components/sections/partner-section'
import { FinaleCTASection } from '@/components/sections/finale-cta-section'
import {
  getEvents,
  getCouncilMembers,
  getPartners,
  getSiteStats,
} from '@/lib/airtable'

export const revalidate = 300 // ISR: revalidate every 5 minutes

export default async function Home() {
  // Fetch all data in parallel — mock fallback is built into each function
  const [events, members, partners, stats] = await Promise.all([
    getEvents(),
    getCouncilMembers(),
    getPartners(),
    getSiteStats(),
  ])

  return (
    <>
      <HeroSection stats={stats} />
      <Ticker />
      <MissionSection />
      <StatsSection stats={stats} />
      <MapSection />
      <EventsSection events={events} />
      <CouncilSection members={members} />
      <PartnerSection partners={partners} />
      <FinaleCTASection stats={stats} />
    </>
  )
}
