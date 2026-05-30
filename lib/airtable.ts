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
const BASEROW_TOKEN = process.env.BASEROW_API_TOKEN!
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

const BASEROW_TABLE_MAP: Record<string, string> = {
  'Events': '1002120',
  'Council Members': '1002121',
  'Partners': '1002122',
  'News & Announcements': '1002123',
  'Cities / Regions': '1002124',
  'WGC Divisions': '1002125',
  'Site Stats': '1002126',
  'Applications': '1002127',
  'Past Event Spotlights': '1002128'
}

async function fetchBaserowTable(tableName: string): Promise<AirtableRecord[]> {
  if (!BASEROW_TOKEN) return []
  const tableId = BASEROW_TABLE_MAP[tableName]
  if (!tableId) return []

  const url = `https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true&size=200`
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Token ${BASEROW_TOKEN}` },
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error(`Baserow fetch failed with status ${res.status}`)
    }

    const data = await res.json()
    return (data.results || []).map((row: any) => {
      const { id, order, ...fields } = row
      return { id: String(id), fields }
    })
  } catch (err) {
    console.error(`[Baserow Error] Network error for ${tableName}:`, err)
    throw err
  }
}

async function fetchTable(
  tableName: string,
  params: Record<string, string> = {},
  sortField?: string,
  isRetry = false
): Promise<AirtableRecord[]> {
  // 1. Try Baserow First
  try {
    if (BASEROW_TOKEN) {
      let baserowRecords = await fetchBaserowTable(tableName);
      if (baserowRecords.length > 0) {
        console.log(`[Baserow] Successfully fetched ${tableName} from Baserow.`);
        
        // Handle basic filtering usually done by Airtable params
        if (params['filterByFormula']) {
          const formula = params['filterByFormula'];
          if (formula.includes('{Is Active}=1')) {
            baserowRecords = baserowRecords.filter(r => r.fields['Is Active'] === true || r.fields['Is Active'] === '1' || r.fields['Is Active'] === 1);
          }
          if (formula.includes('{Is Published}=1')) {
            baserowRecords = baserowRecords.filter(r => r.fields['Is Published'] === true || r.fields['Is Published'] === '1' || r.fields['Is Published'] === 1);
          }
          if (formula.includes('{Is Featured}=1')) {
            baserowRecords = baserowRecords.filter(r => r.fields['Is Featured'] === true || r.fields['Is Featured'] === '1' || r.fields['Is Featured'] === 1);
          }
        }

        // Handle basic sorting
        if (sortField) {
          baserowRecords.sort((a, b) => {
            const valA = a.fields[sortField] as any;
            const valB = b.fields[sortField] as any;
            if (valA == null) return 1;
            if (valB == null) return -1;
            const direction = params['sort[0][direction]'] === 'desc' ? -1 : 1;
            return valA > valB ? direction : valA < valB ? -direction : 0;
          });
        }

        return baserowRecords;
      }
    }
  } catch (err) {
    console.warn(`[Baserow] Failed to fetch ${tableName}, falling back to Airtable...`);
  }

  // 2. Fallback to Airtable
  if (!BASE_ID || !TOKEN) return []

  const baseParams: Record<string, string> = { ...params }
  if (sortField) {
    baseParams['sort[0][field]'] = sortField
    baseParams['sort[0][direction]'] = 'asc'
  }

  const searchParams = new URLSearchParams(baseParams)
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(tableName)}?${searchParams}`

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      cache: 'no-store',
    })

    if (!res.ok) {
      if (!isRetry && res.status === 422 && (Object.keys(params).length > 0 || sortField)) {
        console.warn(`[Airtable] Table "${tableName}" fetch failed with 422 (likely missing field). Retrying without filter/sort...`)
        return fetchTable(tableName, {}, undefined, true)
      }
      const body = await res.text().catch(() => '')
      console.error(`[Airtable Error] Table "${tableName}" fetch failed: ${res.status}`)
      console.error(`  URL: ${url}`)
      console.error(`  Response: ${body}`)
      return []
    }

    const data = await res.json()
    if (data.error) {
      console.error(`[Airtable Error] API error in ${tableName}:`, data.error)
      return []
    }
    return data.records ?? []
  } catch (err) {
    console.error(`[Airtable Error] Network error for ${tableName}:`, err)
    return []
  }
}

