'use client';

import React from 'react';
import { ArrowLeft, Clock, Users, BookOpen, ChevronRight, Bot, Settings, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AIIntegrationPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <div className="mb-8">
                    <Link
                        href="/modules"
                        className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Modules
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <div className="flex items-center space-x-2 text-sm text-orange-600 dark:text-orange-400 mb-2">
                                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                <span className="font-medium">AI & Technology • Chapter 18</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                AI Integration Playbook
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                Master AI tool selection, prompt crafting, ethics, and integration recipes by stage.
                                Learn to seamlessly blend human creativity with artificial intelligence capabilities.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Clock className="w-4 h-4 mr-2" />
                            90 minutes
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <Users className="w-4 h-4 mr-2" />
                            Advanced
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                            <BookOpen className="w-4 h-4 mr-2" />
                            4 sections
                        </div>
                    </div>
                </div>

                {/* Learning Objectives */}
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-orange-900 dark:text-orange-100 mb-4">
                        Learning Objectives
                    </h2>
                    <ul className="space-y-2">
                        <li className="flex items-start text-orange-800 dark:text-orange-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-orange-600" />
                            Apply C-T-E-C-O prompt framework
                        </li>
                        <li className="flex items-start text-orange-800 dark:text-orange-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-orange-600" />
                            Select appropriate AI tools
                        </li>
                        <li className="flex items-start text-orange-800 dark:text-orange-200">
                            <ChevronRight className="w-5 h-5 mr-2 mt-0.5 text-orange-600" />
                            Implement ethical guidelines
                        </li>
                    </ul>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1: C-T-E-C-O Prompt Framework */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Bot className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                C-T-E-C-O Prompt Framework
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                The C-T-E-C-O framework provides a structured approach to crafting effective AI prompts
                                that consistently produce high-quality, relevant outputs for design thinking activities.
                            </p>

                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">The Five Components</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">C</div>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Context</h4>
                                            <p className="text-blue-800 dark:text-blue-200 text-sm mt-1">
                                                Set the stage: What is the situation, project, or challenge? Who is involved?
                                            </p>
                                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-mono bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                                                "We are a team of 6 designers working on improving the checkout experience for an e-commerce platform..."
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">T</div>
                                        <div>
                                            <h4 className="font-semibold text-purple-900 dark:text-purple-100">Task</h4>
                                            <p className="text-purple-800 dark:text-purple-200 text-sm mt-1">
                                                Define the specific action: What exactly do you want the AI to do?
                                            </p>
                                            <div className="text-xs text-purple-600 dark:text-purple-400 mt-2 font-mono bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                                                "Generate 15 'How Might We' questions that focus on reducing checkout abandonment..."
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">E</div>
                                        <div>
                                            <h4 className="font-semibold text-green-900 dark:text-green-100">Examples</h4>
                                            <p className="text-green-800 dark:text-green-200 text-sm mt-1">
                                                Provide 2-3 examples of desired output format or style.
                                            </p>
                                            <div className="text-xs text-green-600 dark:text-green-400 mt-2 font-mono bg-green-100 dark:bg-green-900/30 p-2 rounded">
                                                "Format: 'HMW reduce cognitive load during payment entry?' 'HMW build trust in security measures?'"
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">C</div>
                                        <div>
                                            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">Constraints</h4>
                                            <p className="text-yellow-800 dark:text-yellow-200 text-sm mt-1">
                                                Set boundaries: Length, format, tone, what to avoid.
                                            </p>
                                            <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-2 font-mono bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                                                "Keep questions under 15 words each. Avoid technical jargon. Focus on user emotions and behaviors."
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">O</div>
                                        <div>
                                            <h4 className="font-semibold text-red-900 dark:text-red-100">Output</h4>
                                            <p className="text-red-800 dark:text-red-200 text-sm mt-1">
                                                Specify delivery format: List, table, paragraph, etc.
                                            </p>
                                            <div className="text-xs text-red-600 dark:text-red-400 mt-2 font-mono bg-red-100 dark:bg-red-900/30 p-2 rounded">
                                                "Present as numbered list with brief rationale for each question."
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: AI Tool Selection Matrix */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                AI Tool Selection Matrix
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Different AI tools excel at different design activities. This selection matrix helps facilitators
                                choose the right tool for each phase and outcome type.
                            </p>

                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">Tool Categories by Design Phase</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-3">Research & Discovery</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Interview Analysis</span>
                                                <span className="text-blue-600 font-medium">Claude, GPT-4</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Survey Generation</span>
                                                <span className="text-blue-600 font-medium">ChatGPT, Bard</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Data Visualization</span>
                                                <span className="text-blue-600 font-medium">Tableau AI, PowerBI</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Ideation & Prototyping</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Concept Generation</span>
                                                <span className="text-purple-600 font-medium">GPT-4, Claude</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Visual Mockups</span>
                                                <span className="text-purple-600 font-medium">Midjourney, DALL-E</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Code Prototypes</span>
                                                <span className="text-purple-600 font-medium">GitHub Copilot</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Testing & Validation</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Usability Analysis</span>
                                                <span className="text-green-600 font-medium">Claude, GPT-4</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>A/B Test Design</span>
                                                <span className="text-green-600 font-medium">ChatGPT, Bard</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Feedback Synthesis</span>
                                                <span className="text-green-600 font-medium">Claude, GPT-4</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3">Implementation Planning</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Project Planning</span>
                                                <span className="text-orange-600 font-medium">ChatGPT, Bard</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Risk Assessment</span>
                                                <span className="text-orange-600 font-medium">Claude, GPT-4</span>
                                            </div>
                                            <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                                                <span>Stakeholder Mapping</span>
                                                <span className="text-orange-600 font-medium">ChatGPT, Claude</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Ethical Guidelines */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Ethical AI Guidelines
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Responsible AI integration requires clear ethical guidelines that protect participants,
                                maintain transparency, and preserve human agency in creative processes.
                            </p>

                            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold mb-4">CreateX AI Ethics Framework</h3>
                                <div className="space-y-4">
                                    <div className="border-l-4 border-blue-400 pl-4">
                                        <h4 className="font-semibold text-blue-800 dark:text-blue-200">1. Transparency Principle</h4>
                                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                                            Always disclose when AI tools are being used. Participants should understand
                                            what data is being processed and how AI outputs are generated.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-purple-400 pl-4">
                                        <h4 className="font-semibold text-purple-800 dark:text-purple-200">2. Human Agency</h4>
                                        <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                                            AI should augment, never replace human creativity and decision-making.
                                            Final choices must remain with human participants.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-green-400 pl-4">
                                        <h4 className="font-semibold text-green-800 dark:text-green-200">3. Bias Mitigation</h4>
                                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                            Actively identify and counter AI biases. Ensure diverse perspectives
                                            are represented in both prompts and evaluation of outputs.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-orange-400 pl-4">
                                        <h4 className="font-semibold text-orange-800 dark:text-orange-200">4. Data Privacy</h4>
                                        <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                                            Protect sensitive information. Use anonymization and obtain explicit
                                            consent before inputting personal or proprietary data into AI tools.
                                        </p>
                                    </div>

                                    <div className="border-l-4 border-pink-400 pl-4">
                                        <h4 className="font-semibold text-pink-800 dark:text-pink-200">5. Continuous Learning</h4>
                                        <p className="text-sm text-pink-700 dark:text-pink-300 mt-1">
                                            Regularly assess AI impact on creativity, team dynamics, and outcomes.
                                            Adapt practices based on evidence and participant feedback.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4: Integration Recipes */}
                    <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mr-3">
                                <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Integration Recipes by Stage
                            </h2>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-lg leading-relaxed">
                                Practical recipes for integrating AI at specific moments in design thinking workflows.
                                Each recipe includes timing, tools, prompts, and follow-up actions.
                            </p>

                            <div className="space-y-6 my-6">
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                    <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4">
                                        📊 Recipe: Interview Insight Synthesis
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-semibold mb-2">When to Use</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                After conducting 5+ user interviews, before affinity mapping session
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">AI Tool</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Claude (long context) or GPT-4 for analysis
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Time Investment</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                15 minutes setup, 30 minutes analysis
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                        <strong>Sample Prompt:</strong> "Analyze these 6 user interviews for common themes, pain points, and unmet needs.
                                        Identify patterns across participants and highlight surprising insights..."
                                    </div>
                                </div>

                                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                                    <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-4">
                                        💡 Recipe: Rapid Concept Generation
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-semibold mb-2">When to Use</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                During ideation phase after defining opportunity areas
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">AI Tool</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                ChatGPT or Claude for idea generation
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibional mb-2">Time Investment</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                10 minutes per concept area explored
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                        <strong>Sample Prompt:</strong> "Generate 20 diverse solution concepts for 'helping busy parents track family nutrition.'
                                        Include both digital and non-digital approaches..."
                                    </div>
                                </div>

                                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                                    <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-4">
                                        🔬 Recipe: Prototype Testing Scripts
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <h4 className="font-semibold mb-2">When to Use</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Before user testing sessions, after prototype creation
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">AI Tool</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                GPT-4 or Claude for script generation
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Time Investment</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                20 minutes generation, 10 minutes refinement
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
                                        <strong>Sample Prompt:</strong> "Create a 30-minute usability testing script for a mobile app prototype.
                                        Include warm-up questions, 5 core tasks, and probing questions..."
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/modules/facilitation-skills"
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous: Facilitation Skills
                    </Link>

                    <Link
                        href="/modules/troubleshooting"
                        className="flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                        Next: Troubleshooting in Real Time
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
