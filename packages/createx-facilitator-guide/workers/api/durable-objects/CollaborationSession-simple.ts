// Collaboration Session Durable Object for real-time collaboration
// Simplified version without complex WebSocket handling

export class CollaborationSession {
  private sessions: Map<string, any> = new Map();

  constructor(private state: any, private env: any) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === '/init' && request.method === 'POST') {
        return this.initSession(request);
      }

      if (path === '/info' && request.method === 'GET') {
        return this.getSessionInfo(request);
      }

      if (path === '/join' && request.method === 'POST') {
        return this.joinSession(request);
      }

      if (path === '/leave' && request.method === 'POST') {
        return this.leaveSession(request);
      }

      if (path === '/end' && request.method === 'POST') {
        return this.endSession(request);
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      console.error('CollaborationSession error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  private async initSession(request: Request): Promise<Response> {
    const data:any = await request.json();
    const sessionId = data.sessionId || crypto.randomUUID();
    
    this.sessions.set(sessionId, {
      ...data,
      participants: [],
      createdAt: Date.now(),
      status: 'active'
    });

    return Response.json({
      success: true,
      sessionId,
      message: 'Session initialized'
    });
  }

  private async getSessionInfo(request: Request): Promise<Response> {
    const sessionId = new URL(request.url).searchParams.get('sessionId');
    const session = this.sessions.get(sessionId || '');

    if (!session) {
      return Response.json({ error: 'Session not found' }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: session
    });
  }

  private async joinSession(request: Request): Promise<Response> {
    const data:any = await request.json();
    const sessionId = new URL(request.url).searchParams.get('sessionId') || '';
    const session = this.sessions.get(sessionId);

    if (!session) {
      return Response.json({ error: 'Session not found' }, { status: 404 });
    }

    session.participants.push({
      userId: data.userId,
      userName: data.userName,
      joinedAt: Date.now()
    });

    return Response.json({
      success: true,
      message: 'Joined session'
    });
  }

  private async leaveSession(request: Request): Promise<Response> {
    const data :any= await request.json();
    const sessionId = new URL(request.url).searchParams.get('sessionId') || '';
    const session = this.sessions.get(sessionId);

    if (!session) {
      return Response.json({ error: 'Session not found' }, { status: 404 });
    }

    session.participants = session.participants.filter(
      (p: any) => p.userId !== data.userId
    );

    return Response.json({
      success: true,
      message: 'Left session'
    });
  }

  private async endSession(request: Request): Promise<Response> {
    const sessionId = new URL(request.url).searchParams.get('sessionId') || '';
    
    if (this.sessions.has(sessionId)) {
      this.sessions.delete(sessionId);
    }

    return Response.json({
      success: true,
      message: 'Session ended'
    });
  }
}
