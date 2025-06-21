import React from 'react';
import { Download, FileText } from 'lucide-react';

// Simple resource interface to avoid serialization issues
interface Resource {
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    downloadUrl: string;
}

export default function LearningResourcesPage({
    params
}: {
    params: { lang: string }
}) {
    // Define resources as a simple constant to avoid serialization issues
    const resources: Resource[] = [
        {
            id: 'empathy-map',
            title: 'Empathy Map Canvas',
            description: 'Visual template for capturing user insights during research phase.',
            category: 'Templates',
            type: 'PDF',
            downloadUrl: '/resources/templates/empathy-map-canvas.pdf'
        },
        {
            id: 'brainstorming',
            title: 'Brainwriting Template',
            description: 'Structured ideation template for group brainstorming sessions.',
            category: 'Templates',
            type: 'PDF',
            downloadUrl: '/resources/templates/brainwriting-6-3-5.pdf'
        },
        {
            id: 'double-diamond',
            title: 'Double Diamond Process Slides',
            description: 'Presentation template explaining the design thinking process.',
            category: 'Slides',
            type: 'PPTX',
            downloadUrl: '/resources/slides/double-diamond-process.pptx'
        },
        {
            id: 'workshop-planning',
            title: 'Workshop Planning Canvas',
            description: 'Template for planning effective innovation workshops.',
            category: 'Templates',
            type: 'PDF',
            downloadUrl: '/resources/templates/workshop-planning-canvas.pdf'
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Learning Resources
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Access curated templates, tools, and materials to enhance your facilitation practice.
                    All resources are organized by category and include usage guidelines.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {resources.map((resource) => (
                    <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full mb-2">
                                    {resource.category}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                    {resource.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {resource.description}
                                </p>
                            </div>
                            <FileText className="h-8 w-8 text-gray-400 ml-4" />
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {resource.type}
                            </span>
                            <a
                                href={resource.downloadUrl}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                download
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    How to Use These Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Templates & Canvases
                        </h3>
                        <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                            <li>• Print in A3 or larger for group exercises</li>
                            <li>• Use sticky notes for collaborative filling</li>
                            <li>• Adapt timing based on group size</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Presentation Slides
                        </h3>
                        <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                            <li>• Customize with your branding</li>
                            <li>• Add relevant examples and case studies</li>
                            <li>• Include interactive elements</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
