import { getPartners } from '@/lib/airtable'
import PartnersClient from './client'

export const revalidate = 300

export default async function PartnersPage() {
  const partners = await getPartners()
  return <PartnersClient partners={partners} />
}
