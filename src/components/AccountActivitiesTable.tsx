import React from 'react';
import { AccountReport, ActivityItem, ActivityStatus } from '../types/report';
import { getStatusBadgeConfig } from '../utils/helpers';
import { Plus, Trash2 } from 'lucide-react';

interface AccountActivitiesTableProps {
  accountData: AccountReport;
  onUpdateActivities: (accountId: string, updatedActivities: ActivityItem[]) => void;
}

const STATUS_OPTIONS: ActivityStatus[] = ['Pendiente', 'En proceso', 'Bloqueado', 'Completado'];

export const AccountActivitiesTable: React.FC<AccountActivitiesTableProps> = ({
  accountData,
  onUpdateActivities,
}) => {
  const { accountId, accountName, activities } = accountData;

  // Agregar una nueva actividad vacía
  const handleAddRow = () => {
    const newActivity: ActivityItem = {
      id: 'act-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      topic: '',
      status: 'En proceso',
      update: '',
    };
    onUpdateActivities(accountId, [...activities, newActivity]);
  };

  // Eliminar una actividad
  const handleDeleteRow = (id: string) => {
    onUpdateActivities(
      accountId,
      activities.filter((act) => act.id !== id)
    );
  };

  // Actualizar un campo de una actividad
  const handleFieldChange = (
    id: string,
    field: keyof ActivityItem,
    value: string
  ) => {
    const updated = activities.map((act) => {
      if (act.id === id) {
        return { ...act, [field]: value };
      }
      return act;
    });
    onUpdateActivities(accountId, updated);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs mb-6 overflow-hidden">
      {/* Encabezado de la Sección de Cuenta */}
      <div className="bg-slate-100/80 border-b border-slate-200 px-4 sm:px-5 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-3 h-3 rounded-full bg-[#B91C1C]" />
          <h3 className="text-base font-bold text-[#B91C1C] tracking-tight">
            {accountName}
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
            {activities.length} {activities.length === 1 ? 'actividad' : 'actividades'}
          </span>
        </div>

        <button
          onClick={handleAddRow}
          type="button"
          className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg text-white bg-[#B91C1C] hover:bg-[#991B1B] shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Agregar Tema
        </button>
      </div>

      {/* Contenido de la Tabla */}
      {activities.length === 0 ? (
        <div className="p-8 text-center bg-slate-50/50">
          <p className="text-sm text-slate-500 italic mb-3">
            No hay temas registrados para <strong className="text-slate-700">{accountName}</strong>.
          </p>
          <button
            onClick={handleAddRow}
            type="button"
            className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold rounded-lg text-[#B91C1C] bg-red-50 border border-red-200 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Agregar primer tema para esta cuenta
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#B91C1C] text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-2.5 px-4 w-[35%] sm:w-[32%] border-r border-[#991B1B]">
                  TEMA O PROYECTO
                </th>
                <th className="py-2.5 px-4 w-[20%] sm:w-[18%] border-r border-[#991B1B]">
                  ESTATUS
                </th>
                <th className="py-2.5 px-4 w-[40%] sm:w-[45%] border-r border-[#991B1B]">
                  ACTUALIZACIÓN / AVANCE / SIGUIENTE PASO
                </th>
                <th className="py-2.5 px-3 w-[5%] text-center">
                  ACCIÓN
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {activities.map((act, index) => {
                const badgeConfig = getStatusBadgeConfig(act.status);

                return (
                  <tr
                    key={act.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Campo Tema o Proyecto */}
                    <td className="p-3 align-top">
                      <input
                        type="text"
                        placeholder="Escribe el tema o proyecto..."
                        value={act.topic}
                        onChange={(e) =>
                          handleFieldChange(act.id, 'topic', e.target.value)
                        }
                        className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] text-slate-900"
                      />
                    </td>

                    {/* Selector Estatus */}
                    <td className="p-3 align-top">
                      <select
                        value={act.status}
                        onChange={(e) =>
                          handleFieldChange(
                            act.id,
                            'status',
                            e.target.value as ActivityStatus
                          )
                        }
                        className={`w-full px-2.5 py-1.5 text-xs font-bold rounded-md border focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 cursor-pointer ${badgeConfig.bgClass}`}
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="bg-white text-slate-800 font-semibold">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Campo Actualización / Avance */}
                    <td className="p-3 align-top">
                      <textarea
                        rows={2}
                        placeholder="Avance, pendiente, bloqueo o siguiente paso..."
                        value={act.update}
                        onChange={(e) =>
                          handleFieldChange(act.id, 'update', e.target.value)
                        }
                        className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] text-slate-800 resize-y min-h-[42px]"
                      />
                    </td>

                    {/* Botón Eliminar Fila */}
                    <td className="p-3 align-top text-center">
                      <button
                        onClick={() => handleDeleteRow(act.id)}
                        type="button"
                        title="Eliminar esta fila"
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pie de tabla con botón para agregar rápida */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-end text-xs text-slate-500">
        <button
          onClick={handleAddRow}
          type="button"
          className="text-xs text-[#B91C1C] hover:text-[#991B1B] font-semibold hover:underline inline-flex items-center cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          + Agregar otra fila a {accountName}
        </button>
      </div>
    </div>
  );
};
