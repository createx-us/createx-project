// Progress tracking routes for Cloudflare Worker
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { jwt } from 'hono/jwt';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Middleware to extract user from JWT
app.use('*', jwt({
  secret: "placeholder-jwt-secret" // This will be overridden at runtime
}));

// Get user progress for all modules
app.get('/', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    const stmt = c.env.DB.prepare(`
      SELECT 
        up.id,
        up.module_id,
        up.progress_percentage,
        up.status,
        up.last_accessed,
        up.time_spent,
        up.completed_at,
        m.title as module_title,
        m.slug as module_slug,
        m.difficulty,
        m.duration as estimated_duration
      FROM user_progress up
      JOIN modules m ON up.module_id = m.id
      WHERE up.user_id = ?
      ORDER BY up.last_accessed DESC
    `);

    const result = await stmt.bind(userId).all();
    
    const progress = result.results.map((row: any) => ({
      ...row,
      progress_percentage: Number(row.progress_percentage),
      time_spent: Number(row.time_spent),
      estimated_duration: Number(row.estimated_duration)
    }));

    return c.json({ progress });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return c.json({ error: 'Failed to fetch progress' }, 500);
  }
});

// Get progress for specific module
app.get('/module/:moduleId', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub;
    const moduleId = c.req.param('moduleId');

    const stmt = c.env.DB.prepare(`
      SELECT 
        up.*,
        m.title as module_title,
        m.slug as module_slug
      FROM user_progress up
      JOIN modules m ON up.module_id = m.id
      WHERE up.user_id = ? AND up.module_id = ?
    `);

    const progress = await stmt.bind(userId, moduleId).first() as any;

    if (!progress) {
      return c.json({ error: 'Progress not found' }, 404);
    }

    // Get section progress
    const sectionStmt = c.env.DB.prepare(`
      SELECT 
        sp.*,
        mc.title as section_title,
        mc.slug as section_slug
      FROM section_progress sp
      JOIN module_content mc ON sp.section_id = mc.id
      WHERE sp.user_id = ? AND mc.module_id = ?
      ORDER BY mc.sort_order
    `);

    const sectionResult = await sectionStmt.bind(userId, moduleId).all();

    return c.json({
      ...progress,
      progress_percentage: Number(progress.progress_percentage),
      time_spent: Number(progress.time_spent),
      sections: sectionResult.results.map((section: any) => ({
        ...section,
        progress_percentage: Number(section.progress_percentage),
        time_spent: Number(section.time_spent)
      }))
    });
  } catch (error) {
    console.error('Error fetching module progress:', error);
    return c.json({ error: 'Failed to fetch module progress' }, 500);
  }
});

