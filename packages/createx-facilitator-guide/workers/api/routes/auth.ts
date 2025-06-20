// Authentication routes for Cloudflare Worker
import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { sign, verify } from 'hono/jwt';
import type { Env } from '../index';

const app = new Hono<{ Bindings: Env }>();

// Password hashing utility (simplified for demo - use proper bcrypt in production)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// User registration
app.post('/register',
  validator('json', (value, c) => {
    if (!value.email || !value.password || !value.name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }
    if (value.password.length < 8) {
      return c.json({ error: 'Password must be at least 8 characters' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { email, password, name, role = 'facilitator' } = await c.req.json();
      
      // Check if user already exists
      const existingUserStmt = c.env.DB.prepare(`
        SELECT id FROM users WHERE email = ?
      `);
      const existingUser = await existingUserStmt.bind(email.toLowerCase()).first() as any;
      
      if (existingUser) {
        return c.json({ error: 'User already exists' }, 409);
      }

      // Hash password
      const passwordHash = await hashPassword(password);

      // Create user
      const createUserStmt = c.env.DB.prepare(`
        INSERT INTO users (
          name, email, password_hash, role, status, 
          created_at, updated_at
        ) VALUES (?, ?, ?, ?, 'active', datetime('now'), datetime('now'))
      `);

      const result = await createUserStmt.bind(
        name,
        email.toLowerCase(),
        passwordHash,
        role
      ).run();

      const userId = result.meta.last_row_id;

      // Generate JWT token
      const token = await sign(
        {
          sub: userId,
          email: email.toLowerCase(),
          name,
          role,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        },
        c.env.JWT_SECRET
      );

      // Log registration to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['user_registration', email.toLowerCase(), role],
        doubles: [Date.now()],
        indexes: ['auth']
      });

      return c.json({
        success: true,
        user: {
          id: userId,
          name,
          email: email.toLowerCase(),
          role
        },
        token
      }, 201);
    } catch (error) {
      console.error('Error during registration:', error);
      return c.json({ error: 'Registration failed' }, 500);
    }
  }
);

// User login
app.post('/login',
  validator('json', (value, c) => {
    if (!value.email || !value.password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { email, password } = await c.req.json();
      
      // Get user from database
      const userStmt = c.env.DB.prepare(`
        SELECT id, name, email, password_hash, role, status 
        FROM users 
        WHERE email = ?
      `);
      const user = await userStmt.bind(email.toLowerCase()).first() as any;
      
      if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      if (user.status !== 'active') {
        return c.json({ error: 'Account is not active' }, 401);
      }

      // Verify password
      const isValidPassword = await verifyPassword(password, user.password_hash);
      if (!isValidPassword) {
        return c.json({ error: 'Invalid credentials' }, 401);
      }

      // Update last login
      const updateLoginStmt = c.env.DB.prepare(`
        UPDATE users SET last_login = datetime('now') WHERE id = ?
      `);
      await updateLoginStmt.bind(user.id).run();

      // Generate JWT token
      const token = await sign(
        {
          sub: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        },
        c.env.JWT_SECRET
      );

      // Log login to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['user_login', user.email, user.role],
        doubles: [Date.now()],
        indexes: ['auth']
      });

      return c.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('Error during login:', error);
      return c.json({ error: 'Login failed' }, 500);
    }
  }
);

// Token refresh
app.post('/refresh', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Invalid authorization header' }, 401);
    }

    const token = authHeader.slice(7);
    
    // Verify current token (even if expired)
    let payload;
    try {
      payload = await verify(token, c.env.JWT_SECRET);
    } catch (error) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Get fresh user data
    const userStmt = c.env.DB.prepare(`
      SELECT id, name, email, role, status 
      FROM users 
      WHERE id = ?
    `);
    const user = await userStmt.bind(payload.sub).first() as any;
    
    if (!user || user.status !== 'active') {
      return c.json({ error: 'User not found or inactive' }, 401);
    }

    // Generate new token
    const newToken = await sign(
      {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      token: newToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    return c.json({ error: 'Token refresh failed' }, 500);
  }
});

