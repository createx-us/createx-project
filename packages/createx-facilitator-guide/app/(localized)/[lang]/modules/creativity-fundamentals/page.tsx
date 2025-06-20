import React from 'react';
import { getDictionary } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Award, CheckCircle } from 'lucide-react';

export default async function CreativityFundamentalsPage({
  params
}: {
  params: { lang: string }
}) {
  // Get dictionary based on the language parameter
  const dictionary = await getDictionary(params.lang as any);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-8 text-sm text-gray-600 dark:text-gray-400">
        <Link href={`/${params.lang}/modules`} className="hover:text-gray-900 dark:hover:text-white">
          {dictionary.modules.title}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 dark:text-white font-medium">Creativity Fundamentals</span>
      </nav>
      
      {/* Module Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-300 text-xs font-medium rounded-full">
            {dictionary.common.chapter} 1
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            45 {dictionary.common.minutes}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Creativity Fundamentals
        </h1>
        <div className="flex items-center flex-wrap gap-3 mb-6">
          <span className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            <Award className="w-4 h-4 mr-1" />
            {dictionary.common.beginner}
          </span>
          <span className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {dictionary.tracks.foundations}
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {dictionary.modules.learningObjectives}
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Understand the core principles of creativity and innovation</li>
            <li>Recognize different types of creative thinking processes</li>
            <li>Learn foundational creativity exercises and warm-ups</li>
            <li>Apply basic creativity techniques to real-world problems</li>
          </ul>
        </div>
      </div>
      
      {/* Module Content */}
      <div className="prose prose-blue max-w-none dark:prose-invert mb-12">
        <h2>Introduction to Creativity</h2>
        <p>
          Creativity is not a special talent that only artists, musicians, and writers possess. It's a fundamental human capacity that we all share. At its core, creativity is the ability to generate novel and useful ideas, solutions, or expressions. This module explores the science of creativity and builds a foundation for the design thinking approach used throughout this guide.
        </p>
        
        <p>
          The modern understanding of creativity has evolved from viewing it as a mysterious, divine gift to recognizing it as a cognitive process that can be developed, enhanced, and applied systematically. Research in cognitive science, psychology, and neuroscience has revealed much about how creative thinking works and how we can cultivate it more effectively.
        </p>
        
        <h3>Key Principles of Creativity</h3>
        
        <ol>
          <li>
            <strong>Combinatorial Thinking</strong>: Creativity often involves connecting existing ideas in new ways. As Steve Jobs famously said, "Creativity is just connecting things."
          </li>
          <li>
            <strong>Divergent and Convergent Thinking</strong>: Creative problem-solving requires both generating many possibilities (divergent thinking) and selecting the most promising ones (convergent thinking).
          </li>
          <li>
            <strong>Incubation Effect</strong>: Creative insights often emerge after periods of rest or focus on unrelated activities, as the brain continues to process problems unconsciously.
          </li>
          <li>
            <strong>Constraints as Catalysts</strong>: Contrary to popular belief, appropriate constraints often enhance creativity by focusing thinking and encouraging novel approaches.
          </li>
        </ol>
        
        <h2>The Neuroscience of Creativity</h2>
        
        <p>
          Modern neuroscience has revealed that creativity is not localized to either the "right brain" or "left brain" as once believed, but involves complex interactions across multiple brain regions. Creative thinking activates both the default mode network (associated with imagination and self-reflection) and the executive control network (associated with evaluation and focus).
        </p>
        
        <p>
          The most creative moments often occur when these networks work in harmony, allowing both generative thought and critical evaluation to coexist. This understanding helps us design better creativity-enhancing practices and environments.
        </p>
        
        <h2>Creativity in Practice</h2>
        
        <p>
          Throughout this module, you'll engage with practical exercises designed to activate different aspects of the creative process. These foundational techniques will be built upon in later chapters as we explore the design thinking methodology.
        </p>
      </div>
      
      {/* Interactive Exercise Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-10">
        <div className="flex items-center mb-4">
          <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 mr-2" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {dictionary.modules.interactiveSection}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {dictionary.modules.interactiveSectionDescription}
        </p>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Exercise 1: Alternate Uses</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              In this classic creativity exercise, list as many possible uses for a common object (like a paper clip or brick) in 3 minutes. Focus on quantity rather than quality.
            </p>
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              Start Exercise
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-700 rounded-lg p-5 border border-gray-200 dark:border-gray-600">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Exercise 2: Random Connections</h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Choose two unrelated objects and find ways to connect them or combine them into a new invention. This exercise strengthens your associative thinking abilities.
            </p>
            <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
              Start Exercise
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex justify-between">
        <Link
          href={`/${params.lang}/modules`}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {dictionary.modules.backToModules}
        </Link>
        
        <Link
          href={`/${params.lang}/modules/design-thinking-history`}
          className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500"
        >
          {dictionary.modules.next}: Design Thinking History
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
      
      {/* Complete Module Button */}
      <div className="mt-10 text-center">
        <button className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl">
          {dictionary.modules.markComplete}
        </button>
      </div>
    </div>
  );
}