// Update progress for a module
app.put('/module/:moduleId',
  validator('json', (value, c) => {
    if (value.progress_percentage < 0 || value.progress_percentage > 100) {
      return c.json({ error: 'Progress percentage must be between 0 and 100' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const payload = c.get('jwtPayload');
      const userId = payload.sub;
      const moduleId = c.req.param('moduleId');
      const { progress_percentage, section_id, time_spent = 0 } = await c.req.json();

      // Check if progress record exists
      const existingStmt = c.env.DB.prepare(`
        SELECT id FROM user_progress WHERE user_id = ? AND module_id = ?
      `);
      const existing = await existingStmt.bind(userId, moduleId).first();

      if (existing) {
        // Update existing progress
        const updateStmt = c.env.DB.prepare(`
          UPDATE user_progress 
          SET 
            progress_percentage = ?,
            time_spent = time_spent + ?,
            last_accessed = datetime('now'),
            status = CASE 
              WHEN ? >= 100 THEN 'completed'
              WHEN ? > 0 THEN 'in_progress'
              ELSE status
            END,
            completed_at = CASE 
              WHEN ? >= 100 AND completed_at IS NULL THEN datetime('now')
              ELSE completed_at
            END
          WHERE user_id = ? AND module_id = ?
        `);

        await updateStmt.bind(
          progress_percentage, 
          time_spent,
          progress_percentage,
          progress_percentage,
          progress_percentage,
          userId, 
          moduleId
        ).run();
      } else {
        // Create new progress record
        const createStmt = c.env.DB.prepare(`
          INSERT INTO user_progress (
            user_id, module_id, progress_percentage, time_spent,
            status, started_at, last_accessed, completed_at
          ) VALUES (
            ?, ?, ?, ?,
            CASE WHEN ? >= 100 THEN 'completed' ELSE 'in_progress' END,
            datetime('now'), 
            datetime('now'),
            CASE WHEN ? >= 100 THEN datetime('now') ELSE NULL END
          )
        `);

        await createStmt.bind(
          userId, 
          moduleId, 
          progress_percentage, 
          time_spent,
          progress_percentage,
          progress_percentage
        ).run();
      }

      // Update section progress if provided
      if (section_id) {
        const sectionStmt = c.env.DB.prepare(`
          INSERT OR REPLACE INTO section_progress (
            user_id, section_id, progress_percentage, time_spent,
            completed, last_accessed
          ) VALUES (?, ?, ?, ?, ?, datetime('now'))
        `);

        await sectionStmt.bind(
          userId,
          section_id,
          100, // Section is completed when accessed
          time_spent,
          true
        ).run();
      }

      // Log to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['progress_updated', moduleId.toString(), progress_percentage.toString()],
        doubles: [Date.now(), progress_percentage, time_spent],
        indexes: ['progress']
      });

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating progress:', error);
      return c.json({ error: 'Failed to update progress' }, 500);
    }
  }
);

// Get user's overall statistics
app.get('/stats', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub;

    const statsStmt = c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_modules,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_modules,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_modules,
        AVG(progress_percentage) as avg_progress,
        SUM(time_spent) as total_time_spent,
        MIN(started_at) as first_started,
        MAX(last_accessed) as last_activity
      FROM user_progress
      WHERE user_id = ?
    `);

    const stats = await statsStmt.bind(userId).first() as any;

    // Get recent activity
    const recentStmt = c.env.DB.prepare(`
      SELECT 
        up.module_id,
        up.last_accessed,
        up.progress_percentage,
        m.title as module_title,
        m.slug as module_slug
      FROM user_progress up
      JOIN modules m ON up.module_id = m.id
      WHERE up.user_id = ?
      ORDER BY up.last_accessed DESC
      LIMIT 5
    `);

    const recentResult = await recentStmt.bind(userId).all();

    return c.json({
      overall: {
        total_modules: Number(stats?.total_modules || 0),
        completed_modules: Number(stats?.completed_modules || 0),
        in_progress_modules: Number(stats?.in_progress_modules || 0),
        completion_rate: stats?.total_modules > 0 
          ? (Number(stats.completed_modules) / Number(stats.total_modules)) * 100 
          : 0,
        avg_progress: Number(stats?.avg_progress || 0),
        total_time_spent: Number(stats?.total_time_spent || 0),
        first_started: stats?.first_started,
        last_activity: stats?.last_activity
      },
      recent_activity: recentResult.results.map((activity: any) => ({
        ...activity,
        progress_percentage: Number(activity.progress_percentage)
      }))
    });
  } catch (error) {
    console.error('Error fetching progress stats:', error);
    return c.json({ error: 'Failed to fetch progress statistics' }, 500);
  }
});

// Reset progress for a module (admin function)
app.delete('/module/:moduleId', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    const userId = payload.sub;
    const moduleId = c.req.param('moduleId');

    // Delete section progress
    const deleteSectionStmt = c.env.DB.prepare(`
      DELETE FROM section_progress 
      WHERE user_id = ? AND section_id IN (
        SELECT id FROM module_content WHERE module_id = ?
      )
    `);
    await deleteSectionStmt.bind(userId, moduleId).run();

    // Delete module progress
    const deleteModuleStmt = c.env.DB.prepare(`
      DELETE FROM user_progress WHERE user_id = ? AND module_id = ?
    `);
    await deleteModuleStmt.bind(userId, moduleId).run();

    // Log to analytics
    c.env.ANALYTICS.writeDataPoint({
      blobs: ['progress_reset', moduleId.toString()],
      doubles: [Date.now()],
      indexes: ['progress']
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error resetting progress:', error);
    return c.json({ error: 'Failed to reset progress' }, 500);
  }
});

export { app as progressRoutes };
