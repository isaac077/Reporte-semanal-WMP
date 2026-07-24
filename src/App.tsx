import React, { useState, useEffect } from 'react';
import { FIXED_ACCOUNTS } from './config/accounts';
import { AccountReport, ActivityItem, FullReportData, GeneralMetadata } from './types/report';
import { SAMPLE_REPORT_DATA } from './data/sampleReport';
import { getReportSummaryStats, getWeekNumberFromDate } from './utils/helpers';
import { downloadPdfBlob, generatePdfFromElement } from './utils/pdfGenerator';

import { Header } from './components/Header';
import { GeneralInfoForm } from './components/GeneralInfoForm';
import { AccountSelectorTabs } from './components/AccountSelectorTabs';
import { AccountActivitiesTable } from './components/AccountActivitiesTable';
import { ReportPreview } from './components/ReportPreview';
import { Toast, ToastMessage } from './components/Toast';
import { WmpLogo } from './components/WmpLogo';

import {
  FileText,
  Eye,
  CheckCircle2,
  RotateCcw,
  Download,
} from 'lucide-react';

const STORAGE_KEY = 'wmp_weekly_report_draft_v1';

// Estado inicial por defecto con las 5 cuentas fijas
const createDefaultReportData = (): FullReportData => {
  const todayStr = new Date().toISOString().split('T')[0];
  const initialWeek = getWeekNumberFromDate(todayStr) || 'Semana 30';
  return {
    metadata: {
      week: initialWeek,
      cutoffDate: todayStr,
      responsible: '',
      department: '',
    },
    accounts: FIXED_ACCOUNTS.map((acc) => ({
      accountId: acc.id,
      accountName: acc.name,
      activities: [],
    })),
  };
};

