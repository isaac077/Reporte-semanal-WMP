import { FullReportData, ActivityStatus } from '../types/report.ts';

// Status badge colors — mirrors getStatusBadgeConfig from helpers.ts
function getBadgeStyles(status: ActivityStatus): { bg: string; color: string; border: string } {
  switch (status) {
    case 'Completado':
      return { bg: '#dcfce7', color: '#166534', border: '#166534' };
    case 'En proceso':
      return { bg: '#dbeafe', color: '#1d4ed8', border: '#1d4ed8' };
    case 'Bloqueado':
      return { bg: '#fee2e2', color: '#991b1b', border: '#991b1b' };
    case 'Pendiente':
    default:
      return { bg: '#fef9c3', color: '#92400e', border: '#92400e' };
  }
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  } catch {
    return dateStr;
  }
}

/** Generates the same HTML as ReportPreview.tsx — self-contained, no external CSS */
export function buildReportHtml(data: FullReportData): string {
  const { metadata, accounts } = data;

  const accountsHtml = accounts
    .map((acc) => {
      const rowsHtml =
        acc.activities.length === 0
          ? `<tr>
              <td style="padding:8px 12px;border-right:1px solid #CBD5E1;color:#94a3b8;font-style:italic;font-size:11px;">Escribe el tema o proyecto</td>
              <td style="padding:8px 12px;color:#94a3b8;font-style:italic;font-size:11px;">Avance, pendiente, bloqueo o siguiente paso</td>
            </tr>`
          : acc.activities
              .map((act) => {
                const badge = getBadgeStyles(act.status as ActivityStatus);
                return `<tr style="border-bottom:1px solid #CBD5E1;vertical-align:top;">
                  <td style="padding:10px 12px;border-right:1px solid #CBD5E1;font-size:11px;font-weight:600;color:#1E293B;word-break:break-word;overflow-wrap:break-word;">
                    ${act.topic || '<span style="color:#94A3B8;font-weight:400;font-style:italic;">Escribe el tema o proyecto</span>'}
                  </td>
                  <td style="padding:10px 12px;font-size:11px;word-break:break-word;overflow-wrap:break-word;">
                    <div style="margin-bottom:4px;">
                      <span style="display:inline-block;background-color:${badge.bg};color:${badge.color};border:1px solid ${badge.border};border-radius:3px;font-size:9px;font-weight:700;letter-spacing:0.025em;padding:3px 8px 3px 8px;line-height:1;box-sizing:border-box;">
                        ${act.status}
                      </span>
                    </div>
                    <p style="margin:0;color:#334155;font-size:11px;line-height:1.5;white-space:pre-wrap;word-break:break-word;">
                      ${act.update || '<span style="color:#94A3B8;font-style:italic;">Avance, pendiente, bloqueo o siguiente paso</span>'}
                    </p>
                  </td>
                </tr>`;
              })
              .join('');

      return `<div style="border:1px solid #CBD5E1;margin-bottom:16px;page-break-inside:avoid;">
        <div style="background:#F8FAFC;border-bottom:1px solid #CBD5E1;padding:6px 12px;">
          <h2 style="margin:0;font-size:13px;font-weight:700;color:#B91C1C;">${acc.accountName}</h2>
        </div>
        <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
          <thead>
            <tr style="background:#B91C1C;color:#fff;font-size:10px;font-weight:700;">
              <th style="padding:8px 12px;border-right:1px solid #991B1B;text-align:left;width:38%;">Tema / Proyecto</th>
              <th style="padding:8px 12px;text-align:left;width:62%;">Estatus / Actualización</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>`;
    })
    .join('');

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
  <!-- Línea roja superior -->
  <div style="width:100%;height:3px;background:#B91C1C;margin-bottom:16px;"></div>

  <!-- Encabezado -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
    <div>
      <h1 style="font-size:22px;font-weight:900;color:#B91C1C;letter-spacing:-0.5px;line-height:1.2;margin-bottom:2px;">Reporte Semanal de Estatus</h1>
      <p style="font-size:12px;color:#64748B;font-weight:500;">Thomas Wagner.MX • Business Development Agency</p>
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
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${metadata.week || ''}</td>
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${formatDate(metadata.cutoffDate)}</td>
          <td style="padding:8px 12px;font-weight:500;">${metadata.responsible || ''}</td>
        </tr>
      </tbody>
      <thead>
        <tr style="background:#F8FAFC;color:#B91C1C;font-size:10px;font-weight:700;border-bottom:1px solid #CBD5E1;">
          <th style="padding:10px 12px;border-right:1px solid #CBD5E1;text-align:left;">Área / Puesto</th>
          <th style="padding:10px 12px;border-right:1px solid #CBD5E1;text-align:left;">Teléfono</th>
          <th style="padding:10px 12px;text-align:left;">Correo Electrónico</th>
        </tr>
      </thead>
      <tbody>
        <tr style="font-size:11px;">
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${metadata.department || ''}</td>
          <td style="padding:8px 12px;border-right:1px solid #CBD5E1;font-weight:500;">${metadata.phone || ''}</td>
          <td style="padding:8px 12px;font-weight:500;">${metadata.email || ''}</td>
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
          76127 Jurica, Querétaro, México<br/>
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
