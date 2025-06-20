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

    // Store session in D1 database
    await c.env.DB.prepare(`
      INSERT INTO collaboration_sessions 
      (id, module_id, session_name, host_id, host_name, max_participants, status)
      VALUES (?, ?, ?, ?, ?, ?, 'active')
    `).bind(sessionId, module_id, session_name, user.sub, user.name, max_participants).run();

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

// Join collaboration session
app.post('/sessions/:sessionId/join', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const user = { sub: 'user123', name: 'Test User', email: 'test@example.com' };

    // Check if session exists
    const session = await c.env.DB.prepare(`
      SELECT * FROM collaboration_sessions WHERE id = ? AND status = 'active'
    `).bind(sessionId).first();

    if (!session) {
      return c.json({ error: 'Session not found or inactive' }, 404);
    }

    return c.json({
      success: true,
      message: 'Successfully joined session',
      sessionId
    });
  } catch (error) {
    console.error('Error joining session:', error);
    return c.json({ error: 'Failed to join session' }, 500);
  }
});

// Get session info
app.get('/sessions/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');

    const session = await c.env.DB.prepare(`
      SELECT * FROM collaboration_sessions WHERE id = ?
    `).bind(sessionId).first();

    if (!session) {
      return c.json({ error: 'Session not found' }, 404);
    }

    return c.json({
      success: true,
      data: session
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    return c.json({ error: 'Failed to fetch session' }, 500);
  }
});

// WebSocket placeholder
app.get('/sessions/:sessionId/ws', async (c) => {
  return c.json({ 
    error: 'WebSocket upgrade not implemented yet',
    message: 'Use Durable Objects for real-time collaboration'
  }, 501);
});

// End session
app.post('/sessions/:sessionId/end', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');

    await c.env.DB.prepare(`
      UPDATE collaboration_sessions 
      SET status = 'ended', ended_at = ?
      WHERE id = ?
    `).bind(new Date().toISOString(), sessionId).run();

    return c.json({
      success: true,
      message: 'Session ended successfully'
    });
  } catch (error) {
    console.error('Error ending session:', error);
    return c.json({ error: 'Failed to end session' }, 500);
  }
});

export { app as collaborationRoutes };
