export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [
    { slug: ['modules'] },
    { slug: ['tracks'] },
    { slug: ['navigation'] },
  ];
}

import { NextRequest, NextResponse } from 'next/server';
import { contentManager } from '../../../../lib/content';
import { Locale } from '../../../../lib/i18n';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const url = new URL(request.url);
    const lang = (url.searchParams.get('lang') || 'en') as Locale;
    
    // Handle different API endpoints
    if (slug[0] === 'modules') {
      if (slug.length === 1) {
        // GET /api/content/modules - Get all modules
        const modules = await contentManager.loadAllModules();
        return NextResponse.json({
          modules: modules.map(module => ({
            id: module.id,
            chapter: module.chapter,
            title: module.title,
            track: module.track,
            duration: module.duration,
            difficulty: module.difficulty,
            prerequisites: module.prerequisites,
            learningObjectives: module.learningObjectives
          }))
        });
      } else if (slug.length === 2) {
        // GET /api/content/modules/[id] - Get specific module
        const moduleId = slug[1];
        const moduleData = await contentManager.getModule(moduleId);
        
        if (!moduleData) {
          return NextResponse.json(
            { error: 'Module not found' },
            { status: 404 }
          );
        }
        
        return NextResponse.json({ module: moduleData });
      }
    } else if (slug[0] === 'tracks') {
      if (slug.length === 1) {
        // GET /api/content/tracks - Get all tracks
        const modules = await contentManager.loadAllModules();
        const tracks = Array.from(new Set(modules.map(m => m.track)));
        return NextResponse.json({ tracks });
      } else if (slug.length === 2) {
        // GET /api/content/tracks/[track] - Get modules by track
        const track = decodeURIComponent(slug[1]);
        const modules = await contentManager.getModulesByTrack(track);
        return NextResponse.json({ modules });
      }
    } else if (slug[0] === 'search') {
      // GET /api/content/search?q=query - Search modules
      const query = url.searchParams.get('q');
      if (!query) {
        return NextResponse.json(
          { error: 'Search query required' },
          { status: 400 }
        );
      }
      
      const results = await contentManager.searchModules(query);
      return NextResponse.json({ results });
    } else if (slug[0] === 'navigation') {
      // GET /api/content/navigation - Get navigation structure
      const navigation = await contentManager.generateNavigation();
      return NextResponse.json({ navigation });
    }
    
    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    
    if (slug[0] === 'generate') {
      // POST /api/content/generate - AI content generation
      return await handleAIGeneration(body);
    } else if (slug[0] === 'translate') {
      // POST /api/content/translate - Content translation
      return await handleTranslation(body);
    } else if (slug[0] === 'validate') {
      // POST /api/content/validate - Content validation
      return await handleValidation(body);
    }
    
    return NextResponse.json(
      { error: 'Endpoint not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleAIGeneration(body: any) {
  const { type, prompt, context } = body;
  
  // Simulate AI content generation (replace with actual AI service)
  const generatedContent: Record<string, any> = {
    'exercise': {
      title: 'Generated Exercise',
      description: 'AI-generated creative exercise based on your prompt',
      duration: '15 minutes',
      materials: ['Paper', 'Pens', 'Sticky notes'],
      steps: [
        'Gather materials',
        'Set timer for 5 minutes',
        'Brainstorm ideas',
        'Select top 3 ideas',
        'Develop chosen concept'
      ]
    },
    'assessment': {
      title: 'Generated Assessment',
      questions: [
        'What was the most challenging part of this exercise?',
        'How did this activity change your perspective?',
        'What would you do differently next time?'
      ],
      rubric: {
        'Creativity': 'Shows original thinking and novel approaches',
        'Collaboration': 'Works effectively with others',
        'Reflection': 'Demonstrates thoughtful self-assessment'
      }
    },
    'content': {
      title: 'Generated Content Section',
      content: `# AI-Generated Content\n\nBased on your prompt: "${prompt}"\n\nThis is sample generated content that would be created by an AI service based on the facilitator guide context and educational best practices.`
    }
  };
  
  return NextResponse.json({
    generated: generatedContent[type] || generatedContent.content,
    metadata: {
      timestamp: new Date().toISOString(),
      type,
      prompt: prompt.substring(0, 100) + '...'
    }
  });
}

async function handleTranslation(body: any) {
  const { content, targetLanguage, sourceLanguage = 'en' } = body;
  
  // Simulate translation (replace with actual translation service)
  const translations: Record<string, Record<string, string>> = {
    'es': {
      'Creative Confidence': 'Confianza Creativa',
      'Learning Objectives': 'Objetivos de Aprendizaje',
      'Prerequisites': 'Requisitos Previos',
      'Duration': 'Duración',
      'Difficulty': 'Dificultad',
      'Beginner': 'Principiante',
      'Intermediate': 'Intermedio',
      'Advanced': 'Avanzado'
    },
    'fr': {
      'Creative Confidence': 'Confiance Créative',
      'Learning Objectives': 'Objectifs d\'Apprentissage',
      'Prerequisites': 'Prérequis',
      'Duration': 'Durée',
      'Difficulty': 'Difficulté',
      'Beginner': 'Débutant',
      'Intermediate': 'Intermédiaire',
      'Advanced': 'Avancé'
    }
  };
  
  const translatedContent = content.replace(
    /Creative Confidence|Learning Objectives|Prerequisites|Duration|Difficulty|Beginner|Intermediate|Advanced/g,
    (match: string) => translations[targetLanguage]?.[match] || match
  );
  
  return NextResponse.json({
    translatedContent,
    metadata: {
      sourceLanguage,
      targetLanguage,
      timestamp: new Date().toISOString(),
      confidence: 0.95
    }
  });
}

async function handleValidation(body: any) {
  const { content, type = 'module' } = body;
  
  const validation = {
    isValid: true,
    errors: [] as string[],
    warnings: [] as string[],
    suggestions: [] as string[]
  };
  
  // Basic content validation
  if (!content || content.trim().length === 0) {
    validation.isValid = false;
    validation.errors.push('Content cannot be empty');
  }
  
  if (type === 'module') {
    // Module-specific validation
    if (!content.includes('# ')) {
      validation.warnings.push('Module should have a main title (# Title)');
    }
    
    if (!content.includes('## Learning Objectives')) {
      validation.warnings.push('Module should include learning objectives section');
    }
    
    if (content.length < 500) {
      validation.suggestions.push('Consider expanding content for better educational value');
    }
    
    if (!content.includes('**Duration:**')) {
      validation.suggestions.push('Consider adding duration information');
    }
  }
  
  return NextResponse.json({ validation });
}
