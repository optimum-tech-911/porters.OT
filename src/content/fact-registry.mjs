/**
 * Publication registry for the visitor-facing messages that matter.
 *
 * This is the machine-readable half of porters-copy-rewrite/docs/fact-base.md.
 * It exists because verified content has twice been removed silently by later
 * edits; `npm run check:facts` turns that into a build failure.
 *
 * THREE STATES — and the distinction is the point:
 *
 *   REQUIRED                  the message must reach a visitor. Absence fails.
 *   CLIENT_APPROVAL_REQUIRED  deliberately withheld pending confirmation.
 *                             Tracked, never asserted. Absence is CORRECT.
 *   FORBIDDEN                 must never reach a visitor. Presence fails.
 *                             (Enforced by scripts/check-forbidden-content.mjs,
 *                              which is contextual; listed here for the record.)
 *
 * The target is NOT maximum source coverage. Publishing everything in the PDFs
 * would be a failure, not a success: some of it is confidential, some is about a
 * different company, and some is a 2024 figure that nobody has reconfirmed.
 *
 * `evidence` holds substrings matched case-insensitively against the RENDERED
 * text of `route`, with apostrophes normalised. All entries must be present.
 */

export const REQUIRED = [
  // ── / — proof points authorised by the final client-preparation brief ────
  {
    id: 'F-HOME-PROOF-01',
    status: 'REQUIRED',
    source: 'Final Porters perfection brief, 04/08/2026',
    route: '/',
    message: 'The Porters accompagne plus de 150 missions en cours.',
    evidence: ['150+', 'Missions en cours'],
  },
  // F-HOME-PROOF-02 (« 10+ ans d’expérience ») a été retiré de REQUIRED :
  // voir WITHDRAWN_BY_CLIENT en bas de ce fichier.
  {
    id: 'F-HOME-PROOF-03',
    status: 'REQUIRED',
    source: 'LB2024 p.22; final Porters perfection brief, 04/08/2026',
    route: '/',
    message: 'La première rémunération est versée dès le premier mois.',
    evidence: ['1er mois', 'Première rémunération'],
  },

  // ── /portage-salarial (ex-/tarifs) — livre blanc p.22, « PAS DE FRAIS CACHÉS » ──────────────────
  {
    id: 'F-B14',
    status: 'REQUIRED',
    source: 'LB2024 p.22',
    route: '/portage-salarial',
    message: 'Le salarié porté est payé dès le premier mois, avant le règlement de la première facture client.',
    evidence: ['dès le premier mois'],
    notes: 'Affirmation générique portée par la source. Les échéances de paie exactes restent F-C14.',
  },
  {
    id: 'F-APPORT-01',
    status: 'REQUIRED',
    source: 'LB2024 p.19, p.22',
    route: '/portage-salarial',
    message: 'Des missions sont proposées via les partenaires, sans exclusivité.',
    evidence: ["apport d'affaires"],
  },
  {
    id: 'F-INTERLOC-01',
    status: 'REQUIRED',
    source: 'LB2024 p.22',
    route: '/portage-salarial',
    message: 'Un interlocuteur unique suit le dossier.',
    evidence: ['interlocuteur unique'],
  },
  {
    id: 'F-ADMIN-01',
    status: 'REQUIRED',
    source: 'LB2024 p.22',
    route: '/portage-salarial',
    message: 'La gestion administrative, sociale et fiscale est prise en charge.',
    evidence: ['gestion administrative'],
  },
  {
    id: 'F-B12',
    status: 'REQUIRED',
    source: 'LB2024 p.12, p.22',
    route: '/portage-salarial',
    message: 'La responsabilité civile professionnelle couvre le salarié porté.',
    evidence: ['responsabilité civile'],
  },
  {
    id: 'F-FORM-01',
    status: 'REQUIRED',
    source: 'LB2024 p.22',
    route: '/portage-salarial',
    message: 'Le financement des formations est couvert, dispositifs nommés.',
    evidence: ['CPF', 'OPCO'],
  },
  {
    id: 'F-B13',
    status: 'REQUIRED',
    source: 'LB2024 p.22',
    route: '/portage-salarial',
    message: 'La garantie financière sécurise le versement du salaire.',
    evidence: ['garantie financière'],
  },

  // ── /consultants — le cycle de vie complet du salarié porté ──────────────
  {
    id: 'F-D18',
    status: 'REQUIRED',
    source: 'LB2024 p.10, p.20',
    route: '/consultants',
    message: "L'entrée comprend un mode opératoire et une formation à LAYA, l'outil de gestion.",
    evidence: ['LAYA'],
  },
  {
    id: 'F-CRA-01',
    status: 'REQUIRED',
    source: 'LB2024 p.20',
    route: '/consultants',
    message: "Le rythme mensuel repose sur la déclaration du compte rendu d'activité et des frais.",
    evidence: ["compte rendu d'activité"],
  },
  {
    id: 'F-REMU-01',
    status: 'REQUIRED',
    source: 'LB2024 p.4, p.20',
    route: '/consultants',
    message: "Le chiffre d'affaires devient un salaire, facturation et paie prises en charge.",
    evidence: ['paie'],
  },
  {
    id: 'F-B05',
    status: 'REQUIRED',
    source: 'LB2024 p.8',
    route: '/consultants',
    message: 'Régime général, prévoyance, retraite, chômage, mutuelle, congés payés.',
    evidence: ['prévoyance'],
  },
  {
    id: 'F-B06',
    status: 'REQUIRED',
    source: 'LB2024 p.11',
    route: '/consultants',
    message: 'Le salarié porté acquiert 2,5 jours ouvrés de congés payés par mois.',
    evidence: ['2,5 jours'],
  },
  {
    id: 'F-CONGES-02',
    status: 'REQUIRED',
    source: 'LB2024 p.11',
    route: '/consultants',
    message: "Les congés sont versés sur le bulletin sous l'intitulé « Indemnités de congés payés ».",
    evidence: ['indemnités de congés'],
  },
  {
    id: 'F-B11',
    status: 'REQUIRED',
    source: 'LB2024 p.18',
    route: '/consultants',
    message: 'Un compte de trésorerie dédié permet de lisser la paie, financer des congés ou provisionner.',
    evidence: ['compte de trésorerie'],
  },
  {
    id: 'F-SORTIE-01',
    status: 'REQUIRED',
    source: 'LB2024 p.21',
    route: '/consultants',
    message: 'La fin de contrat est documentée : solde de tout compte, certificat de travail, attestation France Travail.',
    evidence: ['solde de tout compte', 'certificat de travail', 'France Travail'],
  },

  // ── /rse — mémoire technique §6 ──────────────────────────────────────────
  {
    id: 'F-RSE-HONNETE-01',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.24',
    route: '/rse',
    message: 'Les référentiels utilisés dans les pratiques sont distingués des certifications effectivement détenues.',
    evidence: ['référentiels que nous utilisons', 'effectivement détenus'],
    notes: 'copy-plan §13 Q7. Ne jamais transformer « trajectoire » en « certifié ».',
  },
  {
    id: 'F-D12',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.24',
    route: '/rse',
    message: 'Une trajectoire structurée vers les référentiels de reconnaissance est affirmée, sans certification revendiquée.',
    evidence: ['trajectoire structurée'],
  },
  {
    id: 'F-D09',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.24',
    route: '/rse',
    message: 'RGAA et WCAG servent de référence sur l’accessibilité.',
    evidence: ['RGAA', 'WCAG'],
  },
  {
    id: 'F-D10',
    status: 'REQUIRED',
    source: 'MT-LOT1 pp.23-24',
    route: '/rse',
    message: 'Charte Numérique Responsable diffusée, référent désigné, RGESN en référence.',
    evidence: ['RGESN'],
  },
  {
    id: 'F-D11',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.22',
    route: '/rse',
    message: 'Signataire de la Charte de la diversité.',
    evidence: ['Charte de la diversité'],
  },

  // ── /entreprises — mémoire technique §3 ─────────────────────────────────
  {
    id: 'F-D01',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.7',
    route: '/entreprises',
    message: 'Les référentiels métiers CIGREF, SYNTEC et ROME servent de grille de lecture.',
    evidence: ['CIGREF'],
  },
  {
    id: 'F-D02',
    status: 'REQUIRED',
    source: 'MT-LOT1 pp.7-8',
    route: '/entreprises',
    message: 'Le processus de sélection repose sur des entretiens structurés.',
    evidence: ['entretiens structurés'],
  },
  {
    id: 'F-GRILLES-01',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.7',
    route: '/entreprises',
    message: "Les entretiens s'appuient sur des grilles d'évaluation standardisées, pour une appréciation homogène et comparable.",
    evidence: ["grilles d'évaluation standardisées"],
    notes: 'Ajouté en Phase 5. Le meilleur actif B2B inexploité du corpus.',
  },
  {
    id: 'F-D03',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.8',
    route: '/entreprises',
    message: 'Les profils sont transmis sous forme anonymisée.',
    evidence: ['anonymis'],
  },
  {
    id: 'F-D07',
    status: 'REQUIRED',
    source: 'MT-LOT1 p.20',
    route: '/entreprises',
    message: 'La continuité repose sur un binôme avec relais identifié.',
    evidence: ['binôme'],
  },
];

