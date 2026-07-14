import { agencies } from '../data/agencies.data';
import { consultantBenefits, enterpriseBenefits } from '../data/benefits.data';
import { blogPosts, getBlogCategory } from '../data/blog.data';
import { expertises } from '../data/expertises.data';
import { faqGroups } from '../data/faq.data';
import { resources } from '../data/resources.data';
import { pageSeo } from '../data/seo.data';
import { aboutPage } from './pages/about';
import { consultantsPage } from './pages/consultants';
import { enterprisePage } from './pages/entreprises';
import { homeExpertises, homePortageSteps, homeWhyPorters } from './pages/home';

export type SearchCategory =
  | 'page'
  | 'consultant'
  | 'entreprise'
  | 'expertise'
  | 'faq'
  | 'agence'
  | 'article'
  | 'ressource'
  | 'legal';

export interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  body: string;
  category: SearchCategory;
  url: string;
  keywords: string[];
  ctaLabel: string;
  ctaUrl: string;
}

type CorePageDefinition = Omit<SearchIndexItem, 'description'> & {
  description: string;
};

const stripHtml = (value: string) =>
  value
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const joinText = (...values: Array<string | string[] | undefined>) =>
  values
    .flatMap((value) => (Array.isArray(value) ? value : value ? [value] : []))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

