import 'dotenv/config';
import { serve } from '@hono/node-server';
import app from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

serve(
    {
        fetch: app.fetch,
        port: PORT,
    },
    (_info) => {
        console.log(`
╔═══════════════════════════════════════╗
║       Quantum UI API — Running        ║
╠═══════════════════════════════════════╣
║  Local:   http://localhost:${PORT}    ║
║                                       ║
║  Endpoints:                           ║
║  GET /api/libraries                   ║
║  GET /api/libraries/:id               ║
║  GET /api/components                  ║
║  GET /api/components/:id              ║
║  GET /api/search?q=                   ║
╚═══════════════════════════════════════╝
    `);
    }
);