function str(v: unknown, fallback = ''): string {
  if (v == null) return fallback
  if (typeof v === 'object' && !Array.isArray(v) && v !== null && 'value' in v) {
    return String((v as any).value)
  }
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
  const dateStr = str(f['Date'] || f['Event Date'] || f['Start Date'])
  const dateObj = dateStr && !isNaN(Date.parse(dateStr)) ? new Date(dateStr) : null
  const monthLabel = dateObj
    ? dateObj.toLocaleString('en', { month: 'short' }).toUpperCase()
    : str(f['Month Label'] || f['Month']).slice(0, 3).toUpperCase()

  // Format date nicely: "15 Jun 2026"
  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : dateStr

  const rawStatus = str(f['Status'] || f['Event Status']).toUpperCase()
  const status = (['CONFIRMED', 'UPCOMING', 'LIVE', 'DONE'].includes(rawStatus)
    ? rawStatus : 'UPCOMING') as WGCEvent['status']

  return {
    id:          str(f['Event ID'] || f['ID'], rec.id),
    title:       str(f['Title'] || f['Event Name'] || f['Name'], 'Untitled Event'),
    city:        str(f['City'] || f['Location'], 'TBA'),
    date:        formattedDate || 'TBA',
    month:       monthLabel || 'TBA',
    status,
    flagship:    bool(f['Is Flagship'] || f['Flagship']),
    description: str(f['Description'] || f['Details']),
    prizePool:   str(f['Prize Pool'] || f['Prize']),
    builders:    str(f['Expected Builders'] || f['Builders']),
  }
}

export async function getEvents(): Promise<WGCEvent[]> {
  const records = await fetchTable('Events', {}, 'Display Order')
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
  const portrait = attachmentUrl(f['Portrait Photo'] || f['Photo'] || f['Image'])
  // Fallback to local avatar if no Airtable photo
  const memberId = str(f['Member ID'] || f['ID'], rec.id)
  const localAvatar = `/avatar-${memberId}.png`

  return {
    id:       memberId,
    name:     str(f['Full Name'] || f['Name'], 'Council Member'),
    role:     str(f['Role / Title'] || f['Role'] || f['Title'], ''),
    org:      str(f['Organization'] || f['Company'], 'WGC'),
    founding: bool(f['Is Founding Member'] || f['Founding']),
    avatar:   portrait || localAvatar,
  }
}

export async function getCouncilMembers(): Promise<CouncilMember[]> {
  const records = await fetchTable('Council Members', {}, 'Display Order')
  if (records.length === 0) return COUNCIL_MEMBERS  // fallback
  return records.map(mapMember)
}

// ── Partners ───────────────────────────────────────────

const TIER_MAP: Record<string, Partner['tier']> = {
  'title partner':     'title',
  'org partner':       'org',
  'media partner':     'media',
  'community partner': 'community',
  'blockchain partner': 'blockchain',
  'title':             'title',
  'org':               'org',
  'media':             'media',
  'community':         'community',
  'blockchain':        'blockchain',
}

function mapPartner(rec: AirtableRecord): Partner {
  const f = rec.fields
  const rawTier = str(f['Tier']).toLowerCase()
  const tier = TIER_MAP[rawTier] ?? 'community'

  // Social link: try full URL fields first, then handle field
  const socialUrl =
    str(f['Social Link'] || f['Social URL'] || f['Website'] || f['Website URL'] || f['Social Handle'] || f['URL'])

  return {
    id:        str(f['Partner ID'] || f['ID'], rec.id),
    name:      str(f['Organization Name'] || f['Name'] || f['Company'] || f['Partner Name'], 'Partner'),
    handle:    socialUrl,
    tier,
    logoUrl:   attachmentUrl(f['Logo'] || f['Logo URL'] || f['Image'] || f['Photo']) || undefined,
  }
}

export async function getPartners(): Promise<Partner[]> {
  const records = await fetchTable('Partners', {
    'filterByFormula': '{Is Active}=1',
  }, 'Display Order')
  
  if (records.length === 0) return PARTNERS  // fallback
  return records.map(mapPartner)
}

// ── News ───────────────────────────────────────────────

