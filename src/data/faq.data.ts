import type { FaqGroup } from '../types/faq';

// copy-plan §9.10 : la réponse directe dans la première phrase, la nuance après.
// Jamais « Cela dépend » en ouverture.
// Les paramètres datés sont décrits comme mécanismes, sans chiffre.
export const faqGroups: FaqGroup[] = [
  {
    title: 'Comprendre le portage salarial',
    slug: 'comprendre',
    items: [
      {
        question: 'Comment fonctionne le portage salarial ?',
        answer:
          'Trois acteurs et deux contrats. Vous trouvez et réalisez votre mission ; l’entreprise cliente signe un contrat de prestation avec The Porters ; The Porters vous salarie et transforme votre chiffre d’affaires en salaire. Vous gardez votre autonomie commerciale et bénéficiez du statut de salarié.',
      },
      {
        question: 'Le portage salarial est-il reconnu légalement ?',
        // F-B01 (PUBLISHABLE)
        answer:
          'Oui. Il est encadré par le Code du travail, par l’accord national interprofessionnel de 2008 et par l’ordonnance du 2 avril 2015. Ce cadre définit les droits et obligations du salarié porté, de l’entreprise cliente et de la société de portage.',
      },
      {
        question: 'Y a-t-il un portage pour les salariés et un autre pour les freelances ?',
        answer:
          'Non. Il n’existe qu’un seul portage salarial. Que vous veniez d’un CDI, d’une micro-entreprise ou d’une SASU, le mécanisme est identique : un contrat de travail avec nous, un contrat de prestation avec votre client. Ce qui change, c’est votre point de départ, pas le dispositif.',
      },
      {
        question: 'Quels métiers IT peuvent être portés ?',
        // F-B10 (PUBLISHABLE)
        answer:
          'La plupart des prestations intellectuelles autonomes : cybersécurité, développement, DevOps, cloud, data engineering, IA, Product Ownership, coaching agile, chefferie de projet IT, AMOA et conseil. L’éligibilité est validée avant contrat ; les services à la personne sont exclus du portage salarial et les professions réglementées suivent leurs propres règles.',
      },
      {
        question: 'Quelle différence avec la micro-entreprise ou la SASU ?',
        answer:
          'Vous n’avez pas à créer votre propre structure pour facturer la mission : The Porters porte le contrat commercial et vous emploie. Vous relevez du régime salarié pour la protection sociale et cotisez notamment pour la retraite et l’assurance chômage ; l’ouverture et le montant de droits restent soumis aux conditions des régimes concernés. En contrepartie, des frais de gestion sont prélevés et vous restez responsable de votre prospection et de votre TJM.',
      },
      {
        question: 'Puis-je cumuler le portage avec autre chose ?',
        // F-B08 (PUBLISHABLE)
        answer:
          'Oui, avec un autre emploi salarié ou une retraite, sous réserve des règles applicables à votre situation. En cas de cumul d’emplois salariés, il faut respecter les durées maximales de travail et vérifier une éventuelle clause d’exclusivité dans vos contrats.',
      },
      {
        question: 'Puis-je travailler pour un client à l’étranger ?',
        // F-B09 (PUBLISHABLE)
        answer:
          'Oui. Votre mission peut se dérouler en France ou à l’étranger, pour un client français ou étranger, sur site ou en télétravail.',
      },
    ],
  },
  {
    title: 'Rémunération, frais et simulateur',
    slug: 'remuneration',
    items: [
      {
        question: 'Combien mon TJM me laisse-t-il en net ?',
        answer:
          'Le simulateur vous donne une estimation à partir de votre TJM, de vos jours facturés et de vos frais professionnels. L’écart entre chiffre d’affaires et net vient de trois postes : les frais de gestion, les cotisations sociales et les frais professionnels remboursés. Le résultat reste indicatif jusqu’à validation de votre situation.',
      },
      {
        question: 'Que couvrent les frais de gestion ?',
        answer:
          'Sept services : la gestion de trésorerie, l’apport d’affaires, un interlocuteur identifié, la gestion administrative, la responsabilité civile professionnelle, l’accompagnement des formations et la garantie financière. Le détail figure sur la page Frais et rémunération.',
      },
      {
        question: 'Quel est votre taux de frais de gestion ?',
        answer:
          'Le taux appliqué figure dans votre simulation et dans les documents contractuels avant la signature. Il est prélevé sur votre chiffre d’affaires mensuel et finance les services détaillés sur la page Frais et rémunération.',
      },
      {
        question: 'Quand suis-je payé ?',
        answer:
          'Le calendrier de paie est mensuel et dépend notamment de la transmission de votre compte rendu d’activité et des conditions prévues au contrat. Les échéances ainsi que l’effet du règlement client sont précisés avant le démarrage.',
      },
      {
        question: 'Que se passe-t-il si mon client règle à 45 ou 60 jours ?',
        answer:
          'Les conditions de versement et l’impact du délai de règlement sont fixés avant le démarrage. Votre simulation et vos documents contractuels indiquent précisément le calendrier applicable.',
      },
      {
        question: 'Comment sont gérés les frais professionnels ?',
        answer:
          'Ils vous sont remboursés lorsqu’ils sont réels, justifiés et liés à votre activité : internet, téléphone, matériel, logiciels, déplacements, repas ou hébergement selon la situation. Ils ne sont pas financés par les frais de gestion — ce sont deux choses distinctes.',
      },
      {
        question: 'À quoi sert le compte de trésorerie ?',
        // F-B11 (PUBLISHABLE)
        answer:
          'À mettre une part de votre rémunération brute de côté. Vous pouvez ainsi lisser une paie d’un mois sur l’autre, financer des congés en maintenant votre rémunération, provisionner une fin de contrat ou débloquer un acompte selon vos besoins.',
      },
    ],
  },
  {
    title: 'Missions et organisation',
    slug: 'missions',
    items: [
      {
        question: 'Trouvez-vous les missions à ma place ?',
        answer:
          'Non, aucune mission n’est garantie. Nous vous proposons des missions issues de nos partenaires, et vous restez libre de trouver les vôtres. Nous intervenons aussi sur votre positionnement, la présentation de votre offre et le cadrage de vos opportunités.',
      },
      {
        question: 'Puis-je garder mes propres clients ?',
        // F-B07 (PUBLISHABLE)
        answer:
          'Oui. Vous vous constituez votre propre clientèle et vous en restez pleinement responsable. Vous choisissez vos missions et négociez vos tarifs, sans lien hiérarchique ni chez le client ni chez nous.',
      },
      {
        question: 'Combien de congés payés ai-je ?',
        // F-B06 (PUBLISHABLE)
        answer:
          'Vous acquérez des congés payés selon les règles applicables aux salariés. Leur acquisition, leur prise et leur traitement sur le bulletin ou dans votre réserve sont expliqués dans vos documents contractuels et par le service paie.',
      },
      {
        question: 'Que se passe-t-il si je tombe malade ?',
        answer:
          'Votre arrêt est traité dans le cadre du régime salarié. Les indemnités de la Sécurité sociale et l’intervention éventuelle de la prévoyance dépendent de votre situation, de la durée de l’arrêt et des conditions d’ouverture de droits ; le service paie vous confirme les pièces et paramètres applicables.',
      },
      {
        question: 'Que se passe-t-il entre deux missions ?',
        answer:
          'L’entreprise de portage n’est pas tenue de vous fournir une mission. Les effets d’une période sans activité dépendent de votre contrat, du chiffre d’affaires disponible et de la réserve éventuellement constituée ; votre conseiller vous aide à les anticiper avant la fin de mission.',
      },
      {
        question: 'Mes droits au chômage sont-ils préservés ?',
        answer:
          'Vous cotisez à l’assurance chômage dans le cadre du statut salarié. Une indemnisation éventuelle dépend ensuite de votre durée d’affiliation, de la nature de la fin du contrat et des autres conditions examinées par France Travail ; elle n’est donc jamais automatique.',
      },
    ],
  },
  {
    title: 'Entrée et sortie',
    slug: 'entree-sortie',
    items: [
      {
        question: 'Comment se passe mon arrivée ?',
        answer:
          'Vous recevez une simulation chiffrée, un livre blanc, le détail des frais et le mode opératoire de votre espace de gestion. Une intégration individuelle présente ensuite les contrats, l’activité mensuelle, la paie, la formation et votre interlocuteur dédié.',
      },
      {
        question: 'Que se passe-t-il quand je veux partir ?',
        answer:
          'La sortie suit le mode de rupture prévu par votre contrat et le droit du travail : démission, fin ou rupture de période d’essai, terme d’un CDD ou rupture conventionnelle lorsqu’elle est possible et acceptée. The Porters prépare alors les documents de fin de contrat ; les conditions et coûts éventuels sont expliqués avant l’engagement de la procédure.',
      },
      {
        question: 'Suis-je engagé sur une durée minimale ?',
        answer:
          'La durée et les modalités de sortie sont celles inscrites dans votre contrat de travail et prévues par le droit applicable. Elles sont relues avec vous avant signature afin d’éviter une promesse générale qui ne correspondrait pas à votre situation.',
      },
    ],
  },
  {
    title: 'Pour les entreprises',
    slug: 'entreprises',
    items: [
      {
        question: 'Pourquoi passer par un consultant en portage salarial ?',
        answer:
          'Vous mobilisez un expert autonome dans un cadre contractuel explicite : un contrat de prestation avec The Porters, une facturation centralisée et aucune paie à établir côté client. Le dispositif convient à un besoin IT, data, cloud, cyber, projet ou transformation dont le périmètre, les responsabilités et l’absence de lien de subordination sont clairement organisés.',
      },
      {
        question: 'Qui signe le contrat avec l’entreprise cliente ?',
        answer:
          'The Porters. Le consultant reste salarié porté par The Porters pendant toute la mission, et vous n’avez qu’un interlocuteur contractuel.',
      },
      {
        question: 'Comment sélectionnez-vous les profils ?',
        // F-D01, F-D02, F-D03 (PUBLISHABLE)
        answer:
          'En cinq étapes : analyse du parcours réel, évaluation sur les référentiels métiers CIGREF, SYNTEC et ROME, deux entretiens structurés — RH et technique — puis tests ou mise en situation selon le périmètre, et enfin une validation interne. Les profils vous sont transmis sous forme anonymisée.',
      },
      {
        question: 'Comment choisissez-vous la méthode de delivery ?',
        answer:
          'À partir de la stabilité du besoin, de la criticité, des dépendances et des exigences de conformité. Le cycle en V convient à un périmètre stabilisé, Scrum ou Kanban à un besoin évolutif, et une approche hybride combine des jalons fermes avec une exécution itérative.',
      },
      {
        question: 'Comment sécurisez-vous la clôture d’une mission ?',
        answer:
          'La recette s’appuie sur des critères explicites et des livrables traçables. La clôture prévoit la documentation utile, la restitution ou la fermeture des accès, le transfert de connaissances et une revue de la prestation proportionnée à son niveau de complexité.',
      },
      {
        question: 'Et si mon interlocuteur est absent ?',
        // F-D07 (PUBLISHABLE)
        answer:
          'Chaque mission est suivie par un binôme, avec un relais identifié. Aucun suivi ne dépend d’une seule personne.',
      },
    ],
  },
];
