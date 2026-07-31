export const consultantsPage = {
  audiences: [
    'Cybersécurité, GRC et gouvernance',
    'Data, IA et machine learning',
    'Cloud, DevOps et SRE',
    'Architecture et intégration',
    'Product Owners et Product Managers',
    'Scrum Masters et Agile Coaches',
    'Chefs de projet IT, PMO et AMOA',
  ],

  timeline: [
    {
      marker: 'Votre entrée',
      title: 'Avant de signer',
      text: 'Nous reprenons votre mission, votre TJM, vos frais et votre simulation. Le contrat de travail et le contrat de prestation sont établis avant le démarrage.',
    },
    {
      marker: 'Chaque mois',
      title: 'Activité, facturation, paie',
      text: 'Vous déclarez votre activité et vos frais professionnels. Nous facturons le client, établissons votre bulletin de paie et traitons les déclarations sociales.',
    },
    {
      marker: 'Votre protection',
      title: 'Les droits d’un salarié',
      text: 'Régime général, prévoyance, retraite, assurance chômage, mutuelle collective et congés payés : votre activité indépendante s’exerce dans un cadre salarié.',
    },
    {
      marker: 'Votre trésorerie',
      title: 'Un compte dédié',
      text: 'Vous pouvez mettre une part de votre rémunération brute de côté pour lisser une paie, financer des congés ou provisionner une fin de contrat.',
    },
    {
      marker: 'Votre sortie',
      title: 'Une fin de contrat documentée',
      text: 'Les modalités de départ suivent le droit du travail. Nous préparons les documents de fin de contrat et vous expliquons les étapes applicables à votre situation.',
    },
  ],

  handled: [
    'Contrat de travail et statut cadre',
    'Contrat de prestation avec l’entreprise cliente',
    'Facturation de votre client et suivi des règlements',
    'Paie, déclarations sociales et fiscales',
    'Traitement des frais professionnels justifiés',
    'Responsabilité civile professionnelle',
    'Un interlocuteur unique pendant toute la mission',
  ],

  controlled: [
    'Le choix de vos clients et de vos missions',
    'La négociation de votre TJM',
    'Votre positionnement et votre offre',
    'Votre organisation et votre temps de travail',
    'La relation opérationnelle avec le client',
    'La qualité et les livrables de votre intervention',
  ],

  practicalTopics: [
    {
      title: 'Aucun lien hiérarchique',
      // F-B07 (PUBLISHABLE) — argument central
      text: 'Ni chez votre client, ni chez The Porters. Vous êtes salarié sur la forme, autonome sur le fond.',
      href: '/portage-salarial',
    },
    {
      title: 'Vous gardez vos clients',
      text: 'Vous pouvez vous constituer votre propre clientèle et en rester pleinement responsable. Nous vous proposons aussi des missions issues de nos partenaires.',
      href: '/blog/trouver-missions-portage-salarial',
    },
    {
      title: 'Cumul possible',
      // F-B08 (PUBLISHABLE)
      text: 'Avec un emploi salarié, sous réserve de l’accord de votre employeur et d’un maximum de 48 heures hebdomadaires cumulées. Ou avec une retraite.',
      href: '/faq#comprendre',
    },
    {
      title: 'France entière, et au-delà',
      // F-B09 (PUBLISHABLE)
      text: 'Mission en France ou à l’étranger, pour un client français ou étranger, en télétravail ou sur site.',
      href: '/blog/portage-salarial-international',
    },
    {
      title: 'Assurance chômage',
      text: 'Vous cotisez à l’assurance chômage dans le cadre du statut salarié. Une indemnisation éventuelle reste soumise aux conditions examinées par France Travail.',
      href: '/faq#missions',
    },
    {
      title: 'Retraite complémentaire',
      // F-B04 (PUBLISHABLE)
      text: 'Le statut cadre vous permet de cotiser au régime général et à la retraite complémentaire.',
      href: '/faq#comprendre',
    },
  ],
};
