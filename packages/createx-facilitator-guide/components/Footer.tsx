'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, MessageCircle, Mail, Users, Heart } from 'lucide-react';
import { locales, defaultLocale, type Locale } from '@/lib/i18n';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    // Get current locale from pathname
    const pathParts = pathname?.split('/') || [];
    const pathLocale = pathParts.length > 1 ? pathParts[1] : '';
    const currentLocale = locales.includes(pathLocale as Locale) ? pathLocale as Locale : defaultLocale;

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Mission */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <Image
                                src="https://createx.us/content/images/2025/06/CreateX-Logo_2025-05.png"
                                alt="CreateX Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                CreateX
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Empowering facilitators with AI-enhanced design thinking tools and methodologies
                            for transformational learning experiences.
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>Made with</span>
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>by the CreateX community</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Learn
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://www.createx.us"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    CreateX Home
                                </a>
                            </li>
                            <li>
                                <Link
                                    href={`/${currentLocale}/modules`}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                >
                                    Facilitator Modules
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CreateX Network */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            CreateX Network
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://createx.us/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                >
                                    Main Website
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://createx.us/community/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                >
                                    Community
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://createx.us/workshops/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                >
                                    Join Workshops
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://createx.us/about-us/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                                >
                                    About CreateX
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Community & Support */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                            Community
                        </h3>
                        <ul className="space-y-3 mb-6">
                            <li>
                                <a
                                    href="https://discord.gg/createx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span>Discord Community</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/createx-foundation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    <Github className="h-4 w-4" />
                                    <span>GitHub Repository</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:facilitators@createx.io"
                                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span>Support Email</span>
                                </a>
                            </li>
                            <li>
                                <Link
                                    href={`/${currentLocale}/community`}
                                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    <Users className="h-4 w-4" />
                                    <span>Community Hub</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                © {currentYear} CreateX Foundation. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={`/${currentLocale}/privacy`}
                                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href={`/${currentLocale}/terms`}
                                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                    Terms of Service
                                </Link>
                                <Link
                                    href={`/${currentLocale}/license`}
                                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                    CC BY-SA 4.0
                                </Link>
                            </div>
                        </div>

                        <div className="text-xs text-gray-400 dark:text-gray-500">
                            Version 0.1.1 • Updated June 2025
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
