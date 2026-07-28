import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { reportStore } from './reportState.ts';
import { ActivityStatus } from '../types/report.ts';

export function createMcpServer() {
  const server = new Server(
    {
      name: 'wmp-weekly-report-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
    }
  );

  // 1. LIST TOOLS
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: 'get_full_report',
          description:
            'Obtiene el reporte semanal completo con metadatos y todas las actividades desglosadas por cuenta (WMP Mexico Advisors, The WMP Club, HK, Acensblue, Centro Alemán Querétaro, Thomas Wagner.mx).',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_accounts_list',
          description:
            'Obtiene la lista oficial de cuentas corporativas disponibles en el sistema con sus identificadores (ID y nombre), descripción y número de actividades registradas.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'get_account_activities',
          description:
            'Obtiene la lista de actividades de una sola cuenta específica.',
          inputSchema: {
            type: 'object',
            properties: {
              accountIdentifier: {
                type: 'string',
                description: 'Nombre o ID de la cuenta (ej. "HK", "wmp-mexico-advisors", "Acensblue", etc.)',
              },
            },
            required: ['accountIdentifier'],
          },
        },
        {
          name: 'get_report_summary',
          description:
            'Obtiene un resumen ejecutivo con estadísticas de avance (# actividades totales, completadas, en proceso, bloqueadas y pendientes por cuenta).',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'add_activity',
          description:
            'Agrega una nueva actividad o proyecto al reporte semanal de una cuenta específica.',
          inputSchema: {
            type: 'object',
            properties: {
              accountIdentifier: {
                type: 'string',
                description:
                  'Nombre o ID de la cuenta (ej. "WMP Mexico Advisors", "wmp-mexico-advisors", "The WMP Club", "HK", "Acensblue", "Centro Alemán Querétaro", "Thomas Wagner.mx")',
              },
              topic: {
                type: 'string',
                description: 'Tema, proyecto o asunto principal de la actividad.',
              },
              status: {
                type: 'string',
                enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                description: 'Estatus actual de la actividad. Valor por defecto: "En proceso".',
              },
              update: {
                type: 'string',
                description: 'Avances, estatus detallado, bloqueos o siguientes pasos.',
              },
            },
            required: ['accountIdentifier', 'topic'],
          },
        },
        {
          name: 'batch_add_activities',
          description:
            'Agrega múltiples actividades en una sola llamada. Ideal cuando se recibe una lista o minuta con varias tareas para una o distintas cuentas.',
          inputSchema: {
            type: 'object',
            properties: {
              activities: {
                type: 'array',
                description: 'Lista de actividades a agregar.',
                items: {
                  type: 'object',
                  properties: {
                    accountIdentifier: { type: 'string', description: 'Nombre o ID de la cuenta' },
                    topic: { type: 'string', description: 'Tema o asunto' },
                    status: {
                      type: 'string',
                      enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                      description: 'Estatus actual',
                    },
                    update: { type: 'string', description: 'Avance o detalle' },
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
          description:
            'Actualiza el tema, estatus o avance de una actividad existente en una cuenta.',
          inputSchema: {
            type: 'object',
            properties: {
              accountIdentifier: {
                type: 'string',
                description: 'Nombre o ID de la cuenta.',
              },
              activityId: {
                type: 'string',
                description: 'ID único de la actividad a actualizar.',
              },
              topic: {
                type: 'string',
                description: 'Nuevo tema o asunto (opcional).',
              },
              status: {
                type: 'string',
                enum: ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'],
                description: 'Nuevo estatus de la actividad (opcional).',
              },
              update: {
                type: 'string',
                description: 'Nuevo detalle o actualización (opcional).',
              },
            },
            required: ['accountIdentifier', 'activityId'],
          },
        },
        {
          name: 'delete_activity',
          description: 'Elimina una actividad de una cuenta dada utilizando su ID.',
          inputSchema: {
            type: 'object',
            properties: {
              accountIdentifier: {
                type: 'string',
                description: 'Nombre o ID de la cuenta.',
              },
              activityId: {
                type: 'string',
                description: 'ID de la actividad que se desea eliminar.',
              },
            },
            required: ['accountIdentifier', 'activityId'],
          },
        },
        {
          name: 'update_metadata',
          description:
            'Actualiza los metadatos generales del reporte semanal (semana, fecha de corte, responsable, departamento, teléfono, email).',
          inputSchema: {
            type: 'object',
            properties: {
              week: { type: 'string', description: 'Número o nombre de semana (ej. "Semana 30")' },
              cutoffDate: { type: 'string', description: 'Fecha de corte (ej. "2026-07-24")' },
              responsible: { type: 'string', description: 'Nombre del responsable del reporte' },
              department: { type: 'string', description: 'Área o puesto corporativo' },
              phone: { type: 'string', description: 'Teléfono de contacto' },
              email: { type: 'string', description: 'Correo electrónico corporativo' },
            },
          },
        },
        {
          name: 'load_sample_data',
          description:
            'Carga datos de muestra realistas y corporativos en el reporte para pruebas.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'clear_report',
          description: 'Limpia todas las actividades registradas dejando el formulario en blanco.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
        {
          name: 'download_pdf_report',
          description:
            'Genera el archivo PDF oficial corporativo del reporte semanal de Thomas Wagner.MX. Retorna el enlace de descarga directo, el resumen en chat y el archivo codificado en Base64 para que el usuario o ChatGPT lo pueda descargar/enviar directamente en la conversación.',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    };
  });

  // 2. CALL TOOL HANDLER
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;

    try {
      switch (name) {
        case 'get_full_report': {
          const report = reportStore.getReport();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(report, null, 2),
              },
            ],
          };
        }

        case 'get_accounts_list': {
          const accounts = reportStore.getAccountsList();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(accounts, null, 2),
              },
            ],
          };
        }

        case 'get_account_activities': {
          const { accountIdentifier } = args as any;
          const result = reportStore.getAccountActivities(accountIdentifier);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
            isError: !result.success,
          };
        }

        case 'batch_add_activities': {
          const { activities } = args as any;
          const result = reportStore.batchAddActivities(Array.isArray(activities) ? activities : []);
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
            isError: !result.success,
          };
        }

        case 'get_report_summary': {
          const summary = reportStore.getSummaryStats();
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(summary, null, 2),
              },
            ],
          };
        }

        case 'add_activity': {
          const { accountIdentifier, topic, status = 'En proceso', update = '' } = args as any;
          const result = reportStore.addActivity(
            accountIdentifier,
            topic,
            status as ActivityStatus,
            update
          );

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
            isError: !result.success,
          };
        }

        case 'update_activity': {
          const { accountIdentifier, activityId, topic, status, update } = args as any;
          const result = reportStore.updateActivity(accountIdentifier, activityId, {
            topic,
            status: status as ActivityStatus,
            update,
          });

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
            isError: !result.success,
          };
        }

        case 'delete_activity': {
          const { accountIdentifier, activityId } = args as any;
          const result = reportStore.deleteActivity(accountIdentifier, activityId);

          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result, null, 2),
              },
            ],
            isError: !result.success,
          };
        }

        case 'update_metadata': {
          const updated = reportStore.updateMetadata(args as any);
          return {
            content: [
              {
                type: 'text',
                text: `Metadatos actualizados correctamente:\n${JSON.stringify(updated, null, 2)}`,
              },
            ],
          };
        }

        case 'load_sample_data': {
          const sample = reportStore.loadSampleData();
          return {
            content: [
              {
                type: 'text',
                text: `Se cargaron datos de muestra correctamente en todas las cuentas corporativas.\nTotal cuentas: ${sample.accounts.length}`,
              },
            ],
          };
        }

        case 'clear_report': {
          reportStore.clearReport();
          return {
            content: [
              {
                type: 'text',
                text: 'Se limpiaron todas las actividades del reporte semanal.',
              },
            ],
          };
        }

        case 'download_pdf_report': {
          const { generateServerPdf } = await import('./pdfServerGenerator.ts');
          const report = reportStore.getReport();
          const pdfBuffer = generateServerPdf();
          const base64Pdf = pdfBuffer.toString('base64');
          const weekClean = (report.metadata.week || 'Semana').replace(/[^a-zA-Z0-9]/g, '_');
          const dateClean = (report.metadata.cutoffDate || '2026').replace(/[^a-zA-Z0-9-]/g, '_');
          const filename = `Reporte_Semanal_ThomasWagner_${weekClean}_${dateClean}.pdf`;

          return {
            content: [
              {
                type: 'text',
                text: `✅ **Reporte Semanal generado exitosamente en PDF**\n\n📄 **Archivo:** \`${filename}\`\n👤 **Responsable:** ${report.metadata.responsible}\n📅 **Fecha de Corte:** ${report.metadata.cutoffDate}\n\n🔗 **Enlace de Descarga Directa:**\n[📥 Descargar ${filename}](/api/report/pdf)\n\n*El PDF incluye el formato oficial de Thomas Wagner.MX con resumen ejecutivo, branding rojo corporativo y el desglose de todas las cuentas y proyectos.*`,
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
          };
        }

        default:
          throw new Error(`Herramienta no reconocida: ${name}`);
      }
    } catch (err: any) {
      return {
        content: [
          {
            type: 'text',
            text: `Error al ejecutar ${name}: ${err?.message || err}`,
          },
        ],
        isError: true,
      };
    }
  });

  // 3. RESOURCES
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: 'report://current',
          name: 'Reporte Semanal Actual',
          mimeType: 'application/json',
          description: 'Objeto JSON completo del reporte semanal de estatus WMP.',
        },
        {
          uri: 'report://summary',
          name: 'Resumen Estadístico',
          mimeType: 'text/plain',
          description: 'Resumen formateado de estatus por cuenta.',
        },
      ],
    };
  });

  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;

    if (uri === 'report://current') {
      const data = reportStore.getReport();
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }

    if (uri === 'report://summary') {
      const summary = reportStore.getSummaryStats();
      const text = `REPORTE SEMANAL ${summary.week} (${summary.cutoffDate})
Responsable: ${summary.responsible} (${summary.department})
--------------------------------------------------
Totales: ${summary.totals.total} actividades | ${summary.totals.completed} completadas | ${summary.totals.inProgress} en proceso | ${summary.totals.blocked} bloqueadas | ${summary.totals.pending} pendientes

Por cuenta:
${summary.accountSummaries
  .map(
    (a) =>
      `• ${a.accountName}: ${a.totalActivities} activ. (✅${a.completed}, 🔄${a.inProgress}, 🚫${a.blocked}, ⏳${a.pending})`
  )
  .join('\n')}`;

      return {
        contents: [
          {
            uri,
            mimeType: 'text/plain',
            text,
          },
        ],
      };
    }

    throw new Error(`Recurso no encontrado: ${uri}`);
  });

  // 4. PROMPTS
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: 'generate-executive-summary',
          description:
            'Instrucción para que ChatGPT redacte un informe ejecutivo sintetizado listo para enviar a dirección.',
        },
        {
          name: 'review-blocked-projects',
          description:
            'Instrucción para analizar proyectos bloqueados y sugerir planes de mitigación.',
        },
      ],
    };
  });

  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name } = request.params;
    const report = reportStore.getReport();

    if (name === 'generate-executive-summary') {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Eres un consultor ejecutivo senior de WMP Mexico Advisors. Revisa el siguiente reporte semanal y redacta un correo de resumen ejecutivo conciso, elegante y directo para dirección con los logros principales, focos rojos y siguientes pasos:\n\n${JSON.stringify(
                report,
                null,
                2
              )}`,
            },
          },
        ],
      };
    }

    if (name === 'review-blocked-projects') {
      return {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `Analiza las actividades con estatus "Bloqueado" o "Pendiente" en el siguiente reporte semanal e identifica riesgos clave y recomendaciones tácticas para desbloquear los proyectos:\n\n${JSON.stringify(
                report,
                null,
                2
              )}`,
            },
          },
        ],
      };
    }

    throw new Error(`Prompt no encontrado: ${name}`);
  });

  return server;
}

// Map of active SSE sessions
export const sseTransports = new Map<string, SSEServerTransport>();
