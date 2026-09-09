import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import { defaultMulaSettings, MULA_SETTINGS_KEY, parseMulaSettings, simulatorModes, type MulaSettings, type SimulatorMode } from '../../data/mula-settings';
import { buildMulaRequest, calculateWithMula, mulaPdfUrl, type MulaInput, type MulaPayload, type MulaResult } from '../../lib/mula-calculator';
import { crmAttribution } from '../../lib/crm-attribution';
import { watchPublishedSettings } from '../../lib/published-settings';
import { supabase } from '../../lib/supabase';
import './mula-simulator.css';

const initialInput = (settings: MulaSettings): MulaInput => ({ amount: '', managementFee: settings.managementFee, fixedFee: settings.fixedFee, expenses: settings.expenses, days: settings.days, contract: settings.contract });
const money = (value: number | boolean | undefined) => typeof value === 'number' && Number.isFinite(value) ? value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) : '—';
const rows = [
  ['ca_mensuel', 'Chiffre d’affaires mensuel'], ['tjm', 'Taux journalier moyen'], ['mt_frais_gestion', 'Frais de gestion'],
  ['frais_non_refacturable', 'Frais non refacturables'], ['disponible_pour_salaire', 'Disponible pour le salaire'],
  ['salaire_brut', 'Salaire mensuel brut'], ['charges_patronales', 'Charges patronales'], ['charges_salariales', 'Charges salariales'],
  ['net_a_payer', 'Net à payer avant prélèvement à la source'], ['net_plus_frais', 'Net à payer et remboursement des frais'],
] as const;

