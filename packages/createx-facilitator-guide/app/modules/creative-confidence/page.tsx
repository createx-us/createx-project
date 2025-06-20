'use client';

import React from 'react';
import { ArrowLeft, Clock, Users, BookOpen, ChevronRight, Brain, Target, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CreativeConfidencePage() {
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
                                <span className="font-medium">Foundations • Chapter 3</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                The Science of Creative Confidence
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Master the psychology and neuroscience of creativity. Build confidence at individual
                                and team levels through evidence-based techniques and AI-augmented approaches.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4 mr-2" />
                            50 minutes
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Users className="w-4 h-4 mr-2" />
                            Intermediate
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <BookOpen className="w-4 h-4 mr-2" />
                            4 sections
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
                            Understand psychological foundations of creative confidence
                        </li>
                        <li className="flex items-start text-blue-800 dark:text-blue-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                            Learn measurement techniques for creative confidence
                        </li>
                        <li className="flex items-start text-blue-800 dark:text-blue-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-blue-600" />
                            Apply AI as confidence amplifier
                        </li>
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1: Neuroscience of Creativity */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Neuroscience of Creativity
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Recent neuroscience research reveals that creativity is not a single cognitive function
                                but a complex interplay of brain networks. Understanding these mechanisms helps facilitators
                                design experiences that enhance creative confidence.
                            </p>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">The Three Brain Networks</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                            <span className="text-xl">🎯</span>
                                        </div>
                                        <h4 className="font-semibold mb-2">Executive Network</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Controls attention, evaluates ideas, manages working memory
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                            <span className="text-xl">🌐</span>
                                        </div>
                                        <h4 className="font-semibold mb-2">Default Network</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Generates spontaneous thoughts, connects disparate ideas
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                            <span className="text-xl">⚡</span>
                                        </div>
                                        <h4 className="font-semibold mb-2">Salience Network</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Switches between networks, identifies relevant information
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p>
                                Creative insights emerge when these networks work in harmony. The default network generates
                                novel associations, the salience network identifies promising ideas, and the executive network
                                evaluates and refines them. Facilitators can design activities that activate this flow.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Psychological Foundations */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Psychological Foundations
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Creative confidence is built on four psychological pillars that facilitators must understand
                                and nurture. Each pillar represents both an individual capability and a team dynamic.
                            </p>

                            <div className="space-y-4 my-6">
                                <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">1</div>
                                    <div>
                                        <h4 className="font-semibold text-blue-900 dark:text-blue-100">Curiosity & Wonder</h4>
                                        <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                                            The drive to explore, question assumptions, and seek novel perspectives.
                                            Curiosity is the fuel of creative thinking.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">2</div>
                                    <div>
                                        <h4 className="font-semibold text-purple-900 dark:text-purple-100">Tolerance for Ambiguity</h4>
                                        <p className="text-purple-800 dark:text-purple-200 text-sm mt-1">
                                            Comfort with uncertainty, incomplete information, and multiple possible solutions.
                                            Essential for creative exploration.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">3</div>
                                    <div>
                                        <h4 className="font-semibold text-green-900 dark:text-green-100">Experimental Mindset</h4>
                                        <p className="text-green-800 dark:text-green-200 text-sm mt-1">
                                            Willingness to try new approaches, learn from failure, and iterate rapidly.
                                            Embraces prototyping over perfection.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-1">4</div>
                                    <div>
                                        <h4 className="font-semibold text-orange-900 dark:text-orange-100">Collaborative Spirit</h4>
                                        <p className="text-orange-800 dark:text-orange-200 text-sm mt-1">
                                            Recognition that best ideas emerge through diverse perspectives and collective intelligence.
                                            Values building on others' ideas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Measurement Techniques */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Measurement & Assessment
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Creative confidence can be measured through both qualitative observations and quantitative assessments.
                                The CreateX methodology includes specific tools for tracking individual and team progress.
                            </p>

                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">CreateX Confidence Assessment Framework</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">Individual Indicators</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Idea generation fluency</li>
                                            <li>• Risk-taking behavior</li>
                                            <li>• Feedback receptivity</li>
                                            <li>• Iteration willingness</li>
                                            <li>• Perspective-taking ability</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-3">Team Indicators</h4>
                                        <ul className="text-sm space-y-1">
                                            <li>• Psychological safety levels</li>
                                            <li>• Idea building frequency</li>
                                            <li>• Divergent thinking patterns</li>
                                            <li>• Conflict resolution approach</li>
                                            <li>• Collective ownership of outcomes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <p>
                                Regular assessment helps facilitators adjust their approach and provides participants
                                with concrete evidence of their creative growth, reinforcing positive feedback loops.
                            </p>
                        </div>
                    </section>

                    {/* Section 4: AI as Confidence Amplifier */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                AI as Confidence Amplifier
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Artificial intelligence can serve as a powerful amplifier of creative confidence by providing
                                non-judgmental collaboration, rapid iteration capabilities, and diverse perspective generation.
                            </p>

                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">AI Confidence Techniques</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium mb-2">🎭 Creative Sparring Partner</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Use AI to brainstorm without judgment, explore wild ideas, and overcome initial hesitation
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">🔄 Rapid Prototyping Assistant</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Generate quick mockups, scenarios, and variations to test ideas before full investment
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">🌍 Perspective Multiplier</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Access diverse viewpoints, cultural perspectives, and domain expertise instantly
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium mb-2">📊 Progress Tracker</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Monitor creative output patterns and provide personalized confidence-building feedback
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p>
                                The key is positioning AI as a collaborator rather than replacement, helping participants
                                explore beyond their comfort zones while maintaining human agency and creative ownership.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/modules/design-thinking-history"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous: A Brief History of Design Thinking
                    </Link>

                    <Link
                        href="/modules/createx-mission"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                        Next: Mission & Principles of CreateX
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
