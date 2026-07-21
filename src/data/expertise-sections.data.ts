export type ExpertiseMission = {
  title: string;
  description: string;
};

export type ExpertiseSection = {
  id: string;
  number: string;
  title: string;
  shortSubtitle: string;
  introduction: string;
  description: string[];
  profiles: string[];
  missions: ExpertiseMission[];
  responsibilities: string[];
  skills: string[];
  sectors: string[];
  whyPortage: string;
  portersSupport: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const expertiseSections: ExpertiseSection[] = [
  {
    id: 'cybersecurite',
    number: '01',
    title: 'Cybersécurité',
    shortSubtitle: 'Risques, conformité et protection des systèmes',
    introduction: 'Protéger les organisations, leurs systèmes d’information, leurs données et leur continuité d’activité face à des risques toujours plus complexes.',
    description: [
      'Porters accompagne les consultants indépendants qui interviennent sur les enjeux de gouvernance, de conformité, de prévention, de détection et de réponse aux incidents de sécurité. Ces experts aident les entreprises à mieux identifier leurs risques, sécuriser leurs infrastructures, protéger leurs actifs critiques et répondre aux exigences réglementaires.',
      'Les missions peuvent concerner aussi bien la définition d’une stratégie de cybersécurité que la sécurisation opérationnelle des environnements cloud, des identités, des applications, des réseaux ou des données sensibles.',
    ],
    profiles: ['RSSI', 'RSSI de transition', 'Consultant GRC', 'Consultant cybersécurité', 'Analyste SOC', 'Ingénieur sécurité', 'Auditeur sécurité', 'Expert IAM', 'Cloud Security Engineer', 'Pentester', 'Consultant conformité', 'Responsable gestion des risques'],
    missions: [
      { title: 'Gouvernance et stratégie de sécurité', description: 'Définition de feuilles de route cybersécurité, réalisation d’analyses de maturité, mise en place de politiques de sécurité et accompagnement des directions dans le pilotage des risques numériques.' },
      { title: 'Audit, risques et conformité', description: 'Réalisation d’audits organisationnels et techniques, cartographie des risques, préparation aux certifications et accompagnement dans la mise en conformité réglementaire.' },
      { title: 'Sécurité opérationnelle et réponse aux incidents', description: 'Supervision des événements de sécurité, amélioration des capacités de détection, investigation, gestion des incidents et mise en place de plans de remédiation.' },
      { title: 'Sécurisation des accès et des infrastructures', description: 'Déploiement de solutions IAM, sécurisation des environnements cloud, renforcement des architectures, gestion des identités et protection des ressources critiques.' },
    ],
    responsibilities: ['Diagnostic de maturité et cartographie des risques', 'Politiques, procédures et référentiels de sécurité', 'Plans d’action et feuilles de route de remédiation', 'Rapports d’audit et recommandations prioritaires', 'Dossiers de conformité et preuves documentaires', 'Plans de réponse aux incidents', 'Tableaux de bord de pilotage et indicateurs de risque', 'Accompagnement des équipes techniques et métiers'],
    skills: ['ISO 27001', 'ISO 27005', 'EBIOS Risk Manager', 'NIS2', 'DORA', 'RGPD', 'IAM', 'PAM', 'SIEM', 'SOC', 'Zero Trust', 'Cloud Security', 'Risk Management', 'Incident Response', 'DevSecOps', 'Security by Design'],
    sectors: ['Banque et assurance', 'Industrie', 'Santé', 'Services numériques', 'Secteur public', 'Télécommunications', 'Transport', 'Énergie', 'E-commerce', 'Entreprises réglementées'],
    whyPortage: 'Les missions en cybersécurité demandent souvent une forte expertise, une grande autonomie et une capacité à intervenir rapidement dans des contextes sensibles. Le portage salarial permet au consultant de conserver son indépendance tout en bénéficiant d’un cadre contractuel et administratif structuré.',
    portersSupport: ['Sécurisation du cadre contractuel', 'Gestion administrative de l’activité', 'Accompagnement personnalisé du consultant', 'Suivi des contrats, missions et facturations', 'Protection sociale du statut salarié porté', 'Soutien dans la relation avec le client'],
    ctaLabel: 'Découvrir le portage salarial en cybersécurité',
    ctaHref: '/expertises/cybersecurite',
  },
  {
    id: 'data-ia',
    number: '02',
    title: 'Data & IA',
    shortSubtitle: 'Données, modèles et intelligence artificielle',
    introduction: 'Transformer les données en décisions, en automatisations et en produits intelligents capables de créer une valeur concrète pour l’entreprise.',
    description: [
      'Porters accompagne les experts de la donnée et de l’intelligence artificielle qui interviennent sur toute la chaîne de valeur, depuis la collecte et la structuration des données jusqu’à leur analyse, leur visualisation et leur exploitation par des modèles avancés.',
      'Ces consultants aident les organisations à fiabiliser leurs données, industrialiser leurs infrastructures, améliorer leur prise de décision et intégrer des solutions d’intelligence artificielle dans leurs processus, leurs produits et leurs outils internes.',
    ],
    profiles: ['Data Analyst', 'Data Engineer', 'Data Scientist', 'Machine Learning Engineer', 'AI Engineer', 'Analytics Engineer', 'Consultant BI', 'Architecte Data', 'Expert gouvernance des données', 'Consultant IA générative', 'MLOps Engineer', 'Chief Data Officer de transition'],
    missions: [
      { title: 'Architecture et ingénierie des données', description: 'Conception de plateformes data, construction de pipelines, organisation des flux, fiabilisation des sources et industrialisation du traitement des données.' },
      { title: 'Analyse et aide à la décision', description: 'Création d’indicateurs, exploration des données, développement de tableaux de bord et production d’analyses utiles aux équipes métiers et aux directions.' },
      { title: 'Machine Learning et modèles prédictifs', description: 'Développement, entraînement, évaluation et déploiement de modèles permettant d’anticiper des comportements, détecter des anomalies ou automatiser des décisions.' },
      { title: 'Intelligence artificielle générative', description: 'Conception de solutions basées sur les grands modèles de langage, assistants métiers, moteurs de recherche internes, systèmes RAG et automatisations intelligentes.' },
    ],
    responsibilities: ['Architecture des flux et modèles de données', 'Pipelines de collecte et de transformation', 'Tableaux de bord décisionnels', 'Analyses exploratoires et recommandations métiers', 'Modèles prédictifs et systèmes de scoring', 'Documentation technique et fonctionnelle', 'Solutions d’intelligence artificielle intégrées', 'Dispositifs de contrôle de la qualité des données', 'Mise en production et suivi des performances', 'Accompagnement des utilisateurs et des équipes internes'],
    skills: ['Python', 'SQL', 'Power BI', 'Tableau', 'Looker', 'Snowflake', 'Databricks', 'BigQuery', 'Azure Data Factory', 'AWS', 'GCP', 'Spark', 'dbt', 'Airflow', 'Machine Learning', 'Deep Learning', 'MLOps', 'LLM', 'RAG', 'Generative AI'],
    sectors: ['Banque et assurance', 'Retail', 'Industrie', 'Santé', 'Marketing', 'Transport et logistique', 'Services numériques', 'Télécommunications', 'Énergie', 'E-commerce'],
    whyPortage: 'Les spécialistes Data et IA interviennent souvent sur des projets à forte valeur ajoutée nécessitant des expertises rares et des périodes d’intervention définies. Le portage salarial leur permet de multiplier les missions tout en conservant un cadre professionnel stable et structuré.',
    portersSupport: ['Gestion des contrats de prestation', 'Prise en charge de la facturation', 'Gestion administrative et sociale', 'Accompagnement dans le suivi de mission', 'Cadre adapté aux missions longues ou ponctuelles', 'Soutien dans la relation avec les clients'],
    ctaLabel: 'Découvrir le portage salarial pour les experts Data & IA',
    ctaHref: '/expertises/data-ia',
  },
  {
    id: 'cloud-devops',
    number: '03',
    title: 'Cloud & DevOps',
    shortSubtitle: 'Infrastructure, automatisation et fiabilité',
    introduction: 'Concevoir des infrastructures plus agiles, plus fiables et plus performantes pour accélérer la transformation technologique des organisations.',
    description: [
      'Porters accompagne les consultants qui modernisent les infrastructures, automatisent les déploiements et améliorent la disponibilité des services numériques.',
      'Leurs missions couvrent les environnements cloud publics, privés ou hybrides, les chaînes d’intégration et de déploiement continus, la conteneurisation, l’observabilité, la résilience, la sécurité et l’optimisation des coûts d’infrastructure.',
    ],
    profiles: ['Cloud Architect', 'Cloud Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Platform Engineer', 'DevSecOps Engineer', 'Infrastructure Engineer', 'Kubernetes Engineer', 'Consultant FinOps', 'Architecte infrastructure', 'Release Engineer', 'Cloud Transformation Consultant'],
    missions: [
      { title: 'Migration et architecture cloud', description: 'Audit de l’existant, définition des architectures cibles, migration des applications et accompagnement de l’entreprise vers des environnements cloud adaptés.' },
      { title: 'Automatisation et infrastructure as code', description: 'Automatisation de la création, du déploiement et de la configuration des infrastructures afin d’améliorer la rapidité, la fiabilité et la reproductibilité.' },
      { title: 'Intégration et déploiement continus', description: 'Conception ou optimisation de chaînes CI/CD, réduction des interventions manuelles et accélération de la mise en production des applications.' },
      { title: 'Observabilité, résilience et performance', description: 'Mise en place de systèmes de supervision, gestion des incidents, amélioration de la disponibilité et optimisation des performances et des coûts.' },
    ],
    responsibilities: ['Audit des infrastructures existantes', 'Architecture cloud cible', 'Stratégie de migration', 'Modules d’infrastructure as code', 'Pipelines CI/CD', 'Plateformes de conteneurisation', 'Systèmes de monitoring et d’alerting', 'Documentation d’exploitation', 'Plans de continuité et de reprise', 'Tableaux de bord de performance et de coûts', 'Standards de déploiement et bonnes pratiques', 'Accompagnement des équipes de développement'],
    skills: ['AWS', 'Microsoft Azure', 'Google Cloud Platform', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'GitLab CI', 'GitHub Actions', 'Jenkins', 'Argo CD', 'Helm', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Infrastructure as Code', 'FinOps', 'SRE', 'DevSecOps'],
    sectors: ['Services numériques', 'Banque', 'Assurance', 'Industrie', 'SaaS', 'E-commerce', 'Télécommunications', 'Secteur public', 'Transport', 'Médias'],
    whyPortage: 'Les profils Cloud et DevOps sont régulièrement sollicités pour des transformations techniques complexes, des migrations ou des phases d’industrialisation. Le portage salarial leur permet d’intervenir avec autonomie tout en déléguant la gestion administrative de leur activité.',
    portersSupport: ['Cadre contractuel adapté aux projets techniques', 'Gestion administrative et facturation', 'Accompagnement pendant toute la durée de la mission', 'Suivi des échanges contractuels avec le client', 'Protection sociale du salarié porté', 'Soutien pour les missions longues et stratégiques'],
    ctaLabel: 'Découvrir le portage salarial Cloud & DevOps',
    ctaHref: '/expertises/cloud-devops',
  },
  {
    id: 'agilite',
    number: '04',
    title: 'Agilité',
    shortSubtitle: 'Transformation, coaching et collaboration',
    introduction: 'Faire évoluer les méthodes de travail, fluidifier la collaboration et aider les organisations à produire plus efficacement dans des environnements complexes.',
    description: [
      'Porters accompagne les professionnels de l’agilité qui interviennent auprès des équipes, des managers et des directions pour améliorer l’organisation, la coopération et la capacité à délivrer de la valeur.',
      'Leurs missions ne se limitent pas à l’application d’une méthode. Elles consistent également à accompagner le changement, faire évoluer les pratiques managériales, résoudre les blocages organisationnels et créer une dynamique d’amélioration continue.',
    ],
    profiles: ['Scrum Master', 'Agile Coach', 'Product Owner', 'Release Train Engineer', 'Coach organisationnel', 'Coach d’équipe', 'Consultant transformation agile', 'SAFe Program Consultant', 'Delivery Manager', 'Change Manager', 'Facilitateur', 'Lean Agile Consultant'],
    missions: [
      { title: 'Accompagnement des équipes', description: 'Aider les équipes à mieux collaborer, organiser leur travail, résoudre leurs difficultés et adopter progressivement des pratiques agiles adaptées à leur contexte.' },
      { title: 'Transformation agile à l’échelle', description: 'Accompagner plusieurs équipes ou départements dans la mise en place d’une organisation plus fluide, cohérente et orientée vers la création de valeur.' },
      { title: 'Facilitation et amélioration continue', description: 'Préparer et animer les rituels, ateliers, rétrospectives et sessions de résolution de problèmes afin de renforcer l’autonomie collective.' },
      { title: 'Conduite du changement', description: 'Accompagner les managers et les collaborateurs dans l’évolution des rôles, des responsabilités, des méthodes de travail et des habitudes organisationnelles.' },
    ],
    responsibilities: ['Diagnostic de maturité agile', 'Plan d’accompagnement et feuille de route', 'Animation de rituels et ateliers', 'Coaching individuel et collectif', 'Mise en place de cadres de collaboration', 'Indicateurs de suivi et de progression', 'Identification des blocages organisationnels', 'Accompagnement des managers', 'Amélioration des processus de delivery', 'Documentation des pratiques et méthodes', 'Plans d’amélioration continue', 'Transfert de compétences vers les équipes'],
    skills: ['Scrum', 'Kanban', 'SAFe', 'Lean', 'LeSS', 'Facilitation', 'Coaching', 'Change Management', 'Design Thinking', 'Management visuel', 'OKR', 'Product Discovery', 'Continuous Improvement', 'Team Coaching', 'Transformation organisationnelle'],
    sectors: ['Banque et assurance', 'Services numériques', 'Industrie', 'Secteur public', 'Télécommunications', 'Transport', 'Retail', 'Santé', 'Énergie', 'Grandes organisations en transformation'],
    whyPortage: 'Les consultants en agilité interviennent souvent dans des environnements de transformation, sur des périodes de plusieurs mois et auprès de nombreuses parties prenantes. Le portage salarial leur offre un cadre professionnel adapté sans limiter leur autonomie dans la conduite de leurs missions.',
    portersSupport: ['Gestion des aspects administratifs', 'Encadrement contractuel des missions', 'Facturation et suivi des règlements', 'Accompagnement humain et personnalisé', 'Continuité entre plusieurs missions', 'Soutien dans la relation commerciale et contractuelle'],
    ctaLabel: 'Découvrir le portage salarial pour les experts Agilité',
    ctaHref: '/expertises/agilite-coaching',
  },
  {
    id: 'produit-projet',
    number: '05',
    title: 'Produit & projet',
    shortSubtitle: 'Stratégie, pilotage et delivery',
    introduction: 'Cadrer les besoins, aligner les équipes et piloter la réalisation de produits et de projets numériques à forte valeur métier.',
    description: [
      'Porters accompagne les professionnels capables de transformer une ambition stratégique ou un besoin métier en produit, en service ou en projet concret.',
      'Ces experts assurent la coordination entre les directions, les utilisateurs, les équipes techniques et les partenaires. Ils structurent les priorités, définissent les objectifs, sécurisent les délais et veillent à la qualité de l’exécution.',
    ],
    profiles: ['Product Manager', 'Product Owner', 'Chef de projet IT', 'Directeur de projet', 'Program Manager', 'PMO', 'Business Analyst', 'Consultant AMOA', 'Delivery Manager', 'Product Operations Manager', 'Transformation Project Manager', 'Product Designer stratégique'],
    missions: [
      { title: 'Cadrage et définition des besoins', description: 'Analyse des enjeux métiers, recueil des besoins, identification des utilisateurs, définition du périmètre et formalisation des objectifs du projet.' },
      { title: 'Stratégie et pilotage produit', description: 'Construction de la vision, définition de la feuille de route, priorisation des fonctionnalités et suivi de la valeur créée par le produit.' },
      { title: 'Pilotage de projet et coordination', description: 'Organisation des équipes, suivi du budget, gestion des délais, anticipation des risques et coordination entre les différentes parties prenantes.' },
      { title: 'Delivery et amélioration continue', description: 'Supervision de la réalisation, organisation des mises en production, suivi des résultats et amélioration continue du produit ou du service.' },
    ],
    responsibilities: ['Note de cadrage', 'Expression des besoins', 'Spécifications fonctionnelles', 'Vision produit', 'Roadmap', 'Backlog priorisé', 'Planning projet', 'Budget et suivi des charges', 'Cartographie des risques', 'Comptes rendus de gouvernance', 'Indicateurs de performance', 'Plans de livraison', 'Rapports d’avancement', 'Coordination des équipes métiers et techniques'],
    skills: ['Product Strategy', 'Product Discovery', 'Product Delivery', 'Roadmapping', 'AMOA', 'Business Analysis', 'Gestion de projet', 'Gestion de programme', 'Jira', 'Confluence', 'Notion', 'Figma', 'Design Thinking', 'Agile', 'Scrum', 'OKR', 'User Research', 'Stakeholder Management'],
    sectors: ['Banque et assurance', 'Services numériques', 'E-commerce', 'Retail', 'Industrie', 'Santé', 'Secteur public', 'Transport', 'Énergie', 'Télécommunications', 'Start-up', 'Grandes entreprises'],
    whyPortage: 'Les professionnels du produit et du projet occupent fréquemment des rôles stratégiques au sein d’équipes clientes pendant plusieurs mois. Le portage salarial leur permet d’exercer en autonomie tout en bénéficiant d’un statut structuré et d’une gestion simplifiée.',
    portersSupport: ['Gestion des contrats et avenants', 'Prise en charge de la facturation', 'Suivi administratif de la mission', 'Accompagnement humain et disponible', 'Protection sociale du salarié porté', 'Soutien dans les échanges avec le client', 'Continuité entre plusieurs projets', 'Cadre adapté aux missions de longue durée'],
    ctaLabel: 'Découvrir le portage salarial pour les experts Produit & Projet',
    ctaHref: '/expertises/product-project-management',
  },
];
