import express from 'express';
import { setupApiRoutes } from '../src/server/routes.js';

const app = express();

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WMP Reportes Semanales',
    platform: 'Vercel Serverless',
    mcp: 'enabled',
  });
});

// Setup API routes and MCP endpoints
setupApiRoutes(app);

export default app;
