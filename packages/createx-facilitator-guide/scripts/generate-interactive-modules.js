#!/usr/bin/env node
/**
 * CreateX Interactive Module Generator
 * 
 * This script transforms static markdown modules into interactive React components
 * following the pattern established in creative-confidence/page.tsx
 */

const fs = require('fs');
const path = require('path');

// Module metadata mapping
const MODULE_METADATA = {
    '01-creativity-fundamentals': {
        chapter: 1,
        title: 'Creativity Fundamentals',
        track: 'Foundations',
        duration: '45 minutes',
        difficulty: 'Beginner',
        nextModule: 'design-thinking-history'
    },
    '02-design-thinking-history': {
        chapter: 2,
        title: 'Design Thinking History',
        track: 'Foundations',
        duration: '30 minutes',
        difficulty: 'Beginner',
        nextModule: 'creative-confidence'
    },
    '04-mission-principles': {
        chapter: 4,
        title: 'CreateX Mission & Principles',
        track: 'Foundations',
        duration: '35 minutes',
        difficulty: 'Beginner',
        nextModule: 'facilitator-mindsets'
    },
    '05-facilitator-mindsets': {
        chapter: 5,
        title: 'Facilitator Mindsets',
        track: 'Foundations',
        duration: '40 minutes',
        difficulty: 'Intermediate',
        nextModule: 'process-overview'
    },
    '06-process-overview': {
        chapter: 6,
        title: 'Process Overview',
        track: 'Design Process',
        duration: '45 minutes',
        difficulty: 'Intermediate',
        nextModule: 'research-empathy'
    },
    '07-research-empathy': {
        chapter: 7,
        title: 'Research & Empathy',
        track: 'Design Process',
        duration: '50 minutes',
        difficulty: 'Intermediate',
        nextModule: 'sense-making'
    },
    '08-sense-making': {
        chapter: 8,
        title: 'Sense Making',
        track: 'Design Process',
        duration: '45 minutes',
        difficulty: 'Intermediate',
        nextModule: 'framing-prioritization'
    },
    '09-framing-prioritization': {
        chapter: 9,
        title: 'Framing & Prioritization',
        track: 'Design Process',
        duration: '40 minutes',
        difficulty: 'Intermediate',
        nextModule: 'ideation-methods'
    },
    '10-ideation-methods': {
        chapter: 10,
        title: 'Ideation Methods',
        track: 'Design Process',
        duration: '55 minutes',
        difficulty: 'Intermediate',
        nextModule: 'prototyping-methods'
    },
    '11-prototyping-methods': {
        chapter: 11,
        title: 'Prototyping Methods',
        track: 'Design Process',
        duration: '60 minutes',
        difficulty: 'Advanced',
        nextModule: 'testing-feedback'
    },
    '12-testing-feedback': {
        chapter: 12,
        title: 'Testing & Feedback',
        track: 'Design Process',
        duration: '45 minutes',
        difficulty: 'Intermediate',
        nextModule: 'implementation-roadmapping'
    },
    '13-implementation-roadmapping': {
        chapter: 13,
        title: 'Implementation & Roadmapping',
        track: 'Design Process',
        duration: '50 minutes',
        difficulty: 'Advanced',
        nextModule: 'reflection-learning'
    },
    '14-reflection-learning': {
        chapter: 14,
        title: 'Reflection & Learning',
        track: 'Workshop Design',
        duration: '35 minutes',
        difficulty: 'Intermediate',
        nextModule: 'scoping-logistics'
    },
    '15-scoping-logistics': {
        chapter: 15,
        title: 'Scoping & Logistics',
        track: 'Workshop Design',
        duration: '40 minutes',
        difficulty: 'Intermediate',
        nextModule: 'agenda-design'
    },
    '16-agenda-design': {
        chapter: 16,
        title: 'Agenda Design',
        track: 'Workshop Design',
        duration: '45 minutes',
        difficulty: 'Intermediate',
        nextModule: 'facilitation-skills'
    },
    '17-facilitation-skills': {
        chapter: 17,
        title: 'Facilitation Skills',
        track: 'Workshop Design',
        duration: '55 minutes',
        difficulty: 'Advanced',
        nextModule: 'ai-integration'
    },
    '18-ai-integration': {
        chapter: 18,
        title: 'AI Integration',
        track: 'AI & Technology',
        duration: '40 minutes',
        difficulty: 'Advanced',
        nextModule: 'troubleshooting'
    },
    '19-troubleshooting': {
        chapter: 19,
        title: 'Troubleshooting',
        track: 'AI & Technology',
        duration: '35 minutes',
        difficulty: 'Intermediate',
        nextModule: 'capturing-outcomes'
    },
    '20-capturing-outcomes': {
        chapter: 20,
        title: 'Capturing Outcomes',
        track: 'AI & Technology',
        duration: '30 minutes',
        difficulty: 'Intermediate',
        nextModule: 'case-study-corporate'
    },
    '21-case-study-corporate': {
        chapter: 21,
        title: 'Case Study: Corporate',
        track: 'Case Studies',
        duration: '35 minutes',
        difficulty: 'Intermediate',
        nextModule: 'case-study-nonprofit'
    },
    '22-case-study-nonprofit': {
        chapter: 22,
        title: 'Case Study: Nonprofit',
        track: 'Case Studies',
        duration: '35 minutes',
        difficulty: 'Intermediate',
        nextModule: 'case-study-education'
    },
    '23-case-study-education': {
        chapter: 23,
        title: 'Case Study: Education',
        track: 'Case Studies',
        duration: '35 minutes',
        difficulty: 'Intermediate',
        nextModule: 'analytics-kpis'
    },
    '24-analytics-kpis': {
        chapter: 24,
        title: 'Analytics & KPIs',
        track: 'Case Studies',
        duration: '40 minutes',
        difficulty: 'Advanced',
        nextModule: 'competency-certification'
    },
    '25-competency-certification': {
        chapter: 25,
        title: 'Competency & Certification',
        track: 'Professional Growth',
        duration: '30 minutes',
        difficulty: 'Intermediate',
        nextModule: 'personal-brand'
    },
    '26-personal-brand': {
        chapter: 26,
        title: 'Personal Brand',
        track: 'Professional Growth',
        duration: '25 minutes',
        difficulty: 'Beginner',
        nextModule: 'community-practice'
    },
    '27-community-practice': {
        chapter: 27,
        title: 'Community of Practice',
        track: 'Professional Growth',
        duration: '30 minutes',
        difficulty: 'Intermediate',
        nextModule: null
    }
};

