"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useProgress } from '@/components/providers/ProgressProvider';
import { LanguageSelector } from '@/components/LanguageSelector';
import { BookOpen, Menu, X, Sun, Moon, Settings, Users, Award, FileText } from 'lucide-react';

export function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { getTotalProgress } = useProgress();

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const navItems: Array<{
        href: string;
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        external?: boolean;
    }> = [
            { href: '/modules', label: 'Modules', icon: BookOpen },
            { href: '/workshops', label: 'Workshops', icon: Users },
            { href: '/toolkit', label: 'Toolkit', icon: FileText },
            { href: '/research', label: 'Research', icon: Settings },
            { href: '/community', label: 'Community', icon: Users },
            { href: 'https://createx.us/about-us/', label: 'About', icon: Award, external: true },
        ];

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
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return item.external ? (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </a>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    <IconComponent className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Progress Indicator */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>{getTotalProgress()} completed</span>
                        </div>

                        {/* Language Selector */}
                        <LanguageSelector />

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            {theme === 'light' ? (
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
                                    <span>{item.label}</span>
                                </a>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        <div className="px-3 py-2 text-sm text-gray-600 dark:text-gray-300">
                            Progress: {getTotalProgress()} completed
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            {theme === 'light' ? (
                                <>
                                    <Moon className="w-5 h-5" />
                                    <span>Dark Mode</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="w-5 h-5" />
                                    <span>Light Mode</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
