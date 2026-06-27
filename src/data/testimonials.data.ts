import type { Testimonial } from '../types/testimonial';

// Source: old homepage testimonials, extracted in content migration plan.
// TODO(client): validate consent before using real photos; no reusable testimonial photos were proven in the crawl.
export const testimonials: Testimonial[] = [
  {
    name: 'Delphine',
    role: 'Product-Owner en Portage Salarial',
    quote:
      "Je voulais devenir indépendante mais je ne souhaitais pas non plus créer ma propre entreprise pour le moment. J'ai entendu parler du portage salarial et j'ai pu me lancer grâce à THE PORTERS. A mi-chemin entre l'indépendance et le salariat, je me sens à la fois libre et accompagnée.",
    city: 'Paris',
  },
  {
    name: 'Chloé',
    role: 'DSI en Portage Salarial',
    quote:
      "Grâce au portage salarial, je me sens plus libre et sécurisée. Les charges sont transparentes, je continue à toucher mes indemnités chômage et retraite. Je recommande le portage salarial à tout indépendant voulant bénéficier des avantages du salariat.",
    city: 'Toulouse',
  },
  {
    name: 'Andy P.',
    role: 'Chef de Projet Digital en Portage Salarial',
    quote:
      "Le jour où j'ai passé le cap du Portage Salarial, j'ai regardé le soleil se coucher. J'avais été tellement inquiet de trouver un emploi que j'avais oublié d'apprécier les petites choses. Je suis beaucoup plus occupé ces jours-ci, mais je n'oublie plus de prendre le temps de respirer.",
  },
];
