import { Express, Request, Response } from 'express';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { reportStore } from './reportState.ts';
import { createMcpServer, sseTransports } from './mcpServer.ts';
import { ActivityStatus } from '../types/report.ts';
import { buildReportHtml } from './pdfBrowserGenerator.ts';

export function setupApiRoutes(app: Express) {
  // CORS Middleware for Vercel & Remote Clients
  app.use((req: Request, res: Response, next) => {
    if (typeof (res as any).flushHeaders !== 'function') {
      (res as any).flushHeaders = () => {};
    }
    if (typeof (res as any).flush !== 'function') {
      (res as any).flush = () => {};
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, mcp-session-id, mcp-version, Accept, Origin');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  // ==========================================
  // 1. REST API ENDPOINTS FOR REPORT DATA
  // ==========================================

  // Get full report
  app.get('/api/report', (req: Request, res: Response) => {
    res.json(reportStore.getReport());
  });

  // Download PDF report (uses puppeteer to render the same HTML as the app)
  app.get('/api/report/pdf', async (req: Request, res: Response) => {
    try {
      const report = reportStore.getReport();
      const html = buildReportHtml(report);

      // Dynamic import so Vercel can trace the module correctly
      const chromium = (await import('@sparticuz/chromium-min')).default;
      const puppeteer = (await import('puppeteer-core')).default;

      const executablePath = await chromium.executablePath(
        'https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.tar'
      );

      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: { width: 794, height: 1123 },
        executablePath,
        headless: true,
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: { top: '0', right: '0', bottom: '0', left: '0' },
      });

      await browser.close();

      const weekClean = (report.metadata.week || 'Semana').replace(/[^a-zA-Z0-9]/g, '_');
      const dateClean = (report.metadata.cutoffDate || '2026').replace(/[^a-zA-Z0-9-]/g, '_');
      const filename = `Reporte_Semanal_ThomasWagner_${weekClean}_${dateClean}.pdf`;

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', pdfBuffer.length);
      res.send(pdfBuffer);
    } catch (err: any) {
      console.error('Error generando PDF con puppeteer:', err);
      res.status(500).json({ success: false, error: err?.message || 'Error al generar el PDF' });
    }
  });

  // Overwrite full report
  app.put('/api/report', (req: Request, res: Response) => {
    const updated = reportStore.setReport(req.body);
    res.json({ success: true, report: updated });
  });

  // Get summary stats
  app.get('/api/report/summary', (req: Request, res: Response) => {
    res.json(reportStore.getSummaryStats());
  });

  // Get list of fixed accounts
  app.get('/api/report/accounts', (req: Request, res: Response) => {
    res.json(reportStore.getAccountsList());
  });

  // Batch add activities
  app.post('/api/report/batch-activities', (req: Request, res: Response) => {
    const { activities } = req.body;
    if (!Array.isArray(activities)) {
      return res.status(400).json({ success: false, message: 'activities debe ser un arreglo de objetos.' });
    }
    const result = reportStore.batchAddActivities(activities);
    res.json(result);
  });

  // Update metadata
  app.post('/api/report/metadata', (req: Request, res: Response) => {
    const updated = reportStore.updateMetadata(req.body);
    res.json({ success: true, metadata: updated });
  });

  // Add activity
  app.post('/api/report/activity', (req: Request, res: Response) => {
    const { accountIdentifier, topic, status, update } = req.body;
    if (!accountIdentifier || !topic) {
      return res
        .status(400)
        .json({ success: false, message: 'accountIdentifier y topic son requeridos.' });
    }
    const result = reportStore.addActivity(
      accountIdentifier,
      topic,
      status as ActivityStatus,
      update
    );
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  });

  // Update activity
  app.put('/api/report/activity', (req: Request, res: Response) => {
    const { accountIdentifier, activityId, topic, status, update } = req.body;
    if (!accountIdentifier || !activityId) {
      return res
        .status(400)
        .json({ success: false, message: 'accountIdentifier y activityId son requeridos.' });
    }
    const result = reportStore.updateActivity(accountIdentifier, activityId, {
      topic,
      status: status as ActivityStatus,
      update,
    });
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  });

  // Delete activity
  app.delete('/api/report/activity', (req: Request, res: Response) => {
    const { accountIdentifier, activityId } = req.body;
    if (!accountIdentifier || !activityId) {
      return res
        .status(400)
        .json({ success: false, message: 'accountIdentifier y activityId son requeridos.' });
    }
    const result = reportStore.deleteActivity(accountIdentifier, activityId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  });

  // Load sample data
  app.post('/api/report/sample-data', (req: Request, res: Response) => {
    const report = reportStore.loadSampleData();
    res.json({ success: true, message: 'Datos de muestra cargados.', report });
  });

  // Clear report activities
  app.delete('/api/report/activities', (req: Request, res: Response) => {
    const report = reportStore.clearReport();
    res.json({ success: true, message: 'Actividades eliminadas.', report });
  });

  // ==========================================
  // 2. MODEL CONTEXT PROTOCOL (MCP) ENDPOINTS
  // ==========================================

  // MCP Info Endpoint
  app.get('/api/mcp/info', (req: Request, res: Response) => {
    res.json({
      mcpServer: 'Thomas Wagner Weekly Report MCP Server',
      version: '1.0.0',
      status: 'active',
      transports: {
        sseEndpoint: '/api/mcp/sse',
        messageEndpoint: '/api/mcp/message',
        jsonRpcEndpoint: '/api/mcp',
      },
      openApiSchemaUrl: '/api/openapi.json',
      availableTools: [
        'get_full_report',
        'get_accounts_list',
        'get_account_activities',
        'get_report_summary',
        'add_activity',
        'batch_add_activities',
        'update_activity',
        'delete_activity',
        'update_metadata',
        'load_sample_data',
        'clear_report',
        'download_pdf_report',
      ],
      resources: ['report://current', 'report://summary'],
      prompts: ['generate-executive-summary', 'review-blocked-projects'],
    });
  });

  // MCP SSE Connection Handler
  const handleMcpSse = async (req: Request, res: Response) => {
    console.log('[MCP] SSE connection client connected');

    if (typeof (res as any).flushHeaders !== 'function') {
      (res as any).flushHeaders = () => {};
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      const transport = new SSEServerTransport('/api/mcp/message', res);
      const mcpServer = createMcpServer();

      sseTransports.set(transport.sessionId, transport);

      req.on('close', () => {
        console.log(`[MCP] SSE connection closed for session ${transport.sessionId}`);
        sseTransports.delete(transport.sessionId);
      });

      await mcpServer.connect(transport);
    } catch (err: any) {
      console.error('[MCP] SSE connection error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'SSE Transport Error', message: err?.message });
      }
    }
  };

  // Register SSE aliases
  app.get('/api/mcp/sse', handleMcpSse);
  app.get('/mcp/sse', handleMcpSse);
  app.get('/sse', handleMcpSse);

  // Handle stateless RPC request (Shared engine for Vercel Serverless & Direct HTTP POST)
  const handleRpcRequest = async (jsonRpcReq: any) => {
    const { jsonrpc, id, method, params } = jsonRpcReq || {};

    if (jsonrpc !== '2.0') {
      return {
        jsonrpc: '2.0',
        id: id || null,
        error: { code: -32600, message: 'Invalid Request: jsonrpc must be "2.0"' },
      };
    }

    if (method === 'initialize') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {},
            prompts: {},
          },
          serverInfo: {
            name: 'wmp-weekly-report-mcp',
            version: '1.0.0',
          },
        },
      };
    }

    if (method === 'notifications/initialized') {
      return null; // Notification, no response required
    }

    if (method === 'ping') {
      return { jsonrpc: '2.0', id, result: {} };
    }

    if (method === 'tools/list') {
      return {
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'get_full_report',
              description: 'Obtiene el reporte semanal completo de WMP.',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'get_accounts_list',
              description: 'Obtiene la lista oficial de cuentas corporativas configuradas con sus IDs.',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'get_account_activities',
              description: 'Obtiene las actividades de una sola cuenta dada.',
              inputSchema: {
                type: 'object',
                properties: {
                  accountIdentifier: { type: 'string' },
                },
                required: ['accountIdentifier'],
              },
            },
            {
              name: 'get_report_summary',
              description: 'Obtiene el resumen con métricas clave de estatus.',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'download_pdf_report',
              description:
                'Genera el archivo PDF oficial del reporte semanal de Thomas Wagner.MX. Retorna el enlace de descarga directa y el archivo en Base64.',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'add_activity',
              description: 'Agrega una actividad a una cuenta dada.',
              inputSchema: {
                type: 'object',
                properties: {
                  accountIdentifier: { type: 'string' },
                  topic: { type: 'string' },
                  status: {
                    type: 'string',
                    enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                  },
                  update: { type: 'string' },
                },
                required: ['accountIdentifier', 'topic'],
              },
            },
            {
              name: 'batch_add_activities',
              description: 'Agrega múltiples actividades en un solo paso.',
              inputSchema: {
                type: 'object',
                properties: {
                  activities: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        accountIdentifier: { type: 'string' },
                        topic: { type: 'string' },
                        status: {
                          type: 'string',
                          enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                        },
                        update: { type: 'string' },
                      },
                      required: ['accountIdentifier', 'topic'],
                    },
                  },
                },
                required: ['activities'],
              },
            },
            {
              name: 'update_activity',
              description: 'Actualiza una actividad existente.',
              inputSchema: {
                type: 'object',
                properties: {
                  accountIdentifier: { type: 'string' },
                  activityId: { type: 'string' },
                  topic: { type: 'string' },
                  status: {
                    type: 'string',
                    enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                  },
                  update: { type: 'string' },
                },
                required: ['accountIdentifier', 'activityId'],
              },
            },
            {
              name: 'delete_activity',
              description: 'Elimina una actividad de una cuenta por ID.',
              inputSchema: {
                type: 'object',
                properties: {
                  accountIdentifier: { type: 'string' },
                  activityId: { type: 'string' },
                },
                required: ['accountIdentifier', 'activityId'],
              },
            },
            {
              name: 'update_metadata',
              description: 'Actualiza los metadatos generales del reporte.',
              inputSchema: {
                type: 'object',
                properties: {
                  week: { type: 'string' },
                  cutoffDate: { type: 'string' },
                  responsible: { type: 'string' },
                  department: { type: 'string' },
                  phone: { type: 'string' },
                  email: { type: 'string' },
                },
              },
            },
            {
              name: 'load_sample_data',
              description: 'Carga datos de muestra realistas.',
              inputSchema: { type: 'object', properties: {} },
            },
            {
              name: 'clear_report',
              description: 'Limpia todas las actividades.',
              inputSchema: { type: 'object', properties: {} },
            },
          ],
        },
      };
    }

    if (method === 'tools/call') {
      const { name, arguments: args = {} } = params || {};

      if (name === 'get_full_report') {
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(reportStore.getReport(), null, 2) }],
          },
        };
      }

      if (name === 'get_accounts_list') {
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(reportStore.getAccountsList(), null, 2) }],
          },
        };
      }

      if (name === 'get_account_activities') {
        const res = reportStore.getAccountActivities(args.accountIdentifier);
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
            isError: !res.success,
          },
        };
      }

      if (name === 'batch_add_activities') {
        const res = reportStore.batchAddActivities(Array.isArray(args.activities) ? args.activities : []);
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
            isError: !res.success,
          },
        };
      }

      if (name === 'get_report_summary') {
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(reportStore.getSummaryStats(), null, 2) }],
          },
        };
      }

      if (name === 'download_pdf_report') {
        const report = reportStore.getReport();
        const html = buildReportHtml(report);

        // Generate PDF using headless chromium
        const chromium = (await import('@sparticuz/chromium-min')).default;
        const puppeteer = (await import('puppeteer-core')).default;
        const executablePath = await chromium.executablePath(
          'https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.tar'
        );
        const browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: { width: 794, height: 1123 },
          executablePath,
          headless: true,
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
          format: 'Letter',
          printBackground: true,
          margin: { top: '0', right: '0', bottom: '0', left: '0' },
        });
        await browser.close();

        const base64Pdf = Buffer.from(pdfBuffer).toString('base64');
        const weekClean = (report.metadata.week || 'Semana').replace(/[^a-zA-Z0-9]/g, '_');
        const dateClean = (report.metadata.cutoffDate || '2026').replace(/[^a-zA-Z0-9-]/g, '_');
        const filename = `Reporte_Semanal_ThomasWagner_${weekClean}_${dateClean}.pdf`;

        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `✅ **Reporte Semanal generado exitosamente en PDF**\n\n📄 **Archivo:** \`${filename}\`\n👤 **Responsable:** ${report.metadata.responsible}\n📅 **Fecha de Corte:** ${report.metadata.cutoffDate}\n\n🔗 **Enlace de Descarga Directa:**\n[📥 Descargar ${filename}](/api/report/pdf)\n\n*El PDF incluye el formato oficial de Thomas Wagner.MX.*`,
              },
              {
                type: 'resource',
                resource: {
                  uri: `report://pdf/${filename}`,
                  mimeType: 'application/pdf',
                  blob: base64Pdf,
                },
              },
            ],
          },
        };
      }

      if (name === 'add_activity') {
        const res = reportStore.addActivity(
          args.accountIdentifier,
          args.topic,
          args.status,
          args.update
        );
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
            isError: !res.success,
          },
        };
      }

      if (name === 'update_activity') {
        const res = reportStore.updateActivity(args.accountIdentifier, args.activityId, {
          topic: args.topic,
          status: args.status,
          update: args.update,
        });
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
            isError: !res.success,
          },
        };
      }

      if (name === 'delete_activity') {
        const res = reportStore.deleteActivity(args.accountIdentifier, args.activityId);
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
            isError: !res.success,
          },
        };
      }

      if (name === 'update_metadata') {
        const updated = reportStore.updateMetadata(args);
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `Metadatos actualizados:\n${JSON.stringify(updated, null, 2)}`,
              },
            ],
          },
        };
      }

      if (name === 'load_sample_data') {
        const rep = reportStore.loadSampleData();
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: 'Se han cargado los datos de ejemplo corporativos en el reporte.',
              },
            ],
          },
        };
      }

      if (name === 'clear_report') {
        reportStore.clearReport();
        return {
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: 'Se han eliminado todas las actividades.' }],
          },
        };
      }

      return {
        jsonrpc: '2.0',
        id,
        error: { code: -32601, message: `Tool not found: ${name}` },
      };
    }

    return {
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    };
  };

  // MCP SSE Message POST Handler
  const handleMcpMessage = async (req: Request, res: Response) => {
    const sessionId = (req.query.sessionId as string) || (req.headers['mcp-session-id'] as string);
    const transport = sessionId ? sseTransports.get(sessionId) : undefined;

    if (transport) {
      try {
        await transport.handlePostMessage(req, res);
        return;
      } catch (err) {
        console.warn('[MCP] Transport handlePostMessage failed, falling back to stateless handler:', err);
      }
    }

    // Fallback for Vercel Serverless (stateless across lambda invocations)
    const body = req.body;
    const response = Array.isArray(body)
      ? await Promise.all(body.map((b) => handleRpcRequest(b)))
      : await handleRpcRequest(body);

    if (response) {
      return res.json(response);
    } else {
      return res.status(202).end();
    }
  };

  app.post('/api/mcp/message', handleMcpMessage);
  app.post('/mcp/message', handleMcpMessage);
  app.post('/message', handleMcpMessage);
  app.post('/messages', handleMcpMessage);

  // Direct Streamable MCP JSON-RPC 2.0 Endpoint (for HTTP clients like ChatGPT)
  const handleDirectRpc = async (req: Request, res: Response) => {
    const body = req.body;
    
    // If request body has JSON-RPC or is array
    if (body && (body.jsonrpc || Array.isArray(body))) {
      const response = Array.isArray(body)
        ? await Promise.all(body.map((b) => handleRpcRequest(b)))
        : await handleRpcRequest(body);

      if (response) {
        return res.json(response);
      } else {
        return res.status(202).end();
      }
    }

    // Default response for GET/POST without jsonrpc body
    return res.json({
      mcpServer: 'Thomas Wagner Weekly Report MCP Server',
      version: '1.0.0',
      status: 'active',
      endpoints: {
        sse: '/api/mcp/sse',
        message: '/api/mcp/message',
        post: '/api/mcp',
      },
      availableTools: [
        'get_full_report',
        'get_accounts_list',
        'get_account_activities',
        'get_report_summary',
        'add_activity',
        'batch_add_activities',
        'update_activity',
        'delete_activity',
        'update_metadata',
        'load_sample_data',
        'clear_report',
        'download_pdf_report',
      ],
    });
  };

  app.get('/api/mcp', handleDirectRpc);
  app.post('/api/mcp', handleDirectRpc);
  app.delete('/api/mcp', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Session closed' });
  });
  app.get('/mcp', handleDirectRpc);
  app.post('/mcp', handleDirectRpc);
  app.delete('/mcp', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Session closed' });
  });

  // ==========================================
  // 3. OPENAPI 3.0 SPECIFICATION FOR CHATGPT
  // ==========================================

  const handleOpenApiSpec = (req: Request, res: Response) => {
    const host = (req.headers['x-forwarded-host'] as string) || req.get('host') || 'localhost:3000';
    const protocol = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
    const baseUrl = `${protocol}://${host}`;

    const openApiSpec = {
      openapi: '3.0.3',
      info: {
        title: 'Thomas Wagner.MX Weekly Report MCP & ChatGPT Custom Action API',
        description:
          'API para controlar, consultar y modificar el Reporte Semanal de Estatus de Thomas Wagner.MX mediante agentes de IA como ChatGPT.',
        version: '1.0.0',
      },
      servers: [
        {
          url: baseUrl,
          description: 'Servidor principal Thomas Wagner Reportes',
        },
      ],
      paths: {
        '/api/report/pdf': {
          get: {
            summary: 'Descargar el reporte semanal en formato PDF',
            operationId: 'downloadPdfReport',
            description:
              'Genera y descarga el archivo PDF oficial con el formato corporativo de Thomas Wagner.MX.',
            responses: {
              '200': {
                description: 'Archivo PDF del reporte semanal',
                content: {
                  'application/pdf': {
                    schema: {
                      type: 'string',
                      format: 'binary',
                    },
                  },
                },
              },
            },
          },
        },
        '/api/report': {
          get: {
            summary: 'Obtener el reporte completo',
            operationId: 'getReport',
            description:
              'Devuelve el objeto completo del reporte semanal con metadatos y cuentas con actividades.',
            responses: {
              '200': {
                description: 'Reporte completo obtenido con éxito.',
              },
            },
          },
          put: {
            summary: 'Reemplazar el reporte completo',
            operationId: 'setFullReport',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { type: 'object' },
                },
              },
            },
            responses: {
              '200': { description: 'Reporte actualizado' },
            },
          },
        },
        '/api/report/summary': {
          get: {
            summary: 'Obtener estadísticas del reporte',
            operationId: 'getReportSummary',
            description:
              'Devuelve el conteo de actividades completadas, en proceso, bloqueadas y pendientes por cuenta.',
            responses: {
              '200': { description: 'Estadísticas ejecutivas obtenidas.' },
            },
          },
        },
        '/api/report/activity': {
          post: {
            summary: 'Agregar una actividad a una cuenta',
            operationId: 'addActivity',
            description:
              'Agrega un proyecto o tema con su estatus y avance a una cuenta corporativa (WMP Mexico Advisors, The WMP Club, Cónsul, Acensblue, Centro Alemán Querétaro, Thomas Wagner.mx).',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['accountIdentifier', 'topic'],
                    properties: {
                      accountIdentifier: {
                        type: 'string',
                        example: 'WMP Mexico Advisors',
                        description: 'Nombre o ID de la cuenta',
                      },
                      topic: {
                        type: 'string',
                        example: 'Migración del ERP Corporativo',
                        description: 'Asunto o tema principal',
                      },
                      status: {
                        type: 'string',
                        enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                        default: 'En proceso',
                        description: 'Estatus del avance',
                      },
                      update: {
                        type: 'string',
                        example: 'Fase de pruebas con usuarios clave.',
                        description: 'Detalle del avance o bloqueo',
                      },
                    },
                  },
                },
              },
            },
            responses: {
              '200': { description: 'Actividad agregada exitosamente' },
            },
          },
          put: {
            summary: 'Actualizar una actividad existente',
            operationId: 'updateActivity',
            description: 'Modifica el estatus, tema o avance de una actividad dada su ID.',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['accountIdentifier', 'activityId'],
                    properties: {
                      accountIdentifier: { type: 'string', example: 'wmp-mexico-advisors' },
                      activityId: { type: 'string', example: 'wmp-1' },
                      topic: { type: 'string' },
                      status: {
                        type: 'string',
                        enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                      },
                      update: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: {
              '200': { description: 'Actividad actualizada' },
            },
          },
          delete: {
            summary: 'Eliminar una actividad',
            operationId: 'deleteActivity',
            description: 'Elimina una actividad de la cuenta especificada usando su ID.',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['accountIdentifier', 'activityId'],
                    properties: {
                      accountIdentifier: { type: 'string' },
                      activityId: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: {
              '200': { description: 'Actividad eliminada' },
            },
          },
        },
        '/api/report/metadata': {
          post: {
            summary: 'Actualizar metadatos del reporte',
            operationId: 'updateMetadata',
            description:
              'Modifica la semana, fecha de corte, responsable, departamento, teléfono o email.',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      week: { type: 'string', example: 'Semana 30' },
                      cutoffDate: { type: 'string', example: '2026-07-24' },
                      responsible: { type: 'string', example: 'Thomas Wagner' },
                      department: {
                        type: 'string',
                        example: 'Business Development Agency',
                      },
                      phone: { type: 'string', example: '+52 442 181 7209' },
                      email: { type: 'string', example: 'wagner@thomaswagner.mx' },
                    },
                  },
                },
              },
            },
            responses: {
              '200': { description: 'Metadatos actualizados' },
            },
          },
        },
        '/api/report/sample-data': {
          post: {
            summary: 'Cargar datos de prueba',
            operationId: 'loadSampleData',
            description: 'Rellena el reporte con datos de muestra realistas.',
            responses: {
              '200': { description: 'Datos cargados' },
            },
          },
        },
        '/api/report/activities': {
          delete: {
            summary: 'Limpiar todas las actividades',
            operationId: 'clearActivities',
            description: 'Vacía la lista de actividades registradas.',
            responses: {
              '200': { description: 'Reporte vaciado' },
            },
          },
        },
      },
    };

    res.json(openApiSpec);
  };

  app.get('/api/openapi.json', handleOpenApiSpec);
  app.get('/openapi.json', handleOpenApiSpec);
}
