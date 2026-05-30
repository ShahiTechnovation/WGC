const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

async function test() {
  console.log(`Connecting to: ${KV_URL}`)
  if (!KV_URL || !KV_TOKEN) {
    console.error('Error: Environment variables are not set.')
    return
  }
  try {
    const res = await fetch(`${KV_URL}/sismember/newsletter:emails/test@ecosystem.com`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`
      }
    })
    const data = await res.json()
    console.log('Success connecting to Upstash Redis REST API!')
    console.log('Response:', data)
  } catch (err) {
    console.error('Error connecting to Upstash:', err)
  }
}

test()
