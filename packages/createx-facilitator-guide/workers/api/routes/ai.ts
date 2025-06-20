// AI Content Generation routes for Cloudflare Worker
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// AI Content Generation Templates
const GENERATION_PROMPTS = {
  module_outline: `Create a comprehensive learning module outline for: "{topic}"
    
    Context: This is for the CreateX Facilitator Guide, focusing on entrepreneurship education and innovation training.
    
    Please provide:
    1. Module title and description
    2. Learning objectives (3-5 clear, measurable outcomes)
    3. Content sections with titles and brief descriptions
    4. Estimated duration for each section
    5. Interactive activities and exercises
    6. Assessment methods
    7. Key resources and materials needed
    
    Target audience: Facilitators teaching entrepreneurship and innovation
    Difficulty level: {difficulty}
    Total duration: {duration} minutes`,

  lesson_content: `Generate detailed lesson content for the section: "{section_title}"
    
    Module context: {module_context}
    Section description: {section_description}
    Learning objectives: {objectives}
    Duration: {duration} minutes
    
    Please include:
    1. Opening hook/engagement activity (5 minutes)
    2. Main content delivery with clear structure
    3. Interactive elements and group activities
    4. Real-world examples and case studies
    5. Reflection questions
    6. Closing summary and key takeaways
    7. Materials needed
    8. Facilitator notes and tips
    
    Format as structured content suitable for facilitator delivery.`,

  assessment: `Create assessment materials for: "{topic}"
    
    Learning objectives:
    {objectives}
    
    Please provide:
    1. Pre-assessment questions (5 multiple choice)
    2. Formative assessment activities during learning
    3. Final assessment with varied question types
    4. Rubric for evaluating practical exercises
    5. Self-reflection prompts for learners
    6. Peer assessment guidelines
    
    Ensure assessments align with learning objectives and entrepreneurship focus.`,

  activity: `Design an interactive learning activity for: "{topic}"
    
    Context: {context}
    Duration: {duration} minutes
    Group size: {group_size}
    
    Please include:
    1. Activity title and brief description
    2. Clear objectives
    3. Step-by-step instructions for facilitator
    4. Materials needed
    5. Group formation and roles
    6. Time breakdown for each phase
    7. Debrief questions and discussion points
    8. Variations for different group sizes
    9. Common challenges and solutions
    
    Focus on hands-on, engaging activities that promote entrepreneurial thinking.`
};

// Generate module outline
app.post('/generate/module-outline',
  validator('json', (value, c) => {
    if (!value.topic) {
      return c.json({ error: 'Topic is required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { topic, difficulty = 'intermediate', duration = 120 } = await c.req.json();
      
      const prompt = GENERATION_PROMPTS.module_outline
        .replace('{topic}', topic)
        .replace('{difficulty}', difficulty)
        .replace('{duration}', duration.toString());

      // Generate content using Cloudflare AI
      const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are an expert educational content designer specializing in entrepreneurship and innovation training. Create structured, practical content for facilitators.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048
      });

      // Log usage to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['ai_generation', 'module_outline', topic],
        doubles: [Date.now(), prompt.length, response.response?.length || 0],
        indexes: ['ai']
      });

      return c.json({
        success: true,
        content: response.response,
        metadata: {
          topic,
          difficulty,
          duration,
          generated_at: new Date().toISOString(),
          model: '@cf/meta/llama-3.1-8b-instruct'
        }
      });
    } catch (error) {
      console.error('Error generating module outline:', error);
      return c.json({ error: 'Failed to generate module outline' }, 500);
    }
  }
);

// Generate lesson content
app.post('/generate/lesson-content',
  validator('json', (value, c) => {
    if (!value.section_title || !value.module_context) {
      return c.json({ error: 'Section title and module context are required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { 
        section_title, 
        module_context, 
        section_description = '', 
        objectives = '',
        duration = 30 
      } = await c.req.json();
      
      const prompt = GENERATION_PROMPTS.lesson_content
        .replace('{section_title}', section_title)
        .replace('{module_context}', module_context)
        .replace('{section_description}', section_description)
        .replace('{objectives}', objectives)
        .replace('{duration}', duration.toString());

      const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are an expert curriculum developer creating detailed lesson content for entrepreneurship facilitators. Focus on practical, engaging content with clear structure.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 3048
      });

      // Cache the generated content
      const cacheKey = `ai:lesson:${Buffer.from(section_title).toString('base64')}`;
      await c.env.CACHE_KV.put(cacheKey, JSON.stringify(response), { expirationTtl: 86400 });

      // Log usage
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['ai_generation', 'lesson_content', section_title],
        doubles: [Date.now(), prompt.length, response.response?.length || 0],
        indexes: ['ai']
      });

      return c.json({
        success: true,
        content: response.response,
        metadata: {
          section_title,
          duration,
          generated_at: new Date().toISOString(),
          model: '@cf/meta/llama-3.1-8b-instruct'
        }
      });
    } catch (error) {
      console.error('Error generating lesson content:', error);
      return c.json({ error: 'Failed to generate lesson content' }, 500);
    }
  }
);

