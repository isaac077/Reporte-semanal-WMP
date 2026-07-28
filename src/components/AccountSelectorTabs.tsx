import React from 'react';
import { FIXED_ACCOUNTS } from '../config/accounts';
import { AccountReport } from '../types/report';
import { Building2, Layers, CheckCircle2 } from 'lucide-react';

interface AccountSelectorTabsProps {
  selectedAccountId: string; // 'all' or fixed account ID
  onSelectAccount: (accountId: string) => void;
  accountsData: AccountReport[];
}

export const AccountSelectorTabs: React.FC<AccountSelectorTabsProps> = ({
  selectedAccountId,
  onSelectAccount,
  accountsData,
}) => {
  // Conteo de actividades por cuenta
  const getActivityCount = (accountId: string) => {
    const acc = accountsData.find((a) => a.accountId === accountId);
    return acc ? acc.activities.length : 0;
  };

  const totalActivitiesAll = accountsData.reduce(
    (total, acc) => total + acc.activities.length,
    0
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-3.5 mb-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-[#B91C1C]" />
          <span className="text-xs font-bold tracking-wider text-slate-700">
            Selección de Cuenta a Capturar
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Total de actividades activas: <strong className="text-[#B91C1C] font-bold">{totalActivitiesAll}</strong>
        </span>
      </div>

      {/* Selector responsivo: Botones de pestaña o Dropdown móvil */}
      <div className="hidden md:flex flex-wrap gap-2">
        {/* Opción Ver Todas */}
        <button
          onClick={() => onSelectAccount('all')}
          type="button"
          className={`inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            selectedAccountId === 'all'
              ? 'bg-[#B91C1C] text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5 mr-1.5" />
          Todas las Cuentas
          <span
            className={`ml-2 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              selectedAccountId === 'all'
                ? 'bg-red-500/30 text-white'
                : 'bg-slate-200 text-slate-700'
            }`}
          >
            {totalActivitiesAll}
          </span>
        </button>

        {/* Cuentas Fijas */}
        {FIXED_ACCOUNTS.map((acc) => {
          const count = getActivityCount(acc.id);
          const isSelected = selectedAccountId === acc.id;

          return (
            <button
              key={acc.id}
              onClick={() => onSelectAccount(acc.id)}
              type="button"
              className={`inline-flex items-center px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#B91C1C] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{acc.name}</span>
              {count > 0 && (
                <span
                  className={`ml-2 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isSelected
                      ? 'bg-red-400/30 text-white'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Select para dispositivos móviles */}
      <div className="md:hidden">
        <select
          value={selectedAccountId}
          onChange={(e) => onSelectAccount(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:ring-2 focus:ring-[#B91C1C]/20 focus:border-[#B91C1C]"
        >
          <option value="all">Todas las Cuentas ({totalActivitiesAll} actividades)</option>
          {FIXED_ACCOUNTS.map((acc) => {
            const count = getActivityCount(acc.id);
            return (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({count} actividades)
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
