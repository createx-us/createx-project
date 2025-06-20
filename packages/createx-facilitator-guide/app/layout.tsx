import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ProgressProvider } from '@/components/providers/ProgressProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { defaultLocale } from '@/lib/i18n';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CreateX Facilitator Guide',
    description: 'Comprehensive guide for workshop facilitators and community leaders using the CreateX Protocol platform.',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#3b82f6',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Use default locale for the main layout
    const locale = defaultLocale;
    
    return (
        <html lang={locale} className="scroll-smooth">
            <body className={inter.className}>
                <ThemeProvider>
                    <ProgressProvider>
                        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:bg-gray-900">
                            <Navigation />
                            <main className="flex-1">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </ProgressProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
