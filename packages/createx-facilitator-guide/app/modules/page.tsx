'use client';

import React from 'react';
import { BookOpen, Clock, Users, Star, ArrowRight, CheckCircle, PlayCircle } from 'lucide-react';
import Link from 'next/link';

const modules = [
    // Track 1: Foundations
    {
        id: 'creativity-fundamentals',
        chapter: 1,
        title: 'What Is Creativity?',
        description: 'Explore the definition of creativity across disciplines, debunk common myths, and understand individual vs. collective creativity.',
        duration: '45 min',
        difficulty: 'Beginner',
        track: 'Foundations',
        trackColor: 'blue',
        learningObjectives: [
            'Define creativity as novelty × usefulness',
            'Debunk creativity myths and misconceptions',
            'Understand the role of AI in human creativity'
        ],
        completed: false
    },
    {
        id: 'design-thinking-history',
        chapter: 2,
        title: 'A Brief History of Design Thinking',
        description: 'Journey through the evolution of design thinking from Bauhaus to AI-augmented design, understanding key developments.',
        duration: '60 min',
        difficulty: 'Beginner',
        track: 'Foundations',
        trackColor: 'blue',
        learningObjectives: [
            'Trace design thinking evolution from 1919 to present',
            'Understand key movements and their contributions',
            'Connect historical principles to modern practice'
        ],
        completed: false
    },
    {
        id: 'creative-confidence',
        chapter: 3,
        title: 'The Science of Creative Confidence',
        description: 'Master the psychology and neuroscience of creativity. Build confidence at individual and team levels.',
        duration: '50 min',
        difficulty: 'Intermediate',
        track: 'Foundations',
        trackColor: 'blue',
        learningObjectives: [
            'Understand psychological foundations of creative confidence',
            'Learn measurement techniques for creative confidence',
            'Apply AI as confidence amplifier'
        ],
        completed: false
    },
    {
        id: 'createx-mission',
        chapter: 4,
        title: 'Mission & Principles of CreateX',
        description: 'Learn the CreateX mission, north-star metrics, five core principles, and how to translate them into workshop design.',
        duration: '40 min',
        difficulty: 'Beginner',
        track: 'Foundations',
        trackColor: 'blue',
        learningObjectives: [
            'Understand CreateX mission and principles',
            'Learn governance and ethics framework',
            'Apply principles to workshop design'
        ],
        completed: false
    },
    {
        id: 'facilitator-mindsets',
        chapter: 5,
        title: 'Mindsets for Modern Facilitators',
        description: 'Develop the five core mindsets, understand facilitator roles, and master presence & emotional intelligence.',
        duration: '55 min',
        difficulty: 'Intermediate',
        track: 'Foundations',
        trackColor: 'blue',
        learningObjectives: [
            'Master the five core facilitator mindsets',
            'Understand facilitator roles triangle',
            'Develop emotional intelligence for groups'
        ],
        completed: false
    },

    // Track 2: Design Process
    {
        id: 'process-overview',
        chapter: 6,
        title: 'Process Overview: Double-Diamond × Sprint Loop',
        description: 'Master the CreateX methodology combining double-diamond thinking with micro-sprint execution.',
        duration: '45 min',
        difficulty: 'Intermediate',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Understand the double-diamond framework',
            'Learn the 90-minute micro-sprint loop',
            'Master AI integration points'
        ],
        completed: false
    },
    {
        id: 'research-empathy',
        chapter: 7,
        title: 'Research & Empathy Methods',
        description: 'Learn empathy interviews, field observation, stakeholder mapping, and AI-powered research operations.',
        duration: '70 min',
        difficulty: 'Intermediate',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Conduct effective empathy interviews',
            'Apply AEIOU field observation',
            'Use AI for research operations'
        ],
        completed: false
    },
    {
        id: 'sense-making',
        chapter: 8,
        title: 'Sense-Making Methods',
        description: 'Master affinity clustering, insight statements, journey mapping, and AI-assisted synthesis.',
        duration: '60 min',
        difficulty: 'Intermediate',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Apply K-J method for affinity clustering',
            'Create compelling insight statements',
            'Build end-to-end journey maps'
        ],
        completed: false
    },
    {
        id: 'framing-prioritization',
        chapter: 9,
        title: 'Framing & Opportunity Prioritization',
        description: 'Learn point-of-view statements, problem framing, and various prioritization frameworks including RICE scoring.',
        duration: '55 min',
        difficulty: 'Intermediate',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Craft clear point-of-view statements',
            'Apply multiple prioritization frameworks',
            'Use AI for opportunity analysis'
        ],
        completed: false
    },
    {
        id: 'ideation-methods',
        chapter: 10,
        title: 'Ideation Methods',
        description: 'Master brainwriting, crazy 8s, SCAMPER, AI co-ideation, and concept development techniques.',
        duration: '65 min',
        difficulty: 'Intermediate',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Facilitate effective brainwriting sessions',
            'Lead AI co-ideation workshops',
            'Apply dot-voting and heat-mapping'
        ],
        completed: false
    },
    {
        id: 'prototyping-methods',
        chapter: 11,
        title: 'Prototyping Methods',
        description: 'Learn prototype fidelity ladder, storyboarding, paper prototypes, and low-code AI mock-ups.',
        duration: '75 min',
        difficulty: 'Intermediate',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Choose appropriate prototype fidelity',
            'Create effective storyboards',
            'Build Wizard-of-Oz prototypes'
        ],
        completed: false
    },
    {
        id: 'testing-feedback',
        chapter: 12,
        title: 'Testing & Feedback Methods',
        description: 'Master think-aloud testing, heuristic reviews, A/B testing, and rapid synthesis frameworks.',
        duration: '70 min',
        difficulty: 'Advanced',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Conduct think-aloud usability tests',
            'Apply 10 usability heuristics',
            'Use FIVE synthesis framework'
        ],
        completed: false
    },
    {
        id: 'implementation-roadmapping',
        chapter: 13,
        title: 'Implementation & Road-Mapping',
        description: 'Learn prototype to pilot decision matrices, RACI frameworks, OKRs, and change management.',
        duration: '65 min',
        difficulty: 'Advanced',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Create pilot planning canvases',
            'Apply RACI for delivery',
            'Design effective roadmaps'
        ],
        completed: false
    },
    {
        id: 'reflection-learning',
        chapter: 14,
        title: 'Reflection & Learning',
        description: 'Master after-action reviews, learning journals, sprint retrospectives, and AI insight summarization.',
        duration: '50 min',
        difficulty: 'Intermediate',
        track: 'Design Process',
        trackColor: 'purple',
        learningObjectives: [
            'Facilitate after-action reviews',
            'Structure learning journals',
            'Apply AI for insight generation'
        ],
        completed: false
    },

    // Track 3: Workshop Design
    {
        id: 'scoping-logistics',
        chapter: 15,
        title: 'Scoping & Logistics',
        description: 'Learn challenge framing, participant selection, environment setup, budgeting, and risk management.',
        duration: '60 min',
        difficulty: 'Intermediate',
        track: 'Workshop Design',
        trackColor: 'green',
        learningObjectives: [
            'Apply challenge framing checklist',
            'Design participant selection matrix',
            'Create comprehensive budgets'
        ],
        completed: false
    },
    {
        id: 'agenda-design',
        chapter: 16,
        title: 'Agenda Design',
        description: 'Master half-day, full-day, and multi-day agenda templates with energy management and AI assist blocks.',
        duration: '65 min',
        difficulty: 'Intermediate',
        track: 'Workshop Design',
        trackColor: 'green',
        learningObjectives: [
            'Design effective workshop agendas',
            'Plan energy and break management',
            'Integrate AI assist blocks'
        ],
        completed: false
    },
    {
        id: 'facilitation-skills',
        chapter: 17,
        title: 'Facilitation Skills',
        description: 'Develop core communication skills, psychological safety techniques, and group dynamics management.',
        duration: '80 min',
        difficulty: 'Advanced',
        track: 'Workshop Design',
        trackColor: 'green',
        learningObjectives: [
            'Master communication micro-skills',
            'Create psychological safety',
            'Apply language patterns for thinking'
        ],
        completed: false
    },

    // Track 4: AI & Technology
    {
        id: 'ai-integration',
        chapter: 18,
        title: 'AI Integration Playbook',
        description: 'Master AI tool selection, prompt crafting, ethics, and integration recipes by stage.',
        duration: '90 min',
        difficulty: 'Advanced',
        track: 'AI & Technology',
        trackColor: 'orange',
        learningObjectives: [
            'Apply C-T-E-C-O prompt framework',
            'Select appropriate AI tools',
            'Implement ethical guidelines'
        ],
        completed: false
    },
    {
        id: 'troubleshooting',
        chapter: 19,
        title: 'Troubleshooting in Real Time',
        description: 'Learn rapid diagnosis, troubleshooting tactics, AI rescue moves, and the CALMS recovery script.',
        duration: '70 min',
        difficulty: 'Advanced',
        track: 'AI & Technology',
        trackColor: 'orange',
        learningObjectives: [
            'Apply rapid diagnosis grid',
            'Use CALMS recovery script',
            'Implement tech failsafe kit'
        ],
        completed: false
    },
    {
        id: 'capturing-outcomes',
        chapter: 20,
        title: 'Capturing & Sharing Outcomes',
        description: 'Master outcome taxonomy, live capture tactics, survey design, and knowledge repository workflows.',
        duration: '60 min',
        difficulty: 'Intermediate',
        track: 'AI & Technology',
        trackColor: 'orange',
        learningObjectives: [
            'Build effective outcome taxonomy',
            'Design post-workshop surveys',
            'Create knowledge repositories'
        ],
        completed: false
    },

    // Track 5: Case Studies
    {
        id: 'corporate-case-study',
        chapter: 21,
        title: 'Case Study: Corporate Innovation Sprint',
        description: 'Detailed case study of Acme Logistics innovation sprint with ROI analysis and replication tips.',
        duration: '45 min',
        difficulty: 'Intermediate',
        track: 'Case Studies',
        trackColor: 'teal',
        learningObjectives: [
            'Analyze corporate sprint structure',
            'Understand ROI measurement',
            'Apply replication guidelines'
        ],
        completed: false
    },
    {
        id: 'nonprofit-case-study',
        chapter: 22,
        title: 'Case Study: Non-Profit Social Impact Lab',
        description: 'Water4All social impact lab case study with remote facilitation techniques and NGO adaptations.',
        duration: '50 min',
        difficulty: 'Intermediate',
        track: 'Case Studies',
        trackColor: 'teal',
        learningObjectives: [
            'Adapt methods for NGO context',
            'Master remote facilitation',
            'Measure social impact'
        ],
        completed: false
    },
    {
        id: 'education-case-study',
        chapter: 23,
        title: 'Case Study: Higher-Ed Classroom Immersion',
        description: 'TechU classroom immersion program with assessment schemas and faculty feedback integration.',
        duration: '55 min',
        difficulty: 'Intermediate',
        track: 'Case Studies',
        trackColor: 'teal',
        learningObjectives: [
            'Design educational programs',
            'Create assessment schemas',
            'Integrate faculty feedback'
        ],
        completed: false
    },
    {
        id: 'analytics-kpis',
        chapter: 24,
        title: 'Analytics & KPIs',
        description: 'Learn measurement pyramids, core CreateX metrics, dashboards, ROI formulas, and AI-driven insights.',
        duration: '75 min',
        difficulty: 'Advanced',
        track: 'Case Studies',
        trackColor: 'teal',
        learningObjectives: [
            'Build measurement frameworks',
            'Design effective dashboards',
            'Calculate ROI and business cases'
        ],
        completed: false
    },

    // Track 6: Professional Growth
    {
        id: 'certification-path',
        chapter: 25,
        title: 'Competency Map & Certification Path',
        description: 'Navigate the 6-domain competency framework, certification levels, and digital badge system.',
        duration: '60 min',
        difficulty: 'Intermediate',
        track: 'Professional Growth',
        trackColor: 'pink',
        learningObjectives: [
            'Understand competency framework',
            'Navigate certification levels',
            'Plan continuing education'
        ],
        completed: false
    },
    {
        id: 'personal-branding',
        chapter: 26,
        title: 'Building Your Personal Facilitation Brand',
        description: 'Develop your facilitator brand with the 4 C\'s framework, content formats, and thought leadership.',
        duration: '70 min',
        difficulty: 'Intermediate',
        track: 'Professional Growth',
        trackColor: 'pink',
        learningObjectives: [
            'Apply 4 C\'s brand framework',
            'Create signature content',
            'Build proof-point portfolio'
        ],
        completed: false
    },
    {
        id: 'community-practice',
        chapter: 27,
        title: 'Joining the CreateX Community of Practice',
        description: 'Engage with the CreateX community structure, onboarding path, and contribution pathways.',
        duration: '45 min',
        difficulty: 'Beginner',
        track: 'Professional Growth',
        trackColor: 'pink',
        learningObjectives: [
            'Navigate community structure',
            'Complete onboarding path',
            'Find contribution opportunities'
        ],
        completed: false
    }
];

