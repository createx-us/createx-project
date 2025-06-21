"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useProgress } from '@/components/providers/ProgressProvider';
import { LanguageSelector } from '@/components/LanguageSelector';
import { BookOpen, Menu, X, Sun, Moon, Home, Settings, Users, } from 'lucide-react';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { getTotalProgress } = useProgress();
    const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
    const pathname = usePathname();

    // Get current locale from pathname
    const pathParts = pathname?.split('/') || [];
    const pathLocale = pathParts.length > 1 ? pathParts[1] : '';
    const currentLocale = locales.includes(pathLocale as Locale) ? pathLocale as Locale : defaultLocale;

    // Determine the actual current theme (resolve 'system' to 'light' or 'dark')
    useEffect(() => {
        if (theme === 'system') {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setCurrentTheme(isDark ? 'dark' : 'light');
        } else {
            setCurrentTheme(theme as 'light' | 'dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        if (currentTheme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    // Navigation items with localized routes and labels
    const navItems: Array<{
        href: string;
        labelKey: keyof typeof defaultLabels;
        icon: React.ComponentType<{ className?: string }>;
        external?: boolean;
    }> = [
            { href: 'https://dt.createx.us', labelKey: 'home', icon: Home, external: true },
            { href: `/${currentLocale}/research`, labelKey: 'research', icon: Settings, external: false },
            { href: `/${currentLocale}/community`, labelKey: 'community', icon: Users, external: false },
            { href: `/${currentLocale}/modules`, labelKey: 'modules', icon: BookOpen, external: false },
        ];

    // Default labels to ensure we always have something to display
    const defaultLabels = {
        home: 'Home',
        research: 'Research',
        community: 'Community',
        modules: 'Modules'
    };

    // Function to get localized label
    const getLabel = (labelKey: keyof typeof defaultLabels): string => {
        // For now, we'll use default English labels
        // In a future update, we can load the dictionary client-side 
        // or pass it as a prop from parent components
        const labels = {
            'en': {
                home: 'Home',
                research: 'Research',
                community: 'Community',
                modules: 'Modules'
            },
            'zh': {
                home: '首页',
                research: '研究',
                community: '社区',
                modules: '模块'
            }
        };

        return labels[currentLocale]?.[labelKey] || defaultLabels[labelKey];
    };

    // Function to get theme labels
    const getThemeLabel = (theme: 'light' | 'dark'): string => {
        const themeLabels = {
            'en': {
                light: 'Light Mode',
                dark: 'Dark Mode'
            },
            'zh': {
                light: '浅色模式',
                dark: '深色模式'
            }
        };

        return themeLabels[currentLocale]?.[theme] || themeLabels['en'][theme];
    };

    // Function to get progress label
    const getProgressLabel = (): string => {
        const progressLabels = {
            'en': 'completed',
            'zh': '已完成'
        };

        return progressLabels[currentLocale] || progressLabels['en'];
    };

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <a
                            href="https://www.createx.us"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:opacity-80 transition-opacity"
                        >
                            {/* Next Image with width and height */}
                            <Image
                                src="https://createx.us/content/images/2025/06/CreateX-Logo_2025-05.png"
                                alt="CreateX Logo"
                                width={55}
                                height={55}
                                className="object-contain"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            const label = getLabel(item.labelKey);
                            return item.external ? (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{label}</span>
                                </a>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{label}</span>
                                </Link>
                            );
                        })}

                        {/* Progress Indicator */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{getTotalProgress()} {getProgressLabel()}</span>
                        </div>

                        {/* Language Selector */}
                        <LanguageSelector />

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {currentTheme === 'light' ? (
                                <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <Sun className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            )}
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <LanguageSelector />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            const label = getLabel(item.labelKey);
                            return item.external ? (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span>{label}</span>
                                </a>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span>{label}</span>
                                </Link>
                            );
                        })}

                        <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                            Progress: {getTotalProgress()} {getProgressLabel()}
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            {currentTheme === 'light' ? (
                                <>
                                    <Moon className="w-5 h-5" />
                                    <span>{getThemeLabel('dark')}</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="w-5 h-5" />
                                    <span>{getThemeLabel('light')}</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
