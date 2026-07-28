"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/config/accounts.ts
var FIXED_ACCOUNTS;
var init_accounts = __esm({
  "src/config/accounts.ts"() {
    FIXED_ACCOUNTS = [
      {
        id: "wmp-mexico-advisors",
        name: "WMP Mexico Advisors",
        description: "Servicios de asesor\xEDa fiscal, contable y corporativa"
      },
      {
        id: "the-wmp-club",
        name: "The WMP Club",
        description: "Comunidad ejecutiva y eventos exclusivos WMP"
      },
      {
        id: "consul",
        name: "HK",
        description: "Proyectos de consultor\xEDa empresarial y representaci\xF3n HK"
      },
      {
        id: "acensblue",
        name: "Acensblue",
        description: "Reclutamiento y gesti\xF3n de talento especializado"
      },
      {
        id: "centro-aleman-queretaro",
        name: "Centro Alem\xE1n Quer\xE9taro",
        description: "Centro de formaci\xF3n y servicios de vinculaci\xF3n alemana"
      },
      {
        id: "thomas-wagner-mx",
        name: "Thomas Wagner.mx",
        description: "Consultor\xEDa y soluciones estrat\xE9gicas Thomas Wagner.mx"
      }
    ];
  }
});

// src/data/sampleReport.ts
var SAMPLE_REPORT_DATA;
var init_sampleReport = __esm({
  "src/data/sampleReport.ts"() {
    SAMPLE_REPORT_DATA = {
      metadata: {
        week: "Semana 30",
        cutoffDate: "2026-07-24",
        responsible: "Thomas Wagner",
        department: "Business Development Agency",
        phone: "+52 442 181 7209",
        email: "wagner@thomaswagner.mx"
      },
      accounts: [
        {
          accountId: "wmp-mexico-advisors",
          accountName: "WMP Mexico Advisors",
          activities: [
            {
              id: "wmp-1",
              topic: "Cierre Fiscal Mensual y Auditor\xEDa Interna",
              status: "Completado",
              update: "Se concluy\xF3 la revisi\xF3n de estados financieros del trimestre y la conciliaci\xF3n de impuestos."
            },
            {
              id: "wmp-2",
              topic: "Migraci\xF3n de ERP Corporativo",
              status: "En proceso",
              update: "Configuraci\xF3n de m\xF3dulos de n\xF3mina y facturaci\xF3n. Fase de pruebas programada para la pr\xF3xima semana."
            }
          ]
        },
        {
          accountId: "the-wmp-club",
          accountName: "The WMP Club",
          activities: [
            {
              id: "club-1",
              topic: "Organizaci\xF3n del Networking Executive Breakfast",
              status: "Completado",
              update: "Confirmaci\xF3n de 45 ejecutivos asistentes y contrataci\xF3n del venue en Quer\xE9taro."
            },
            {
              id: "club-2",
              topic: "Lanzamiento de Plataforma de Membres\xEDas Digitales",
              status: "Pendiente",
              update: "Pendiente aprobaci\xF3n final de t\xE9rminos legales por el \xE1rea jur\xEDdica."
            }
          ]
        },
        {
          accountId: "consul",
          accountName: "HK",
          activities: [
            {
              id: "consul-1",
              topic: "Revisi\xF3n Contrataci\xF3n y Estructura M&A",
              status: "En proceso",
              update: "An\xE1lisis Due Diligence financiero preliminar para el cliente del sector automotriz."
            },
            {
              id: "consul-2",
              topic: "Dictamen de Precios de Transferencia",
              status: "Bloqueado",
              update: "En espera de la entrega de estados financieros auditados del ejercicio anterior por parte del cliente."
            }
          ]
        },
        {
          accountId: "acensblue",
          accountName: "Acensblue",
          activities: [
            {
              id: "acens-1",
              topic: "B\xFAsqueda de Directivos Biling\xFCes (Headhunting)",
              status: "En proceso",
              update: "Presentaci\xF3n de terna finalista para el puesto de Plant Manager en Baj\xEDo."
            }
          ]
        },
        {
          accountId: "centro-aleman-queretaro",
          accountName: "Centro Alem\xE1n Quer\xE9taro",
          activities: [
            {
              id: "caq-1",
              topic: "Renovaci\xF3n de Certificaciones de Lengua T\xE9cnica",
              status: "Completado",
              update: "Acreditaci\xF3n concedida para 30 ingenieros de empresas alemanas aliadas."
            },
            {
              id: "caq-2",
              topic: "Convenio de Formaci\xF3n Dual 2026-2027",
              status: "Pendiente",
              update: "Siguiente paso: Firma protocolaria de convenio institucional el pr\xF3ximo 10 de agosto."
            }
          ]
        },
        {
          accountId: "thomas-wagner-mx",
          accountName: "Thomas Wagner.mx",
          activities: [
            {
              id: "tw-1",
              topic: "Estrategia de Expansi\xF3n Digital y Marcas",
              status: "En proceso",
              update: "Evaluaci\xF3n de propuesta comercial y registro de propiedad industrial."
            }
          ]
        }
      ]
    };
  }
});