const trackColors: any = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    teal: 'from-teal-500 to-teal-600',
    pink: 'from-pink-500 to-pink-600'
};

const trackBorders: any = {
    blue: 'border-blue-200 dark:border-blue-800',
    purple: 'border-purple-200 dark:border-purple-800',
    green: 'border-green-200 dark:border-green-800',
    orange: 'border-orange-200 dark:border-orange-800',
    teal: 'border-teal-200 dark:border-teal-800',
    pink: 'border-pink-200 dark:border-pink-800'
};

const trackBgs: any = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    green: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    orange: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    teal: 'from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20',
    pink: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20'
};

export default function ModulesPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Facilitator Guide Modules
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Master design thinking, AI integration, and transformational facilitation through
                        27 comprehensive modules organized into 6 learning tracks.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {['Foundations', 'Design Process', 'Workshop Design', 'AI & Technology', 'Case Studies', 'Professional Growth'].map((track, index) => (
                            <div key={track} className="flex items-center space-x-2">
                                <div className={`w-4 h-4 rounded bg-gradient-to-r ${Object.values(trackColors)[index]}`}></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{track}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            className={`bg-gradient-to-br ${trackBgs[module.trackColor]} p-6 rounded-xl border ${trackBorders[module.trackColor]} hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}
                        >
                            {/* Module Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${trackColors[module.trackColor]} text-white`}>
                                            Chapter {module.chapter}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {module.track}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        {module.title}
                                    </h3>
                                </div>
                                {module.completed ? (
                                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                ) : (
                                    <PlayCircle className="h-6 w-6 text-gray-400 flex-shrink-0" />
                                )}
                            </div>

                            {/* Module Description */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                {module.description}
                            </p>

                            {/* Learning Objectives */}
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Learning Objectives:
                                </h4>
                                <ul className="space-y-1">
                                    {module.learningObjectives.map((objective, index) => (
                                        <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-start">
                                            <span className="text-gray-400 mr-2">•</span>
                                            {objective}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Module Metadata */}
                            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{module.duration}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Star className="h-3 w-3" />
                                        <span>{module.difficulty}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Link
                                href={`/modules/${module.id}`}
                                className={`w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${trackColors[module.trackColor]} text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200 text-sm`}
                            >
                                {module.completed ? 'Review Module' : 'Start Module'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Progress Summary */}
                <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Your Learning Progress
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Track your progress through the comprehensive facilitator curriculum
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                        {['Foundations', 'Design Process', 'Workshop Design', 'AI & Technology', 'Case Studies', 'Professional Growth'].map((track, index) => {
                            const trackModules = modules.filter(m => m.track === track);
                            const completedCount = trackModules.filter(m => m.completed).length;
                            const totalCount = trackModules.length;
                            const percentage = (completedCount / totalCount) * 100;

                            return (
                                <div key={track} className="text-center">
                                    <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r ${Object.values(trackColors)[index]} flex items-center justify-center text-white font-bold text-lg`}>
                                        {Math.round(percentage)}%
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                        {track}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {completedCount}/{totalCount} modules
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center">
                        <div className="inline-flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>Join 1,200+ facilitators</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <BookOpen className="h-4 w-4" />
                                <span>27 comprehensive modules</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>~28 hours total content</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
