// Collaboration routes for Cloudflare Worker - Simplified Version
import { Hono } from 'hono';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Simple auth middleware for collaboration routes
app.use('*', async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return c.json({ error: 'Authorization required' }, 401);
  }
  await next();
});

// Create collaboration session
app.post('/sessions', async (c) => {
  try {
    const user = { sub: 'user123', name: 'Test User', email: 'test@example.com' };
    const { module_id, session_name, max_participants = 10 } = await c.req.json();

    if (!module_id || !session_name) {
      return c.json({ error: 'Module ID and session name are required' }, 400);
    }

    const sessionId = crypto.randomUUID();

    return c.json({
      success: true,
      data: {
        sessionId,
        moduleId: module_id,
        sessionName: session_name,
        hostId: user.sub,
        hostName: user.name,
        maxParticipants: max_participants,
        status: 'active',
        participants: [],
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error creating collaboration session:', error);
    return c.json({ error: 'Failed to create session' }, 500);
  }
});

// Get session info
app.get('/sessions/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');

    return c.json({
      success: true,
      data: {
        sessionId,
        status: 'active',
        participants: []
      }
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return c.json({ error: 'Failed to fetch session' }, 500);
  }
});

export { app as collaborationRoutes };
