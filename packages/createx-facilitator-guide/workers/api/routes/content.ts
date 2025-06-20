// Content API routes for Cloudflare Worker
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Cache helper function
async function getCached(kv: KVNamespace, key: string, fetchFn: () => Promise<any>, ttl = 3600) {
  const cached = await kv.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const data = await fetchFn();
  await kv.put(key, JSON.stringify(data), { expirationTtl: ttl });
  return data;
}

// Get all content with caching
app.get('/', async (c) => {
  try {
    const cacheKey = 'content:all';
    
    const content = await getCached(c.env.CACHE_KV, cacheKey, async () => {
      const stmt = c.env.DB.prepare(`
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
          COUNT(mc.id) as section_count
        FROM modules m
        LEFT JOIN module_content mc ON m.id = mc.module_id
        WHERE m.status = 'published'
        GROUP BY m.id
        ORDER BY m.created_at DESC
      `);
      
      const result = await stmt.all();
      return result.results.map((row: any) => ({
        ...row,
        tags: row.tags ? JSON.parse(row.tags) : [],
        section_count: Number(row.section_count)
      }));
    });

    return c.json({
      content,
      total: content.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return c.json({ error: 'Failed to fetch content' }, 500);
  }
});

// Get content by slug/path
app.get('/*', async (c) => {
  try {
    const path = c.req.param('*') || '';
    const slugParts = path.split('/').filter(Boolean);
    
    if (slugParts.length === 0) {
      return c.json({ error: 'Invalid path' }, 400);
    }

    const cacheKey = `content:${path}`;
    
    const content = await getCached(c.env.CACHE_KV, cacheKey, async () => {
      if (slugParts.length === 1) {
        // Get module overview
        const moduleSlug = slugParts[0];
        const moduleStmt = c.env.DB.prepare(`
          SELECT * FROM modules 
          WHERE slug = ? AND status = 'published'
        `);
        
        const module = await moduleStmt.bind(moduleSlug).first() as Record<string, any>;
        if (!module) return null;

        // Get module sections
        const sectionsStmt = c.env.DB.prepare(`
          SELECT * FROM module_content 
          WHERE module_id = ? 
          ORDER BY sort_order ASC
        `);
        
        const sections = await sectionsStmt.bind(module.id).all();
        
        const moduleWithData = {
          id: module.id,
          title: module.title,
          slug: module.slug,
          description: module.description,
          difficulty: module.difficulty,
          duration: module.duration,
          category: module.category,
          status: module.status,
          created_at: module.created_at,
          updated_at: module.updated_at,
          tags: module.tags ? JSON.parse(module.tags) : [],
          metadata: module.metadata ? JSON.parse(module.metadata) : {},
          sections: sections.results.map((section: any) => ({
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
          }))
        };
        return moduleWithData;
      } else if (slugParts.length === 2) {
        // Get specific section
        const [moduleSlug, sectionSlug] = slugParts;
        
        const stmt = c.env.DB.prepare(`
          SELECT mc.*, m.title as module_title, m.slug as module_slug
          FROM module_content mc
          JOIN modules m ON mc.module_id = m.id
          WHERE m.slug = ? AND mc.slug = ? AND m.status = 'published'
        `);
        
        const section = await stmt.bind(moduleSlug, sectionSlug).first() as any;
        if (!section) return null;

        return {
          id: section.id,
          module_id: section.module_id,
          title: section.title,
          slug: section.slug,
          content_type: section.content_type,
          sort_order: section.sort_order,
          created_at: section.created_at,
          updated_at: section.updated_at,
          module_title: section.module_title,
          module_slug: section.module_slug,
          content: JSON.parse(section.content),
          metadata: section.metadata ? JSON.parse(section.metadata) : {}
        };
      }
      
      return null;
    });

    if (!content) {
      return c.json({ error: 'Content not found' }, 404);
    }

    return c.json(content);
  } catch (error) {
    console.error('Error fetching content by path:', error);
    return c.json({ error: 'Failed to fetch content' }, 500);
  }
});

// Create new content (requires authentication)
app.post('/', 
  validator('json', (value, c) => {
    if (!value.title || !value.slug || !value.content) {
      return c.json({ error: 'Missing required fields: title, slug, content' }, 400);
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
      const existing = await existingStmt.bind(data.slug).first() as any;
      
      if (existing) {
        return c.json({ error: 'Slug already exists' }, 409);
      }

      // Create module
      const moduleStmt = c.env.DB.prepare(`
        INSERT INTO modules (
          title, slug, description, difficulty, duration, 
          category, tags, status, metadata, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `);

      const moduleResult = await moduleStmt.bind(
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

      const moduleId = moduleResult.meta.last_row_id;

      // Create initial content section if provided
      if (data.content && Array.isArray(data.content)) {
        for (let i = 0; i < data.content.length; i++) {
          const section = data.content[i];
          const sectionStmt = c.env.DB.prepare(`
            INSERT INTO module_content (
              module_id, title, slug, content, content_type, 
              sort_order, metadata, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
          `);

          await sectionStmt.bind(
            moduleId,
            section.title,
            section.slug,
            JSON.stringify(section.content),
            section.type || 'text',
            i,
            JSON.stringify(section.metadata || {})
          ).run();
        }
      }

      // Clear cache
      await c.env.CACHE_KV.delete('content:all');
      await c.env.CACHE_KV.delete(`content:${data.slug}`);

      // Log to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['content_created', data.slug, 'module'],
        doubles: [Date.now()],
        indexes: ['content']
      });

      return c.json({ 
        success: true, 
        moduleId,
        slug: data.slug 
      }, 201);
    } catch (error) {
      console.error('Error creating content:', error);
      return c.json({ error: 'Failed to create content' }, 500);
    }
  }
);

// Update content
app.put('/:slug', 
  validator('json', (value, c) => {
    if (!value.title && !value.content && !value.metadata) {
      return c.json({ error: 'No fields to update' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const slug = c.req.param('slug');
      const data = await c.req.json();

      // Get existing module
      const existingStmt = c.env.DB.prepare(`
        SELECT id FROM modules WHERE slug = ?
      `);
      const existing = await existingStmt.bind(slug).first() as any;
      
      if (!existing) {
        return c.json({ error: 'Module not found' }, 404);
      }

      // Build update query dynamically
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
      values.push(slug);

      const updateStmt = c.env.DB.prepare(`
        UPDATE modules SET ${updates.join(', ')} WHERE slug = ?
      `);

      await updateStmt.bind(...values).run();

      // Clear cache
      await c.env.CACHE_KV.delete('content:all');
      await c.env.CACHE_KV.delete(`content:${slug}`);

      // Log to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['content_updated', slug, 'module'],
        doubles: [Date.now()],
        indexes: ['content']
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating content:', error);
      return c.json({ error: 'Failed to update content' }, 500);
    }
  }
);

// Delete content
app.delete('/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');

    // Get module ID
    const moduleStmt = c.env.DB.prepare(`
      SELECT id FROM modules WHERE slug = ?
    `);
    const module = await moduleStmt.bind(slug).first() as any;
    
    if (!module) {
      return c.json({ error: 'Module not found' }, 404);
    }

    // Delete module content first (foreign key constraint)
    const deleteContentStmt = c.env.DB.prepare(`
      DELETE FROM module_content WHERE module_id = ?
    `);
    await deleteContentStmt.bind(module.id).run();

    // Delete module
    const deleteModuleStmt = c.env.DB.prepare(`
      DELETE FROM modules WHERE id = ?
    `);
    await deleteModuleStmt.bind(module.id).run();

    // Clear cache
    await c.env.CACHE_KV.delete('content:all');
    await c.env.CACHE_KV.delete(`content:${slug}`);

    // Log to analytics
    c.env.ANALYTICS.writeDataPoint({
      blobs: ['content_deleted', slug, 'module'],
      doubles: [Date.now()],
      indexes: ['content']
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return c.json({ error: 'Failed to delete content' }, 500);
  }
});

export { app as contentRoutes };
