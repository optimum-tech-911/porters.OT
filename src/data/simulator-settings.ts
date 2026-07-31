export const SIMULATOR_SETTINGS_KEY = 'simulator.formula.settings.v1';
export const SIMULATOR_SETTINGS_ROUTE = '/simulateur';

export type SimulatorSettings = {
  managementFeePercent: number;
  socialChargesPercent: number;
  monthlyExpenses: number;
  defaultMonthlyRevenue: number;
  defaultTjm: number;
  defaultWorkedDays: number;
  portageDescription: string;
  freelanceDescription: string;
  resultDisclaimer: string;
  legalNotice: string;
};

export const defaultSimulatorSettings: SimulatorSettings = {
  managementFeePercent: 10,
  socialChargesPercent: 45,
  monthlyExpenses: 500,
  defaultMonthlyRevenue: 9900,
  defaultTjm: 550,
  defaultWorkedDays: 18,
  portageDescription:
    'Estimez votre salaire à partir du chiffre d’affaires mensuel. Le TJM n’est pas affiché dans ce parcours.',
  freelanceDescription:
    'Calculez votre chiffre d’affaires avec un TJM et un nombre de jours facturés, sans l’assimiler à un salaire net.',
  resultDisclaimer:
    'Cette estimation donne une première lecture. Un conseiller peut ensuite affiner les paramètres de votre situation, la mutuelle et les éléments contractuels.',
  legalNotice:
    'Simulation indicative, non contractuelle. Les montants réels varient selon votre situation, les paramètres sociaux et les conditions validées ensemble.',
};

const limits: Record<keyof Pick<SimulatorSettings,
  | 'managementFeePercent'
  | 'socialChargesPercent'
  | 'monthlyExpenses'
  | 'defaultMonthlyRevenue'
  | 'defaultTjm'
  | 'defaultWorkedDays'
>, [number, number]> = {
  managementFeePercent: [0, 30],
  socialChargesPercent: [0, 70],
  monthlyExpenses: [0, 10000],
  defaultMonthlyRevenue: [3000, 25000],
  defaultTjm: [250, 1200],
  defaultWorkedDays: [4, 22],
};

function boundedNumber(value: unknown, fallback: number, min: number, max: number): number {
  const parsed = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

function safeText(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const clean = value.trim();
  return clean && clean.length <= 1000 ? clean : fallback;
}

export function parseSimulatorSettings(value: unknown): SimulatorSettings {
  let source: Record<string, unknown> = {};
  try {
    source = typeof value === 'string' ? JSON.parse(value) : (value as Record<string, unknown>) || {};
  } catch {
    return defaultSimulatorSettings;
  }

  return {
    managementFeePercent: boundedNumber(source.managementFeePercent, defaultSimulatorSettings.managementFeePercent, ...limits.managementFeePercent),
    socialChargesPercent: boundedNumber(source.socialChargesPercent, defaultSimulatorSettings.socialChargesPercent, ...limits.socialChargesPercent),
    monthlyExpenses: boundedNumber(source.monthlyExpenses, defaultSimulatorSettings.monthlyExpenses, ...limits.monthlyExpenses),
    defaultMonthlyRevenue: boundedNumber(source.defaultMonthlyRevenue, defaultSimulatorSettings.defaultMonthlyRevenue, ...limits.defaultMonthlyRevenue),
    defaultTjm: boundedNumber(source.defaultTjm, defaultSimulatorSettings.defaultTjm, ...limits.defaultTjm),
    defaultWorkedDays: boundedNumber(source.defaultWorkedDays, defaultSimulatorSettings.defaultWorkedDays, ...limits.defaultWorkedDays),
    portageDescription: safeText(source.portageDescription, defaultSimulatorSettings.portageDescription),
    freelanceDescription: safeText(source.freelanceDescription, defaultSimulatorSettings.freelanceDescription),
    resultDisclaimer: safeText(source.resultDisclaimer, defaultSimulatorSettings.resultDisclaimer),
    legalNotice: safeText(source.legalNotice, defaultSimulatorSettings.legalNotice),
  };
}
