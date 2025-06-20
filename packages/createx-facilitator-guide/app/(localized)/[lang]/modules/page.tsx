
import React from 'react';
import { getDictionary } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Award } from 'lucide-react';

export default async function ModulesPage({
  params
}: {
  params: { lang: string }
}) {
  // Get dictionary based on the language parameter
  const dictionary = await getDictionary(params.lang as any);

  // Dummy module data - in a real app, this would come from an API or CMS
  const modules = [
    {
      id: 'creativity-fundamentals',
      title: 'Creativity Fundamentals',
      description: 'Explore the foundations of creative thinking and innovation methodologies.',
      chapter: 1,
      duration: 45,
      track: dictionary.tracks.foundations,
      difficulty: dictionary.common.beginner
    },
    {
      id: 'design-thinking-history',
      title: 'Design Thinking History',
      description: 'Learn about the origins and evolution of design thinking as a problem-solving approach.',
      chapter: 2,
      duration: 30,
      track: dictionary.tracks.foundations,
      difficulty: dictionary.common.beginner
    },
    {
      id: 'creative-confidence',
      title: 'Creative Confidence',
      description: 'Build confidence in your creative abilities through practical exercises and mindset shifts.',
      chapter: 3,
      duration: 60,
      track: dictionary.tracks.foundations,
      difficulty: dictionary.common.intermediate
    },
    {
      id: 'process-overview',
      title: 'Design Process Overview',
      description: 'Get a comprehensive overview of the entire design thinking process and methodology.',
      chapter: 6,
      duration: 45,
      track: dictionary.tracks.designProcess,
      difficulty: dictionary.common.beginner
    },
    {
      id: 'ai-integration',
      title: 'AI Integration Fundamentals',
      description: 'Learn how to effectively integrate AI tools into your design thinking workshops.',
      chapter: 18,
      duration: 60,
      track: dictionary.tracks.aiTechnology,
      difficulty: dictionary.common.advanced
    }
  ];

  // Group modules by track
  const modulesByTrack = modules.reduce((acc, module) => {
    if (!acc[module.track]) {
      acc[module.track] = [];
    }
    acc[module.track].push(module);
    return acc;
  }, {} as Record<string, typeof modules>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {dictionary.modules.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {dictionary.modules.description}
        </p>
      </div>

      <div className="space-y-16">
        {Object.entries(modulesByTrack).map(([track, trackModules]) => (
          <div key={track} className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {track}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trackModules.map((module) => (
                <div key={module.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-transform hover:scale-105">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-xs font-medium rounded-full">
                        {dictionary.common.chapter} {module.chapter}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {module.duration} {dictionary.common.minutes}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{module.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">{module.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {module.difficulty}
                      </span>
                      <Link
                        href={`/${params.lang}/modules/${module.id}`}
                        className="flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-500"
                      >
                        {dictionary.modules.startModule}
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 inline-block">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {dictionary.modules.yourProgress}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {dictionary.modules.progressDescription}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
            <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-bold text-primary-600 dark:text-primary-400">15%</span> {dictionary.modules.completed}
          </p>
        </div>
      </div>
    </div>
  );
}