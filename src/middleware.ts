import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('auth_token')?.value

  const signInUrl = new URL('/?signin', request.url)


  if (!token) {
    if (request.nextUrl.pathname === '/?signin') {
      return NextResponse.next()
    }
    return NextResponse.redirect(signInUrl)
  }
}


export const config =  {
  matcher: '/dashboard/:path*',
}
