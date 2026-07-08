export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export const consultantBenefits: Benefit[] = [
  {
    icon: 'shield',
    title: 'Protection sociale complète',
    description:
      'Bénéficiez de la même couverture sociale qu\'un salarié classique : assurance maladie, retraite, prévoyance et mutuelle.',
  },
  {
    icon: 'calculator',
    title: 'Rémunération optimisée',
    description:
      'Un conseiller vous aide à lire l’effet du TJM, des jours facturés, des frais et des hypothèses de simulation sur votre rémunération estimée.',
  },
  {
    icon: 'briefcase',
    title: 'Liberté entrepreneuriale',
    description:
      'Choisissez vos missions, vos clients et votre rythme de travail tout en conservant le statut de salarié.',
  },
  {
    icon: 'file-text',
    title: 'Zéro administratif',
    description:
      'Nous prenons en charge l\'intégralité de la gestion administrative : facturation, déclarations sociales, comptabilité.',
  },
  {
    icon: 'users',
    title: 'Réseau professionnel',
    description:
      'Accédez aux ressources et échanges proposés par The Porters lorsque des événements ou rencontres sont programmés.',
  },
  {
    icon: 'trending-up',
    title: 'Accompagnement personnalisé',
    description:
      'Un chargé de compte dédié vous accompagne à chaque étape : démarrage, négociation, développement de votre activité.',
  },
  {
    icon: 'briefcase',
    title: 'Réactivité commerciale',
    description:
      'L’équipe vous aide à qualifier les opportunités de mission, à préparer votre positionnement et à accélérer les échanges avec les entreprises clientes.',
  },
];

export const enterpriseBenefits: Benefit[] = [
  {
    icon: 'clock',
    title: 'Flexibilité des ressources',
    description:
      'Cadrez l’intervention d’un expert externe sur une durée et un périmètre définis, sans embauche directe.',
  },
  {
    icon: 'lock',
    title: 'Sécurité juridique',
    description:
      'Le portage salarial offre un cadre légal sécurisé, conforme à la convention collective et au Code du travail.',
  },
  {
    icon: 'check',
    title: 'Simplicité contractuelle',
    description:
      'Un seul contrat de prestation avec The Porters, sans avoir à gérer la relation employeur avec le consultant.',
  },
  {
    icon: 'globe',
    title: 'Accès à l\'international',
    description:
      'Étudiez le cadre d’une mission internationale avant de valider les conditions contractuelles, sociales et administratives applicables.',
  },
  {
    icon: 'building',
    title: 'Maîtrise des coûts',
    description:
      'Le contrat de prestation rend visibles le tarif, le périmètre et les conditions de facturation convenues pour la mission.',
  },
  {
    icon: 'heart',
    title: 'Expertises ciblées',
    description:
      'Orientez le besoin vers les compétences IT, data, cyber, cloud, produit, projet ou transformation réellement nécessaires.',
  },
];
