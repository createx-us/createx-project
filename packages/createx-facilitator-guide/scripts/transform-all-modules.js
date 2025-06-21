#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Module configuration (matches lib/moduleConfig.ts)
const MODULE_CONFIG = {
    'creativity-fundamentals': { id: 'creativity-fundamentals', totalSections: 8 },
    'design-thinking-history': { id: 'design-thinking-history', totalSections: 6 },
    'creative-confidence': { id: 'creative-confidence', totalSections: 7 },
    'mission-principles': { id: 'mission-principles', totalSections: 9 },
    'createx-mission': { id: 'createx-mission', totalSections: 8 },
    'process-overview': { id: 'process-overview', totalSections: 10 },
    'research-empathy': { id: 'research-empathy', totalSections: 9 },
    'sense-making': { id: 'sense-making', totalSections: 7 },
    'framing-prioritization': { id: 'framing-prioritization', totalSections: 10 },
    'ideation-methods': { id: 'ideation-methods', totalSections: 8 },
    'prototyping-methods': { id: 'prototyping-methods', totalSections: 9 },
    'testing-feedback': { id: 'testing-feedback', totalSections: 10 },
    'implementation-roadmapping': { id: 'implementation-roadmapping', totalSections: 11 },
    'reflection-learning': { id: 'reflection-learning', totalSections: 8 },
    'scoping-logistics': { id: 'scoping-logistics', totalSections: 9 },
    'agenda-design': { id: 'agenda-design', totalSections: 10 },
    'facilitation-skills': { id: 'facilitation-skills', totalSections: 11 },
    'facilitator-mindsets': { id: 'facilitator-mindsets', totalSections: 9 },
    'capturing-outcomes': { id: 'capturing-outcomes', totalSections: 8 },
    'troubleshooting': { id: 'troubleshooting', totalSections: 9 },
    'case-study-corporate': { id: 'case-study-corporate', totalSections: 7 },
    'case-study-nonprofit': { id: 'case-study-nonprofit', totalSections: 7 },
    'case-study-education': { id: 'case-study-education', totalSections: 7 },
    'analytics-kpis': { id: 'analytics-kpis', totalSections: 8 },
    'competency-certification': { id: 'competency-certification', totalSections: 6 },
    'personal-brand': { id: 'personal-brand', totalSections: 7 },
    'community-practice': { id: 'community-practice', totalSections: 8 },
    'ai-integration': { id: 'ai-integration', totalSections: 9 }
};

const modulesDir = path.join(__dirname, '../app/(localized)/[lang]/modules');

