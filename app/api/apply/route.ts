import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, type, organization, message } = body

    if (!name || !email || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // If Resend API key is configured, send email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'WGC Applications <onboarding@resend.dev>',
        to: ['delivered@resend.dev'],
        subject: `New WGC Application: ${type.toUpperCase()} - ${name}`,
        html: `
          <h2>New Application Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Type:</strong> ${type}</p>
          <p><strong>Organization:</strong> ${organization || 'N/A'}</p>
          <br/>
          <h3>Message:</h3>
          <p>${(message || '').replace(/\n/g, '<br/>')}</p>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    )
  }
}
