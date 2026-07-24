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
        className="bg-white text-slate-800 w-[794px] min-h-[1123px] p-[38px] shadow-2xl rounded-none relative flex flex-col justify-between font-sans box-border"
        style={{
          fontFamily: 'Arial, Helvetica, sans-serif',
        }}
      >
        {/* ENCABEZADO SUPERIOR PDF */}
        <div>
          {/* Línea azul delgada de acento superior */}
          <div className="w-full h-[3px] bg-[#0F3D64] mb-4" />

          {/* TITULO Y LOGO OFICIAL */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-[22px] font-black text-[#0F3D64] tracking-tight uppercase leading-tight mb-0.5">
                REPORTE SEMANAL DE ESTATUS
              </h1>
              <p className="text-[12px] text-[#64748B] font-medium">
                Seguimiento de proyectos por cuenta
              </p>
            </div>
            <div className="shrink-0 pl-4">
              <WmpLogo size="lg" />
            </div>
          </div>

          {/* TABLA DE INFORMACION GENERAL */}
          <div className="mb-6 border border-[#CBD5E1] rounded-none overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#E9ECEF] text-[#0F3D64] text-[10px] font-bold uppercase tracking-wider border-b border-[#CBD5E1]">
                  <th className="py-2 px-3 border-r border-[#CBD5E1] w-[20%]">SEMANA</th>
                  <th className="py-2 px-3 border-r border-[#CBD5E1] w-[25%]">FECHA DE CORTE</th>
                  <th className="py-2 px-3 border-r border-[#CBD5E1] w-[30%]">RESPONSABLE</th>
                  <th className="py-2 px-3 w-[25%]">ÁREA / PUESTO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-[12px] text-[#1E293B] bg-[#FFFFFF]">
                  <td className="py-2 px-3 border-r border-[#CBD5E1] font-medium">
                    {metadata.week || <span className="text-[#94A3B8] italic">Escribe aquí</span>}
                  </td>
                  <td className="py-2 px-3 border-r border-[#CBD5E1] font-medium">
                    {formatDateDisplay(metadata.cutoffDate) || <span className="text-[#94A3B8] italic">dd/mm/aaaa</span>}
                  </td>
                  <td className="py-2 px-3 border-r border-[#CBD5E1] font-medium">
                    {metadata.responsible || <span className="text-[#94A3B8] italic">Nombre</span>}
                  </td>
                  <td className="py-2 px-3 font-medium">
                    {metadata.department || <span className="text-[#94A3B8] italic">Área o puesto</span>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECCIONES POR CUENTA */}
          <div className="space-y-4">
            {accounts.map((acc) => {
              const hasActivities = acc.activities.length > 0;

              return (
                <div key={acc.accountId} className="border border-[#CBD5E1] rounded-none overflow-hidden">
                  {/* Encabezado Nombre de la Cuenta */}
                  <div className="bg-[#E9ECEF] border-b border-[#CBD5E1] px-3 py-1.5 flex items-center justify-between">
                    <h2 className="text-[13px] font-bold text-[#0F3D64]">
                      {acc.accountName}
                    </h2>
                  </div>

                  {/* Tabla de Actividades */}
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-[#0B4F82] text-white text-[10px] font-bold uppercase tracking-wider">
                        <th className="py-1.5 px-3 border-r border-[#0B4F82] w-[38%]">
                          TEMA
                        </th>
                        <th className="py-1.5 px-3 w-[62%]">
                          ESTATUS / ACTUALIZACIÓN
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CBD5E1]">
                      {!hasActivities ? (
                        <tr className="text-[11px] text-[#64748B] italic bg-[#FFFFFF]">
                          <td className="py-2 px-3 border-r border-[#CBD5E1]">
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
                            <tr key={act.id} className="text-[11px] text-[#1E293B] bg-[#FFFFFF] align-top">
                              {/* TEMA */}
                              <td className="py-2.5 px-3 border-r border-[#CBD5E1] font-semibold text-[#0F3D64]">
                                {act.topic || <span className="text-[#94A3B8] font-normal italic">Escribe el tema o proyecto</span>}
                              </td>

                              {/* ESTATUS Y ACTUALIZACION */}
                              <td className="py-2.5 px-3">
                                <div className="flex flex-col space-y-1">
                                  {/* Badge de Estatus */}
                                  <div className="flex items-center">
                                    <span
                                      className="inline-block px-2 py-0.5 rounded-xs text-[9px] font-bold uppercase tracking-wide border shadow-2xs"
                                      style={{
                                        backgroundColor: badge.badgeBgPdf,
                                        color: badge.pdfColor,
                                        borderColor: badge.pdfColor,
                                      }}
                                    >
                                      {act.status}
                                    </span>
                                  </div>

                                  {/* Texto de Actualización */}
                                  <p className="text-[11px] text-[#334155] leading-relaxed whitespace-pre-wrap">
                                    {act.update || <span className="text-[#94A3B8] italic">Avance, pendiente, bloqueo o siguiente paso</span>}
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

          {/* TIP INFERIOR */}
          <div className="mt-2 text-right">
            <span className="text-[10px] text-[#64748B] italic">
              Tip: en la última celda, Tab agrega una nueva fila con el mismo formato.
            </span>
          </div>
        </div>

        {/* PIE DE PÁGINA CORPORATIVO WMP */}
        <div className="mt-10 pt-4 border-t border-[#CBD5E1] text-[#334155]">
          <div className="grid grid-cols-12 gap-3 items-end text-[9px] leading-snug">
            
            {/* Columna Izquierda: Dirección Fiscal */}
            <div className="col-span-5 font-medium">
              <strong className="block text-[#0F3D64] font-bold text-[9.5px] mb-0.5">
                WM+P Management Services S. de R.L. de C.V.
              </strong>
              <p className="text-[#475569]">
                Av. Anillo Vial II Fray Junipero Serra #2601 Oficina 201<br />
                Colonia Juriquilla Santa Fe<br />
                76230 Querétaro, Querétaro, México<br />
                <span className="font-semibold text-[#0F3D64]">T: + 52 442 209 6850</span>
              </p>
            </div>

            {/* Columna Centro: Logo Corporativo WMP */}
            <div className="col-span-3 text-center flex flex-col items-center justify-center border-x border-[#E2E8F0] px-2 py-1">
              <WmpLogo size="lg" />
              <span className="text-[7px] text-[#64748B] font-bold uppercase tracking-wider block mt-1">
                Tax | Accounting | Audit | Legal | Digital | Consulting
              </span>
            </div>

            {/* Columna Derecha: Servicios y Oficinas */}
            <div className="col-span-4 text-right flex justify-end space-x-3 text-[8.5px] text-[#475569]">
              <div>
                <span className="block font-semibold text-[#0F3D64]">Tax</span>
                <span className="block font-semibold text-[#0F3D64]">Accounting</span>
                <span className="block font-semibold text-[#0F3D64]">Audit</span>
                <span className="block font-semibold text-[#0F3D64]">Payroll</span>
                <span className="block font-semibold text-[#0F3D64]">Legal</span>
                <span className="block font-semibold text-[#0F3D64]">Digital</span>
                <span className="block font-semibold text-[#0F3D64]">Consulting</span>
              </div>
              <div className="border-l border-slate-200 pl-2">
                <span className="block font-medium">Querétaro</span>
                <span className="block font-medium">Mexico City</span>
                <span className="block font-medium">Puebla</span>
                <span className="block font-medium">Monterrey</span>
                <span className="block font-medium">Stuttgart</span>
                <span className="block font-medium">Greenville</span>
                <span className="block font-medium">Shanghai</span>
              </div>
              <div className="border-l border-slate-200 pl-2 text-[8px]">
                <strong className="block text-[#0F3D64]">E: Info@wmp.mx</strong>
                <strong className="block text-[#0F3D64]">I: www.wmp.mx</strong>
              </div>
            </div>

          </div>

          {/* Barra inferior sólida en azul corporativo */}
          <div className="w-full h-2.5 bg-[#0B4F82] mt-2" />
        </div>

      </div>
    </div>
  );
};
