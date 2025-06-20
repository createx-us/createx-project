// Modules management routes for Cloudflare Worker
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Get all modules with filtering and pagination
app.get('/', async (c) => {
  try {
    const url = new URL(c.req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);
    const category = url.searchParams.get('category');
    const difficulty = url.searchParams.get('difficulty');
    const search = url.searchParams.get('search');
    const status = url.searchParams.get('status') || 'published';

    const offset = (page - 1) * limit;

    // Build query conditions
    const conditions = ['m.status = ?'];
    const params = [status];

    if (category) {
      conditions.push('m.category = ?');
      params.push(category);
    }

    if (difficulty) {
      conditions.push('m.difficulty = ?');
      params.push(difficulty);
    }

    if (search) {
      conditions.push('(m.title LIKE ? OR m.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countStmt = c.env.DB.prepare(`
      SELECT COUNT(*) as total
      FROM modules m
      ${whereClause}
    `);
    const countResult = await countStmt.bind(...params).first() as any;
    const total = Number(countResult?.total || 0);

    // Get modules with content count
    const modulesStmt = c.env.DB.prepare(`
      SELECT 
        m.id,
        m.title,
        m.slug,
        m.description,
        m.difficulty,
        m.duration,
        m.category,
        m.tags,
        m.status,
        m.created_at,
        m.updated_at,
        COUNT(mc.id) as content_sections
      FROM modules m
      LEFT JOIN module_content mc ON m.id = mc.module_id
      ${whereClause}
      GROUP BY m.id
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `);

    const result = await modulesStmt.bind(...params, limit, offset).all();
    
    const modules = result.results.map((row: any) => ({
      ...row,
      tags: row.tags ? JSON.parse(row.tags) : [],
      content_sections: Number(row.content_sections)
    }));

    return c.json({
      modules,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        category,
        difficulty,
        search,
        status
      }
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    return c.json({ error: 'Failed to fetch modules' }, 500);
  }
});

// Get module by ID with full content
app.get('/:id', async (c) => {
  try {
    const moduleId = c.req.param('id');
    
    // Get module details
    const moduleStmt = c.env.DB.prepare(`
      SELECT * FROM modules WHERE id = ?
    `);
    const module = await moduleStmt.bind(moduleId).first() as any;
    
    if (!module) {
      return c.json({ error: 'Module not found' }, 404);
    }

    // Get module content sections
    const contentStmt = c.env.DB.prepare(`
      SELECT * FROM module_content 
      WHERE module_id = ? 
      ORDER BY sort_order ASC
    `);
    const contentResult = await contentStmt.bind(moduleId).all();
    
    const sections = contentResult.results.map((section: any) => ({
      id: section.id,
      module_id: section.module_id,
      title: section.title,
      slug: section.slug,
      content_type: section.content_type,
      sort_order: section.sort_order,
      created_at: section.created_at,
      updated_at: section.updated_at,
      content: JSON.parse(section.content),
      metadata: section.metadata ? JSON.parse(section.metadata) : {}
    }));

    // Get learning objectives
    const objectivesStmt = c.env.DB.prepare(`
      SELECT * FROM learning_objectives 
      WHERE module_id = ? 
      ORDER BY sort_order ASC
    `);
    const objectivesResult = await objectivesStmt.bind(moduleId).all();

    // Get assessments
    const assessmentsStmt = c.env.DB.prepare(`
      SELECT id, title, type, description 
      FROM assessments 
      WHERE module_id = ?
    `);
    const assessmentsResult = await assessmentsStmt.bind(moduleId).all();

    return c.json({
      ...module,
      tags: module.tags ? JSON.parse(module.tags) : [],
      metadata: module.metadata ? JSON.parse(module.metadata) : {},
      sections,
      learning_objectives: objectivesResult.results,
      assessments: assessmentsResult.results
    });
  } catch (error) {
    console.error('Error fetching module:', error);
    return c.json({ error: 'Failed to fetch module' }, 500);
  }
});

// Create new module
app.post('/',
  validator('json', (value, c) => {
    if (!value.title || !value.slug) {
      return c.json({ error: 'Title and slug are required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const data = await c.req.json();
      
      // Check if slug already exists
      const existingStmt = c.env.DB.prepare(`
        SELECT id FROM modules WHERE slug = ?
      `);
      const existing = await existingStmt.bind(data.slug).first();
      
      if (existing) {
        return c.json({ error: 'Slug already exists' }, 409);
      }

      // Create module
      const createStmt = c.env.DB.prepare(`
        INSERT INTO modules (
          title, slug, description, difficulty, duration, 
          category, tags, status, metadata, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `);

      const result = await createStmt.bind(
        data.title,
        data.slug,
        data.description || '',
        data.difficulty || 'beginner',
        data.duration || 60,
        data.category || 'general',
        JSON.stringify(data.tags || []),
        data.status || 'draft',
        JSON.stringify(data.metadata || {})
      ).run();

      const moduleId = result.meta.last_row_id;

      // Create learning objectives if provided
      if (data.learning_objectives && Array.isArray(data.learning_objectives)) {
        for (let i = 0; i < data.learning_objectives.length; i++) {
          const objective = data.learning_objectives[i];
          const objectiveStmt = c.env.DB.prepare(`
            INSERT INTO learning_objectives (
              module_id, objective_text, sort_order, created_at
            ) VALUES (?, ?, ?, datetime('now'))
          `);
          await objectiveStmt.bind(moduleId, objective, i).run();
        }
      }

      // Log to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['module_created', data.slug, data.category],
        doubles: [Date.now()],
        indexes: ['modules']
      });

      return c.json({ 
        success: true, 
        moduleId,
        slug: data.slug 
      }, 201);
    } catch (error) {
      console.error('Error creating module:', error);
      return c.json({ error: 'Failed to create module' }, 500);
    }
  }
);

// Update module
app.put('/:id',
  validator('json', (value, c) => {
    const allowedFields = ['title', 'description', 'difficulty', 'duration', 'category', 'tags', 'status', 'metadata'];
    const hasValidFields = Object.keys(value).some(key => allowedFields.includes(key));
    if (!hasValidFields) {
      return c.json({ error: 'No valid fields to update' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const moduleId = c.req.param('id');
      const data = await c.req.json();

      // Check if module exists
      const existingStmt = c.env.DB.prepare(`
        SELECT id, slug FROM modules WHERE id = ?
      `);
      const existing = await existingStmt.bind(moduleId).first() as any;
      
      if (!existing) {
        return c.json({ error: 'Module not found' }, 404);
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
      if (data.difficulty) {
        updates.push('difficulty = ?');
        values.push(data.difficulty);
      }
      if (data.duration) {
        updates.push('duration = ?');
        values.push(data.duration);
      }
      if (data.category) {
        updates.push('category = ?');
        values.push(data.category);
      }
      if (data.tags) {
        updates.push('tags = ?');
        values.push(JSON.stringify(data.tags));
      }
      if (data.status) {
        updates.push('status = ?');
        values.push(data.status);
      }
      if (data.metadata) {
        updates.push('metadata = ?');
        values.push(JSON.stringify(data.metadata));
      }

      updates.push('updated_at = datetime(\'now\')');
      values.push(moduleId);

      const updateStmt = c.env.DB.prepare(`
        UPDATE modules SET ${updates.join(', ')} WHERE id = ?
      `);

      await updateStmt.bind(...values).run();

      // Update learning objectives if provided
      if (data.learning_objectives && Array.isArray(data.learning_objectives)) {
        // Delete existing objectives
        const deleteObjectivesStmt = c.env.DB.prepare(`
          DELETE FROM learning_objectives WHERE module_id = ?
        `);
        await deleteObjectivesStmt.bind(moduleId).run();

        // Insert new objectives
        for (let i = 0; i < data.learning_objectives.length; i++) {
          const objective = data.learning_objectives[i];
          const objectiveStmt = c.env.DB.prepare(`
            INSERT INTO learning_objectives (
              module_id, objective_text, sort_order, created_at
            ) VALUES (?, ?, ?, datetime('now'))
          `);
          await objectiveStmt.bind(moduleId, objective, i).run();
        }
      }

      // Clear cache
      await c.env.CACHE_KV.delete(`module:${moduleId}`);
      await c.env.CACHE_KV.delete(`content:${existing.slug}`);

      // Log to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['module_updated', existing.slug, data.status || 'unknown'],
        doubles: [Date.now()],
        indexes: ['modules']
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating module:', error);
      return c.json({ error: 'Failed to update module' }, 500);
    }
  }
);

// Delete module
app.delete('/:id', async (c) => {
  try {
    const moduleId = c.req.param('id');

    // Get module info for logging
    const moduleStmt = c.env.DB.prepare(`
      SELECT slug FROM modules WHERE id = ?
    `);
    const module = await moduleStmt.bind(moduleId).first() as any;
    
    if (!module) {
      return c.json({ error: 'Module not found' }, 404);
    }

    // Delete related data (cascade)
    const deleteQueries = [
      'DELETE FROM learning_objectives WHERE module_id = ?',
      'DELETE FROM module_content WHERE module_id = ?',
      'DELETE FROM user_progress WHERE module_id = ?',
      'DELETE FROM assessments WHERE module_id = ?',
      'DELETE FROM modules WHERE id = ?'
    ];

    for (const query of deleteQueries) {
      const stmt = c.env.DB.prepare(query);
      await stmt.bind(moduleId).run();
    }

    // Clear cache
    await c.env.CACHE_KV.delete(`module:${moduleId}`);
    await c.env.CACHE_KV.delete(`content:${module.slug}`);

    // Log to analytics
    c.env.ANALYTICS.writeDataPoint({
      blobs: ['module_deleted', module.slug],
      doubles: [Date.now()],
      indexes: ['modules']
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting module:', error);
    return c.json({ error: 'Failed to delete module' }, 500);
  }
});

// Get module statistics
app.get('/:id/stats', async (c) => {
  try {
    const moduleId = c.req.param('id');

    // Get basic stats
    const statsStmt = c.env.DB.prepare(`
      SELECT 
        COUNT(DISTINCT up.user_id) as enrolled_users,
        COUNT(CASE WHEN up.status = 'completed' THEN 1 END) as completed_users,
        AVG(up.progress_percentage) as avg_progress,
        COUNT(DISTINCT mc.id) as content_sections,
        COUNT(DISTINCT a.id) as assessments
      FROM modules m
      LEFT JOIN user_progress up ON m.id = up.module_id
      LEFT JOIN module_content mc ON m.id = mc.module_id
      LEFT JOIN assessments a ON m.id = a.module_id
      WHERE m.id = ?
      GROUP BY m.id
    `);

    const stats = await statsStmt.bind(moduleId).first() as any;

    if (!stats) {
      return c.json({ error: 'Module not found' }, 404);
    }

    return c.json({
      enrolled_users: Number(stats.enrolled_users || 0),
      completed_users: Number(stats.completed_users || 0),
      completion_rate: stats.enrolled_users > 0 
        ? Number(stats.completed_users || 0) / Number(stats.enrolled_users) * 100 
        : 0,
      avg_progress: Number(stats.avg_progress || 0),
      content_sections: Number(stats.content_sections || 0),
      assessments: Number(stats.assessments || 0)
    });
  } catch (error) {
    console.error('Error fetching module stats:', error);
    return c.json({ error: 'Failed to fetch module statistics' }, 500);
  }
});

export { app as moduleRoutes };
