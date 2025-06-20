'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Users, BookOpen, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ModuleContent } from '@/lib/content';

interface ModulePageProps {
    moduleId: string;
}

interface NavigationInfo {
    prev?: { id: string; title: string };
    next?: { id: string; title: string };
}

const trackColors: Record<string, string> = {
    'Foundations': 'blue',
    'Design Process': 'purple',
    'Workshop Design': 'green',
    'AI & Technology': 'orange',
    'Case Studies': 'teal',
    'Professional Growth': 'pink'
};

const colorClasses = {
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-900/20',
        text: 'text-blue-900 dark:text-blue-100',
        border: 'border-blue-200 dark:border-blue-800',
        accent: 'text-blue-600 dark:text-blue-400'
    },
    purple: {
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        text: 'text-purple-900 dark:text-purple-100',
        border: 'border-purple-200 dark:border-purple-800',
        accent: 'text-purple-600 dark:text-purple-400'
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-900/20',
        text: 'text-green-900 dark:text-green-100',
        border: 'border-green-200 dark:border-green-800',
        accent: 'text-green-600 dark:text-green-400'
    },
    orange: {
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        text: 'text-orange-900 dark:text-orange-100',
        border: 'border-orange-200 dark:border-orange-800',
        accent: 'text-orange-600 dark:text-orange-400'
    },
    teal: {
        bg: 'bg-teal-50 dark:bg-teal-900/20',
        text: 'text-teal-900 dark:text-teal-100',
        border: 'border-teal-200 dark:border-teal-800',
        accent: 'text-teal-600 dark:text-teal-400'
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-900/20',
        text: 'text-pink-900 dark:text-pink-100',
        border: 'border-pink-200 dark:border-pink-800',
        accent: 'text-pink-600 dark:text-pink-400'
    }
};

export default function DynamicModulePage({ moduleId }: ModulePageProps) {
    const [module, setModule] = useState<ModuleContent | null>(null);
    const [navigation, setNavigation] = useState<NavigationInfo>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadModule() {
            try {
                setLoading(true);
                const response = await fetch(`/api/modules/${moduleId}`);

                if (!response.ok) {
                    throw new Error('Module not found');
                }

                const data = await response.json();
                setModule(data.module);
                setNavigation(data.navigation);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load module');
            } finally {
                setLoading(false);
            }
        }

        loadModule();
    }, [moduleId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-8">
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !module) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Module Not Found
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            {error || 'The requested module could not be found.'}
                        </p>
                        <Link
                            href="/modules"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Modules
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const trackColor = (trackColors[module.track] || 'blue') as keyof typeof colorClasses;
    const colors = colorClasses[trackColor];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        href="/modules"
                        className={`inline-flex items-center ${colors.accent} hover:opacity-80 transition-opacity`}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Modules
                    </Link>
                </div>

                {/* Header */}
                <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8`}>
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className={`flex items-center space-x-2 text-sm ${colors.accent} mb-2`}>
                                <div className={`w-2 h-2 rounded-full bg-current`}></div>
                                <span className="font-medium">{module.track} • Chapter {module.chapter}</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                {module.title}
                            </h1>
                            <div className="prose prose-gray dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed">
                                    {module.metadata.description || 'Comprehensive module content covering essential facilitation concepts and techniques.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4 mr-2" />
                            {module.duration}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Users className="w-4 h-4 mr-2" />
                            {module.difficulty}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Interactive content
                        </div>
                    </div>
                </div>

                {/* Learning Objectives */}
                {module.learningObjectives.length > 0 && (
                    <div className={`${colors.bg} rounded-xl p-6 mb-8 border ${colors.border}`}>
                        <h2 className={`text-xl font-semibold ${colors.text} mb-4`}>
                            Learning Objectives
                        </h2>
                        <ul className="space-y-2">
                            {module.learningObjectives.map((objective, index) => (
                                <li key={index} className={`flex items-start ${colors.text}`}>
                                    <ChevronRight className={`w-5 h-5 mr-2 mt-0.5 ${colors.accent}`} />
                                    {objective}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Module Content */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
                    <div
                        className="prose prose-gray dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: module.html }}
                    />
                </div>

                {/* Progress Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className={`inline-flex items-center px-4 py-2 ${colors.accent} border border-current rounded-lg hover:bg-current hover:text-white transition-colors`}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark as Complete
                            </button>
                            <button className="inline-flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <BookOpen className="w-4 h-4 mr-2" />
                                Take Notes
                            </button>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Progress: 1 of {module.learningObjectives.length} objectives
                        </div>
                    </div>
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700">
                    {navigation.prev ? (
                        <Link
                            href={`/modules/${navigation.prev.id}`}
                            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Previous: {navigation.prev.title}
                        </Link>
                    ) : (
                        <div></div>
                    )}

                    {navigation.next && (
                        <Link
                            href={`/modules/${navigation.next.id}`}
                            className={`flex items-center ${colors.accent} hover:opacity-80 transition-opacity`}
                        >
                            Next: {navigation.next.title}
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
