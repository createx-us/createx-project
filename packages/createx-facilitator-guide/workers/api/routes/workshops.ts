// Workshop management routes for Cloudflare Worker
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { jwt } from 'hono/jwt';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Middleware for authentication
app.use('*', jwt({
  secret: "placeholder-jwt-secret" // This will be overridden at runtime
}));

// Get all workshops with filtering
app.get('/', async (c) => {
  try {
    const url = new URL(c.req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const status = url.searchParams.get('status');
    const facilitator_id = url.searchParams.get('facilitator_id');
    
    const offset = (page - 1) * limit;
    
    // Build query conditions
    const conditions = [];
    const params = [];

    if (status) {
      conditions.push('w.status = ?');
      params.push(status);
    }

    if (facilitator_id) {
      conditions.push('w.facilitator_id = ?');
      params.push(facilitator_id);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get workshops with facilitator and participant count
    const workshopsStmt = c.env.DB.prepare(`
      SELECT 
        w.*,
        u.name as facilitator_name,
        u.email as facilitator_email,
        COUNT(wp.user_id) as participant_count
      FROM workshops w
      LEFT JOIN users u ON w.facilitator_id = u.id
      LEFT JOIN workshop_participants wp ON w.id = wp.workshop_id
      ${whereClause}
      GROUP BY w.id
      ORDER BY w.start_date DESC
      LIMIT ? OFFSET ?
    `);

    const result = await workshopsStmt.bind(...params, limit, offset).all();
    
    const workshops = result.results.map((workshop: any) => ({
      ...workshop,
      settings: workshop.settings ? JSON.parse(workshop.settings) : {},
      participant_count: Number(workshop.participant_count)
    }));

    // Get total count
    const countStmt = c.env.DB.prepare(`
      SELECT COUNT(*) as total FROM workshops w ${whereClause}
    `);
    const countResult = await countStmt.bind(...params).first() as any;
    const total = Number(countResult?.total || 0);

    return c.json({
      workshops,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return c.json({ error: 'Failed to fetch workshops' }, 500);
  }
});

// Get workshop by ID
app.get('/:id', async (c) => {
  try {
    const workshopId = c.req.param('id');
    
    // Get workshop details
    const workshopStmt = c.env.DB.prepare(`
      SELECT 
        w.*,
        u.name as facilitator_name,
        u.email as facilitator_email,
        m.title as module_title,
        m.slug as module_slug
      FROM workshops w
      LEFT JOIN users u ON w.facilitator_id = u.id
      LEFT JOIN modules m ON w.module_id = m.id
      WHERE w.id = ?
    `);
    const workshop = await workshopStmt.bind(workshopId).first() as any;
    
    if (!workshop) {
      return c.json({ error: 'Workshop not found' }, 404);
    }

    // Get participants
    const participantsStmt = c.env.DB.prepare(`
      SELECT 
        wp.id,
        wp.status,
        wp.joined_at,
        u.name,
        u.email
      FROM workshop_participants wp
      JOIN users u ON wp.user_id = u.id
      WHERE wp.workshop_id = ?
      ORDER BY wp.joined_at
    `);
    const participantsResult = await participantsStmt.bind(workshopId).all();

    return c.json({
      ...workshop,
      settings: workshop.settings ? JSON.parse(workshop.settings) : {},
      participants: participantsResult.results
    });
  } catch (error) {
    console.error('Error fetching workshop:', error);
    return c.json({ error: 'Failed to fetch workshop' }, 500);
  }
});

// Create new workshop
app.post('/',
  validator('json', (value, c) => {
    if (!value.title || !value.start_date || !value.end_date) {
      return c.json({ error: 'Title, start_date, and end_date are required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const payload = c.get('jwtPayload');
      const data = await c.req.json();
      
      // Create workshop
      const createStmt = c.env.DB.prepare(`
        INSERT INTO workshops (
          title, description, facilitator_id, module_id,
          start_date, end_date, max_participants, status,
          settings, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `);

      const result = await createStmt.bind(
        data.title,
        data.description || '',
        data.facilitator_id || payload.sub,
        data.module_id || null,
        data.start_date,
        data.end_date,
        data.max_participants || 50,
        data.status || 'scheduled',
        JSON.stringify(data.settings || {})
      ).run();

      const workshopId = result.meta.last_row_id;

      // Log to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['workshop_created', data.title, data.status || 'scheduled'],
        doubles: [Date.now()],
        indexes: ['workshops']
      });

      return c.json({ 
        success: true, 
        workshopId,
        title: data.title 
      }, 201);
    } catch (error) {
      console.error('Error creating workshop:', error);
      return c.json({ error: 'Failed to create workshop' }, 500);
    }
  }
);

// Update workshop
app.put('/:id',
  validator('json', (value, c) => {
    const allowedFields = ['title', 'description', 'start_date', 'end_date', 'max_participants', 'status', 'settings'];
    const hasValidFields = Object.keys(value).some(key => allowedFields.includes(key));
    if (!hasValidFields) {
      return c.json({ error: 'No valid fields to update' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const workshopId = c.req.param('id');
      const payload = c.get('jwtPayload');
      const data = await c.req.json();

      // Check if workshop exists and user has permission
      const existingStmt = c.env.DB.prepare(`
        SELECT facilitator_id FROM workshops WHERE id = ?
      `);
      const existing = await existingStmt.bind(workshopId).first() as any;
      
      if (!existing) {
        return c.json({ error: 'Workshop not found' }, 404);
      }

      // Check permissions (facilitator or admin)
      if (existing.facilitator_id !== payload.sub && payload.role !== 'admin') {
        return c.json({ error: 'Insufficient permissions' }, 403);
      }

      // Build update query
      const updates = [];
      const values = [];

      if (data.title) {
        updates.push('title = ?');
        values.push(data.title);
      }
      if (data.description !== undefined) {
        updates.push('description = ?');
        values.push(data.description);
      }
      if (data.start_date) {
        updates.push('start_date = ?');
        values.push(data.start_date);
      }
      if (data.end_date) {
        updates.push('end_date = ?');
        values.push(data.end_date);
      }
      if (data.max_participants) {
        updates.push('max_participants = ?');
        values.push(data.max_participants);
      }
      if (data.status) {
        updates.push('status = ?');
        values.push(data.status);
      }
      if (data.settings) {
        updates.push('settings = ?');
        values.push(JSON.stringify(data.settings));
      }

      updates.push('updated_at = datetime(\'now\')');
      values.push(workshopId);

      const updateStmt = c.env.DB.prepare(`
        UPDATE workshops SET ${updates.join(', ')} WHERE id = ?
      `);

      await updateStmt.bind(...values).run();

      // Log to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['workshop_updated', workshopId, data.status || 'unknown'],
        doubles: [Date.now()],
        indexes: ['workshops']
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating workshop:', error);
      return c.json({ error: 'Failed to update workshop' }, 500);
    }
  }
);

// Join workshop
app.post('/:id/join', async (c) => {
  try {
    const workshopId = c.req.param('id');
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    // Check if workshop exists and is joinable
    const workshopStmt = c.env.DB.prepare(`
      SELECT 
        w.*,
        COUNT(wp.user_id) as current_participants
      FROM workshops w
      LEFT JOIN workshop_participants wp ON w.id = wp.workshop_id
      WHERE w.id = ?
      GROUP BY w.id
    `);
    const workshop = await workshopStmt.bind(workshopId).first() as any;
    
    if (!workshop) {
      return c.json({ error: 'Workshop not found' }, 404);
    }

    if (workshop.status !== 'scheduled' && workshop.status !== 'open') {
      return c.json({ error: 'Workshop is not open for registration' }, 400);
    }

    if (Number(workshop.current_participants) >= Number(workshop.max_participants)) {
      return c.json({ error: 'Workshop is full' }, 400);
    }

    // Check if already joined
    const existingStmt = c.env.DB.prepare(`
      SELECT id FROM workshop_participants WHERE workshop_id = ? AND user_id = ?
    `);
    const existing = await existingStmt.bind(workshopId, userId).first() as any;
    
    if (existing) {
      return c.json({ error: 'Already joined this workshop' }, 409);
    }

    // Join workshop
    const joinStmt = c.env.DB.prepare(`
      INSERT INTO workshop_participants (
        workshop_id, user_id, status, joined_at
      ) VALUES (?, ?, 'registered', datetime('now'))
    `);

    await joinStmt.bind(workshopId, userId).run();

    // Log to analytics
    c.env.ANALYTICS.writeDataPoint({
      blobs: ['workshop_joined', workshopId, userId.toString()],
      doubles: [Date.now()],
      indexes: ['workshops']
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error joining workshop:', error);
    return c.json({ error: 'Failed to join workshop' }, 500);
  }
});

// Leave workshop
app.post('/:id/leave', async (c) => {
  try {
    const workshopId = c.req.param('id');
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    // Remove from workshop
    const leaveStmt = c.env.DB.prepare(`
      DELETE FROM workshop_participants 
      WHERE workshop_id = ? AND user_id = ?
    `);

    const result = await leaveStmt.bind(workshopId, userId).run() as any;

    if (result.changes === 0) {
      return c.json({ error: 'Not registered for this workshop' }, 404);
    }

    // Log to analytics
    c.env.ANALYTICS.writeDataPoint({
      blobs: ['workshop_left', workshopId, userId.toString()],
      doubles: [Date.now()],
      indexes: ['workshops']
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error leaving workshop:', error);
    return c.json({ error: 'Failed to leave workshop' }, 500);
  }
});

// Get user's workshops
app.get('/user/my-workshops', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    const workshopsStmt = c.env.DB.prepare(`
      SELECT 
        w.*,
        wp.status as participation_status,
        wp.joined_at,
        u.name as facilitator_name
      FROM workshop_participants wp
      JOIN workshops w ON wp.workshop_id = w.id
      LEFT JOIN users u ON w.facilitator_id = u.id
      WHERE wp.user_id = ?
      ORDER BY w.start_date DESC
    `);

    const result = await workshopsStmt.bind(userId).all();
    
    const workshops = result.results.map((workshop: any) => ({
      ...workshop,
      settings: workshop.settings ? JSON.parse(workshop.settings) : {}
    }));

    return c.json({ workshops });
  } catch (error) {
    console.error('Error fetching user workshops:', error);
    return c.json({ error: 'Failed to fetch user workshops' }, 500);
  }
});

export { app as workshopRoutes };