// Generate assessment materials
app.post('/generate/assessment',
  validator('json', (value, c) => {
    if (!value.topic || !value.objectives) {
      return c.json({ error: 'Topic and learning objectives are required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { topic, objectives } = await c.req.json();
      
      const prompt = GENERATION_PROMPTS.assessment
        .replace('{topic}', topic)
        .replace('{objectives}', Array.isArray(objectives) ? objectives.join('\n') : objectives);

      const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are an assessment design expert creating comprehensive evaluation materials for entrepreneurship education. Ensure assessments are practical and objective-aligned.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048
      });

      // Log usage
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['ai_generation', 'assessment', topic],
        doubles: [Date.now(), prompt.length, response.response?.length || 0],
        indexes: ['ai']
      });

      return c.json({
        success: true,
        content: response.response,
        metadata: {
          topic,
          objectives: Array.isArray(objectives) ? objectives : [objectives],
          generated_at: new Date().toISOString(),
          model: '@cf/meta/llama-3.1-8b-instruct'
        }
      });
    } catch (error) {
      console.error('Error generating assessment:', error);
      return c.json({ error: 'Failed to generate assessment' }, 500);
    }
  }
);

// Generate interactive activity
app.post('/generate/activity',
  validator('json', (value, c) => {
    if (!value.topic) {
      return c.json({ error: 'Topic is required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { 
        topic, 
        context = '', 
        duration = 20, 
        group_size = '4-6 participants' 
      } = await c.req.json();
      
      const prompt = GENERATION_PROMPTS.activity
        .replace('{topic}', topic)
        .replace('{context}', context)
        .replace('{duration}', duration.toString())
        .replace('{group_size}', group_size);

      const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are an experiential learning designer creating engaging activities for entrepreneurship education. Focus on hands-on, collaborative exercises that build practical skills.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048
      });

      // Log usage
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['ai_generation', 'activity', topic],
        doubles: [Date.now(), prompt.length, response.response?.length || 0],
        indexes: ['ai']
      });

      return c.json({
        success: true,
        content: response.response,
        metadata: {
          topic,
          context,
          duration,
          group_size,
          generated_at: new Date().toISOString(),
          model: '@cf/meta/llama-3.1-8b-instruct'
        }
      });
    } catch (error) {
      console.error('Error generating activity:', error);
      return c.json({ error: 'Failed to generate activity' }, 500);
    }
  }
);

// Content enhancement and optimization
app.post('/enhance/content',
  validator('json', (value, c) => {
    if (!value.content || !value.enhancement_type) {
      return c.json({ error: 'Content and enhancement type are required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { content, enhancement_type, context = '' } = await c.req.json();
      
      const prompts = {
        clarity: `Improve the clarity and readability of this educational content while maintaining its educational value:\n\n${content}\n\nContext: ${context}`,
        engagement: `Make this educational content more engaging and interactive for facilitators:\n\n${content}\n\nContext: ${context}`,
        structure: `Improve the structure and organization of this educational content:\n\n${content}\n\nContext: ${context}`,
        accessibility: `Make this educational content more accessible and inclusive:\n\n${content}\n\nContext: ${context}`
      };

      const prompt = prompts[enhancement_type as keyof typeof prompts];
      if (!prompt) {
        return c.json({ error: 'Invalid enhancement type' }, 400);
      }

      const response = await c.env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
        messages: [
          {
            role: 'system',
            content: 'You are an educational content editor specializing in entrepreneurship training materials. Enhance content while preserving its core educational objectives.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2048
      });

      // Log usage
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['ai_enhancement', enhancement_type, 'content'],
        doubles: [Date.now(), content.length, response.response?.length || 0],
        indexes: ['ai']
      });

      return c.json({
        success: true,
        enhanced_content: response.response,
        original_content: content,
        enhancement_type,
        metadata: {
          enhanced_at: new Date().toISOString(),
          model: '@cf/meta/llama-3.1-8b-instruct'
        }
      });
    } catch (error) {
      console.error('Error enhancing content:', error);
      return c.json({ error: 'Failed to enhance content' }, 500);
    }
  }
);

// Get AI usage statistics
app.get('/usage', async (c) => {
  try {
    // This would typically query analytics data
    // For now, return placeholder statistics
    const stats = {
      total_generations: 0,
      generations_today: 0,
      most_popular_type: 'module_outline',
      average_response_length: 1500,
      models_used: ['@cf/meta/llama-3.1-8b-instruct'],
      last_updated: new Date().toISOString()
    };

    return c.json(stats);
  } catch (error) {
    console.error('Error fetching AI usage:', error);
    return c.json({ error: 'Failed to fetch usage statistics' }, 500);
  }
});

export { app as aiRoutes };
