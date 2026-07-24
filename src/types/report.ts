export type ActivityStatus = 'Pendiente' | 'En proceso' | 'Bloqueado' | 'Completado';

export interface ActivityItem {
  id: string;
  topic: string;
  status: ActivityStatus;
  update: string;
}

export interface AccountReport {
  accountId: string;
  accountName: string;
  activities: ActivityItem[];
}

export interface GeneralMetadata {
  week: string;           // e.g. "Semana 30" or "30"
  cutoffDate: string;     // e.g. "2026-07-24" or "24/07/2026"
  responsible: string;    // e.g. "Juan Pérez"
  department: string;     // e.g. "Consultoría / Sr. Advisor"
}

export interface FullReportData {
  metadata: GeneralMetadata;
  accounts: AccountReport[];
}
