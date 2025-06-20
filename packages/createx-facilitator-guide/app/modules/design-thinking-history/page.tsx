'use client';

import React from 'react';
import { ArrowLeft, Clock, Users, BookOpen, ChevronRight, Lightbulb, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DesignThinkingHistoryPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        href="/modules"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Modules
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 mb-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="font-medium">Foundations • Chapter 2</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                A Brief History of Design Thinking
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Journey through the evolution of design thinking from Bauhaus to AI-augmented design,
                                understanding key developments that shaped modern innovation methodologies.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4 mr-2" />
                            60 minutes
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Users className="w-4 h-4 mr-2" />
                            Beginner
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <BookOpen className="w-4 h-4 mr-2" />
                            3 sections
                        </div>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4">
                        Learning Objectives
                    </h2>
                    <ul className="space-y-2">
                        <li className="flex items-start text-blue-800 dark:text-blue-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                            Trace design thinking evolution from 1919 to present
                        </li>
                        <li className="flex items-start text-blue-800 dark:text-blue-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                            Understand key movements and their contributions
                        </li>
                        <li className="flex items-start text-blue-800 dark:text-blue-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                            Connect historical principles to modern practice
                        </li>
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1: The Bauhaus Foundation (1919-1933) */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                The Bauhaus Foundation (1919-1933)
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                The story of design thinking begins with the Bauhaus school in Germany, where Walter Gropius
                                revolutionized education by combining art, craft, and technology. This foundational period
                                established key principles that remain central to design thinking today.
                            </p>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">Key Bauhaus Principles</h3>
                                <ul className="space-y-2">
                                    <li>• <strong>Form follows function</strong> - Design should serve purpose</li>
                                    <li>• <strong>Interdisciplinary collaboration</strong> - Breaking down silos</li>
                                    <li>• <strong>Human-centered approach</strong> - Design for real human needs</li>
                                    <li>• <strong>Experimentation and iteration</strong> - Learning through making</li>
                                </ul>
                            </div>

                            <p>
                                The Bauhaus approach of "learning by doing" and integrating multiple disciplines
                                became the foundation for modern design education and practice. Their emphasis on
                                understanding human needs through direct observation and experimentation laid the
                                groundwork for what we now call user-centered design.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Corporate Design Revolution (1960s-1980s) */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Corporate Design Revolution (1960s-1980s)
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                The 1960s marked design thinking's entry into corporate innovation. Companies like IBM,
                                3M, and Procter & Gamble began formalizing design processes to drive business innovation
                                and solve complex organizational challenges.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-6">
                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">IBM Design Program</h3>
                                    <p className="text-sm">
                                        Introduced systematic design methodology combining user research,
                                        iterative prototyping, and cross-functional teams.
                                    </p>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">Stanford d.school</h3>
                                    <p className="text-sm">
                                        Established design thinking as academic discipline with structured
                                        process and human-centered methodology.
                                    </p>
                                </div>
                            </div>

                            <p>
                                This era saw the emergence of structured design processes, including the early versions
                                of what would become the double-diamond model. The focus shifted from individual creativity
                                to systematic innovation methodologies that could be taught and replicated.
                            </p>
                        </div>
                    </section>

                    {/* Section 3: Digital Age Evolution (1990s-Present) */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Digital Age Evolution (1990s-Present)
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                The digital revolution transformed design thinking from physical product design to
                                service design, experience design, and now AI-augmented innovation. This period
                                introduced rapid prototyping, agile methodologies, and data-driven iteration.
                            </p>

                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">Modern Evolution Timeline</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-16 text-sm font-medium">1990s</div>
                                        <div className="text-sm">IDEO popularizes human-centered design</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-16 text-sm font-medium">2000s</div>
                                        <div className="text-sm">Service design and experience design emerge</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-16 text-sm font-medium">2010s</div>
                                        <div className="text-sm">Design thinking goes mainstream in business</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-16 text-sm font-medium">2020s</div>
                                        <div className="text-sm">AI-augmented design and remote collaboration</div>
                                    </div>
                                </div>
                            </div>

                            <p>
                                Today's design thinking integrates artificial intelligence, remote collaboration tools,
                                and real-time data analysis. The CreateX methodology represents the latest evolution,
                                combining traditional human-centered approaches with AI capabilities and distributed
                                innovation practices.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/modules/creativity-fundamentals"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous: What Is Creativity?
                    </Link>

                    <Link
                        href="/modules/creative-confidence"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        Next: The Science of Creative Confidence
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
