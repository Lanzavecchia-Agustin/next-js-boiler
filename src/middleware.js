import { NextResponse } from 'next/server';
import { noAuthPaths } from './app/(noAuth)/(constants)';
import { AuthPaths } from './app/(Auth)/(constants)';

export function middleware(request) {
  const token = request.cookies.get('token');

  // If no token is present and the user tries to access a protected route, redirect to `/login`
  if (!token && AuthPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated and tries to access any `noAuth` page, redirect them to `/home`
  if (token && noAuthPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Allow the request to continue if the conditions above are not met
  return NextResponse.next();
}

// Apply middleware to specific routes, including the base route and protected routes
export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/verify-email',
    '/two-step-verification',
    '/home/:path*', // Protect all routes under /home
  ],
};
