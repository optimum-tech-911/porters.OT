import { useEffect, useRef, useState, type SubmitEvent } from 'react';
import NumericSliderField from './NumericSliderField';
import { supabase } from '../../lib/supabase';
import {
  defaultSimulatorSettings,
  parseSimulatorSettings,
  SIMULATOR_SETTINGS_KEY,
} from '../../data/simulator-settings';

type Scenario = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  tjm: number;
  jours: number;
};

type SimulatorMode = 'portage' | 'freelance';

const scenarios: Scenario[] = [
  {
    id: 'launch',
    title: 'Premier contrat',
    eyebrow: 'Je démarre',
    description: 'Un cadre prudent pour projeter une première mission.',
    tjm: 420,
    jours: 16,
  },
  {
    id: 'regular',
    title: 'Mission régulière',
    eyebrow: 'Je stabilise',
    description: 'Le scénario courant pour un consultant avec une activité mensuelle suivie.',
    tjm: 550,
    jours: 18,
  },
  {
    id: 'senior',
    title: 'Expert senior',
    eyebrow: 'J’optimise',
    description: 'Une activité soutenue pour visualiser un niveau de facturation senior.',
    tjm: 750,
    jours: 19,
  },
  {
    id: 'part-time',
    title: 'Temps choisi',
    eyebrow: 'Je module',
    description: 'Une projection pour garder de la flexibilité tout en sécurisant vos revenus.',
    tjm: 600,
    jours: 12,
  },
];