const corePages: CorePageDefinition[] = [
  {
    id: 'page-home',
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    body: joinText(
      homePortageSteps.flatMap((item) => [item.title, item.text]),
      homeWhyPorters.flatMap((item) => [item.title, item.text]),
      homeExpertises.map((item) => item.label),
    ),
    category: 'page',
    url: '/',
    keywords: ['the porters', 'portage salarial', 'consultant IT', 'expert numérique', 'accueil'],
    ctaLabel: 'Découvrir The Porters',
    ctaUrl: '/',
  },
  {
    id: 'page-consultants',
    title: 'Portage salarial pour consultants et indépendants',
    description:
      'Vous choisissez vos missions, vos clients et votre TJM. The Porters prend en charge le cadre contractuel, la facturation, la paie et le suivi administratif.',
    body: joinText(
      consultantsPage.audiences,
      consultantsPage.process.flatMap((item) => [item.title, item.text]),
      consultantsPage.handled,
      consultantsPage.controlled,
      consultantsPage.practicalTopics.flatMap((item) => [item.title, item.text]),
    ),
    category: 'consultant',
    url: '/consultants',
    keywords: ['consultant', 'indépendant', 'freelance', 'mission', 'TJM', 'statut salarié', 'protection sociale'],
    ctaLabel: 'Voir le parcours consultant',
    ctaUrl: '/consultants',
  },
  {
    id: 'page-portage-salarial',
    title: pageSeo.portageSalarial.title,
    description: pageSeo.portageSalarial.description,
    body: joinText(
      faqGroups[0]?.items.flatMap((item) => [item.question, item.answer]),
      consultantBenefits.flatMap((item) => [item.title, item.description]),
    ),
    category: 'consultant',
    url: '/portage-salarial',
    keywords: ['portage salarial', 'relation tripartite', 'contrat de travail', 'contrat de prestation', 'salarié porté'],
    ctaLabel: 'Comprendre le portage salarial',
    ctaUrl: '/portage-salarial',
  },
  {
    id: 'page-entreprises',
    title: pageSeo.entreprises.title,
    description: pageSeo.entreprises.description,
    body: joinText(
      enterprisePage.process.flatMap((item) => [item.title, item.description]),
      enterprisePage.useCases.flatMap((item) => [item.title, item.text]),
      enterpriseBenefits.flatMap((item) => [item.title, item.description]),
    ),
    category: 'entreprise',
    url: '/entreprises',
    keywords: ['entreprise', 'client', 'besoin consultant', 'consultant externe', 'expertise externe', 'renfort IT', 'mission'],
    ctaLabel: 'Voir l’accompagnement entreprise',
    ctaUrl: '/entreprises',
  },
  {
    id: 'page-expertises',
    title: 'Nos expertises numériques',
    description:
      'Cybersécurité, Data & IA, Cloud & DevOps, Agilité & Coaching, Product & Project Management : accédez au domaine qui correspond à votre mission.',
    body: joinText(expertises.flatMap((expertise) => [expertise.eyebrow, expertise.title, expertise.summary, ...expertise.roles])),
    category: 'expertise',
    url: '/expertises',
    keywords: ['expertises', 'métiers IT', 'cyber', 'data', 'IA', 'cloud', 'DevOps', 'agilité', 'produit', 'projet'],
    ctaLabel: 'Voir toutes les expertises',
    ctaUrl: '/expertises',
  },
  {
    id: 'page-simulateur',
    title: pageSeo.simulateur.title,
    description: pageSeo.simulateur.description,
    body: joinText(faqGroups.find((group) => group.slug === 'remuneration')?.items.flatMap((item) => [item.question, item.answer])),
    category: 'consultant',
    url: '/simulateur',
    keywords: ['simulateur', 'simulation', 'salaire', 'revenus', 'rémunération', 'TJM', 'jours facturés', 'frais professionnels'],
    ctaLabel: 'Simuler mes revenus',
    ctaUrl: '/simulateur',
  },
  {
    id: 'page-tarifs',
    title: 'Frais de gestion et simulation en portage salarial',
    description:
      'Les frais de gestion et les services inclus doivent être détaillés dans une simulation puis confirmés avant la contractualisation.',
    body: joinText(faqGroups.find((group) => group.slug === 'remuneration')?.items.flatMap((item) => [item.question, item.answer])),
    category: 'consultant',
    url: '/tarifs',
    keywords: ['tarifs', 'frais de gestion', 'coût', 'taux', 'frais professionnels', 'simulation'],
    ctaLabel: 'Comprendre les frais',
    ctaUrl: '/tarifs',
  },
  {
    id: 'page-about',
    title: pageSeo.quiSommesNous.title,
    description: pageSeo.quiSommesNous.description,
    body: joinText(
      aboutPage.missionCards.flatMap((item) => [item.title, item.text]),
      aboutPage.values.flatMap((item) => [item.title, item.text]),
      aboutPage.approach.flatMap((item) => [item.title, item.text]),
    ),
    category: 'page',
    url: '/qui-sommes-nous',
    keywords: ['qui sommes nous', 'mission', 'valeurs', 'clarté', 'proximité', 'équipe'],
    ctaLabel: 'Découvrir The Porters',
    ctaUrl: '/qui-sommes-nous',
  },
  {
    id: 'page-equipe',
    title: pageSeo.equipe.title,
    description: pageSeo.equipe.description,
    body: 'Conseil et cadrage. Contrats et conformité. Facturation et paie. Suivi de mission.',
    category: 'page',
    url: '/equipe',
    keywords: ['équipe', 'conseiller', 'chargé de compte', 'interlocuteur', 'suivi'],
    ctaLabel: 'Découvrir l’accompagnement',
    ctaUrl: '/equipe',
  },
  {
    id: 'page-faq',
    title: pageSeo.faq.title,
    description: pageSeo.faq.description,
    body: joinText(faqGroups.flatMap((group) => [group.title, ...group.items.flatMap((item) => [item.question, item.answer])])),
    category: 'faq',
    url: '/faq',
    keywords: ['faq', 'questions', 'réponses', 'aide', 'fonctionnement'],
    ctaLabel: 'Consulter toutes les réponses',
    ctaUrl: '/faq',
  },
  {
    id: 'page-contact',
    title: pageSeo.contact.title,
    description: pageSeo.contact.description,
    body: 'Mission trouvée, statut à comparer, simulation à relire ou besoin d’expertise : partagez le contexte utile avec The Porters.',
    category: 'page',
    url: '/contact',
    keywords: ['contact', 'email', 'message', 'question', 'parler à the porters'],
    ctaLabel: 'Contacter The Porters',
    ctaUrl: '/contact',
  },
  {
    id: 'page-rendez-vous',
    title: pageSeo.rendezVous.title,
    description: pageSeo.rendezVous.description,
    body: 'Demandez un échange sur le portage salarial, votre simulation, votre changement de statut, votre mission IT ou votre besoin entreprise.',
    category: 'page',
    url: '/rendez-vous',
    keywords: ['rendez-vous', 'rdv', 'conseiller', 'créneau', 'échange', 'appel'],
    ctaLabel: 'Prendre rendez-vous',
    ctaUrl: '/rendez-vous',
  },
  {
    id: 'page-agences',
    title: pageSeo.agences.title,
    description: pageSeo.agences.description,
    body: joinText(agencies.flatMap((agency) => [agency.city, agency.region, agency.heroSubtitle, agency.description])),
    category: 'agence',
    url: '/agences',
    keywords: ['agences', 'Paris', 'Lyon', 'Aix-en-Provence', 'Marseille', 'Montpellier', 'proximité'],
    ctaLabel: 'Voir les points de contact',
    ctaUrl: '/agences',
  },
  {
    id: 'page-resources',
    title: pageSeo.livresBlancs.title,
    description: pageSeo.livresBlancs.description,
    body: joinText(resources.flatMap((resource) => [resource.title, resource.description])),
    category: 'ressource',
    url: '/livres-blancs',
    keywords: ['ressources', 'guide', 'livre blanc', 'checklist', 'comparatif'],
    ctaLabel: 'Voir les ressources',
    ctaUrl: '/livres-blancs',
  },
  {
    id: 'page-blog',
    title: pageSeo.blog.title,
    description: pageSeo.blog.description,
    body: joinText(blogPosts.flatMap((post) => [post.title, post.excerpt])),
    category: 'ressource',
    url: '/blog',
    keywords: ['blog', 'news', 'insights', 'articles', 'conseils', 'actualités'],
    ctaLabel: 'Voir les articles',
    ctaUrl: '/blog',
  },
  {
    id: 'page-recrutement',
    title: pageSeo.recrutement.title,
    description: pageSeo.recrutement.description,
    body: 'Découvrez les métiers, les responsabilités et les opportunités publiées par The Porters.',
    category: 'page',
    url: '/recrutement',
    keywords: ['recrutement', 'carrières', 'emploi', 'offres', 'rejoindre', 'candidature'],
    ctaLabel: 'Voir les opportunités',
    ctaUrl: '/recrutement',
  },
  {
    id: 'page-parrainage',
    title: pageSeo.parrainage.title,
    description: pageSeo.parrainage.description,
    body: 'Une mise en relation se fait avec l’accord de la personne recommandée. L’éligibilité et les conditions applicables sont précisées avant de poursuivre.',
    category: 'page',
    url: '/parrainage',
    keywords: ['parrainage', 'recommandation', 'mise en relation', 'éligibilité', 'conditions'],
    ctaLabel: 'Comprendre le parrainage',
    ctaUrl: '/parrainage',
  },
  {
    id: 'page-rse',
    title: 'Démarche RSE — The Porters',
    description: 'The Porters distingue les intentions, les actions documentées et les preuves qui doivent encore être confirmées.',
    body: 'Numérique responsable, pratiques sociales, environnement et gouvernance : les éléments publiés restent limités aux informations vérifiables.',
    category: 'page',
    url: '/rse',
    keywords: ['RSE', 'responsabilité', 'environnement', 'social', 'gouvernance', 'numérique responsable'],
    ctaLabel: 'Voir la démarche RSE',
    ctaUrl: '/rse',
  },
  {
    id: 'page-espace-client',
    title: 'Espace client The Porters',
    description: 'Retrouvez l’accès aux documents et aux informations de votre activité depuis un point d’entrée unique.',
    body: 'Accès client, connexion, documents, facturation, paie et suivi administratif.',
    category: 'page',
    url: '/espace-client',
    keywords: ['espace client', 'connexion', 'accès', 'documents', 'compte'],
    ctaLabel: 'Accéder à l’espace client',
    ctaUrl: '/espace-client',
  },
  {
    id: 'page-legal',
    title: pageSeo.mentionsLegales.title,
    description: pageSeo.mentionsLegales.description,
    body: pageSeo.confidentialite.description,
    category: 'legal',
    url: '/mentions-legales',
    keywords: ['mentions légales', 'éditeur', 'hébergement', 'données personnelles', 'confidentialité', 'RGPD'],
    ctaLabel: 'Voir les mentions légales',
    ctaUrl: '/mentions-legales',
  },
  {
    id: 'page-confidentialite',
    title: pageSeo.confidentialite.title,
    description: pageSeo.confidentialite.description,
    body: pageSeo.mentionsLegales.description,
    category: 'legal',
    url: '/confidentialite',
    keywords: ['confidentialité', 'RGPD', 'données personnelles', 'cookies', 'droits'],
    ctaLabel: 'Lire la politique de confidentialité',
    ctaUrl: '/confidentialite',
  },
];

