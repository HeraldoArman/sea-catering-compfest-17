import { type NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/subscription", "/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  try {

    const sessionToken = request.cookies.get("better-auth.session_token")?.value

    if (!sessionToken) {

      const signUpUrl = new URL("/sign-up", request.url)
      return NextResponse.redirect(signUpUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Middleware auth error:", error)

    const signUpUrl = new URL("/sign-up", request.url)


    const response = NextResponse.redirect(signUpUrl)
    
    response.cookies.delete("better-auth.session_token")
    return response
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