// src/server/reportState.ts
function createDefaultReportData() {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  return {
    metadata: {
      week: "Semana 30",
      cutoffDate: todayStr,
      responsible: "Thomas Wagner",
      department: "Business Development Agency",
      phone: "+52 442 181 7209",
      email: "wagner@thomaswagner.mx"
    },
    accounts: FIXED_ACCOUNTS.map((acc) => ({
      accountId: acc.id,
      accountName: acc.name,
      activities: []
    }))
  };
}
var ReportStore, reportStore;
var init_reportState = __esm({
  "src/server/reportState.ts"() {
    init_accounts();
    init_sampleReport();
    ReportStore = class {
      constructor() {
        this.listeners = [];
        this.data = createDefaultReportData();
      }
      getReport() {
        return JSON.parse(JSON.stringify(this.data));
      }
      setReport(newReport) {
        const accountsMap = new Map(newReport.accounts.map((a) => [a.accountId, a]));
        const fullAccounts = FIXED_ACCOUNTS.map((fixed) => {
          const existing = accountsMap.get(fixed.id);
          return {
            accountId: fixed.id,
            accountName: fixed.name,
            activities: existing ? existing.activities : []
          };
        });
        this.data = {
          metadata: { ...newReport.metadata },
          accounts: fullAccounts
        };
        this.notify();
        return this.getReport();
      }
      updateMetadata(partial) {
        this.data.metadata = {
          ...this.data.metadata,
          ...partial
        };
        this.notify();
        return { ...this.data.metadata };
      }
      addActivity(accountIdentifier, topic, status = "En proceso", update = "") {
        const search = accountIdentifier.toLowerCase().trim();
        const account = this.data.accounts.find(
          (a) => a.accountId.toLowerCase() === search || a.accountName.toLowerCase().includes(search) || search.includes(a.accountName.toLowerCase())
        );
        if (!account) {
          return {
            success: false,
            message: `No se encontr\xF3 la cuenta '${accountIdentifier}'. Cuentas disponibles: ${FIXED_ACCOUNTS.map(
              (a) => a.name
            ).join(", ")}`
          };
        }
        const newActivity = {
          id: "act-" + Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 5),
          topic,
          status,
          update
        };
        account.activities.push(newActivity);
        this.notify();
        return {
          success: true,
          message: `Actividad agregada exitosamente a la cuenta ${account.accountName}`,
          activity: newActivity,
          accountName: account.accountName
        };
      }
      batchAddActivities(items) {
        const results = [];
        let addedCount = 0;
        for (const item of items) {
          const res = this.addActivity(
            item.accountIdentifier,
            item.topic,
            item.status || "En proceso",
            item.update || ""
          );
          results.push(res);
          if (res.success) addedCount++;
        }
        return {
          success: addedCount > 0,
          addedCount,
          results
        };
      }
      getAccountsList() {
        return FIXED_ACCOUNTS.map((acc) => {
          const found = this.data.accounts.find((a) => a.accountId === acc.id);
          return {
            id: acc.id,
            name: acc.name,
            description: acc.description,
            activityCount: found ? found.activities.length : 0
          };
        });
      }
      getAccountActivities(accountIdentifier) {
        const search = accountIdentifier.toLowerCase().trim();
        const account = this.data.accounts.find(
          (a) => a.accountId.toLowerCase() === search || a.accountName.toLowerCase().includes(search) || search.includes(a.accountName.toLowerCase())
        );
        if (!account) {
          return {
            success: false,
            message: `No se encontr\xF3 la cuenta '${accountIdentifier}'.`
          };
        }
        return {
          success: true,
          accountName: account.accountName,
          activities: account.activities
        };
      }
      updateActivity(accountIdentifier, activityId, updates) {
        const search = accountIdentifier.toLowerCase().trim();
        const account = this.data.accounts.find(
          (a) => a.accountId.toLowerCase() === search || a.accountName.toLowerCase().includes(search) || search.includes(a.accountName.toLowerCase())
        );
        if (!account) {
          return {
            success: false,
            message: `No se encontr\xF3 la cuenta '${accountIdentifier}'.`
          };
        }
        const actIndex = account.activities.findIndex((a) => a.id === activityId);
        if (actIndex === -1) {
          return {
            success: false,
            message: `No se encontr\xF3 la actividad con ID '${activityId}' en la cuenta ${account.accountName}.`
          };
        }
        const act = account.activities[actIndex];
        if (updates.topic !== void 0) act.topic = updates.topic;
        if (updates.status !== void 0) act.status = updates.status;
        if (updates.update !== void 0) act.update = updates.update;
        this.notify();
        return {
          success: true,
          message: `Actividad '${act.topic}' actualizada correctamente.`,
          activity: { ...act }
        };
      }
      deleteActivity(accountIdentifier, activityId) {
        const search = accountIdentifier.toLowerCase().trim();
        const account = this.data.accounts.find(
          (a) => a.accountId.toLowerCase() === search || a.accountName.toLowerCase().includes(search) || search.includes(a.accountName.toLowerCase())
        );
        if (!account) {
          return {
            success: false,
            message: `No se encontr\xF3 la cuenta '${accountIdentifier}'.`
          };
        }
        const initialLength = account.activities.length;
        account.activities = account.activities.filter((a) => a.id !== activityId);
        if (account.activities.length === initialLength) {
          return {
            success: false,
            message: `No se encontr\xF3 la actividad con ID '${activityId}' para eliminar.`
          };
        }
        this.notify();
        return {
          success: true,
          message: `Actividad eliminada de la cuenta ${account.accountName}.`
        };
      }
      loadSampleData() {
        this.data = JSON.parse(JSON.stringify(SAMPLE_REPORT_DATA));
        this.notify();
        return this.getReport();
      }
      clearReport() {
        this.data.accounts.forEach((acc) => {
          acc.activities = [];
        });
        this.notify();
        return this.getReport();
      }
      getSummaryStats() {
        let total = 0;
        let completed = 0;
        let inProgress = 0;
        let blocked = 0;
        let pending = 0;
        const accountSummaries = this.data.accounts.map((acc) => {
          const c = acc.activities.filter((a) => a.status === "Completado").length;
          const p = acc.activities.filter((a) => a.status === "En proceso").length;
          const b = acc.activities.filter((a) => a.status === "Bloqueado").length;
          const pend = acc.activities.filter((a) => a.status === "Pendiente").length;
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
            pending: pend
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
            pending
          },
          accountSummaries
        };
      }
      subscribe(listener) {
        this.listeners.push(listener);
        return () => {
          this.listeners = this.listeners.filter((l) => l !== listener);
        };
      }
      notify() {
        this.listeners.forEach((listener) => {
          try {
            listener();
          } catch (e) {
            console.error("Error in listener:", e);
          }
        });
      }
    };
    reportStore = new ReportStore();
  }
});

// src/server/pdfServerGenerator.ts
var pdfServerGenerator_exports = {};
__export(pdfServerGenerator_exports, {
  generateServerPdf: () => generateServerPdf
});
function generateServerPdf() {
  const data = reportStore.getReport();
  const summary = reportStore.getSummaryStats();
  const doc = new import_jspdf.jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;
  const primaryRed = [185, 28, 28];
  const secondaryRed = [153, 27, 27];
  const darkGray = [30, 41, 59];
  const lightBg = [248, 250, 252];
  const borderGray = [226, 232, 240];
  const getStatusColor = (status) => {
    switch (status) {
      case "Completado":
        return { bg: [220, 252, 231], text: [22, 101, 52] };
      case "En proceso":
        return { bg: [224, 242, 254], text: [3, 105, 161] };
      case "Bloqueado":
        return { bg: [254, 226, 226], text: [153, 27, 27] };
      case "Pendiente":
      default:
        return { bg: [254, 243, 199], text: [146, 64, 14] };
    }
  };
  const checkNewPage = (neededHeight) => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin;
      drawHeaderBar();
    }
  };
  const drawHeaderBar = () => {
    doc.setFillColor(primaryRed[0], primaryRed[1], primaryRed[2]);
    doc.rect(0, 0, pageWidth, 6, "F");
  };
  drawHeaderBar();
  y = 14;
  doc.setTextColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("THOMAS WAGNER.MX", margin, y);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Reporte Semanal de Estatus - Business Development Agency", margin, y + 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.text(data.metadata.week, pageWidth - margin, y, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Corte: ${data.metadata.cutoffDate}`, pageWidth - margin, y + 5, { align: "right" });
  y += 13;
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, "F");
  doc.rect(margin, y, contentWidth, 20, "S");
  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const metaCol1 = margin + 4;
  const metaCol2 = margin + contentWidth / 2 + 4;
  doc.setFont("helvetica", "bold");
  doc.text("Responsable:", metaCol1, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(data.metadata.responsible, metaCol1 + 22, y + 6);
  doc.setFont("helvetica", "bold");
  doc.text("Departamento:", metaCol1, y + 13);
  doc.setFont("helvetica", "normal");
  doc.text(data.metadata.department, metaCol1 + 24, y + 13);
  doc.setFont("helvetica", "bold");
  doc.text("Tel\xE9fono:", metaCol2, y + 6);
  doc.setFont("helvetica", "normal");
  doc.text(data.metadata.phone, metaCol2 + 16, y + 6);
  doc.setFont("helvetica", "bold");
  doc.text("Correo:", metaCol2, y + 13);
  doc.setFont("helvetica", "normal");
  doc.text(data.metadata.email, metaCol2 + 13, y + 13);
  y += 25;
  checkNewPage(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.text("Resumen Ejecutivo de Avance", margin, y);
  y += 4;
  const boxWidth = (contentWidth - 12) / 5;
  const metrics = [
    { label: "Total", count: summary.totals.total, color: [185, 28, 28] },
    { label: "Completado", count: summary.totals.completed, color: [22, 101, 52] },
    { label: "En Proceso", count: summary.totals.inProgress, color: [3, 105, 161] },
    { label: "Bloqueado", count: summary.totals.blocked, color: [153, 27, 27] },
    { label: "Pendiente", count: summary.totals.pending, color: [146, 64, 14] }
  ];
  metrics.forEach((m, idx) => {
    const xPos = margin + idx * (boxWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(xPos, y, boxWidth, 12, 1.5, 1.5, "FD");
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(m.color[0], m.color[1], m.color[2]);
    doc.text(String(m.count), xPos + boxWidth / 2, y + 5.5, { align: "center" });
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, xPos + boxWidth / 2, y + 9.5, { align: "center" });
  });
  y += 18;
  data.accounts.forEach((account) => {
    checkNewPage(25);
    doc.setFillColor(primaryRed[0], primaryRed[1], primaryRed[2]);
    doc.rect(margin, y, contentWidth, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(account.accountName, margin + 4, y + 4.8);
    const actCountText = `${account.activities.length} Actividades`;
    doc.setFontSize(8);
    doc.text(actCountText, pageWidth - margin - 4, y + 4.8, { align: "right" });
    y += 7;
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 6, "FD");
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(71, 85, 105);
    const colEstatusX = margin + 3;
    const colTemaX = margin + 32;
    const colUpdateX = margin + 90;
    doc.text("Estatus", colEstatusX, y + 4.2);
    doc.text("Tema / Proyecto", colTemaX, y + 4.2);
    doc.text("Avances / Siguientes Pasos", colUpdateX, y + 4.2);
    y += 6;
    if (account.activities.length === 0) {
      doc.rect(margin, y, contentWidth, 7, "S");
      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text("Sin actividades registradas en esta semana.", margin + 4, y + 4.8);
      y += 7;
    } else {
      account.activities.forEach((act) => {
        const topicLines = doc.splitTextToSize(act.topic || "-", 54);
        const updateLines = doc.splitTextToSize(act.update || "-", contentWidth - 94);
        const linesCount = Math.max(topicLines.length, updateLines.length, 1);
        const rowHeight = Math.max(8, linesCount * 4 + 3);
        checkNewPage(rowHeight);
        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, y, contentWidth, rowHeight, "S");
        const statusColors = getStatusColor(act.status);
        doc.setFillColor(statusColors.bg[0], statusColors.bg[1], statusColors.bg[2]);
        doc.roundedRect(margin + 2, y + 2, 26, 5, 1, 1, "F");
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(statusColors.text[0], statusColors.text[1], statusColors.text[2]);
        doc.text(act.status, margin + 15, y + 3.1, { align: "center" });
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30, 41, 59);
        doc.text(topicLines, colTemaX, y + 4.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        doc.text(updateLines, colUpdateX, y + 4.5);
        y += rowHeight;
      });
    }
    y += 5;
  });
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text(
      "Thomas Wagner.MX \u2022 Business Development Agency \u2022 www.thomaswagner.mx",
      margin,
      pageHeight - 7
    );
    doc.text(`P\xE1gina ${i} de ${pageCount}`, pageWidth - margin, pageHeight - 7, {
      align: "right"
    });
  }
  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
