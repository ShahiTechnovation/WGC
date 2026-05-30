import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const host = request.headers.get('host') || ''

  // Match afk.worldgamingcouncil.com or afk.localhost / afk.127.0.0.1 for development
  const isAfkSubdomain =
    host.startsWith('afk.worldgamingcouncil.com') ||
    host.startsWith('afk.localhost:') ||
    host.startsWith('afk.127.0.0.1:')

  if (isAfkSubdomain) {
    // If the path doesn't already start with /afk, rewrite it
    if (!url.pathname.startsWith('/afk')) {
      url.pathname = `/afk${url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - any asset containing a file extension (e.g. png, jpg, svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|[\\w-]+\\.\\w+).*)',
  ],
}
