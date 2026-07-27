import { FIXED_ACCOUNTS } from '../config/accounts';
import { SAMPLE_REPORT_DATA } from '../data/sampleReport';
import { FullReportData, GeneralMetadata, ActivityItem, AccountReport, ActivityStatus } from '../types/report';

function createDefaultReportData(): FullReportData {
  const todayStr = new Date().toISOString().split('T')[0];
  return {
    metadata: {
      week: 'Semana 30',
      cutoffDate: todayStr,
      responsible: 'Norma Castañeda',
      department: 'Gerencia de Consultoría & Proyectos',
      phone: '+52 442 209 6850',
      email: 'norma.castaneda@wmp-mexico.com',
    },
    accounts: FIXED_ACCOUNTS.map((acc) => ({
      accountId: acc.id,
      accountName: acc.name,
      activities: [],
    })),
  };
}

class ReportStore {
  private data: FullReportData;
  private listeners: Array<() => void> = [];

  constructor() {
    this.data = SAMPLE_REPORT_DATA;
  }

  public getReport(): FullReportData {
    return JSON.parse(JSON.stringify(this.data));
  }

  public setReport(newReport: FullReportData): FullReportData {
    // Ensure all fixed accounts exist
    const accountsMap = new Map(newReport.accounts.map((a) => [a.accountId, a]));
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

    this.data = {
      metadata: { ...newReport.metadata },
      accounts: fullAccounts,
    };
    this.notify();
    return this.getReport();
  }

  public updateMetadata(partial: Partial<GeneralMetadata>): GeneralMetadata {
    this.data.metadata = {
      ...this.data.metadata,
      ...partial,
    };
    this.notify();
    return { ...this.data.metadata };
  }

  public addActivity(
    accountIdentifier: string,
    topic: string,
    status: ActivityStatus = 'En proceso',
    update: string = ''
  ): { success: boolean; message: string; activity?: ActivityItem; accountName?: string } {
    const search = accountIdentifier.toLowerCase().trim();
    const account = this.data.accounts.find(
      (a) =>
        a.accountId.toLowerCase() === search ||
        a.accountName.toLowerCase().includes(search) ||
        search.includes(a.accountName.toLowerCase())
    );

    if (!account) {
      return {
        success: false,
        message: `No se encontró la cuenta '${accountIdentifier}'. Cuentas disponibles: ${FIXED_ACCOUNTS.map(
          (a) => a.name
        ).join(', ')}`,
      };
    }

    const newActivity: ActivityItem = {
      id: 'act-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5),
      topic,
      status,
      update,
    };

    account.activities.push(newActivity);
    this.notify();

    return {
      success: true,
      message: `Actividad agregada exitosamente a la cuenta ${account.accountName}`,
      activity: newActivity,
      accountName: account.accountName,
    };
  }

  public updateActivity(
    accountIdentifier: string,
    activityId: string,
    updates: { topic?: string; status?: ActivityStatus; update?: string }
  ): { success: boolean; message: string; activity?: ActivityItem } {
    const search = accountIdentifier.toLowerCase().trim();
    const account = this.data.accounts.find(
      (a) =>
        a.accountId.toLowerCase() === search ||
        a.accountName.toLowerCase().includes(search) ||
        search.includes(a.accountName.toLowerCase())
    );

    if (!account) {
      return {
        success: false,
        message: `No se encontró la cuenta '${accountIdentifier}'.`,
      };
    }

    const actIndex = account.activities.findIndex((a) => a.id === activityId);
    if (actIndex === -1) {
      return {
        success: false,
        message: `No se encontró la actividad con ID '${activityId}' en la cuenta ${account.accountName}.`,
      };
    }

    const act = account.activities[actIndex];
    if (updates.topic !== undefined) act.topic = updates.topic;
    if (updates.status !== undefined) act.status = updates.status;
    if (updates.update !== undefined) act.update = updates.update;

    this.notify();

    return {
      success: true,
      message: `Actividad '${act.topic}' actualizada correctamente.`,
      activity: { ...act },
    };
  }

  public deleteActivity(
    accountIdentifier: string,
    activityId: string
  ): { success: boolean; message: string } {
    const search = accountIdentifier.toLowerCase().trim();
    const account = this.data.accounts.find(
      (a) =>
        a.accountId.toLowerCase() === search ||
        a.accountName.toLowerCase().includes(search) ||
        search.includes(a.accountName.toLowerCase())
    );

    if (!account) {
      return {
        success: false,
        message: `No se encontró la cuenta '${accountIdentifier}'.`,
      };
    }

    const initialLength = account.activities.length;
    account.activities = account.activities.filter((a) => a.id !== activityId);

    if (account.activities.length === initialLength) {
      return {
        success: false,
        message: `No se encontró la actividad con ID '${activityId}' para eliminar.`,
      };
    }

    this.notify();

    return {
      success: true,
      message: `Actividad eliminada de la cuenta ${account.accountName}.`,
    };
  }

  public loadSampleData(): FullReportData {
    this.data = JSON.parse(JSON.stringify(SAMPLE_REPORT_DATA));
    this.notify();
    return this.getReport();
  }

  public clearReport(): FullReportData {
    this.data.accounts.forEach((acc) => {
      acc.activities = [];
    });
    this.notify();
    return this.getReport();
  }

  public getSummaryStats() {
    let total = 0;
    let completed = 0;
    let inProgress = 0;
    let blocked = 0;
    let pending = 0;

    const accountSummaries = this.data.accounts.map((acc) => {
      const c = acc.activities.filter((a) => a.status === 'Completado').length;
      const p = acc.activities.filter((a) => a.status === 'En proceso').length;
      const b = acc.activities.filter((a) => a.status === 'Bloqueado').length;
      const pend = acc.activities.filter((a) => a.status === 'Pendiente').length;

      total += acc.activities.length;
      completed += c;
      inProgress += p;
      blocked += b;
      pending += pend;

      return {
        accountId: acc.accountId,
        accountName: acc.accountName,
        totalActivities: acc.activities.length,
        completed: c,
        inProgress: p,
        blocked: b,
        pending: pend,
      };
    });

    return {
      week: this.data.metadata.week,
      cutoffDate: this.data.metadata.cutoffDate,
      responsible: this.data.metadata.responsible,
      department: this.data.metadata.department,
      totals: {
        total,
        completed,
        inProgress,
        blocked,
        pending,
      },
      accountSummaries,
    };
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (e) {
        console.error('Error in listener:', e);
      }
    });
  }
}

export const reportStore = new ReportStore();
