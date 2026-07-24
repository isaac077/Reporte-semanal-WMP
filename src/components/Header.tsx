import React from 'react';
import { FileText, Sparkles, Download, Eye } from 'lucide-react';

interface HeaderProps {
  onLoadSampleData: () => void;
  onGeneratePdf: () => void;
  activeView: 'edit' | 'preview';
  setActiveView: (view: 'edit' | 'preview') => void;
  isGeneratingPdf: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onLoadSampleData,
  onGeneratePdf,
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
            <div className="w-11 h-11 rounded-xl bg-[#0F3D64] flex items-center justify-center text-white shadow-md shadow-slate-900/10 shrink-0">
              {/* Logo SVG WMP */}
              <svg className="w-7 h-7 text-sky-300 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold tracking-wider text-[#0B4F82] uppercase">
                  WMP Mexico Advisors
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-[#0F3D64] border border-sky-200/80">
                  Sistema de Reportes
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                Reporte Semanal de Estatus
              </h1>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
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

