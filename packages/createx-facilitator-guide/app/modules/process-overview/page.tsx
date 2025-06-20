'use client';

import React from 'react';
import { ArrowLeft, Clock, Users, BookOpen, ChevronRight, Zap, RefreshCw, Layers } from 'lucide-react';
import Link from 'next/link';

export default function ProcessOverviewPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        href="/modules"
                        className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Modules
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="flex items-center space-x-2 text-sm text-purple-600 dark:text-purple-400 mb-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span className="font-medium">Design Process • Chapter 6</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Process Overview: Double-Diamond × Sprint Loop
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Master the CreateX methodology combining double-diamond thinking with micro-sprint execution.
                                Learn how to structure innovation workflows that balance exploration with rapid iteration.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4 mr-2" />
                            45 minutes
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Users className="w-4 h-4 mr-2" />
                            Intermediate
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <BookOpen className="w-4 h-4 mr-2" />
                            3 sections
                        </div>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-4">
                        Learning Objectives
                    </h2>
                    <ul className="space-y-2">
                        <li className="flex items-start text-purple-800 dark:text-purple-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-purple-600" />
                            Understand the double-diamond framework
                        </li>
                        <li className="flex items-start text-purple-800 dark:text-purple-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-purple-600" />
                            Learn the 90-minute micro-sprint loop
                        </li>
                        <li className="flex items-start text-purple-800 dark:text-purple-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-purple-600" />
                            Master AI integration points
                        </li>
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1: The Double Diamond Framework */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                The Double Diamond Framework
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                The double diamond represents the dual nature of innovation: first exploring the problem space
                                (Discover → Define), then exploring the solution space (Develop → Deliver). Each diamond
                                alternates between divergent and convergent thinking.
                            </p>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4 text-center">The Four Phases</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* First Diamond */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-center text-purple-700 dark:text-purple-300">Problem Space</h4>
                                        <div className="space-y-3">
                                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                                <h5 className="font-semibold text-blue-800 dark:text-blue-200">1. Discover</h5>
                                                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                                    Research, observe, empathize. Gather diverse insights about user needs and context.
                                                </p>
                                                <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                                                    🔄 Divergent thinking
                                                </div>
                                            </div>
                                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                                <h5 className="font-semibold text-green-800 dark:text-green-200">2. Define</h5>
                                                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                                    Synthesize insights, frame problems, establish point of view and success criteria.
                                                </p>
                                                <div className="text-xs text-green-600 dark:text-green-400 mt-2">
                                                    🎯 Convergent thinking
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second Diamond */}
                                    <div className="space-y-4">
                                        <h4 className="font-semibold text-center text-purple-700 dark:text-purple-300">Solution Space</h4>
                                        <div className="space-y-3">
                                            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                                <h5 className="font-semibold text-orange-800 dark:text-orange-200">3. Develop</h5>
                                                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                                                    Ideate, prototype, experiment. Generate and test multiple solution approaches.
                                                </p>
                                                <div className="text-xs text-orange-600 dark:text-orange-400 mt-2">
                                                    🔄 Divergent thinking
                                                </div>
                                            </div>
                                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                                <h5 className="font-semibold text-red-800 dark:text-red-200">4. Deliver</h5>
                                                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                                                    Refine, implement, measure. Execute the best solution and capture learnings.
                                                </p>
                                                <div className="text-xs text-red-600 dark:text-red-400 mt-2">
                                                    🎯 Convergent thinking
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p>
                                The power of the double diamond lies in its structured flexibility. It provides a clear progression
                                while allowing teams to adapt the depth and duration of each phase based on project complexity
                                and constraints.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: The 90-Minute Sprint Loop */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                                <RefreshCw className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                The 90-Minute Sprint Loop
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                CreateX introduces the micro-sprint loop: focused 90-minute sessions that compress the
                                double diamond into rapid learning cycles. This enables teams to maintain momentum
                                while building understanding incrementally.
                            </p>

                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">Sprint Loop Structure</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">15</div>
                                        <div>
                                            <h4 className="font-semibold">Setup & Framing</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Orient team, clarify objectives, establish constraints and success criteria
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">60</div>
                                        <div>
                                            <h4 className="font-semibold">Core Work Session</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Apply design methods, generate insights, create deliverables, test assumptions
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">15</div>
                                        <div>
                                            <h4 className="font-semibold">Synthesis & Next Steps</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                Capture key insights, plan next sprint, assign actions and responsibilities
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-6">
                                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 Sprint Loop Benefits</h4>
                                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                                    <li>• Maintains energy and focus through time constraints</li>
                                    <li>• Builds momentum through frequent wins and insights</li>
                                    <li>• Enables rapid adaptation based on emerging understanding</li>
                                    <li>• Creates natural stopping points for reflection and planning</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: AI Integration Points */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                AI Integration Points
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                AI enhances each phase of the double diamond and sprint loop by amplifying human capabilities,
                                accelerating insights, and providing diverse perspectives. Strategic integration maintains
                                human creativity while leveraging computational power.
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 my-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Discover & Define</h4>
                                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                                        <li>🔍 <strong>Research Acceleration:</strong> Auto-summarize reports, identify patterns</li>
                                        <li>🎭 <strong>Persona Generation:</strong> Create realistic user profiles from data</li>
                                        <li>🗺️ <strong>Journey Mapping:</strong> Auto-generate touchpoint sequences</li>
                                        <li>💡 <strong>Insight Synthesis:</strong> Connect themes across data sources</li>
                                    </ul>
                                </div>

                                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                                    <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">Develop & Deliver</h4>
                                    <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-2">
                                        <li>💭 <strong>Idea Amplification:</strong> Generate variations and combinations</li>
                                        <li>🏗️ <strong>Rapid Prototyping:</strong> Create mockups, scenarios, content</li>
                                        <li>📊 <strong>Impact Modeling:</strong> Predict outcomes and dependencies</li>
                                        <li>🔄 <strong>Iteration Support:</strong> Compare versions, track changes</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">AI Ethics in Design Process</h3>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <h5 className="font-semibold mb-2">Transparency</h5>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Always disclose AI involvement. Teams should understand when and how AI contributes.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2">Human Agency</h5>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Maintain human decision-making authority. AI suggests, humans decide.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-semibold mb-2">Bias Awareness</h5>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Actively check for AI bias. Diverse human perspectives remain essential.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p>
                                The goal is seamless human-AI collaboration where technology amplifies creativity without
                                replacing human judgment, empathy, and contextual understanding.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/modules/facilitator-mindsets"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous: Mindsets for Modern Facilitators
                    </Link>

                    <Link
                        href="/modules/research-empathy"
                        className="flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                        Next: Research & Empathy Methods
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
