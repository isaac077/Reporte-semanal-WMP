import express from 'express';

const app = express();
app.use(express.json());

app.get('/api/debug', (req: any, res: any) => {
  res.json({
    status: 'ok',
    node_version: process.version,
    env: process.env.NODE_ENV,
    imports_test: 'express loaded successfully',
  });
});

export default function handler(req: any, res: any) {
  return app(req, res);
}
