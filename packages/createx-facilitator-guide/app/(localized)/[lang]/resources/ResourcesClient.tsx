'use client';

import React, { useState } from 'react';
import { Download, FileText, Video, Image, ExternalLink, Search, Filter, Star, Clock, Users } from 'lucide-react';
import Link from 'next/link';

interface Resource {
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    size: string;
    downloads: number;
    rating: number;
    difficulty: string;
    duration: string;
    chapter: number;
    downloadUrl: string;
    previewUrl: string;
    tags: string[];
}

interface ResourcesClientProps {
    resources: Resource[];
    resourceCategories: string[];
    lang: string;
}

export default function ResourcesClient({ resources, resourceCategories, lang }: ResourcesClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('popular');

    const filteredResources = resources
        .filter(resource => {
            const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b.downloads - a.downloads;
                case 'rating':
                    return b.rating - a.rating;
                case 'recent':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

    const handleDownload = (resource: Resource) => {
        // In a real app, this would trigger the actual download
        console.log(`Downloading: ${resource.title}`);
        // Could also track analytics here
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Resource Library
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Download templates, canvases, slides, and tools to enhance your facilitation practice.
                        All resources are organized by chapter and include usage guidelines.
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {resourceCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="popular">Most Downloaded</option>
                                <option value="rating">Highest Rated</option>
                                <option value="recent">Alphabetical</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400">
                        Showing {filteredResources.length} of {resources.length} resources
                        {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
                        {searchTerm && ` matching "${searchTerm}"`}
                    </p>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                        <div
                            key={resource.id}
                            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                        >
                            {/* Preview Image */}
                            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
                                <div className="text-center">
                                    <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{resource.type}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {resource.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                            {resource.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {resource.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center space-x-1">
                                            <Star className="h-3 w-3" />
                                            <span>{resource.rating}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Download className="h-3 w-3" />
                                            <span>{resource.downloads.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{resource.duration}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-blue-600 dark:text-blue-400 font-medium">Chapter {resource.chapter}</div>
                                        <div>{resource.size}</div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDownload(resource)}
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </button>
                                    <Link
                                        href={`/${lang}/modules/chapter-${resource.chapter}`}
                                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredResources.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No resources found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Try adjusting your search terms or selected category.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                            }}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Need a Specific Resource?
                    </h2>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                        Can't find what you're looking for? Join our community and request new templates,
                        tools, or resources that would help your facilitation practice.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/community"
                            className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-lg transition-colors"
                        >
                            <Users className="mr-2 h-5 w-5" />
                            Join Community
                        </Link>
                        <Link
                            href="/contribute"
                            className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white transition-colors"
                        >
                            Contribute Resources
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
