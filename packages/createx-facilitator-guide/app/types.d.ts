import { Locale } from '@/lib/i18n';

// Add global type definitions for page props in Next.js app router
declare module 'next/dist/build/templates/app-page' {
  export interface AppPageType {
    params: {
      lang: string;
    };
  }
}

// Define proper page params type for localized pages
export interface LocaleParams {
  params: {
    lang: Locale | string;
  };
}