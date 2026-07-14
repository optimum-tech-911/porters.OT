export type HeroAudienceId = 'consultant' | 'entreprise';
export type HeroIconName = 'shield' | 'calculator' | 'contract' | 'profile' | 'rocket' | 'brief' | 'advisor';

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
    ticker: ['Mission choisie', 'Contrat cadré', 'Paie suivie', 'Frais expliqués'],
    stickers: [
      {
        title: 'Cadre salarié',
        text: 'Votre autonomie, avec la protection du salariat',
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
      { title: 'Cadre salarié', image: heroProofImages.security, href: '/portage-salarial' },
      { title: 'Revenus simulés', image: heroProofImages.payment, href: '/simulateur' },
      { title: 'Suivi dédié', image: heroProofImages.advisor, href: '/rendez-vous' },
      { title: 'Frais expliqués', image: heroProofImages.admin, href: '/tarifs' },
    ],
    journey: [
      {
        title: 'Projeter mes revenus',
        text: 'Chiffre d’affaires, frais et salaire estimé.',
        image: heroProofImages.payment,
        href: '/simulateur',
      },
      {
        title: 'Sécuriser mon cadre',
        text: 'Contrat, facturation, paie et administratif.',
        image: heroProofImages.security,
        href: '/portage-salarial',
      },
      {
        title: 'Préparer mon démarrage',
        text: 'Un échange concret avant de contractualiser.',
        image: heroProofImages.advisor,
        href: '/rendez-vous',
      },
    ],
  },
  entreprise: {
    ticker: ['Besoin clarifié', 'Cadre choisi', 'Contrat suivi', 'Facture centralisée'],
    stickers: [
      {
        title: 'Besoin cadré',
        text: 'Objectifs, compétences et calendrier clarifiés',
        image: heroProofImages.sourcing,
        href: '/entreprises',
        detail: {
          eyebrow: 'Qualification du besoin',
          body: 'Le brief est traduit en critères concrets pour orienter la demande vers le cadre et l’expertise adaptés.',
          points: ['Profils IT et transformation', 'Périmètre de mission explicite'],
        },
      },
      {
        title: 'Cadre maîtrisé',
        text: 'Contrat, facturation et suivi administratif',
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
      { title: 'Besoin clarifié', image: heroProofImages.sourcing, href: '/entreprises' },
      { title: 'Cadre contractuel', image: heroProofImages.admin, href: '/entreprises' },
      { title: 'Mission suivie', image: heroProofImages.payment, href: '/rendez-vous' },
      { title: 'Contact identifié', image: heroProofImages.advisor, href: '/rendez-vous' },
    ],
    journey: [
      {
        title: 'Clarifier le besoin',
        text: 'Objectif, périmètre, compétences et calendrier.',
        image: heroProofImages.admin,
        href: '/rendez-vous',
      },
      {
        title: 'Choisir le bon cadre',
        text: 'Portage ou renfort ESN selon votre situation.',
        image: heroProofImages.sourcing,
        href: '/entreprises',
      },
      {
        title: 'Cadrer la mission',
        text: 'Contrat, facturation et suivi administratif.',
        image: heroProofImages.security,
        href: '/contact',
      },
    ],
  },
};
