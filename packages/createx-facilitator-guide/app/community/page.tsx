'use client';

import React, { useState } from 'react';
import { MessageSquare, Users, Calendar, Trophy, TrendingUp, Heart, Share2, BookOpen, Video, Mic } from 'lucide-react';
import Link from 'next/link';

const communityStats = {
    members: 1247,
    countries: 28,
    workshops: 892,
    resources: 156
};

const discussions = [
    {
        id: 1,
        title: 'Best practices for remote AI-assisted ideation sessions?',
        author: 'Sarah Chen',
        avatar: '/avatars/sarah.jpg',
        category: 'AI Integration',
        replies: 12,
        likes: 23,
        timeAgo: '2 hours ago',
        trending: true,
        tags: ['Remote Facilitation', 'AI Tools', 'Ideation']
    },
    {
        id: 2,
        title: 'Sharing my corporate innovation sprint template',
        author: 'Marcus Rodriguez',
        avatar: '/avatars/marcus.jpg',
        category: 'Templates',
        replies: 8,
        likes: 34,
        timeAgo: '5 hours ago',
        trending: false,
        tags: ['Corporate', 'Innovation', 'Templates']
    },
    {
        id: 3,
        title: 'How to handle difficult participants in design thinking workshops?',
        author: 'Emma Thompson',
        avatar: '/avatars/emma.jpg',
        category: 'Facilitation',
        replies: 15,
        likes: 41,
        timeAgo: '1 day ago',
        trending: true,
        tags: ['Group Dynamics', 'Conflict Resolution']
    },
    {
        id: 4,
        title: 'Cultural considerations when facilitating in different regions',
        author: 'Kenji Tanaka',
        avatar: '/avatars/kenji.jpg',
        category: 'Cross-Cultural',
        replies: 22,
        likes: 56,
        timeAgo: '2 days ago',
        trending: false,
        tags: ['Culture', 'Global Facilitation', 'Localization']
    }
];

const upcomingEvents = [
    {
        id: 1,
        title: 'Monthly Facilitator Meetup',
        type: 'Virtual',
        date: '2025-06-25',
        time: '18:00 UTC',
        attendees: 67,
        description: 'Share experiences, challenges, and new techniques with fellow facilitators.'
    },
    {
        id: 2,
        title: 'AI Integration Workshop',
        type: 'Hands-on',
        date: '2025-06-28',
        time: '14:00 UTC',
        attendees: 23,
        description: 'Deep dive into advanced AI prompting techniques for facilitation.'
    },
    {
        id: 3,
        title: 'Case Study: Non-Profit Facilitation',
        type: 'Presentation',
        date: '2025-07-02',
        time: '16:00 UTC',
        attendees: 45,
        description: 'Learn from real-world non-profit workshop experiences and adaptations.'
    }
];

