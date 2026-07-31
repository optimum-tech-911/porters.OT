export type ResourceGuideSection = {
  number: string;
  eyebrow: string;
  title: string;
  text: string;
  points: string[];
};

export type ResourceGuide = {
  slug: string;
  label: string;
  title: string;
  introduction: string;
  readingTime: string;
  sections: ResourceGuideSection[];
  takeaways: string[];
};

export const resourceGuides: ResourceGuide[] = [
  {
    slug: 'guide-complet-portage-salarial',
    label: 'Livre blanc The Porters',
    title: 'Le portage salarial, de la première simulation à la fin de mission.',
    introduction:
      'Une lecture structurée du dispositif : qui signe quoi, ce que The Porters prend en charge et les décisions qui restent entre vos mains.',
    readingTime: '8 minutes',
    sections: [
      {
        number: '01',
        eyebrow: 'Comprendre le cadre',
        title: 'Trois acteurs. Deux contrats. Une mission.',
        text:
          'Le consultant choisit sa mission et négocie ses conditions avec l’entreprise cliente. The Porters formalise ensuite la relation de travail et la prestation, puis suit l’activité administrative.',
        points: [
          'Le consultant conserve sa démarche commerciale et son expertise.',
          'L’entreprise cliente définit le besoin et valide la prestation.',
          'The Porters assure le cadre contractuel, la facturation et la paie.',
        ],
      },
      {
        number: '02',
        eyebrow: 'Préparer l’entrée',
        title: 'Poser les hypothèses avant de signer.',
        text:
          'Une simulation n’est utile que si ses paramètres sont explicites. Mission, TJM, rythme d’activité, frais éventuels et calendrier doivent pouvoir être relus et questionnés.',
        points: [
          'Vérifier le périmètre, le TJM et la durée prévisionnelle.',
          'Identifier les documents et validations nécessaires.',
          'Comprendre la simulation et les services inclus.',
        ],
      },
      {
        number: '03',
        eyebrow: 'Vivre la mission',
        title: 'Un même fil entre activité, facture et paie.',
        text:
          'Pendant la mission, l’activité déclarée sert de base au suivi. The Porters coordonne les éléments administratifs, la facturation, les justificatifs acceptés et la préparation de la paie.',
        points: [
          'Déclarer et faire valider l’activité selon le calendrier convenu.',
          'Centraliser les échanges contractuels et administratifs.',
          'Garder un interlocuteur pour les questions de mission.',
        ],
      },
      {
        number: '04',
        eyebrow: 'Anticiper la sortie',
        title: 'Clore la mission sans laisser de zone grise.',
        text:
          'La fin d’une prestation se prépare : date, validation de l’activité, factures restantes et documents liés à la relation de travail doivent être suivis dans le même dossier.',
        points: [
          'Confirmer la date et les conditions de fin de mission.',
          'Vérifier les derniers éléments d’activité et de facturation.',
          'Faire le point sur les documents et les étapes suivantes.',
        ],
      },
    ],
    takeaways: [
      'Je sais distinguer le contrat de travail du contrat de prestation.',
      'Je sais quelles hypothèses relire dans ma simulation.',
      'Je sais ce qui reste sous ma responsabilité commerciale.',
      'Je sais qui contacter pendant et à la fin de la mission.',
    ],
  },
  {
    slug: 'comparatif-statuts-freelances',
    label: 'Comparatif',
    title: 'Choisir un cadre selon votre projet, pas selon une promesse.',
    introduction:
      'Portage salarial, micro-entreprise ou société : la bonne lecture part de l’autonomie souhaitée, de la protection attendue, de la gestion et de la structure de coûts.',
    readingTime: '6 minutes',
    sections: [
      {
        number: '01',
        eyebrow: 'Autonomie',
        title: 'Qui trouve et négocie la mission ?',
        text:
          'En portage, vous restez autonome dans votre prospection et dans la négociation de votre mission. Une société offre également cette autonomie, tandis que chaque cadre organise différemment la relation commerciale.',
        points: [
          'Clarifier qui porte la prospection et la négociation.',
          'Vérifier la liberté de choisir les missions et les clients.',
          'Identifier les contraintes propres à votre activité.',
        ],
      },
      {
        number: '02',
        eyebrow: 'Protection',
        title: 'Quel statut social accompagne l’activité ?',
        text:
          'Le portage repose sur un contrat de travail et la protection sociale associée. Les autres formes d’exercice reposent sur des régimes différents qui doivent être comparés avec votre situation réelle.',
        points: [
          'Comparer la couverture, pas seulement le revenu affiché.',
          'Intégrer votre situation personnelle et professionnelle.',
          'Faire valider les cas particuliers par un conseil compétent.',
        ],
      },
      {
        number: '03',
        eyebrow: 'Gestion',
        title: 'Que voulez-vous administrer vous-même ?',
        text:
          'Le portage délègue le cadre contractuel, la facturation, les déclarations sociales et la paie. Créer et gérer une structure implique davantage d’arbitrages et de responsabilités administratives.',
        points: [
          'Lister les tâches que vous souhaitez réellement déléguer.',
          'Évaluer le temps consacré à la gestion.',
          'Vérifier le niveau d’accompagnement proposé.',
        ],
      },
      {
        number: '04',
        eyebrow: 'Coûts',
        title: 'Comparer des modèles complets.',
        text:
          'Un pourcentage isolé ne suffit pas. Il faut comparer les services inclus, les cotisations, les assurances, les coûts de structure et le temps de gestion avant de tirer une conclusion.',
        points: [
          'Demander une simulation détaillée et compréhensible.',
          'Identifier les services compris dans les frais.',
          'Comparer sur un même scénario d’activité.',
        ],
      },
    ],
    takeaways: [
      'J’ai défini mon niveau d’autonomie souhaité.',
      'J’ai comparé la protection et la gestion, pas uniquement le net.',
      'J’ai posé le même scénario à chaque solution.',
      'J’ai identifié les sujets qui nécessitent un conseil personnalisé.',
    ],
  },
  {
    slug: 'checklist-demarrer-portage-salarial',
    label: 'Checklist',
    title: 'Les points à verrouiller avant de démarrer en portage.',
    introduction:
      'Une checklist courte pour transformer un accord de principe en mission correctement cadrée, sans multiplier les allers-retours.',
    readingTime: '4 minutes',
    sections: [
      {
        number: '01',
        eyebrow: 'La mission',
        title: 'Le besoin est-il suffisamment précis ?',
        text:
          'Avant la contractualisation, le résultat attendu, le périmètre, le lieu d’intervention, le calendrier et les interlocuteurs doivent être identifiés.',
        points: [
          'Périmètre et livrables compris par les trois parties.',
          'Dates, rythme et conditions d’intervention clarifiés.',
          'Référent côté client identifié.',
        ],
      },
      {
        number: '02',
        eyebrow: 'Les conditions',
        title: 'Les hypothèses économiques sont-elles lisibles ?',
        text:
          'TJM, jours prévisionnels, frais éventuels et modalités de facturation alimentent la simulation. Les écarts entre hypothèse et réalité doivent pouvoir être expliqués.',
        points: [
          'TJM et volume d’activité prévisionnel validés.',
          'Frais et justificatifs anticipés.',
          'Simulation relue avant signature.',
        ],
      },
      {
        number: '03',
        eyebrow: 'Les contrats',
        title: 'Les responsabilités sont-elles distribuées ?',
        text:
          'Le contrat de prestation et la relation de travail ne couvrent pas le même objet. Confidentialité, accès, sécurité et contraintes client doivent être repris au bon endroit.',
        points: [
          'Documents transmis et informations exactes.',
          'Exigences de sécurité ou de confidentialité signalées.',
          'Processus de validation compris.',
        ],
      },
      {
        number: '04',
        eyebrow: 'Le suivi',
        title: 'Savez-vous quoi faire le premier mois ?',
        text:
          'Le démarrage est plus fluide lorsque le calendrier de déclaration d’activité, la validation client et les contacts utiles sont connus avant le premier jour.',
        points: [
          'Accès à l’espace de suivi confirmé.',
          'Calendrier de déclaration et de validation connu.',
          'Interlocuteur Porters enregistré.',
        ],
      },
    ],
    takeaways: [
      'Mission, TJM et calendrier sont alignés.',
      'Les contraintes client sont connues.',
      'Les documents nécessaires sont disponibles.',
      'Le premier cycle activité–facture–paie est compris.',
    ],
  },
];
