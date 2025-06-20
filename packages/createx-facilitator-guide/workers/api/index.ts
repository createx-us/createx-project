// Cloudflare Worker API for CreateX Facilitator Guide
// Main entry point for all API endpoints

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { jwt } from 'hono/jwt';
import { timing } from 'hono/timing';

// Route handlers
import { contentRoutes } from './routes/content';
import { authRoutes } from './routes/auth';
import { aiRoutes } from './routes/ai';
import { moduleRoutes } from './routes/modules';
import { assessmentRoutes } from './routes/assessments';
import { progressRoutes } from './routes/progress';
import { analyticsRoutes } from './routes/analytics';
import { workshopRoutes } from './routes/workshops';
import { collaborationRoutes } from './routes/collaboration';

// Types for Cloudflare bindings
export interface Env {
  DB: D1Database;
  CACHE_KV: KVNamespace;
  ASSETS: R2Bucket;
  AI: Ai;
  ANALYTICS: AnalyticsEngineDataset;
  COLLABORATION_SESSION: DurableObjectNamespace;
  ENVIRONMENT: string;
  APP_URL: string;
  CORS_ORIGINS: string;
  JWT_SECRET: string;
  ENCRYPTION_KEY: string;
}

// Global type declarations for Cloudflare Workers
declare global {
  interface D1Database {
    prepare(query: string): D1PreparedStatement;
    dump(): Promise<ArrayBuffer>;
    batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
    exec(query: string): Promise<D1ExecResult>;
  }

  interface D1PreparedStatement {
    bind(...values: any[]): D1PreparedStatement;
    first<T = unknown>(colName?: string): Promise<T>;
    run(): Promise<D1Result>;
    all<T = unknown>(): Promise<D1Result<T>>;
    raw<T = unknown>(): Promise<T[]>;
  }

  interface D1Result<T = unknown> {
    results: T[];
    success: boolean;
    meta: any;
  }

  interface D1ExecResult {
    count: number;
    duration: number;
  }

  interface KVNamespace {
    get(key: string, options?: { type?: string }): Promise<string | null>;
    put(key: string, value: string, options?: any): Promise<void>;
    delete(key: string): Promise<void>;
    list(options?: any): Promise<{ keys: { name: string }[] }>;
  }

  interface R2Bucket {
    get(key: string): Promise<R2Object | null>;
    put(key: string, value: any): Promise<R2Object>;
    delete(key: string): Promise<void>;
  }

  interface R2Object {
    body: ReadableStream;
    arrayBuffer(): Promise<ArrayBuffer>;
    text(): Promise<string>;
  }

  interface Ai {
    run(model: string, input: any): Promise<any>;
  }

  interface AnalyticsEngineDataset {
    writeDataPoint(data: any): void;
  }

  interface DurableObjectNamespace {
    get(id: DurableObjectId): DurableObjectStub;
    idFromName(name: string): DurableObjectId;
    idFromString(id: string): DurableObjectId;
    newUniqueId(): DurableObjectId;
  }

  interface DurableObjectId {
    toString(): string;
  }

  interface DurableObjectStub {
    fetch(request: Request): Promise<Response>;
  }
}

// Initialize Hono app
const app = new Hono<{ Bindings: Env }>();

// Global middleware
app.use('*', timing());
app.use('*', logger());

// CORS configuration
app.use('*', cors({
  origin: (origin, c) => {
    const corsOrigins = c.env.CORS_ORIGINS.split(',');
    return corsOrigins.includes(origin) || corsOrigins.includes('*');
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['X-Total-Count', 'X-Request-ID'],
  credentials: true,
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    environment: c.env.ENVIRONMENT,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API version endpoint
app.get('/api/v1', (c) => {
  return c.json({
    name: 'CreateX Facilitator Guide API',
    version: '1.0.0',
    environment: c.env.ENVIRONMENT,
    endpoints: {
      auth: '/api/v1/auth',
      content: '/api/v1/content',
      modules: '/api/v1/modules',
      assessments: '/api/v1/assessments',
      progress: '/api/v1/progress',
      analytics: '/api/v1/analytics',
      workshops: '/api/v1/workshops',
      ai: '/api/v1/ai',
      collaboration: '/api/v1/collaboration'
    }
  });
});

// Route mounting
app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/content', contentRoutes);
app.route('/api/v1/modules', moduleRoutes);
app.route('/api/v1/assessments', assessmentRoutes);
app.route('/api/v1/progress', progressRoutes);
app.route('/api/v1/analytics', analyticsRoutes);
app.route('/api/v1/workshops', workshopRoutes);
app.route('/api/v1/ai', aiRoutes);
app.route('/api/v1/collaboration', collaborationRoutes);

// Protected routes middleware
// Note: In Cloudflare Workers, we need to handle JWT differently
app.use('/api/v1/progress/*', async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return c.json({ error: 'Authorization required' }, 401);
  }
  await next();
});

app.use('/api/v1/analytics/*', async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return c.json({ error: 'Authorization required' }, 401);
  }
  await next();
});

app.use('/api/v1/workshops/*', async (c, next) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return c.json({ error: 'Authorization required' }, 401);
  }
  await next();
});

// Error handling
app.onError((err, c) => {
  console.error('API Error:', err);
  
  // Log to Analytics Engine
  c.env.ANALYTICS.writeDataPoint({
    blobs: [
      c.req.url,
      c.req.method,
      err.message,
      c.req.header('User-Agent') || 'unknown'
    ],
    doubles: [Date.now()],
    indexes: ['error']
  });

  if (err.message.includes('JWT')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  if (err.message.includes('validation')) {
    return c.json({ error: 'Validation error', details: err.message }, 400);
  }

  return c.json({ 
    error: 'Internal server error',
    requestId: c.req.header('cf-request-id') 
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ 
    error: 'Not found',
    path: c.req.path,
    method: c.req.method 
  }, 404);
});

export default app;

// Export Durable Object classes when ready
// export { CollaborationSession } from './durable-objects/CollaborationSession';