/**
 * Deliberately withheld. Absence from the site is the CORRECT state.
 * Listed so a future agent can tell "missing on purpose" from "forgotten".
 */
export const CLIENT_APPROVAL_REQUIRED = [
  { id: 'F-A04', fact: 'Marque KwickStart en public', blocks: 'Q1 — visibilité du groupe' },
  { id: 'F-C15', fact: 'Taux de frais de gestion réel', blocks: 'Q5 — politique commerciale' },
  { id: 'F-C14', fact: 'Échéances de paie exactes (J+1 à J+5 / 10e jour ouvré)', blocks: 'Process 2026 à confirmer' },
  { id: 'F-C07', fact: 'Frais de rupture conventionnelle (380 € en 2024)', blocks: 'Confirmation paie' },
  { id: 'F-C05', fact: 'Mutuelle 41,53 € dont 20,77 € pris en charge', blocks: 'Confirmation paie' },
  { id: 'F-V01', fact: 'Vivier de 10 000+ profils IT', blocks: 'Q6 — chiffre actuel et défendable ?' },
  { id: 'F-V07', fact: 'Logos clients en accueil', blocks: 'Q3 — autorisations écrites' },
  { id: 'F-D17', fact: 'BoondManager (outil ATS/CRM)', blocks: 'Q16 — outils nommables' },
  { id: 'F-A05', fact: 'Nombre et statut des agences', blocks: 'Q2 — cinq réponses contradictoires' },
  { id: 'F-S04', fact: '+1,5 % sur les frais professionnels', blocks: 'Ne pas confondre avec le taux de gestion' },
  { id: 'F-S07', fact: 'Parrainage 200 € / 7 500 €', blocks: 'Trois versions contradictoires' },
];

