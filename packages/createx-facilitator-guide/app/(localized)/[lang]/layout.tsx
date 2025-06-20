
import React from 'react';
import { locales, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Validate that the lang parameter is supported
  if (!locales.includes(params.lang as Locale)) {
    notFound();
  }

  return <>{children}</>;
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}