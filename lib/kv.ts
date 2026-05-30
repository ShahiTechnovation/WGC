/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * WGC × UPSTASH/VERCEL KV — REST CLIENT
 * Pure fetch-based Redis client to avoid npm dependency issues.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

async function runRedisCommand(command: string[]): Promise<any> {
  if (!KV_URL || !KV_TOKEN) {
    console.warn('[KV Warning] KV_REST_API_URL or KV_REST_API_TOKEN is not configured. Operation skipped.')
    return null
  }

  const res = await fetch(KV_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Redis execution failed: ${res.status} - ${err}`)
  }

  const data = await res.json()
  return data.result
}

/**
 * Registers an email address in the Vercel KV / Upstash Redis database.
 * Stored as a member in the set `newsletter:emails` (uniqueness)
 * Stored as a hash at `newsletter:member:<email>` with meta fields.
 */
export async function registerEmail(email: string): Promise<boolean> {
  try {
    const formattedEmail = email.trim().toLowerCase()
    
    // 1. Add to set
    await runRedisCommand(['SADD', 'newsletter:emails', formattedEmail])
    
    // 2. Add profile metadata
    await runRedisCommand([
      'HSET',
      `newsletter:member:${formattedEmail}`,
      'email',
      formattedEmail,
      'registeredAt',
      new Date().toISOString(),
      'source',
      'Website Newsletter'
    ])
    
    return true
  } catch (err) {
    console.error('[KV Error] registerEmail failed:', err)
    return false
  }
}
