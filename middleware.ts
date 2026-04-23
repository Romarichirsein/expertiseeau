import { type NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@/lib/supabase/server';

const intlMiddleware = createIntlMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr'
});

export default async function middleware(request: NextRequest) {
  // 1. Refresh the Supabase session
  const supabaseResponse = await updateSession(request);

  // 2. Handle internationalization
  const intlResponse = intlMiddleware(request);

  // 3. Merging cookies from supabaseResponse into intlResponse
  // This is crucial to ensure the session cookie is persisted 
  // while keeping the locale redirection logic.
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, {
      ...cookie,
      // Ensure the cookie settings are preserved
    });
  });

  // 4. Protected Routes Logic
  // Check if the user is logged in for /dashboard and /admin routes
  const pathname = request.nextUrl.pathname;
  if (pathname.includes('/dashboard') || pathname.includes('/admin')) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const locale = pathname.split('/')[1] || 'fr';
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
};
