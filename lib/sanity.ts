import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo-wgc'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Query types
export interface SanityEvent {
  _id: string
  title: string
  slug: string
  category: string
  startDate: string
  endDate: string
  location: string
  region: string
  description: string
  image?: {
    asset: {
      url: string
    }
  }
  featured: boolean
}

export interface SanityMember {
  _id: string
  name: string
  title: string
  region: string
  image?: {
    asset: {
      url: string
    }
  }
  bio: string
}

export interface SanityPartner {
  _id: string
  name: string
  logo?: {
    asset: {
      url: string
    }
  }
  category: string
  website?: string
}

export interface SanityPost {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt: string
  image?: {
    asset: {
      url: string
    }
  }
  author: string
  category: string
}

// Query functions (stub implementations - update with actual Sanity queries)
export async function getEvents(): Promise<SanityEvent[]> {
  try {
    const events = await client.fetch<SanityEvent[]>(
      `*[_type == "event"] | order(startDate asc) {
        _id,
        title,
        slug,
        category,
        startDate,
        endDate,
        location,
        region,
        description,
        image,
        featured
      }`
    )
    return events || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  try {
    const event = await client.fetch<SanityEvent>(
      `*[_type == "event" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        category,
        startDate,
        endDate,
        location,
        region,
        description,
        image,
        featured
      }`,
      { slug }
    )
    return event || null
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export async function getMembers(): Promise<SanityMember[]> {
  try {
    const members = await client.fetch<SanityMember[]>(
      `*[_type == "councilMember"] | order(name asc) {
        _id,
        name,
        title,
        region,
        image,
        bio
      }`
    )
    return members || []
  } catch (error) {
    console.error('Error fetching council members:', error)
    return []
  }
}

export async function getPartners(): Promise<SanityPartner[]> {
  try {
    const partners = await client.fetch<SanityPartner[]>(
      `*[_type == "partner"] | order(name asc) {
        _id,
        name,
        logo,
        category,
        website
      }`
    )
    return partners || []
  } catch (error) {
    console.error('Error fetching partners:', error)
    return []
  }
}

export async function getPosts(limit = 10): Promise<SanityPost[]> {
  try {
    const posts = await client.fetch<SanityPost[]>(
      `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        image,
        author,
        category
      }`,
      { limit: limit - 1 }
    )
    return posts || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  try {
    const post = await client.fetch<SanityPost>(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        image,
        author,
        category
      }`,
      { slug }
    )
    return post || null
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}