const expertiseItems: SearchIndexItem[] = expertises.map((expertise) => ({
  id: `expertise-${expertise.slug}`,
  title: expertise.title,
  description: expertise.summary,
  body: joinText(
    expertise.introTitle,
    expertise.introParagraphs,
    expertise.roles,
    expertise.missionTypes,
    expertise.methods,
    expertise.businessValue.flatMap((item) => [item.title, item.text]),
    expertise.sectors,
    expertise.support,
  ),
  category: 'expertise',
  url: `/expertises/${expertise.slug}`,
  keywords: [expertise.eyebrow, ...expertise.roles, ...expertise.missionTypes],
  ctaLabel: `Découvrir : ${expertise.eyebrow}`,
  ctaUrl: `/expertises/${expertise.slug}`,
}));

const faqItems: SearchIndexItem[] = faqGroups.flatMap((group) =>
  group.items.map((item, index) => ({
    id: `faq-${group.slug}-${index + 1}`,
    title: item.question,
    description: item.answer,
    body: joinText(group.title, item.question, item.answer),
    category: 'faq' as const,
    url: `/faq#${group.slug}`,
    keywords: [group.title, group.slug, 'question', 'réponse'],
    ctaLabel: 'Voir la FAQ',
    ctaUrl: `/faq#${group.slug}`,
  })),
);

