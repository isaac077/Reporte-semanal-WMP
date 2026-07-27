/**
 * CONFIGURACIÓN DE CUENTAS FIJAS PARA WMP MEXICO ADVISORS
 * 
 * Para agregar o modificar cuentas fijas en el futuro:
 * 1. Edite el arreglo `FIXED_ACCOUNTS` a continuación.
 * 2. Agregue un nuevo objeto con `id` único y `name` descriptivo.
 * Ejemplo:
 *   { id: 'nueva-cuenta', name: 'Nombre de la Nueva Cuenta' }
 */

export interface AccountConfig {
  id: string;
  name: string;
  description?: string;
}

export const FIXED_ACCOUNTS: AccountConfig[] = [
  {
    id: 'wmp-mexico-advisors',
    name: 'WMP Mexico Advisors',
    description: 'Servicios de asesoría fiscal, contable y corporativa',
  },
  {
    id: 'the-wmp-club',
    name: 'The WMP Club',
    description: 'Comunidad ejecutiva y eventos exclusivos WMP',
  },
  {
    id: 'consul',
    name: 'HK',
    description: 'Proyectos de consultoría empresarial y representación HK',
  },
  {
    id: 'acensblue',
    name: 'Acensblue',
    description: 'Reclutamiento y gestión de talento especializado',
  },
  {
    id: 'centro-aleman-queretaro',
    name: 'Centro Alemán Querétaro',
    description: 'Centro de formación y servicios de vinculación alemana',
  },
  {
    id: 'thomas-wagner-mx',
    name: 'Thomas Wagner.mx',
    description: 'Consultoría y soluciones estratégicas Thomas Wagner.mx',
  },
];
