/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * WGC × AIRTABLE — Data Layer
 * Fetches live data from Airtable with mock fallback.
 * All fetches use Next.js ISR (revalidate every 5 min).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  EVENTS_ROADMAP,
  COUNCIL_MEMBERS,
  PARTNERS,
  NEWS_POSTS,
  MAP_CITIES,
  WGC_DIVISIONS,
  STATS_BAR,
  type WGCEvent,
  type CouncilMember,
  type Partner,
  type NewsPost,
} from '@/lib/constants'

// ── Config ─────────────────────────────────────────────
const BASE_ID = process.env.AIRTABLE_BASE_ID!
const TOKEN   = process.env.AIRTABLE_API_TOKEN!
const REVALIDATE = 0 // Always fetch fresh — no cache

// ── Types ──────────────────────────────────────────────

export type { WGCEvent, CouncilMember, Partner, NewsPost }

export interface WGCCity {
  id: string
  name: string
  status: 'confirmed' | 'upcoming'
  quarter: string
  builders: string
  lat: number
  lng: number
  mapX: number
  mapY: number
}

export interface WGCDivision {
  number: string
  name: string
  desc: string
  status: 'ACTIVE' | 'UPCOMING' | 'PAUSED'
  details: string
  stats: { cities: string; members: string; events: string; status: string }
}

export interface WGCStat {
  id: string
  label: string
  value: number
  prefix: string
  suffix: string
  displayValue: string
}

// ── Core Fetcher ───────────────────────────────────────

interface AirtableRecord {
  id: string
  fields: Record<string, unknown>
}

