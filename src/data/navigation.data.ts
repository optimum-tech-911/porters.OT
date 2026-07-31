import type { Navigation } from '../types/navigation';

export const navigation: Navigation = {
  main: [
    {
      label: 'Le portage salarial',
      items: [
        { label: 'Comment ça marche', href: '/portage-salarial' },
        { label: 'Votre quotidien', href: '/consultants' },
        { label: 'Frais et rémunération', href: '/tarifs' },
        { label: 'Simuler mes revenus', href: '/simulateur' },
        { label: 'Questions fréquentes', href: '/faq' },
      ],
    },
    {
      label: 'Entreprises',
      items: [
        { label: 'Trouver un expert IT', href: '/entreprises' },
        { label: 'Voir les expertises', href: '/expertises' },
        { label: 'Nous contacter', href: '/contact' },
      ],
    },
    {
      label: 'Expertises',
      href: '/expertises',
    },
    {
      label: 'Le groupe',
      items: [
        { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
        { label: 'L’équipe', href: '/equipe' },
        { label: 'Nos agences', href: '/agences' },
        { label: 'Engagements RSE', href: '/rse' },
        { label: 'Nous rejoindre', href: '/recrutement' },
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
        title: 'Le portage salarial',
        links: [
          { label: 'Comment ça marche', href: '/portage-salarial' },
          { label: 'Votre quotidien', href: '/consultants' },
          { label: 'Frais et rémunération', href: '/tarifs' },
          { label: 'Simuler mes revenus', href: '/simulateur' },
          { label: 'Questions fréquentes', href: '/faq' },
        ],
      },
      {
        title: 'Entreprises',
        links: [
          { label: 'Trouver un expert IT', href: '/entreprises' },
          { label: 'Voir les expertises', href: '/expertises' },
          { label: 'Nous contacter', href: '/contact' },
        ],
      },
      {
        title: 'Le groupe',
        links: [
          { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
          { label: 'L’équipe', href: '/equipe' },
          { label: 'Nos agences', href: '/agences' },
          { label: 'Engagements RSE', href: '/rse' },
          { label: 'Nous rejoindre', href: '/recrutement' },
        ],
      },
      {
        title: 'Ressources',
        links: [
          { label: 'Blog', href: '/blog' },
          { label: 'Livres blancs', href: '/livres-blancs' },
          { label: 'Parrainage', href: '/parrainage' },
          { label: 'Prendre rendez-vous', href: '/rendez-vous' },
        ],
      },
    ],
    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Confidentialité', href: '/confidentialite' },
    ],
  },
};