function mapNews(rec: AirtableRecord): NewsPost {
  const f = rec.fields
  return {
    _id:         str(f['Article ID'] || f['ID'], rec.id),
    title:       str(f['Title'] || f['Name'] || f['Headline'], 'Untitled'),
    slug:        str(f['Slug'], rec.id),
    category:    str(f['Category'], 'News'),
    publishedAt: str(f['Published Date'] || f['Date'], new Date().toISOString().slice(0, 10)),
    author:      str(f['Author Name'] || f['Author'], 'WGC Team'),
    excerpt:     str(f['Excerpt'] || f['Summary'], ''),
  }
}

export async function getNews(featuredOnly = false): Promise<NewsPost[]> {
  const filter = featuredOnly
    ? { 'filterByFormula': 'AND({Is Published}=1,{Is Featured}=1)' }
    : { 'filterByFormula': '{Is Published}=1' }

  const records = await fetchTable('News & Announcements', {
    ...filter,
    'sort[0][field]':     'Published Date',
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
    id:       str(f['City ID'] || f['ID'], `city-${index}`),
    name:     str(f['City Name'] || f['Name'] || f['City'], 'City'),
    status:   rawStatus === 'confirmed' ? 'confirmed' : 'upcoming',
    quarter:  str(f['Launch Quarter'] || f['Quarter'], 'TBA'),
    builders: str(f['Expected Builders'] || f['Builders'], 'TBA'),
    lat:      num(f['Latitude'] || f['Lat'], 0),
    lng:      num(f['Longitude'] || f['Lng'], 0),
    mapX:     num(f['Map X Percent'] || f['X'], 50),
    mapY:     num(f['Map Y Percent'] || f['Y'], 50),
  }
}

export async function getCities(): Promise<WGCCity[]> {
  // No sortField — Cities table may not have 'Display Order'
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
    number:  str(f['Division Number'] || f['Number'], '01'),
    name:    str(f['Division Name'] || f['Name'], 'Division'),
    desc:    str(f['Short Description'] || f['Description'], ''),
    status,
    details: str(f['Full Details'] || f['Details'], ''),
    stats: {
      cities:  str(f['Stat: Cities'] || f['Cities'], '—'),
      members: str(f['Stat: Members'] || f['Members'], '—'),
      events:  str(f['Stat: Events'] || f['Events'], '—'),
      status:  str(f['Stat: Timeline'] || f['Timeline'], status),
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
    id:           str(f['Stat ID'] || f['ID'], rec.id),
    label:        str(f['Label'] || f['Name'], 'Stat'),
    value:        num(f['Numeric Value'] || f['Value'], 0),
    prefix:       str(f['Prefix'], ''),
    suffix:       str(f['Suffix'], ''),
    displayValue: str(f['Display Value'] || f['Display'], ''),
  }
}

export async function getSiteStats(): Promise<WGCStat[]> {
  const records = await fetchTable('Site Stats', { 'filterByFormula': '{Is Active}=1' }, 'Display Order')
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

// ── Past Event Spotlight (images only) ───────────────

export interface PastEventSpotlight {
  id: string
  imageUrl: string
  caption: string   // optional label shown on hover
}

function mapSpotlight(rec: AirtableRecord, index: number): PastEventSpotlight {
  const f = rec.fields
  // Support both single-attachment and multi-attachment fields named "Photo" or "Event Photo"
  const imageUrl = attachmentUrl(f['Photo'] || f['Event Photo'] || f['Image'])
  return {
    id:       str(f['Spotlight ID'] || f['ID'], rec.id),
    imageUrl,
    caption:  str(f['Caption'] || f['Name'], ''),
  }
}

export async function getSpotlights(): Promise<PastEventSpotlight[]> {
  const records = await fetchTable('Past Event Spotlights', {
    'filterByFormula': '{Is Active}=1',
  }, 'Display Order')
  if (records.length === 0) return []
  return records.map(mapSpotlight).filter(s => s.imageUrl)
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
  // 1. Try Baserow First
  if (BASEROW_TOKEN && BASEROW_TABLE_MAP['Applications']) {
    try {
      const tableId = BASEROW_TABLE_MAP['Applications'];
      const res = await fetch(`https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${BASEROW_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
        }),
      });
      if (res.ok) return { success: true };
      console.warn('[Baserow] Submit failed, falling back to Airtable');
    } catch (err) {
      console.warn('[Baserow] Submit error, falling back to Airtable', err);
    }
  }

  // 2. Fallback to Airtable
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
