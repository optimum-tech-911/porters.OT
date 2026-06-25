import type { Resource } from '../types/resource';

export const resources: Resource[] = [
  {
    slug: 'guide-complet-portage-salarial',
    title: 'Guide complet du portage salarial',
    description:
      'Tout ce que vous devez savoir sur le portage salarial en un seul document. Ce guide détaille le fonctionnement, les avantages, les obligations légales et les étapes pour démarrer votre activité de consultant indépendant.',
    type: 'guide',
    downloadUrl: '', // TODO: client validation — URL de téléchargement à fournir
    coverImage: '', // TODO: client validation — image de couverture à fournir
    publishedAt: '2024-01-15',
    seo: {
      title: 'Guide complet du portage salarial — The Porters',
      description:
        'Téléchargez notre guide complet du portage salarial. Fonctionnement, avantages, obligations et étapes pour démarrer votre activité indépendante.',
    },
  },
  {
    slug: 'comparatif-statuts-freelances',
    title: 'Comparatif des statuts pour freelances',
    description:
      'Micro-entreprise, SASU, EURL ou portage salarial ? Ce livre blanc compare les différents statuts juridiques disponibles pour les travailleurs indépendants en France, avec leurs avantages, inconvénients et implications fiscales.',
    type: 'livre-blanc',
    downloadUrl: '', // TODO: client validation — URL de téléchargement à fournir
    coverImage: '', // TODO: client validation — image de couverture à fournir
    publishedAt: '2024-03-10',
    seo: {
      title: 'Comparatif des statuts freelances — The Porters',
      description:
        'Micro-entreprise, SASU, EURL ou portage salarial ? Téléchargez notre comparatif complet des statuts pour freelances et choisissez le plus adapté.',
    },
  },
  {
    slug: 'checklist-demarrer-portage-salarial',
    title: 'Checklist pour démarrer en portage salarial',
    description:
      'Une checklist pratique et étape par étape pour lancer votre activité en portage salarial. De la préparation de votre offre de services à la signature de votre premier contrat, rien n\'est laissé au hasard.',
    type: 'checklist',
    downloadUrl: '', // TODO: client validation — URL de téléchargement à fournir
    coverImage: '', // TODO: client validation — image de couverture à fournir
    publishedAt: '2024-05-20',
    seo: {
      title: 'Checklist pour démarrer en portage salarial — The Porters',
      description:
        'Téléchargez notre checklist pour démarrer en portage salarial. Toutes les étapes essentielles pour lancer votre activité de consultant indépendant.',
    },
  },
];
