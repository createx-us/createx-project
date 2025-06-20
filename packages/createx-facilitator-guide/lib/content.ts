import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface ModuleContent {
  id: string;
  chapter: number;
  title: string;
  track: string;
  duration: string;
  difficulty: string;
  prerequisites?: string[];
  learningObjectives: string[];
  content: string;
  html: string;
  metadata: {
    [key: string]: any;
  };
}

export interface ModuleMetadata {
  title: string;
  track: string;
  duration: string;
  difficulty: string;
  prerequisites?: string[];
  learningObjectives: string[];
  [key: string]: any;
}

class ContentManager {
  private contentDir: string;
  private processedContent: Map<string, ModuleContent> = new Map();

  constructor(contentDir: string = 'content/modules') {
    this.contentDir = path.join(process.cwd(), contentDir);
  }

  /**
   * Parse markdown content and extract metadata
   */
  async parseMarkdownFile(filePath: string): Promise<ModuleContent> {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    // Extract chapter number and module ID from filename
    const filename = path.basename(filePath, '.md');
    const chapterMatch = filename.match(/^(\d+)-(.+)$/);
    const chapter = chapterMatch ? parseInt(chapterMatch[1]) : 0;
    const id = chapterMatch ? chapterMatch[2] : filename;

    // Parse learning objectives from content
    const learningObjectives = this.extractLearningObjectives(content);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);

