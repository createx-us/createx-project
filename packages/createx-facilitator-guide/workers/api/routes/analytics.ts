// Analytics routes for Cloudflare Worker
import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Middleware for admin access only
app.use('*', async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return c.json({ error: 'Authorization required' }, 401);
  }
  // TODO: Implement proper JWT verification
  await next();
});

// Get overall platform analytics
app.get('/overview', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    
    // Check if user has admin role
    if (payload.role !== 'admin') {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    // Get user statistics
    const userStatsStmt = c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
        COUNT(CASE WHEN created_at >= date('now', '-30 days') THEN 1 END) as new_users_30d,
        COUNT(CASE WHEN last_login >= date('now', '-7 days') THEN 1 END) as active_users_7d
      FROM users
    `);
    const userStats = await userStatsStmt.first() as any;

    // Get module statistics
    const moduleStatsStmt = c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_modules,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_modules,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_modules
      FROM modules
    `);
    const moduleStats = await moduleStatsStmt.first() as any;

    // Get progress statistics
    const progressStatsStmt = c.env.DB.prepare(`
      SELECT 
        COUNT(*) as total_enrollments,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as total_completions,
        AVG(progress_percentage) as avg_progress,
        SUM(time_spent) as total_time_spent
      FROM user_progress
    `);
    const progressStats = await progressStatsStmt.first() as any;

    return c.json({
      users: {
        total: Number(userStats?.total_users || 0),
        active: Number(userStats?.active_users || 0),
        new_30d: Number(userStats?.new_users_30d || 0),
        active_7d: Number(userStats?.active_users_7d || 0)
      },
      modules: {
        total: Number(moduleStats?.total_modules || 0),
        published: Number(moduleStats?.published_modules || 0),
        draft: Number(moduleStats?.draft_modules || 0)
      },
      progress: {
        total_enrollments: Number(progressStats?.total_enrollments || 0),
        total_completions: Number(progressStats?.total_completions || 0),
        completion_rate: progressStats?.total_enrollments > 0 
          ? (Number(progressStats.total_completions) / Number(progressStats.total_enrollments)) * 100 
          : 0,
        avg_progress: Number(progressStats?.avg_progress || 0),
        total_time_spent: Number(progressStats?.total_time_spent || 0)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching analytics overview:', error);
    return c.json({ error: 'Failed to fetch analytics overview' }, 500);
  }
});

// Get module-specific analytics
app.get('/modules/:moduleId', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    
    // Check permissions (admin or module owner)
    if (payload.role !== 'admin') {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    const moduleId = c.req.param('moduleId');

    // Get module engagement
    const engagementStmt = c.env.DB.prepare(`
      SELECT 
        COUNT(DISTINCT user_id) as total_users,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completions,
        AVG(progress_percentage) as avg_progress,
        AVG(time_spent) as avg_time_spent,
        MIN(started_at) as first_enrollment,
        MAX(last_accessed) as last_activity
      FROM user_progress
      WHERE module_id = ?
    `);
    const engagement = await engagementStmt.bind(moduleId).first() as any;

    // Get daily progress over last 30 days
    const dailyStmt = c.env.DB.prepare(`
      SELECT 
        date(last_accessed) as date,
        COUNT(DISTINCT user_id) as active_users,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as new_completions
      FROM user_progress
      WHERE module_id = ? AND last_accessed >= date('now', '-30 days')
      GROUP BY date(last_accessed)
      ORDER BY date
    `);
    const dailyResult = await dailyStmt.bind(moduleId).all() as any;

    // Get section performance
    const sectionStmt = c.env.DB.prepare(`
      SELECT 
        mc.id,
        mc.title,
        mc.slug,
        COUNT(sp.user_id) as users_accessed,
        AVG(sp.time_spent) as avg_time_spent,
        COUNT(CASE WHEN sp.completed THEN 1 END) as completions
      FROM module_content mc
      LEFT JOIN section_progress sp ON mc.id = sp.section_id
      WHERE mc.module_id = ?
      GROUP BY mc.id, mc.title, mc.slug
      ORDER BY mc.sort_order
    `);
    const sectionResult = await sectionStmt.bind(moduleId).all() as any;

    return c.json({
      module_id: moduleId,
      engagement: {
        total_users: Number(engagement?.total_users || 0),
        completions: Number(engagement?.completions || 0),
        completion_rate: engagement?.total_users > 0 
          ? (Number(engagement.completions) / Number(engagement.total_users)) * 100 
          : 0,
        avg_progress: Number(engagement?.avg_progress || 0),
        avg_time_spent: Number(engagement?.avg_time_spent || 0),
        first_enrollment: engagement?.first_enrollment,
        last_activity: engagement?.last_activity
      },
      daily_activity: dailyResult.results.map((day: any) => ({
        date: day.date,
        active_users: Number(day.active_users),
        new_completions: Number(day.new_completions)
      })),
      section_performance: sectionResult.results.map((section: any) => ({
        ...section,
        users_accessed: Number(section.users_accessed),
        avg_time_spent: Number(section.avg_time_spent),
        completions: Number(section.completions),
        completion_rate: section.users_accessed > 0 
          ? (Number(section.completions) / Number(section.users_accessed)) * 100 
          : 0
      }))
    });
  } catch (error) {
    console.error('Error fetching module analytics:', error);
    return c.json({ error: 'Failed to fetch module analytics' }, 500);
  }
});