const agencyItems: SearchIndexItem[] = agencies.map((agency) => ({
  id: `agency-${agency.slug}`,
  title: agency.heroTitle,
  description: agency.heroSubtitle,
  body: joinText(
    agency.description,
    agency.proofNote,
    agency.serviceCards?.flatMap((item) => [item.title, item.description]),
    agency.contentSections
      ?.flatMap((section) => [section.eyebrow, section.title, ...section.paragraphs])
      .filter((value): value is string => Boolean(value)),
    agency.localFaq.flatMap((item) => [item.question, item.answer]),
  ),
  category: 'agence',
  url: `/agences/${agency.slug}`,
  keywords: [agency.city, agency.region, 'agence', 'portage local', 'rendez-vous'],
  ctaLabel: `Voir le point de contact ${agency.city}`,
  ctaUrl: `/agences/${agency.slug}`,
}));

const articleItems: SearchIndexItem[] = blogPosts.map((post) => ({
  id: `article-${post.slug}`,
  title: post.title,
  description: post.excerpt,
  body: stripHtml(post.content),
  category: 'article',
  url: `/blog/${post.slug}`,
  keywords: [getBlogCategory(post.category)?.label ?? post.category, post.seo.title, post.seo.description],
  ctaLabel: 'Lire l’article',
  ctaUrl: `/blog/${post.slug}`,
}));

const resourceItems: SearchIndexItem[] = resources.map((resource) => ({
  id: `resource-${resource.slug}`,
  title: resource.title,
  description: resource.description,
  body: joinText(resource.seo.title, resource.seo.description, resource.type),
  category: 'ressource',
  url: '/livres-blancs',
  keywords: [resource.type, 'guide', 'ressource', 'téléchargement'],
  ctaLabel: resource.downloadUrl ? 'Télécharger la ressource' : 'Demander la ressource',
  ctaUrl: resource.downloadUrl || '/contact',
}));

export const websiteSearchIndex: SearchIndexItem[] = [
  ...corePages,
  ...expertiseItems,
  ...faqItems,
  ...agencyItems,
  ...articleItems,
  ...resourceItems,
];
