import React from 'react';
import { FileText, Sparkles, Download, Eye, Bot } from 'lucide-react';
import { WmpLogo } from './WmpLogo';

interface HeaderProps {
  onLoadSampleData: () => void;
  onGeneratePdf: () => void;
  onOpenMcpModal: () => void;
  activeView: 'edit' | 'preview';
  setActiveView: (view: 'edit' | 'preview') => void;
  isGeneratingPdf: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadSampleData,
  onGeneratePdf,
  onOpenMcpModal,
  activeView,
  setActiveView,
  isGeneratingPdf,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      {/* Línea de acento azul superior */}
      <div className="h-1.5 bg-gradient-to-r from-[#0F3D64] via-[#0B4F82] to-[#0284C7]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo y Título Principal */}
          <div className="flex items-center space-x-3.5">
            <WmpLogo size="lg" />
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-[#0F3D64] border border-sky-200/80">
                  Sistema de Reportes
                </span>
                <button
                  onClick={onOpenMcpModal}
                  type="button"
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse" />
                  Agente MCP
                </button>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Reporte Semanal de Estatus
              </h1>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* Botón ChatGPT / MCP */}
            <button
              onClick={onOpenMcpModal}
              type="button"
              className="inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-lg text-indigo-950 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
              title="Abrir configuración y enlaces de conexión para ChatGPT y Servidor MCP"
            >
              <Bot className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
              <span>Control ChatGPT / MCP</span>
            </button>

            {/* Cargar Datos de Ejemplo */}
            <button
              onClick={onLoadSampleData}
              type="button"
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
              title="Pre-llenar con datos de muestra realistas"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
              <span>Ejemplo</span>
            </button>

            {/* Alternar Vista Captura / Vista Previa */}
            <div className="bg-slate-100 p-0.5 rounded-lg border border-slate-200 flex items-center">
              <button
                onClick={() => setActiveView('edit')}
                type="button"
                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activeView === 'edit'
                    ? 'bg-white text-[#0F3D64] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 mr-1" />
                Captura
              </button>

              <button
                onClick={() => setActiveView('preview')}
                type="button"
                className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                  activeView === 'preview'
                    ? 'bg-white text-[#0F3D64] shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5 mr-1" />
                Vista Previa
              </button>
            </div>

            {/* Generar PDF Principal */}
            <button
              onClick={onGeneratePdf}
              disabled={isGeneratingPdf}
              type="button"
              className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-lg text-white bg-[#0F3D64] hover:bg-[#0B4F82] shadow-sm shadow-[#0F3D64]/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPdf ? (
                <>
                  <svg className="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Descargar Reporte PDF
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

