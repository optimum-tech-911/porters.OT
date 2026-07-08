import type { BlogPost, BlogCategory, BlogCategoryInfo } from '../types/blog';

export const blogCategories: BlogCategoryInfo[] = [
  {
    slug: 'devenir-consultant',
    label: 'Devenir consultant',
    description: 'Lancer et structurer son activité de consultant indépendant',
  },
  {
    slug: 'fonctionnement',
    label: 'Fonctionnement',
    description: 'Comprendre le cadre, les contrats, la paie et les frais',
  },
  {
    slug: 'secteurs',
    label: 'Secteurs IT',
    description: 'Le portage salarial pour les profils IT, tech et conseil',
  },
  {
    slug: 'actualites',
    label: 'Actualités',
    description: 'Ressources et contenus historiques à conserver',
  },
];

export const getBlogCategory = (slug: BlogCategory | string) =>
  blogCategories.find((category) => category.slug === slug);

type BlogSeed = Omit<BlogPost, 'content'> & {
  intro: string;
  sections: { title: string; body: string }[];
};

const makeContent = (post: BlogSeed) => `
<p>${post.intro}</p>
${post.sections
  .map(
    (section) => `<h2>${section.title}</h2>
<p>${section.body}</p>`,
  )
  .join('\n')}
${post.expertiseHref ? `<p><a href="${post.expertiseHref}">Découvrir la page expertise associée</a></p>` : ''}
${post.faq?.length ? `<h2>Questions fréquentes</h2>
${post.faq.map((item) => `<h3>${item.question}</h3><p>${item.answer}</p>`).join('\n')}` : ''}
<h2>Passer à l'étape suivante</h2>
<p>Pour appliquer ces principes à votre situation, utilisez le simulateur The Porters ou demandez un rendez-vous avec un conseiller. Les chiffres exacts, les frais et les conditions d'accompagnement sont toujours à valider selon votre mission.</p>`;

