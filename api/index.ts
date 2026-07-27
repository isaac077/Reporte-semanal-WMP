import express from 'express';
import { setupApiRoutes } from '../src/server/routes';

const app = express();

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WMP Reportes Semanales',
    platform: 'Vercel Serverless & Cloud Run',
    mcp: 'enabled',
  });
});

// Setup API routes and MCP endpoints
setupApiRoutes(app);

export default app;
