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
      description:
        'Points d’avancement à une fréquence définie au cadrage, avec un relais identifié dans l’équipe pour qu’aucun suivi ne dépende d’une seule personne.',
    },
  ],

  // Les cinq étapes de sélection, détaillées. C'est le seul actif du corpus que la
  // concurrence ne publie pas. Fait : F-D02 (PUBLISHABLE).
  selection: [
    {
      step: '01',
      title: 'Analyse du parcours réel',
      text: 'Nous regardons les missions effectivement réalisées, les environnements techniques réellement pratiqués et les responsabilités réellement assumées. Pas les mots-clés du CV.',
    },
    {
      step: '02',
      title: 'Évaluation sur référentiels métiers',
      text: 'CIGREF, SYNTEC et ROME servent de grille de lecture : compétences attendues, niveaux d’expertise, pratiques professionnelles, expérience sectorielle.',
    },
    {
      step: '03',
      title: 'Deux entretiens structurés',
      text: 'Un entretien RH et motivation. Un entretien de compétences mené par un référent interne : technologies maîtrisées, méthodes de travail, sécurité du SI, problèmes rencontrés et solutions mises en œuvre. Grilles d’évaluation standardisées, pour que deux profils restent comparables.',
    },
    {
      step: '04',
      title: 'Tests ou mise en situation',
      text: 'Selon le niveau d’exigence du périmètre : tests techniques, questionnaires métier, études de cas. La disponibilité réelle est vérifiée à ce stade — délai de démarrage, durée, compatibilité géographique.',
    },
    {
      step: '05',
      title: 'Validation finale',
      text: 'Validation interne pilotée par les référents technique et commercial, et l’avis d’un tiers expert sur les profils stratégiques. Les profils vous sont ensuite transmis sous forme anonymisée.',
    },
  ],

  useCases: [
    {
      title: 'Renfort de projet IT',
      text: 'Développement, architecture, intégration, tests, infrastructure ou pilotage sur un périmètre défini.',
    },
    {
      title: 'Environnements historiques',
      // F-D08 (PUBLISHABLE) — différenciant réel : la plupart des ESN ne vendent que du greenfield
      text: 'Applications métier sur socles anciens mais critiques pour la production, IBM i / AS400 compris, autant que sur des stacks récentes.',
    },
    {
      title: 'Data et intelligence artificielle',
      text: 'Cadrage de cas d’usage, ingénierie et pipelines, gouvernance, industrialisation et mise en production des modèles.',
    },
    {
      title: 'Cloud et DevOps',
      text: 'Architecture, migration, CI/CD, infrastructure as code, conteneurisation, observabilité, sécurité des environnements.',
    },
    {
      title: 'Agilité et transformation',
      // F-D05 (PUBLISHABLE) — s'aligner sur les processus du client plutôt que d'imposer un cadre
      text: 'Product Ownership, Scrum, coaching, coordination multi-équipes, conduite du changement. Nos consultants s’alignent sur vos processus existants plutôt que d’imposer un cadre.',
    },
    {
      title: 'Gouvernance et sécurité',
      // Périmètre volontairement limité au documenté : gouvernance, audit, risques, conformité.
      // Pas de SOC, pas de pentest, pas de réponse à incident — voir fact-base R3.
      text: 'Gouvernance de la sécurité, audit, analyse de risques et de conformité, sensibilisation des équipes. RSSI, RSSI de transition, chef de projet et ingénieur cybersécurité.',
    },
  ],
};
