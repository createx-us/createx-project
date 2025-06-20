import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, localeMappings, type Locale } from './lib/i18n';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;

  // Detect infinite redirect loop
  const MAX_REDIRECTS = 3;
  const redirectCount = parseInt(request.headers.get('x-redirect-count') || '0');
  
  if (redirectCount >= MAX_REDIRECTS) {
    console.error('Redirect loop detected, serving page without redirects');
    return NextResponse.next();
  }

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Helper function to check if a locale is valid
  const isValidLocale = (locale: string): locale is Locale => {
    return locales.includes(locale as Locale);
  };

  // Special root path handling
  if (pathname === '/') {
    // Get locale from cookie or header
    const acceptLanguage = request.headers.get('accept-language') || '';
    const languageTags = acceptLanguage
      .split(',')
      .map(lang => lang.split(';')[0].trim());
    
    // Extract the base language codes and map regional variants
    let preferredLocale: Locale | undefined;
    
    // First try exact matches
    const exactMatch = languageTags.find(tag => isValidLocale(tag));
    if (exactMatch && isValidLocale(exactMatch)) {
      preferredLocale = exactMatch;
    } else {
      // Then try to map variants (en-US → en, zh-CN → zh)
      const variantMatch = languageTags.find(tag => localeMappings[tag]);
      if (variantMatch) {
        preferredLocale = localeMappings[variantMatch];
      } else {
        // Finally, try to match just the language part (en-* → en, zh-* → zh)
        for (const tag of languageTags) {
          const langCode = tag.split('-')[0];
          if (isValidLocale(langCode)) {
            preferredLocale = langCode;
            break;
          }
        }
      }
    }

    // Use preferred locale or default
    const locale = preferredLocale || defaultLocale;

    // Just direct to appropriate locale page
    const response = NextResponse.redirect(
      new URL(`/${locale}`, request.url)
    );

    // Track redirects to prevent loops
    response.headers.set('x-redirect-count', (redirectCount + 1).toString());
    
    return response;
  }
  
  // If pathname doesn't have locale and isn't root, handle normally
  if (!pathnameHasLocale && pathname !== '/') {
    // For non-root paths without locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Skip static files
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};