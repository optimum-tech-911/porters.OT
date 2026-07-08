import { Index } from 'flexsearch';
import { websiteSearchIndex, type SearchIndexItem } from '../content/searchIndex';

export type AssistantConfidence = 'high' | 'low';

export interface AssistantAction {
  label: string;
  url: string;
  primary?: boolean;
}

export interface AssistantResponse {
  answer: string;
  confidence: AssistantConfidence;
  result: SearchIndexItem;
  related: SearchIndexItem[];
  actions: AssistantAction[];
}

export interface AssistantProvider {
  answer(query: string): AssistantResponse;
}

const STOP_WORDS = new Set([
  'a', 'ai', 'au', 'aux', 'avec', 'ce', 'ces', 'comment', 'dans', 'de', 'des', 'du', 'elle', 'en', 'est',
  'et', 'faire', 'il', 'je', 'la', 'le', 'les', 'ma', 'mes', 'mon', 'nous', 'ou', 'par', 'pas', 'pour', 'que',
  'quel', 'quelle', 'qui', 'se', 'suis', 'sur', 'un', 'une', 'vous', 'votre', 'the', 'porters',
]);

const SYNONYM_GROUPS = [
  ['cyber', 'cybersecurite', 'securite informatique', 'rssi', 'grc', 'audit securite', 'pentest', 'soc'],
  ['data', 'ia', 'intelligence artificielle', 'data scientist', 'data engineer', 'machine learning', 'bi'],
  ['cloud', 'devops', 'infrastructure', 'sre', 'ci cd', 'plateforme', 'kubernetes'],
  ['agile', 'agilite', 'scrum', 'kanban', 'product owner', 'scrum master', 'coach agile'],
  ['salaire', 'remuneration', 'revenus', 'tjm', 'simulation', 'simulateur', 'frais', 'net'],
  ['entreprise', 'client', 'besoin', 'recruter', 'consultant externe', 'renfort'],
  ['consultant', 'freelance', 'independant', 'salarie porte', 'mission'],
  ['rendez vous', 'rdv', 'appel', 'echange', 'conseiller'],
];

const DIRECT_INTENTS: Array<{ patterns: string[]; targetId: string }> = [
  { patterns: ['portage salarial', 'relation tripartite', 'salarie porte'], targetId: 'page-portage-salarial' },
  { patterns: ['simulateur', 'simuler', 'simulation', 'salaire', 'remuneration', 'revenus', 'tjm'], targetId: 'page-simulateur' },
  { patterns: ['cyber', 'cybersecurite', 'securite informatique', 'rssi', 'grc', 'audit securite', 'pentest', 'soc'], targetId: 'expertise-cybersecurite' },
  { patterns: ['data', 'ia', 'intelligence artificielle', 'data scientist', 'data engineer', 'machine learning'], targetId: 'expertise-data-ia' },
  { patterns: ['cloud', 'devops', 'infrastructure cloud', 'sre', 'ci cd', 'kubernetes'], targetId: 'expertise-cloud-devops' },
  { patterns: ['agile', 'agilite', 'scrum', 'product owner', 'scrum master', 'coach agile', 'kanban'], targetId: 'expertise-agilite-coaching' },
  { patterns: ['product manager', 'project manager', 'pmo', 'directeur de programme'], targetId: 'expertise-product-project-management' },
  { patterns: ['trouver une expertise', 'nos expertises', 'quelle expertise'], targetId: 'page-expertises' },
  { patterns: ['entreprise', 'besoin consultant', 'recruter un consultant', 'consultant externe', 'renfort it'], targetId: 'page-entreprises' },
  { patterns: ['consultant', 'freelance', 'independant', 'salarie porte'], targetId: 'page-consultants' },
  { patterns: ['rendez vous', 'rdv', 'prendre rendez vous', 'parler a un conseiller'], targetId: 'page-rendez-vous' },
  { patterns: ['contact', 'contacter', 'email', 'message'], targetId: 'page-contact' },
  { patterns: ['frais de gestion', 'tarif', 'tarifs', 'combien coute'], targetId: 'page-tarifs' },
  { patterns: ['recrutement', 'carriere', 'carrières', 'candidature', 'postuler', 'offre emploi'], targetId: 'page-recrutement' },
  { patterns: ['parrainage', 'parrainer', 'recommander une personne'], targetId: 'page-parrainage' },
  { patterns: ['rse', 'responsabilite sociale', 'numerique responsable'], targetId: 'page-rse' },
  { patterns: ['espace client', 'connexion client', 'mon compte'], targetId: 'page-espace-client' },
];

export const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase('fr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const tokensFor = (query: string) => {
  const normalized = normalizeSearchText(query);
  const baseTokens = normalized.split(' ').filter((token) => token.length > 1 && !STOP_WORDS.has(token));
  const expanded = new Set(baseTokens);

  for (const group of SYNONYM_GROUPS) {
    const normalizedGroup = group.map(normalizeSearchText);
    if (normalizedGroup.some((term) => ` ${normalized} `.includes(` ${term} `))) {
      normalizedGroup.flatMap((term) => term.split(' ')).forEach((token) => expanded.add(token));
    }
  }

  return { normalized, tokens: [...expanded].filter(Boolean) };
};