var import_jspdf;
var init_pdfServerGenerator = __esm({
  "src/server/pdfServerGenerator.ts"() {
    import_jspdf = require("jspdf");
    init_reportState();
  }
});

// api/index.ts
var import_express = __toESM(require("express"));

// src/server/routes.ts
var import_sse = require("@modelcontextprotocol/sdk/server/sse.js");
init_reportState();

// src/server/mcpServer.ts
var import_server = require("@modelcontextprotocol/sdk/server/index.js");
var import_types = require("@modelcontextprotocol/sdk/types.js");
init_reportState();
function createMcpServer() {
  const server = new import_server.Server(
    {
      name: "wmp-weekly-report-mcp",
      version: "1.0.0"
    },
    {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {}
      }
    }
  );
  server.setRequestHandler(import_types.ListToolsRequestSchema, async () => {
    return {
      tools: [
        {
          name: "get_full_report",
          description: "Obtiene el reporte semanal completo con metadatos y todas las actividades desglosadas por cuenta (WMP Mexico Advisors, The WMP Club, HK, Acensblue, Centro Alem\xE1n Quer\xE9taro, Thomas Wagner.mx).",
          inputSchema: {
            type: "object",
            properties: {}
          }
        },
        {
          name: "get_accounts_list",
          description: "Obtiene la lista oficial de cuentas corporativas disponibles en el sistema con sus identificadores (ID y nombre), descripci\xF3n y n\xFAmero de actividades registradas.",
          inputSchema: {
            type: "object",
            properties: {}
          }
        },
        {
          name: "get_account_activities",
          description: "Obtiene la lista de actividades de una sola cuenta espec\xEDfica.",
          inputSchema: {
            type: "object",
            properties: {
              accountIdentifier: {
                type: "string",
                description: 'Nombre o ID de la cuenta (ej. "HK", "wmp-mexico-advisors", "Acensblue", etc.)'
              }
            },
            required: ["accountIdentifier"]
          }
        },
        {
          name: "get_report_summary",
          description: "Obtiene un resumen ejecutivo con estad\xEDsticas de avance (# actividades totales, completadas, en proceso, bloqueadas y pendientes por cuenta).",
          inputSchema: {
            type: "object",
            properties: {}
          }
        },
        {
          name: "add_activity",
          description: "Agrega una nueva actividad o proyecto al reporte semanal de una cuenta espec\xEDfica.",
          inputSchema: {
            type: "object",
            properties: {
              accountIdentifier: {
                type: "string",
                description: 'Nombre o ID de la cuenta (ej. "WMP Mexico Advisors", "wmp-mexico-advisors", "The WMP Club", "HK", "Acensblue", "Centro Alem\xE1n Quer\xE9taro", "Thomas Wagner.mx")'
              },
              topic: {
                type: "string",
                description: "Tema, proyecto o asunto principal de la actividad."
              },
              status: {
                type: "string",
                enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"],
                description: 'Estatus actual de la actividad. Valor por defecto: "En proceso".'
              },
              update: {
                type: "string",
                description: "Avances, estatus detallado, bloqueos o siguientes pasos."
              }
            },
            required: ["accountIdentifier", "topic"]
          }
        },
        {
          name: "batch_add_activities",
          description: "Agrega m\xFAltiples actividades en una sola llamada. Ideal cuando se recibe una lista o minuta con varias tareas para una o distintas cuentas.",
          inputSchema: {
            type: "object",
            properties: {
              activities: {
                type: "array",
                description: "Lista de actividades a agregar.",
                items: {
                  type: "object",
                  properties: {
                    accountIdentifier: { type: "string", description: "Nombre o ID de la cuenta" },
                    topic: { type: "string", description: "Tema o asunto" },
                    status: {
                      type: "string",
                      enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"],
                      description: "Estatus actual"
                    },
                    update: { type: "string", description: "Avance o detalle" }
                  },
                  required: ["accountIdentifier", "topic"]
                }
              }
            },
            required: ["activities"]
          }
        },
        {
          name: "update_activity",
          description: "Actualiza el tema, estatus o avance de una actividad existente en una cuenta.",
          inputSchema: {
            type: "object",
            properties: {
              accountIdentifier: {
                type: "string",
                description: "Nombre o ID de la cuenta."
              },
              activityId: {
                type: "string",
                description: "ID \xFAnico de la actividad a actualizar."
              },
              topic: {
                type: "string",
                description: "Nuevo tema o asunto (opcional)."
              },
              status: {
                type: "string",
                enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"],
                description: "Nuevo estatus de la actividad (opcional)."
              },
              update: {
                type: "string",
                description: "Nuevo detalle o actualizaci\xF3n (opcional)."
              }
            },
            required: ["accountIdentifier", "activityId"]
          }
        },
        {
          name: "delete_activity",
          description: "Elimina una actividad de una cuenta dada utilizando su ID.",
          inputSchema: {
            type: "object",
            properties: {
              accountIdentifier: {
                type: "string",
                description: "Nombre o ID de la cuenta."
              },
              activityId: {
                type: "string",
                description: "ID de la actividad que se desea eliminar."
              }
            },
            required: ["accountIdentifier", "activityId"]
          }
        },
        {
          name: "update_metadata",
          description: "Actualiza los metadatos generales del reporte semanal (semana, fecha de corte, responsable, departamento, tel\xE9fono, email).",
          inputSchema: {
            type: "object",
            properties: {
              week: { type: "string", description: 'N\xFAmero o nombre de semana (ej. "Semana 30")' },
              cutoffDate: { type: "string", description: 'Fecha de corte (ej. "2026-07-24")' },
              responsible: { type: "string", description: "Nombre del responsable del reporte" },
              department: { type: "string", description: "\xC1rea o puesto corporativo" },
              phone: { type: "string", description: "Tel\xE9fono de contacto" },
              email: { type: "string", description: "Correo electr\xF3nico corporativo" }
            }
          }
        },
        {
          name: "load_sample_data",
          description: "Carga datos de muestra realistas y corporativos en el reporte para pruebas.",
          inputSchema: {
            type: "object",
            properties: {}
          }
        },
        {
          name: "clear_report",
          description: "Limpia todas las actividades registradas dejando el formulario en blanco.",
          inputSchema: {
            type: "object",
            properties: {}
          }
        },
        {
          name: "download_pdf_report",
          description: "Genera el archivo PDF oficial corporativo del reporte semanal de Thomas Wagner.MX. Retorna el enlace de descarga directo, el resumen en chat y el archivo codificado en Base64 para que el usuario o ChatGPT lo pueda descargar/enviar directamente en la conversaci\xF3n.",
          inputSchema: {
            type: "object",
            properties: {}
          }
        }
      ]
    };
  });
  server.setRequestHandler(import_types.CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;
    try {
      switch (name) {
        case "get_full_report": {
          const report = reportStore.getReport();
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(report, null, 2)
              }
            ]
          };
        }
        case "get_accounts_list": {
          const accounts = reportStore.getAccountsList();
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(accounts, null, 2)
              }
            ]
          };
        }
        case "get_account_activities": {
          const { accountIdentifier } = args;
          const result = reportStore.getAccountActivities(accountIdentifier);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2)
              }
            ],
            isError: !result.success
          };
        }
        case "batch_add_activities": {
          const { activities } = args;
          const result = reportStore.batchAddActivities(Array.isArray(activities) ? activities : []);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2)
              }
            ],
            isError: !result.success
          };
        }
        case "get_report_summary": {
          const summary = reportStore.getSummaryStats();
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(summary, null, 2)
              }
            ]
          };
        }
        case "add_activity": {
          const { accountIdentifier, topic, status = "En proceso", update = "" } = args;
          const result = reportStore.addActivity(
            accountIdentifier,
            topic,
            status,
            update
          );
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2)
              }
            ],
            isError: !result.success
          };
        }
        case "update_activity": {
          const { accountIdentifier, activityId, topic, status, update } = args;
          const result = reportStore.updateActivity(accountIdentifier, activityId, {
            topic,
            status,
            update
          });
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2)
              }
            ],
            isError: !result.success
          };
        }
        case "delete_activity": {
          const { accountIdentifier, activityId } = args;
          const result = reportStore.deleteActivity(accountIdentifier, activityId);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(result, null, 2)
              }
            ],
            isError: !result.success
          };
        }
        case "update_metadata": {
          const updated = reportStore.updateMetadata(args);
          return {
            content: [
              {
                type: "text",
                text: `Metadatos actualizados correctamente:
${JSON.stringify(updated, null, 2)}`
              }
            ]
          };
        }
        case "load_sample_data": {
          const sample = reportStore.loadSampleData();
          return {
            content: [
              {
                type: "text",
                text: `Se cargaron datos de muestra correctamente en todas las cuentas corporativas.
Total cuentas: ${sample.accounts.length}`
              }
            ]
          };
        }
        case "clear_report": {
          reportStore.clearReport();
          return {
            content: [
              {
                type: "text",
                text: "Se limpiaron todas las actividades del reporte semanal."
              }
            ]
          };
        }
        case "download_pdf_report": {
          const { generateServerPdf: generateServerPdf2 } = await Promise.resolve().then(() => (init_pdfServerGenerator(), pdfServerGenerator_exports));
          const report = reportStore.getReport();
          const pdfBuffer = generateServerPdf2();
          const base64Pdf = pdfBuffer.toString("base64");
          const weekClean = (report.metadata.week || "Semana").replace(/[^a-zA-Z0-9]/g, "_");
          const dateClean = (report.metadata.cutoffDate || "2026").replace(/[^a-zA-Z0-9-]/g, "_");
          const filename = `Reporte_Semanal_ThomasWagner_${weekClean}_${dateClean}.pdf`;
          return {
            content: [
              {
                type: "text",
                text: `\u2705 **Reporte Semanal generado exitosamente en PDF**

\u{1F4C4} **Archivo:** \`${filename}\`
\u{1F464} **Responsable:** ${report.metadata.responsible}
\u{1F4C5} **Fecha de Corte:** ${report.metadata.cutoffDate}

\u{1F517} **Enlace de Descarga Directa:**
[\u{1F4E5} Descargar ${filename}](/api/report/pdf)

*El PDF incluye el formato oficial de Thomas Wagner.MX con resumen ejecutivo, branding rojo corporativo y el desglose de todas las cuentas y proyectos.*`
              },
              {
                type: "resource",
                resource: {
                  uri: `report://pdf/${filename}`,
                  mimeType: "application/pdf",
                  blob: base64Pdf
                }
              }
            ]
          };
        }
        default:
          throw new Error(`Herramienta no reconocida: ${name}`);
      }
    } catch (err) {
      return {
        content: [
          {
            type: "text",
            text: `Error al ejecutar ${name}: ${err?.message || err}`
          }
        ],
        isError: true
      };
    }
  });
  server.setRequestHandler(import_types.ListResourcesRequestSchema, async () => {
    return {
      resources: [
        {
          uri: "report://current",
          name: "Reporte Semanal Actual",
          mimeType: "application/json",
          description: "Objeto JSON completo del reporte semanal de estatus WMP."
        },
        {
          uri: "report://summary",
          name: "Resumen Estad\xEDstico",
          mimeType: "text/plain",
          description: "Resumen formateado de estatus por cuenta."
        }
      ]
    };
  });
  server.setRequestHandler(import_types.ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    if (uri === "report://current") {
      const data = reportStore.getReport();
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(data, null, 2)
          }
        ]
      };
    }
    if (uri === "report://summary") {
      const summary = reportStore.getSummaryStats();
      const text = `REPORTE SEMANAL ${summary.week} (${summary.cutoffDate})
Responsable: ${summary.responsible} (${summary.department})
--------------------------------------------------
Totales: ${summary.totals.total} actividades | ${summary.totals.completed} completadas | ${summary.totals.inProgress} en proceso | ${summary.totals.blocked} bloqueadas | ${summary.totals.pending} pendientes

Por cuenta:
${summary.accountSummaries.map(
        (a) => `\u2022 ${a.accountName}: ${a.totalActivities} activ. (\u2705${a.completed}, \u{1F504}${a.inProgress}, \u{1F6AB}${a.blocked}, \u23F3${a.pending})`
      ).join("\n")}`;
      return {
        contents: [
          {
            uri,
            mimeType: "text/plain",
            text
          }
        ]
      };
    }
    throw new Error(`Recurso no encontrado: ${uri}`);
  });
  server.setRequestHandler(import_types.ListPromptsRequestSchema, async () => {
    return {
      prompts: [
        {
          name: "generate-executive-summary",
          description: "Instrucci\xF3n para que ChatGPT redacte un informe ejecutivo sintetizado listo para enviar a direcci\xF3n."
        },
        {
          name: "review-blocked-projects",
          description: "Instrucci\xF3n para analizar proyectos bloqueados y sugerir planes de mitigaci\xF3n."
        }
      ]
    };
  });
  server.setRequestHandler(import_types.GetPromptRequestSchema, async (request) => {
    const { name } = request.params;
    const report = reportStore.getReport();
    if (name === "generate-executive-summary") {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Eres un consultor ejecutivo senior de WMP Mexico Advisors. Revisa el siguiente reporte semanal y redacta un correo de resumen ejecutivo conciso, elegante y directo para direcci\xF3n con los logros principales, focos rojos y siguientes pasos:

${JSON.stringify(
                report,
                null,
                2
              )}`
            }
          }
        ]
      };
    }
    if (name === "review-blocked-projects") {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Analiza las actividades con estatus "Bloqueado" o "Pendiente" en el siguiente reporte semanal e identifica riesgos clave y recomendaciones t\xE1cticas para desbloquear los proyectos:

${JSON.stringify(
                report,
                null,
                2
              )}`
            }
          }
        ]
      };
    }
    throw new Error(`Prompt no encontrado: ${name}`);
  });
  return server;
}
var sseTransports = /* @__PURE__ */ new Map();

