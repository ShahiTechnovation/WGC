import { getPartners, getEvents } from '@/lib/airtable'
import AFKHacksClient from './client'

export const dynamic = 'force-dynamic'

export default async function AFKHacksPage() {
  const [partners, events] = await Promise.all([
    getPartners(),
    getEvents()
  ])

  return <AFKHacksClient initialPartners={partners} initialEvents={events} />
}