export default function SimulatorForm() {
  const [settings, setSettings] = useState(defaultSimulatorSettings);
  const [mode, setMode] = useState<SimulatorMode>('portage');
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const activeScenario = scenarios.find((scenario) => scenario.id === activeScenarioId);
  const [tjm, setTjm] = useState<number>(defaultSimulatorSettings.defaultTjm);
  const [jours, setJours] = useState<number>(defaultSimulatorSettings.defaultWorkedDays);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(defaultSimulatorSettings.defaultMonthlyRevenue);
  const userAdjustedProjection = useRef({
    tjm: false,
    jours: false,
    monthlyRevenue: false,
  });

  useEffect(() => {
    let active = true;
    void supabase
      .from('cms_published_content')
      .select('published_content')
      .eq('content_key', SIMULATOR_SETTINGS_KEY)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.warn('[Simulator] Published settings unavailable; defaults retained:', error);
          return;
        }
        if (!data?.published_content) return;
        const next = parseSimulatorSettings(data.published_content);
        setSettings(next);
        // A slow settings request must not reset values the visitor has already
        // adjusted while the page was becoming interactive.
        if (!userAdjustedProjection.current.tjm) setTjm(next.defaultTjm);
        if (!userAdjustedProjection.current.jours) setJours(next.defaultWorkedDays);
        if (!userAdjustedProjection.current.monthlyRevenue) setMonthlyRevenue(next.defaultMonthlyRevenue);
      });
    return () => {
      active = false;
    };
  }, []);

  const managementRatePercent = settings.managementFeePercent;
  const socialChargeRate = settings.socialChargesPercent / 100;
  const frais = settings.monthlyExpenses;
  const ca = mode === 'freelance' ? tjm * jours : monthlyRevenue;
  const fraisGestion = mode === 'portage' ? ca * (managementRatePercent / 100) : 0;
  const baseAvantCharges = ca - fraisGestion - frais;
  const chargesSociales = baseAvantCharges > 0 ? baseAvantCharges * socialChargeRate : 0;
  const netMensuel = baseAvantCharges > 0 ? baseAvantCharges - chargesSociales : 0;
  const retentionRate = ca > 0 ? (netMensuel / ca) * 100 : 0;
  const freelanceAvailable = Math.max(ca - frais, 0);
  const resultMonthly = mode === 'portage' ? netMensuel : ca;
  const resultAnnual = resultMonthly * 12;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  const formatDays = (value: number) => `${value} j`;

  const formatPercent = (value: number) =>
    new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 0,
    }).format(value);

  const portageBreakdownRows = [
    {
      label: "Chiffre d'affaires mensuel",
      value: formatCurrency(ca),
      type: 'positive',
    },
    {
      // Le taux vient de settings.managementFeePercent — source unique, surchargeable
      // depuis l'admin. Jamais codé en dur ailleurs, et /tarifs ne le duplique pas.
      // TODO-CLIENT: F-C15 — confirmer la politique commerciale de frais de gestion.
      // Tant qu'elle ne l'est pas, ce chiffre reste une hypothèse non contractuelle.
      label: `Hypothèse de frais de gestion : ${managementRatePercent} %`,
      value: `- ${formatCurrency(fraisGestion)}`,
      type: 'negative',
    },
    {
      label: 'Frais professionnels mensuels',
      value: `- ${formatCurrency(frais)}`,
      type: 'negative',
    },
    {
      label: `Charges sociales estimatives (~${formatPercent(settings.socialChargesPercent)} %)`,
      value: `- ${formatCurrency(chargesSociales)}`,
      type: 'negative',
    },
  ];

  const freelanceBreakdownRows = [
    {
      label: "Chiffre d'affaires mensuel (TJM × jours)",
      value: formatCurrency(ca),
      type: 'positive',
    },
    {
      label: 'Frais professionnels mensuels',
      value: `- ${formatCurrency(frais)}`,
      type: 'negative',
    },
    {
      label: 'Disponible avant cotisations et impôts',
      value: formatCurrency(freelanceAvailable),
      type: 'positive',
    },
  ];
  const breakdownRows = mode === 'portage' ? portageBreakdownRows : freelanceBreakdownRows;

  function applyScenario(scenario: Scenario) {
    userAdjustedProjection.current = { tjm: true, jours: true, monthlyRevenue: true };
    setActiveScenarioId(scenario.id);
    setTjm(scenario.tjm);
    setJours(scenario.jours);
    setMonthlyRevenue(scenario.tjm * scenario.jours);
  }

  function prepareSimulationEmail(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = [
      `Prénom : ${String(form.get('firstName') || '')}`,
      `Nom : ${String(form.get('lastName') || '')}`,
      `Email : ${String(form.get('email') || '')}`,
      `Téléphone : ${String(form.get('phone') || '')}`,
      `Profil : ${String(form.get('profile') || '')}`,
      `Base de calcul : ${String(form.get('revenueType') || '')}`,
      '',
      `Parcours : ${mode === 'portage' ? 'Portage salarial' : 'Activité freelance'}`,
      `TJM : ${formatCurrency(tjm)}`,
      `Jours facturés : ${jours}`,
      `Chiffre d’affaires mensuel : ${formatCurrency(ca)}`,
      `Frais professionnels : ${formatCurrency(frais)}`,
      mode === 'portage' ? `Net mensuel estimé : ${formatCurrency(netMensuel)}` : '',
      '',
      settings.legalNotice,
    ].filter(Boolean).join('\n');

    // No lead-capture table or mail service exists in this project yet. Match
    // the contact form's honest fallback instead of displaying a false success.
    window.location.href = `mailto:contact@porters.fr?subject=${encodeURIComponent('Demande de simulation détaillée')}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2" role="tablist" aria-label="Choisir un simulateur">
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'portage'}
          className={`rounded-xl border p-5 text-left transition-all ${
            mode === 'portage'
              ? 'border-porters-gold bg-porters-navy text-white shadow-[0_16px_38px_rgba(25,43,99,0.14)]'
              : 'border-porters-navy/10 bg-white text-porters-navy hover:border-porters-gold/60'
          }`}
          onClick={() => setMode('portage')}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-porters-gold">Simulateur 01</span>
          <strong className="mt-2 block font-heading text-xl">Portage salarial</strong>
          <span className={`mt-2 block text-sm leading-relaxed ${mode === 'portage' ? 'text-white/68' : 'text-porters-black/58'}`}>
            {settings.portageDescription}
          </span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'freelance'}
          className={`rounded-xl border p-5 text-left transition-all ${
            mode === 'freelance'
              ? 'border-porters-gold bg-porters-navy text-white shadow-[0_16px_38px_rgba(25,43,99,0.14)]'
              : 'border-porters-navy/10 bg-white text-porters-navy hover:border-porters-gold/60'
          }`}
          onClick={() => setMode('freelance')}
        >
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-porters-gold">Simulateur 02</span>
          <strong className="mt-2 block font-heading text-xl">Activité freelance</strong>
          <span className={`mt-2 block text-sm leading-relaxed ${mode === 'freelance' ? 'text-white/68' : 'text-porters-black/58'}`}>
            {settings.freelanceDescription}
          </span>
        </button>
      </div>

      <section aria-labelledby="simulator-scenarios-title">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-porters-gold">Scénarios rapides</p>
            <h3 id="simulator-scenarios-title" className="font-heading text-xl font-semibold text-porters-navy">Partez d’un repère, puis ajustez-le.</h3>
          </div>
          <p className="mb-0 text-xs text-porters-black/50">Les montants restent entièrement modifiables.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              aria-pressed={activeScenarioId === scenario.id}
              className={`group rounded-lg border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-porters-gold/50 ${
                activeScenarioId === scenario.id
                  ? 'border-porters-gold bg-porters-navy text-white shadow-[0_14px_34px_rgba(25,43,99,0.12)]'
                  : 'border-porters-navy/10 bg-white text-porters-navy hover:-translate-y-0.5 hover:border-porters-gold/60'
              }`}
              onClick={() => applyScenario(scenario)}
            >
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-porters-gold">{scenario.eyebrow}</span>
              <strong className="mt-1 block font-heading text-base">{scenario.title}</strong>
              <span className={`mt-2 block text-xs leading-relaxed ${activeScenarioId === scenario.id ? 'text-white/62' : 'text-porters-black/52'}`}>{scenario.description}</span>
              <span className={`mt-3 block border-t pt-3 text-xs font-semibold ${activeScenarioId === scenario.id ? 'border-white/12 text-porters-gold' : 'border-porters-navy/8 text-porters-navy/70'}`}>
                {formatCurrency(scenario.tjm)} / j · {scenario.jours} jours
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(20rem,0.58fr)] lg:items-start">
        <div className="rounded-lg border border-porters-navy/10 bg-white p-5 shadow-[0_18px_50px_rgba(25,43,99,0.06)] sm:p-7">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-porters-gold">
                Hypothèses
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-porters-navy">
                Ajustez votre projection
              </h3>
            </div>
            <p className="text-sm text-porters-black/55">
              Profil actif : <span className="font-semibold text-porters-navy">{activeScenario?.title ?? 'Réglage personnalisé'}</span>
            </p>
          </div>

          <div className="space-y-7">
            {mode === 'portage' ? (
              <NumericSliderField
                id="monthly-revenue"
                label="Chiffre d’affaires mensuel"
                ariaLabel="Chiffre d’affaires mensuel en euros"
                value={monthlyRevenue}
                min={3000}
                max={25000}
                step={100}
                format={formatCurrency}
                minLabel="3 000 €"
                maxLabel="25 000 €"
                onChange={(value) => {
                  userAdjustedProjection.current.monthlyRevenue = true;
                  setActiveScenarioId(null);
                  setMonthlyRevenue(value);
                }}
              />
            ) : (
              <>
                <NumericSliderField
                  id="tjm"
                  label="Taux journalier moyen"
                  ariaLabel="Taux journalier moyen en euros"
                  value={tjm}
                  min={250}
                  max={1200}
                  step={10}
                  format={formatCurrency}
                  minLabel="250 €"
                  maxLabel="1 200 €"
                  onChange={(value) => {
                    userAdjustedProjection.current.tjm = true;
                    setActiveScenarioId(null);
                    setTjm(value);
                  }}
                />
                <NumericSliderField
                  id="jours"
                  label="Jours facturés par mois"
                  ariaLabel="Nombre de jours facturés par mois"
                  value={jours}
                  min={4}
                  max={22}
                  step={1}
                  format={formatDays}
                  minLabel="4 jours"
                  maxLabel="22 jours"
                  onChange={(value) => {
                    userAdjustedProjection.current.jours = true;
                    setActiveScenarioId(null);
                    setJours(value);
                  }}
                />
              </>
            )}

            <div className="rounded-lg border border-porters-navy/10 bg-porters-navy/[0.03] p-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="form-label mb-0">Frais professionnels</span>
                <strong className="font-heading text-xl font-bold text-porters-navy">
                  {formatCurrency(settings.monthlyExpenses)} / mois
                </strong>
              </div>
              <p className="mt-1 mb-0 text-xs text-porters-black/55">
                Hypothèse fixe utilisée dans cette simulation.
              </p>
            </div>
          </div>
        </div>

        <aside className="overflow-hidden rounded-lg bg-porters-navy text-porters-white shadow-[0_20px_55px_rgba(25,43,99,0.16)]">
          <div className="border-b border-white/10 p-5 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-porters-gold">
              Résultat live
            </p>
            <p className="mt-3 text-porters-white/62">
              {mode === 'portage' ? 'Salaire net mensuel estimé' : "Chiffre d'affaires mensuel estimé"}
            </p>
            <p className="mt-2 font-heading text-[2.7rem] font-bold leading-none text-porters-white sm:text-[3.35rem]">
              {formatCurrency(resultMonthly)}
            </p>
            <p className="mt-3 text-sm text-porters-white/56">
              {mode === 'portage'
                ? `soit ${formatCurrency(resultAnnual)} net estimé sur 12 mois`
                : `soit ${formatCurrency(resultAnnual)} de chiffre d’affaires sur 12 mois`}
            </p>
          </div>

          <div className="grid grid-cols-2 border-b border-white/10 text-center">
            <div className="border-r border-white/10 p-4">
              <p className="font-heading text-xl font-bold text-porters-gold">
                {mode === 'portage' ? formatCurrency(netMensuel) : formatCurrency(tjm)}
              </p>
              <p className="mt-1 text-xs text-porters-white/54">
                {mode === 'portage' ? 'net mensuel estimé' : 'TJM saisi'}
              </p>
            </div>
            <div className="p-4">
              <p className="font-heading text-xl font-bold text-porters-gold">
                {mode === 'portage' ? `${formatPercent(retentionRate)} %` : `${jours} j`}
              </p>
              <p className="mt-1 text-xs text-porters-white/54">
                {mode === 'portage' ? 'du CA en net estimé' : 'facturés par mois'}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <h4 className="mb-4 font-heading text-base font-semibold text-porters-white">
              Détail simplifié
            </h4>
            <div className="space-y-3">
              {breakdownRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-start justify-between gap-4 border-b border-white/8 pb-3 text-sm last:border-b-0 last:pb-0"
                >
                  <span className="text-porters-white/62">{row.label}</span>
                  <span
                    className={`shrink-0 font-semibold ${
                      row.type === 'positive' ? 'text-porters-white' : 'text-porters-white/78'
                    }`}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-porters-gold/30 bg-porters-gold/10 p-4">
              <p className="text-sm leading-relaxed text-porters-white/78">
                {mode === 'portage'
                  ? settings.resultDisclaimer
                  : "Ce parcours calcule le chiffre d'affaires, pas un revenu net. Les cotisations et impôts dépendent du statut freelance choisi."}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-porters-navy/10 bg-white p-5">
          <p className="font-heading font-semibold text-porters-navy">Lecture immédiate</p>
          <p className="mt-2 text-sm leading-relaxed text-porters-black/60">
            {mode === 'portage'
              ? "Visualisez l'effet du chiffre d'affaires et des frais sur votre salaire estimé."
              : "Visualisez l'effet du TJM, des jours facturés et des frais sur votre chiffre d'affaires."}
          </p>
        </div>
        <div className="rounded-lg border border-porters-navy/10 bg-white p-5">
          <p className="font-heading font-semibold text-porters-navy">Scénarios comparables</p>
          <p className="mt-2 text-sm leading-relaxed text-porters-black/60">
            Passez d'un démarrage prudent à une mission senior sans ressaisir tous les champs.
          </p>
        </div>
        <div className="rounded-lg border border-porters-navy/10 bg-white p-5">
          <p className="font-heading font-semibold text-porters-navy">Suite personnalisée</p>
          <p className="mt-2 text-sm leading-relaxed text-porters-black/60">
            Repartez avec une base claire pour un échange précis avec l'équipe The Porters.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-porters-navy/10 bg-white p-5 shadow-[0_18px_50px_rgba(25,43,99,0.06)] sm:p-7">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-porters-gold">
            Recevoir ma simulation
          </p>
          <h3 className="mt-2 font-heading text-2xl font-semibold text-porters-navy">
            Gardez une trace de votre scénario
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-porters-black/60">
            Laissez vos coordonnées pour préparer un échange précis autour de votre activité, de
            votre profil métier et de vos frais professionnels.
          </p>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={prepareSimulationEmail}>
            <div>
              <label className="form-label" htmlFor="lead-first-name">
                Prénom
              </label>
              <input id="lead-first-name" name="firstName" className="form-input" required />
            </div>
            <div>
              <label className="form-label" htmlFor="lead-last-name">
                Nom
              </label>
              <input id="lead-last-name" name="lastName" className="form-input" required />
            </div>
            <div>
              <label className="form-label" htmlFor="lead-email">
                Email
              </label>
              <input id="lead-email" name="email" type="email" className="form-input" required />
            </div>
            <div>
              <label className="form-label" htmlFor="lead-phone">
                Téléphone
              </label>
              <input id="lead-phone" name="phone" type="tel" className="form-input" required />
            </div>
            <div>
              <label className="form-label" htmlFor="lead-profile">
                Profil métier / poste
              </label>
              <select id="lead-profile" name="profile" className="form-input" required>
                <option value="">Sélectionner</option>
                <option>Consultant cybersécurité</option>
                <option>Développeur</option>
                <option>DevOps / Cloud engineer</option>
                <option>Data / IA</option>
                <option>Product Owner / Scrum Master</option>
                <option>Chef de projet IT</option>
                <option>Autre consultant tech</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="lead-revenue-type">
                Base de calcul
              </label>
              <select id="lead-revenue-type" name="revenueType" className="form-input" required>
                <option>TJM</option>
                <option>Chiffre d'affaires mensuel</option>
              </select>
            </div>
            <input type="hidden" name="tjm" value={tjm} />
            <input type="hidden" name="daysWorked" value={jours} />
            <input type="hidden" name="simulatorMode" value={mode} />
            <input type="hidden" name="monthlyRevenue" value={ca} />
            <input type="hidden" name="professionalExpenses" value={frais} />
            <input type="hidden" name="estimatedNetMonthly" value={mode === 'portage' ? Math.round(netMensuel) : ''} />
            <label className="md:col-span-2 flex items-start gap-3 rounded-lg bg-porters-navy/[0.03] p-4 text-sm text-porters-black/65">
              <input type="checkbox" name="consent" className="mt-1" required />
              <span>
                J'accepte que The Porters utilise ces informations pour me recontacter au sujet de
                ma simulation, conformément à la politique de confidentialité.
              </span>
            </label>
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary">
                Recevoir ma simulation détaillée
              </button>
            </div>
        </form>
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-porters-navy/10 bg-porters-navy/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="mb-0 text-sm leading-relaxed text-porters-black/58">
          {settings.legalNotice}
        </p>
        <a href="/rendez-vous" className="btn btn-primary shrink-0">
          Affiner ma simulation
        </a>
      </div>
    </div>
  );
}
