// Partie 2 du récit unique du portage : ce que vivent les salariés portés, mois
// par mois. Suit l'ordre du livre blanc The Porters (VOTRE ENTRÉE → rémunération →
// congés / santé / chômage / retraite → trésorerie → VOTRE SORTIE).
// Faits publiables uniquement. Tout chiffre encore à reconfirmer est absent et
// porte un TODO-CLIENT.
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

  // Le déroulé chronologique. C'est ce que la concurrence ne documente pas.
  timeline: [
    {
      marker: 'Votre entrée',
      title: 'Avant de signer',
      text: 'Une simulation de salaire chiffrée, l’infographie des frais professionnels, le mode opératoire et une formation à LAYA, notre outil de gestion. Puis une intégration individuelle, en visioconférence ou sur place.',
    },
    {
      marker: 'Le 1er mois',
      title: 'Votre premier salaire',
      text: 'Votre contrat de travail est établi, le contrat de prestation signé avec votre client, et votre chiffre d’affaires devient un salaire.',
      // TODO-CLIENT: F-B14 — le livre blanc indique un versement dès le premier mois,
      // avant le règlement de la première facture client. À reconfirmer pour 2026
      // avant de le publier comme engagement.
    },
    {
      marker: 'Chaque mois',
      title: 'Le rythme',
      text: 'Vous déclarez votre compte rendu d’activité et vos notes de frais. Nous facturons votre client, établissons la paie et traitons les déclarations sociales. Deux sessions de paie existent, selon la date de votre déclaration.',
      // TODO-CLIENT: F-C14 — publier les deux échéances réelles une fois le process
      // confirmé (CRA avant le 20 → paiement entre le 1er et le 5e jour ouvré ;
      // CRA du 20 au 31 → à partir du 10e jour ouvré).
    },
    {
      marker: 'Vos congés',
      title: '2,5 jours par mois, payés chaque mois',
      // F-B06 (PUBLISHABLE)
      text: 'Vous acquérez 2,5 jours ouvrés de congés payés par mois. Ils vous sont versés directement sur votre bulletin, sous l’intitulé « Indemnités de congés payés » — ou provisionnés sur votre compte de trésorerie, pour partir en congés en maintenant votre rémunération.',
    },
    {
      marker: 'Les aléas',
      title: 'Arrêt maladie, maternité, paternité',
      text: 'Comme tout salarié, vous percevez des indemnités journalières de la Sécurité sociale, avec un relais de la prévoyance sur les arrêts longs. Les congés maternité et paternité s’appliquent dans les mêmes conditions que pour un salarié classique.',
      // TODO-CLIENT: F-C09, F-C10, F-C11, F-C12 — taux, carence, durées et seuils
      // datent de 2024 et sont révisés régulièrement. Aucun chiffre publié ici.
    },
    {
      marker: 'Votre trésorerie',
      title: 'Un compte dédié',
      // F-B11 (PUBLISHABLE) — le vrai différenciant
      text: 'Vous pouvez mettre une part de votre rémunération brute de côté sur un compte de trésorerie dédié : pour lisser une paie d’un mois sur l’autre, financer des congés, provisionner une fin de contrat ou débloquer un acompte selon vos besoins.',
    },
    {
      marker: 'Votre sortie',
      title: 'Ce qui se passe quand vous partez',
      text: 'Démission, rupture de période d’essai ou rupture conventionnelle : dans tous les cas nous vous remettons le solde de tout compte, le certificat de travail, l’attestation destinée à France Travail et le reçu pour solde de tout compte. Une rupture conventionnelle suppose des fonds suffisants sur votre compte de trésorerie pour couvrir la prime et les frais associés.',
      // TODO-CLIENT: F-C07 — montant des frais de rupture conventionnelle (380 € en
      // 2024) à reconfirmer par la paie avant publication.
    },
  ],

  handled: [
    'Contrat de travail en CDI, statut cadre',
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
    },
    {
      title: 'Vous gardez vos clients',
      text: 'Vous pouvez vous constituer votre propre clientèle et en rester pleinement responsable. Nous vous proposons aussi des missions issues de nos partenaires.',
    },
    {
      title: 'Cumul possible',
      // F-B08 (PUBLISHABLE)
      text: 'Avec un emploi salarié, sous réserve de l’accord de votre employeur et d’un maximum de 48 heures hebdomadaires cumulées. Ou avec une retraite.',
    },
    {
      title: 'France entière, et au-delà',
      // F-B09 (PUBLISHABLE)
      text: 'Mission en France ou à l’étranger, pour un client français ou étranger, en télétravail ou sur site.',
    },
    {
      title: 'Assurance chômage',
      text: 'Vous cotisez chaque mois à l’assurance chômage et conservez vos droits, comme tout salarié.',
    },
    {
      title: 'Retraite complémentaire',
      // F-B04 (PUBLISHABLE)
      text: 'Le statut cadre vous permet de cotiser au régime général et à la retraite complémentaire.',
    },
  ],
};
