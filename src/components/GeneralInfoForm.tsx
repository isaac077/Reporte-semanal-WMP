import React from 'react';
import { GeneralMetadata } from '../types/report';
import { Calendar, User, Briefcase, Clock, Phone, Mail } from 'lucide-react';
import { getWeekNumberFromDate } from '../utils/helpers';

interface GeneralInfoFormProps {
  metadata: GeneralMetadata;
  onChange: (updated: GeneralMetadata) => void;
}

export const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({ metadata, onChange }) => {
  const handleChange = (field: keyof GeneralMetadata, value: string) => {
    if (field === 'cutoffDate') {
      const computedWeek = getWeekNumberFromDate(value);
      onChange({
        ...metadata,
        cutoffDate: value,
        week: computedWeek || metadata.week,
      });
    } else {
      onChange({
        ...metadata,
        [field]: value,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 sm:p-5 mb-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-5 bg-[#B91C1C] rounded-full" />
          <h2 className="text-sm font-bold text-slate-800 tracking-wider">
            Información General del Reporte
          </h2>
        </div>
        <span className="text-xs text-slate-500 italic">
          Campos requeridos para la carátula superior
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Semana */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-[#B91C1C]" />
            Semana
          </label>
          <input
            type="text"
            placeholder="Ej. Semana 30"
            value={metadata.week}
            onChange={(e) => handleChange('week', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] focus:bg-white transition-all text-slate-800 font-medium"
          />
        </div>

        {/* Fecha de Corte */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5 flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1 text-[#B91C1C]" />
            Fecha de Corte
          </label>
          <input
            type="date"
            value={metadata.cutoffDate}
            onChange={(e) => handleChange('cutoffDate', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] focus:bg-white transition-all text-slate-800 font-medium cursor-pointer"
          />
        </div>

        {/* Responsable */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5 flex items-center">
            <User className="w-3.5 h-3.5 mr-1 text-[#B91C1C]" />
            Responsable
          </label>
          <input
            type="text"
            placeholder="Nombre completo"
            value={metadata.responsible}
            onChange={(e) => handleChange('responsible', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] focus:bg-white transition-all text-slate-800 font-medium"
          />
        </div>

        {/* Área / Puesto */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5 flex items-center">
            <Briefcase className="w-3.5 h-3.5 mr-1 text-[#B91C1C]" />
            Área / Puesto
          </label>
          <input
            type="text"
            placeholder="Ej. Business Development"
            value={metadata.department}
            onChange={(e) => handleChange('department', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] focus:bg-white transition-all text-slate-800 font-medium"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5 flex items-center">
            <Phone className="w-3.5 h-3.5 mr-1 text-[#B91C1C]" />
            Teléfono
          </label>
          <input
            type="text"
            placeholder="Ej. +52 442 181 7209"
            value={metadata.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] focus:bg-white transition-all text-slate-800 font-medium"
          />
        </div>

        {/* Correo Electrónico */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 tracking-wide mb-1.5 flex items-center">
            <Mail className="w-3.5 h-3.5 mr-1 text-[#B91C1C]" />
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="wagner@thomaswagner.mx"
            value={metadata.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C] focus:bg-white transition-all text-slate-800 font-medium"
          />
        </div>
      </div>
    </div>
  );
};
