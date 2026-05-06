import { HeroSection } from '@/components/sections/hero-section'
import { Ticker } from '@/components/ui/ticker'
import { MissionSection } from '@/components/sections/mission-section'
import { StatsSection } from '@/components/sections/stats-section'
import { MapSection } from '@/components/sections/map-section'
import { EventsSection } from '@/components/sections/events-section'
import { CouncilSection } from '@/components/sections/council-section'
import { PartnerSection } from '@/components/sections/partner-section'
import { FinaleCTASection } from '@/components/sections/finale-cta-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <Ticker />
      <MissionSection />
      <StatsSection />
      <MapSection />
      <EventsSection />
      <CouncilSection />
      <PartnerSection />
      <FinaleCTASection />
    </>
  )
}
