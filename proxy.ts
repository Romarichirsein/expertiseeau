import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { updateSession } from '@/lib/supabase/middleware';
import { createClient } from '@/lib/supabase/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1. Refresh the Supabase session
  const supabaseResponse = await updateSession(request);

  // 2. Handle internationalization
  const intlResponse = intlMiddleware(request);

  // 3. Merge cookies from supabaseResponse into intlResponse
  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, {
      ...cookie,
    });
  });

  // 4. Protected Routes Logic
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
  matcher: ['/', '/(fr|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
