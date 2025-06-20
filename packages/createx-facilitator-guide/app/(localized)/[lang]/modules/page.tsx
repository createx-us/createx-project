'use client';

import React, { useState, useEffect } from 'react';
import { getDictionary } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Award, CheckCircle, PlayCircle, Lock } from 'lucide-react';
import { useOverallProgress } from '@/hooks/useOverallProgress';
import { MODULE_CONFIG, type ModuleId } from '@/lib/moduleConfig';
import '@/lib/debugProgress'; // Import debug utilities

export default function ModulesPage({
  params
}: {
  params: { lang: string }
}) {
  const [dictionary, setDictionary] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Use the dedicated overall progress hook (read-only, doesn't interfere with individual modules)
  const {
    userProgress,
    getOverallStats,
    getModuleStatus,
    isLoaded
  } = useOverallProgress();

  // Load dictionary on component mount
  useEffect(() => {
    const loadData = async () => {
      const dict = await getDictionary(params.lang as any);
      setDictionary(dict);
    };

    loadData();
  }, [params.lang]);

  // Set mounted state to defer progress rendering until hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!dictionary || !isLoaded || !isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{dictionary?.modules?.loadingModules || 'Loading modules...'}</p>
        </div>
      </div>
    );
  }

  // Get overall progress stats (only after isLoaded is true)
  const overallStats = getOverallStats();

  // Define modules with their metadata
  const modules = Object.values(MODULE_CONFIG).map(moduleConfig => ({
    id: moduleConfig.id,
    title: (dictionary.modules as any)?.[moduleConfig.id]?.title || moduleConfig.name,
    description: (dictionary.modules as any)?.[moduleConfig.id]?.description || `Learn about ${moduleConfig.name}`,
    duration: '45 min',
    chapter: moduleConfig.chapter,
    track: moduleConfig.chapter <= 5 ? dictionary.tracks?.foundations || 'Foundations' :
      moduleConfig.chapter <= 14 ? dictionary.tracks?.designProcess || 'Design Process' :
        moduleConfig.chapter <= 17 ? dictionary.tracks?.workshopDesign || 'Workshop Design' :
          moduleConfig.chapter <= 20 ? dictionary.tracks?.aiTechnology || 'AI & Technology' :
            moduleConfig.chapter <= 24 ? dictionary.tracks?.caseStudies || 'Case Studies' :
              dictionary.tracks?.professionalGrowth || 'Professional Growth',
    difficulty: moduleConfig.chapter <= 10 ? dictionary.common?.beginner || 'Beginner' :
      dictionary.common?.intermediate || 'Intermediate',
    sections: moduleConfig.totalSections
  }));

  // Group modules by track
  const foundationModules = modules.filter(m => m.chapter <= 5);
  const designProcessModules = modules.filter(m => m.chapter > 5 && m.chapter <= 14);
  const workshopDesignModules = modules.filter(m => m.chapter > 14 && m.chapter <= 17);
  const aiTechnologyModules = modules.filter(m => m.chapter > 17 && m.chapter <= 20);
  const caseStudiesModules = modules.filter(m => m.chapter > 20 && m.chapter <= 24);
  const professionalGrowthModules = modules.filter(m => m.chapter > 24);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {dictionary.modules?.title || 'Facilitator Guide Modules'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {dictionary.modules?.subtitle || 'Learn design thinking, AI integration, and transformative guidance through 27 comprehensive modules across 6 learning tracks.'}
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 mb-12">
        <div className="flex items-center justify-center mb-6">
          <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {dictionary.progress?.title || 'Your Learning Progress'}
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              {overallStats.overallProgress}% completed
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {overallStats.completedModules} of {overallStats.totalModules} modules
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallStats.overallProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Foundation Track */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl mr-4">
            <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.tracks?.foundations || 'Foundations'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {foundationModules.filter(m => getModuleStatus(m.id).status === 'completed').length} / {foundationModules.length} completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foundationModules.map((module, index) => {
            const moduleStatus = getModuleStatus(module.id);
            const isLocked = index > 0 && getModuleStatus(foundationModules[index - 1].id).status !== 'completed';

            return (
              <div
                key={module.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 ${isLocked ? 'opacity-60' : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg text-sm font-medium">
                      Chapter {module.chapter}
                    </span>
                    <div className="flex items-center">
                      {moduleStatus.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      )}
                      {isLocked && (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {module.description}
                </p>

                {(moduleStatus.status === 'in-progress' || moduleStatus.status === 'completed') && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {dictionary.modules?.progress || 'Progress'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {moduleStatus.sectionsCompleted}/{moduleStatus.totalSections} {dictionary.modules?.sections || 'sections'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {module.difficulty}
                    </span>
                    <span>{module.sections} {dictionary.modules?.sections || 'sections'}</span>
                  </div>

                  {!isLocked && (
                    <Link
                      href={`/${params.lang}/modules/${module.id}`}
                      className={`flex items-center font-medium hover:scale-105 transition-all ${moduleStatus.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : moduleStatus.status === 'in-progress'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-primary-600 dark:text-primary-400'
                        }`}
                    >
                      {moduleStatus.status === 'completed' ? (dictionary.modules?.review || 'Review') :
                        moduleStatus.status === 'in-progress' ? (dictionary.modules?.continue || 'Continue') :
                          (dictionary.modules?.start || 'Start')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Design Process Track */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl mr-4">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.tracks?.designProcess || 'Design Process'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {designProcessModules.filter(m => getModuleStatus(m.id).status === 'completed').length} / {designProcessModules.length} completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designProcessModules.map((module, index) => {
            const moduleStatus = getModuleStatus(module.id);
            const isLocked = foundationModules.length > 0 &&
              getModuleStatus(foundationModules[foundationModules.length - 1].id).status !== 'completed';

            return (
              <div
                key={module.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 ${isLocked ? 'opacity-60' : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg text-sm font-medium">
                      Chapter {module.chapter}
                    </span>
                    <div className="flex items-center">
                      {moduleStatus.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      )}
                      {isLocked && (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {module.description}
                </p>

                {(moduleStatus.status === 'in-progress' || moduleStatus.status === 'completed') && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {dictionary.modules?.progress || 'Progress'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {moduleStatus.sectionsCompleted}/{moduleStatus.totalSections} {dictionary.modules?.sections || 'sections'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {module.difficulty}
                    </span>
                    <span>{module.sections} {dictionary.modules?.sections || 'sections'}</span>
                  </div>

                  {!isLocked && (
                    <Link
                      href={`/${params.lang}/modules/${module.id}`}
                      className={`flex items-center font-medium hover:scale-105 transition-all ${moduleStatus.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : moduleStatus.status === 'in-progress'
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-primary-600 dark:text-primary-400'
                        }`}
                    >
                      {moduleStatus.status === 'completed' ? (dictionary.modules?.review || 'Review') :
                        moduleStatus.status === 'in-progress' ? (dictionary.modules?.continue || 'Continue') :
                          (dictionary.modules?.start || 'Start')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Workshop Design Track */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl mr-4">
            <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.tracks?.workshopDesign || 'Workshop Design'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {workshopDesignModules.filter(m => getModuleStatus(m.id).status === 'completed').length} / {workshopDesignModules.length} completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshopDesignModules.map((module, index) => {
            const moduleStatus = getModuleStatus(module.id);
            const isLocked = designProcessModules.length > 0 &&
              getModuleStatus(designProcessModules[designProcessModules.length - 1].id).status !== 'completed';

            return (
              <div
                key={module.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 ${isLocked ? 'opacity-60' : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-lg text-sm font-medium">
                      Chapter {module.chapter}
                    </span>
                    <div className="flex items-center">
                      {moduleStatus.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      )}
                      {isLocked && (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {module.description}
                </p>

                {(moduleStatus.status === 'in-progress' || moduleStatus.status === 'completed') && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {dictionary.modules?.progress || 'Progress'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {moduleStatus.sectionsCompleted}/{moduleStatus.totalSections} {dictionary.modules?.sections || 'sections'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {module.difficulty}
                    </span>
                    <span>{module.sections} {dictionary.modules?.sections || 'sections'}</span>
                  </div>

                  {!isLocked && (
                    <Link
                      href={`/${params.lang}/modules/${module.id}`}
                      className={`flex items-center font-medium hover:scale-105 transition-all ${moduleStatus.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : moduleStatus.status === 'in-progress'
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-primary-600 dark:text-primary-400'
                        }`}
                    >
                      {moduleStatus.status === 'completed' ? (dictionary.modules?.review || 'Review') :
                        moduleStatus.status === 'in-progress' ? (dictionary.modules?.continue || 'Continue') :
                          (dictionary.modules?.start || 'Start')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI & Technology Track */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl mr-4">
            <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.tracks?.aiTechnology || 'AI & Technology'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {aiTechnologyModules.filter(m => getModuleStatus(m.id).status === 'completed').length} / {aiTechnologyModules.length} completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTechnologyModules.map((module, index) => {
            const moduleStatus = getModuleStatus(module.id);
            const isLocked = workshopDesignModules.length > 0 &&
              getModuleStatus(workshopDesignModules[workshopDesignModules.length - 1].id).status !== 'completed';

            return (
              <div
                key={module.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 ${isLocked ? 'opacity-60' : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-lg text-sm font-medium">
                      Chapter {module.chapter}
                    </span>
                    <div className="flex items-center">
                      {moduleStatus.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      )}
                      {isLocked && (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {module.description}
                </p>

                {(moduleStatus.status === 'in-progress' || moduleStatus.status === 'completed') && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {dictionary.modules?.progress || 'Progress'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {moduleStatus.sectionsCompleted}/{moduleStatus.totalSections} {dictionary.modules?.sections || 'sections'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {module.difficulty}
                    </span>
                    <span>{module.sections} {dictionary.modules?.sections || 'sections'}</span>
                  </div>

                  {!isLocked && (
                    <Link
                      href={`/${params.lang}/modules/${module.id}`}
                      className={`flex items-center font-medium hover:scale-105 transition-all ${moduleStatus.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : moduleStatus.status === 'in-progress'
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-primary-600 dark:text-primary-400'
                        }`}
                    >
                      {moduleStatus.status === 'completed' ? (dictionary.modules?.review || 'Review') :
                        moduleStatus.status === 'in-progress' ? (dictionary.modules?.continue || 'Continue') :
                          (dictionary.modules?.start || 'Start')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Studies Track */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl mr-4">
            <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.tracks?.caseStudies || 'Case Studies'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {caseStudiesModules.filter(m => getModuleStatus(m.id).status === 'completed').length} / {caseStudiesModules.length} completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudiesModules.map((module, index) => {
            const moduleStatus = getModuleStatus(module.id);
            const isLocked = aiTechnologyModules.length > 0 &&
              getModuleStatus(aiTechnologyModules[aiTechnologyModules.length - 1].id).status !== 'completed';

            return (
              <div
                key={module.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 ${isLocked ? 'opacity-60' : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-lg text-sm font-medium">
                      Chapter {module.chapter}
                    </span>
                    <div className="flex items-center">
                      {moduleStatus.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      )}
                      {isLocked && (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {module.description}
                </p>

                {(moduleStatus.status === 'in-progress' || moduleStatus.status === 'completed') && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {dictionary.modules?.progress || 'Progress'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {moduleStatus.sectionsCompleted}/{moduleStatus.totalSections} {dictionary.modules?.sections || 'sections'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {module.difficulty}
                    </span>
                    <span>{module.sections} {dictionary.modules?.sections || 'sections'}</span>
                  </div>

                  {!isLocked && (
                    <Link
                      href={`/${params.lang}/modules/${module.id}`}
                      className={`flex items-center font-medium hover:scale-105 transition-all ${moduleStatus.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : moduleStatus.status === 'in-progress'
                          ? 'text-orange-600 dark:text-orange-400'
                          : 'text-primary-600 dark:text-primary-400'
                        }`}
                    >
                      {moduleStatus.status === 'completed' ? (dictionary.modules?.review || 'Review') :
                        moduleStatus.status === 'in-progress' ? (dictionary.modules?.continue || 'Continue') :
                          (dictionary.modules?.start || 'Start')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Professional Growth Track */}
      <div className="mb-16">
        <div className="flex items-center mb-8">
          <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-xl mr-4">
            <Award className="h-6 w-6 text-pink-600 dark:text-pink-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {dictionary.tracks?.professionalGrowth || 'Professional Growth'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {professionalGrowthModules.filter(m => getModuleStatus(m.id).status === 'completed').length} / {professionalGrowthModules.length} completed
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionalGrowthModules.map((module, index) => {
            const moduleStatus = getModuleStatus(module.id);
            const isLocked = caseStudiesModules.length > 0 &&
              getModuleStatus(caseStudiesModules[caseStudiesModules.length - 1].id).status !== 'completed';

            return (
              <div
                key={module.id}
                className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 ${isLocked ? 'opacity-60' : ''
                  }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-2 py-1 rounded-lg text-sm font-medium">
                      Chapter {module.chapter}
                    </span>
                    <div className="flex items-center">
                      {moduleStatus.status === 'completed' && (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      )}
                      {moduleStatus.status === 'in-progress' && (
                        <PlayCircle className="h-5 w-5 text-blue-500" />
                      )}
                      {isLocked && (
                        <Lock className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4 mr-1" />
                    {module.duration}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {module.description}
                </p>

                {(moduleStatus.status === 'in-progress' || moduleStatus.status === 'completed') && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                        {dictionary.modules?.progress || 'Progress'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {moduleStatus.sectionsCompleted}/{moduleStatus.totalSections} {dictionary.modules?.sections || 'sections'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleStatus.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {module.difficulty}
                    </span>
                    <span>{module.sections} {dictionary.modules?.sections || 'sections'}</span>
                  </div>

                  {!isLocked && (
                    <Link
                      href={`/${params.lang}/modules/${module.id}`}
                      className={`flex items-center font-medium hover:scale-105 transition-all ${moduleStatus.status === 'completed'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : moduleStatus.status === 'in-progress'
                          ? 'text-pink-600 dark:text-pink-400'
                          : 'text-primary-600 dark:text-primary-400'
                        }`}
                    >
                      {moduleStatus.status === 'completed' ? (dictionary.modules?.review || 'Review') :
                        moduleStatus.status === 'in-progress' ? (dictionary.modules?.continue || 'Continue') :
                          (dictionary.modules?.start || 'Start')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Continue Learning Section */}
      {overallStats.completedModules > 0 && (
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{dictionary.modules?.continueYourLearning || 'Continue Your Learning Journey'}</h2>
            <p className="text-primary-100 mb-6">
              {dictionary.modules?.youveCompleted || 'You\'ve completed'} {overallStats.completedModules} {dictionary.modules?.modulesKeepUp || 'modules. Keep up the great work!'}
            </p>
            <div className="flex justify-center">
              <Link
                href={`/${params.lang}/modules/${(() => {
                  const nextModule = modules.find(m => getModuleStatus(m.id).status !== 'completed');
                  return nextModule?.id || modules[0].id;
                })()}`}
                className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center"
              >
                {dictionary.modules?.continueLearning || 'Continue Learning'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
