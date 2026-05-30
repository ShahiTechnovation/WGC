import { NextResponse } from 'next/server'
import { registerEmail } from '@/lib/kv'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Register email in KV
    const success = await registerEmail(email)

    // Even if credentials aren't set in dev, we return success so frontend flow works gracefully
    const hasKVConfig = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)

    if (success || !hasKVConfig) {
      if (!hasKVConfig) {
        console.log(`[Dev Cache] Mock registered email in console: ${email}`)
      }
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Database storage failed. Please try again later.' }, { status: 500 })
    }
  } catch (error) {
    console.error('[API Error] Newsletter subscription failed:', error)
    return NextResponse.json({ error: 'Failed to process newsletter subscription' }, { status: 500 })
  }
}
