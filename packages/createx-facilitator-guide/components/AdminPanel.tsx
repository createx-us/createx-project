'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, BarChart3 } from 'lucide-react';
import { useModules, useTranslation, useAI } from '../lib/hooks';

interface AdminPanelProps {
    onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
    const { modules, loading: isLoading, searchModules } = useModules() as {
        modules: any[];
        loading: boolean;
        searchModules: (query: string) => Promise<any[]>;
    };
    const { translateContent } = useTranslation();
    const { generateContent } = useAI();

    const [activeTab, setActiveTab] = useState<'overview' | 'content' | 'translations' | 'ai'>('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedModule, setSelectedModule] = useState(null);

    // Content validation
    const [validationResults, setValidationResults] = useState<any[]>([]);

    useEffect(() => {
        // Validate all modules on load
        validateAllModules();
    }, [modules]);

    const validateAllModules = async () => {
        const results = [];
        for (const moduleItem of modules) {
            const validation = await validateModule(moduleItem);
            results.push({ module: moduleItem.id, ...validation });
        }
        setValidationResults(results);
    };

    const validateModule = async (module: any) => {
        const requiredSections = ['Learning Objectives', 'Prerequisites', 'Duration', 'Difficulty'];
        const missing = requiredSections.filter(section =>
            !module.content.includes(section)
        );

        return {
            isValid: missing.length === 0,
            missingSections: missing,
            wordCount: module.content.split(/\s+/).length,
            readingTime: Math.ceil(module.content.split(/\s+/).length / 200)
        };
    };

    const handleSearch = async () => {
        if (searchQuery.trim()) {
            const results = await searchModules(searchQuery);
            setSearchResults(results);
        }
    };

    const handleGenerateContent = async (type: string, prompt: string) => {
        try {
            const generated = await generateContent(type as any, prompt, selectedModule);
            // Handle generated content
            console.log('Generated content:', generated);
        } catch (error) {
            console.error('Content generation failed:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">Content Management System</h2>
                            <p className="text-purple-100">Manage your facilitator guide content</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-purple-200 text-2xl"
                        >
                            ×
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="mt-4 flex space-x-4">
                        {[
                            { id: 'overview', label: 'Overview', icon: BarChart3 },
                            { id: 'content', label: 'Content', icon: BookOpen },
                            { id: 'translations', label: 'Translations', icon: Filter },
                            { id: 'ai', label: 'AI Tools', icon: Search }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${activeTab === tab.id
                                    ? 'bg-white/20 text-white'
                                    : 'text-purple-200 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-blue-900">Total Modules</h3>
                                    <p className="text-2xl font-bold text-blue-600">{modules.length}</p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-green-900">Valid Modules</h3>
                                    <p className="text-2xl font-bold text-green-600">
                                        {validationResults.filter(r => r.isValid).length}
                                    </p>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-red-900">Issues Found</h3>
                                    <p className="text-2xl font-bold text-red-600">
                                        {validationResults.filter(r => !r.isValid).length}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-4">Module Validation Results</h3>
                                <div className="space-y-2 max-h-64 overflow-y-auto">
                                    {validationResults.map((result) => (
                                        <div
                                            key={result.module}
                                            className={`p-3 rounded border-l-4 ${result.isValid
                                                ? 'border-green-400 bg-green-50'
                                                : 'border-red-400 bg-red-50'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-medium">{result.module}</h4>
                                                    {!result.isValid && (
                                                        <p className="text-sm text-red-600">
                                                            Missing: {result.missingSections.join(', ')}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {result.wordCount} words • {result.readingTime} min read
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="space-y-6">
                            {/* Search */}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search modules..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Search
                                </button>
                            </div>

                            {/* Module List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(searchResults.length > 0 ? searchResults : modules).map((module: any) => (
                                    <div
                                        key={module.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => setSelectedModule(module)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-lg">{module.title}</h3>
                                            <span className="text-sm text-gray-500">Ch. {module.chapter}</span>
                                        </div>
                                        <p className="text-gray-600 mb-2">{module.track}</p>
                                        <div className="flex space-x-4 text-sm text-gray-500">
                                            <span><Clock className="h-4 w-4 inline mr-1" />{module.duration}</span>
                                            <span className={`px-2 py-1 rounded text-xs ${module.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                                module.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {module.difficulty}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Module Details */}
                            {selectedModule && (
                                <div className="border-t pt-6">
                                    <h3 className="text-xl font-bold mb-4">{(selectedModule as any).title}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold mb-2">Learning Objectives</h4>
                                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                                {(selectedModule as any).learningObjectives.map((obj: string, index: number) => (
                                                    <li key={index}>{obj}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-2">Prerequisites</h4>
                                            {(selectedModule as any).prerequisites?.length > 0 ? (
                                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                                    {(selectedModule as any).prerequisites.map((prereq: string, index: number) => (
                                                        <li key={index}>{prereq}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-500">None</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'translations' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-900 mb-2">Translation Management</h3>
                                <p className="text-blue-700">
                                    Manage translations for your facilitator guide content across multiple languages.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-4">Available Languages</h4>
                                    <div className="space-y-2">
                                        {['en', 'es', 'fr', 'de', 'zh'].map((lang) => (
                                            <div key={lang} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div>
                                                    <span className="font-medium">{
                                                        lang === 'en' ? 'English' :
                                                            lang === 'es' ? 'Spanish' :
                                                                lang === 'fr' ? 'French' :
                                                                    lang === 'de' ? 'German' :
                                                                        'Chinese'
                                                    }</span>
                                                    <span className="text-gray-500 ml-2">({lang})</span>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs ${lang === 'en' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {lang === 'en' ? 'Complete' : 'Pending'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-4">Translation Progress</h4>
                                    <div className="space-y-3">
                                        {modules.slice(0, 5).map((module: any) => (
                                            <div key={module.id} className="border rounded-lg p-3">
                                                <h5 className="font-medium">{module.title}</h5>
                                                <div className="mt-2 space-y-1">
                                                    {['es', 'fr'].map((lang) => (
                                                        <div key={lang} className="flex justify-between text-sm">
                                                            <span>{lang === 'es' ? 'Spanish' : 'French'}</span>
                                                            <button
                                                                onClick={() => translateContent(module.content, lang)}
                                                                className="text-purple-600 hover:text-purple-800"
                                                            >
                                                                Translate
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai' && (
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Content Tools</h3>
                                <p className="text-gray-700">
                                    Use AI to generate exercises, assessments, and enhance your content.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Content Generation</h4>

                                    <div className="border rounded-lg p-4">
                                        <label className="block text-sm font-medium mb-2">Generate Exercise</label>
                                        <textarea
                                            placeholder="Describe the type of exercise you want to generate..."
                                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                            rows={3}
                                        />
                                        <button
                                            onClick={() => handleGenerateContent('exercise', 'Creative collaboration exercise')}
                                            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            Generate Exercise
                                        </button>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <label className="block text-sm font-medium mb-2">Generate Assessment</label>
                                        <textarea
                                            placeholder="Describe the assessment criteria..."
                                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                            rows={3}
                                        />
                                        <button
                                            onClick={() => handleGenerateContent('assessment', 'Creative confidence assessment')}
                                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Generate Assessment
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold">Content Enhancement</h4>

                                    <div className="border rounded-lg p-4">
                                        <label className="block text-sm font-medium mb-2">Enhance for Clarity</label>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Improve content readability and comprehension
                                        </p>
                                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                            Enhance Selected
                                        </button>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <label className="block text-sm font-medium mb-2">Enhance for Engagement</label>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Add interactive elements and engagement techniques
                                        </p>
                                        <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                            Enhance Selected
                                        </button>
                                    </div>

                                    <div className="border rounded-lg p-4">
                                        <label className="block text-sm font-medium mb-2">Accessibility Check</label>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Ensure content is accessible to diverse learners
                                        </p>
                                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                                            Check Accessibility
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t bg-gray-50 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600">
                            Content Management System v1.0 • {modules.length} modules loaded
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => window.open('/api/content/modules', '_blank')}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Export Data
                            </button>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
