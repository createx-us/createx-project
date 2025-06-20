import { redirect } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';

export default function Home() {
  // Explicitly redirect to the default locale to avoid redirect loops
  redirect(`/${defaultLocale}`);
}