export default function App() {
  // Cargar borrador inicial desde localStorage
  const [reportData, setReportData] = useState<FullReportData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.metadata && Array.isArray(parsed.accounts)) {
          // Asegurar que existan todas las cuentas fijas
          const accountsMap = new Map(parsed.accounts.map((a: AccountReport) => [a.accountId, a]));
          const fullAccounts = FIXED_ACCOUNTS.map((fixed) => {
            const existing = accountsMap.get(fixed.id);
            return (
              existing || {
                accountId: fixed.id,
                accountName: fixed.name,
                activities: [],
              }
            );
          });
          return {
            metadata: parsed.metadata,
            accounts: fullAccounts,
          };
        }
      }
    } catch (e) {
      console.warn('Error al restaurar el borrador:', e);
    }
    return createDefaultReportData();
  });

  // Pestaña de cuenta seleccionada ('all' o ID de cuenta fija)
  const [selectedAccountId, setSelectedAccountId] = useState<string>('all');

  // Modo de vista ('edit' | 'preview')
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');

  // Estados de generación
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // Notificaciones Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Guardar en localStorage ante cambios
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reportData));
    } catch (e) {
      console.warn('Error al guardar en localStorage:', e);
    }
  }, [reportData]);

  // Actualizar metadatos
  const handleMetadataChange = (updatedMetadata: GeneralMetadata) => {
    setReportData((prev) => ({
      ...prev,
      metadata: updatedMetadata,
    }));
  };

  // Actualizar actividades de una cuenta específica
  const handleUpdateActivities = (accountId: string, updatedActivities: ActivityItem[]) => {
    setReportData((prev) => ({
      ...prev,
      accounts: prev.accounts.map((acc) => {
        if (acc.accountId === accountId) {
          return { ...acc, activities: updatedActivities };
        }
        return acc;
      }),
    }));
  };

  // Cargar datos de ejemplo realistas
  const handleLoadSampleData = () => {
    setReportData(SAMPLE_REPORT_DATA);
    setToast({
      id: Date.now().toString(),
      type: 'info',
      title: 'Datos de muestra cargados',
      message: 'Se han pre-llenado temas y estatus representativos para todas las cuentas.',
    });
  };

  // Resetear el reporte
  const handleResetForm = () => {
    if (window.confirm('¿Está seguro de que desea limpiar todos los campos del reporte?')) {
      setReportData(createDefaultReportData());
      localStorage.removeItem(STORAGE_KEY);
      setToast({
        id: Date.now().toString(),
        type: 'info',
        title: 'Formulario limpiado',
        message: 'Se han restablecido los campos de captura.',
      });
    }
  };

  // Validaciones antes de generar PDF
  const validateReport = (): boolean => {
    const { metadata, accounts } = reportData;

    if (!metadata.week.trim()) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Campo incompleto',
        message: 'Por favor, ingrese el número o nombre de la Semana (ej. Semana 30).',
      });
      return false;
    }

    if (!metadata.cutoffDate.trim()) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Campo incompleto',
        message: 'Por favor, seleccione la Fecha de corte del reporte.',
      });
      return false;
    }

    if (!metadata.responsible.trim()) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Campo incompleto',
        message: 'Por favor, ingrese el nombre del Responsable del reporte.',
      });
      return false;
    }

    if (!metadata.department.trim()) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Campo incompleto',
        message: 'Por favor, ingrese el Área / Puesto.',
      });
      return false;
    }

    const totalActivities = accounts.reduce((acc, current) => acc + current.activities.length, 0);

    if (totalActivities === 0) {
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Sin actividades capturadas',
        message: 'Debe agregar al menos un tema o proyecto en alguna de las cuentas para generar el PDF.',
      });
      return false;
    }

    return true;
  };

  // Confirmar y generar PDF
  const handleGeneratePdf = async () => {
    if (!validateReport()) return;

    setIsGeneratingPdf(true);

    try {
      // Si estamos en modo captura, cambiamos brevemente a modo preview para renderizar el contenedor
      setActiveView('preview');

      // Pequeño delay para asegurar renderizado del DOM en la vista de preview
      await new Promise((resolve) => setTimeout(resolve, 300));

      const { pdfBlob, pdfBase64, filename } = await generatePdfFromElement(
        'report-pdf-canvas-container',
        reportData.metadata.cutoffDate,
        reportData.metadata.responsible
      );

      // 1. Descargar localmente en el navegador
      downloadPdfBlob(pdfBlob, filename);

      setToast({
        id: Date.now().toString(),
        type: 'success',
        title: 'PDF Generado y Descargado',
        message: `El archivo "${filename}" se ha descargado correctamente en su equipo.`,
      });
    } catch (error: any) {
      console.error('Error al generar PDF:', error);
      setToast({
        id: Date.now().toString(),
        type: 'error',
        title: 'Error al procesar el PDF',
        message: error?.message || 'No se pudo renderizar el PDF. Intente nuevamente.',
      });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Calcular estadísticas de estatus
  const stats = getReportSummaryStats(reportData);

  // Cuentas a mostrar según la pestaña elegida
  const accountsToDisplay =
    selectedAccountId === 'all'
      ? reportData.accounts
      : reportData.accounts.filter((a) => a.accountId === selectedAccountId);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col justify-between">
      {/* Encabezado Superior */}
      <Header
        onLoadSampleData={handleLoadSampleData}
        onGeneratePdf={handleGeneratePdf}
        activeView={activeView}
        setActiveView={setActiveView}
        isGeneratingPdf={isGeneratingPdf}
      />

      {/* Contenido Principal */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        
        {/* Banner Informativo y Resumen de Avance */}
        <div className="bg-gradient-to-r from-[#0F3D64] via-[#0B4F82] to-[#1E40AF] rounded-2xl p-4 sm:p-5 text-white shadow-lg shadow-[#0F3D64]/10 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-md bg-white/10 text-sky-200 border border-white/10">
                  Formato Oficial
                </span>
                <span className="text-xs text-sky-200/90 font-medium">
                  {reportData.metadata.week || 'Semana'} • {reportData.metadata.cutoffDate || 'Fecha'}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                Seguimiento Semanal de Proyectos por Cuenta
              </h2>
              <p className="text-xs text-slate-200/90 max-w-2xl leading-relaxed">
                Capture avances, bloqueos y siguientes pasos. La información se conservará automáticamente entre cuentas.
              </p>
            </div>

            {/* Métrica Resumen */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 flex items-center space-x-4 shrink-0">
              <div className="text-center">
                <span className="block text-xl font-extrabold text-white">{stats.totalActivities}</span>
                <span className="block text-[10px] text-sky-200 font-semibold uppercase">Total</span>
              </div>
              <div className="h-7 w-px bg-white/20" />
              <div className="text-center">
                <span className="block text-xl font-extrabold text-emerald-300">{stats.completed}</span>
                <span className="block text-[10px] text-emerald-200 font-semibold uppercase">Listos</span>
              </div>
              <div className="h-7 w-px bg-white/20" />
              <div className="text-center">
                <span className="block text-xl font-extrabold text-sky-300">{stats.inProgress}</span>
                <span className="block text-[10px] text-sky-200 font-semibold uppercase">Proceso</span>
              </div>
              <div className="h-7 w-px bg-white/20" />
              <div className="text-center">
                <span className="block text-xl font-extrabold text-rose-300">{stats.blocked}</span>
                <span className="block text-[10px] text-rose-200 font-semibold uppercase">Bloqueados</span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN VISTA CAPTURA VS VISTA PREVIA */}
        {activeView === 'edit' ? (
          <div>
            {/* Formulario de Información General */}
            <GeneralInfoForm
              metadata={reportData.metadata}
              onChange={handleMetadataChange}
            />

            {/* Selector de Cuenta */}
            <AccountSelectorTabs
              selectedAccountId={selectedAccountId}
              onSelectAccount={setSelectedAccountId}
              accountsData={reportData.accounts}
            />

            {/* Tablas de Actividades por Cuenta */}
            <div className="space-y-6">
              {accountsToDisplay.map((acc) => (
                <AccountActivitiesTable
                  key={acc.accountId}
                  accountData={acc}
                  onUpdateActivities={handleUpdateActivities}
                />
              ))}
            </div>

            {/* Acciones Inferiores */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 mt-8 mb-6">
              <button
                onClick={handleResetForm}
                type="button"
                className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Limpiar datos del formulario
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveView('preview')}
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 mr-1.5 text-[#0F3D64]" />
                  Ver Vista Previa del PDF
                </button>

                <button
                  onClick={handleGeneratePdf}
                  disabled={isGeneratingPdf}
                  type="button"
                  className="inline-flex items-center px-5 py-2 text-xs font-bold rounded-lg text-white bg-[#0F3D64] hover:bg-[#0B4F82] shadow-md shadow-[#0F3D64]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-1.5" />
                  Confirmar y Generar PDF
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VISTA PREVIA OFICIAL DEL PDF */
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">
                  Vista Previa en Tiempo Real (Formato Carta Oficial)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveView('edit')}
                  type="button"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  ← Volver a Editar Captura
                </button>

                <button
                  onClick={handleGeneratePdf}
                  disabled={isGeneratingPdf}
                  type="button"
                  className="inline-flex items-center px-4 py-1.5 text-xs font-bold rounded-lg text-white bg-[#0F3D64] hover:bg-[#0B4F82] shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                  Descargar PDF Oficial
                </button>
              </div>
            </div>

            {/* Componente de Vista Previa HTML2Canvas / PDF Container */}
            <ReportPreview reportData={reportData} />
          </div>
        )}
      </main>

      {/* Pie de Página de la Aplicación Web */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-5 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <WmpLogo size="sm" isDark={true} />
          <span className="text-slate-500 text-[11px]">Reporte Semanal de Estatus</span>
        </div>
      </footer>

      {/* Componente de Notificaciones Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