type WeightedField = 'title' | 'keywords' | 'description' | 'body';

const FIELD_WEIGHTS: Record<WeightedField, number> = {
  title: 12,
  keywords: 8,
  description: 5,
  body: 1,
};

const indexes = Object.fromEntries(
  (Object.keys(FIELD_WEIGHTS) as WeightedField[]).map((field) => [
    field,
    new Index({ tokenize: 'forward', resolution: 9, cache: 50 }),
  ]),
) as Record<WeightedField, Index>;

const itemById = new Map(websiteSearchIndex.map((item) => [item.id, item]));

for (const item of websiteSearchIndex) {
  indexes.title.add(item.id, normalizeSearchText(item.title));
  indexes.keywords.add(item.id, normalizeSearchText(item.keywords.join(' ')));
  indexes.description.add(item.id, normalizeSearchText(item.description));
  indexes.body.add(item.id, normalizeSearchText(item.body));
}

const findDirectIntent = (normalizedQuery: string) => {
  for (const intent of DIRECT_INTENTS) {
    for (const pattern of intent.patterns) {
      const normalizedPattern = normalizeSearchText(pattern);
      if (` ${normalizedQuery} `.includes(` ${normalizedPattern} `)) return intent.targetId;
    }
  }
  return undefined;
};

const secondaryActionFor = (item: SearchIndexItem): AssistantAction => {
  if (item.id === 'page-simulateur') return { label: 'Faire relire ma simulation', url: '/rendez-vous' };
  if (item.category === 'entreprise') return { label: 'Déposer un besoin', url: '/contact' };
  if (item.category === 'expertise') return { label: 'Voir le parcours consultant', url: '/consultants' };
  if (item.category === 'agence') return { label: 'Prendre rendez-vous', url: '/rendez-vous' };
  if (item.category === 'legal') return { label: 'Contacter The Porters', url: '/contact' };
  return { label: 'Prendre rendez-vous', url: '/rendez-vous' };
};

const fallbackResult = itemById.get('page-faq') ?? websiteSearchIndex[0];

export const searchWebsite = (query: string): AssistantResponse => {
  const { normalized, tokens } = tokensFor(query);
  const scores = new Map<string, number>();
  const directTargetId = findDirectIntent(normalized);

  for (const token of tokens) {
    for (const [field, index] of Object.entries(indexes) as Array<[WeightedField, Index]>) {
      const matches = index.search(token, { limit: 20, suggest: true }) as Array<string | number>;
      matches.forEach((id, position) => {
        const key = String(id);
        const rankFactor = Math.max(0.35, 1 - position * 0.045);
        scores.set(key, (scores.get(key) ?? 0) + FIELD_WEIGHTS[field] * rankFactor);
      });
    }
  }

  if (directTargetId) scores.set(directTargetId, (scores.get(directTargetId) ?? 0) + 120);

  const ranked = [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([id, score]) => ({ item: itemById.get(id), score }))
    .filter((entry): entry is { item: SearchIndexItem; score: number } => Boolean(entry.item));

  const top = ranked[0];
  const hasConfidentResult = Boolean(top && (directTargetId || top.score >= 10));
  const result = hasConfidentResult ? top.item : fallbackResult;
  const related = (hasConfidentResult ? ranked.slice(1) : ranked)
    .map((entry) => entry.item)
    .filter((item) => item.id !== result.id)
    .slice(0, 2);

  if (!hasConfidentResult && related.length < 2) {
    for (const id of ['page-portage-salarial', 'page-contact']) {
      const item = itemById.get(id);
      if (item && item.id !== result.id && !related.some((candidate) => candidate.id === item.id)) related.push(item);
      if (related.length === 2) break;
    }
  }

  const secondaryAction = secondaryActionFor(result);
  const actions: AssistantAction[] = [
    { label: result.ctaLabel || 'Voir la page', url: result.ctaUrl || result.url, primary: true },
  ];
  if (secondaryAction.url !== actions[0].url) actions.push(secondaryAction);

  return {
    answer: hasConfidentResult
      ? result.description
      : 'Je n’ai pas trouvé de réponse précise dans le site, mais voici les pages qui peuvent vous aider.',
    confidence: hasConfidentResult ? 'high' : 'low',
    result,
    related,
    actions: actions.slice(0, 2),
  };
};

export const localSearchAssistant: AssistantProvider = {
  answer: searchWebsite,
};

export type AssistantEventName =
  | 'chatbot_opened'
  | 'chatbot_question_asked'
  | 'chatbot_result_clicked'
  | 'chatbot_no_result';

export const emitAssistantEvent = (name: AssistantEventName, detail?: { url?: string }) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
};
