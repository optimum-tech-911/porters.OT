import type { Resource } from '../types/resource';

export const resources: Resource[] = [
  {
    slug: 'guide-complet-portage-salarial',
    title: 'Guide complet du portage salarial',
    description:
      'Comprendre la relation tripartite, les contrats, la facturation, la paie et les vérifications à effectuer avant de démarrer.',
    type: 'guide',
    downloadUrl: '', // TODO: client validation — URL de téléchargement à fournir
    coverImage: '', // TODO: client validation — image de couverture à fournir
    publishedAt: '2024-01-15',
    seo: {
      title: 'Guide complet du portage salarial — The Porters',
      description:
        'Consultez le guide The Porters : relation tripartite, contrats, démarrage, suivi de mission, facturation et paie.',
    },
  },
  {
    slug: 'comparatif-statuts-freelances',
    title: 'Comparatif des statuts pour freelances',
    description:
      'Comparer micro-entreprise, société et portage selon quatre critères : autonomie, protection, gestion administrative et modèle de coûts.',
    type: 'livre-blanc',
    downloadUrl: '', // TODO: client validation — URL de téléchargement à fournir
    coverImage: '', // TODO: client validation — image de couverture à fournir
    publishedAt: '2024-03-10',
    seo: {
      title: 'Comparatif des statuts freelances — The Porters',
      description:
        'Comparez portage salarial, micro-entreprise et société selon l’autonomie, la protection, la gestion et le modèle de coûts.',
    },
  },
  {
    slug: 'checklist-demarrer-portage-salarial',
    title: 'Checklist pour démarrer en portage salarial',
    description:
      'Vérifier votre mission, votre TJM, l’accord du client, les documents nécessaires et les points à clarifier avant la contractualisation.',
    type: 'checklist',
    downloadUrl: '', // TODO: client validation — URL de téléchargement à fournir
    coverImage: '', // TODO: client validation — image de couverture à fournir
    publishedAt: '2024-05-20',
    seo: {
      title: 'Checklist pour démarrer en portage salarial — The Porters',
      description:
        'Mission, TJM, documents, contrats et suivi : la checklist des points à clarifier avant de démarrer en portage salarial.',
    },
  },
];
