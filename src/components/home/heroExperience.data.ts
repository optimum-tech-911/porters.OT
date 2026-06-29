export type HeroAudienceId = 'consultant' | 'entreprise';

export type HeroProofImage = {
  src: string;
  alt: string;
};

export type HeroSticker = {
  title: string;
  text: string;
  image: HeroProofImage;
  href: string;
  detail: {
    eyebrow: string;
    body: string;
    points: string[];
  };
};

export type HeroJourneyStep = {
  title: string;
  text: string;
  image: HeroProofImage;
  href: string;
};

export type HeroMobileProof = {
  title: string;
  image: HeroProofImage;
  href: string;
};

type HeroExperience = {
  ticker: string[];
  stickers: HeroSticker[];
  mobileProofs: HeroMobileProof[];
  journey: HeroJourneyStep[];
};

export const heroProofImages = {
  advisor: {
    src: '/images/hero-proof-icons/advisor.png',
    alt: 'Conseiller dédié',
  },
  security: {
    src: '/images/hero-proof-icons/security.png',
    alt: 'Cadre contractuel sécurisé',
  },
  payment: {
    src: '/images/hero-proof-icons/payment.png',
    alt: 'Paiement traité rapidement',
  },
  advance: {
    src: '/images/hero-proof-icons/advance.png',
    alt: 'Avance de trésorerie',
  },
  admin: {
    src: '/images/hero-proof-icons/admin.png',
    alt: 'Gestion administrative',
  },
  sourcing: {
    src: '/images/hero-proof-icons/sourcing.png',
    alt: 'Recherche de consultant',
  },
} satisfies Record<string, HeroProofImage>;

export const heroExperience: Record<HeroAudienceId, HeroExperience> = {
  consultant: {
    ticker: ['+150 missions en cours', 'Paie rapide', 'Conseiller dédié', 'Frais clairs'],
    stickers: [
      {
        title: 'CDI sécurisé',
        text: 'Liberté freelance + protection salariale',
        image: heroProofImages.security,
        href: '/portage-salarial',
        detail: {
          eyebrow: 'Cadre du consultant',
          body: 'Conservez votre autonomie de mission tout en bénéficiant du cadre social et contractuel du salariat.',
          points: ['Protection sociale structurée', 'Contrat et paie pris en charge'],
        },
      },
      {
        title: 'Conseiller dédié',
        text: 'Un humain pour suivre votre mission',
        image: heroProofImages.advisor,
        href: '/rendez-vous',
        detail: {
          eyebrow: 'Accompagnement humain',
          body: 'Un contact identifiable suit votre situation, répond aux questions de paie et reste présent pendant la mission.',
          points: ['Suivi du démarrage à la mission', 'Réponses centralisées'],
        },
      },
    ],
    mobileProofs: [
      { title: 'CDI sécurisé', image: heroProofImages.security, href: '/portage-salarial' },
      { title: 'Paie rapide', image: heroProofImages.payment, href: '/tarifs' },
      { title: 'Conseiller dédié', image: heroProofImages.advisor, href: '/rendez-vous' },
      { title: 'Frais clairs', image: heroProofImages.admin, href: '/tarifs' },
    ],
    journey: [
      {
        title: 'Estimer mes revenus',
        text: 'TJM, jours facturés et frais professionnels.',
        image: heroProofImages.payment,
        href: '/simulateur',
      },
      {
        title: 'Cadrer mon portage',
        text: 'Contrat, paie, facturation et administratif.',
        image: heroProofImages.security,
        href: '/portage-salarial',
      },
      {
        title: 'Avancer avec un conseiller',
        text: 'Un interlocuteur humain pour suivre la mission.',
        image: heroProofImages.advisor,
        href: '/rendez-vous',
      },
    ],
  },
  entreprise: {
    ticker: ['+150 missions en cours', 'Sourcing IT rapide', 'Zéro gestion RH', 'Mission cadrée'],
    stickers: [
      {
        title: 'Sourcing IT rapide',
        text: 'Profils qualifiés en France et à l’international',
        image: heroProofImages.sourcing,
        href: '/entreprises',
        detail: {
          eyebrow: 'Qualification du besoin',
          body: 'Le brief est traduit en critères concrets pour identifier plus vite les expertises réellement adaptées au projet.',
          points: ['Profils IT et transformation', 'France et international'],
        },
      },
      {
        title: 'Zéro gestion RH',
        text: 'Contrat, paie et administratif pris en charge',
        image: heroProofImages.admin,
        href: '/entreprises',
        detail: {
          eyebrow: 'Gestion simplifiée',
          body: 'The Porters centralise le cadre contractuel, la paie et la facturation pour réduire la charge de vos équipes.',
          points: ['Une facture et un suivi lisibles', 'Cadre administratif pris en charge'],
        },
      },
    ],
    mobileProofs: [
      { title: 'Sourcing rapide', image: heroProofImages.sourcing, href: '/entreprises' },
      { title: 'Zéro gestion RH', image: heroProofImages.admin, href: '/entreprises' },
      { title: 'Mission cadrée', image: heroProofImages.payment, href: '/rendez-vous' },
      { title: 'Interlocuteur unique', image: heroProofImages.advisor, href: '/rendez-vous' },
    ],
    journey: [
      {
        title: 'Déposer un besoin',
        text: 'Brief mission IT, contexte, budget et timing.',
        image: heroProofImages.admin,
        href: '/rendez-vous',
      },
      {
        title: 'Identifier le bon profil',
        text: 'Consultant tech qualifié selon l’expertise recherchée.',
        image: heroProofImages.sourcing,
        href: '/entreprises',
      },
      {
        title: 'Lancer la mission',
        text: 'Contrat, cadre administratif et suivi simplifiés.',
        image: heroProofImages.security,
        href: '/contact',
      },
    ],
  },
};
