import { getCouncilMembers, getDivisions } from '@/lib/airtable'
import CouncilClient from './client'

export const revalidate = 300

export default async function CouncilPage() {
  const [members, divisions] = await Promise.all([
    getCouncilMembers(),
    getDivisions(),
  ])
  return <CouncilClient members={members} divisions={divisions as any} />
}