// src/server/pdfBrowserGenerator.ts
function getBadgeStyles(status) {
  switch (status) {
    case "Completado":
      return { bg: "#dcfce7", color: "#166534", border: "#166534" };
    case "En proceso":
      return { bg: "#dbeafe", color: "#1d4ed8", border: "#1d4ed8" };
    case "Bloqueado":
      return { bg: "#fee2e2", color: "#991b1b", border: "#991b1b" };
    case "Pendiente":
    default:
      return { bg: "#fef9c3", color: "#92400e", border: "#92400e" };
  }
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  } catch {
    return dateStr;
  }
}
function buildReportHtml(data) {
  const { metadata, accounts } = data;
  const accountsHtml = accounts.map((acc) => {
    const rowsHtml = acc.activities.length === 0 ? `<tr>
              <td style="padding:8px 12px;border-right:1px solid #CBD5E1;color:#94a3b8;font-style:italic;font-size:11px;">Escribe el tema o proyecto</td>
              <td style="padding:8px 12px;color:#94a3b8;font-style:italic;font-size:11px;">Avance, pendiente, bloqueo o siguiente paso</td>
            </tr>` : acc.activities.map((act) => {
      const badge = getBadgeStyles(act.status);
      return `<tr style="border-bottom:1px solid #CBD5E1;vertical-align:top;">
                  <td style="padding:10px 12px;border-right:1px solid #CBD5E1;font-size:11px;font-weight:600;color:#1E293B;word-break:break-word;overflow-wrap:break-word;">
                    ${act.topic || '<span style="color:#94A3B8;font-weight:400;font-style:italic;">Escribe el tema o proyecto</span>'}
                  </td>
                  <td style="padding:10px 12px;font-size:11px;word-break:break-word;overflow-wrap:break-word;">
                    <div style="margin-bottom:4px;">
                      <span style="display:inline-flex;align-items:center;justify-content:center;background-color:${badge.bg};color:${badge.color};border:1px solid ${badge.border};border-radius:3px;font-size:9px;font-weight:700;letter-spacing:0.025em;padding:2px 8px;line-height:1;min-height:18px;box-sizing:border-box;">
                        ${act.status}
                      </span>
                    </div>
                    <p style="margin:0;color:#334155;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-word;">
                      ${act.update || '<span style="color:#94A3B8;font-style:italic;">Avance, pendiente, bloqueo o siguiente paso</span>'}
                    </p>
                  </td>
                </tr>`;
    }).join("");
    return `<div style="border:1px solid #CBD5E1;margin-bottom:16px;page-break-inside:avoid;">
        <div style="background:#F8FAFC;border-bottom:1px solid #CBD5E1;padding:6px 12px;">
          <h2 style="margin:0;font-size:13px;font-weight:700;color:#B91C1C;">${acc.accountName}</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
          <thead>
            <tr style="background:#B91C1C;color:#fff;font-size:10px;font-weight:700;">
              <th style="padding:8px 12px;border-right:1px solid #991B1B;text-align:left;width:38%;">Tema / Proyecto</th>
              <th style="padding:8px 12px;text-align:left;width:62%;">Estatus / Actualizaci\xF3n</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;
  }).join("");
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #fff;
      color: #1e293b;
      width: 794px;
      padding: 38px;
    }
    @media print {
      body { width: 100%; padding: 0; }
    }
  </style>
</head>
<body>
  <!-- L\xEDnea roja superior -->
  <div style="width:100%;height:3px;background:#B91C1C;margin-bottom:16px;"></div>

  <!-- Encabezado -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
    <div>
      <h1 style="font-size:22px;font-weight:900;color:#B91C1C;letter-spacing:-0.5px;line-height:1.2;margin-bottom:2px;">Reporte Semanal de Estatus</h1>
      <p style="font-size:12px;color:#64748B;font-weight:500;">Thomas Wagner.MX \u2022 Business Development Agency</p>
    </div>
    <div style="flex-shrink:0;padding-left:16px;text-align:right;">
      <div style="font-size:14px;font-weight:900;color:#B91C1C;line-height:1.2;">Thomas Wagner.MX</div>
      <div style="font-size:9px;font-weight:700;color:#475569;margin-top:2px;letter-spacing:0.05em;">Business Development Agency</div>
    </div>
  </div>

  <!-- Tabla info general -->
  <div style="border:1px solid #CBD5E1;margin-bottom:24px;">
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#F8FAFC;color:#B91C1C;font-size:10px;font-weight:700;border-bottom:1px solid #CBD5E1;">
          <th style="padding:10px 12px;border-right:1px solid #CBD5E1;text-align:left;width:20%;">Semana</th>
          <th style="padding:10px 12px;border-right:1px solid #CBD5E1;text-align:left;width:30%;">Fecha de Corte</th>
          <th style="padding:10px 12px;text-align:left;width:50%;">Responsable</th>
        </tr>
      </thead>
      <tbody>
        <tr style="font-size:11px;border-bottom:1px solid #CBD5E1;">
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${metadata.week || ""}</td>
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${formatDate(metadata.cutoffDate)}</td>
          <td style="padding:8px 12px;font-weight:500;">${metadata.responsible || ""}</td>
        </tr>
      </tbody>
      <thead>
        <tr style="background:#F8FAFC;color:#B91C1C;font-size:10px;font-weight:700;border-bottom:1px solid #CBD5E1;">
          <th style="padding:10px 12px;border-right:1px solid #CBD5E1;text-align:left;">\xC1rea / Puesto</th>
          <th style="padding:10px 12px;border-right:1px solid #CBD5E1;text-align:left;">Tel\xE9fono</th>
          <th style="padding:10px 12px;text-align:left;">Correo Electr\xF3nico</th>
        </tr>
      </thead>
      <tbody>
        <tr style="font-size:11px;">
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${metadata.department || ""}</td>
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${metadata.phone || ""}</td>
          <td style="padding:8px 12px;font-weight:500;">${metadata.email || ""}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Cuentas -->
  <div>${accountsHtml}</div>

  <!-- Footer -->
  <div style="margin-top:40px;padding-top:16px;border-top:1px solid #CBD5E1;">
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px;color:#334155;">
      <div style="width:42%;">
        <strong style="display:block;color:#B91C1C;font-size:10px;font-weight:700;margin-bottom:2px;">Thomas Wagner.MX</strong>
        <p style="color:#475569;margin:0;line-height:1.5;">
          Level Tower B - 2. Floor Avenida Antea 1130<br/>
          76127 Jurica, Quer\xE9taro, M\xE9xico<br/>
          <span style="font-weight:600;color:#B91C1C;">T: +52 442 181 7209 | +49 174 470 9939</span>
        </p>
      </div>
      <div style="width:32%;text-align:center;border-left:1px solid #E2E8F0;border-right:1px solid #E2E8F0;padding:4px 8px;">
        <div style="font-size:14px;font-weight:900;color:#B91C1C;">Thomas Wagner.MX</div>
        <div style="font-size:7.5px;font-weight:700;color:#64748B;margin-top:2px;letter-spacing:0.05em;">Business Development Agency</div>
      </div>
      <div style="width:26%;text-align:right;font-size:8.5px;color:#475569;">
        <strong style="display:block;color:#B91C1C;">E: wagner@thomaswagner.mx</strong>
        <strong style="display:block;color:#B91C1C;">W: www.thomaswagner.mx</strong>
      </div>
    </div>
    <div style="width:100%;height:10px;background:#B91C1C;margin-top:12px;"></div>
  </div>
</body>
</html>`;
}

// src/server/routes.ts
function setupApiRoutes(app2) {
  app2.use((req, res, next) => {
    if (typeof res.flushHeaders !== "function") {
      res.flushHeaders = () => {
      };
    }
    if (typeof res.flush !== "function") {
      res.flush = () => {
      };
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, mcp-session-id, mcp-version, Accept, Origin");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    next();
  });
  app2.get("/api/report", (req, res) => {
    res.json(reportStore.getReport());
  });
  app2.get("/api/report/pdf", async (req, res) => {
    try {
      const report = reportStore.getReport();
      const html = buildReportHtml(report);
      const chromium = (await import("@sparticuz/chromium-min")).default;
      const puppeteer = (await import("puppeteer-core")).default;
      const executablePath = await chromium.executablePath(
        "https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.tar"
      );
      const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: { width: 794, height: 1123 },
        executablePath,
        headless: true
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdfBuffer = await page.pdf({
        format: "Letter",
        printBackground: true,
        margin: { top: "0", right: "0", bottom: "0", left: "0" }
      });
      await browser.close();
      const weekClean = (report.metadata.week || "Semana").replace(/[^a-zA-Z0-9]/g, "_");
      const dateClean = (report.metadata.cutoffDate || "2026").replace(/[^a-zA-Z0-9-]/g, "_");
      const filename = `Reporte_Semanal_ThomasWagner_${weekClean}_${dateClean}.pdf`;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-Length", pdfBuffer.length);
      res.send(pdfBuffer);
    } catch (err) {
      console.error("Error generando PDF con puppeteer:", err);
      res.status(500).json({ success: false, error: err?.message || "Error al generar el PDF" });
    }
  });
  app2.put("/api/report", (req, res) => {
    const updated = reportStore.setReport(req.body);
    res.json({ success: true, report: updated });
  });
  app2.get("/api/report/summary", (req, res) => {
    res.json(reportStore.getSummaryStats());
  });
  app2.get("/api/report/accounts", (req, res) => {
    res.json(reportStore.getAccountsList());
  });
  app2.post("/api/report/batch-activities", (req, res) => {
    const { activities } = req.body;
    if (!Array.isArray(activities)) {
      return res.status(400).json({ success: false, message: "activities debe ser un arreglo de objetos." });
    }
    const result = reportStore.batchAddActivities(activities);
    res.json(result);
  });
  app2.post("/api/report/metadata", (req, res) => {
    const updated = reportStore.updateMetadata(req.body);
    res.json({ success: true, metadata: updated });
  });
  app2.post("/api/report/activity", (req, res) => {
    const { accountIdentifier, topic, status, update } = req.body;
    if (!accountIdentifier || !topic) {
      return res.status(400).json({ success: false, message: "accountIdentifier y topic son requeridos." });
    }
    const result = reportStore.addActivity(
      accountIdentifier,
      topic,
      status,
      update
    );
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  });
  app2.put("/api/report/activity", (req, res) => {
    const { accountIdentifier, activityId, topic, status, update } = req.body;
    if (!accountIdentifier || !activityId) {
      return res.status(400).json({ success: false, message: "accountIdentifier y activityId son requeridos." });
    }
    const result = reportStore.updateActivity(accountIdentifier, activityId, {
      topic,
      status,
      update
    });
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  });
  app2.delete("/api/report/activity", (req, res) => {
    const { accountIdentifier, activityId } = req.body;
    if (!accountIdentifier || !activityId) {
      return res.status(400).json({ success: false, message: "accountIdentifier y activityId son requeridos." });
    }
    const result = reportStore.deleteActivity(accountIdentifier, activityId);
    if (!result.success) {
      return res.status(404).json(result);
    }
    res.json(result);
  });
  app2.post("/api/report/sample-data", (req, res) => {
    const report = reportStore.loadSampleData();
    res.json({ success: true, message: "Datos de muestra cargados.", report });
  });
  app2.delete("/api/report/activities", (req, res) => {
    const report = reportStore.clearReport();
    res.json({ success: true, message: "Actividades eliminadas.", report });
  });
  app2.get("/api/mcp/info", (req, res) => {
    res.json({
      mcpServer: "Thomas Wagner Weekly Report MCP Server",
      version: "1.0.0",
      status: "active",
      transports: {
        sseEndpoint: "/api/mcp/sse",
        messageEndpoint: "/api/mcp/message",
        jsonRpcEndpoint: "/api/mcp"
      },
      openApiSchemaUrl: "/api/openapi.json",
      availableTools: [
        "get_full_report",
        "get_accounts_list",
        "get_account_activities",
        "get_report_summary",
        "add_activity",
        "batch_add_activities",
        "update_activity",
        "delete_activity",
        "update_metadata",
        "load_sample_data",
        "clear_report",
        "download_pdf_report"
      ],
      resources: ["report://current", "report://summary"],
      prompts: ["generate-executive-summary", "review-blocked-projects"]
    });
  });
  const handleMcpSse = async (req, res) => {
    console.log("[MCP] SSE connection client connected");
    if (typeof res.flushHeaders !== "function") {
      res.flushHeaders = () => {
      };
    }
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
      const transport = new import_sse.SSEServerTransport("/api/mcp/message", res);
      const mcpServer = createMcpServer();
      sseTransports.set(transport.sessionId, transport);
      req.on("close", () => {
        console.log(`[MCP] SSE connection closed for session ${transport.sessionId}`);
        sseTransports.delete(transport.sessionId);
      });
      await mcpServer.connect(transport);
    } catch (err) {
      console.error("[MCP] SSE connection error:", err);
      if (!res.headersSent) {
        res.status(500).json({ error: "SSE Transport Error", message: err?.message });
      }
    }
  };
  app2.get("/api/mcp/sse", handleMcpSse);
  app2.get("/mcp/sse", handleMcpSse);
  app2.get("/sse", handleMcpSse);
  const handleRpcRequest = async (jsonRpcReq) => {
    const { jsonrpc, id, method, params } = jsonRpcReq || {};
    if (jsonrpc !== "2.0") {
      return {
        jsonrpc: "2.0",
        id: id || null,
        error: { code: -32600, message: 'Invalid Request: jsonrpc must be "2.0"' }
      };
    }
    if (method === "initialize") {
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {},
            resources: {},
            prompts: {}
          },
          serverInfo: {
            name: "wmp-weekly-report-mcp",
            version: "1.0.0"
          }
        }
      };
    }
    if (method === "notifications/initialized") {
      return null;
    }
    if (method === "ping") {
      return { jsonrpc: "2.0", id, result: {} };
    }
    if (method === "tools/list") {
      return {
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "get_full_report",
              description: "Obtiene el reporte semanal completo de WMP.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_accounts_list",
              description: "Obtiene la lista oficial de cuentas corporativas configuradas con sus IDs.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "get_account_activities",
              description: "Obtiene las actividades de una sola cuenta dada.",
              inputSchema: {
                type: "object",
                properties: {
                  accountIdentifier: { type: "string" }
                },
                required: ["accountIdentifier"]
              }
            },
            {
              name: "get_report_summary",
              description: "Obtiene el resumen con m\xE9tricas clave de estatus.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "download_pdf_report",
              description: "Genera el archivo PDF oficial del reporte semanal de Thomas Wagner.MX. Retorna el enlace de descarga directa y el archivo en Base64.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "add_activity",
              description: "Agrega una actividad a una cuenta dada.",
              inputSchema: {
                type: "object",
                properties: {
                  accountIdentifier: { type: "string" },
                  topic: { type: "string" },
                  status: {
                    type: "string",
                    enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"]
                  },
                  update: { type: "string" }
                },
                required: ["accountIdentifier", "topic"]
              }
            },
            {
              name: "batch_add_activities",
              description: "Agrega m\xFAltiples actividades en un solo paso.",
              inputSchema: {
                type: "object",
                properties: {
                  activities: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        accountIdentifier: { type: "string" },
                        topic: { type: "string" },
                        status: {
                          type: "string",
                          enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"]
                        },
                        update: { type: "string" }
                      },
                      required: ["accountIdentifier", "topic"]
                    }
                  }
                },
                required: ["activities"]
              }
            },
            {
              name: "update_activity",
              description: "Actualiza una actividad existente.",
              inputSchema: {
                type: "object",
                properties: {
                  accountIdentifier: { type: "string" },
                  activityId: { type: "string" },
                  topic: { type: "string" },
                  status: {
                    type: "string",
                    enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"]
                  },
                  update: { type: "string" }
                },
                required: ["accountIdentifier", "activityId"]
              }
            },
            {
              name: "delete_activity",
              description: "Elimina una actividad de una cuenta por ID.",
              inputSchema: {
                type: "object",
                properties: {
                  accountIdentifier: { type: "string" },
                  activityId: { type: "string" }
                },
                required: ["accountIdentifier", "activityId"]
              }
            },
            {
              name: "update_metadata",
              description: "Actualiza los metadatos generales del reporte.",
              inputSchema: {
                type: "object",
                properties: {
                  week: { type: "string" },
                  cutoffDate: { type: "string" },
                  responsible: { type: "string" },
                  department: { type: "string" },
                  phone: { type: "string" },
                  email: { type: "string" }
                }
              }
            },
            {
              name: "load_sample_data",
              description: "Carga datos de muestra realistas.",
              inputSchema: { type: "object", properties: {} }
            },
            {
              name: "clear_report",
              description: "Limpia todas las actividades.",
              inputSchema: { type: "object", properties: {} }
            }
          ]
        }
      };
    }
    if (method === "tools/call") {
      const { name, arguments: args = {} } = params || {};
      if (name === "get_full_report") {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(reportStore.getReport(), null, 2) }]
          }
        };
      }
      if (name === "get_accounts_list") {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(reportStore.getAccountsList(), null, 2) }]
          }
        };
      }
      if (name === "get_account_activities") {
        const res = reportStore.getAccountActivities(args.accountIdentifier);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
            isError: !res.success
          }
        };
      }
      if (name === "batch_add_activities") {
        const res = reportStore.batchAddActivities(Array.isArray(args.activities) ? args.activities : []);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
            isError: !res.success
          }
        };
      }
      if (name === "get_report_summary") {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(reportStore.getSummaryStats(), null, 2) }]
          }
        };
      }
      if (name === "download_pdf_report") {
        const report = reportStore.getReport();
        const html = buildReportHtml(report);
        const chromium = (await import("@sparticuz/chromium-min")).default;
        const puppeteer = (await import("puppeteer-core")).default;
        const executablePath = await chromium.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v149.0.0/chromium-v149.0.0-pack.tar"
        );
        const browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: { width: 794, height: 1123 },
          executablePath,
          headless: true
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdfBuffer = await page.pdf({
          format: "Letter",
          printBackground: true,
          margin: { top: "0", right: "0", bottom: "0", left: "0" }
        });
        await browser.close();
        const base64Pdf = Buffer.from(pdfBuffer).toString("base64");
        const weekClean = (report.metadata.week || "Semana").replace(/[^a-zA-Z0-9]/g, "_");
        const dateClean = (report.metadata.cutoffDate || "2026").replace(/[^a-zA-Z0-9-]/g, "_");
        const filename = `Reporte_Semanal_ThomasWagner_${weekClean}_${dateClean}.pdf`;
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `\u2705 **Reporte Semanal generado exitosamente en PDF**

\u{1F4C4} **Archivo:** \`${filename}\`
\u{1F464} **Responsable:** ${report.metadata.responsible}
\u{1F4C5} **Fecha de Corte:** ${report.metadata.cutoffDate}

\u{1F517} **Enlace de Descarga Directa:**
[\u{1F4E5} Descargar ${filename}](/api/report/pdf)

*El PDF incluye el formato oficial de Thomas Wagner.MX.*`
              },
              {
                type: "resource",
                resource: {
                  uri: `report://pdf/${filename}`,
                  mimeType: "application/pdf",
                  blob: base64Pdf
                }
              }
            ]
          }
        };
      }
      if (name === "add_activity") {
        const res = reportStore.addActivity(
          args.accountIdentifier,
          args.topic,
          args.status,
          args.update
        );
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
            isError: !res.success
          }
        };
      }
      if (name === "update_activity") {
        const res = reportStore.updateActivity(args.accountIdentifier, args.activityId, {
          topic: args.topic,
          status: args.status,
          update: args.update
        });
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
            isError: !res.success
          }
        };
      }
      if (name === "delete_activity") {
        const res = reportStore.deleteActivity(args.accountIdentifier, args.activityId);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify(res, null, 2) }],
            isError: !res.success
          }
        };
      }
      if (name === "update_metadata") {
        const updated = reportStore.updateMetadata(args);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `Metadatos actualizados:
${JSON.stringify(updated, null, 2)}`
              }
            ]
          }
        };
      }
      if (name === "load_sample_data") {
        const rep = reportStore.loadSampleData();
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: "Se han cargado los datos de ejemplo corporativos en el reporte."
              }
            ]
          }
        };
      }
      if (name === "clear_report") {
        reportStore.clearReport();
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: "Se han eliminado todas las actividades." }]
          }
        };
      }
      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Tool not found: ${name}` }
      };
    }
    return {
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` }
    };
  };
  const handleMcpMessage = async (req, res) => {
    const sessionId = req.query.sessionId || req.headers["mcp-session-id"];
    const transport = sessionId ? sseTransports.get(sessionId) : void 0;
    if (transport) {
      try {
        await transport.handlePostMessage(req, res);
        return;
      } catch (err) {
        console.warn("[MCP] Transport handlePostMessage failed, falling back to stateless handler:", err);
      }
    }
    const body = req.body;
    const response = Array.isArray(body) ? await Promise.all(body.map((b) => handleRpcRequest(b))) : await handleRpcRequest(body);
    if (response) {
      return res.json(response);
    } else {
      return res.status(202).end();
    }
  };
  app2.post("/api/mcp/message", handleMcpMessage);
  app2.post("/mcp/message", handleMcpMessage);
  app2.post("/message", handleMcpMessage);
  app2.post("/messages", handleMcpMessage);
  const handleDirectRpc = async (req, res) => {
    const body = req.body;
    if (body && (body.jsonrpc || Array.isArray(body))) {
      const response = Array.isArray(body) ? await Promise.all(body.map((b) => handleRpcRequest(b))) : await handleRpcRequest(body);
      if (response) {
        return res.json(response);
      } else {
        return res.status(202).end();
      }
    }
    return res.json({
      mcpServer: "Thomas Wagner Weekly Report MCP Server",
      version: "1.0.0",
      status: "active",
      endpoints: {
        sse: "/api/mcp/sse",
        message: "/api/mcp/message",
        post: "/api/mcp"
      },
      availableTools: [
        "get_full_report",
        "get_accounts_list",
        "get_account_activities",
        "get_report_summary",
        "add_activity",
        "batch_add_activities",
        "update_activity",
        "delete_activity",
        "update_metadata",
        "load_sample_data",
        "clear_report",
        "download_pdf_report"
      ]
    });
  };
  app2.get("/api/mcp", handleDirectRpc);
  app2.post("/api/mcp", handleDirectRpc);
  app2.delete("/api/mcp", (req, res) => {
    res.status(200).json({ status: "ok", message: "Session closed" });
  });
  app2.get("/mcp", handleDirectRpc);
  app2.post("/mcp", handleDirectRpc);
  app2.delete("/mcp", (req, res) => {
    res.status(200).json({ status: "ok", message: "Session closed" });
  });
  const handleOpenApiSpec = (req, res) => {
    const host = req.headers["x-forwarded-host"] || req.get("host") || "localhost:3000";
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
    const baseUrl = `${protocol}://${host}`;
    const openApiSpec = {
      openapi: "3.0.3",
      info: {
        title: "Thomas Wagner.MX Weekly Report MCP & ChatGPT Custom Action API",
        description: "API para controlar, consultar y modificar el Reporte Semanal de Estatus de Thomas Wagner.MX mediante agentes de IA como ChatGPT.",
        version: "1.0.0"
      },
      servers: [
        {
          url: baseUrl,
          description: "Servidor principal Thomas Wagner Reportes"
        }
      ],
      paths: {
        "/api/report/pdf": {
          get: {
            summary: "Descargar el reporte semanal en formato PDF",
            operationId: "downloadPdfReport",
            description: "Genera y descarga el archivo PDF oficial con el formato corporativo de Thomas Wagner.MX.",
            responses: {
              "200": {
                description: "Archivo PDF del reporte semanal",
                content: {
                  "application/pdf": {
                    schema: {
                      type: "string",
                      format: "binary"
                    }
                  }
                }
              }
            }
          }
        },
        "/api/report": {
          get: {
            summary: "Obtener el reporte completo",
            operationId: "getReport",
            description: "Devuelve el objeto completo del reporte semanal con metadatos y cuentas con actividades.",
            responses: {
              "200": {
                description: "Reporte completo obtenido con \xE9xito."
              }
            }
          },
          put: {
            summary: "Reemplazar el reporte completo",
            operationId: "setFullReport",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: { type: "object" }
                }
              }
            },
            responses: {
              "200": { description: "Reporte actualizado" }
            }
          }
        },
        "/api/report/summary": {
          get: {
            summary: "Obtener estad\xEDsticas del reporte",
            operationId: "getReportSummary",
            description: "Devuelve el conteo de actividades completadas, en proceso, bloqueadas y pendientes por cuenta.",
            responses: {
              "200": { description: "Estad\xEDsticas ejecutivas obtenidas." }
            }
          }
        },
        "/api/report/activity": {
          post: {
            summary: "Agregar una actividad a una cuenta",
            operationId: "addActivity",
            description: "Agrega un proyecto o tema con su estatus y avance a una cuenta corporativa (WMP Mexico Advisors, The WMP Club, C\xF3nsul, Acensblue, Centro Alem\xE1n Quer\xE9taro, Thomas Wagner.mx).",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["accountIdentifier", "topic"],
                    properties: {
                      accountIdentifier: {
                        type: "string",
                        example: "WMP Mexico Advisors",
                        description: "Nombre o ID de la cuenta"
                      },
                      topic: {
                        type: "string",
                        example: "Migraci\xF3n del ERP Corporativo",
                        description: "Asunto o tema principal"
                      },
                      status: {
                        type: "string",
                        enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"],
                        default: "En proceso",
                        description: "Estatus del avance"
                      },
                      update: {
                        type: "string",
                        example: "Fase de pruebas con usuarios clave.",
                        description: "Detalle del avance o bloqueo"
                      }
                    }
                  }
                }
              }
            },
            responses: {
              "200": { description: "Actividad agregada exitosamente" }
            }
          },
          put: {
            summary: "Actualizar una actividad existente",
            operationId: "updateActivity",
            description: "Modifica el estatus, tema o avance de una actividad dada su ID.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["accountIdentifier", "activityId"],
                    properties: {
                      accountIdentifier: { type: "string", example: "wmp-mexico-advisors" },
                      activityId: { type: "string", example: "wmp-1" },
                      topic: { type: "string" },
                      status: {
                        type: "string",
                        enum: ["Pendiente", "En proceso", "Bloqueado", "Completado"]
                      },
                      update: { type: "string" }
                    }
                  }
                }
              }
            },
            responses: {
              "200": { description: "Actividad actualizada" }
            }
          },
          delete: {
            summary: "Eliminar una actividad",
            operationId: "deleteActivity",
            description: "Elimina una actividad de la cuenta especificada usando su ID.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    required: ["accountIdentifier", "activityId"],
                    properties: {
                      accountIdentifier: { type: "string" },
                      activityId: { type: "string" }
                    }
                  }
                }
              }
            },
            responses: {
              "200": { description: "Actividad eliminada" }
            }
          }
        },
        "/api/report/metadata": {
          post: {
            summary: "Actualizar metadatos del reporte",
            operationId: "updateMetadata",
            description: "Modifica la semana, fecha de corte, responsable, departamento, tel\xE9fono o email.",
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      week: { type: "string", example: "Semana 30" },
                      cutoffDate: { type: "string", example: "2026-07-24" },
                      responsible: { type: "string", example: "Thomas Wagner" },
                      department: {
                        type: "string",
                        example: "Business Development Agency"
                      },
                      phone: { type: "string", example: "+52 442 181 7209" },
                      email: { type: "string", example: "wagner@thomaswagner.mx" }
                    }
                  }
                }
              }
            },
            responses: {
              "200": { description: "Metadatos actualizados" }
            }
          }
        },
        "/api/report/sample-data": {
          post: {
            summary: "Cargar datos de prueba",
            operationId: "loadSampleData",
            description: "Rellena el reporte con datos de muestra realistas.",
            responses: {
              "200": { description: "Datos cargados" }
            }
          }
        },
        "/api/report/activities": {
          delete: {
            summary: "Limpiar todas las actividades",
            operationId: "clearActivities",
            description: "Vac\xEDa la lista de actividades registradas.",
            responses: {
              "200": { description: "Reporte vaciado" }
            }
          }
        }
      }
    };
    res.json(openApiSpec);
  };
  app2.get("/api/openapi.json", handleOpenApiSpec);
  app2.get("/openapi.json", handleOpenApiSpec);
}

// api/index.ts
var app = (0, import_express.default)();
app.use((req, res, next) => {
  if (req.path === "/api/mcp/message") {
    next();
  } else {
    import_express.default.json({ limit: "25mb" })(req, res, next);
  }
});
app.use((req, res, next) => {
  if (req.path === "/api/mcp/message") {
    next();
  } else {
    import_express.default.urlencoded({ extended: true, limit: "25mb" })(req, res, next);
  }
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "WMP Reportes Semanales", platform: "Vercel Serverless", mcp: "enabled" });
});
setupApiRoutes(app);
module.exports = app;