async function fetchTable(
  tableName: string,
  params: Record<string, string> = {}
): Promise<AirtableRecord[]> {
  if (!BASE_ID || !TOKEN) return []

  const searchParams = new URLSearchParams({
    ...params,
    'sort[0][field]': 'Display Order',
    'sort[0][direction]': 'asc',
  })

  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(tableName)}?${searchParams}`

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: 'no-store',
    })

    if (!res.ok) {
      console.warn(`[Airtable] ${tableName} fetch failed: ${res.status}`)
      return []
    }

    const data = await res.json()
    return data.records ?? []
  } catch (err) {
    console.warn(`[Airtable] ${tableName} error:`, err)
    return []
  }
}

function str(v: unknown, fallback = ''): string {
  if (v == null) return fallback
  return String(v)
}

function num(v: unknown, fallback = 0): number {
  const n = Number(v)
  return isNaN(n) ? fallback : n
}

function bool(v: unknown): boolean {
  return v === true || v === 'true'
}

function attachmentUrl(v: unknown): string {
  if (!Array.isArray(v) || v.length === 0) return ''
  return (v[0] as { url?: string })?.url ?? ''
}

// ── Events ─────────────────────────────────────────────

function mapEvent(rec: AirtableRecord): WGCEvent {
  const f = rec.fields
  const dateStr = str(f['Date'])
  const dateObj = dateStr ? new Date(dateStr) : null
  const monthLabel = dateObj
    ? dateObj.toLocaleString('en', { month: 'short' }).toUpperCase()
    : str(f['Month Label']).slice(0, 3).toUpperCase()

  // Format date nicely: "15 Jun 2026"
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : dateStr

  const rawStatus = str(f['Status']).toUpperCase()
  const status = (['CONFIRMED', 'UPCOMING', 'LIVE', 'DONE'].includes(rawStatus)
    ? rawStatus : 'UPCOMING') as WGCEvent['status']

  return {
    id:          str(f['Event ID'], rec.id),
    title:       str(f['Title'], 'Untitled Event'),
    city:        str(f['City'], 'TBA'),
    date:        formattedDate || 'TBA',
    month:       monthLabel || 'TBA',
    status,
    flagship:    bool(f['Is Flagship']),
    description: str(f['Description']),
    prizePool:   str(f['Prize Pool']),
    builders:    str(f['Expected Builders']),
  }
}

export async function getEvents(): Promise<WGCEvent[]> {
  const records = await fetchTable('Events')
  if (records.length === 0) return EVENTS_ROADMAP  // fallback
  return records.map(mapEvent).sort((a, b) => {
    // Flagship always last
    if (a.flagship) return 1
    if (b.flagship) return -1
    return 0
  })
}

// ── Council Members ────────────────────────────────────

function mapMember(rec: AirtableRecord): CouncilMember {
  const f = rec.fields
  const portrait = attachmentUrl(f['Portrait Photo'])
  // Fallback to local avatar if no Airtable photo
  const memberId = str(f['Member ID'], rec.id)
  const localAvatar = `/avatar-${memberId}.png`

  return {
    id:       memberId,
    name:     str(f['Full Name'], 'Council Member'),
    role:     str(f['Role / Title'], str(f['Role'], '')),
    org:      str(f['Organization'], 'WGC'),
    founding: bool(f['Is Founding Member']),
    avatar:   portrait || localAvatar,
  }
}

export async function getCouncilMembers(): Promise<CouncilMember[]> {
  const records = await fetchTable('Council Members')
  if (records.length === 0) return COUNCIL_MEMBERS  // fallback
  return records.map(mapMember)
}

// ── Partners ───────────────────────────────────────────

const TIER_MAP: Record<string, Partner['tier']> = {
  'title partner':     'title',
  'org partner':       'org',
  'media partner':     'media',
  'community partner': 'community',
  'title':             'title',
  'org':               'org',
  'media':             'media',
  'community':         'community',
}

function mapPartner(rec: AirtableRecord): Partner {
  const f = rec.fields
  const rawTier = str(f['Tier']).toLowerCase()
  const tier = TIER_MAP[rawTier] ?? 'org'

  return {
    id:     str(f['Partner ID'], rec.id),
    name:   str(f['Organization Name'], str(f['Name'], 'Partner')),
    handle: str(f['Social Handle'], ''),
    tier,
  }
}

export async function getPartners(): Promise<Partner[]> {
  const records = await fetchTable('Partners', {
    'filterByFormula': '{Is Active}=1',
  })
  if (records.length === 0) return PARTNERS  // fallback
  return records.map(mapPartner)
}

// ── News ───────────────────────────────────────────────

function mapNews(rec: AirtableRecord): NewsPost {
  const f = rec.fields
  return {
    _id:         str(f['Article ID'], rec.id),
    title:       str(f['Title'], 'Untitled'),
    slug:        str(f['Slug'], rec.id),
    category:    str(f['Category'], 'News'),
    publishedAt: str(f['Published Date'], new Date().toISOString().slice(0, 10)),
    author:      str(f['Author Name'], 'WGC Team'),
    excerpt:     str(f['Excerpt'], ''),
  }
}

export async function getNews(featuredOnly = false): Promise<NewsPost[]> {
  const filter = featuredOnly
    ? { 'filterByFormula': 'AND({Is Published}=1,{Is Featured}=1)' }
    : { 'filterByFormula': '{Is Published}=1' }

  const records = await fetchTable('News & Announcements', {
    ...filter,
    'sort[0][field]': 'Published Date',
    'sort[0][direction]': 'desc',
  })
  if (records.length === 0) return NEWS_POSTS  // fallback
  return records.map(mapNews)
}

// ── Cities ────────────────────────────────────────────

function mapCity(rec: AirtableRecord, index: number): WGCCity {
  const f = rec.fields
  const rawStatus = str(f['Status']).toLowerCase()
  return {
    id:       str(f['City ID'], `city-${index}`),
    name:     str(f['City Name'], 'City'),
    status:   rawStatus === 'confirmed' ? 'confirmed' : 'upcoming',
    quarter:  str(f['Launch Quarter'], 'TBA'),
    builders: str(f['Expected Builders'], 'TBA'),
    lat:      num(f['Latitude'], 0),
    lng:      num(f['Longitude'], 0),
    mapX:     num(f['Map X Percent'], 50),
    mapY:     num(f['Map Y Percent'], 50),
  }
}

export async function getCities(): Promise<WGCCity[]> {
  const records = await fetchTable('Cities / Regions')
  if (records.length === 0) {
    // Shape mock data to WGCCity type
    return MAP_CITIES.map(c => ({
      id:       c.id,
      name:     c.name,
      status:   c.status,
      quarter:  c.quarter,
      builders: c.builders,
      lat:      0,
      lng:      0,
      mapX:     c.x,
      mapY:     c.y,
    }))
  }
  return records.map(mapCity)
}

// ── Divisions ─────────────────────────────────────────

function mapDivision(rec: AirtableRecord): WGCDivision {
  const f = rec.fields
  const rawStatus = str(f['Status']).toUpperCase()
  const status = (['ACTIVE', 'UPCOMING', 'PAUSED'].includes(rawStatus)
    ? rawStatus : 'UPCOMING') as WGCDivision['status']

  return {
    number:  str(f['Division Number'], '01'),
    name:    str(f['Division Name'], 'Division'),
    desc:    str(f['Short Description'], ''),
    status,
    details: str(f['Full Details'], ''),
    stats: {
      cities:  str(f['Stat: Cities'], '—'),
      members: str(f['Stat: Members'], '—'),
      events:  str(f['Stat: Events'], '—'),
      status:  str(f['Stat: Timeline'], status),
    },
  }
}

export async function getDivisions(): Promise<WGCDivision[]> {
  const records = await fetchTable('WGC Divisions')
  if (records.length === 0) return WGC_DIVISIONS as WGCDivision[]  // fallback
  return records.map(mapDivision)
}

// ── Site Stats ────────────────────────────────────────

function mapStat(rec: AirtableRecord): WGCStat {
  const f = rec.fields
  return {
    id:           str(f['Stat ID'], rec.id),
    label:        str(f['Label'], 'Stat'),
    value:        num(f['Numeric Value'], 0),
    prefix:       str(f['Prefix'], ''),
    suffix:       str(f['Suffix'], ''),
    displayValue: str(f['Display Value'], ''),
  }
}

export async function getSiteStats(): Promise<WGCStat[]> {
  const records = await fetchTable('Site Stats', { 'filterByFormula': '{Is Active}=1' })
  if (records.length === 0) {
    // Shape STATS_BAR constants to WGCStat
    return STATS_BAR.map(s => ({
      id:           s.label.toLowerCase().replace(/\s+/g, '-'),
      label:        s.label,
      value:        s.value,
      prefix:       s.prefix,
      suffix:       s.suffix,
      displayValue: '',
    }))
  }
  return records.map(mapStat)
}

// ── Submit Application ────────────────────────────────

export async function submitApplication(data: {
  name: string
  email: string
  organization: string
  role: string
  type: string
  city: string
  country: string
  message: string
}): Promise<{ success: boolean; error?: string }> {
  if (!BASE_ID || !TOKEN) return { success: false, error: 'Not configured' }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent('Applications')}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            'Full Name':        data.name,
            'Email':            data.email,
            'Organization':     data.organization,
            'Role / Title':     data.role,
            'Application Type': data.type,
            'City':             data.city,
            'Country':          data.country,
            'Message':          data.message,
            'Status':           'New',
            'Source':           'Website',
          },
        }),
      }
    )

    if (!res.ok) {
      const err = await res.json()
      return { success: false, error: err?.error?.message ?? 'Unknown error' }
    }

    return { success: true }
  } catch (err) {
    return { success: false, error: String(err) }
  }
}
