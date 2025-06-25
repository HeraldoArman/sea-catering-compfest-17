import { type NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/subscription", "/dashboard"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // If it's not a protected route, allow access
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  try {
    // Get the session token from cookies
    const sessionToken = request.cookies.get("better-auth.session_token")?.value

    if (!sessionToken) {
      // No session token found, redirect to sign-up
      const signUpUrl = new URL("/sign-up", request.url)
      return NextResponse.redirect(signUpUrl)
    }

    // For now, we'll assume the session is valid if the token exists
    // In a production environment, you would validate the token against your database
    // or use a JWT verification method

    // You can add additional validation here by making an API call to verify the session
    // For example:
    // const response = await fetch(`${request.nextUrl.origin}/api/auth/verify`, {
    //   headers: { cookie: request.headers.get("cookie") || "" }
    // })
    // if (!response.ok) throw new Error("Invalid session")

    // Valid session, allow access to protected route
    return NextResponse.next()
  } catch (error) {
    console.error("Middleware auth error:", error)

    // On error, redirect to sign-up for safety
    const signUpUrl = new URL("/sign-up", request.url)

    // Clear the invalid session cookie
    const response = NextResponse.redirect(signUpUrl)
    response.cookies.delete("better-auth.session_token")
    return response
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
