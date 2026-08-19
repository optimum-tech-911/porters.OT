// Le processus réel, tel qu'il est décrit dans le mémoire technique du groupe.
// Copie : copy-bank.md CB-11 (qui remplace explicitement le processus « inféré »
// en quatre étapes génériques). Faits : F-D01, F-D02, F-D03, F-D07.
export const enterprisePage = {
  process: [
    {
      number: '1',
      title: 'Cadrage',
      description:
        'Nous qualifions le besoin : périmètre, environnement technique, contraintes de sécurité et de conformité, mode de fonctionnement attendu.',
    },
    {
      number: '2',
      title: 'Sélection',
      description:
        'Analyse du parcours réel, évaluation sur référentiels métiers (CIGREF, SYNTEC, ROME), entretiens structurés — RH et technique — puis tests ou mise en situation lorsque le périmètre l’exige.',
    },
    {
      number: '3',
      title: 'Démarrage',
      description:
        'Contractualisation, ouverture des accès, intégration aux outils et aux processus déjà en place. Les profils sont transmis sous forme anonymisée.',
    },
    {
      number: '4',
      title: 'Suivi',
      // F-D07 — MT-LOT1 p.20 : la continuité repose sur un binôme avec relais
      // identifié. Le mécanisme est nommé, pas seulement son effet.
      description:
        'Points d’avancement à une fréquence définie au cadrage. Chaque mission est suivie par un binôme, avec un relais identifié dans l’équipe, pour qu’aucun suivi ne dépende d’une seule personne.',
    },
  ],

  // Les cinq étapes de sélection, détaillées. C'est le seul actif du corpus que la
  // concurrence ne publie pas. Fait : F-D02 (PUBLISHABLE).
  selection: [
    {
      step: '01',
      title: 'Analyse du parcours réel',
      text: 'Missions réalisées, environnements pratiqués et responsabilités assumées — au-delà des mots-clés du CV.',
    },
    {
      step: '02',
      title: 'Évaluation sur référentiels métiers',
      text: 'CIGREF, SYNTEC et ROME servent de grille commune pour situer le métier et le niveau d’expertise.',
    },
    {
      step: '03',
      title: 'Deux entretiens structurés',
      // F-GRILLES-01 — MT-LOT1 p.7 : « Ces entretiens s'appuient sur des grilles
      // d'évaluation standardisées garantissant une appréciation homogène et
      // comparable des profils. » Le concept existait déjà ici ; seule la
      // mécanique qui le rend vrai manquait.
      text: 'Un entretien RH et un entretien technique, qui s’appuient sur des grilles d’évaluation standardisées : c’est ce qui rend l’appréciation homogène et deux profils réellement comparables.',
    },
    {
      step: '04',
      title: 'Validation finale',
      // F-D07 — MT-LOT1 p.20. Le message de continuité était rendu jusqu'à
      // ced125a via enterprisePage.process ; un refactor a cessé d'afficher ce
      // tableau, qui est aujourd'hui de la donnée morte. Le message est replacé
      // ici, en fin d'entonnoir, plutôt que laissé inatteignable.
      text: 'Validation interne, puis transmission d’un profil anonymisé avec compétences et disponibilité. La mission est ensuite suivie par un binôme, avec un relais identifié, pour qu’aucun suivi ne dépende d’une seule personne.',
    },
  ],

  useCases: [
    {
      title: 'Renfort de projet IT',
      text: 'Développement, architecture, intégration, tests, infrastructure ou pilotage sur un périmètre défini.',
      href: '/expertises/cloud-devops',
    },
    {
      title: 'Environnements historiques',
      // F-D08 (PUBLISHABLE) — différenciant réel : la plupart des ESN ne vendent que du greenfield
      text: 'Applications métier sur socles anciens mais critiques pour la production, IBM i / AS400 compris, autant que sur des stacks récentes.',
      href: '/expertises/cloud-devops',
    },
    {
      title: 'Data et intelligence artificielle',
      text: 'Cadrage de cas d’usage, ingénierie et pipelines, gouvernance, industrialisation et mise en production des modèles.',
      href: '/expertises/data-ia',
    },
    {
      title: 'Cloud et DevOps',
      text: 'Architecture, migration, CI/CD, infrastructure as code, conteneurisation, observabilité, sécurité des environnements.',
      href: '/expertises/cloud-devops',
    },
    {
      title: 'Agilité et transformation',
      // F-D05 (PUBLISHABLE) — s'aligner sur les processus du client plutôt que d'imposer un cadre
      text: 'Product Ownership, Scrum, coaching, coordination multi-équipes, conduite du changement. Nos consultants s’alignent sur vos processus existants plutôt que d’imposer un cadre.',
      href: '/expertises/agilite-coaching',
    },
    {
      title: 'Gouvernance et sécurité',
      // Périmètre volontairement limité au documenté : gouvernance, audit, risques, conformité.
      // Pas de SOC, pas de pentest, pas de réponse à incident — voir fact-base R3.
      text: 'Gouvernance de la sécurité, audit, analyse de risques et de conformité, sensibilisation des équipes. RSSI, RSSI de transition, chef de projet et ingénieur cybersécurité.',
      href: '/expertises/cybersecurite',
    },
  ],
};
