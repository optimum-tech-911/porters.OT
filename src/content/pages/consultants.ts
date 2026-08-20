export const consultantsPage = {
  audiences: [
    'Cybersécurité',
    'Big Data / Cloud / IA',
    'DevOps',
    'Agilité',
  ],

  // Parcours complet du salarié porté, dans l'ordre du livre blanc The Porters
  // (VOTRE ENTRÉE → rémunération → congés / santé → trésorerie → VOTRE SORTIE).
  // Chaque étape est adossée à un fait publiable ; les paramètres datés de 2024
  // (IJ maladie, délais de paie, frais de rupture) sont décrits comme mécanismes,
  // sans chiffre, tant qu'ils ne sont pas reconfirmés — voir les TODO-CLIENT.
  timeline: [
    {
      marker: 'Votre entrée',
      title: 'Avant de signer',
      text: 'Nous reprenons votre mission, votre TJM, vos frais et votre simulation. Vous recevez le mode opératoire et une formation à LAYA, notre outil de gestion, puis une intégration individuelle en visioconférence ou sur place. Le contrat de travail et le contrat de prestation sont établis avant le démarrage.',
    },
    {
      marker: 'Chaque mois',
      title: 'Activité, facturation, paie',
      // TODO-CLIENT: F-C14 — publier les deux échéances réelles une fois le process
      // confirmé (CRA avant le 20 → paiement entre le 1er et le 5e jour ouvré ;
      // CRA du 20 au 31 → à partir du 10e jour ouvré).
      text: 'Vous déclarez votre compte rendu d’activité et vos notes de frais. Nous facturons le client, établissons votre bulletin de paie et traitons les déclarations sociales. Deux sessions de paie existent, selon la date de votre déclaration.',
    },
    {
      marker: 'Votre protection',
      title: 'Les droits d’un salarié',
      text: 'Régime général, prévoyance, retraite, assurance chômage, mutuelle collective et congés payés : votre activité indépendante s’exerce dans un cadre salarié.',
    },
    {
      marker: 'Vos congés',
      title: '2,5 jours par mois, payés chaque mois',
      // F-B06 (PUBLISHABLE) — livre blanc p.11
      text: 'Vous acquérez 2,5 jours ouvrés de congés payés par mois. Ils vous sont versés directement sur votre bulletin, sous l’intitulé « Indemnités de congés payés » — ou provisionnés sur votre compte de trésorerie, pour partir en congés en maintenant votre rémunération.',
    },
    {
      marker: 'Votre trésorerie',
      title: 'Un compte dédié',
      // F-B11 (PUBLISHABLE) — différenciant réel, mal expliqué partout ailleurs
      text: 'Vous pouvez mettre une part de votre rémunération brute de côté sur un compte de trésorerie dédié : pour lisser une paie d’un mois sur l’autre, financer des congés, provisionner une fin de contrat ou débloquer un acompte selon vos besoins.',
    },
    {
      marker: 'Votre sortie',
      title: 'Une fin de contrat documentée',
      // TODO-CLIENT: F-C07 — montant des frais de rupture conventionnelle (380 € en
      // 2024) à reconfirmer par la paie avant publication. Aucun chiffre ici.
      text: 'Démission, rupture de période d’essai ou rupture conventionnelle : dans tous les cas nous vous remettons le solde de tout compte, le certificat de travail et l’attestation destinée à France Travail. Une rupture conventionnelle suppose des fonds suffisants sur votre compte de trésorerie pour couvrir la prime et les frais associés.',
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
