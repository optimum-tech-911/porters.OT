import { useState } from 'react';

type Scenario = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  tjm: number;
  jours: number;
  frais: number;
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
    frais: 150,
  },
  {
    id: 'regular',
    title: 'Mission régulière',
    eyebrow: 'Je stabilise',
    description: 'Le scénario courant pour un consultant avec une activité mensuelle suivie.',
    tjm: 550,
    jours: 18,
    frais: 500,
  },
  {
    id: 'senior',
    title: 'Expert senior',
    eyebrow: 'J’optimise',
    description: 'Une activité soutenue pour visualiser un niveau de facturation senior.',
    tjm: 750,
    jours: 19,
    frais: 350,
  },
  {
    id: 'part-time',
    title: 'Temps choisi',
    eyebrow: 'Je module',
    description: 'Une projection pour garder de la flexibilité tout en sécurisant vos revenus.',
    tjm: 600,
    jours: 12,
    frais: 200,
  },
];

const MANAGEMENT_RATE = 0.1;
const SOCIAL_CHARGE_RATE = 0.45;

export default function SimulatorForm() {
  const [mode, setMode] = useState<SimulatorMode>('portage');
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[1]);
  const [tjm, setTjm] = useState<number>(scenarios[1].tjm);
  const [jours, setJours] = useState<number>(scenarios[1].jours);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(scenarios[1].tjm * scenarios[1].jours);
  const [frais, setFrais] = useState<number>(scenarios[1].frais);
  const [leadSent, setLeadSent] = useState(false);

  const selectScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setTjm(scenario.tjm);
    setJours(scenario.jours);
    setMonthlyRevenue(scenario.tjm * scenario.jours);
    setFrais(scenario.frais);
  };

  const ca = mode === 'freelance' ? tjm * jours : monthlyRevenue;
  const fraisGestion = mode === 'portage' ? ca * MANAGEMENT_RATE : 0;
  const baseAvantCharges = ca - fraisGestion - frais;
  const chargesSociales = baseAvantCharges > 0 ? baseAvantCharges * SOCIAL_CHARGE_RATE : 0;
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
      label: 'Frais de gestion (10 %)',
      value: `- ${formatCurrency(fraisGestion)}`,
      type: 'negative',
    },
    {
      label: 'Frais professionnels mensuels',
      value: `- ${formatCurrency(frais)}`,
      type: 'negative',
    },
    {
      label: 'Charges sociales estimatives (~45 %)',
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
            Estimez votre salaire à partir du chiffre d’affaires mensuel. Le TJM n’est pas affiché dans ce parcours.
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
            Calculez votre chiffre d’affaires avec un TJM et un nombre de jours facturés, sans l’assimiler à un salaire net.
          </span>
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === activeScenario.id;

          return (
            <button
              key={scenario.id}
              type="button"
              className={`rounded-lg border p-4 text-left transition-all duration-200 ${
                isActive
                  ? 'border-porters-gold bg-porters-navy text-porters-white shadow-[0_14px_30px_rgba(25,43,99,0.14)]'
                  : 'border-porters-navy/10 bg-white text-porters-black hover:border-porters-gold/60'
              }`}
              aria-pressed={isActive}
              onClick={() => selectScenario(scenario)}
            >
              <span
                className={`mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.18em] ${
                  isActive ? 'text-porters-gold' : 'text-porters-gold'
                }`}
              >
                {scenario.eyebrow}
              </span>
              <span
                className={`block font-heading text-base font-semibold ${
                  isActive ? 'text-porters-white' : 'text-porters-navy'
                }`}
              >
                {scenario.title}
              </span>
              <span
                className={`mt-2 block text-sm leading-relaxed ${
                  isActive ? 'text-porters-white/68' : 'text-porters-black/58'
                }`}
              >
                {scenario.description}
              </span>
            </button>
          );
        })}
      </div>

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
              Profil actif : <span className="font-semibold text-porters-navy">{activeScenario.title}</span>
            </p>
          </div>

          <div className="space-y-7">
            {mode === 'portage' ? (
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <label htmlFor="monthly-revenue" className="form-label mb-0">
                    Chiffre d’affaires mensuel
                  </label>
                  <output htmlFor="monthly-revenue" className="font-heading text-xl font-bold text-porters-navy">
                    {formatCurrency(monthlyRevenue)}
                  </output>
                </div>
                <input
                  type="range"
                  id="monthly-revenue"
                  className="sim-range"
                  min="3000"
                  max="25000"
                  step="100"
                  value={monthlyRevenue}
                  onChange={(event) => setMonthlyRevenue(Number(event.target.value))}
                />
                <div className="mt-2 flex justify-between text-xs text-porters-black/45">
                  <span>3 000 €</span>
                  <span>25 000 €</span>
                </div>
              </div>
            ) : (
              <>
              <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <label htmlFor="tjm" className="form-label mb-0">
                  Taux journalier moyen
                </label>
                <output htmlFor="tjm" className="font-heading text-xl font-bold text-porters-navy">
                  {formatCurrency(tjm)}
                </output>
              </div>
              <input
                type="range"
                id="tjm"
                className="sim-range"
                min="250"
                max="1200"
                step="10"
                value={tjm}
                onChange={(event) => setTjm(Number(event.target.value))}
              />
              <div className="mt-2 flex justify-between text-xs text-porters-black/45">
                <span>250 €</span>
                <span>1 200 €</span>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <label htmlFor="jours" className="form-label mb-0">
                  Jours facturés par mois
                </label>
                <output htmlFor="jours" className="font-heading text-xl font-bold text-porters-navy">
                  {jours} j
                </output>
              </div>
              <input
                type="range"
                id="jours"
                className="sim-range"
                min="4"
                max="22"
                step="1"
                value={jours}
                onChange={(event) => setJours(Number(event.target.value))}
              />
              <div className="mt-2 flex justify-between text-xs text-porters-black/45">
                <span>4 jours</span>
                <span>22 jours</span>
              </div>
            </div>
              </>
            )}

            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <label htmlFor="frais" className="form-label mb-0">
                  Frais professionnels mensuels
                </label>
                <output htmlFor="frais" className="font-heading text-xl font-bold text-porters-navy">
                  {formatCurrency(frais)}
                </output>
              </div>
              <input
                type="range"
                id="frais"
                className="sim-range"
                min="0"
                max="1200"
                step="25"
                value={frais}
                onChange={(event) => setFrais(Number(event.target.value))}
              />
              <div className="mt-2 flex justify-between text-xs text-porters-black/45">
                <span>0 €</span>
                <span>1 200 €</span>
              </div>
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
                  ? "Cette estimation donne une première lecture. Un conseiller peut ensuite affiner les frais, le taux de gestion, la mutuelle et les options d'optimisation."
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

        {leadSent ? (
          <div className="rounded-lg border border-porters-gold/30 bg-porters-gold/10 p-5">
            <p className="font-heading text-lg font-semibold text-porters-navy">
              Votre demande a bien été envoyée.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-porters-black/65">
              Un conseiller The Porters vous contactera très prochainement pour affiner cette
              simulation avec vous et répondre à toutes vos questions.
            </p>
          </div>
        ) : (
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              // TODO: branch Supabase lead capture, PDF/email sending and admin notification.
              setLeadSent(true);
            }}
          >
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
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-lg border border-porters-navy/10 bg-porters-navy/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="mb-0 text-sm leading-relaxed text-porters-black/58">
          Simulation indicative, non contractuelle. Les montants réels varient selon votre
          situation, les paramètres sociaux et les conditions validées ensemble.
        </p>
        <a href="/rendez-vous" className="btn btn-primary shrink-0">
          Affiner ma simulation
        </a>
      </div>
    </div>
  );
}
