import { getEvents } from '@/lib/airtable'
import EventsClient from './client'

export const revalidate = 300

export default async function EventsPage() {
  const events = await getEvents()
  return <EventsClient events={events} />
}
