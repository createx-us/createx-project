import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'CreateX Protocol - Decentralized Innovation Education Platform',
    description: 'CreateX Protocol enables decentralized innovation education through blockchain technology, smart contracts, and community-driven learning.',
    viewport: 'width=device-width, initial-scale=1',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    themeColor: '#3b82f6',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    );
}
