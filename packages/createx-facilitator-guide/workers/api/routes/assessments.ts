// Assessment routes for Cloudflare Worker
import { Hono } from 'hono';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Get assessments for a module
app.get('/module/:moduleId', async (c) => {
  try {
    const moduleId = c.req.param('moduleId');
    
    const stmt = c.env.DB.prepare(`
      SELECT * FROM assessments WHERE module_id = ? ORDER BY created_at ASC
    `);
    const result = await stmt.bind(moduleId).all();
    
    const assessments = result.results.map((assessment: any) => ({
      ...assessment,
      questions: assessment.questions ? JSON.parse(assessment.questions) : [],
      settings: assessment.settings ? JSON.parse(assessment.settings) : {}
    }));

    return c.json({ assessments });
  } catch (error) {
    console.error('Error fetching assessments:', error);
    return c.json({ error: 'Failed to fetch assessments' }, 500);
  }
});

// Submit assessment response
app.post('/:id/submit', async (c) => {
  try {
    const assessmentId = c.req.param('id');
    const data = await c.req.json();
    
    // Here you would validate and store the assessment response
    // For now, return a success response
    
    return c.json({ 
      success: true, 
      score: data.score || 0,
      submitted_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return c.json({ error: 'Failed to submit assessment' }, 500);
  }
});

export { app as assessmentRoutes };
