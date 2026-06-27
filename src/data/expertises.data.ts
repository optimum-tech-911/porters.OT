export type Expertise = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  roles: string[];
  missionTypes: string[];
  support: string[];
  seoDescription: string;
};

export const expertises: Expertise[] = [
  {
    slug: 'cybersecurite',
    eyebrow: 'Cybersécurité',
    title: 'Un cadre solide pour vos missions cyber',
    summary:
      'RSSI freelance, consultant GRC, architecte sécurité ou expert SOC : The Porters sécurise le cadre contractuel, la facturation et la paie pendant que vous gardez la maîtrise de la mission.',
    roles: ['RSSI et RSSI de transition', 'Consultant GRC', 'Architecte sécurité', 'Expert SOC / SIEM', 'Pentester', 'Cloud security engineer'],
    missionTypes: ['Audit et mise en conformité', 'Gouvernance et gestion des risques', 'Sécurisation cloud', 'Réponse à incident', 'Sensibilisation et feuille de route'],
    support: ['Validation du périmètre et du TJM', 'Contrat et facturation', 'Suivi des frais professionnels', 'Interlocuteur dédié pendant la mission'],
    seoDescription:
      'Portage salarial pour consultants cybersécurité : RSSI, GRC, SOC, sécurité cloud et audit. Cadre contractuel, paie et accompagnement The Porters.',
  },
  {
    slug: 'data-ia',
    eyebrow: 'Data & IA',
    title: 'Portez vos missions data et IA avec clarté',
    summary:
      'Data engineers, data scientists, consultants BI et experts IA conservent leur autonomie commerciale tout en déléguant la gestion contractuelle, administrative et sociale.',
    roles: ['Data engineer', 'Data scientist', 'Machine learning engineer', 'Consultant BI', 'Data architect', 'AI product manager'],
    missionTypes: ['Architecture data', 'Industrialisation ML / MLOps', 'Business intelligence', 'Gouvernance de données', 'Cadrage de cas d’usage IA'],
    support: ['Lecture du TJM et de la durée de mission', 'Gestion du contrat client', 'Facturation et paie', 'Conseil sur les frais liés aux outils et déplacements'],
    seoDescription:
      'Portage salarial pour consultants data et IA : data engineering, data science, BI, MLOps et gouvernance. Simulez vos revenus avec The Porters.',
  },
  {
    slug: 'devops-cloud',
    eyebrow: 'DevOps & cloud',
    title: 'Gardez la main sur la plateforme, déléguez le reste',
    summary:
      'Pour les missions cloud, DevOps, SRE et plateforme, The Porters apporte un cadre salarié lisible, une facturation suivie et un interlocuteur unique.',
    roles: ['DevOps engineer', 'Cloud architect', 'Site reliability engineer', 'Platform engineer', 'FinOps consultant', 'Release manager'],
    missionTypes: ['Migration cloud', 'CI/CD et automatisation', 'Infrastructure as Code', 'Observabilité et fiabilité', 'Optimisation des coûts cloud'],
    support: ['Cadrage contractuel de la mission', 'Suivi administratif sans rupture', 'Prise en compte des frais réels', 'Accompagnement du démarrage à la clôture'],
    seoDescription:
      'Portage salarial DevOps et cloud : SRE, plateforme, architecture cloud, CI/CD et FinOps. Accompagnement humain et gestion administrative The Porters.',
  },
  {
    slug: 'agilite-coaching',
    eyebrow: 'Agilité & coaching',
    title: 'Un portage adapté aux missions de transformation',
    summary:
      'Coach agile, Scrum Master, Product Owner ou directeur de programme : structurez une intervention de conseil sans créer immédiatement votre propre société.',
    roles: ['Coach agile', 'Scrum Master', 'Product Owner', 'Product manager', 'Chef de projet IT', 'Directeur de programme'],
    missionTypes: ['Transformation agile', 'Coaching d’équipe', 'Pilotage produit', 'Cadrage de programme', 'Conduite du changement'],
    support: ['Comparaison des statuts', 'Cadrage du périmètre et du calendrier', 'Contrat, facturation et paie', 'Suivi humain pendant toute la mission'],
    seoDescription:
      'Portage salarial pour coachs agiles, Scrum Masters, Product Owners et chefs de projet IT. Cadrez votre mission et vos revenus avec The Porters.',
  },
];
