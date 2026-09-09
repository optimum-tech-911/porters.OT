import { boundedSetting, readJsonObject, safeWebUrl, shortText } from './site-notifications';

export const PUBLIC_TEAM_KEY = 'site.team.settings.v1';
export const TEAM_MEDIA_BUCKET = 'team-portraits';
export type PublicTeamMember = { id: string; name: string; role: string; quote: string; image: string; linkedin: string; visible: boolean };
export type PublicTeamSettings = { heading: string; intervalSeconds: number; autoplay: boolean; members: PublicTeamMember[] };

// Quotes are deliberately empty until the team supplies approved statements.
export const defaultPublicTeam: PublicTeamSettings = {
  heading: 'Une équipe à votre écoute', intervalSeconds: 8, autoplay: true,
  members: [
    { id: 'ambre', name: 'Ambre Lambert', role: 'Directrice commerciale IT', quote: '', image: '/images/team/ambre-lambert-800.avif', linkedin: 'https://fr.linkedin.com/in/ambrelambert', visible: true },
    { id: 'eric', name: 'Éric Bensaid', role: 'Fondateur', quote: '', image: '/images/team/eric-bensaid-800.avif', linkedin: 'https://fr.linkedin.com/in/eric-bensaid-73573816', visible: true },
    { id: 'lisa', name: 'Lisa Delrieu', role: 'Chargée de recrutement', quote: '', image: '/images/team/lisa-delrieu-800.avif', linkedin: 'https://fr.linkedin.com/in/lisa-delrieu', visible: true },
  ],
};

export function parsePublicTeam(raw: unknown): PublicTeamSettings {
  const value = readJsonObject(raw);
  if (!Array.isArray(value.members) || typeof value.autoplay !== 'boolean') throw new Error('Configuration de l’équipe invalide.');
  const ids = new Set<string>();
  const members = value.members.map((rawMember) => {
    const member = readJsonObject(rawMember);
    const id = shortText(member.id, 80);
    if (!/^[a-z0-9-]+$/.test(id) || ids.has(id)) throw new Error('Identifiant de membre invalide ou dupliqué.');
    ids.add(id);
    const visible = member.visible;
    if (typeof visible !== 'boolean') throw new Error('Visibilité invalide.');
    const image = shortText(member.image, 700, false);
    const linkedin = shortText(member.linkedin, 700, false);
    if (image && !safeWebUrl(image)) throw new Error('Le portrait doit utiliser une URL HTTPS ou un chemin local valide.');
    if (linkedin && !safeWebUrl(linkedin)) throw new Error('Le lien du profil doit utiliser une URL HTTPS valide.');
    return { id, visible, name: shortText(member.name, 120, visible), role: shortText(member.role, 160, visible), quote: shortText(member.quote, 700, false), image, linkedin };
  });
  const settings = { heading: shortText(value.heading, 120), intervalSeconds: boundedSetting(value.intervalSeconds, 6, 30), autoplay: value.autoplay, members };
  if (JSON.stringify(settings).length > 10000) throw new Error('La présentation dépasse la capacité de cette configuration (10 000 caractères). Raccourcissez les citations ou les liens.');
  return settings;
}
