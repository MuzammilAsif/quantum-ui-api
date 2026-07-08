import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { timing } from 'hono/timing';
import { librariesRouter } from './routes/libraries';
import { componentsRouter } from './routes/components';
import { searchRouter } from './routes/search';

const app = new Hono();

// ── Middleware ──────────────────────────────────────────────────────────────

// CORS — allows requests from VS Code webviews and any origin
// (VS Code webviews use vscode-webview:// protocol)
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
}));

app.use('*', logger());
app.use('*', timing());

// ── Health check ────────────────────────────────────────────────────────────

app.get('/', (c) => {
  return c.json({
    name:    'Quantum UI API',
    version: '1.0.0',
    status:  'healthy',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Routes ──────────────────────────────────────────────────────────────────

app.route('/api/libraries',  librariesRouter);
app.route('/api/components', componentsRouter);
app.route('/api/search',     searchRouter);

// ── 404 handler ─────────────────────────────────────────────────────────────

app.notFound((c) => {
  return c.json({ success: false, error: 'Route not found' }, 404);
});

// ── Error handler ────────────────────────────────────────────────────────────

app.onError((err, c) => {
  console.error('[API Error]', err);
  return c.json({ success: false, error: 'Internal server error' }, 500);
});

export default app;