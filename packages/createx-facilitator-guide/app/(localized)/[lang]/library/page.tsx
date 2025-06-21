import React from 'react';
import { getDictionary } from '@/lib/i18n';

export default async function LibraryPage({
    params
}: {
    params: { lang: string }
}) {
    // Get dictionary based on the language parameter
    const dictionary = await getDictionary(params.lang as any);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Learning Library
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Access curated resources, templates, and tools to enhance your facilitation practice.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Templates & Tools
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Download ready-to-use templates and facilitation tools.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Best Practices
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Learn from proven strategies and methodologies.
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Case Studies
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Explore real-world applications and success stories.
                    </p>
                </div>
            </div>
        </div>
    );
}
