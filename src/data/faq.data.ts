import type { FaqGroup } from '../types/faq';

export const faqGroups: FaqGroup[] = [
  {
    title: 'Comprendre le portage salarial',
    slug: 'comprendre',
    items: [
      {
        question: 'Comment fonctionne le portage salarial ?',
        answer:
          "Le portage salarial repose sur une relation tripartite : vous trouvez et réalisez votre mission, l'entreprise cliente contractualise avec The Porters, et The Porters vous salarie pour transformer votre chiffre d'affaires en salaire. Vous gardez votre autonomie commerciale tout en bénéficiant du cadre salarié.",
      },
      {
        question: 'Le portage salarial est-il reconnu légalement ?',
        answer:
          "Oui. Le portage salarial est encadré par le Code du travail, notamment depuis son intégration en 2008 et l'ordonnance du 2 avril 2015. Il définit les droits et obligations du salarié porté, de l'entreprise cliente et de la société de portage.",
      },
      {
        question: 'Quels métiers IT peuvent être portés ?',
        answer:
          'Le portage salarial est adapté aux prestations intellectuelles : cybersécurité, développement, DevOps, cloud, data engineering, IA, Product Ownership, Scrum Master, coaching agile, chefferie de projet IT et conseil tech. Les professions réglementées et services à la personne restent exclus.',
      },
      {
        question: 'Quelle différence avec la micro-entreprise ou la SASU ?',
        answer:
          "Le consultant en portage ne crée pas de société et délègue l'administratif, la paie, les déclarations et la facturation. Il conserve une couverture sociale salariée, mais reste responsable de son positionnement, de son TJM et de la recherche de ses missions.",
      },
    ],
  },
  {
    title: 'Rémunération, frais et simulateur',
    slug: 'remuneration',
    items: [
      {
        question: 'Comment et quand suis-je payé(e) ?',
        answer:
          "Votre salaire et vos frais professionnels validés sont versés au début du mois, dans les cinq premiers jours ouvrés, sous réserve de la réception des éléments de paie et des conditions prévues par votre convention de portage.",
      },
      {
        question: 'Que se passe-t-il si mon client règle à 45 ou 60 jours ?',
        answer:
          "L'avance de trésorerie permet, lorsque les conditions contractuelles sont réunies, de ne pas attendre le règlement final du client pour percevoir votre salaire. Votre conseiller vérifie ces conditions au cadrage de la mission.",
      },
      {
        question: 'Comment sont gérés les frais professionnels ?',
        answer:
          "Les frais liés à votre activité peuvent être pris en compte lorsqu'ils sont justifiés : internet, téléphone, matériel, logiciels, déplacements, repas ou hébergement selon la situation. Ils doivent correspondre à des dépenses professionnelles réelles et documentées.",
      },
      {
        question: 'Le taux de frais The Porters est-il affiché ?',
        answer:
          "Oui. Le taux de frais de gestion utilisé dans le simulateur est fixé à 10 %. Il couvre notamment la gestion sociale et administrative, la facturation, l'accompagnement dédié, les outils et le suivi de votre activité.",
      },
      {
        question: 'À quoi sert le simulateur de revenus ?',
        answer:
          "Le simulateur donne une première estimation de salaire net à partir de votre TJM, du nombre de jours travaillés et de vos frais professionnels. Le résultat reste indicatif et peut ensuite être affiné avec un conseiller.",
      },
    ],
  },
  {
    title: 'Missions et accompagnement',
    slug: 'missions',
    items: [
      {
        question: 'Pouvez-vous m’accompagner dans la recherche de missions ?',
        answer:
          "The Porters ne promet pas de mission garantie. L'équipe vous accompagne sur votre positionnement, la présentation de votre offre, la mobilisation de son réseau, les conseils de prospection et le cadrage de vos opportunités.",
      },
      {
        question: 'Puis-je garder mes propres clients ?',
        answer:
          "Oui. Le principe du portage salarial est de vous laisser négocier et piloter vos missions tout en déléguant le cadre contractuel, la facturation et la paie à la société de portage.",
      },
      {
        question: 'The Porters accompagne-t-il les consultants IT seniors ?',
        answer:
          'Oui, le positionnement vise notamment les consultants tech expérimentés : DevOps, cloud architects, data engineers, experts IA, RSSI, Product Owners, Scrum Masters, coachs agiles et chefs de projet IT.',
      },
    ],
  },
  {
    title: 'Rendez-vous et agences',
    slug: 'agences-rdv',
    items: [
      {
        question: 'Quels types de rendez-vous puis-je demander ?',
        answer:
          'Vous pouvez demander un échange pour découvrir le portage salarial, optimiser votre salaire, passer de freelance à portage, discuter de votre mission IT ou échanger avec une agence.',
      },
      {
        question: 'Puis-je réserver directement un créneau en ligne ?',
        answer:
          "Oui. Choisissez le motif de l'échange et indiquez vos disponibilités depuis la page Rendez-vous. L'équipe vous confirme ensuite le créneau et le bon interlocuteur par email.",
      },
      {
        question: 'Quelles agences sont mises en avant ?',
        answer:
          "The Porters présente cinq implantations : Paris, Lyon, Marseille, Montpellier et Toulouse. Chaque page locale permet de découvrir les expertises accompagnées et de contacter l'équipe.",
      },
    ],
  },
  {
    title: 'Pour les entreprises',
    slug: 'entreprises',
    items: [
      {
        question: 'Pourquoi travailler avec un consultant en portage salarial ?',
        answer:
          "Le portage salarial permet de collaborer avec un expert indépendant dans un cadre contractuel structuré, sans embauche directe. C'est utile pour des besoins IT, data, cloud, cyber, projet ou transformation avec un périmètre de mission clair.",
      },
      {
        question: "Qui signe le contrat avec l'entreprise cliente ?",
        answer:
          "L'entreprise cliente contractualise avec The Porters pour la prestation. Le consultant reste salarié porté par The Porters pendant sa mission.",
      },
    ],
  },
];
