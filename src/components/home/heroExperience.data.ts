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
    ticker: ['Votre mission', 'Notre contrat', 'Un salaire chaque mois', 'Des frais détaillés'],
    stickers: [
      {
        title: 'Salarié à part entière',
        text: 'Indépendant dans les faits, salarié sur la fiche de paie',
        image: heroProofImages.security,
        href: '/portage-salarial',
        detail: {
          eyebrow: 'Votre statut',
          body: 'Vous gardez la main sur vos missions et sur vos clients. Le contrat de travail, lui, vous ouvre la protection sociale d’un salarié cadre.',
          points: ['Mutuelle, prévoyance, retraite, chômage', 'Contrat et paie gérés par nous'],
        },
      },
      {
        title: 'Quelqu’un au bout du fil',
        text: 'La même personne du premier jour au dernier',
        image: heroProofImages.advisor,
        href: '/rendez-vous',
        detail: {
          eyebrow: 'Votre interlocuteur',
          body: 'Une personne identifiée suit votre dossier, répond aux questions de paie et reste joignable pendant toute la mission.',
          points: ['Joignable du démarrage à la fin', 'Une seule adresse pour tout demander'],
        },
      },
    ],
    mobileProofs: [
      { title: 'Statut salarié', image: heroProofImages.security, href: '/portage-salarial' },
      { title: 'Votre net estimé', image: heroProofImages.payment, href: '/simulateur' },
      { title: 'Un conseiller dédié', image: heroProofImages.advisor, href: '/rendez-vous' },
      { title: 'Frais détaillés', image: heroProofImages.admin, href: '/portage-salarial#frais' },
    ],
    journey: [
      {
        title: 'Savoir ce que je gagnerai',
        text: 'Votre TJM, vos frais, votre net.',
        image: heroProofImages.payment,
        href: '/simulateur',
      },
      {
        title: 'Comprendre le cadre',
        text: 'Contrat, facturation, paie : qui fait quoi.',
        image: heroProofImages.security,
        href: '/portage-salarial',
      },
      {
        title: 'Préparer mon démarrage',
        text: 'Un échange avant de signer quoi que ce soit.',
        image: heroProofImages.advisor,
        href: '/rendez-vous',
      },
    ],
  },
  entreprise: {
    ticker: ['Votre besoin', 'Le bon profil', 'Un contrat', 'Une seule facture'],
    stickers: [
      {
        title: 'Un besoin bien posé',
        text: 'Objectif, compétences et calendrier, écrits noir sur blanc',
        image: heroProofImages.sourcing,
        href: '/entreprises',
        detail: {
          eyebrow: 'Le point de départ',
          body: 'Votre brief devient une liste de critères précis, qui oriente la recherche vers le bon profil et le bon type de contrat.',
          points: ['Profils IT et transformation', 'Un périmètre de mission écrit'],
        },
      },
      {
        title: 'L’administratif en moins',
        text: 'Le contrat, la facturation et le suivi restent de notre côté',
        image: heroProofImages.admin,
        href: '/entreprises',
        detail: {
          eyebrow: 'Ce que vous n’avez plus à faire',
          body: 'Nous prenons à notre charge le contrat, la paie et la facturation. Vos équipes reçoivent une facture et un suivi, pas un dossier à instruire.',
          points: ['Une facture, un suivi', 'Zéro paperasse pour vos équipes'],
        },
      },
    ],
    mobileProofs: [
      { title: 'Un besoin bien posé', image: heroProofImages.sourcing, href: '/entreprises' },
      { title: 'Le contrat géré', image: heroProofImages.admin, href: '/entreprises' },
      { title: 'Un suivi de mission', image: heroProofImages.payment, href: '/rendez-vous' },
      { title: 'Un contact direct', image: heroProofImages.advisor, href: '/rendez-vous' },
    ],
    journey: [
      {
        title: 'Poser le besoin',
        text: 'Objectif, périmètre, compétences, calendrier.',
        image: heroProofImages.admin,
        href: '/rendez-vous',
      },
      {
        title: 'Choisir la bonne formule',
        text: 'Portage ou renfort ESN, selon votre situation.',
        image: heroProofImages.sourcing,
        href: '/entreprises',
      },
      {
        title: 'Lancer la mission',
        text: 'Contrat, facturation, suivi : nous prenons le relais.',
        image: heroProofImages.security,
        href: '/contact',
      },
    ],
  },
};
