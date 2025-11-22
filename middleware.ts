import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
  const response = NextResponse.next();

  // Security Headers
  const securityHeaders = {
    // Prevent clickjacking attacks
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Enable XSS protection (legacy browsers)
    'X-XSS-Protection': '1; mode=block',
    
    // Referrer Policy - control how much referrer information is sent
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions Policy - restrict browser features
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-inline needed for dark mode script, unsafe-eval for Next.js
      "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for Tailwind
        "img-src 'self' data: blob: https://media.licdn.com https://*.licdn.com https:",
      "font-src 'self' data:",
        "connect-src 'self' https://media.licdn.com https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-src 'none'",
      "object-src 'none'",
    ].join('; '),
    
      // Strict Transport Security (HSTS) - enforce HTTPS (only in production)
      ...(process.env.NODE_ENV === 'production' && {
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      }),
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
      if (value) {
    response.headers.set(key, value);
      }
  });

  return response;
  } catch (error) {
    // If middleware fails, return a basic response
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};


