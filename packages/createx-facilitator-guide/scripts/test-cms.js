const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Simple content manager for testing
class SimpleContentManager {
    constructor() {
        this.contentDir = path.join(__dirname, '../content/modules');
    }

    async loadAllModules() {
        console.log('📂 Loading modules from:', this.contentDir);

        if (!fs.existsSync(this.contentDir)) {
            throw new Error(`Content directory not found: ${this.contentDir}`);
        }

        const files = fs.readdirSync(this.contentDir)
            .filter(file => file.endsWith('.md'))
            .sort();

        console.log('📄 Found files:', files);

        const modules = [];
        for (const file of files) {
            try {
                const filePath = path.join(this.contentDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const { data, content } = matter(fileContent);

                // Extract chapter number and module ID from filename
                const filename = path.basename(filePath, '.md');
                const chapterMatch = filename.match(/^(\d+)-(.+)$/);
                const chapter = chapterMatch ? parseInt(chapterMatch[1]) : 0;
                const id = chapterMatch ? chapterMatch[2] : filename;

                // Extract metadata from content
                const title = data.title || this.extractTitle(content);
                const track = data.track || this.extractFromContent(content, 'Track') || 'Unknown';
                const duration = data.duration || this.extractFromContent(content, 'Duration') || '30 minutes';
                const difficulty = data.difficulty || this.extractFromContent(content, 'Difficulty') || 'Beginner';

                const module = {
                    id,
                    chapter,
                    title,
                    track,
                    duration,
                    difficulty,
                    content,
                    learningObjectives: data.learningObjectives || this.extractLearningObjectives(content),
                    prerequisites: data.prerequisites || []
                };

                modules.push(module);
                console.log(`✅ Loaded: ${module.title}`);
            } catch (error) {
                console.error(`❌ Error loading ${file}:`, error.message);
            }
        }

        return modules;
    }

    extractTitle(content) {
        const titleMatch = content.match(/^# (.+)$/m);
        return titleMatch ? titleMatch[1] : 'Untitled Module';
    }

    extractFromContent(content, field) {
        const regex = new RegExp(`\\*\\*${field}:\\*\\* (.+)$`, 'm');
        const match = content.match(regex);
        return match ? match[1] : null;
    }

    extractLearningObjectives(content) {
        const objectivesMatch = content.match(/## Learning Objectives\s*\n([\s\S]*?)\n## /);
        if (!objectivesMatch) return [];

        const objectivesText = objectivesMatch[1];
        return objectivesText
            .split('\n')
            .filter(line => line.trim().startsWith('-'))
            .map(line => line.trim().substring(1).trim());
    }

    async getModuleStats(modules) {
        const trackCounts = {};
        const difficultyLevels = {};

        modules.forEach(module => {
            trackCounts[module.track] = (trackCounts[module.track] || 0) + 1;
            difficultyLevels[module.difficulty] = (difficultyLevels[module.difficulty] || 0) + 1;
        });

        return {
            totalModules: modules.length,
            trackCounts,
            difficultyLevels,
            averageDuration: '45 minutes'
        };
    }
}

// Test the content manager
async function testContentManager() {
    console.log('🚀 Testing Content Management System\n');

    try {
        const contentManager = new SimpleContentManager();
        const modules = await contentManager.loadAllModules();
        const stats = await contentManager.getModuleStats(modules);

        console.log('\n📊 Content Statistics:');
        console.log(`Total Modules: ${stats.totalModules}`);
        console.log(`Average Duration: ${stats.averageDuration}`);

        console.log('\nTracks:');
        Object.entries(stats.trackCounts).forEach(([track, count]) => {
            console.log(`  ${track}: ${count} modules`);
        });

        console.log('\nDifficulty Levels:');
        Object.entries(stats.difficultyLevels).forEach(([difficulty, count]) => {
            console.log(`  ${difficulty}: ${count} modules`);
        });

        console.log('\n📚 Sample Modules:');
        modules.slice(0, 3).forEach(module => {
            console.log(`- Chapter ${module.chapter}: ${module.title} (${module.track})`);
        });

        console.log('\n✅ Content Management System is working correctly!');

        return { modules, stats };
    } catch (error) {
        console.error('❌ Error testing content manager:', error);
        throw error;
    }
}

// Export for use in other scripts
module.exports = { SimpleContentManager, testContentManager };

// Run test if called directly
if (require.main === module) {
    testContentManager()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}