// Get user engagement patterns
app.get('/engagement', async (c) => {
  try {
    const payload = c.get('jwtPayload');
    
    if (payload.role !== 'admin') {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    // Get daily active users for last 30 days
    const dailyActiveStmt = c.env.DB.prepare(`
      SELECT 
        date(last_accessed) as date,
        COUNT(DISTINCT user_id) as active_users
      FROM user_progress
      WHERE last_accessed >= date('now', '-30 days')
      GROUP BY date(last_accessed)
      ORDER BY date
    `);
    const dailyActiveResult = await dailyActiveStmt.all() as any;

    // Get completion funnel
    const funnelStmt = c.env.DB.prepare(`
      SELECT 
        'registered' as stage,
        COUNT(*) as users
      FROM users
      WHERE status = 'active'
      UNION ALL
      SELECT 
        'started_learning' as stage,
        COUNT(DISTINCT user_id) as users
      FROM user_progress
      UNION ALL
      SELECT 
        'completed_module' as stage,
        COUNT(DISTINCT user_id) as users
      FROM user_progress
      WHERE status = 'completed'
    `);
    const funnelResult = await funnelStmt.all() as any;

    // Get time spent distribution
    const timeDistributionStmt = c.env.DB.prepare(`
      SELECT 
        CASE 
          WHEN time_spent < 1800 THEN '0-30min'
          WHEN time_spent < 3600 THEN '30-60min'
          WHEN time_spent < 7200 THEN '1-2hours'
          ELSE '2+ hours'
        END as time_range,
        COUNT(*) as users
      FROM user_progress
      WHERE time_spent > 0
      GROUP BY 
        CASE 
          WHEN time_spent < 1800 THEN '0-30min'
          WHEN time_spent < 3600 THEN '30-60min'
          WHEN time_spent < 7200 THEN '1-2hours'
          ELSE '2+ hours'
        END
    `);
    const timeDistributionResult = await timeDistributionStmt.all() as any;

    return c.json({
      daily_active_users: dailyActiveResult.results.map((day: any) => ({
        date: day.date,
        active_users: Number(day.active_users)
      })),
      completion_funnel: funnelResult.results.map((stage: any) => ({
        stage: stage.stage,
        users: Number(stage.users)
      })),
      time_distribution: timeDistributionResult.results.map((range: any) => ({
        time_range: range.time_range,
        users: Number(range.users)
      }))
    });
  } catch (error) {
    console.error('Error fetching engagement analytics:', error);
    return c.json({ error: 'Failed to fetch engagement analytics' }, 500);
  }
});

// Track custom event
app.post('/events', async (c) => {
  try {
    const { event_type, event_data, user_id } = await c.req.json();
    
    // Log to Analytics Engine
    c.env.ANALYTICS.writeDataPoint({
      blobs: [event_type, JSON.stringify(event_data), user_id || 'anonymous'],
      doubles: [Date.now()],
      indexes: ['events']
    });

    return c.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return c.json({ error: 'Failed to track event' }, 500);
  }
});

export { app as analyticsRoutes };