    return {
      id,
      chapter,
      title: data.title || this.extractTitleFromContent(content),
      track: data.track || this.extractTrackFromContent(content),
      duration: data.duration || this.extractDurationFromContent(content),
      difficulty: data.difficulty || this.extractDifficultyFromContent(content),
      prerequisites: data.prerequisites || this.extractPrerequisitesFromContent(content),
      learningObjectives,
      content,
      html: processedContent.toString(),
      metadata: data
    };
  }

  /**
   * Load all module content from the content directory
   */
  async loadAllModules(): Promise<ModuleContent[]> {
    const files = fs.readdirSync(this.contentDir)
      .filter(file => file.endsWith('.md'))
      .sort();

    const modules = [];
    for (const file of files) {
      const filePath = path.join(this.contentDir, file);
      const moduleContent = await this.parseMarkdownFile(filePath);
      this.processedContent.set(moduleContent.id, moduleContent);
      modules.push(moduleContent);
    }

    return modules;
  }

  /**
   * Get a specific module by ID
   */
  async getModule(id: string): Promise<ModuleContent | null> {
    if (this.processedContent.has(id)) {
      return this.processedContent.get(id)!;
    }

    // Try to load from file
    const files = fs.readdirSync(this.contentDir);
    const matchingFile = files.find(file => 
      file.includes(id) && file.endsWith('.md')
    );

    if (matchingFile) {
      const filePath = path.join(this.contentDir, matchingFile);
      const moduleContent = await this.parseMarkdownFile(filePath);
      this.processedContent.set(id, moduleContent);
      return moduleContent;
    }

    return null;
  }

  /**
   * Get modules by track
   */
  async getModulesByTrack(track: string): Promise<ModuleContent[]> {
    const allModules = await this.loadAllModules();
    return allModules.filter(module => 
      module.track.toLowerCase() === track.toLowerCase()
    );
  }

  /**
   * Extract learning objectives from markdown content
   */
  private extractLearningObjectives(content: string): string[] {
    const objectivesMatch = content.match(/## Learning Objectives\s*\n([\s\S]*?)\n## /);
    if (!objectivesMatch) return [];

    const objectivesText = objectivesMatch[1];
    return objectivesText
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().substring(1).trim());
  }

  /**
   * Extract title from markdown content
   */
  private extractTitleFromContent(content: string): string {
    const titleMatch = content.match(/^# (.+)$/m);
    return titleMatch ? titleMatch[1] : 'Untitled Module';
  }

  /**
   * Extract track from markdown content
   */
  private extractTrackFromContent(content: string): string {
    const trackMatch = content.match(/\*\*Track:\*\* (.+)$/m);
    return trackMatch ? trackMatch[1] : 'Unknown';
  }

  /**
   * Extract duration from markdown content
   */
  private extractDurationFromContent(content: string): string {
    const durationMatch = content.match(/\*\*Duration:\*\* (.+)$/m);
    return durationMatch ? durationMatch[1] : '30 minutes';
  }

  /**
   * Extract difficulty from markdown content
   */
  private extractDifficultyFromContent(content: string): string {
    const difficultyMatch = content.match(/\*\*Difficulty:\*\* (.+)$/m);
    return difficultyMatch ? difficultyMatch[1] : 'Beginner';
  }

  /**
   * Extract prerequisites from markdown content
   */
  private extractPrerequisitesFromContent(content: string): string[] {
    const prereqMatch = content.match(/\*\*Prerequisites:\*\* (.+)$/m);
    if (!prereqMatch) return [];
    
    return prereqMatch[1]
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  /**
   * Generate navigation data for modules
   */
  async generateNavigation(): Promise<Array<{
    id: string;
    chapter: number;
    title: string;
    track: string;
    prev?: string;
    next?: string;
  }>> {
    const modules = await this.loadAllModules();
    
    return modules.map((module, index) => ({
      id: module.id,
      chapter: module.chapter,
      title: module.title,
      track: module.track,
      prev: index > 0 ? modules[index - 1].id : undefined,
      next: index < modules.length - 1 ? modules[index + 1].id : undefined
    }));
  }

  /**
   * Search modules by keyword
   */
  async searchModules(query: string): Promise<ModuleContent[]> {
    const modules = await this.loadAllModules();
    const searchTerm = query.toLowerCase();
    
    return modules.filter(module => {
      const searchableText = [
        module.title,
        module.track,
        module.content,
        ...module.learningObjectives,
        ...(module.prerequisites || [])
      ].join(' ').toLowerCase();
      
      return searchableText.includes(searchTerm);
    }).sort((a, b) => {
      // Sort by relevance - title matches first, then content matches
      const aTitle = a.title.toLowerCase().includes(searchTerm) ? 1 : 0;
      const bTitle = b.title.toLowerCase().includes(searchTerm) ? 1 : 0;
      
      if (aTitle !== bTitle) return bTitle - aTitle;
      return a.chapter - b.chapter;
    });
  }

  /**
   * Get module statistics
   */
  async getModuleStats(): Promise<{
    totalModules: number;
    trackCounts: Record<string, number>;
    difficultyLevels: Record<string, number>;
    averageDuration: string;
  }> {
    const modules = await this.loadAllModules();
    
    const trackCounts: Record<string, number> = {};
    const difficultyLevels: Record<string, number> = {};
    
    modules.forEach(module => {
      trackCounts[module.track] = (trackCounts[module.track] || 0) + 1;
      difficultyLevels[module.difficulty] = (difficultyLevels[module.difficulty] || 0) + 1;
    });
    
    return {
      totalModules: modules.length,
      trackCounts,
      difficultyLevels,
      averageDuration: '45 minutes' // Would calculate actual average
    };
  }

  /**
   * Export module content for translation
   */
  async exportForTranslation(moduleId: string): Promise<{
    id: string;
    translatable: Record<string, string>;
    metadata: Record<string, any>;
  }> {
    const moduleData = await this.getModule(moduleId);
    if (!moduleData) throw new Error(`Module ${moduleId} not found`);
    
    return {
      id: moduleId,
      translatable: {
        title: moduleData.title,
        content: moduleData.content,
        learningObjectives: moduleData.learningObjectives.join('\n'),
        prerequisites: (moduleData.prerequisites || []).join(', ')
      },
      metadata: {
        track: moduleData.track,
        duration: moduleData.duration,
        difficulty: moduleData.difficulty,
        chapter: moduleData.chapter
      }
    };
  }

  /**
   * Import translated content
   */
  async importTranslation(
    moduleId: string, 
    language: string, 
    translatedContent: Record<string, string>
  ): Promise<void> {
    // This would save translated content to appropriate language files
    const translationDir = path.join(process.cwd(), 'content', 'translations', language);
    
    if (!fs.existsSync(translationDir)) {
      fs.mkdirSync(translationDir, { recursive: true });
    }
    
    const translatedModule = {
      ...translatedContent,
      originalId: moduleId,
      language,
      lastUpdated: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(translationDir, `${moduleId}.json`),
      JSON.stringify(translatedModule, null, 2)
    );
  }

  /**
   * Get available translations for a module
   */
  async getModuleTranslations(moduleId: string): Promise<string[]> {
    const translationsDir = path.join(process.cwd(), 'content', 'translations');
    
    if (!fs.existsSync(translationsDir)) {
      return [];
    }
    
    const languages = fs.readdirSync(translationsDir);
    const availableTranslations: string[] = [];
    
    for (const lang of languages) {
      const langDir = path.join(translationsDir, lang);
      if (fs.statSync(langDir).isDirectory()) {
        const moduleFile = path.join(langDir, `${moduleId}.json`);
        if (fs.existsSync(moduleFile)) {
          availableTranslations.push(lang);
        }
      }
    }
    
    return availableTranslations;
  }

  /**
   * Get translated module content
   */
  async getTranslatedModule(moduleId: string, language: string): Promise<ModuleContent | null> {
    const translationFile = path.join(
      process.cwd(), 
      'content', 
      'translations', 
      language, 
      `${moduleId}.json`
    );
    
    if (!fs.existsSync(translationFile)) {
      return null;
    }
    
    try {
      const translatedData = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
      const originalModule = await this.getModule(moduleId);
      
      if (!originalModule) return null;
      
      // Convert markdown to HTML for translated content
      const processedContent = await remark()
        .use(remarkGfm)
        .use(html, { sanitize: false })
        .process(translatedData.content);
      
      return {
        ...originalModule,
        title: translatedData.title,
        content: translatedData.content,
        html: processedContent.toString(),
        learningObjectives: translatedData.learningObjectives.split('\n').filter((obj: string) => obj.trim()),
        prerequisites: translatedData.prerequisites ? translatedData.prerequisites.split(', ').filter((prereq: string) => prereq.trim()) : []
      };
    } catch (error) {
      console.error('Error loading translated module:', error);
      return null;
    }
  }
}

// Singleton instance
export const contentManager = new ContentManager();

// Helper functions for Next.js
export async function getModuleStaticProps(id: string) {
  const moduleData = await contentManager.getModule(id);
  const navigation = await contentManager.generateNavigation();
  
  if (!moduleData) {
    return { notFound: true };
  }

  return {
    props: {
      module: moduleData,
      navigation: navigation.find(nav => nav.id === id) || null
    }
  };
}

export async function getModuleStaticPaths() {
  const modules = await contentManager.loadAllModules();
  
  return {
    paths: modules.map(module => ({
      params: { id: module.id }
    })),
    fallback: false
  };
}

export async function getAllModules() {
  return await contentManager.loadAllModules();
}

export async function getModulesByTrack(track: string) {
  return await contentManager.getModulesByTrack(track);
}