const posts: BlogSeed[] = [
  {
    slug: 'secteurs-adaptes-portage-salarial',
    title: "Les secteurs d'activité les plus adaptés au portage salarial",
    excerpt:
      "Informatique, data, cybersécurité, cloud, conseil et ingénierie : les métiers de prestation intellectuelle sont les plus compatibles avec le portage salarial.",
    intro:
      "Le portage salarial s'adresse avant tout aux professionnels qui vendent une expertise intellectuelle. Les contenus historiques The Porters placent l'informatique, le digital, le conseil et l'ingénierie parmi les secteurs les plus naturels.",
    sections: [
      {
        title: 'Pourquoi les métiers IT sont particulièrement adaptés',
        body:
          "Développeurs, consultants cybersécurité, DevOps, cloud engineers, data engineers, experts IA, Product Owners et chefs de projet IT travaillent souvent en mission, avec un TJM négocié et un besoin de cadre contractuel fiable. Le portage permet de garder cette autonomie sans créer immédiatement une structure.",
      },
      {
        title: 'Les autres secteurs compatibles',
        body:
          "Le conseil en management, l'ingénierie, la formation, le marketing digital et les fonctions expertes peuvent aussi entrer dans le cadre du portage salarial lorsqu'il s'agit de prestations intellectuelles.",
      },
    ],
    publishedAt: '2024-10-08',
    readingTime: 6,
    featured: true,
    category: 'secteurs',
    seo: {
      title: "Secteurs adaptés au portage salarial — IT, data, cloud",
      description:
        "Découvrez les secteurs adaptés au portage salarial, avec un focus sur les consultants IT, data, cloud, cyber, DevOps et conseil.",
    },
  },
  {
    slug: 'optimiser-remuneration-portage-salarial',
    title: 'Comment optimiser sa rémunération en portage salarial ?',
    excerpt:
      'TJM, jours facturés, frais professionnels et accompagnement : les leviers à suivre pour mieux piloter votre rémunération nette.',
    intro:
      "Optimiser sa rémunération en portage salarial commence par une lecture claire du chiffre d'affaires facturé, des frais professionnels, des charges et du rythme de mission.",
    sections: [
      {
        title: 'Travailler son TJM avec méthode',
        body:
          "Votre TJM doit refléter votre expertise, votre rareté sur le marché et la valeur livrée au client. C'est particulièrement vrai pour les profils cyber, data, DevOps, cloud et pilotage IT, où l'expérience et le niveau de responsabilité changent fortement le prix de mission.",
      },
      {
        title: 'Documenter ses frais professionnels',
        body:
          "Matériel informatique, logiciels, déplacements, repas, téléphonie ou abonnements peuvent entrer dans la discussion lorsqu'ils sont liés à l'activité et justifiés. The Porters doit valider les modalités exactes selon votre situation.",
      },
    ],
    publishedAt: '2024-09-05',
    readingTime: 7,
    featured: true,
    category: 'fonctionnement',
    seo: {
      title: 'Optimiser sa rémunération en portage salarial — The Porters',
      description:
        'Guide pour optimiser son salaire en portage salarial : TJM, frais professionnels, jours facturés et simulation de revenus.',
    },
  },
  {
    slug: 'role-charge-de-compte-portage-salarial',
    title: 'Le rôle du chargé de compte en portage salarial',
    excerpt:
      "Le chargé de compte est le point d'appui du consultant porté : administratif, facturation, paie, questions de mission et suivi au quotidien.",
    intro:
      "Le chargé de compte donne un visage concret à l'accompagnement. Pour un consultant indépendant, il évite de naviguer seul entre contrats, factures, frais et paie.",
    sections: [
      {
        title: 'Un interlocuteur pour fluidifier la mission',
        body:
          "L'objectif est de limiter les ruptures d'information : cadrage administratif, suivi de facturation, lecture des éléments de paie et réponse aux questions pratiques.",
      },
      {
        title: 'Un soutien sans promesse excessive',
        body:
          "L'accompagnement peut aider au positionnement et aux bonnes pratiques de prospection, mais il ne doit pas être présenté comme une garantie de missions tant que le client ne l'a pas confirmé.",
      },
    ],
    publishedAt: '2024-08-01',
    readingTime: 5,
    featured: true,
    category: 'fonctionnement',
    seo: {
      title: 'Chargé de compte en portage salarial — rôle et accompagnement',
      description:
        "Comprendre le rôle du chargé de compte The Porters dans l'accompagnement administratif, paie et mission du consultant porté.",
    },
  },
  {
    slug: 'portage-salarial-international',
    title: "Portage salarial et international : travailler à l'étranger",
    excerpt:
      "Sécurité contractuelle, protection sociale et gestion administrative : les points à vérifier avant une mission internationale en portage.",
    intro:
      "Les missions internationales attirent de nombreux consultants indépendants, mais elles demandent un cadrage précis des contrats, des règles sociales et des obligations administratives.",
    sections: [
      {
        title: 'Sécuriser le cadre avant de partir',
        body:
          "Avant d'accepter une mission à l'étranger, il faut clarifier le pays d'exécution, la durée, la facturation, les frais, les assurances et les contraintes fiscales éventuelles.",
      },
      {
        title: 'Pourquoi le portage peut aider',
        body:
          "Le portage apporte une structure pour contractualiser et transformer le chiffre d'affaires en salaire. Les conditions exactes dépendent toutefois du pays, de la mission et du cadre applicable.",
      },
    ],
    publishedAt: '2024-07-08',
    readingTime: 6,
    featured: false,
    category: 'fonctionnement',
    seo: {
      title: 'Portage salarial international — travailler à l’étranger',
      description:
        'Points clés pour travailler à l’étranger en portage salarial : contrat, protection sociale, frais et sécurité administrative.',
    },
  },
  {
    slug: 'portage-salarial-entreprises',
    title: 'Portage salarial pour les entreprises',
    excerpt:
      'Un cadre simple pour mobiliser des consultants experts sans embauche directe, notamment sur des besoins IT, data, cloud, cyber et transformation.',
    intro:
      "Pour une entreprise, le portage salarial permet de travailler avec un consultant indépendant dans un cadre contractuel structuré, sans porter directement le contrat de travail.",
    sections: [
      {
        title: 'Mobiliser une expertise ciblée',
        body:
          "Les besoins en cybersécurité, data, IA, DevOps, cloud, Product Ownership ou chefferie de projet IT évoluent vite. Le portage facilite l'intervention d'un expert sur un périmètre défini.",
      },
      {
        title: 'Simplifier la relation contractuelle',
        body:
          "L'entreprise cliente signe la prestation avec The Porters. Le consultant reste salarié porté, ce qui clarifie le cadre administratif, la facturation et les responsabilités.",
      },
    ],
    publishedAt: '2024-05-28',
    readingTime: 5,
    featured: false,
    category: 'fonctionnement',
    seo: {
      title: 'Portage salarial pour entreprises — consultants IT externes',
      description:
        'Pourquoi et comment travailler avec un consultant en portage salarial pour vos missions IT, data, cloud, cyber et conseil.',
    },
  },
  {
    slug: 'portage-salarial-solution-flexible',
    title: 'Le portage salarial, une solution flexible',
    excerpt:
      "Un statut pour exercer en indépendant avec un contrat salarié, une paie structurée et une gestion administrative déléguée.",
    intro:
      "Le portage salarial répond à un besoin simple : travailler librement, choisir ses missions et conserver un cadre social protecteur.",
    sections: [
      {
        title: 'La liberté d’un indépendant',
        body:
          "Le consultant garde la main sur son expertise, ses clients, son TJM et son organisation. Cette autonomie est centrale pour les profils expérimentés.",
      },
      {
        title: 'La sécurité d’un salarié',
        body:
          "The Porters gère les contrats, la facturation, les bulletins de paie et les déclarations afin de transformer l'activité en salaire.",
      },
    ],
    publishedAt: '2024-05-17',
    readingTime: 5,
    featured: false,
    category: 'fonctionnement',
    seo: {
      title: 'Portage salarial flexible — autonomie et sécurité',
      description:
        "Comprendre pourquoi le portage salarial combine liberté d'indépendant et sécurité du salariat.",
    },
  },
  {
    slug: 'guide-portage-salarial',
    title: 'Définition du portage salarial : le guide simplifié',
    excerpt:
      "Comprendre le portage salarial, la relation tripartite, le contrat de travail et la transformation du chiffre d'affaires en salaire.",
    intro:
      "Le portage salarial est un cadre d'emploi qui relie un consultant, une entreprise cliente et une société de portage. Il permet d'exercer une activité autonome sans créer sa propre société.",
    sections: [
      {
        title: 'Les trois acteurs',
        body:
          "Le consultant réalise la mission, l'entreprise cliente achète la prestation, et The Porters porte le contrat de travail, la paie, la facturation et le suivi administratif.",
      },
      {
        title: 'Ce que le portage ne remplace pas',
        body:
          "Le portage ne remplace pas votre positionnement commercial. Vous devez rester acteur de votre réseau, de vos offres et de votre négociation de mission.",
      },
    ],
    publishedAt: '2023-12-07',
    readingTime: 6,
    featured: false,
    category: 'fonctionnement',
    seo: {
      title: 'Définition du portage salarial — guide The Porters',
      description:
        'Guide simple pour comprendre le portage salarial, son fonctionnement, les contrats et le statut du salarié porté.',
    },
  },
  {
    slug: 'trouver-missions-portage-salarial',
    title: 'Trouver des missions en portage salarial',
    excerpt:
      'Positionnement, réseau, plateformes, prospection et accompagnement : une méthode claire pour trouver des missions sans promesse magique.',
    intro:
      "Trouver des missions reste une responsabilité clé du consultant porté. L'intérêt d'une société de portage est d'aider à cadrer et sécuriser l'activité, pas de promettre des missions garanties.",
    sections: [
      {
        title: 'Clarifier son offre',
        body:
          "Un profil IT doit être lisible : DevOps Kubernetes, RSSI freelance, data engineer cloud, PO SaaS, Scrum Master ou chef de projet ERP ne vendent pas la même promesse.",
      },
      {
        title: 'Activer les bons canaux',
        body:
          "Réseau existant, LinkedIn, plateformes freelance, anciens clients et événements métier restent les canaux les plus concrets. The Porters peut accompagner le positionnement selon les services validés avec le client.",
      },
    ],
    publishedAt: '2023-10-10',
    readingTime: 7,
    featured: false,
    category: 'devenir-consultant',
    seo: {
      title: 'Trouver des missions en portage salarial — consultants IT',
      description:
        'Conseils pour trouver des missions en portage salarial : positionnement, réseau, plateformes, prospection et accompagnement.',
    },
  },
  {
    slug: 'bien-choisir-societe-portage-salarial',
    title: 'Bien choisir sa société de portage salarial',
    excerpt:
      'Transparence, frais, accompagnement, solidité et spécialisation : les critères pour comparer une société de portage.',
    intro:
      "Choisir une société de portage, ce n'est pas seulement comparer un taux. Il faut regarder les services inclus, la clarté de la paie, la qualité du suivi et la capacité à comprendre votre métier.",
    sections: [
      {
        title: 'Comparer ce qui est inclus',
        body:
          "Gestion administrative, facturation, assurance, outils en ligne, suivi dédié, traitement des frais et accompagnement doivent être compris avant de signer.",
      },
      {
        title: 'Chercher une vraie compréhension métier',
        body:
          "Un consultant IT senior attend des réponses précises sur ses frais, son TJM, son rythme de facturation et ses contraintes client. Le portage doit s'adapter à cette réalité.",
      },
    ],
    publishedAt: '2023-03-10',
    readingTime: 6,
    featured: false,
    category: 'devenir-consultant',
    seo: {
      title: 'Choisir sa société de portage salarial — critères clés',
      description:
        'Les critères pour bien choisir sa société de portage salarial : frais, accompagnement, transparence, outils et spécialisation.',
    },
  },
  {
    slug: 'consultant-informatique-independant-galeres',
    title: 'Consultant informatique indépendant : 3 galères récurrentes',
    excerpt:
      'Revenus irréguliers, impayés, solitude administrative : les problèmes qui poussent des consultants IT à envisager le portage.',
    intro:
      "Le consultant informatique indépendant gagne en liberté, mais rencontre souvent les mêmes difficultés : sécuriser le revenu, gérer les retards client et rester seul face à l'administratif.",
    sections: [
      {
        title: 'La trésorerie dépend trop du client',
        body:
          "Une mission IT peut être bien vendue mais payée tard. La question de l'avance de salaire et du calendrier de paie devient alors décisive, sous réserve des conditions validées.",
      },
      {
        title: 'L’administratif prend de la place',
        body:
          "Contrats, factures, relances, frais et paie consomment du temps. Le portage permet de déléguer cette charge pour se concentrer sur la mission.",
      },
    ],
    publishedAt: '2019-12-05',
    readingTime: 5,
    featured: false,
    category: 'secteurs',
    seo: {
      title: 'Consultant informatique indépendant — problèmes et portage',
      description:
        'Les galères fréquentes du consultant informatique indépendant et comment le portage salarial peut sécuriser son activité.',
    },
  },
  {
    slug: 'devenir-freelance-informatique',
    title: 'Devenir freelance informatique',
    excerpt:
      'Passer freelance dans l’IT : autonomie, TJM, missions, statut et intérêt du portage salarial pour démarrer sans structure.',
    intro:
      "Devenir freelance informatique attire les développeurs, DevOps, data engineers, architectes cloud et chefs de projet qui veulent choisir leurs missions.",
    sections: [
      {
        title: 'Préparer son positionnement',
        body:
          "Le passage en freelance exige une offre claire, un TJM cohérent et une capacité à parler résultat client, pas seulement compétences techniques.",
      },
      {
        title: 'Tester l’indépendance avec un cadre salarié',
        body:
          "Le portage salarial peut être une étape utile pour tester le marché, sécuriser la paie et déléguer l'administratif avant de créer une structure.",
      },
    ],
    publishedAt: '2019-11-04',
    readingTime: 6,
    featured: false,
    category: 'secteurs',
    seo: {
      title: 'Devenir freelance informatique avec le portage salarial',
      description:
        'Guide pour devenir freelance informatique : TJM, statut, missions et option portage salarial pour consultants IT.',
    },
  },
  {
    slug: 'portage-salarial-informatique',
    title: 'Portage salarial informatique : la formule sans contraintes',
    excerpt:
      'Le guide dédié aux consultants informatiques qui veulent garder leur autonomie avec une protection salariée.',
    intro:
      "Le portage salarial informatique répond aux attentes des consultants tech qui veulent facturer des missions longues ou récurrentes sans gérer seuls toute la structure juridique.",
    sections: [
      {
        title: 'Pour quels profils ?',
        body:
          "Développeurs, architectes, administrateurs cloud, DevOps, experts cybersécurité, data engineers, consultants ERP, Product Owners et Scrum Masters peuvent y trouver un cadre adapté.",
      },
      {
        title: 'Les points à cadrer',
        body:
          "TJM, frais professionnels, lieu de mission, matériel, rythme de facturation, clause de renouvellement et calendrier de paie doivent être clarifiés dès le départ.",
      },
    ],
    publishedAt: '2019-09-02',
    readingTime: 6,
    featured: false,
    category: 'secteurs',
    seo: {
      title: 'Portage salarial informatique — consultants IT',
      description:
        'Portage salarial pour consultants informatiques : profils concernés, TJM, frais, missions et sécurité salariale.',
    },
  },
  {
    slug: 'frais-gestion-portage-salarial',
    title: 'Frais de gestion en portage salarial',
    excerpt:
      'Comprendre ce que couvrent les frais de gestion et pourquoi la transparence compte plus qu’un simple taux affiché.',
    intro:
      "Les frais de gestion rémunèrent les services de la société de portage. Le taux applicable doit toujours être lu avec le détail des services inclus et confirmé avant la contractualisation.",
    sections: [
      {
        title: 'Ce qui peut être inclus',
        body:
          "Gestion sociale, facturation, déclarations, outils en ligne, suivi administratif, accompagnement et assurance peuvent faire partie des services inclus selon l'offre.",
      },
      {
        title: 'Comparer avec prudence',
        body:
          "Un taux bas n'a de sens que si les services essentiels ne sont pas refacturés ailleurs. Demandez toujours une simulation lisible et une explication de ce qui est inclus.",
      },
    ],
    publishedAt: '2019-10-15',
    readingTime: 5,
    featured: false,
    category: 'fonctionnement',
    seo: {
      title: 'Frais de gestion en portage salarial — comprendre et comparer',
      description:
        'Comprendre les frais de gestion en portage salarial, les services inclus et les points à vérifier avant de choisir.',
    },
  },
  {
    slug: 'contrat-portage-salarial',
    title: 'Contrat de portage salarial : comment ça marche ?',
    excerpt:
      'Contrat de travail, contrat de prestation, convention et responsabilités : comprendre la relation tripartite.',
    intro:
      "Le portage salarial repose sur plusieurs documents qui encadrent la mission, le statut du consultant et la relation avec l'entreprise cliente.",
    sections: [
      {
        title: 'Le contrat de travail',
        body:
          "Le consultant est salarié de la société de portage. Le contrat précise le cadre applicable, les éléments de rémunération et les obligations liées à la mission.",
      },
      {
        title: 'Le contrat de prestation',
        body:
          "L'entreprise cliente contractualise avec The Porters pour la réalisation de la mission. Le périmètre, la durée, le tarif et les conditions d'exécution doivent être définis clairement.",
      },
    ],
    publishedAt: '2019-09-02',
    readingTime: 6,
    featured: false,
    category: 'fonctionnement',
    seo: {
      title: 'Contrat de portage salarial — relation tripartite',
      description:
        'Comprendre le contrat de portage salarial, le contrat de prestation et les responsabilités du consultant porté.',
    },
  },
  {
    slug: 'choisir-statut-independant',
    title: 'Comment choisir son statut d’indépendant ?',
    excerpt:
      'Micro-entreprise, SASU, EURL ou portage salarial : les critères pour choisir un statut adapté à son activité.',
    intro:
      "Le bon statut dépend de votre chiffre d'affaires, de votre besoin de protection sociale, de votre tolérance administrative et de votre trajectoire.",
    sections: [
      {
        title: 'Comparer les niveaux de complexité',
        body:
          "Micro-entreprise, SASU et EURL supposent de gérer une structure ou un plafond. Le portage salarial réduit la charge administrative, mais implique des frais de gestion.",
      },
      {
        title: 'Penser à la protection sociale',
        body:
          "Pour certains consultants IT, la continuité des droits salariés, la paie et l'assurance chômage peuvent peser autant que l'optimisation purement juridique.",
      },
    ],
    publishedAt: '2019-12-05',
    readingTime: 6,
    featured: false,
    category: 'devenir-consultant',
    seo: {
      title: 'Choisir son statut indépendant — portage, SASU, EURL',
      description:
        'Comparer les statuts indépendants et comprendre quand le portage salarial peut être pertinent.',
    },
  },
  {
    slug: 'portage-salarial-consultant-cybersecurite',
    title: 'Portage salarial pour consultant cybersécurité',
    excerpt: 'RSSI, GRC, SOC, pentest ou sécurité cloud : comment cadrer une mission cyber en portage salarial sans perdre son autonomie.',
    intro: 'Les consultants cybersécurité interviennent sur des sujets sensibles où le périmètre, les responsabilités et la confidentialité doivent être explicités. Le portage salarial fournit un cadre contractuel et social sans se substituer à l’expertise du consultant.',
    sections: [
      { title: 'Des missions à forte responsabilité', body: 'Audit, analyse de risques, gouvernance, SOC, pentest, cloud security ou gestion d’incident impliquent des accès, des livrables et des obligations qui doivent être définis avant le démarrage.' },
      { title: 'Ce que le portage prend en charge', body: 'La société de portage encadre la relation contractuelle avec le client, la facturation, les déclarations sociales et la paie. Le consultant garde la responsabilité opérationnelle de son intervention.' },
      { title: 'Les points à cadrer', body: 'TJM, durée, astreintes éventuelles, habilitations, confidentialité, responsabilités, assurance et frais de déplacement doivent apparaître dans les échanges préparatoires.' },
    ],
    faq: [
      { question: 'Un RSSI freelance peut-il travailler en portage salarial ?', answer: 'Oui, lorsque la mission relève d’une prestation intellectuelle autonome et que les conditions d’éligibilité du portage sont réunies.' },
      { question: 'Le portage couvre-t-il la responsabilité technique ?', answer: 'Le cadre contractuel doit préciser les responsabilités et assurances applicables. Il ne dispense jamais le consultant de respecter les règles de sécurité et le périmètre convenu.' },
    ],
    expertiseHref: '/expertises/cybersecurite',
    publishedAt: '2026-07-08',
    readingTime: 7,
    featured: true,
    category: 'secteurs',
    seo: { title: 'Portage salarial consultant cybersécurité — The Porters', description: 'Guide du portage salarial pour RSSI, GRC, SOC, pentesters et experts cloud security : missions, contrats, TJM et responsabilités.' },
  },
  {
    slug: 'portage-salarial-consultant-data-ia',
    title: 'Portage salarial pour consultant Data & IA',
    excerpt: 'Data engineering, BI, gouvernance, machine learning et IA : structurer sa mission, son TJM et son cadre contractuel.',
    intro: 'Les missions Data & IA vont du cadrage stratégique à l’industrialisation. Le portage salarial permet à l’expert de rester autonome tout en déléguant les contrats, la facturation et la paie.',
    sections: [
      { title: 'Partir du besoin métier', body: 'Une mission crédible relie les données, les utilisateurs et un résultat attendu : qualité, décision, automatisation, délai, coût ou maîtrise des risques.' },
      { title: 'Cadrer l’accès aux données', body: 'Sources, droits d’accès, sécurité, environnement cloud, propriété des livrables et exigences de gouvernance doivent être clarifiés avant l’intervention.' },
      { title: 'Du prototype à la production', body: 'Un POC ne suffit pas toujours. Les responsabilités d’industrialisation, de documentation, de MLOps et de suivi de performance doivent être nommées.' },
    ],
    faq: [
      { question: 'Quels profils Data & IA utilisent le portage ?', answer: 'Data Analysts, Data Engineers, Data Scientists, ML Engineers, architectes data ou IA, spécialistes BI et consultants en gouvernance peuvent y recourir.' },
      { question: 'Comment définir son TJM Data ou IA ?', answer: 'Le TJM dépend de l’expérience, de la rareté des compétences, de la responsabilité, de la durée et du contexte. Une simulation aide à relier ce TJM au revenu estimé.' },
    ],
    expertiseHref: '/expertises/data-ia',
    publishedAt: '2026-07-08',
    readingTime: 7,
    featured: true,
    category: 'secteurs',
    seo: { title: 'Portage salarial consultant Data & IA — The Porters', description: 'Portage salarial Data et IA : data engineering, BI, gouvernance, machine learning, TJM, contrats et industrialisation.' },
  },
  {
    slug: 'portage-salarial-devops-freelance',
    title: 'Portage salarial pour DevOps freelance',
    excerpt: 'Cloud, CI/CD, infrastructure as code, SRE et plateforme : les points à cadrer pour une mission DevOps en portage salarial.',
    intro: 'Le DevOps freelance intervient au cœur de la chaîne de livraison. Son contrat doit rendre lisibles les responsabilités d’exploitation, les accès, les niveaux de service et les éventuelles astreintes.',
    sections: [
      { title: 'Définir le périmètre technique', body: 'Cloud concerné, environnements, pipelines, infrastructure as code, observabilité, sécurité et documentation doivent être identifiés.' },
      { title: 'Clarifier l’exploitation', body: 'Les horaires, astreintes, procédures d’incident, responsabilités de mise en production et niveaux de service ne doivent pas rester implicites.' },
      { title: 'Conserver son autonomie', body: 'Le consultant choisit et négocie sa mission. The Porters encadre la contractualisation, la facturation et la paie sans diriger la réalisation technique.' },
    ],
    faq: [
      { question: 'Un SRE peut-il être salarié porté ?', answer: 'Oui, si la mission est compatible avec le portage salarial et conserve une autonomie suffisante. Les astreintes et responsabilités doivent être explicitement cadrées.' },
      { question: 'Quels frais DevOps peuvent être pris en compte ?', answer: 'Les frais doivent être professionnels, justifiés et validés. Matériel, logiciels, certifications ou déplacements sont examinés selon la situation.' },
    ],
    expertiseHref: '/expertises/cloud-devops',
    publishedAt: '2026-07-08',
    readingTime: 7,
    featured: true,
    category: 'secteurs',
    seo: { title: 'Portage salarial DevOps freelance — The Porters', description: 'Guide du portage salarial pour DevOps, SRE et cloud engineers : périmètre, astreintes, TJM, frais et contrats.' },
  },
  {
    slug: 'portage-salarial-product-owner-scrum-master',
    title: 'Portage salarial pour Product Owner et Scrum Master',
    excerpt: 'Produit, agilité et transformation : pourquoi le portage salarial convient aux Product Owners, Scrum Masters et Agile Coaches.',
    intro: 'Product Owners et Scrum Masters interviennent souvent sur des transformations limitées dans le temps, avec une forte autonomie de conseil et de facilitation. Le portage salarial donne un cadre à cette activité.',
    sections: [
      { title: 'Deux rôles, deux responsabilités', body: 'Le Product Owner organise la valeur et les priorités du produit. Le Scrum Master facilite le fonctionnement de l’équipe et aide à lever les obstacles.' },
      { title: 'Cadrer les attentes', body: 'Roadmap, backlog, rituels, indicateurs, parties prenantes, périmètre d’équipe et niveau d’autonomie doivent être clarifiés avec le client.' },
      { title: 'Un statut adapté aux missions de transformation', body: 'Le portage permet de tester ou développer une activité indépendante tout en conservant un contrat salarié et une gestion administrative déléguée.' },
    ],
    faq: [
      { question: 'Le portage convient-il à un Agile Coach ?', answer: 'Oui, notamment pour les missions d’accompagnement, de diagnostic ou de transformation dont le périmètre et la durée sont définis.' },
      { question: 'Qui négocie le TJM ?', answer: 'Le consultant reste autonome dans la négociation de son TJM avec le client. The Porters l’aide ensuite à lire l’impact de ce tarif dans la simulation.' },
    ],
    expertiseHref: '/expertises/agilite-coaching',
    publishedAt: '2026-07-08',
    readingTime: 7,
    featured: true,
    category: 'secteurs',
    seo: { title: 'Portage salarial Product Owner et Scrum Master', description: 'Portage salarial pour Product Owners, Scrum Masters et Agile Coaches : missions, autonomie, TJM, contrats et accompagnement.' },
  },
];

export const blogPosts: BlogPost[] = posts.map((post) => ({
  ...post,
  content: makeContent(post),
}));