/**
 * Parse markdown content into sections
 */
function parseMarkdownIntoSections(content) {
    const lines = content.split('\n');
    const sections = [];
    let currentSection = null;
    let currentContent = [];

    for (const line of lines) {
        // Check for section headers (## X.Y or ### X.Y.Z)
        const sectionMatch = line.match(/^##\s+(\d+\.\d+(?:\.\d+)?)\s+(.+)$/);

        if (sectionMatch) {
            // Save previous section if exists
            if (currentSection) {
                sections.push({
                    ...currentSection,
                    content: currentContent.join('\n').trim()
                });
            }

            // Start new section
            const [, sectionId, title] = sectionMatch;
            currentSection = {
                id: `section-${sectionId.replace(/\./g, '-')}`,
                title: `${sectionId} ${title}`,
                type: determineContentType(title)
            };
            currentContent = [];
        } else {
            // Add content to current section
            currentContent.push(line);
        }
    }

    // Add final section
    if (currentSection) {
        sections.push({
            ...currentSection,
            content: currentContent.join('\n').trim()
        });
    }

    return sections;
}

/**
 * Determine if section should be interactive
 */
function determineContentType(title) {
    const interactiveKeywords = [
        'exercise', 'activity', 'practice', 'interactive', 'tool', 'template',
        'checklist', 'assessment', 'reflection', 'hands-on', 'workshop'
    ];

    const titleLower = title.toLowerCase();
    return interactiveKeywords.some(keyword => titleLower.includes(keyword))
        ? 'interactive'
        : 'content';
}

/**
 * Generate React component for interactive module
 */
function generateInteractiveComponent(moduleKey, metadata, sections) {
    // Generate proper component name without leading numbers
    const componentName = moduleKey.replace(/^\d+-/, '').split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') + 'Page';

    const urlSlug = moduleKey.replace(/^\d+-/, '');

    return `'use client';

import React, { useState, useEffect } from 'react';
import { getDictionary } from '@/lib/i18n';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Award, CheckCircle, Play } from 'lucide-react';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

interface Section {
  id: string;
  title: string;
  content: string;
  type: 'content' | 'interactive';
}

export default function ${componentName}({
  params
}: {
  params: { lang: string }
}) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [processedContent, setProcessedContent] = useState('');

  // Function to process markdown content to HTML
  const processMarkdown = async (content: string) => {
    try {
      const result = await remark()
        .use(remarkGfm)
        .use(remarkHtml, { sanitize: false })
        .process(content);
      return result.toString();
    } catch (error) {
      console.error('Error processing markdown:', error);
      return content.replace(/\\n/g, '<br/>');
    }
  };

  // English sections data
  const englishSections: Section[] = ${JSON.stringify(sections, null, 4)};

  // Get sections based on language
  const getSections = (): Section[] => {
    if (params.lang === 'zh') {
      // TODO: Add Chinese translations
      return englishSections;
    }
    return englishSections;
  };

  const sections = getSections();

  // Process content when section changes
  useEffect(() => {
    if (sections[currentSection]) {
      processMarkdown(sections[currentSection].content)
        .then(setProcessedContent);
    }
  }, [currentSection]);

  // Calculate progress
  const progress = (completedSections.size / sections.length) * 100;

  // Toggle section completion
  const toggleSectionComplete = (sectionIndex: number) => {
    const newCompleted = new Set(completedSections);
    if (newCompleted.has(sectionIndex)) {
      newCompleted.delete(sectionIndex);
    } else {
      newCompleted.add(sectionIndex);
    }
    setCompletedSections(newCompleted);
  };

  // UI text based on language
  const uiText = params.lang === 'zh' ? {
    backToModules: '返回模块',
    chapter: '章节',
    moduleTitle: '${metadata.title}',
    completed: '已完成',
    minutes: '分钟',
    intermediate: '${metadata.difficulty}',
    moduleSections: '模块章节',
    interactiveSection: '互动环节',
    interactiveSectionDescription: '这是一个互动练习环节，请积极参与。',
    markComplete: '标记完成',
    previous: '上一个',
    next: '下一个'
  } : {
    backToModules: 'Back to Modules',
    chapter: 'Chapter',
    moduleTitle: '${metadata.title}',
    completed: 'Completed',
    minutes: 'minutes',
    intermediate: '${metadata.difficulty}',
    moduleSections: 'Module Sections', 
    interactiveSection: 'Interactive Section',
    interactiveSectionDescription: 'This is an interactive exercise section. Please engage actively.',
    markComplete: 'Mark Complete',
    previous: 'Previous',
    next: 'Next'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={\`/\${params.lang}/modules\`}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                {uiText.backToModules}
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    {uiText.chapter} ${metadata.chapter}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">${metadata.track}</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {uiText.moduleTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round(progress)}% {uiText.completed}
              </div>
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                  style={{ width: \`\${progress}%\` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>${metadata.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>{uiText.intermediate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {uiText.moduleSections}
              </h3>
              <nav className="space-y-2">
                {sections.map((section: Section, index: number) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={\`w-full text-left flex items-center justify-between p-3 rounded-lg transition-colors \${
                      currentSection === index
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }\`}
                  >
                    <span className="text-sm font-medium">{section.title}</span>
                    {completedSections.has(index) && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sections[currentSection].title}
                </h2>
                <button
                  onClick={() => toggleSectionComplete(currentSection)}
                  className={\`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors \${
                    completedSections.has(currentSection)
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }\`}
                >
                  {completedSections.has(currentSection) ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>{uiText.completed}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>{uiText.markComplete}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{
                  __html: processedContent || sections[currentSection].content.replace(/\\n/g, '<br />')
                }} />
              </div>

              {/* Section Type Indicator */}
              {sections[currentSection].type === 'interactive' && (
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-400">
                    <Play className="h-5 w-5" />
                    <span className="font-medium">{uiText.interactiveSection}</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                    {uiText.interactiveSectionDescription}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>{uiText.previous}</span>
                </button>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentSection + 1} of {sections.length}
                </span>

                {currentSection < sections.length - 1 ? (
                  <button
                    onClick={() => setCurrentSection(currentSection + 1)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <span>{uiText.next}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  ${metadata.nextModule ? `<Link
                    href={\`/\${params.lang}/modules/${metadata.nextModule}\`}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <span>{uiText.next} Module</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>` : `<div className="flex items-center space-x-2 px-4 py-2 bg-gray-400 text-white rounded-lg font-medium">
                    <span>Course Complete</span>
                    <CheckCircle className="h-4 w-4" />
                  </div>`}
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;
}

/**
 * Main generation function
 */
function generateInteractiveModule(moduleKey) {
    console.log(`\\n🚀 Generating interactive module: ${moduleKey}`);

    // Get module metadata
    const metadata = MODULE_METADATA[moduleKey];
    if (!metadata) {
        console.error(`❌ No metadata found for module: ${moduleKey}`);
        return;
    }

    // Read markdown content
    const contentPath = path.join(__dirname, '..', 'content', 'modules', `${moduleKey}.md`);
    if (!fs.existsSync(contentPath)) {
        console.error(`❌ Module content not found: ${contentPath}`);
        return;
    }

    const content = fs.readFileSync(contentPath, 'utf8');
    console.log(`📄 Read content from: ${contentPath}`);

    // Parse content into sections
    const sections = parseMarkdownIntoSections(content);
    console.log(`📚 Parsed ${sections.length} sections`);

    // Generate React component
    const componentCode = generateInteractiveComponent(moduleKey, metadata, sections);

    // Create output directory
    const urlSlug = moduleKey.replace(/^\d+-/, '');
    const outputDir = path.join(__dirname, '..', 'app', '(localized)', '[lang]', 'modules', urlSlug);
    fs.mkdirSync(outputDir, { recursive: true });

    // Write component file
    const outputPath = path.join(outputDir, 'page.tsx');
    fs.writeFileSync(outputPath, componentCode);

    console.log(`✅ Generated interactive module: ${outputPath}`);
    console.log(`   - Chapter: ${metadata.chapter}`);
    console.log(`   - Title: ${metadata.title}`);
    console.log(`   - Sections: ${sections.length}`);
    console.log(`   - Interactive sections: ${sections.filter(s => s.type === 'interactive').length}`);
}

/**
 * Generate all modules or specific module
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log('🏗️  CreateX Interactive Module Generator\\n');
        console.log('Generating all modules...');

        Object.keys(MODULE_METADATA).forEach(moduleKey => {
            generateInteractiveModule(moduleKey);
        });

        console.log('\\n🎉 All modules generated successfully!');
        console.log('\\nNext steps:');
        console.log('1. Review generated components in app/(localized)/[lang]/modules/');
        console.log('2. Add Chinese translations to each component');
        console.log('3. Test responsive design and functionality');
        console.log('4. Add custom interactive elements as needed');
    } else {
        const moduleKey = args[0];
        if (MODULE_METADATA[moduleKey]) {
            generateInteractiveModule(moduleKey);
        } else {
            console.error(`❌ Unknown module: ${moduleKey}`);
            console.log('\\nAvailable modules:');
            Object.keys(MODULE_METADATA).forEach(key => {
                console.log(`  - ${key}`);
            });
        }
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    generateInteractiveModule,
    MODULE_METADATA,
    parseMarkdownIntoSections
};
