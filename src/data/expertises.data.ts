export type Expertise = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  sourceSummary: string;
  introTitle: string;
  introParagraphs: string[];
  roles: string[];
  missionTypes: string[];
  methods: string[];
  methodStages: { number: string; title: string; text: string }[];
  businessValue: { title: string; text: string }[];
  ecosystem?: {
    name: string;
    eyebrow: string;
    text: string;
    pillars: string[];
  };
  sectors: string[];
  support: string[];
  seoDescription: string;
};

export const expertises: Expertise[] = [
  {
    slug: 'cybersecurite',
    eyebrow: 'Cybersécurité',
    title: 'Portage salarial pour experts cybersécurité',
    summary:
      'RSSI, RSSI de transition, responsable cybersécurité, chef de projet ou ingénieur sécurité : exercez votre expertise en autonomie, dans un cadre salarié adapté à la mission.',
    sourceSummary:
      'L’approche présentée par le groupe relie quatre dimensions : comprendre le risque, conseiller les décideurs, vérifier l’existant et piloter la remédiation.',
    introTitle: 'La sécurité exige une mission précisément cadrée',
    introParagraphs: [
      'Gouvernance, audit, risques et conformité, sécurité opérationnelle, sensibilisation des équipes : un projet cyber mobilise rarement une seule compétence. Nous identifions les profils adaptés au niveau de maturité réel de votre organisation — pas au niveau visé.',
      'Une intervention cyber engage des responsabilités techniques, réglementaires et organisationnelles. Le périmètre, les livrables, les habilitations et les conditions d’intervention doivent être explicites dès le départ.',
      'The Porters prend en charge le contrat, la facturation et la paie. Vous restez responsable de l’expertise livrée et de la relation opérationnelle avec le client.',
    ],
    roles: [
      'RSSI et RSSI de transition',
      'Responsable cybersécurité',
      'Chef de projet cybersécurité',
      'Ingénieur cybersécurité',
      'Expert sécurité',
      'Manager cybersécurité',
    ],
    missionTypes: [
      'Évaluation de la gouvernance de la sécurité',
      'Audit organisationnel et technique',
      'Analyse des risques et de la conformité',
      'Conseil stratégique et gouvernance',
      'Assistance technique sur un périmètre défini',
      'Formation et sensibilisation des équipes',
      'Planification et amélioration continue',
      'Cadrage budgétaire et ressources',
    ],
    methods: [
      'Diagnostic du contexte et des actifs critiques',
      'Priorisation des risques et des écarts',
      'Plan d’actions proportionné aux enjeux',
      'Suivi des mesures, du budget et des responsabilités',
    ],
    methodStages: [
      { number: '01', title: 'Diagnostic', text: 'Qualifier les actifs, les usages, la gouvernance et les risques avant de proposer une réponse.' },
      { number: '02', title: 'Conseil & assistance', text: 'Traduire les constats en décisions, en responsabilités et en mesures applicables.' },
      { number: '03', title: 'Audit', text: 'Éprouver l’organisation et les dispositifs techniques, puis documenter les écarts.' },
      { number: '04', title: 'Plan d’actions', text: 'Prioriser la remédiation, les ressources, le budget et l’amélioration continue.' },
    ],
    businessValue: [
      { title: 'Décider sur des risques qualifiés', text: 'Transformer les constats techniques en arbitrages compréhensibles par les équipes métiers et la direction.' },
      { title: 'Rendre la conformité opérationnelle', text: 'Traduire les exigences réglementaires de votre organisation en pratiques et livrables concrets. Nos consultants interviennent sur ces référentiels ; nous n’en détenons pas la certification.' },
      { title: 'Faire progresser la sécurité', text: 'Passer du diagnostic à une feuille de route suivie, avec des priorités, des responsables et des jalons.' },
    ],
    ecosystem: {
      name: 'L’ESN du groupe',
      eyebrow: 'Une expertise du groupe Porters',
      text: 'L’offre cybersécurité du groupe relie diagnostic, gouvernance, audit, conseil et assistance, puis plan d’actions. Approche orientée conseil et engagement de service, sans dissocier la gouvernance de l’exécution.',
      pillars: ['Conseil sur mesure', 'Continuité de service', 'Suivi des consultants'],
    },
    sectors: [], // F-S01 DO_NOT_PUBLISH — secteurs issus de supports tiers
    support: [
      'Cadrage du périmètre, du TJM et du calendrier',
      'Contrat de travail et contrat de prestation',
      'Facturation, paie et frais professionnels validés',
      'Interlocuteur administratif pendant la mission',
    ],
    seoDescription:
      'Portage salarial pour experts cybersécurité : RSSI, gouvernance, audit, analyse de risques, conformité et sensibilisation avec The Porters.',
  },
  {
    slug: 'data-ia',
    eyebrow: 'Data & IA',
    title: 'Portage salarial pour consultants Data & IA',
    summary:
      'Data engineers, data scientists, consultants BI, ML engineers et architectes IA conservent leur autonomie commerciale tout en déléguant le cadre contractuel, la facturation et la paie.',
    sourceSummary:
      'Notre lecture pose une chaîne simple : partir du besoin métier, fiabiliser la donnée, expérimenter avec les utilisateurs, puis déployer et maintenir la solution.',
    introTitle: 'Relier la donnée à un résultat métier mesurable',
    introParagraphs: [
      'Un projet data ou IA échoue rarement sur le modèle. Il échoue sur la qualité des données, l’architecture ou l’industrialisation. Nous mobilisons des profils capables d’intervenir sur ces trois étapes : cadrage, ingénierie, mise en production.',
      'Une mission data ou IA ne se résume pas au choix d’un modèle ou d’un outil. Elle part d’un besoin métier, de données accessibles et gouvernées, puis se poursuit jusqu’au déploiement, au suivi et à l’adoption.',
      'Le portage salarial convient aux experts mobilisés sur une phase précise ou sur un programme plus long, sans leur imposer de créer immédiatement une structure juridique.',
    ],
    roles: [
      'Data Analyst',
      'Data Scientist',
      'Data Engineer',
      'Data Architect',
      'Machine Learning Engineer',
      'AI Architect',
      'Data Governance Specialist',
      'BI Developer',
      'Consultant stratégie IA',
    ],
    missionTypes: [
      'Stratégie data et cadrage de cas d’usage',
      'Data engineering et pipelines',
      'Business intelligence et analytics',
      'Qualité, catalogue et gouvernance des données',
      'Machine learning et industrialisation',
      'Intégration de solutions IA dans les processus',
      'Architecture de plateformes data cloud',
      'MLOps, performance et maintien en conditions opérationnelles',
    ],
    methods: [
      'Clarification du besoin et des indicateurs de valeur',
      'Diagnostic des données, de l’architecture et des usages',
      'Prototypage puis validation avec les utilisateurs',
      'Industrialisation, gouvernance et amélioration continue',
    ],
    methodStages: [
      { number: '01', title: 'Cadrer la valeur', text: 'Relier le cas d’usage à une décision, une automatisation ou un indicateur métier mesurable.' },
      { number: '02', title: 'Fiabiliser la donnée', text: 'Qualifier les sources, les flux, la qualité, la sécurité et les règles de gouvernance.' },
      { number: '03', title: 'Expérimenter', text: 'Prototyper avec les utilisateurs, mesurer la pertinence et documenter les limites.' },
      { number: '04', title: 'Industrialiser', text: 'Déployer, superviser et maintenir la solution pour qu’elle reste utile dans le temps.' },
    ],
    businessValue: [
      { title: 'Mieux décider', text: 'Produire des données fiables et des analyses lisibles pour soutenir les arbitrages opérationnels.' },
      { title: 'Automatiser avec discernement', text: 'Identifier les tâches où l’IA apporte un gain réel, puis mesurer sa qualité et ses limites.' },
      { title: 'Construire pour durer', text: 'Documenter les flux, la gouvernance et les responsabilités afin de pérenniser les solutions au-delà du prototype.' },
    ],
    ecosystem: {
      name: 'L’ESN du groupe',
      eyebrow: 'Une expertise du groupe Porters',
      text: 'Sur la Data, l’IA et le Cloud, le groupe travaille avec une double lecture technique et métier : stratégie, architecture, déploiement et maintien en conditions opérationnelles.',
      pillars: ['Data utile à la décision', 'IA intégrée aux usages', 'Solutions durables'],
    },
    sectors: [], // F-S01 DO_NOT_PUBLISH — secteurs issus de supports tiers
    support: [
      'Lecture du TJM, de la durée et des conditions de mission',
      'Cadre contractuel avec l’entreprise cliente',
      'Facturation, paie et suivi des frais validés',
      'Point de contact administratif pendant l’intervention',
    ],
    seoDescription:
      'Portage salarial pour consultants Data & IA : stratégie data, engineering, BI, gouvernance, machine learning, IA et plateformes cloud.',
  },
  {
    slug: 'cloud-devops',
    eyebrow: 'Cloud & DevOps',
    title: 'Portage salarial pour consultants Cloud & DevOps',
    summary:
      'Architectes cloud, DevOps engineers, SRE, platform engineers et spécialistes cloud security : sécurisez le cadre de votre mission tout en gardant la maîtrise technique de l’intervention.',
    sourceSummary:
      'Dans les supports du groupe, le Cloud est traité comme une trajectoire complète : choix de la cible, intégration progressive, automatisation, sécurité et performance durable.',
    introTitle: 'Accélérer les livraisons sans fragiliser la plateforme',
    introParagraphs: [
      'Architecture, migration, CI/CD, Infrastructure as Code, conteneurisation, observabilité, sécurité des environnements. Nos consultants interviennent sur des socles récents comme sur des environnements historiques encore critiques pour la production.',
      'Les missions cloud et DevOps touchent à la disponibilité, à la sécurité, aux coûts et à la vitesse de livraison. Elles demandent un périmètre clair et des responsabilités explicites entre les équipes.',
      'The Porters structure la relation contractuelle et administrative ; le consultant conserve son autonomie d’exécution et son rôle de conseil auprès du client.',
    ],
    roles: ['Cloud Architect', 'Cloud Engineer', 'Cloud Operations Manager', 'Cloud Consultant', 'DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer', 'Cloud Security Specialist', 'FinOps Consultant', 'Release Manager'],
    missionTypes: [
      'Architecture et trajectoire cloud',
      'Migration et modernisation des applications',
      'CI/CD et automatisation des déploiements',
      'Infrastructure as Code',
      'Conteneurisation et orchestration',
      'Observabilité, SRE et gestion de la performance',
      'Sécurité des infrastructures cloud',
      'Optimisation des usages et des coûts',
    ],
    methods: [
      'Évaluer l’existant, les contraintes et les niveaux de service',
      'Définir une cible et une trajectoire progressive',
      'Automatiser les environnements, tests et déploiements',
      'Mesurer la fiabilité, la performance, la sécurité et les coûts',
    ],
    methodStages: [
      { number: '01', title: 'Évaluer', text: 'Lire l’existant, les dépendances, les contraintes de sécurité et les niveaux de service.' },
      { number: '02', title: 'Concevoir', text: 'Définir une architecture cible et une trajectoire compatible avec l’activité.' },
      { number: '03', title: 'Automatiser', text: 'Industrialiser les environnements, les contrôles et les déploiements.' },
      { number: '04', title: 'Opérer', text: 'Suivre disponibilité, performance, sécurité, résilience et maîtrise des coûts.' },
    ],
    businessValue: [
      { title: 'Livraisons plus fiables', text: 'Réduire les manipulations manuelles et rendre les déploiements reproductibles.' },
      { title: 'Plateforme observable', text: 'Donner aux équipes les signaux nécessaires pour comprendre les incidents et la performance.' },
      { title: 'Cloud gouverné', text: 'Concilier autonomie des équipes, sécurité, maîtrise des coûts et exigences d’exploitation.' },
    ],
    ecosystem: {
      name: 'L’ESN du groupe',
      eyebrow: 'Une expertise du groupe Porters',
      text: 'Notre approche Cloud associe conseil, intégration flexible et optimisation des infrastructures, afin de soutenir une transformation réellement exploitable.',
      pillars: ['Architecture adaptée', 'Intégration progressive', 'Performance suivie'],
    },
    sectors: [], // F-S01 DO_NOT_PUBLISH — secteurs issus de supports tiers
    support: ['Cadrage contractuel de la mission', 'Lecture du TJM et des frais liés à l’intervention', 'Facturation et paie', 'Suivi administratif du démarrage à la clôture'],
    seoDescription:
      'Portage salarial Cloud et DevOps : architecture cloud, migration, CI/CD, IaC, SRE, platform engineering, FinOps et cloud security.',
  },
  {
    slug: 'developpement-integration',
    eyebrow: 'Développement & intégration',
    title: 'Développement, intégration et environnements applicatifs',
    summary:
      'Développeurs, architectes, intégrateurs, testeurs et responsables applicatifs interviennent sur un périmètre défini, des applications récentes aux socles historiques critiques.',
    sourceSummary:
      'Le mémoire technique du groupe documente une continuité complète : qualifier l’existant, concevoir ou faire évoluer, intégrer et tester, puis maintenir et transmettre sans rompre le service.',
    introTitle: 'Faire évoluer le système sans perdre la maîtrise de l’existant',
    introParagraphs: [
      'Une application ne vit jamais seule. Elle dépend de données, d’interfaces, d’habilitations, d’environnements d’exploitation et de pratiques métier parfois anciennes. Le cadrage commence donc par le contexte réel, les dépendances et le niveau de service attendu.',
      'Le périmètre peut couvrir une réalisation nouvelle, l’intégration d’une solution, la maintenance évolutive ou la modernisation progressive d’un socle critique. Les environnements historiques, dont IBM i / AS400, sont traités comme des actifs de production à comprendre avant de les transformer.',
      'The Porters structure le cadre contractuel et administratif de la mission. L’expert conserve la responsabilité de ses choix techniques, de ses livrables et de la relation opérationnelle avec les équipes du client.',
    ],
    roles: [
      'Architecte applicatif',
      'Lead Developer',
      'Développeur Full Stack',
      'Intégrateur applicatif',
      'Analyste-programmeur IBM i / AS400',
      'Ingénieur tests et recette',
      'Responsable applicatif',
      'Ingénieur exploitation',
      'Business Analyst',
      'Chef de projet technique',
    ],
    missionTypes: [
      'Conception et développement applicatif',
      'Architecture, interfaces et intégration de solutions',
      'Analyse et évolution d’applications IBM i / AS400',
      'Maintenance corrective et évolutive',
      'Tests, recette et sécurisation des mises en production',
      'Modernisation progressive d’un socle existant',
      'Documentation et transfert de connaissances',
      'Maintien en conditions opérationnelles',
    ],
    methods: [
      'Cartographie de l’existant, des dépendances et des accès',
      'Conception proportionnée au périmètre et à la criticité',
      'Intégration, tests et recette avec des critères explicites',
      'Documentation, réversibilité et transfert de connaissances',
    ],
    methodStages: [
      { number: '01', title: 'Comprendre', text: 'Qualifier les usages, les dépendances, les interfaces, les habilitations et les contraintes d’exploitation.' },
      { number: '02', title: 'Concevoir', text: 'Définir une évolution compatible avec l’architecture, la sécurité, la continuité et les pratiques des équipes.' },
      { number: '03', title: 'Intégrer & tester', text: 'Assembler, contrôler et recetter avec des critères de sortie lisibles avant la mise en production.' },
      { number: '04', title: 'Maintenir & transmettre', text: 'Stabiliser, documenter et transférer les connaissances afin que la solution reste exploitable dans le temps.' },
    ],
    businessValue: [
      { title: 'Continuité préservée', text: 'Faire évoluer les applications sans traiter l’historique comme une boîte noire ni fragiliser la production.' },
      { title: 'Intégration maîtrisée', text: 'Rendre explicites les interfaces, les responsabilités, les tests et les conditions de mise en service.' },
      { title: 'Connaissance transmissible', text: 'Laisser une documentation, des décisions et des repères exploitables par les équipes après la mission.' },
    ],
    sectors: [], // F-S01 DO_NOT_PUBLISH — secteurs issus de supports tiers
    support: [
      'Cadrage du périmètre, du TJM et du calendrier',
      'Contrat de travail et contrat de prestation',
      'Facturation, paie et frais professionnels validés',
      'Suivi administratif du démarrage à la clôture',
    ],
    seoDescription:
      'Développement et intégration IT : architecture applicative, modernisation, IBM i et AS400, tests, maintenance et transfert de connaissances avec The Porters.',
  },
  {
    slug: 'agilite-coaching',
    eyebrow: 'Agilité, produit & transformation',
    title: 'Portage salarial pour profils Agilité, Produit et Transformation',
    summary:
      'Product Owners, Scrum Masters, Agile Coaches, RTE, Business Analysts et Change Managers interviennent avec autonomie, dans un cadre salarié adapté aux missions de transformation.',
    sourceSummary:
      'Les dossiers Agilité du groupe ne réduisent pas le sujet à Scrum : ils relient les rôles, les méthodes et les boucles de feedback à un objectif commun, livrer de la valeur sans figer l’organisation.',
    introTitle: 'L’agilité sert la valeur, pas les rituels',
    introParagraphs: [
      'Product Owner, Scrum Master, Agile Coach, Business Analyst, Release Train Engineer, architecte. L’agilité n’est pas un objectif en soi : c’est une manière de coordonner. Nos consultants s’alignent sur vos processus existants plutôt que d’imposer un cadre.',
      'Une démarche agile organise le travail en cycles courts, rend les priorités visibles et intègre régulièrement les retours des utilisateurs. Elle doit rester adaptée au contexte, à la maturité des équipes et aux objectifs du produit.',
      'Ces missions se prêtent au portage salarial : elles mobilisent souvent une expertise expérimentée, sur une période définie, avec un besoin fort d’indépendance et de responsabilité.',
    ],
    roles: ['Product Owner', 'Scrum Master', 'Agile Coach', 'Change Manager', 'Release Train Engineer (RTE)', 'Business Analyst', 'Chef de projet agile', 'Programme Manager', 'UX/UI Designer Agile', 'Architecte Agile', 'Coordinateur technique', 'DSI / RSSI de transition', 'DevOps', 'Développeur agile'],
    missionTypes: [
      'Transformation agile et diagnostic de maturité',
      'Coaching d’équipe et accompagnement des managers',
      'Vision produit, roadmap et priorisation du backlog',
      'Conduite du changement et communication',
      'Coordination multi-équipes et Agile Release Train',
      'Analyse métier et formalisation des besoins',
      'Pilotage de projet ou de programme',
      'Conception centrée utilisateur et tests continus',
    ],
    methods: ['Scrum', 'Kanban', 'Extreme Programming (XP)', 'Lean', 'SAFe', 'Design Thinking'],
    methodStages: [
      { number: '01', title: 'Observer', text: 'Comprendre le produit, les parties prenantes, les flux et les points de friction réels.' },
      { number: '02', title: 'Prioriser', text: 'Rendre visibles les objectifs, le backlog, les dépendances et les responsabilités.' },
      { number: '03', title: 'Itérer', text: 'Travailler en cycles courts, produire un résultat testable et intégrer les retours.' },
      { number: '04', title: 'Améliorer', text: 'Mesurer la progression, traiter les blocages et transmettre les pratiques aux équipes.' },
    ],
    businessValue: [
      { title: 'Priorités partagées', text: 'Relier la roadmap, le backlog et les décisions quotidiennes à des objectifs compréhensibles.' },
      { title: 'Boucles de retour courtes', text: 'Tester, apprendre et ajuster avant que les écarts ne deviennent coûteux.' },
      { title: 'Transformation accompagnée', text: 'Faire évoluer l’organisation avec les équipes, en traitant les résistances et les dépendances.' },
    ],
    sectors: [], // F-S01 DO_NOT_PUBLISH — secteurs issus de supports tiers
    support: ['Comparaison des statuts', 'Cadrage du périmètre, du TJM et du calendrier', 'Contrat, facturation et paie', 'Suivi administratif pendant la mission'],
    seoDescription:
      'Portage salarial pour Product Owners, Scrum Masters, Agile Coaches, RTE, Business Analysts, Change Managers et chefs de projet transformation.',
  },
  {
    slug: 'product-project-management',
    eyebrow: 'Product & Project Management',
    title: 'Portage salarial pour consultants Product & Project Management',
    summary:
      'Cadrez vos missions de pilotage produit, projet ou programme avec un statut salarié, tout en conservant votre autonomie de conseil et votre relation client.',
    sourceSummary:
      'Le mémoire technique du groupe formalise un cycle de delivery lisible : cadrage, exécution proportionnée, recette, puis capitalisation et transfert de connaissances.',
    introTitle: 'Donner une direction claire aux projets complexes',
    introParagraphs: [
      'Les profils produit et projet relient la stratégie, les besoins métiers, les équipes techniques et les contraintes de delivery. Leur valeur tient autant à la décision qu’à la coordination et à la qualité du suivi.',
      'Le portage salarial permet d’intervenir sur une transformation, un lancement produit ou un programme critique sans créer immédiatement sa propre société.',
    ],
    roles: ['Product Manager', 'Product Owner', 'Chef de projet IT', 'Directeur de programme', 'PMO', 'Business Analyst', 'Delivery Manager', 'Change Manager'],
    missionTypes: ['Vision et stratégie produit', 'Cadrage et priorisation', 'Pilotage de projet IT', 'Gouvernance de programme', 'PMO et reporting traçable', 'Coordination métier / IT', 'Gestion des risques, dépendances et habilitations', 'Recette, clôture et transfert de connaissances', 'Conduite du changement'],
    methods: ['Discovery produit', 'Roadmap et backlog', 'Cycle en V, agile ou hybride', 'Comitologie proportionnée', 'Reporting et indicateurs', 'Capitalisation et transfert de connaissances'],
    methodStages: [
      { number: '01', title: 'Cadrage', text: 'Clarifier contexte, périmètre, livrables, contraintes, dépendances, accès, sécurité et conformité.' },
      { number: '02', title: 'Exécution', text: 'Tracer actions et livrables, arbitrer les priorités et rendre les risques visibles sans surcharger le projet.' },
      { number: '03', title: 'Recette', text: 'Valider le résultat avec des critères explicites, documenter les écarts et sécuriser la clôture des accès.' },
      { number: '04', title: 'Capitalisation', text: 'Documenter les décisions, restituer les éléments utiles et transférer les connaissances pour préserver la continuité.' },
    ],
    businessValue: [
      { title: 'Décisions explicites', text: 'Clarifier les arbitrages, les responsabilités et les critères de réussite.' },
      { title: 'Exécution maîtrisée', text: 'Suivre les jalons, les risques, les dépendances et les livrables sans alourdir le projet.' },
      { title: 'Continuité', text: 'Documenter les décisions et organiser le transfert de connaissances pour sécuriser la durée.' },
    ],
    sectors: [], // F-S01 DO_NOT_PUBLISH — secteurs issus de supports tiers
    support: ['Cadrage du TJM et du périmètre', 'Contrats et facturation', 'Paie et frais professionnels validés', 'Interlocuteur administratif pendant la mission'],
    seoDescription:
      'Portage salarial pour Product Managers, Product Owners, PMO, chefs de projet IT, Business Analysts et directeurs de programme.',
  },
];
