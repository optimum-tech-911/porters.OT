import type { Navigation } from '../types/navigation';

export const navigation: Navigation = {
  main: [
    {
      label: 'Le portage salarial',
      href: '/portage-salarial',
    },
    {
      label: 'Entreprises',
      href: '/entreprises',
    },
    {
      label: 'Expertises',
      href: '/expertises',
    },
    {
      label: 'Le groupe',
      items: [
        { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
        { label: 'Nos agences', href: '/agences' },
      ],
    },
  ],
  cta: {
    label: 'Simulateur',
    href: '/simulateur',
  },
  footer: {
    columns: [
      {
        title: 'Le portage salarial',
        links: [
          { label: 'Comprendre le portage', href: '/portage-salarial' },
          { label: 'Simulateur', href: '/simulateur' },
        ],
      },
      {
        title: 'Entreprises',
        links: [
          { label: 'Trouver une expertise', href: '/entreprises' },
          { label: 'Nous contacter', href: '/contact' },
        ],
      },
      {
        title: 'Le groupe',
        links: [
          { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
          { label: 'Nos agences', href: '/agences' },
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
