import { ActivityStatus, FullReportData } from '../types/report';

/**
 * Sanitiza un texto para usarlo de forma segura en un nombre de archivo.
 * Elimina acentos, caracteres especiales y reemplaza espacios por guiones bajos.
 */
export function sanitizeStringForFilename(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-zA-Z0-9\-_]/g, '_') // Reemplaza caracteres no alfanuméricos por _
    .replace(/_+/g, '_') // Elimina guiones bajos repetidos
    .replace(/^_+|_+$/g, ''); // Remueve guiones al inicio o final
}

/**
 * Genera el nombre automático del reporte en formato:
 * Reporte_Semanal_WMP_[fecha-de-corte]_[responsable].pdf
 */
export function generateReportFilename(cutoffDate: string, responsible: string): string {
  const safeDate = sanitizeStringForFilename(cutoffDate || new Date().toISOString().split('T')[0]);
  const safeResp = sanitizeStringForFilename(responsible || 'General');
  return `Reporte_Semanal_WMP_${safeDate}_${safeResp}.pdf`;
}

/**
 * Devuelve el estilo de color y etiqueta para cada estatus de actividad.
 */
export function getStatusBadgeConfig(status: ActivityStatus) {
  switch (status) {
    case 'Completado':
      return {
        label: 'Completado',
        bgClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        pdfColor: '#059669',
        badgeBgPdf: '#E6F4EA',
      };
    case 'En proceso':
      return {
        label: 'En proceso',
        bgClass: 'bg-sky-100 text-sky-800 border-sky-300',
        pdfColor: '#0284C7',
        badgeBgPdf: '#E0F2FE',
      };
    case 'Bloqueado':
      return {
        label: 'Bloqueado',
        bgClass: 'bg-rose-100 text-rose-800 border-rose-300',
        pdfColor: '#E11D48',
        badgeBgPdf: '#FFE4E6',
      };
    case 'Pendiente':
    default:
      return {
        label: 'Pendiente',
        bgClass: 'bg-amber-100 text-amber-800 border-amber-300',
        pdfColor: '#D97706',
        badgeBgPdf: '#FEF3C7',
      };
  }
}

/**
 * Calcula estadísticas de actividades del reporte
 */
export function getReportSummaryStats(report: FullReportData) {
  let totalActivities = 0;
  let completed = 0;
  let inProgress = 0;
  let blocked = 0;
  let pending = 0;

  report.accounts.forEach((acc) => {
    acc.activities.forEach((act) => {
      totalActivities++;
      if (act.status === 'Completado') completed++;
      else if (act.status === 'En proceso') inProgress++;
      else if (act.status === 'Bloqueado') blocked++;
      else if (act.status === 'Pendiente') pending++;
    });
  });

  return { totalActivities, completed, inProgress, blocked, pending };
}

/**
 * Formatea fechas para mostrar en pantalla
 */
export function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '';
  if (dateStr.includes('/')) return dateStr;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

/**
 * Calcula automáticamente el número de semana ("Semana X") a partir de una fecha de corte YYYY-MM-DD
 */
export function getWeekNumberFromDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return '';

  // Cálculo ISO-8601 de número de semana
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  const weekNum = 1 + Math.round((firstThursday - target.valueOf()) / 604800000);
  return `Semana ${weekNum}`;
}
