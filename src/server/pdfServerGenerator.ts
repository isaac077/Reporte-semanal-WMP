import { jsPDF } from 'jspdf';
import { reportStore } from './reportState.ts';
import { FullReportData, ActivityStatus } from '../types/report.ts';

export function generateServerPdf(): Buffer {
  const data: FullReportData = reportStore.getReport();
  const summary = reportStore.getSummaryStats();

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  let y = margin;

  // Colors
  const primaryRed = [185, 28, 28]; // #B91C1C
  const secondaryRed = [153, 27, 27];
  const darkGray = [30, 41, 59];
  const lightBg = [248, 250, 252];
  const borderGray = [226, 232, 240];

  // Helper for status badge colors
  const getStatusColor = (status: ActivityStatus) => {
    switch (status) {
      case 'Completado':
        return { bg: [220, 252, 231], text: [22, 101, 52] }; // Green
      case 'En proceso':
        return { bg: [224, 242, 254], text: [3, 105, 161] }; // Blue
      case 'Bloqueado':
        return { bg: [254, 226, 226], text: [153, 27, 27] }; // Red
      case 'Pendiente':
      default:
        return { bg: [254, 243, 199], text: [146, 64, 14] }; // Yellow
    }
  };

  // Check page break helper
  const checkNewPage = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin;
      drawHeaderBar();
    }
  };

  const drawHeaderBar = () => {
    doc.setFillColor(primaryRed[0], primaryRed[1], primaryRed[2]);
    doc.rect(0, 0, pageWidth, 6, 'F');
  };

  drawHeaderBar();
  y = 14;

  // Header Title & Subtitle
  doc.setTextColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('THOMAS WAGNER.MX', margin, y);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('REPORTE SEMANAL DE ESTATUS - BUSINESS DEVELOPMENT AGENCY', margin, y + 5);

  // Date & Week on top right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.text(data.metadata.week.toUpperCase(), pageWidth - margin, y, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Corte: ${data.metadata.cutoffDate}`, pageWidth - margin, y + 5, { align: 'right' });

  y += 13;

  // Divider Line
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2]);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 5;

  // Metadata Box
  doc.setFillColor(lightBg[0], lightBg[1], lightBg[2]);
  doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');
  doc.rect(margin, y, contentWidth, 20, 'S');

  doc.setFontSize(8.5);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

  const metaCol1 = margin + 4;
  const metaCol2 = margin + contentWidth / 2 + 4;

  doc.setFont('helvetica', 'bold');
  doc.text('Responsable:', metaCol1, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(data.metadata.responsible, metaCol1 + 22, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Departamento:', metaCol1, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(data.metadata.department, metaCol1 + 24, y + 13);

  doc.setFont('helvetica', 'bold');
  doc.text('Teléfono:', metaCol2, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(data.metadata.phone, metaCol2 + 16, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Correo:', metaCol2, y + 13);
  doc.setFont('helvetica', 'normal');
  doc.text(data.metadata.email, metaCol2 + 13, y + 13);

  y += 25;

  // Executive Summary Totals Box
  checkNewPage(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryRed[0], primaryRed[1], primaryRed[2]);
  doc.text('RESUMEN EJECUTIVO DE AVANCE', margin, y);

  y += 4;

  const boxWidth = (contentWidth - 12) / 5;
  const metrics = [
    { label: 'TOTAL', count: summary.totals.total, color: [185, 28, 28] },
    { label: 'COMPLETADO', count: summary.totals.completed, color: [22, 101, 52] },
    { label: 'EN PROCESO', count: summary.totals.inProgress, color: [3, 105, 161] },
    { label: 'BLOQUEADO', count: summary.totals.blocked, color: [153, 27, 27] },
    { label: 'PENDIENTE', count: summary.totals.pending, color: [146, 64, 14] },
  ];

  metrics.forEach((m, idx) => {
    const xPos = margin + idx * (boxWidth + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(xPos, y, boxWidth, 12, 1.5, 1.5, 'FD');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(m.color[0], m.color[1], m.color[2]);
    doc.text(String(m.count), xPos + boxWidth / 2, y + 5.5, { align: 'center' });

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, xPos + boxWidth / 2, y + 9.5, { align: 'center' });
  });

  y += 18;

  // Accounts Activities Tables
  data.accounts.forEach((account) => {
    checkNewPage(25);

    // Account Section Header
    doc.setFillColor(primaryRed[0], primaryRed[1], primaryRed[2]);
    doc.rect(margin, y, contentWidth, 7, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(255, 255, 255);
    doc.text(account.accountName.toUpperCase(), margin + 4, y + 4.8);

    const actCountText = `${account.activities.length} Actividades`;
    doc.setFontSize(8);
    doc.text(actCountText, pageWidth - margin - 4, y + 4.8, { align: 'right' });

    y += 7;

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, 6, 'FD');

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(71, 85, 105);

    const colEstatusX = margin + 3;
    const colTemaX = margin + 32;
    const colUpdateX = margin + 90;

    doc.text('ESTATUS', colEstatusX, y + 4.2);
    doc.text('TEMA / PROYECTO', colTemaX, y + 4.2);
    doc.text('AVANCES / SIGUIENTES PASOS', colUpdateX, y + 4.2);

    y += 6;

    if (account.activities.length === 0) {
      doc.rect(margin, y, contentWidth, 7, 'S');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Sin actividades registradas en esta semana.', margin + 4, y + 4.8);
      y += 7;
    } else {
      account.activities.forEach((act) => {
        // Calculate height based on wrapped text
        const topicLines = doc.splitTextToSize(act.topic || '-', 54);
        const updateLines = doc.splitTextToSize(act.update || '-', contentWidth - 94);

        const linesCount = Math.max(topicLines.length, updateLines.length, 1);
        const rowHeight = Math.max(8, linesCount * 4 + 3);

        checkNewPage(rowHeight);

        // Row background & border
        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, y, contentWidth, rowHeight, 'S');

        // Status Badge
        const statusColors = getStatusColor(act.status);
        doc.setFillColor(statusColors.bg[0], statusColors.bg[1], statusColors.bg[2]);
        doc.roundedRect(margin + 2, y + 2, 26, 5, 1, 1, 'F');

        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(statusColors.text[0], statusColors.text[1], statusColors.text[2]);
        doc.text(act.status.toUpperCase(), margin + 15, y + 5.5, { align: 'center' });

        // Topic text
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59);
        doc.text(topicLines, colTemaX, y + 4.5);

        // Update text
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        doc.text(updateLines, colUpdateX, y + 4.5);

        y += rowHeight;
      });
    }

    y += 5; // spacing between accounts
  });

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Bottom Line
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);

    doc.text(
      'Thomas Wagner.MX • Business Development Agency • www.thomaswagner.mx',
      margin,
      pageHeight - 7
    );
    doc.text(`Página ${i} de ${pageCount}`, pageWidth - margin, pageHeight - 7, {
      align: 'right',
    });
  }

  const arrayBuffer = doc.output('arraybuffer');
  return Buffer.from(arrayBuffer);
}