export default function MulaSimulator({ preview }: { preview?: MulaSettings }) {
  const [published, setPublished] = useState(defaultMulaSettings);
  const settings = preview ?? published;
  const [ready, setReady] = useState(Boolean(preview));
  const [mode, setMode] = useState<SimulatorMode>(settings.defaultMode);
  const [input, setInput] = useState(() => initialInput(settings));
  const [result, setResult] = useState<{ data: MulaResult; payload: MulaPayload; serial: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadState, setLeadState] = useState<{ status: 'idle' | 'submitting' | 'success' | 'error'; message: string }>({ status: 'idle', message: '' });
  const request = useRef<AbortController | null>(null);
  const currentMode = settings.modes[mode] === 'enabled' ? mode : settings.defaultMode;
  const selected = simulatorModes.find((item) => item.id === currentMode)!;
  const visibleModes = simulatorModes.filter((item) => settings.modes[item.id] !== 'hidden');

  const invalidate = () => { request.current?.abort(); request.current = null; setResult(null); setError(''); setLoading(false); setLeadState({ status: 'idle', message: '' }); };
  useEffect(() => {
    if (preview) return;
    return watchPublishedSettings(MULA_SETTINGS_KEY, parseMulaSettings, setPublished, () => setReady(true));
  }, [preview]);
  useEffect(() => { invalidate(); setInput(initialInput(settings)); setMode(settings.defaultMode); }, [settings]);
  useEffect(() => () => request.current?.abort(), []);
  const edit = (next: Partial<MulaInput>) => { invalidate(); setInput({ ...input, ...next }); };
  const select = (next: SimulatorMode) => { invalidate(); setMode(next); setInput({ ...input, amount: '' }); };

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading || preview || !ready) return;
    invalidate();
    const controller = new AbortController(); request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const { url, payload } = buildMulaRequest(settings, currentMode, input);
      setLoading(true);
      const data = await calculateWithMula(url, payload, controller.signal);
      if (request.current === controller) setResult({ data, payload, serial: settings.sourceSerial });
    } catch (err) {
      if (request.current === controller) setError(controller.signal.aborted ? 'Le service met trop de temps à répondre. Réessayez dans quelques instants.' : err instanceof Error ? err.message : 'La simulation est indisponible.');
    } finally {
      window.clearTimeout(timeout);
      if (request.current === controller) { setLoading(false); request.current = null; }
    }
  }

  async function submitLead(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || leadState.status === 'submitting' || preview) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setLeadState({ status: 'submitting', message: 'Enregistrement sécurisé de votre demande…' });
    const firstName = String(form.get('firstName') || '').trim();
    const lastName = String(form.get('lastName') || '').trim();
    const monthlyRevenue = Number(result.data.ca_mensuel);
    const days = Number(result.payload.nombre_jours);
    const tjm = Number(result.data.tjm) || (days > 0 ? monthlyRevenue / days : 0);
    const { error: leadError } = await supabase.from('crm_inquiries').insert({
      kind: 'simulation',
      inquiry_type: 'simulation',
      source: 'website',
      status: 'new',
      priority: monthlyRevenue >= 10000 ? 'high' : 'medium',
      first_name: firstName,
      last_name: lastName,
      name: `${firstName} ${lastName}`.trim(),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      profile: String(form.get('profile') || '').trim(),
      subject: 'Simulation de revenus MULA',
      message: `Parcours : ${selected.label}. Source : ${result.serial}.`,
      simulator_mode: 'portage',
      tjm: Number.isFinite(tjm) ? Math.round(tjm * 100) / 100 : null,
      days_worked: Number.isFinite(days) ? Math.round(days) : null,
      monthly_revenue: Number.isFinite(monthlyRevenue) ? Math.round(monthlyRevenue * 100) / 100 : null,
      professional_expenses: Number(result.payload.notbillable_fees) || 0,
      estimated_net_monthly: Number(result.data.net_a_payer) || null,
      consent: form.get('consent') === 'on',
      metadata: { requestType: 'simulation', simulatorMode: currentMode, sourceSerial: result.serial, payload: result.payload },
      ...crmAttribution(),
    });
    if (leadError) {
      console.error('[Simulator] Unable to save inquiry:', leadError);
      setLeadState({ status: 'error', message: 'La demande n’a pas pu être transmise. Réessayez ou utilisez le lien de contact.' });
      return;
    }
    formElement.reset();
    setLeadState({ status: 'success', message: 'Votre simulation a bien été transmise à notre équipe.' });
  }

  const field = (key: 'managementFee' | 'fixedFee' | 'expenses' | 'days', label: string, unit: string, min: number, max: number) => settings.fields[key] !== 'hidden' && <label className="mula-form__field">{label}<span className="mula-form__input"><input name={key} type="number" min={min} max={max} step="any" required disabled={settings.fields[key] === 'disabled'} value={settings.fields[key] === 'enabled' ? (Number.isNaN(input[key]) ? '' : input[key]) : settings[key]} onChange={(event) => edit({ [key]: event.target.value === '' ? NaN : Number(event.target.value) })} /><span aria-hidden="true">{unit}</span></span></label>;
  return <div className="mula-form" data-cms-ignore>
    <header><h2>{settings.title}</h2><p>{settings.description}</p></header>
    {!settings.enabled ? <p role="status">Le simulateur est momentanément indisponible.</p> : <>
      <p className="mula-form__prompt">Je connais :</p>
      <div className="mula-form__tabs" role="tablist" aria-label="Point de départ de la simulation">
        {visibleModes.map((item) => <button key={item.id} id={`mula-tab-${item.id}`} type="button" role="tab" aria-selected={item.id === currentMode} aria-controls="mula-panel" tabIndex={item.id === currentMode ? 0 : -1} disabled={settings.modes[item.id] === 'disabled'} onClick={() => select(item.id)} onKeyDown={(event) => {
          if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault(); const enabled = visibleModes.filter((entry) => settings.modes[entry.id] === 'enabled');
          const index = enabled.findIndex((entry) => entry.id === currentMode);
          const next = enabled[event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length];
          select(next.id); document.getElementById(`mula-tab-${next.id}`)?.focus();
        }}>{item.label}</button>)}
      </div>
      <div id="mula-panel" role="tabpanel" aria-labelledby={`mula-tab-${currentMode}`} className="mula-form__panel">
        <form onSubmit={submit}>
          <label className="mula-form__field">{selected.field}<span className="mula-form__input"><input name="amount" type="number" min="0.01" max="10000000" step="any" required value={input.amount} onChange={(event) => edit({ amount: event.target.value })} /><span aria-hidden="true">{['tjm', 'revenue'].includes(currentMode) ? '€ HT' : '€'}</span></span></label>
          <div className="mula-form__grid">
            {field('managementFee', 'Taux de frais de gestion', '%', 0, 50)}
            {field('expenses', 'Frais non refacturables au client', '€', 0, 100000)}
            {field('fixedFee', 'Frais de gestion fixes', '€', 0, 10000)}
            {settings.fields.contract !== 'hidden' && <label className="mula-form__field">Nature du contrat<select name="contract" disabled={settings.fields.contract === 'disabled'} value={settings.fields.contract === 'enabled' ? input.contract : settings.contract} onChange={(event) => edit({ contract: event.target.value as 'CDI' | 'CDD' })}>{settings.allowCDI && <option>CDI</option>}{settings.allowCDD && <option>CDD</option>}</select></label>}
            {field('days', 'Nombre de jours', '', 1, 31)}
          </div>
          <button className="mula-form__calculate" type="submit" disabled={!ready || loading || !settings.calculateEnabled || Boolean(preview)}>{loading ? 'Calcul en cours…' : 'Calculer'}</button>
          <p className="mula-form__disclaimer">{settings.disclaimer}</p>
          {error && <p className="mula-form__error" role="alert">{error}</p>}
        </form>
        {result && <section className="mula-form__results" aria-live="polite" aria-label="Résultat de la simulation">
          {settings.showResults && result.data.simulator_show_results !== false ? <>
            <h3>Votre simulation</h3>
            <div className="mula-form__net"><span>Net à payer avant prélèvement à la source</span><strong>{money(result.data.net_a_payer)}</strong></div>
            {settings.showDetails && <dl>{rows.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{money(key === 'tjm' ? Number(result.data.ca_mensuel) / Number(result.payload.nombre_jours) : result.data[key])}</dd></div>)}</dl>}
          </> : <p>Votre simulation a été calculée. Un conseiller peut vous en présenter le détail.</p>}
          <div className="mula-form__actions">
            {settings.pdfEnabled && settings.showResults && result.data.simulator_show_results !== false && <a href={mulaPdfUrl(result.serial, result.payload)} target="_blank" rel="noopener noreferrer">Télécharger la simulation PDF ↗</a>}
            {settings.contactEnabled && <a href={settings.contactHref}>{settings.contactLabel} →</a>}
          </div>
          {settings.leadCaptureEnabled && <form className="mula-form__lead" onSubmit={submitLead}>
            <h4>{settings.leadTitle}</h4>
            <div className="mula-form__lead-grid">
              <label>Prénom<input name="firstName" autoComplete="given-name" minLength={1} maxLength={100} required /></label>
              <label>Nom<input name="lastName" autoComplete="family-name" minLength={1} maxLength={100} required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" maxLength={320} required /></label>
              <label>Téléphone<input name="phone" type="tel" autoComplete="tel" minLength={6} maxLength={60} required /></label>
              <label>Votre profil<select name="profile" required defaultValue=""><option value="" disabled>Sélectionnez</option><option value="Consultant indépendant">Consultant indépendant</option><option value="Salarié en transition">Salarié en transition</option><option value="Entreprise">Entreprise</option><option value="Autre">Autre</option></select></label>
            </div>
            <label className="mula-form__consent"><input name="consent" type="checkbox" required /><span>J’accepte que The Porters utilise ces informations et ma simulation pour répondre à ma demande. <a href="/confidentialite">Politique de confidentialité</a></span></label>
            {leadState.message && <p className={`mula-form__lead-status mula-form__lead-status--${leadState.status}`} role="status" aria-live="polite">{leadState.message}</p>}
            <button type="submit" disabled={leadState.status === 'submitting' || leadState.status === 'success'}>{leadState.status === 'submitting' ? 'Transmission…' : leadState.status === 'success' ? 'Simulation transmise' : settings.leadSubmitLabel}</button>
          </form>}
        </section>}
      </div>
    </>}
  </div>;
}
