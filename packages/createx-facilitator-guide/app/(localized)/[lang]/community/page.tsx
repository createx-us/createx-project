import React from 'react';
import { getDictionary } from '@/lib/i18n';
import { Users, MessageCircle, Globe, Calendar } from 'lucide-react';

export default async function CommunityPage({
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
          {dictionary.navigation.community}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Join a global network of facilitators, designers, and innovation educators sharing best practices and resources.
        </p>
      </div>

      {/* Featured Community Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 p-6 rounded-xl border border-primary-200 dark:border-primary-800 col-span-1 md:col-span-2">
          <div className="flex items-center mb-4">
            <Users className="h-8 w-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Global Facilitator Network
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect with over 5,000 facilitators across 80+ countries who are using CreateX methodologies to transform education and innovation practices in their communities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">5,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Members</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">80+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Countries</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">230+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Communities</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 p-6 rounded-xl border border-accent-200 dark:border-accent-800">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8 text-accent-600 dark:text-accent-400 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Upcoming Events
            </h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
              <div className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-1">JUN 28, 2025</div>
              <div className="text-gray-900 dark:text-white font-medium mb-1">Global Facilitator Summit</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Virtual</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-4">
              <div className="text-xs text-accent-600 dark:text-accent-400 font-medium mb-1">JUL 15, 2025</div>
              <div className="text-gray-900 dark:text-white font-medium mb-1">AI + Design Thinking Workshop</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Regional Hubs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Join the Conversation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <MessageCircle className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Discussion Forum</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Share insights, ask questions, and collaborate with peers on workshop methodologies and facilitation techniques.
            </p>
            <button className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              Join Forum
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Regional Networks</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Connect with facilitators in your geographic region for local events, collaborations, and region-specific resources.
            </p>
            <button className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              Find Your Region
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mentorship Program</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Pair with experienced facilitators for personalized guidance or become a mentor to share your expertise with others.
            </p>
            <button className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Resource Sharing
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Access and contribute to our growing collection of workshop plans, templates, case studies, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-5 py-2.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
            Workshop Templates
          </button>
          <button className="px-5 py-2.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
            Facilitation Guides
          </button>
          <button className="px-5 py-2.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
            Case Studies
          </button>
          <button className="px-5 py-2.5 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-gray-200 dark:border-gray-600 transition-colors">
            AI Prompt Library
          </button>
        </div>
      </div>
    </div>
  );
}