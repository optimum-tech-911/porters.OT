import { simulatorModes, type MulaSettings, type SimulatorMode } from '../data/mula-settings';

export type MulaInput = { amount: string; managementFee: number; fixedFee: number; expenses: number; days: number; contract: 'CDI' | 'CDD' };
export type MulaPayload = Record<string, number | string | null>;
export type MulaResult = Record<string, number | boolean>;
export const mulaSourceUrl = (serial: string) => `https://www.simulation-portage-salarial.fr/api/v1/sources/${encodeURIComponent(serial)}`;

export function buildMulaRequest(settings: MulaSettings, mode: SimulatorMode, input: MulaInput) {
  if (!settings.enabled || !settings.calculateEnabled || settings.modes[mode] !== 'enabled') throw new Error('Ce parcours est momentanément indisponible.');
  const selected = simulatorModes.find((item) => item.id === mode);
  if (!selected) throw new Error('Choisissez un parcours.');
  const number = (value: unknown, min: number, max: number) => {
    const n = typeof value === 'string' && value.trim() ? Number(value.replace(',', '.')) : value;
    if (typeof n !== 'number' || !Number.isFinite(n) || n < min || n > max) throw new Error(`Renseignez un montant entre ${min} et ${max}.`);
    return n;
  };
  const field = (key: 'managementFee' | 'fixedFee' | 'expenses' | 'days', min: number, max: number) => number(settings.fields[key] === 'enabled' ? input[key] : settings[key], min, max);
  const contract = settings.fields.contract === 'enabled' ? input.contract : settings.contract;
  if ((contract !== 'CDI' && contract !== 'CDD') || (contract === 'CDI' ? !settings.allowCDI : !settings.allowCDD)) throw new Error('Ce contrat est indisponible.');
  const payload: MulaPayload = {
    ope: selected.ope, [selected.parameter]: number(input.amount, .01, 10000000),
    notbillable_fees: field('expenses', 0, 100000), contract_type: contract,
    management_fee: field('managementFee', 0, 50), management_fee_fix: field('fixedFee', 0, 10000), nombre_jours: field('days', 1, 31),
    overtime: 0, sans_mutuelle: null, mutuelle_type: 1, email: null,
  };
  if (selected.endpoint === 'salary') payload.duree_prestation = 1;
  if (mode === 'total') payload.cout_total = 1;
  return { url: `${mulaSourceUrl(settings.sourceSerial)}/simulators/${selected.endpoint}/compute`, payload };
}

/** Uses the same public calculation endpoint as the client's MULA source. */
export async function calculateWithMula(url: string, payload: MulaPayload, signal: AbortSignal): Promise<MulaResult> {
  const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload), signal });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result) throw new Error('La simulation n’a pas pu être calculée. Vérifiez vos montants puis réessayez.');
  if (result.simulator_show_results === false) return { simulator_show_results: false };
  if (!['ca_mensuel', 'net_a_payer', 'salaire_brut', 'tjm'].every((key) => typeof result[key] === 'number' && Number.isFinite(result[key]))) throw new Error('Le service de calcul a renvoyé une réponse incomplète. Réessayez dans quelques instants.');
  return result;
}

export function mulaPdfUrl(serial: string, payload: MulaPayload) {
  const params = new URLSearchParams(Object.entries(payload).filter(([, value]) => value !== null).map(([key, value]) => [key, String(value)]));
  return `${mulaSourceUrl(serial)}/simulators/salary/download/pdf?${params}`;
}
