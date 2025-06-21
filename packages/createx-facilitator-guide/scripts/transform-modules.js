#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get all module directories
const modulesDir = path.join(__dirname, '../app/(localized)/[lang]/modules');
const moduleConfig = require('../lib/moduleConfig.ts');

// Read all module directories
const getModuleDirectories = () => {
    if (!fs.existsSync(modulesDir)) {
        console.error('Modules directory not found:', modulesDir);
        return [];
    }

    return fs.readdirSync(modulesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .filter(name => name !== 'page.tsx'); // Exclude any files
};

// Transform a single module page
const transformModulePage = (moduleId, modulePath) => {
    const pagePath = path.join(modulePath, 'page.tsx');

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
        const transformedContent = transformPageContent(content, moduleId);

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

// Transform page content
const transformPageContent = (content, moduleId) => {
    // 1. Add imports at the top (after existing imports)
    const importRegex = /(import.*?;[\s\n]*)+/s;
    const imports = content.match(importRegex)?.[0] || '';

    const newImports = `${imports}import { withModuleProgress, type EnhancedModuleProps, ProgressIndicator, SectionStatus } from '@/components/withModuleProgress';
`;

    // 2. Find the main component function
    const componentRegex = /export default function (\w+)\(/;
    const componentMatch = content.match(componentRegex);

    if (!componentMatch) {
        throw new Error('Could not find default export function');
    }

    const originalComponentName = componentMatch[1];
    const newComponentName = originalComponentName.replace('Page', 'Component');

    // 3. Replace function parameters to include EnhancedModuleProps
    const functionRegex = new RegExp(`export default function ${originalComponentName}\\(([^)]*)\\)`, 's');
    const originalParams = content.match(functionRegex)?.[1] || '';

    // Extract existing params and merge with EnhancedModuleProps
    const newParams = originalParams.includes('params')
        ? `{ params, moduleProgress, toggleSectionComplete, markModuleComplete, isModuleComplete }: EnhancedModuleProps & { params: { lang: string } }`
        : `{ moduleProgress, toggleSectionComplete, markModuleComplete, isModuleComplete, params }: EnhancedModuleProps & { params: { lang: string } }`;

    // 4. Replace the localStorage logic with the new progress system
    let transformedContent = content.replace(importRegex, newImports);

    // Remove old localStorage useState and useEffect
    transformedContent = transformedContent.replace(
        /const \[completedSections, setCompletedSections\] = useState\(new Set\(\)\);?\s*/g,
        ''
    );

    transformedContent = transformedContent.replace(
        /\/\/ Load completed sections from localStorage[\s\S]*?}\s*}, \[\]\);?\s*/g,
        ''
    );

    transformedContent = transformedContent.replace(
        /\/\/ Save completed sections to localStorage[\s\S]*?}\s*}, \[completedSections\]\);?\s*/g,
        ''
    );

    // Replace function signature
    transformedContent = transformedContent.replace(
        functionRegex,
        `function ${newComponentName}(${newParams})`
    );

    // 5. Replace completedSections usage with moduleProgress
    transformedContent = transformedContent.replace(
        /completedSections\.has\((\w+)\)/g,
        'moduleProgress.completedSections.has($1)'
    );

    transformedContent = transformedContent.replace(
        /completedSections\.has\(([^)]+)\)/g,
        'moduleProgress.completedSections.has($1)'
    );

    // 6. Replace section toggle logic
    transformedContent = transformedContent.replace(
        /const toggleSectionComplete = \(sectionIndex: number\) => \{[\s\S]*?\}\s*;/g,
        '// Section toggle logic handled by withModuleProgress HOC'
    );

    // 7. Add ProgressIndicator component before the main content
    const contentStartRegex = /return \(\s*<div/;
    transformedContent = transformedContent.replace(
        contentStartRegex,
        `return (
    <div className="min-h-screen bg-gray-50">
      <ProgressIndicator moduleId="${moduleId}" />
      <div`
    );

    // 8. Add SectionStatus components to sections (look for section headers)
    const sectionHeaderRegex = /(<h[1-6][^>]*>.*?<\/h[1-6]>)/g;
    transformedContent = transformedContent.replace(
        sectionHeaderRegex,
        (match, header) => {
            // Extract section number/id if possible
            const sectionMatch = header.match(/(\d+)\.(\d+)|Section (\d+)|(\d+)\./);
            if (sectionMatch) {
                const sectionNum = sectionMatch[1] || sectionMatch[3] || sectionMatch[4];
                return `${header}
              <SectionStatus
                sectionIndex={${parseInt(sectionNum) - 1}}
                isCompleted={moduleProgress.completedSections.has(${parseInt(sectionNum) - 1})}
                onToggle={() => toggleSectionComplete(${parseInt(sectionNum) - 1})}
              />`;
            }
            return match;
        }
    );

    // 9. Replace the default export with withModuleProgress HOC
    const exportRegex = new RegExp(`export default function ${originalComponentName}`, 'g');
    transformedContent = transformedContent.replace(exportRegex, `function ${newComponentName}`);

    // Add the withModuleProgress wrapper at the end
    transformedContent += `\n
const ${originalComponentName} = withModuleProgress(
  ${newComponentName},
  '${moduleId}'
);

export default ${originalComponentName};
`;

    return transformedContent;
};

// Main execution
const main = () => {
    console.log('🚀 Starting module transformation...\n');

    const moduleDirectories = getModuleDirectories();
    console.log(`Found ${moduleDirectories.length} modules to transform:\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const moduleId of moduleDirectories) {
        console.log(`📄 Processing module: ${moduleId}`);
        const modulePath = path.join(modulesDir, moduleId);

        const result = transformModulePage(moduleId, modulePath);
        if (result === true) {
            if (fs.readFileSync(path.join(modulePath, 'page.tsx'), 'utf8').includes('withModuleProgress')) {
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
    console.log(`📁 Total modules: ${moduleDirectories.length}`);

    if (errorCount === 0) {
        console.log('\n🎉 All modules transformed successfully!');
        console.log('\n🔧 Next steps:');
        console.log('1. Review the transformed files');
        console.log('2. Test each module page');
        console.log('3. Remove .backup files if everything works correctly');
    } else {
        console.log('\n⚠️  Some modules had errors. Check the logs above and fix manually.');
    }
};

// Run the script
if (require.main === module) {
    main();
}

module.exports = { transformModulePage, transformPageContent };
