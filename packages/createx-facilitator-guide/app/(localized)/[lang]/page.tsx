import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Lightbulb, Zap } from 'lucide-react';
import { getDictionary } from '@/lib/i18n';

export default async function HomePage({
  params
}: {
  params: { lang: string }
}) {
  // Get dictionary based on the language parameter
  const dictionary = await getDictionary(params.lang as any);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <Image
                  src="https://createx.us/content/images/2025/06/CreateX-Logo_2025-05.png"
                  alt="CreateX Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  CreateX Facilitator Guide v0.1.1
                </span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {dictionary.home.title}
              <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent block mt-2">
                {dictionary.home.subtitle}
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              {dictionary.home.description}
            </p>

            <p className="text-lg text-secondary-600 dark:text-secondary-400 font-medium max-w-2xl mx-auto mb-10">
              ✨ {dictionary.home.outcomePromise}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link
                href={`/${params.lang}/modules`}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
              >
                {dictionary.home.startLearning}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href={`/${params.lang}/overview`}
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-xl"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                {dictionary.home.guideOverview}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {dictionary.home.whatYoullMaster}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {dictionary.home.whatYoullMasterDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800">
              <div className="flex items-center mb-4">
                <Lightbulb className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dictionary.home.creativeConfidence.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {dictionary.home.creativeConfidence.description}
              </p>
              <Link href={`/${params.lang}/modules/creative-confidence`} className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
                {dictionary.home.creativeConfidence.exploreChapter} →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 p-6 rounded-xl border border-accent-200 dark:border-accent-800">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-accent-600 dark:text-accent-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dictionary.home.facilitationSkills.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {dictionary.home.facilitationSkills.description}
              </p>
              <Link href={`/${params.lang}/modules/facilitation-skills`} className="text-accent-600 dark:text-accent-400 font-medium hover:underline">
                {dictionary.home.facilitationSkills.exploreChapter} →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 p-6 rounded-xl border border-success-200 dark:border-success-800">
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-success-600 dark:text-success-400 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {dictionary.home.aiIntegration.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {dictionary.home.aiIntegration.description}
              </p>
              <Link href={`/${params.lang}/modules/ai-integration`} className="text-success-600 dark:text-success-400 font-medium hover:underline">
                {dictionary.home.aiIntegration.exploreChapter} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Module Overview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {dictionary.home.learningPathOverview}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {dictionary.home.learningPathDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Learning Tracks */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {dictionary.home.learningTracks}
              </h3>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    Track 1: {dictionary.tracks.foundations} (Chapters 1-5)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Creativity principles, design thinking history, creative confidence, CreateX mission & facilitator mindsets.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-accent-600 dark:text-accent-400 mb-2">
                    Track 2: {dictionary.tracks.designProcess} (Chapters 6-14)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Complete design thinking methodology from research & empathy to implementation & reflection.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-success-600 dark:text-success-400 mb-2">
                    Track 3: {dictionary.tracks.workshopDesign} (Chapters 15-17)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Scoping & logistics, agenda design, and core facilitation skills for effective workshops.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {dictionary.home.advancedTopics}
              </h3>

              <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-secondary-600 dark:text-secondary-400 mb-2">
                    Track 4: {dictionary.tracks.aiTechnology} (Chapters 18-20)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    AI integration playbook, real-time troubleshooting, and capturing & sharing outcomes.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                    Track 5: {dictionary.tracks.caseStudies} (Chapters 21-24)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Real-world applications, analytics & KPIs, and measuring impact across different contexts.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="text-lg font-semibold text-accent-600 dark:text-accent-400 mb-2">
                    Track 6: {dictionary.tracks.professionalGrowth} (Chapters 25-27)
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Certification pathways, personal branding, and joining the CreateX community of practice.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${params.lang}/modules`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl transform hover:scale-105"
            >
              {dictionary.modules.title}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {dictionary.home.readyToTransform}
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {dictionary.home.readyToTransformDescription}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${params.lang}/modules`}
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-100 text-primary-600 font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl"
            >
              {dictionary.home.startYourJourney}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href={`/${params.lang}/community`}
              className="inline-flex items-center px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl border-2 border-white transition-all duration-200"
            >
              <Users className="mr-2 h-5 w-5" />
              {dictionary.home.joinCommunity}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}