// Transform a single module page
const transformModulePage = (moduleId, moduleConfig) => {
    const pagePath = path.join(modulesDir, moduleId, 'page.tsx');

    if (!fs.existsSync(pagePath)) {
        console.log(`❌ No page.tsx found for module: ${moduleId}`);
        return false;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Check if already transformed
    if (content.includes('withModuleProgress')) {
        console.log(`✅ Module ${moduleId} already transformed`);
        return true;
    }

    // Backup original file
    fs.writeFileSync(pagePath + '.backup', content);

    try {
        // Transform the content
        const transformedContent = transformPageContent(content, moduleId, moduleConfig.totalSections);

        // Write transformed content
        fs.writeFileSync(pagePath, transformedContent);
        console.log(`✅ Successfully transformed module: ${moduleId}`);
        return true;
    } catch (error) {
        console.error(`❌ Error transforming ${moduleId}:`, error.message);
        // Restore backup on error
        fs.writeFileSync(pagePath, content);
        return false;
    }
};

// Transform page content based on the pattern from creativity-fundamentals
const transformPageContent = (content, moduleId, totalSections) => {
    // 1. Add imports after existing imports
    const importRegex = /(import.*?;[\s\n]*)+/s;
    const imports = content.match(importRegex)?.[0] || '';

    if (!imports.includes('withModuleProgress')) {
        const newImports = `${imports}import { withModuleProgress, type EnhancedModuleProps, ProgressIndicator, SectionStatus } from '@/components/withModuleProgress';
`;
        content = content.replace(importRegex, newImports);
    }

    // 2. Find and replace the main component function
    const componentRegex = /export default function (\w+)\(/;
    const componentMatch = content.match(componentRegex);

    if (!componentMatch) {
        throw new Error('Could not find default export function');
    }

    const originalComponentName = componentMatch[1];
    const newComponentName = originalComponentName.replace('Page', 'Component');

    // 3. Replace function signature
    const functionRegex = new RegExp(`export default function ${originalComponentName}\\(([^)]*)\\)`, 's');
    const newSignature = `function ${newComponentName}({
  params,
  moduleProgress
}: EnhancedModuleProps & { params: { lang: string } })`;

    content = content.replace(functionRegex, newSignature);

    // 4. Remove old localStorage useState
    content = content.replace(
        /const \[completedSections, setCompletedSections\] = useState\(new Set\(\)\);?\s*/g,
        ''
    );

    // 5. Replace completedSections usage with moduleProgress.moduleProgress.sectionsCompleted
    content = content.replace(
        /completedSections\.has\(([^)]+)\)/g,
        'moduleProgress.moduleProgress.sectionsCompleted.has($1)'
    );

    content = content.replace(
        /completedSections\.size/g,
        'moduleProgress.moduleProgress.sectionsCompleted.size'
    );

    // 6. Replace toggleSectionComplete calls
    content = content.replace(
        /toggleSectionComplete\(([^)]+)\)/g,
        'moduleProgress.toggleSectionComplete($1)'
    );

    // 7. Remove old toggle function definition
    content = content.replace(
        /const toggleSectionComplete = \(sectionIndex: number\) => \{[\s\S]*?\}\s*;/g,
        '// Section toggle logic handled by withModuleProgress HOC'
    );

    // 8. Add ProgressIndicator after the opening div
    content = content.replace(
        /return \(\s*<div className="min-h-screen([^"]*)">/,
        `return (
    <div className="min-h-screen$1">
      <ProgressIndicator progress={Math.round((moduleProgress.moduleProgress.sectionsCompleted.size / sections.length) * 100)} className="mb-4" />
      <div className="min-h-screen$1">`
    );

    // Close the extra div
    content = content.replace(
        /(\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*)\);(\s*)}/,
        '$1</div>    );$2}'
    );

    // 9. Add the withModuleProgress wrapper at the end
    content = content.replace(
        /(\s*)}\s*$/,
        `$1}

const ${originalComponentName} = withModuleProgress(
  ${newComponentName},
  '${moduleId}',
  ${totalSections}
);

export default ${originalComponentName};
`
    );

    return content;
};

// Main execution
const main = () => {
    console.log('🚀 Starting module transformation...\n');

    const moduleIds = Object.keys(MODULE_CONFIG);
    console.log(`Found ${moduleIds.length} modules to transform:\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const moduleId of moduleIds) {
        console.log(`📄 Processing module: ${moduleId}`);
        const moduleConfig = MODULE_CONFIG[moduleId];

        const result = transformModulePage(moduleId, moduleConfig);
        if (result === true) {
            const pagePath = path.join(modulesDir, moduleId, 'page.tsx');
            if (fs.readFileSync(pagePath, 'utf8').includes('withModuleProgress')) {
                successCount++;
            } else {
                skipCount++;
            }
        } else {
            errorCount++;
        }
    }

    console.log('\n📊 Transformation Summary:');
    console.log(`✅ Successfully transformed: ${successCount}`);
    console.log(`⏭️  Skipped (already transformed): ${skipCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📁 Total modules: ${moduleIds.length}`);

    if (errorCount === 0) {
        console.log('\n🎉 All modules transformed successfully!');
        console.log('\n🔧 Next steps:');
        console.log('1. Review the transformed files');
        console.log('2. Test each module page');
        console.log('3. Remove .backup files if everything works correctly');
        console.log('4. Run: npm run dev to test');
    } else {
        console.log('\n⚠️  Some modules had errors. Check the logs above and fix manually.');
    }
};

// Run the script
if (require.main === module) {
    main();
}

module.exports = { transformModulePage, transformPageContent };
