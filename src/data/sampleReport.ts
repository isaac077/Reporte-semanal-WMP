import { FullReportData } from '../types/report';

export const SAMPLE_REPORT_DATA: FullReportData = {
  metadata: {
    week: 'Semana 30',
    cutoffDate: '2026-07-24',
    responsible: 'Norma Castañeda',
    department: 'Gerencia de Consultoría & Proyectos',
  },
  accounts: [
    {
      accountId: 'wmp-mexico-advisors',
      accountName: 'WMP Mexico Advisors',
      activities: [
        {
          id: 'wmp-1',
          topic: 'Cierre Fiscal Mensual y Auditoría Interna',
          status: 'Completado',
          update: 'Se concluyó la revisión de estados financieros del trimestre y la conciliación de impuestos.',
        },
        {
          id: 'wmp-2',
          topic: 'Migración de ERP Corporativo',
          status: 'En proceso',
          update: 'Configuración de módulos de nómina y facturación. Fase de pruebas programada para la próxima semana.',
        },
      ],
    },
    {
      accountId: 'the-wmp-club',
      accountName: 'The WMP Club',
      activities: [
        {
          id: 'club-1',
          topic: 'Organización del Networking Executive Breakfast',
          status: 'Completado',
          update: 'Confirmación de 45 ejecutivos asistentes y contratación del venue en Querétaro.',
        },
        {
          id: 'club-2',
          topic: 'Lanzamiento de Plataforma de Membresías Digitales',
          status: 'Pendiente',
          update: 'Pendiente aprobación final de términos legales por el área jurídica.',
        },
      ],
    },
    {
      accountId: 'consul',
      accountName: 'Cónsul',
      activities: [
        {
          id: 'consul-1',
          topic: 'Revisión Contratación y Estructura M&A',
          status: 'En proceso',
          update: 'Análisis Due Diligence financiero preliminar para el cliente del sector automotriz.',
        },
        {
          id: 'consul-2',
          topic: 'Dictamen de Precios de Transferencia',
          status: 'Bloqueado',
          update: 'En espera de la entrega de estados financieros auditados del ejercicio anterior por parte del cliente.',
        },
      ],
    },
    {
      accountId: 'acensblue',
      accountName: 'Acensblue',
      activities: [
        {
          id: 'acens-1',
          topic: 'Búsqueda de Directivos Bilingües (Headhunting)',
          status: 'En proceso',
          update: 'Presentación de terna finalista para el puesto de Plant Manager en Bajío.',
        },
      ],
    },
    {
      accountId: 'centro-aleman-queretaro',
      accountName: 'Centro Alemán Querétaro',
      activities: [
        {
          id: 'caq-1',
          topic: 'Renovación de Certificaciones de Lengua Técnica',
          status: 'Completado',
          update: 'Acreditación concedida para 30 ingenieros de empresas alemanas aliadas.',
        },
        {
          id: 'caq-2',
          topic: 'Convenio de Formación Dual 2026-2027',
          status: 'Pendiente',
          update: 'Siguiente paso: Firma protocolaria de convenio institucional el próximo 10 de agosto.',
        },
      ],
    },
  ],
};
