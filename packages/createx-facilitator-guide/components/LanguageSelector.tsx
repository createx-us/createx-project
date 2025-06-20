'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { locales, languageNames, defaultLocale, type Locale } from '@/lib/i18n';

export function LanguageSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Get current locale from pathname
    const pathParts = pathname.split('/');
    const pathLocale = pathParts.length > 1 ? pathParts[1] : '';
    const currentLocale = locales.includes(pathLocale as Locale) ? pathLocale as Locale : defaultLocale;

    const handleLanguageChange = (newLocale: Locale) => {
        // Create new path with the selected locale
        let newPath;
        
        if (newLocale === defaultLocale) {
            // For default locale, just remove the locale segment
            const pathWithoutLocale = pathParts.length > 1 && locales.includes(pathParts[1] as Locale) 
                ? '/' + pathParts.slice(2).join('/') 
                : pathname;
            newPath = pathWithoutLocale || '/';
        } else {
            // For other locales, replace or add the locale segment
            if (locales.includes(pathParts[1] as Locale)) {
                // Replace existing locale
                pathParts[1] = newLocale;
                newPath = pathParts.join('/');
            } else {
                // Add locale after first slash
                newPath = `/${newLocale}${pathname}`;
            }
        }

        // Handle trailing slash consistency
        if (newPath.length > 1 && newPath.endsWith('/')) {
            newPath = newPath.slice(0, -1);
        }
        
        router.push(newPath);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Select language"
            >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{languageNames[currentLocale]}</span>
                <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                        <div className="py-1">
                            {locales.map((locale) => (
                                <button
                                    key={locale}
                                    onClick={() => handleLanguageChange(locale)}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${locale === currentLocale
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                            : 'text-gray-700 dark:text-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{languageNames[locale]}</span>
                                        {locale === currentLocale && (
                                            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
