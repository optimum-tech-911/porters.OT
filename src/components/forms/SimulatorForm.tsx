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

const scenarios: Scenario[] = [
  {
    id: 'launch',
    title: 'Premier contrat',
    eyebrow: 'Je démarre',
    description: 'Un cadre prudent pour valider une première mission en portage salarial.',
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
    frais: 250,
  },
  {
    id: 'senior',
    title: 'Expert senior',
    eyebrow: 'J’optimise',
    description: 'Un TJM plus élevé avec une lecture claire du net mensuel disponible.',
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

const MANAGEMENT_RATE = 0.08;
const SOCIAL_CHARGE_RATE = 0.45;

export default function SimulatorForm() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[1]);
  const [tjm, setTjm] = useState<number>(scenarios[1].tjm);
  const [jours, setJours] = useState<number>(scenarios[1].jours);
  const [frais, setFrais] = useState<number>(scenarios[1].frais);

  const selectScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setTjm(scenario.tjm);
    setJours(scenario.jours);
    setFrais(scenario.frais);
  };

  const ca = tjm * jours;
  const fraisGestion = ca * MANAGEMENT_RATE;
  const baseAvantCharges = ca - fraisGestion - frais;
  const chargesSociales = baseAvantCharges > 0 ? baseAvantCharges * SOCIAL_CHARGE_RATE : 0;
  const netMensuel = baseAvantCharges > 0 ? baseAvantCharges - chargesSociales : 0;
  const netAnnuel = netMensuel * 12;
  const netParJour = jours > 0 ? netMensuel / jours : 0;
  const retentionRate = ca > 0 ? (netMensuel / ca) * 100 : 0;

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

  const breakdownRows = [
    {
      label: "Chiffre d'affaires mensuel",
      value: formatCurrency(ca),
      type: 'positive',
    },
    {
      label: 'Frais de gestion estimatifs (8 %)',
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

  return (
    <div className="space-y-8">
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
            <p className="mt-3 text-porters-white/62">Salaire net mensuel estimé</p>
            <p className="mt-2 font-heading text-[2.7rem] font-bold leading-none text-porters-white sm:text-[3.35rem]">
              {formatCurrency(netMensuel)}
            </p>
            <p className="mt-3 text-sm text-porters-white/56">
              soit {formatCurrency(netAnnuel)} net estimé sur 12 mois
            </p>
          </div>

          <div className="grid grid-cols-2 border-b border-white/10 text-center">
            <div className="border-r border-white/10 p-4">
              <p className="font-heading text-xl font-bold text-porters-gold">
                {formatCurrency(netParJour)}
              </p>
              <p className="mt-1 text-xs text-porters-white/54">net par jour facturé</p>
            </div>
            <div className="p-4">
              <p className="font-heading text-xl font-bold text-porters-gold">
                {formatPercent(retentionRate)} %
              </p>
              <p className="mt-1 text-xs text-porters-white/54">du CA en net estimé</p>
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
                Cette estimation donne une première lecture. Un conseiller peut ensuite affiner
                les frais, le taux de gestion, la mutuelle et les options d'optimisation.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-porters-navy/10 bg-white p-5">
          <p className="font-heading font-semibold text-porters-navy">Lecture immédiate</p>
          <p className="mt-2 text-sm leading-relaxed text-porters-black/60">
            Visualisez l'effet du TJM, des jours facturés et des frais sur votre net.
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
