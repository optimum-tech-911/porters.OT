import type { Agency } from '../types/agency';

const coreServices = [
  {
    title: 'Contrats et facturation',
    description:
      "The Porters met en place le cadre contractuel avec l'entreprise cliente, puis suit la facturation et les éléments administratifs de la mission.",
  },
  {
    title: 'Paie et frais professionnels',
    description:
      'Un conseiller vous aide à relire vos éléments de paie, vos frais professionnels et les points à valider avant chaque simulation personnalisée.',
  },
  {
    title: 'Accompagnement consultant',
    description:
      'Positionnement, choix du statut, passage freelance vers portage, cadrage de mission IT et bonnes pratiques de relation client.',
  },
];

export const agencies: Agency[] = [
  {
    slug: 'paris',
    city: 'Paris',
    region: 'Île-de-France',
    address: '27 rue Marbeuf',
    postalCode: '75008',
    phone: '07 81 46 28 99',
    email: 'clarence@porters.fr',
    heroTitle: 'The Porters Paris — Portage salarial en Île-de-France',
    heroSubtitle:
      'Une agence pour consultants IT, chefs de projet, Product Owners, profils data, cloud, cyber et conseil en Île-de-France.',
    description:
      "The Porters Paris accompagne les consultants indépendants en portage salarial : Product Owners, chefs de projet IT, développeurs, profils data, cloud, cyber et consultants conseil. L'équipe organise des rendez-vous de découverte, des simulations et des cadrages de mission adaptés au marché francilien.",
    proofNote:
      "Rendez-vous de découverte, simulation et cadrage de mission disponibles pour les consultants franciliens.",
    serviceCards: coreServices,
    contentSections: [
      {
        eyebrow: 'Portage salarial Paris',
        title: 'Devenir consultant indépendant à Paris',
        paragraphs: [
          "Paris concentre une forte demande en prestations intellectuelles : IT, data, cloud, cybersécurité, produit, transformation digitale, management de projet et conseil. Le portage salarial permet de répondre à ces missions sans créer immédiatement sa propre structure.",
          "Vous gardez la main sur votre prospection, votre TJM, votre négociation et votre relation client. The Porters prend le relais sur le cadre contractuel, la facturation, la paie et les démarches administratives liées à votre activité portée.",
          "L'accompagnement parisien combine proximité, rendez-vous à distance et suivi continu pour répondre au rythme des missions franciliennes.",
        ],
      },
      {
        eyebrow: 'Accompagnement',
        title: 'Comment devenir consultant en portage salarial à Paris',
        paragraphs: [
          "Le premier échange sert à cadrer votre situation : mission déjà signée ou en négociation, TJM envisagé, nombre de jours facturés, frais professionnels, statut actuel et objectifs de revenus.",
          "The Porters peut ensuite préparer une lecture claire de votre simulation et des documents nécessaires. L'objectif n'est pas de promettre une mission garantie, mais de vous aider à sécuriser le passage vers un cadre salarié.",
          "Pour les profils tech, le rendez-vous peut être orienté métier : DevOps, cloud, data, IA, cybersécurité, Product Ownership, Scrum Master, coaching agile ou chefferie de projet IT.",
        ],
      },
      {
        eyebrow: 'Missions',
        title: 'Trouver ses missions en portage salarial en Île-de-France',
        paragraphs: [
          "Le consultant porté reste responsable de sa recherche de missions. The Porters peut néanmoins aider à clarifier le positionnement, la proposition de valeur, la lecture du TJM et la manière de présenter le portage à un client.",
          "Le marché francilien est concurrentiel : une offre précise, des références lisibles et une spécialité métier clairement nommée sont souvent plus efficaces qu'un profil généraliste.",
        ],
      },
    ],
    highlight: {
      title: 'Un rendez-vous adapté à votre situation',
      body:
        "À Paris, choisissez un rendez-vous de découverte, une lecture de simulation ou un cadrage de mission IT avec un conseiller qui connaît votre dossier.",
    },
    teamMembers: [],
    localFaq: [
      {
        question: 'Comment organiser un rendez-vous avec The Porters Paris ?',
        answer:
          "Utilisez la page Rendez-vous pour choisir le motif de l'échange et indiquer vos disponibilités. L'équipe vous confirme le créneau sous 24 heures ouvrées.",
      },
      {
        question: 'Quels profils accompagne The Porters Paris ?',
        answer:
          'L’agence accompagne notamment des consultants IT, Product Owners, chefs de projet digitaux, experts data, cloud, DevOps, cybersécurité et profils conseil.',
      },
      {
        question: 'The Porters Paris trouve-t-il des missions à ma place ?',
        answer:
          "Non, aucune mission n'est garantie. L'accompagnement porte sur le cadrage, le positionnement, la simulation et la sécurisation administrative de vos missions.",
      },
    ],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    seo: {
      title: 'Portage salarial IT à Paris — The Porters',
      description:
        'The Porters Paris accompagne les consultants IT et tech en portage salarial en Île-de-France. Rendez-vous, simulation et suivi personnalisé.',
    },
  },
  {
    slug: 'lyon',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    address: '4 place Amédée Bonnet',
    postalCode: '69002',
    phone: '06 45 32 31 84',
    email: 'simon@porters.fr',
    heroTitle: 'The Porters Lyon — Portage salarial en Auvergne-Rhône-Alpes',
    heroSubtitle: "L'accompagnement portage pour consultants indépendants à Lyon.",
    description:
      "The Porters Lyon accompagne les consultants indépendants en Auvergne-Rhône-Alpes avec un suivi de proximité, une gestion administrative complète et un cadre salarial adapté aux missions de conseil, IT, ingénierie, data, cloud, DevOps et transformation digitale.",
    proofNote: 'Accueil au 4 place Amédée Bonnet, 69002 Lyon, sur rendez-vous.',
    serviceCards: coreServices,
    contentSections: [
      {
        eyebrow: 'Portage salarial Lyon',
        title: 'Développer son activité de consultant à Lyon',
        paragraphs: [
          "Lyon est un bassin actif pour les prestations de conseil, d'ingénierie, d'IT, de transformation digitale et de pilotage de projets. Le portage salarial aide les consultants à intervenir auprès de clients sans porter seuls la gestion administrative.",
          "The Porters Lyon propose un point d'entrée local pour comprendre le fonctionnement du portage, préparer une simulation et sécuriser le démarrage d'une mission.",
        ],
      },
      {
        eyebrow: 'Parcours consultant',
        title: 'Passer de freelance à portage salarial',
        paragraphs: [
          "Si vous êtes déjà freelance, le rendez-vous permet de comparer votre statut actuel avec le portage : protection sociale, paie, frais professionnels, relation client et contraintes administratives.",
          "Si vous démarrez, l'échange sert à cadrer le TJM, les jours facturés, les frais et le calendrier de mission avant de contractualiser.",
        ],
      },
      {
        eyebrow: 'Profils accompagnés',
        title: 'IT, industrie, data, cloud et conseil',
        paragraphs: [
          "La page Lyon parle aux profils tech et conseil : développeurs, DevOps, cloud engineers, chefs de projet IT, Product Owners, data engineers, consultants transformation et experts métiers.",
          "Le contenu reste centré sur ce que The Porters peut réellement faire : expliquer, simuler, contractualiser, suivre la paie et accompagner le consultant dans son cadre d'activité.",
        ],
      },
    ],
    highlight: {
      title: 'Un accompagnement de proximité à Lyon',
      body:
        "L'équipe lyonnaise accompagne les consultants de la découverte du portage jusqu'au suivi de mission, avec un contact direct et des coordonnées locales.",
    },
    teamMembers: [],
    localFaq: [
      {
        question: 'Comment contacter The Porters Lyon ?',
        answer:
          'Simon Girardey, Responsable Lyon, est joignable par email ou téléphone depuis cette page.',
      },
      {
        question: 'Où se situe The Porters Lyon ?',
        answer:
          'The Porters Lyon vous accueille au 4 place Amédée Bonnet, 69002 Lyon, sur rendez-vous.',
      },
    ],
    coordinates: { lat: 45.764, lng: 4.8357 },
    seo: {
      title: 'Portage salarial à Lyon — The Porters',
      description:
        'The Porters Lyon accompagne les consultants indépendants en portage salarial à Lyon et en Auvergne-Rhône-Alpes.',
    },
  },
  {
    slug: 'aix-en-provence',
    city: 'Aix-en-Provence',
    region: "Provence-Alpes-Côte d'Azur",
    address: '',
    postalCode: '',
    phone: '',
    email: 'contact@porters.fr',
    heroTitle: 'The Porters Aix-en-Provence — Portage salarial en PACA',
    heroSubtitle:
      'Un accompagnement de proximité pour les consultants IT, data, cyber, cloud, produit et projet du bassin aixois.',
    description:
      "The Porters accompagne les consultants indépendants et les entreprises à Aix-en-Provence pour cadrer une mission, comparer les statuts, simuler les revenus et sécuriser la gestion contractuelle et administrative.",
    proofNote:
      "Rendez-vous à distance ou selon les modalités convenues avec l'équipe pour le bassin d'Aix-en-Provence.",
    serviceCards: coreServices,
    contentSections: [
      {
        eyebrow: 'Portage salarial Aix-en-Provence',
        title: 'Structurer une mission tech dans le bassin aixois',
        paragraphs: [
          "Aix-en-Provence et son bassin réunissent des besoins en IT, data, cloud, cybersécurité, industrie et transformation. Le portage salarial permet aux experts d'intervenir avec un cadre contractuel et social lisible.",
          "The Porters accompagne le cadrage du TJM ou du chiffre d'affaires, la simulation, la contractualisation, la facturation et le suivi de mission.",
        ],
      },
      {
        eyebrow: 'Consultants et entreprises',
        title: 'Un parcours adapté à chaque besoin',
        paragraphs: [
          "Le consultant peut sécuriser une mission déjà trouvée, tandis que l'entreprise peut qualifier son besoin et choisir entre portage salarial et renfort via un partenaire ESN.",
          "Chaque parcours conserve un interlocuteur identifiable pour éviter la dispersion entre le contrat, la paie, la facturation et le suivi opérationnel.",
        ],
      },
    ],
    highlight: {
      title: 'Aix-en-Provence, un bassin actif pour les expertises numériques',
      body:
        "IT, industrie, data, cybersécurité et transformation créent un terrain naturel pour les consultants spécialisés accompagnés par The Porters.",
    },
    teamMembers: [],
    localFaq: [
      {
        question: 'Comment rencontrer The Porters à Aix-en-Provence ?',
        answer:
          "Un premier rendez-vous peut être organisé à distance ou selon les modalités confirmées par l'équipe pour le bassin aixois.",
      },
      {
        question: 'Quels profils sont accompagnés à Aix-en-Provence ?',
        answer:
          'Les parcours couvrent notamment les consultants IT, data, cloud, DevOps, cybersécurité, produit, projet et transformation.',
      },
    ],
    coordinates: { lat: 43.5297, lng: 5.4474 },
    seo: {
      title: 'Portage salarial à Aix-en-Provence — The Porters',
      description:
        'The Porters accompagne les consultants IT et tech en portage salarial à Aix-en-Provence et dans le bassin aixois.',
    },
  },
  {
    slug: 'marseille',
    city: 'Marseille',
    region: "Provence-Alpes-Côte d'Azur",
    address: '',
    postalCode: '',
    phone: '07 68 67 08 50',
    email: 'ebensaid@porters.fr',
    heroTitle: 'The Porters Marseille — Portage salarial en PACA',
    heroSubtitle: 'Un point de contact pour cadrer vos missions IT et conseil en région PACA.',
    description:
      "The Porters Marseille accompagne les consultants IT, cyber, DevOps, cloud, data et conseil qui veulent étudier le portage salarial en région PACA. Le rendez-vous peut être organisé à distance ou selon les modalités convenues avec l'équipe locale.",
    proofNote:
      "Échanges disponibles à distance ou selon les modalités convenues avec l'équipe Marseille.",
    serviceCards: coreServices,
    contentSections: [
      {
        eyebrow: 'Portage salarial Marseille',
        title: 'Structurer une mission indépendante en région PACA',
        paragraphs: [
          "L'agence Marseille sert de point d'entrée aux consultants déjà en mission, en négociation ou en réflexion sur leur statut.",
          "L'accompagnement couvre la simulation, la compréhension du portage, la préparation contractuelle, les frais professionnels et le suivi avec un conseiller dédié.",
        ],
      },
      {
        eyebrow: 'Aix-Marseille',
        title: 'Un accompagnement pour profils tech et conseil',
        paragraphs: [
          "Les consultants cyber, DevOps, cloud, data, IA, produit, projet et transformation peuvent utiliser le portage salarial pour sécuriser des missions sans créer une société dès le départ.",
          "Le rendez-vous permet de clarifier la situation : client déjà identifié, durée de mission, TJM, rythme de facturation, frais et calendrier de paie.",
        ],
      },
      {
        eyebrow: 'Suivi de mission',
        title: 'Un interlocuteur disponible du cadrage à la paie',
        paragraphs: [
          "Votre conseiller suit le contrat, la facturation, les frais professionnels et les éléments de paie. Vous conservez ainsi un contact stable pendant toute la mission.",
        ],
      },
    ],
    highlight: {
      title: "Un point d'entrée clair pour la région PACA",
      body:
        "Consultant en mission ou entreprise à la recherche d'une expertise IT : l'équipe qualifie la demande et organise rapidement le bon échange.",
    },
    teamMembers: [],
    localFaq: [
      {
        question: 'Comment rencontrer The Porters Marseille ?',
        answer:
          "Les échanges sont organisés sur rendez-vous, à distance ou selon les modalités précisées par l'équipe.",
      },
      {
        question: 'Puis-je demander un rendez-vous pour une mission en PACA ?',
        answer:
          'Oui. Choisissez un échange de découverte, une simulation ou un cadrage de mission depuis la page Rendez-vous.',
      },
    ],
    coordinates: { lat: 43.2965, lng: 5.3698 },
    seo: {
      title: 'Portage salarial à Marseille — The Porters',
      description:
        'The Porters Marseille accompagne les consultants indépendants en PACA : rendez-vous, simulation et cadrage de missions IT et conseil.',
    },
  },
  {
    slug: 'montpellier',
    city: 'Montpellier',
    region: 'Occitanie',
    address: '120 rue de Thor',
    postalCode: '34000',
    phone: '07 68 67 08 50',
    email: 'ebensaid@porters.fr',
    heroTitle: 'The Porters Montpellier — Portage salarial en Occitanie',
    heroSubtitle: 'Un accompagnement local pour les consultants indépendants en Occitanie.',
    description:
      "The Porters Montpellier accompagne les consultants indépendants en Occitanie avec un positionnement clair pour les profils IT, digital, data, cloud, DevOps, agilité et conseil.",
    proofNote:
      'Accompagnement local et à distance depuis Montpellier pour les consultants en Occitanie.',
    serviceCards: coreServices,
    contentSections: [
      {
        eyebrow: 'Portage salarial Montpellier',
        title: 'Développer son activité indépendante en Occitanie',
        paragraphs: [
          "Montpellier rassemble un écosystème actif dans le numérique, le conseil, la santé, la recherche et les services. Le portage salarial offre un cadre clair aux consultants qui interviennent auprès de ces organisations.",
          "The Porters accompagne la simulation de revenus, la contractualisation, la gestion administrative, les frais professionnels et le suivi du consultant.",
        ],
      },
      {
        eyebrow: 'Consultants accompagnés',
        title: 'Profils IT, digital, data, cloud et agilité',
        paragraphs: [
          "Montpellier peut accueillir des consultants aux profils variés : développeurs, chefs de projet, Product Owners, Scrum Masters, experts data, DevOps, cloud, cybersécurité, marketing digital et conseil.",
          "Le portage combine autonomie commerciale, statut salarié et gestion administrative déléguée pour laisser chaque consultant se concentrer sur sa valeur métier.",
        ],
      },
      {
        eyebrow: 'Rendez-vous',
        title: 'Préparer son passage en portage salarial',
        paragraphs: [
          "Un premier rendez-vous permet de poser les bases : activité, client visé, TJM, durée de mission, frais, souhait de protection sociale et besoin d'accompagnement.",
          "Pour un consultant déjà en mission, l'objectif est d'aller vite sur le cadrage contractuel et la compréhension de la rémunération nette estimée.",
        ],
      },
    ],
    highlight: {
      title: 'Une présence locale au service des consultants',
      body:
        "À Montpellier, The Porters accompagne les profils tech et conseil avec un suivi humain, une simulation lisible et une gestion administrative structurée.",
    },
    teamMembers: [],
    localFaq: [
      {
        question: 'Quels profils sont accompagnés à Montpellier ?',
        answer:
          "L'agence accompagne notamment les développeurs, chefs de projet, Product Owners, Scrum Masters, experts data, DevOps, cloud, cybersécurité et consultants conseil.",
      },
      {
        question: 'Comment prendre rendez-vous à Montpellier ?',
        answer:
          'Choisissez votre motif et vos disponibilités sur la page Rendez-vous. L’équipe vous confirme le créneau et le format de l’échange.',
      },
    ],
    coordinates: { lat: 43.6108, lng: 3.8767 },
    seo: {
      title: 'Portage salarial à Montpellier — The Porters',
      description:
        'The Porters Montpellier accompagne les consultants indépendants en portage salarial en Occitanie.',
    },
  },
  {
    slug: 'toulouse',
    city: 'Toulouse',
    region: 'Occitanie',
    address: '',
    postalCode: '',
    phone: '',
    email: 'contact@porters.fr',
    heroTitle: 'The Porters Toulouse — Portage salarial pour consultants tech',
    heroSubtitle:
      'Un accompagnement pour les consultants IT, data, cyber, cloud, produit et agilité à Toulouse.',
    description:
      "The Porters Toulouse accompagne les consultants IT, data, cyber, cloud, produit et agilité dans le cadrage de leur mission, la simulation de leurs revenus et la gestion de leur activité en portage salarial.",
    proofNote:
      "Rendez-vous à distance ou selon les modalités convenues avec l'équipe Toulouse.",
    serviceCards: coreServices,
    contentSections: [
      {
        eyebrow: 'Portage salarial Toulouse',
        title: 'Structurer son activité de consultant à Toulouse',
        paragraphs: [
          "Toulouse concentre des besoins en ingénierie, aéronautique, spatial, data, cybersécurité, industrie et transformation numérique. Le portage salarial permet aux experts d'intervenir dans un cadre contractuel et social structuré.",
          "L'accompagnement répond aux besoins des consultants tech : cadrage de mission, TJM, protection sociale, facturation, frais et passage d'un statut freelance vers le portage salarial.",
        ],
      },
      {
        eyebrow: 'Profils tech',
        title: 'Data, IA, cloud, cyber, produit et projet',
        paragraphs: [
          "L'équipe accompagne les profils data, IA, cloud, cybersécurité, Product Owners, Scrum Masters, coachs agiles et chefs de projet IT.",
          "Le rendez-vous sert à qualifier le besoin : découvrir le portage, optimiser une simulation, discuter d'une mission IT ou échanger avec l'agence.",
        ],
      },
      {
        eyebrow: 'Accompagnement',
        title: 'Un échange adapté à votre spécialité',
        paragraphs: [
          "Le premier échange reprend votre spécialité, la durée de la mission, le TJM, le rythme de facturation et les frais professionnels envisagés.",
          "Vous obtenez ensuite une simulation lisible et les prochaines étapes contractuelles adaptées à votre calendrier.",
        ],
      },
    ],
    highlight: {
      title: 'Toulouse, un pôle stratégique pour les expertises tech',
      body:
        "Aéronautique, spatial, industrie, data et cybersécurité créent un terrain naturel pour les consultants spécialisés accompagnés par The Porters.",
    },
    teamMembers: [],
    localFaq: [
      {
        question: 'Comment échanger avec The Porters Toulouse ?',
        answer:
          "Choisissez un rendez-vous en ligne. L'équipe vous confirme le créneau, le format et l'interlocuteur adapté à votre besoin.",
      },
      {
        question: 'Quels secteurs sont concernés à Toulouse ?',
        answer:
          "Les profils aéronautique, spatial, industrie, data, IA, cloud, cybersécurité, produit, agilité et gestion de projet peuvent être accompagnés.",
      },
    ],
    coordinates: { lat: 43.6047, lng: 1.4442 },
    seo: {
      title: 'Portage salarial à Toulouse — The Porters',
      description:
        'The Porters Toulouse accompagne les consultants IT et tech en portage salarial : simulation, cadrage de mission et suivi personnalisé.',
    },
  },
];

export const legacyAgencyNotes = [
  {
    city: 'Bordeaux',
    oldUrl: '/old-portage-salarial-bordeaux/',
    note: 'Agence ancienne à confirmer. Si elle n’est plus active, redirection vers /agences ou /contact.',
  },
  {
    city: 'Lille',
    oldUrl: '/old-portage-salarial-lille/',
    note: 'Agence ancienne à confirmer. Si elle n’est plus active, redirection vers /agences ou /contact.',
  },
];
