export type Expertise = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  introTitle: string;
  introParagraphs: string[];
  roles: string[];
  missionTypes: string[];
  methods: string[];
  businessValue: { title: string; text: string }[];
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
      'RSSI, consultant GRC, analyste SOC, pentester ou spécialiste cloud security : exercez votre expertise en autonomie, avec un cadre contractuel et salarié adapté à la mission.',
    introTitle: 'La sécurité exige une mission précisément cadrée',
    introParagraphs: [
      'Une intervention cyber engage des responsabilités techniques, réglementaires et organisationnelles. Le périmètre, les livrables, les habilitations et les conditions d’intervention doivent être explicites dès le départ.',
      'The Porters prend en charge le contrat, la facturation et la paie. Vous restez responsable de l’expertise livrée et de la relation opérationnelle avec le client.',
    ],
    roles: [
      'RSSI et RSSI de transition',
      'Consultant GRC',
      'Ingénieur cybersécurité',
      'Analyste SOC / SIEM',
      'Pentester',
      'Cloud Security Specialist',
      'Chef de projet sécurité',
      'Expert sécurité',
    ],
    missionTypes: [
      'Audit et diagnostic de sécurité',
      'Analyse de risques et conformité',
      'Gouvernance et feuille de route SSI',
      'SOC, détection et réponse à incident',
      'Tests d’intrusion et gestion des vulnérabilités',
      'Sécurité des environnements cloud',
      'Sensibilisation et formation des équipes',
      'Déploiement de solutions de protection',
    ],
    methods: [
      'Diagnostic du contexte et des actifs critiques',
      'Priorisation des risques et des écarts',
      'Plan d’actions proportionné aux enjeux',
      'Suivi des mesures, du budget et des responsabilités',
    ],
    businessValue: [
      { title: 'Décider sur des risques qualifiés', text: 'Transformer les constats techniques en arbitrages compréhensibles par les équipes métiers et la direction.' },
      { title: 'Rendre la conformité opérationnelle', text: 'Relier les exigences RGPD, ISO 27001 ou sectorielles aux pratiques et livrables réellement concernés.' },
      { title: 'Faire progresser la sécurité', text: 'Passer du diagnostic à une feuille de route suivie, avec des priorités, des responsables et des jalons.' },
    ],
    sectors: ['Finance et assurance', 'Industrie', 'Aéronautique', 'Énergie', 'Santé', 'Services numériques', 'Secteur public'],
    support: [
      'Cadrage du périmètre, du TJM et du calendrier',
      'Contrat de travail et contrat de prestation',
      'Facturation, paie et frais professionnels validés',
      'Interlocuteur administratif pendant la mission',
    ],
    seoDescription:
      'Portage salarial pour experts cybersécurité : RSSI, GRC, SOC, pentest, sécurité cloud, audit et gestion des risques avec The Porters.',
  },
  {
    slug: 'data-ia',
    eyebrow: 'Data & IA',
    title: 'Portage salarial pour consultants Data & IA',
    summary:
      'Data engineers, data scientists, consultants BI, ML engineers et architectes IA conservent leur autonomie commerciale tout en déléguant le cadre contractuel, la facturation et la paie.',
    introTitle: 'Relier la donnée à un résultat métier mesurable',
    introParagraphs: [
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
    businessValue: [
      { title: 'Mieux décider', text: 'Produire des données fiables et des analyses lisibles pour soutenir les arbitrages opérationnels.' },
      { title: 'Automatiser avec discernement', text: 'Identifier les tâches où l’IA apporte un gain réel, puis mesurer sa qualité et ses limites.' },
      { title: 'Construire pour durer', text: 'Documenter les flux, la gouvernance et les responsabilités afin de pérenniser les solutions au-delà du prototype.' },
    ],
    sectors: ['Télécommunications', 'Énergie', 'Finance', 'Assurance', 'Automobile', 'Aéronautique', 'Santé', 'Retail', 'Industrie'],
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
    introTitle: 'Accélérer les livraisons sans fragiliser la plateforme',
    introParagraphs: [
      'Les missions cloud et DevOps touchent à la disponibilité, à la sécurité, aux coûts et à la vitesse de livraison. Elles demandent un périmètre clair et des responsabilités explicites entre les équipes.',
      'The Porters structure la relation contractuelle et administrative ; le consultant conserve son autonomie d’exécution et son rôle de conseil auprès du client.',
    ],
    roles: ['Cloud Architect', 'Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer', 'Cloud Security Specialist', 'FinOps Consultant', 'Release Manager'],
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
    businessValue: [
      { title: 'Livraisons plus fiables', text: 'Réduire les manipulations manuelles et rendre les déploiements reproductibles.' },
      { title: 'Plateforme observable', text: 'Donner aux équipes les signaux nécessaires pour comprendre les incidents et la performance.' },
      { title: 'Cloud gouverné', text: 'Concilier autonomie des équipes, sécurité, maîtrise des coûts et exigences d’exploitation.' },
    ],
    sectors: ['Télécommunications', 'Énergie', 'Finance', 'Assurance', 'Industrie', 'Aéronautique', 'Santé', 'Services numériques'],
    support: ['Cadrage contractuel de la mission', 'Lecture du TJM et des frais liés à l’intervention', 'Facturation et paie', 'Suivi administratif du démarrage à la clôture'],
    seoDescription:
      'Portage salarial Cloud et DevOps : architecture cloud, migration, CI/CD, IaC, SRE, platform engineering, FinOps et cloud security.',
  },
  {
    slug: 'agilite-coaching',
    eyebrow: 'Agilité, produit & transformation',
    title: 'Portage salarial pour profils Agilité, Produit et Transformation',
    summary:
      'Product Owners, Scrum Masters, Agile Coaches, RTE, Business Analysts et Change Managers interviennent avec autonomie, dans un cadre salarié adapté aux missions de transformation.',
    introTitle: 'L’agilité sert la valeur, pas les rituels',
    introParagraphs: [
      'Une démarche agile organise le travail en cycles courts, rend les priorités visibles et intègre régulièrement les retours des utilisateurs. Elle doit rester adaptée au contexte, à la maturité des équipes et aux objectifs du produit.',
      'Ces missions se prêtent au portage salarial : elles mobilisent souvent une expertise expérimentée, sur une période définie, avec un besoin fort d’indépendance et de responsabilité.',
    ],
    roles: ['Product Owner', 'Scrum Master', 'Agile Coach', 'Change Manager', 'Release Train Engineer (RTE)', 'Business Analyst', 'Chef de projet agile', 'Programme Manager', 'UX/UI Designer Agile', 'Architecte Agile'],
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
    businessValue: [
      { title: 'Priorités partagées', text: 'Relier la roadmap, le backlog et les décisions quotidiennes à des objectifs compréhensibles.' },
      { title: 'Boucles de retour courtes', text: 'Tester, apprendre et ajuster avant que les écarts ne deviennent coûteux.' },
      { title: 'Transformation accompagnée', text: 'Faire évoluer l’organisation avec les équipes, en traitant les résistances et les dépendances.' },
    ],
    sectors: ['Banque et assurance', 'Télécommunications', 'Industrie', 'Aéronautique', 'Santé', 'Retail', 'Services publics', 'Produits numériques'],
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
    introTitle: 'Donner une direction claire aux projets complexes',
    introParagraphs: [
      'Les profils produit et projet relient la stratégie, les besoins métiers, les équipes techniques et les contraintes de delivery. Leur valeur tient autant à la décision qu’à la coordination et à la qualité du suivi.',
      'Le portage salarial permet d’intervenir sur une transformation, un lancement produit ou un programme critique sans créer immédiatement sa propre société.',
    ],
    roles: ['Product Manager', 'Product Owner', 'Chef de projet IT', 'Directeur de programme', 'PMO', 'Business Analyst', 'Delivery Manager', 'Change Manager'],
    missionTypes: ['Vision et stratégie produit', 'Cadrage et priorisation', 'Pilotage de projet IT', 'Gouvernance de programme', 'PMO et reporting', 'Coordination métier / IT', 'Gestion des risques et dépendances', 'Conduite du changement'],
    methods: ['Discovery produit', 'Roadmap et backlog', 'Cycle en V, agile ou hybride', 'Comitologie proportionnée', 'Reporting et indicateurs', 'Capitalisation et transfert de connaissances'],
    businessValue: [
      { title: 'Décisions explicites', text: 'Clarifier les arbitrages, les responsabilités et les critères de réussite.' },
      { title: 'Exécution maîtrisée', text: 'Suivre les jalons, les risques, les dépendances et les livrables sans alourdir le projet.' },
      { title: 'Continuité', text: 'Documenter les décisions et organiser le transfert de connaissances pour sécuriser la durée.' },
    ],
    sectors: ['Finance et assurance', 'Industrie', 'Aéronautique', 'Énergie', 'Santé', 'Secteur public', 'Services numériques'],
    support: ['Cadrage du TJM et du périmètre', 'Contrats et facturation', 'Paie et frais professionnels validés', 'Interlocuteur administratif pendant la mission'],
    seoDescription:
      'Portage salarial pour Product Managers, Product Owners, PMO, chefs de projet IT, Business Analysts et directeurs de programme.',
  },
];
