import { useState, useEffect } from 'react';

// Content API Hook
export function useContentAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiCall = async (endpoint: string, options?: RequestInit) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/content/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { apiCall, loading, error };
}

// Module Management Hook
export function useModules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { apiCall } = useContentAPI();

  const loadModules = async () => {
    try {
      const data = await apiCall('modules');
      setModules(data.modules);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load modules');
    } finally {
      setLoading(false);
    }
  };

  const getModule = async (id: string) => {
    try {
      const data = await apiCall(`modules/${id}`);
      return data.module;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load module');
      return null;
    }
  };

  const searchModules = async (query: string) => {
    try {
      const data = await apiCall(`search?q=${encodeURIComponent(query)}`);
      return data.results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      return [];
    }
  };

  useEffect(() => {
    loadModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    modules,
    loading,
    error,
    loadModules,
    getModule,
    searchModules
  };
}

// Translation Hook
export function useTranslation() {
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { apiCall } = useContentAPI();

  const translateContent = async (content: string, targetLanguage: string) => {
    try {
      const data = await apiCall('translate', {
        method: 'POST',
        body: JSON.stringify({
          content,
          targetLanguage,
          sourceLanguage: currentLanguage
        })
      });
      return data.translatedContent;
    } catch (err) {
      console.error('Translation failed:', err);
      return content; // Return original content if translation fails
    }
  };

  const loadTranslations = async (language: string) => {
    try {
      // Load translation dictionary
      const response = await fetch(`/dictionaries/${language}.json`);
      if (response.ok) {
        const dict = await response.json();
        setTranslations(dict);
        setCurrentLanguage(language);
      }
    } catch (err) {
      console.error('Failed to load translations:', err);
    }
  };

  const t = (key: string, fallback?: string) => {
    return translations[key] || fallback || key;
  };

  return {
    currentLanguage,
    setCurrentLanguage,
    translateContent,
    loadTranslations,
    t
  };
}

// AI Integration Hook
export function useAI() {
  const { apiCall } = useContentAPI();

  const generateContent = async (type: 'exercise' | 'assessment' | 'content', prompt: string, context?: any) => {
    try {
      const data = await apiCall('generate', {
        method: 'POST',
        body: JSON.stringify({
          type,
          prompt,
          context
        })
      });
      return data.generated;
    } catch (err) {
      console.error('AI generation failed:', err);
      return null;
    }
  };

  const enhanceContent = async (content: string, enhancementType: 'clarity' | 'engagement' | 'accessibility') => {
    try {
      const data = await apiCall('generate', {
        method: 'POST',
        body: JSON.stringify({
          type: 'enhancement',
          prompt: `Enhance this content for ${enhancementType}: ${content}`,
          context: { enhancementType }
        })
      });
      return data.generated;
    } catch (err) {
      console.error('Content enhancement failed:', err);
      return content;
    }
  };

  const suggestExercises = async (moduleContent: string, learningObjectives: string[]) => {
    try {
      const data = await apiCall('generate', {
        method: 'POST',
        body: JSON.stringify({
          type: 'exercise',
          prompt: `Create interactive exercises for these learning objectives: ${learningObjectives.join(', ')}`,
          context: { moduleContent, learningObjectives }
        })
      });
      return data.generated;
    } catch (err) {
      console.error('Exercise suggestion failed:', err);
      return null;
    }
  };

  return {
    generateContent,
    enhanceContent,
    suggestExercises
  };
}

// Content Validation Hook
export function useContentValidation() {
  const { apiCall } = useContentAPI();

  const validateContent = async (content: string, type: 'module' | 'exercise' | 'assessment') => {
    try {
      const data = await apiCall('validate', {
        method: 'POST',
        body: JSON.stringify({
          content,
          type
        })
      });
      return data.validation;
    } catch (err) {
      console.error('Content validation failed:', err);
      return {
        isValid: false,
        errors: ['Validation service unavailable'],
        warnings: [],
        suggestions: []
      };
    }
  };

  return { validateContent };
}

// Build System Hook
export function useBuildSystem() {
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success' | 'error'>('idle');
  const [buildLog, setBuildLog] = useState<string[]>([]);

  const buildSite = async (options: {
    language?: string;
    modules?: string[];
    outputFormat?: 'html' | 'pdf' | 'epub';
  } = {}) => {
    setBuildStatus('building');
    setBuildLog(['Starting build process...']);

    try {
      // Simulate build process
      const steps = [
        'Loading module content...',
        'Processing markdown files...',
        'Generating HTML pages...',
        'Optimizing assets...',
        'Creating navigation...',
        'Building search index...',
        'Finalizing build...'
      ];

      for (const step of steps) {
        setBuildLog(prev => [...prev, step]);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate work
      }

      setBuildStatus('success');
      setBuildLog(prev => [...prev, '✅ Build completed successfully!']);
      
      return {
        success: true,
        outputPath: `/build/${options.language || 'en'}`,
        generatedFiles: 27, // Number of modules
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      setBuildStatus('error');
      setBuildLog(prev => [...prev, `❌ Build failed: ${error}`]);
      throw error;
    }
  };

  const generateStaticSite = async (language: string = 'en') => {
    return buildSite({ language, outputFormat: 'html' });
  };

  const exportToPDF = async (moduleIds?: string[]) => {
    return buildSite({ modules: moduleIds, outputFormat: 'pdf' });
  };

  return {
    buildStatus,
    buildLog,
    buildSite,
    generateStaticSite,
    exportToPDF
  };
}

// Progress Tracking Hook
export function useProgress() {
  const [progress, setProgress] = useState<Record<string, number>>({});

  const updateProgress = (moduleId: string, percentage: number) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: Math.max(0, Math.min(100, percentage))
    }));
    
    // Persist to localStorage
    localStorage.setItem('facilitator-progress', JSON.stringify(progress));
  };

  const getProgress = (moduleId: string) => {
    return progress[moduleId] || 0;
  };

  const markComplete = (moduleId: string) => {
    updateProgress(moduleId, 100);
  };

  const resetProgress = (moduleId?: string) => {
    if (moduleId) {
      setProgress(prev => ({ ...prev, [moduleId]: 0 }));
    } else {
      setProgress({});
      localStorage.removeItem('facilitator-progress');
    }
  };

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('facilitator-progress');
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to load progress:', err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    progress,
    updateProgress,
    getProgress,
    markComplete,
    resetProgress
  };
}

// Content Management utilities
export const ContentUtils = {
  // Generate table of contents from module content
  generateTOC: (content: string) => {
    const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
    return headings.map(heading => {
      const level = heading.match(/^#+/)?.[0].length || 1;
      const text = heading.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return { level, text, id };
    });
  },

  // Extract reading time estimate
  estimateReadingTime: (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  },

  // Generate module preview
  generatePreview: (content: string, maxLength: number = 200) => {
    const stripped = content.replace(/[#*_`]/g, '').trim();
    return stripped.length > maxLength 
      ? stripped.substring(0, maxLength) + '...'
      : stripped;
  },

  // Validate module structure
  validateModuleStructure: (content: string) => {
    const requiredSections = [
      'Learning Objectives',
      'Prerequisites',
      'Duration',
      'Difficulty'
    ];
    
    const missing = requiredSections.filter(section => 
      !content.includes(section)
    );
    
    return {
      isValid: missing.length === 0,
      missingSections: missing
    };
  }
};

const hooks = {
  useContentAPI,
  useModules,
  useTranslation,
  useAI,
  useContentValidation,
  useBuildSystem,
  useProgress,
  ContentUtils
};

export default hooks;
