import React from 'react';
import { FullReportData } from '../types/report';
import { formatDateDisplay, getStatusBadgeConfig } from '../utils/helpers';
import { WmpLogo } from './WmpLogo';

interface ReportPreviewProps {
  reportData: FullReportData;
}

export const ReportPreview: React.FC<ReportPreviewProps> = ({ reportData }) => {
  const { metadata, accounts } = reportData;

  return (
    <div className="flex justify-center my-6 bg-slate-200/60 p-2 sm:p-6 rounded-2xl overflow-x-auto">
      {/* Contenedor Hoja Carta para Impresión / Renderizado PDF (8.5 x 11 pulgadas proporciones exactas) */}
      <div
        id="report-pdf-canvas-container"
        className="bg-white text-slate-800 w-[794px] min-h-[1027px] p-[38px] shadow-2xl rounded-none relative flex flex-col justify-between font-sans box-border"
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxSizing: 'border-box',
        }}
      >
        {/* ENCABEZADO SUPERIOR PDF */}
        <div id="pdf-general-info-block">
          {/* Línea roja delgada de acento superior */}
          <div className="w-full h-[3px] bg-[#B91C1C] mb-4" style={{ backgroundColor: '#B91C1C' }} />

          {/* TITULO Y LOGO OFICIAL */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-[22px] font-black text-[#B91C1C] tracking-tight leading-tight mb-0.5" style={{ color: '#B91C1C' }}>
                Reporte Semanal de Estatus
              </h1>
              <p className="text-[12px] text-[#64748B] font-medium" style={{ color: '#64748B' }}>
                Thomas Wagner.MX • Business Development Agency
              </p>
            </div>
            <div className="shrink-0 pl-4">
              <WmpLogo size="lg" />
            </div>
          </div>

          {/* TABLA DE INFORMACION GENERAL */}
          <div className="mb-6 border border-[#CBD5E1] rounded-none overflow-hidden" style={{ borderColor: '#CBD5E1' }}>
            <table className="w-full border-collapse text-left" style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr className="bg-[#F8FAFC] text-[#B91C1C] text-[10px] font-bold tracking-wider border-b border-[#CBD5E1]" style={{ backgroundColor: '#F8FAFC', color: '#B91C1C', borderBottom: '1px solid #CBD5E1' }}>
                  <th className="py-2.5 px-3 border-r border-[#CBD5E1] w-[20%]" style={{ borderRight: '1px solid #CBD5E1', verticalAlign: 'middle', lineHeight: '1.2' }}>Semana</th>
                  <th className="py-2.5 px-3 border-r border-[#CBD5E1] w-[30%]" style={{ borderRight: '1px solid #CBD5E1', verticalAlign: 'middle', lineHeight: '1.2' }}>Fecha de Corte</th>
                  <th className="py-2.5 px-3 w-[50%]" style={{ verticalAlign: 'middle', lineHeight: '1.2' }}>Responsable</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[11px] text-[#1E293B] bg-[#FFFFFF] border-b border-[#CBD5E1]" style={{ backgroundColor: '#FFFFFF', color: '#1E293B', borderBottom: '1px solid #CBD5E1' }}>
                  <td className="py-2 px-3 border-r border-[#CBD5E1] font-medium" style={{ borderRight: '1px solid #CBD5E1' }}>
                    {metadata.week || <span className="text-[#94A3B8] italic" style={{ color: '#94A3B8' }}>Escribe aquí</span>}
                  </td>
                  <td className="py-2 px-3 border-r border-[#CBD5E1] font-medium" style={{ borderRight: '1px solid #CBD5E1' }}>
                    {formatDateDisplay(metadata.cutoffDate) || <span className="text-[#94A3B8] italic" style={{ color: '#94A3B8' }}>dd/mm/aaaa</span>}
                  </td>
                  <td className="py-2 px-3 font-medium">
                    {metadata.responsible || <span className="text-[#94A3B8] italic" style={{ color: '#94A3B8' }}>Nombre</span>}
                  </td>
                </tr>
              </tbody>
              <thead>
                <tr className="bg-[#F8FAFC] text-[#B91C1C] text-[10px] font-bold tracking-wider border-b border-[#CBD5E1]" style={{ backgroundColor: '#F8FAFC', color: '#B91C1C', borderBottom: '1px solid #CBD5E1' }}>
                  <th className="py-2.5 px-3 border-r border-[#CBD5E1] w-[35%]" style={{ borderRight: '1px solid #CBD5E1', verticalAlign: 'middle', lineHeight: '1.2' }}>Área / Puesto</th>
                  <th className="py-2.5 px-3 border-r border-[#CBD5E1] w-[30%]" style={{ borderRight: '1px solid #CBD5E1', verticalAlign: 'middle', lineHeight: '1.2' }}>Teléfono</th>
                  <th className="py-2.5 px-3 w-[35%]" style={{ verticalAlign: 'middle', lineHeight: '1.2' }}>Correo Electrónico</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[11px] text-[#1E293B] bg-[#FFFFFF]" style={{ backgroundColor: '#FFFFFF', color: '#1E293B' }}>
                  <td className="py-2 px-3 border-r border-[#CBD5E1] font-medium" style={{ borderRight: '1px solid #CBD5E1' }}>
                    {metadata.department || <span className="text-[#94A3B8] italic" style={{ color: '#94A3B8' }}>Área o puesto</span>}
                  </td>
                  <td className="py-2 px-3 border-r border-[#CBD5E1] font-medium" style={{ borderRight: '1px solid #CBD5E1' }}>
                    {metadata.phone || <span className="text-[#94A3B8] italic" style={{ color: '#94A3B8' }}>Teléfono</span>}
                  </td>
                  <td className="py-2 px-3 font-medium">
                    {metadata.email || <span className="text-[#94A3B8] italic" style={{ color: '#94A3B8' }}>Correo</span>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECCIONES POR CUENTA */}
        <div id="pdf-accounts-container" className="space-y-4">
          {accounts.map((acc) => {
            const hasActivities = acc.activities.length > 0;

            return (
              <div key={acc.accountId} className="pdf-account-card border border-[#CBD5E1] rounded-none overflow-hidden" style={{ border: '1px solid #CBD5E1' }}>
                {/* Encabezado Nombre de la Cuenta */}
                <div className="bg-[#F8FAFC] border-b border-[#CBD5E1] px-3 py-1.5 flex items-center justify-between" style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #CBD5E1' }}>
                  <h2 className="text-[13px] font-bold text-[#B91C1C]" style={{ color: '#B91C1C' }}>
                    {acc.accountName}
                  </h2>
                </div>

                {/* Tabla de Actividades */}
                <table className="w-full border-collapse text-left" style={{ borderCollapse: 'collapse', width: '100%', tableLayout: 'fixed' }}>
                  <thead>
                    <tr className="bg-[#B91C1C] text-white text-[10px] font-bold tracking-wider" style={{ backgroundColor: '#B91C1C', color: '#FFFFFF' }}>
                      <th className="py-2 px-3 border-r border-[#991B1B] w-[38%]" style={{ borderRight: '1px solid #991B1B', verticalAlign: 'middle', lineHeight: '1.2', width: '38%' }}>
                        Tema / Proyecto
                      </th>
                      <th className="py-2 px-3 w-[62%]" style={{ verticalAlign: 'middle', lineHeight: '1.2', width: '62%' }}>
                        Estatus / Actualización
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#CBD5E1]">
                    {!hasActivities ? (
                      <tr className="text-[11px] text-[#64748B] italic bg-[#FFFFFF]" style={{ backgroundColor: '#FFFFFF', color: '#64748B' }}>
                        <td className="py-2 px-3 border-r border-[#CBD5E1]" style={{ borderRight: '1px solid #CBD5E1' }}>
                          Escribe el tema o proyecto
                        </td>
                        <td className="py-2 px-3">
                          Avance, pendiente, bloqueo o siguiente paso
                        </td>
                      </tr>
                    ) : (
                      acc.activities.map((act) => {
                        const badge = getStatusBadgeConfig(act.status);

                        return (
                          <tr key={act.id} className="text-[11px] text-[#1E293B] bg-[#FFFFFF] align-top" style={{ backgroundColor: '#FFFFFF', color: '#1E293B', borderBottom: '1px solid #CBD5E1' }}>
                            {/* TEMA */}
                            <td className="py-2.5 px-3 border-r border-[#CBD5E1] font-semibold text-[#1E293B] break-words" style={{ borderRight: '1px solid #CBD5E1', color: '#1E293B', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                              {act.topic || <span className="text-[#94A3B8] font-normal italic" style={{ color: '#94A3B8' }}>Escribe el tema o proyecto</span>}
                            </td>

                            {/* ESTATUS Y ACTUALIZACION */}
                            <td className="py-2.5 px-3 break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                              <div>
                                {/* Badge de Estatus */}
                                <div style={{ display: 'block', marginBottom: '4px' }}>
                                  <span
                                    className="pdf-status-badge"
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      backgroundColor: badge.badgeBgPdf,
                                      color: badge.pdfColor,
                                      border: `1px solid ${badge.pdfColor}`,
                                      borderRadius: '3px',
                                      fontSize: '9px',
                                      fontWeight: 700,
                                      letterSpacing: '0.025em',
                                      padding: '2px 8px',
                                      lineHeight: '1',
                                      textAlign: 'center',
                                      boxSizing: 'border-box',
                                      minHeight: '18px',
                                    }}
                                  >
                                    {act.status}
                                  </span>
                                </div>

                                {/* Texto de Actualización */}
                                <p className="text-[11px] text-[#334155] leading-relaxed whitespace-pre-wrap break-words" style={{ color: '#334155', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                  {act.update || <span className="text-[#94A3B8] italic" style={{ color: '#94A3B8' }}>Avance, pendiente, bloqueo o siguiente paso</span>}
                                </p>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

        {/* PIE DE PÁGINA CORPORATIVO THOMAS WAGNER.MX */}
        <div id="pdf-corporate-footer" className="mt-10 pt-4 border-t border-[#CBD5E1] text-[#334155]" style={{ borderTop: '1px solid #CBD5E1', color: '#334155', width: '100%', boxSizing: 'border-box' }}>
          <div className="flex flex-row justify-between items-center text-[9px] leading-snug" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            
            {/* Columna Izquierda: Dirección Fiscal & Contacto */}
            <div className="font-medium" style={{ width: '42%', boxSizing: 'border-box' }}>
              <strong className="block text-[#B91C1C] font-bold text-[10px] mb-0.5" style={{ color: '#B91C1C', display: 'block' }}>
                Thomas Wagner.MX
              </strong>
              <p className="text-[#475569]" style={{ color: '#475569', margin: 0 }}>
                Level Tower B - 2. Floor Avenida Antea 1130<br />
                76127 Jurica, Querétaro, México<br />
                <span className="font-semibold text-[#B91C1C]" style={{ color: '#B91C1C' }}>T: +52 442 181 7209 | +49 174 470 9939</span>
              </p>
            </div>

            {/* Columna Centro: Logo Corporativo Thomas Wagner */}
            <div className="text-center flex flex-col items-center justify-center border-x border-[#E2E8F0] px-2 py-1" style={{ width: '32%', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'col', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
              <WmpLogo size="lg" />
              <span className="text-[7.5px] text-[#64748B] font-bold tracking-wider block mt-1" style={{ color: '#64748B', display: 'block' }}>
                Business Development Agency
              </span>
            </div>

            {/* Columna Derecha: Web & Correo */}
            <div className="text-right text-[8.5px] text-[#475569] space-y-0.5" style={{ width: '26%', textAlign: 'right', color: '#475569', boxSizing: 'border-box' }}>
              <strong className="block text-[#B91C1C]" style={{ color: '#B91C1C', display: 'block' }}>E: wagner@thomaswagner.mx</strong>
              <strong className="block text-[#B91C1C]" style={{ color: '#B91C1C', display: 'block' }}>W: www.thomaswagner.mx</strong>
            </div>

          </div>

          {/* Barra inferior sólida en rojo corporativo */}
          <div className="w-full h-2.5 bg-[#B91C1C] mt-3" style={{ backgroundColor: '#B91C1C', height: '10px', width: '100%' }} />
        </div>

      </div>
    </div>
  );
};