/**
 * Retirés de REQUIRED sur décision du client, pas par oubli.
 *
 * La source reste valable : c'est la place du message sur le site qui a été
 * supprimée. Conservés ici pour qu'un futur agent ne « répare » pas un contrôle
 * en republiant un bloc que le client a demandé d'enlever — et pour que la
 * remise en ligne reste possible sans revenir aux sources d'origine.
 */
export const WITHDRAWN_BY_CLIENT = [
  {
    id: 'F-HOME-PROOF-02',
    source: 'Final Porters perfection brief, 04/08/2026',
    route: '/',
    message: 'The Porters présente plus de dix ans d’expérience.',
    evidence: ['10+ ans', 'D’expérience'],
    withdrawn: '2026-08-17',
    reason:
      'Bulle « 10+ ans » et son encart « D’expérience » retirés de la section chiffres clés de la page d’accueil à la demande du client.',
  },
];

/** Never publishable. Enforced contextually by check-forbidden-content.mjs. */
export const FORBIDDEN = [
  { id: 'F-S01', fact: 'Secteurs servis issus de supports KwickStart' },
  { id: 'R3', fact: 'Capacité pentest / SOC / SIEM revendiquée par The Porters' },
  { id: 'F-V08', fact: 'Noms de clients du mémoire technique' },
  { id: 'F-V09', fact: 'Noms de consultants en contexte de mission' },
  { id: 'F-A10', fact: 'Chiffre d’affaires du groupe' },
  { id: 'F-A09', fact: 'Effectif' },
  { id: 'F-C16', fact: '« 97 % de collaborateurs satisfaits »' },
  { id: 'F-C20', fact: '« 100 % du territoire couvert »' },
  { id: 'F-V06', fact: 'Placeholders non remplis (« X projets »)' },
];
