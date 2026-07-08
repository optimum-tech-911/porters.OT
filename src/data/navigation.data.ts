import type { Navigation } from '../types/navigation';

export const navigation: Navigation = {
  main: [
    {
      label: 'Consultants',
      items: [
        { label: 'Parcours consultants', href: '/consultants' },
        { label: 'Le portage salarial', href: '/portage-salarial' },
        { label: 'Cybersécurité', href: '/expertises/cybersecurite' },
        { label: 'Data & IA', href: '/expertises/data-ia' },
        { label: 'Cloud & DevOps', href: '/expertises/cloud-devops' },
        { label: 'Agilité & Coaching', href: '/expertises/agilite-coaching' },
        { label: 'Simulateur de revenus', href: '/simulateur' },
        { label: 'Parler à un conseiller', href: '/rendez-vous' },
      ],
    },
    {
      label: 'Entreprises',
      href: '/entreprises',
    },
    {
      label: 'The Porters',
      items: [
        { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
        { label: 'Notre équipe', href: '/equipe' },
        { label: 'Nos agences', href: '/agences' },
        { label: 'Recrutement', href: '/recrutement' },
        { label: 'Parrainage', href: '/parrainage' },
      ],
    },
    {
      label: 'Ressources',
      items: [
        { label: 'Blog', href: '/blog' },
        { label: 'Livres blancs', href: '/livres-blancs' },
        { label: 'FAQ', href: '/faq' },
      ],
    },
  ],
  cta: {
    label: 'Simuler mes revenus',
    href: '/simulateur',
  },
  footer: {
    columns: [
      {
        title: 'Consultants',
        links: [
          { label: 'Parcours consultants', href: '/consultants' },
          { label: 'Le portage salarial', href: '/portage-salarial' },
          { label: 'Nos expertises', href: '/expertises/cybersecurite' },
          { label: 'Simulateur de revenus', href: '/simulateur' },
          { label: 'Parler à un conseiller', href: '/rendez-vous' },
        ],
      },
      {
        title: 'Entreprises',
        links: [
          { label: 'Entreprises', href: '/entreprises' },
        ],
      },
      {
        title: 'The Porters',
        links: [
          { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
          { label: 'Notre équipe', href: '/equipe' },
          { label: 'Nos agences', href: '/agences' },
          { label: 'Recrutement', href: '/recrutement' },
          { label: 'Parrainage', href: '/parrainage' },
        ],
      },
      {
        title: 'Ressources',
        links: [
          { label: 'Blog', href: '/blog' },
          { label: 'Livres blancs', href: '/livres-blancs' },
          { label: 'FAQ', href: '/faq' },
        ],
      },
    ],
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Confidentialité', href: '/confidentialite' },
    ],
  },
};
