import React, { useState, useEffect } from 'react';
import {
  Bot,
  Check,
  Copy,
  ExternalLink,
  Play,
  Sparkles,
  X,
  Zap,
  Server,
  Code2,
  HelpCircle,
  RefreshCw,
  Layers,
  FileCode,
} from 'lucide-react';
import { FIXED_ACCOUNTS } from '../config/accounts';

interface McpStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshLocalState: () => void;
}

export const McpStatusModal: React.FC<McpStatusModalProps> = ({
  isOpen,
  onClose,
  onRefreshLocalState,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [mcpInfo, setMcpInfo] = useState<any>(null);
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'tester' | 'guide'>('overview');

  // Tester State
  const [selectedTool, setSelectedTool] = useState<string>('add_activity');
  const [testAccount, setTestAccount] = useState<string>('Thomas Wagner.mx');
  const [testTopic, setTestTopic] = useState<string>('Estrategia de expansión digital y marcas');
  const [testStatus, setTestStatus] = useState<string>('En proceso');
  const [testUpdate, setTestUpdate] = useState<string>('Enviada documentación inicial al SAT');
  const [testResult, setTestResult] = useState<any>(null);
  const [testingTool, setTestingTool] = useState<boolean>(false);

  // Dynamic Origin
  const [origin, setOrigin] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  // Fetch MCP info
  const fetchMcpInfo = async () => {
    setLoadingInfo(true);
    try {
      const res = await fetch('/api/mcp/info');
      const data = await res.json();
      setMcpInfo(data);
    } catch (e) {
      console.error('Error fetching MCP info:', e);
    } finally {
      setLoadingInfo(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMcpInfo();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const openApiUrl = `${origin}/api/openapi.json`;
  const mcpSseUrl = `${origin}/api/mcp/sse`;
  const mcpJsonRpcUrl = `${origin}/api/mcp`;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleRunToolTest = async () => {
    setTestingTool(true);
    setTestResult(null);

    try {
      if (selectedTool === 'get_full_report') {
        const res = await fetch('/api/report');
        const data = await res.json();
        setTestResult(data);
      } else if (selectedTool === 'get_accounts_list') {
        const res = await fetch('/api/report/accounts');
        const data = await res.json();
        setTestResult(data);
      } else if (selectedTool === 'get_account_activities') {
        const reportRes = await fetch('/api/report');
        const reportData = await reportRes.json();
        const foundAcc = reportData?.accounts?.find(
          (a: any) =>
            a.accountName.toLowerCase().includes(testAccount.toLowerCase()) ||
            a.accountId.toLowerCase().includes(testAccount.toLowerCase())
        );
        setTestResult(foundAcc || { message: `No se encontró la cuenta ${testAccount}` });
      } else if (selectedTool === 'get_report_summary') {
        const res = await fetch('/api/report/summary');
        const data = await res.json();
        setTestResult(data);
      } else if (selectedTool === 'add_activity') {
        const res = await fetch('/api/report/activity', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            accountIdentifier: testAccount,
            topic: testTopic,
            status: testStatus,
            update: testUpdate,
          }),
        });
        const data = await res.json();
        setTestResult(data);
        onRefreshLocalState();
      } else if (selectedTool === 'download_pdf_report') {
        window.open('/api/report/pdf', '_blank');
        setTestResult({
          status: 'success',
          message: 'Se generó y abrió el archivo PDF del reporte en una nueva pestaña.',
          pdfUrl: `${origin}/api/report/pdf`,
        });
      } else if (selectedTool === 'load_sample_data') {
        const res = await fetch('/api/report/sample-data', { method: 'POST' });
        const data = await res.json();
        setTestResult(data);
        onRefreshLocalState();
      } else if (selectedTool === 'clear_report') {
        const res = await fetch('/api/report/activities', { method: 'DELETE' });
        const data = await res.json();
        setTestResult(data);
        onRefreshLocalState();
      }
    } catch (err: any) {
      setTestResult({ error: err?.message || 'Error executing test' });
    } finally {
      setTestingTool(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-500/20 border border-indigo-400/30 rounded-xl text-indigo-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Control por ChatGPT / Servidor MCP
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  MCP Activo
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Model Context Protocol (MCP) & OpenAI Custom Actions habilitados
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Enlaces de Conexión</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
              activeTab === 'guide'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Guía de Configuración en ChatGPT</span>
          </button>

          <button
            onClick={() => setActiveTab('tester')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors flex items-center space-x-1.5 ${
              activeTab === 'tester'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Probar Herramientas MCP</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Box ChatGPT Action (OpenAPI) */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileCode className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                      1. URL OpenAPI para ChatGPT Actions (Custom GPT)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    Recomendado para ChatGPT
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Importa esta URL dentro de las <b>Acciones de tu Custom GPT</b> en ChatGPT para que
                  el agente lea, cree y actualice reportes con lenguaje natural.
                </p>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={openApiUrl}
                    className="flex-1 text-xs font-mono bg-white px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-hidden"
                  />
                  <button
                    onClick={() => handleCopy(openApiUrl, 'openapi')}
                    className="inline-flex items-center px-3 py-2 text-xs font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-2xs transition-colors shrink-0"
                  >
                    {copiedField === 'openapi' ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1" /> Copiar URL
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Box MCP Standard SSE Endpoint */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                      2. Endpoint MCP SSE (Model Context Protocol Standard)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Clientes MCP / Claude / Cursor
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Para clientes MCP compatibles con el estándar de Anthropic/OpenAI mediante Server-Sent Events (SSE).
                </p>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    readOnly
                    value={mcpSseUrl}
                    className="flex-1 text-xs font-mono bg-white px-3 py-2 rounded-lg border border-slate-300 text-slate-800 focus:outline-hidden"
                  />
                  <button
                    onClick={() => handleCopy(mcpSseUrl, 'sse')}
                    className="inline-flex items-center px-3 py-2 text-xs font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 cursor-pointer shadow-2xs transition-colors shrink-0"
                  >
                    {copiedField === 'sse' ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1 text-slate-500" /> Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Herramientas Disponibles */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>12 Herramientas MCP Habilitadas para el Agente</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">get_full_report</span>
                    <span className="text-[11px] text-slate-500">Obtiene metadatos y todas las actividades.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">get_accounts_list</span>
                    <span className="text-[11px] text-slate-500">Lista las cuentas corporativas configuradas.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">get_account_activities</span>
                    <span className="text-[11px] text-slate-500">Consulta las actividades de una sola cuenta.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">get_report_summary</span>
                    <span className="text-[11px] text-slate-500">Métricas de avance, bloqueos y totales.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">add_activity</span>
                    <span className="text-[11px] text-slate-500">Agrega tema, estatus y avance a una cuenta.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">batch_add_activities</span>
                    <span className="text-[11px] text-slate-500">Agrega múltiples actividades en un solo paso.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">update_activity</span>
                    <span className="text-[11px] text-slate-500">Modifica estatus o detalle por ID.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">delete_activity</span>
                    <span className="text-[11px] text-slate-500">Elimina una actividad de una cuenta.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">update_metadata</span>
                    <span className="text-[11px] text-slate-500">Actualiza semana, fecha y responsable.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">download_pdf_report</span>
                    <span className="text-[11px] text-slate-500">Genera y entrega el PDF en la conversación.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">load_sample_data</span>
                    <span className="text-[11px] text-slate-500">Carga datos corporativos de prueba.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-indigo-900 block">clear_report</span>
                    <span className="text-[11px] text-slate-500">Limpia todas las actividades del reporte.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-5 text-xs text-slate-700 leading-relaxed">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-indigo-950 space-y-2">
                <h4 className="font-black text-sm text-indigo-900 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>¿Cómo conectar ChatGPT a esta aplicación en 3 pasos?</span>
                </h4>
                <p className="text-xs text-indigo-800">
                  Puedes darle control total a ChatGPT creando una Acción Personalizada en ChatGPT Custom GPTs.
                </p>
              </div>

              <ol className="space-y-4">
                <li className="flex items-start space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Crear o Editar un Custom GPT en ChatGPT</strong>
                    <span>Ve a ChatGPT (chatgpt.com) → Explora GPTs → Crea un nuevo GPT ("Generador Reportes WMP").</span>
                  </div>
                </li>

                <li className="flex items-start space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Importar la especificación de Acciones</strong>
                    <span>
                      En la pestaña <b>Configurar</b> de tu GPT, ve al final a la sección <b>Acciones (Actions)</b> → Haz clic en <b>Import from URL</b> → Pega la URL:
                    </span>
                    <div className="mt-2 p-2 bg-white rounded border border-slate-300 font-mono text-[11px] text-indigo-700 select-all">
                      {openApiUrl}
                    </div>
                  </div>
                </li>

                <li className="flex items-start space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </span>
                  <div>
                    <strong className="text-slate-900 block mb-0.5">¡Listo! Comienza a conversar con tu Agente</strong>
                    <p className="mb-2">Prueba pedirle a ChatGPT frases como:</p>
                    <div className="space-y-1.5 font-medium">
                      <div className="p-2 bg-white rounded border border-slate-200 text-slate-800">
                        💬 <i>"Lee el reporte semanal actual y hazme un resumen ejecutivo de lo completado."</i>
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200 text-slate-800">
                        💬 <i>"Agrega una actividad en la cuenta WMP Mexico Advisors sobre la auditoría fiscal con estatus Completado."</i>
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200 text-slate-800">
                        💬 <i>"Genera el PDF del reporte semanal de estatus y dame el enlace de descarga."</i>
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200 text-slate-800">
                        💬 <i>"Dime qué proyectos están bloqueados y sugiere un plan de acción para cada uno."</i>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'tester' && (
            <div className="space-y-5">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                  Simulador de Ejecución MCP
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">
                      Herramienta MCP a Ejecutar
                    </label>
                    <select
                      value={selectedTool}
                      onChange={(e) => setSelectedTool(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="add_activity">add_activity (Agregar Actividad)</option>
                      <option value="get_full_report">get_full_report (Obtener Reporte Completo)</option>
                      <option value="get_accounts_list">get_accounts_list (Listar Cuentas)</option>
                      <option value="get_account_activities">get_account_activities (Actividades de una Cuenta)</option>
                      <option value="get_report_summary">get_report_summary (Resumen de Métricas)</option>
                      <option value="download_pdf_report">download_pdf_report (Generar y Descargar PDF)</option>
                      <option value="load_sample_data">load_sample_data (Cargar Muestra)</option>
                      <option value="clear_report">clear_report (Limpiar Actividades)</option>
                    </select>
                  </div>

                  {(selectedTool === 'add_activity' || selectedTool === 'get_account_activities') && (
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Cuenta Destino</label>
                      <select
                        value={testAccount}
                        onChange={(e) => setTestAccount(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                      >
                        {FIXED_ACCOUNTS.map((a) => (
                          <option key={a.id} value={a.name}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {selectedTool === 'add_activity' && (
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Tema / Proyecto</label>
                      <input
                        type="text"
                        value={testTopic}
                        onChange={(e) => setTestTopic(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Estatus</label>
                        <select
                          value={testStatus}
                          onChange={(e) => setTestStatus(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="En proceso">En proceso</option>
                          <option value="Bloqueado">Bloqueado</option>
                          <option value="Completado">Completado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-bold mb-1">Detalle / Avance</label>
                        <input
                          type="text"
                          value={testUpdate}
                          onChange={(e) => setTestUpdate(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleRunToolTest}
                  disabled={testingTool}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {testingTool ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4 fill-white" />
                  )}
                  <span>Ejecutar Acción MCP</span>
                </button>
              </div>

              {/* Resultado de la llamada */}
              {testResult && (
                <div className="bg-slate-900 rounded-xl p-4 text-emerald-400 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Respuesta del Servidor MCP:</span>
                    <span>200 OK</span>
                  </div>
                  <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed text-[11px]">
                    {JSON.stringify(testResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onRefreshLocalState();
              fetchMcpInfo();
            }}
            className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Sincronizar Estado con la App
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