// Get current user profile
app.get('/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const token = authHeader.slice(7);
    const payload = await verify(token, c.env.JWT_SECRET);

    // Get user profile with preferences
    const userStmt = c.env.DB.prepare(`
      SELECT 
        u.id, u.name, u.email, u.role, u.status, 
        u.created_at, u.last_login,
        up.preferences
      FROM users u
      LEFT JOIN user_preferences up ON u.id = up.user_id
      WHERE u.id = ?
    `);
    const user = await userStmt.bind(payload.sub).first() as any;
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Get user progress statistics
    const progressStmt = c.env.DB.prepare(`
      SELECT 
        COUNT(*) as modules_started,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as modules_completed,
        AVG(progress_percentage) as avg_progress
      FROM user_progress
      WHERE user_id = ?
    `);
    const progress = await progressStmt.bind(user.id).first() as any;

    return c.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        created_at: user.created_at,
        last_login: user.last_login,
        preferences: user.preferences ? JSON.parse(user.preferences) : {}
      },
      statistics: {
        modules_started: Number(progress?.modules_started || 0),
        modules_completed: Number(progress?.modules_completed || 0),
        avg_progress: Number(progress?.avg_progress || 0)
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Update user profile
app.put('/profile',
  validator('json', (value, c) => {
    const allowedFields = ['name', 'preferences'];
    const hasValidFields = Object.keys(value).some(key => allowedFields.includes(key));
    if (!hasValidFields) {
      return c.json({ error: 'No valid fields to update' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const authHeader = c.req.header('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Authorization required' }, 401);
      }

      const token = authHeader.slice(7);
      const payload = await verify(token, c.env.JWT_SECRET);
      const data = await c.req.json();

      // Update user name if provided
      if (data.name) {
        const updateUserStmt = c.env.DB.prepare(`
          UPDATE users SET name = ?, updated_at = datetime('now') WHERE id = ?
        `);
        await updateUserStmt.bind(data.name, payload.sub).run();
      }

      // Update preferences if provided
      if (data.preferences) {
        const updatePrefsStmt = c.env.DB.prepare(`
          INSERT OR REPLACE INTO user_preferences (user_id, preferences, updated_at)
          VALUES (?, ?, datetime('now'))
        `);
        await updatePrefsStmt.bind(payload.sub, JSON.stringify(data.preferences)).run();
      }

      return c.json({ success: true });
    } catch (error) {
      console.error('Error updating profile:', error);
      return c.json({ error: 'Failed to update profile' }, 500);
    }
  }
);

// User logout (token blacklisting would require additional storage)
app.post('/logout', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const payload = await verify(token, c.env.JWT_SECRET);
      
      // Log logout to analytics
      c.env.ANALYTICS.writeDataPoint({
        blobs: ['user_logout', payload.email || 'unknown'],
        doubles: [Date.now()],
        indexes: ['auth']
      });
    }

    return c.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    // Even if token verification fails, we can still return success for logout
    return c.json({ success: true, message: 'Logged out successfully' });
  }
});

// Password reset request (simplified)
app.post('/reset-password-request',
  validator('json', (value, c) => {
    if (!value.email) {
      return c.json({ error: 'Email is required' }, 400);
    }
    return value;
  }),
  async (c) => {
    try {
      const { email } = await c.req.json();
      
      // Check if user exists
      const userStmt = c.env.DB.prepare(`
        SELECT id FROM users WHERE email = ?
      `);
      const user = await userStmt.bind(email.toLowerCase()).first();
      
      // Always return success to prevent email enumeration
      if (user) {
        // In a real implementation, you would:
        // 1. Generate a secure reset token
        // 2. Store it with expiration
        // 3. Send email with reset link
        
        // Log password reset request
        c.env.ANALYTICS.writeDataPoint({
          blobs: ['password_reset_request', email.toLowerCase()],
          doubles: [Date.now()],
          indexes: ['auth']
        });
      }

      return c.json({ 
        success: true, 
        message: 'If the email exists, a reset link has been sent' 
      });
    } catch (error) {
      console.error('Error processing password reset:', error);
      return c.json({ error: 'Failed to process request' }, 500);
    }
  }
);

export { app as authRoutes };
