import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy')

const TYPE_LABELS: Record<string, string> = {
  builder: 'Builder / Developer',
  organizer: 'Event Organizer',
  partner: 'Partner / Sponsor',
  media: 'Media',
  kol: 'KOL / Influencer',
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared layout wrapper
// ─────────────────────────────────────────────────────────────────────────────
function wrap(inner: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#080808;font-family:'Inter',system-ui,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;">
<tr><td align="center" style="padding:48px 16px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0d0d0d;border:1px solid #1e1e1e;border-radius:4px;overflow:hidden;">
${inner}
<tr><td style="height:1px;background:#111;"></td></tr>
<tr><td style="padding:28px 48px;text-align:center;">
  <p style="margin:0 0 6px;font-family:monospace;font-size:16px;font-weight:900;letter-spacing:0.1em;color:#aadf2e;">WGC</p>
  <p style="margin:0;font-family:monospace;font-size:10px;color:#333;letter-spacing:0.08em;line-height:1.8;">WORLD GAMING COUNCIL · APPLICATIONS TEAM<br/>This is an automated message — please do not reply.</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`
}

function badge(text: string, color = '#aadf2e') {
  return `<span style="display:inline-block;padding:4px 12px;background:${color}18;border:1px solid ${color}44;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:0.1em;color:${color};">${text}</span>`
}

function step(num: string, title: string, desc: string, accent = '#aadf2e') {
  return `<tr><td style="padding:14px 0;border-bottom:1px solid #111;vertical-align:top;">
  <table cellpadding="0" cellspacing="0"><tr>
    <td style="vertical-align:top;padding-right:14px;"><span style="display:inline-block;width:26px;height:26px;background:#111;border:1px solid #222;font-family:monospace;font-size:10px;font-weight:700;color:${accent};text-align:center;line-height:26px;">${num}</span></td>
    <td style="vertical-align:top;"><span style="display:block;font-size:13px;font-weight:700;color:#f5f5f5;">${title}</span><span style="display:block;font-size:13px;color:#555;line-height:1.6;margin-top:3px;">${desc}</span></td>
  </tr></table>
</td></tr>`
}

function cta(label: string, bg = '#aadf2e', color = '#080808') {
  return `<tr><td style="padding:0 48px 48px;text-align:center;">
  <a href="https://wgc2025.com" style="display:inline-block;padding:14px 40px;background:${bg};color:${color};font-family:monospace;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;border-radius:2px;">${label}</a>
</td></tr>`
}

function receipt(rows: [string, string][], accentColor = '#aadf2e') {
  return rows.map(([k, v]) => `<tr><td style="padding:11px 0;border-bottom:1px solid #161616;">
  <span style="font-family:monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#444;">${k}</span><br/>
  <span style="font-size:14px;font-weight:600;color:#f0f0f0;margin-top:4px;display:block;">${v}</span>
</td></tr>`).join('')
}

// ─────────────────────────────────────────────────────────────────────────────
// 🛠️  BUILDER / DEVELOPER
// ─────────────────────────────────────────────────────────────────────────────
function emailBuilder(name: string, org?: string) {
  const first = name.split(' ')[0]
  return wrap(`
<tr><td style="height:3px;background:linear-gradient(90deg,#aadf2e,#d4ff6e 50%,transparent);"></td></tr>
<tr><td style="padding:52px 48px 36px;text-align:center;">
  <div style="display:inline-block;width:72px;height:72px;background:#aadf2e0d;border:1px solid #aadf2e44;line-height:72px;font-size:32px;margin-bottom:28px;">🛠️</div>
  <h1 style="margin:0 0 14px;font-size:34px;font-weight:900;letter-spacing:-0.02em;color:#f5f5f5;line-height:1.05;">COMMIT RECEIVED.<br/><span style="color:#aadf2e;">NOW SHIP.</span></h1>
  <p style="margin:0 auto;font-size:15px;color:#666;line-height:1.75;max-width:400px;">${first}, your application just pushed to our pipeline. The council is reviewing your stack.</p>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 18px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── APPLICATION RECEIPT ───────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${receipt([
      ['Applicant', name],
      ['Role', 'BUILDER / DEVELOPER'],
      ...(org ? [['Organization', org] as [string,string]] : []),
      ['Status', '● UNDER REVIEW'],
    ])}
  </table>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 20px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── WHAT HAPPENS NEXT ─────────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${step('01', 'Code Review', 'Council members audit your profile, projects, and mission fit.')}
    ${step('02', 'Merge or Decline', 'Decision lands in your inbox within 7 business days.')}
    ${step('03', 'Dev Access', 'Approved? You\'re in. Private channels, early builds, and WGC dev bounties await.')}
  </table>
</td></tr>
${cta('EXPLORE THE ECOSYSTEM ↗')}`)
}

// ─────────────────────────────────────────────────────────────────────────────
// 🎪  EVENT ORGANIZER
// ─────────────────────────────────────────────────────────────────────────────
function emailOrganizer(name: string, org?: string) {
  const first = name.split(' ')[0]
  return wrap(`
<tr><td style="height:3px;background:linear-gradient(90deg,#ff6b35,#ff9a5c 50%,transparent);"></td></tr>
<tr><td style="padding:52px 48px 36px;text-align:center;">
  <div style="display:inline-block;width:72px;height:72px;background:#ff6b350d;border:1px solid #ff6b3544;line-height:72px;font-size:32px;margin-bottom:28px;">🎪</div>
  <h1 style="margin:0 0 14px;font-size:34px;font-weight:900;letter-spacing:-0.02em;color:#f5f5f5;line-height:1.05;">DOORS OPEN<br/><span style="color:#ff6b35;">SOON.</span></h1>
  <p style="margin:0 auto;font-size:15px;color:#666;line-height:1.75;max-width:400px;">${first}, the stage is set. Your application is front of house — the council reviews soon.</p>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 18px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── APPLICATION RECEIPT ───────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${receipt([
      ['Applicant', name],
      ['Role', 'EVENT ORGANIZER'],
      ...(org ? [['Organization', org] as [string,string]] : []),
      ['Status', '● UNDER REVIEW'],
    ], '#ff6b35')}
  </table>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 20px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── WHAT HAPPENS NEXT ─────────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${step('01', 'Lineup Check', 'We evaluate your event history, reach, and vision for the WGC ecosystem.', '#ff6b35')}
    ${step('02', 'Green Light', 'Response within 7 business days. Check your spam folder.', '#ff6b35')}
    ${step('03', 'Co-Production', 'Approved organizers get WGC branding, venue support & promotional power.', '#ff6b35')}
  </table>
</td></tr>
${cta('EXPLORE WGC EVENTS ↗', '#ff6b35', '#fff')}`)
}

// ─────────────────────────────────────────────────────────────────────────────
// 🤝  PARTNER / SPONSOR
// ─────────────────────────────────────────────────────────────────────────────
function emailPartner(name: string, org?: string) {
  const first = name.split(' ')[0]
  return wrap(`
<tr><td style="height:3px;background:linear-gradient(90deg,#7c6cfc,#a99dff 50%,transparent);"></td></tr>
<tr><td style="padding:52px 48px 36px;text-align:center;">
  <div style="display:inline-block;width:72px;height:72px;background:#7c6cfc0d;border:1px solid #7c6cfc44;line-height:72px;font-size:32px;margin-bottom:28px;">🤝</div>
  <h1 style="margin:0 0 14px;font-size:34px;font-weight:900;letter-spacing:-0.02em;color:#f5f5f5;line-height:1.05;">DEAL IN<br/><span style="color:#7c6cfc;">REVIEW.</span></h1>
  <p style="margin:0 auto;font-size:15px;color:#666;line-height:1.75;max-width:400px;">${first}, your partnership proposal is on the council's table. We'll be in touch shortly.</p>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 18px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── APPLICATION RECEIPT ───────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${receipt([
      ['Applicant', name],
      ['Role', 'PARTNER / SPONSOR'],
      ...(org ? [['Organization', org] as [string,string]] : []),
      ['Status', '● UNDER REVIEW'],
    ], '#7c6cfc')}
  </table>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 20px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── WHAT HAPPENS NEXT ─────────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${step('01', 'Due Diligence', 'We assess brand alignment and partnership tier fit.', '#7c6cfc')}
    ${step('02', 'Response', 'You\'ll hear back within 7 business days with next steps.', '#7c6cfc')}
    ${step('03', 'Partnership Brief', 'Approved partners receive a full deck: benefits, placements & deliverables.', '#7c6cfc')}
  </table>
</td></tr>
${cta('VIEW PARTNERSHIP TIERS ↗', '#7c6cfc', '#fff')}`)
}

// ─────────────────────────────────────────────────────────────────────────────
// 📡  MEDIA
// ─────────────────────────────────────────────────────────────────────────────
function emailMedia(name: string, org?: string) {
  const first = name.split(' ')[0]
  return wrap(`
<tr><td style="height:3px;background:linear-gradient(90deg,#00c9ff,#7df5ff 50%,transparent);"></td></tr>
<tr><td style="padding:52px 48px 36px;text-align:center;">
  <div style="display:inline-block;width:72px;height:72px;background:#00c9ff0d;border:1px solid #00c9ff44;line-height:72px;font-size:32px;margin-bottom:28px;">📡</div>
  <h1 style="margin:0 0 14px;font-size:34px;font-weight:900;letter-spacing:-0.02em;color:#f5f5f5;line-height:1.05;">SIGNAL<br/><span style="color:#00c9ff;">ACQUIRED.</span></h1>
  <p style="margin:0 auto;font-size:15px;color:#666;line-height:1.75;max-width:400px;">${first}, your media credentials are being verified. Expect transmission within 7 days.</p>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 18px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── APPLICATION RECEIPT ───────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${receipt([
      ['Applicant', name],
      ['Role', 'MEDIA'],
      ...(org ? [['Publication / Outlet', org] as [string,string]] : []),
      ['Status', '● UNDER REVIEW'],
    ], '#00c9ff')}
  </table>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 20px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── WHAT HAPPENS NEXT ─────────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${step('01', 'Credentials Check', 'We verify your outlet, reach, and editorial focus.', '#00c9ff')}
    ${step('02', 'Accreditation', 'Media pass decision within 7 business days.', '#00c9ff')}
    ${step('03', 'Press Access', 'Approved media gets exclusive briefings, event access & asset kits.', '#00c9ff')}
  </table>
</td></tr>
${cta('EXPLORE WGC PRESS ↗', '#00c9ff', '#080808')}`)
}

// ─────────────────────────────────────────────────────────────────────────────
// ⭐  KOL / INFLUENCER
// ─────────────────────────────────────────────────────────────────────────────
function emailKol(name: string, org?: string, socialHandle?: string, followersRange?: string) {
  const first = name.split(' ')[0]
  return wrap(`
<tr><td style="height:3px;background:linear-gradient(90deg,#f7c948,#ffe88a 50%,transparent);"></td></tr>
<tr><td style="padding:52px 48px 36px;text-align:center;">
  <div style="display:inline-block;width:72px;height:72px;background:#f7c9480d;border:1px solid #f7c94844;line-height:72px;font-size:32px;margin-bottom:28px;">⭐</div>
  <h1 style="margin:0 0 14px;font-size:34px;font-weight:900;letter-spacing:-0.02em;color:#f5f5f5;line-height:1.05;">YOU'RE ON THE<br/><span style="color:#f7c948;">RADAR.</span></h1>
  <p style="margin:0 auto;font-size:15px;color:#666;line-height:1.75;max-width:400px;">${first}, your profile just dropped into our KOL pipeline. The WGC signal is about to reach your audience.</p>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 18px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── APPLICATION RECEIPT ───────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${receipt([
      ['Applicant', name],
      ['Role', 'KOL / INFLUENCER'],
      ...(socialHandle ? [['Social Handle', socialHandle] as [string,string]] : []),
      ...(followersRange ? [['Audience Size', followersRange] as [string,string]] : []),
      ...(org ? [['Agency / Mgmt', org] as [string,string]] : []),
      ['Status', '● UNDER REVIEW'],
    ], '#f7c948')}
  </table>
</td></tr>
<tr><td style="height:1px;background:linear-gradient(90deg,transparent,#1e1e1e 20%,#1e1e1e 80%,transparent);"></td></tr>
<tr><td style="padding:36px 48px;">
  <p style="margin:0 0 20px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.18em;color:#444;">── WHAT HAPPENS NEXT ─────────────────</p>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${step('01', 'Profile Audit', 'We analyse your content, audience, and WGC alignment.', '#f7c948')}
    ${step('02', 'Verdict', 'You\'ll hear back within 7 business days. Check your DMs too.', '#f7c948')}
    ${step('03', 'Collab Brief', 'Approved KOLs receive an exclusive campaign brief, perks & content drops.', '#f7c948')}
  </table>
</td></tr>
<tr><td style="padding:0 48px 32px;text-align:center;">
  <div style="display:inline-block;padding:16px 24px;background:#f7c9480a;border:1px solid #f7c94822;text-align:left;max-width:400px;">
    <p style="margin:0 0 6px;font-family:monospace;font-size:10px;font-weight:700;letter-spacing:0.12em;color:#f7c948;text-transform:uppercase;">KOL Programme</p>
    <p style="margin:0;font-size:13px;color:#666;line-height:1.65;">Exclusive content drops · Event front-row access · Co-marketing campaigns · WGC merch · Revenue share opportunities.</p>
  </div>
</td></tr>
${cta('EXPLORE WGC ECOSYSTEM ↗', '#f7c948', '#080808')}`)
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal notification (same for all types)
// ─────────────────────────────────────────────────────────────────────────────
function buildInternalEmail(data: {
  name: string; email: string; type: string
  organization?: string; socialHandle?: string
  followersRange?: string; message?: string
}) {
  const typeLabel = TYPE_LABELS[data.type] ?? data.type
  const rows: [string, string][] = [
    ['Email', data.email],
    ['Type', typeLabel],
    ['Organization', data.organization || '—'],
    ...(data.type === 'kol' ? [
      ['Social Handle', data.socialHandle || '—'] as [string, string],
      ['Followers', data.followersRange || '—'] as [string, string],
    ] : []),
  ]
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#080808;font-family:monospace;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;">
<tr><td align="center" style="padding:40px 16px;">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0d0d0d;border:1px solid #1e1e1e;border-radius:4px;overflow:hidden;">
<tr><td style="height:2px;background:#aadf2e;"></td></tr>
<tr><td style="padding:32px 40px;">
  <p style="margin:0 0 20px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#aadf2e;font-weight:700;">⚡ NEW APPLICATION — WGC INTERNAL</p>
  <h2 style="margin:0 0 24px;font-size:22px;color:#f5f5f5;font-weight:900;">${data.name}</h2>
  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
    ${rows.map(([k, v]) => `<tr>
      <td style="padding:10px 0;border-bottom:1px solid #161616;width:130px;color:#555;">${k}</td>
      <td style="padding:10px 0;border-bottom:1px solid #161616;color:#f5f5f5;font-weight:600;">${v}</td>
    </tr>`).join('')}
  </table>
  ${data.message ? `<div style="margin-top:24px;padding:16px;background:#111;border-left:2px solid #aadf2e;">
    <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#555;">Message / Pitch</p>
    <p style="margin:0;font-size:13px;color:#ccc;line-height:1.7;">${data.message.replace(/\n/g, '<br/>')}</p>
  </div>` : ''}
</td></tr>
</table>
</td></tr></table>
</body></html>`
}

// ─────────────────────────────────────────────────────────────────────────────
// Route handler
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, type, organization, message, socialHandle, followersRange } = body

    if (!name || !email || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Pick the right template
    const htmlMap: Record<string, string> = {
      builder:   emailBuilder(name, organization),
      organizer: emailOrganizer(name, organization),
      partner:   emailPartner(name, organization),
      media:     emailMedia(name, organization),
      kol:       emailKol(name, organization, socialHandle, followersRange),
    }
    const confirmationHtml = htmlMap[type] ?? emailBuilder(name, organization)

    const subjectMap: Record<string, string> = {
      builder:   '🛠️ Application Received — WGC Builder Programme',
      organizer: '🎪 Application Received — WGC Event Organizer',
      partner:   '🤝 Application Received — WGC Partnership',
      media:     '📡 Media Accreditation — WGC',
      kol:       '⭐ KOL Application — You\'re on the WGC Radar',
    }

    const [confirmResult, internalResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'WGC Applications <onboarding@resend.dev>',
        to: [email],
        subject: subjectMap[type] ?? '⚡ Application Received — WGC Council',
        html: confirmationHtml,
      }),
      resend.emails.send({
        from: 'WGC Applications <onboarding@resend.dev>',
        to: ['delivered@resend.dev'], // ← replace with your team email
        subject: `[WGC APP] ${TYPE_LABELS[type] ?? type} — ${name}`,
        html: buildInternalEmail({ name, email, type, organization, message, socialHandle, followersRange }),
      }),
    ])

    if (confirmResult.status === 'rejected') console.error('Confirmation email failed:', confirmResult.reason)
    if (internalResult.status === 'rejected') console.error('Internal email failed:', internalResult.reason)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 })
  }
}
