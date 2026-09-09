import { boundedSetting, readJsonObject, safeWebUrl, shortText } from './site-notifications';

export const MULA_SETTINGS_KEY = 'simulator.mula.settings.v1';
export const simulatorModes = [
  { id: 'tjm', label: 'Mon TJM', field: 'TJM (Taux Journalier Moyen)', parameter: 'tjm', endpoint: 'salary', ope: 1 },
  { id: 'revenue', label: 'Mon chiffre d’affaires', field: 'Chiffre d’affaires mensuel', parameter: 'ca', endpoint: 'salary', ope: 2 },
  { id: 'gross', label: 'Mon salaire brut', field: 'Salaire mensuel brut', parameter: 'salary', endpoint: 'tjm', ope: 1 },
  { id: 'net', label: 'Mon salaire net', field: 'Salaire mensuel net', parameter: 'salary', endpoint: 'tjm', ope: 2 },
  { id: 'total', label: 'Le coût total salaire', field: 'Coût total salaire', parameter: 'cout', endpoint: 'salary', ope: 2 },
] as const;
export type SimulatorMode = typeof simulatorModes[number]['id'];
export type ControlState = 'enabled' | 'disabled' | 'hidden';
export type MulaSettings = {
  enabled: boolean;
  sourceSerial: string;
  title: string;
  description: string;
  disclaimer: string;
  modes: Record<SimulatorMode, ControlState>;
  defaultMode: SimulatorMode;
  managementFee: number;
  fixedFee: number;
  expenses: number;
  days: number;
  contract: 'CDI' | 'CDD';
  fields: Record<'managementFee' | 'fixedFee' | 'expenses' | 'days' | 'contract', ControlState>;
  allowCDI: boolean;
  allowCDD: boolean;
  calculateEnabled: boolean;
  showResults: boolean;
  showDetails: boolean;
  pdfEnabled: boolean;
  contactEnabled: boolean;
  contactLabel: string;
  contactHref: string;
  leadCaptureEnabled: boolean;
  leadTitle: string;
  leadSubmitLabel: string;
};
export const defaultMulaSettings: MulaSettings = {
  enabled: true, sourceSerial: '6535194A4DB03',
  title: 'Simulez votre revenu en portage',
  description: 'Calculez vos revenus ou votre taux journalier moyen à l’aide de notre simulateur.',
  disclaimer: 'Ce simulateur est indicatif et n’a pas de valeur contractuelle.',
  modes: { tjm: 'enabled', revenue: 'enabled', gross: 'enabled', net: 'enabled', total: 'enabled' },
  defaultMode: 'tjm', managementFee: 5, fixedFee: 0, expenses: 0, days: 20, contract: 'CDI',
  fields: { managementFee: 'disabled', fixedFee: 'hidden', expenses: 'enabled', days: 'enabled', contract: 'enabled' },
  allowCDI: true, allowCDD: true, calculateEnabled: true, showResults: true, showDetails: true,
  pdfEnabled: true, contactEnabled: true, contactLabel: 'Contacter un conseiller', contactHref: '/rendez-vous',
  leadCaptureEnabled: true, leadTitle: 'Recevez cette simulation et faites-la relire', leadSubmitLabel: 'Transmettre ma simulation',
};

export function parseMulaSettings(raw: unknown): MulaSettings {
  const v = readJsonObject(raw);
  const bool = (key: string, fallback?: boolean) => {
    const value = v[key] ?? fallback;
    if (typeof value !== 'boolean') throw new Error(`Réglage invalide : ${key}`);
    return value;
  };
  const states = <K extends string>(value: unknown, keys: K[]): Record<K, ControlState> => {
    const source = readJsonObject(value);
    return Object.fromEntries(keys.map((key) => {
      if (!['enabled', 'disabled', 'hidden'].includes(String(source[key]))) throw new Error(`État invalide : ${key}`);
      return [key, source[key]];
    })) as Record<K, ControlState>;
  };
  const modes = states(v.modes, simulatorModes.map((mode) => mode.id));
  const defaultMode = v.defaultMode as SimulatorMode;
  if (!simulatorModes.some((mode) => mode.id === defaultMode) || modes[defaultMode] !== 'enabled') throw new Error('Le parcours par défaut doit être actif.');
  const sourceSerial = shortText(v.sourceSerial, 32);
  if (!/^[A-Z0-9]{8,32}$/.test(sourceSerial)) throw new Error('Identifiant de source MULA invalide.');
  const allowCDI = bool('allowCDI'), allowCDD = bool('allowCDD');
  if ((v.contract !== 'CDI' && v.contract !== 'CDD') || (v.contract === 'CDI' ? !allowCDI : !allowCDD)) throw new Error('Le contrat par défaut doit être autorisé.');
  const contactHref = safeWebUrl(v.contactHref);
  if (!contactHref) throw new Error('Lien de contact invalide.');
  return {
    enabled: bool('enabled'), sourceSerial, title: shortText(v.title, 150), description: shortText(v.description, 500), disclaimer: shortText(v.disclaimer, 500),
    modes, defaultMode, managementFee: boundedSetting(v.managementFee, 0, 50), fixedFee: boundedSetting(v.fixedFee, 0, 10000),
    expenses: boundedSetting(v.expenses, 0, 100000), days: boundedSetting(v.days, 1, 31), contract: v.contract,
    fields: states(v.fields, ['managementFee', 'fixedFee', 'expenses', 'days', 'contract']),
    allowCDI, allowCDD, calculateEnabled: bool('calculateEnabled'), showResults: bool('showResults'), showDetails: bool('showDetails'),
    pdfEnabled: bool('pdfEnabled'), contactEnabled: bool('contactEnabled'), contactLabel: shortText(v.contactLabel, 80), contactHref,
    leadCaptureEnabled: bool('leadCaptureEnabled', true), leadTitle: shortText(v.leadTitle ?? 'Recevez cette simulation et faites-la relire', 150), leadSubmitLabel: shortText(v.leadSubmitLabel ?? 'Transmettre ma simulation', 80),
  };
}