const topContributors = [
    {
        name: 'Dr. Lisa Park',
        role: 'Senior Facilitator',
        contributions: 89,
        expertise: 'Creative Confidence',
        avatar: '/avatars/lisa.jpg'
    },
    {
        name: 'Ahmed Hassan',
        role: 'AI Integration Expert',
        contributions: 76,
        expertise: 'AI Tools',
        avatar: '/avatars/ahmed.jpg'
    },
    {
        name: 'Maria Santos',
        role: 'Community Leader',
        contributions: 65,
        expertise: 'Cross-Cultural',
        avatar: '/avatars/maria.jpg'
    }
];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState('discussions');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        CreateX Community
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Connect with facilitators worldwide, share experiences, and learn from each other's
                        practice. Together we're building the future of transformational learning.
                    </p>
                </div>

                {/* Community Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                        <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{communityStats.members.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                        <Calendar className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{communityStats.countries}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                        <BookOpen className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{communityStats.workshops.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Workshops Run</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                        <Share2 className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{communityStats.resources}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Shared Resources</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tab Navigation */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
                            <div className="border-b border-gray-200 dark:border-gray-700">
                                <nav className="flex space-x-8 px-6">
                                    {[
                                        { id: 'discussions', label: 'Discussions', icon: MessageSquare },
                                        { id: 'events', label: 'Events', icon: Calendar },
                                        { id: 'resources', label: 'Shared Resources', icon: Share2 }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            <tab.icon className="h-4 w-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            {/* Tab Content */}
                            <div className="p-6">
                                {activeTab === 'discussions' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Recent Discussions
                                            </h3>
                                            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                                                <MessageSquare className="h-4 w-4 mr-2" />
                                                Start Discussion
                                            </button>
                                        </div>

                                        {discussions.map((discussion) => (
                                            <div
                                                key={discussion.id}
                                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                                        {discussion.author.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                                {discussion.title}
                                                            </h4>
                                                            {discussion.trending && (
                                                                <TrendingUp className="h-4 w-4 text-orange-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                            <span>by {discussion.author}</span>
                                                            <span>•</span>
                                                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                                                                {discussion.category}
                                                            </span>
                                                            <span>•</span>
                                                            <span>{discussion.timeAgo}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                            <div className="flex items-center space-x-1">
                                                                <MessageSquare className="h-4 w-4" />
                                                                <span>{discussion.replies} replies</span>
                                                            </div>
                                                            <div className="flex items-center space-x-1">
                                                                <Heart className="h-4 w-4" />
                                                                <span>{discussion.likes} likes</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {discussion.tags.map((tag, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'events' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Upcoming Events
                                            </h3>
                                            <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                Suggest Event
                                            </button>
                                        </div>

                                        {upcomingEvents.map((event) => (
                                            <div
                                                key={event.id}
                                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                                                            {event.title}
                                                        </h4>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                                            <div className="flex items-center space-x-1">
                                                                {event.type === 'Virtual' && <Video className="h-4 w-4" />}
                                                                {event.type === 'Hands-on' && <Users className="h-4 w-4" />}
                                                                {event.type === 'Presentation' && <Mic className="h-4 w-4" />}
                                                                <span>{event.type}</span>
                                                            </div>
                                                            <span>•</span>
                                                            <span>{event.date} at {event.time}</span>
                                                            <span>•</span>
                                                            <span>{event.attendees} attending</span>
                                                        </div>
                                                    </div>
                                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                                                        Join Event
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    {event.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'resources' && (
                                    <div className="text-center py-8">
                                        <Share2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                            Community Resources
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            Browse resources shared by community members or contribute your own.
                                        </p>
                                        <Link
                                            href="/resources"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                        >
                                            Browse Resources
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Top Contributors */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Top Contributors
                            </h3>
                            <div className="space-y-4">
                                {topContributors.map((contributor, index) => (
                                    <div key={contributor.name} className="flex items-center space-x-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                                {contributor.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            {index < 3 && (
                                                <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600'
                                                    }`}>
                                                    {index + 1}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {contributor.name}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {contributor.role} • {contributor.contributions} contributions
                                            </div>
                                            <div className="text-xs text-blue-600 dark:text-blue-400">
                                                {contributor.expertise}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Quick Links
                            </h3>
                            <div className="space-y-3">
                                <Link
                                    href="/community/guidelines"
                                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Community Guidelines
                                </Link>
                                <Link
                                    href="/community/mentorship"
                                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Mentorship Program
                                </Link>
                                <Link
                                    href="/community/discord"
                                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Join Discord Server
                                </Link>
                                <Link
                                    href="/community/contribute"
                                    className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Contribute Content
                                </Link>
                            </div>
                        </div>

                        {/* Community Challenge */}
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                            <div className="flex items-center space-x-2 mb-3">
                                <Trophy className="h-6 w-6" />
                                <h3 className="font-semibold">Monthly Challenge</h3>
                            </div>
                            <h4 className="font-medium mb-2">AI-Enhanced Workshop Design</h4>
                            <p className="text-sm text-purple-100 mb-4">
                                Design and run a workshop using at least 3 AI tools. Share your experience and learnings!
                            </p>
                            <button className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                                Join Challenge
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
