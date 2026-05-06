import { getCouncilMembers, getDivisions } from '@/lib/airtable'
import CouncilClient from './client'

export const dynamic = 'force-dynamic'

export default async function CouncilPage() {
  const [members, divisions] = await Promise.all([
    getCouncilMembers(),
    getDivisions(),
  ])
  return <CouncilClient members={members} divisions={divisions as any} />
}
