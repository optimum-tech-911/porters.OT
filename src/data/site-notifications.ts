import { helloWorkJobs, helloWorkUrl } from './hello-work.data';

export const NOTIFICATIONS_KEY = 'site.notifications.settings.v1';
export const NOTIFICATION_MEDIA_BUCKET = 'site-notifications';
export type SiteMessage = {
  id: string;
  enabled: boolean;
  showImage: boolean;
  image: string;
  imageAlt: string;
  badge: string;
  title: string;
  text: string;
  linkLabel: string;
  href: string;
};
export type NotificationSettings = {
  enabled: boolean;
  position: 'bottom-left' | 'bottom-right';
  intervalSeconds: number;
  firstDelaySeconds: number;
  durationSeconds: number;
  messages: SiteMessage[];
};

export const defaultNotifications: NotificationSettings = {
  enabled: true,
  position: 'bottom-left',
  intervalSeconds: 120,
  firstDelaySeconds: 0,
  durationSeconds: 16,
  messages: [
    { id: 'first-month', enabled: true, showImage: true, image: '', imageAlt: '', badge: '1er mois', title: 'Salaire dès le premier mois', text: 'Votre mission démarre. Votre rémunération aussi.', linkLabel: 'Découvrir le portage', href: '/portage-salarial' },
    ...helloWorkJobs.slice(0, 3).map((job, i) => ({ id: `opportunity-${i + 1}`, enabled: true, showImage: true, image: '', imageAlt: '', badge: 'Opportunité', title: job.title, text: `${job.salary} · ${job.city}`, linkLabel: 'Découvrir nos offres', href: helloWorkUrl })),
  ],
};

export function nextNotificationTime(now: number, lastEnded: number, settings: NotificationSettings) {
  const previous = Number.isFinite(lastEnded) ? Math.min(lastEnded, now) : 0;
  return Math.max(now + settings.firstDelaySeconds * 1000, previous + settings.intervalSeconds * 1000);
}

/** Only public web links and local paths can become clickable CMS content. */
export function safeWebUrl(value: unknown): string {
  if (typeof value !== 'string') return '';
  const url = value.trim();
  if (!url || /[\s\\\u0000-\u001f]/.test(url)) return '';
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  try { return new URL(url).protocol === 'https:' ? url : ''; } catch { return ''; }
}

export function readJsonObject(raw: unknown): Record<string, unknown> {
  const value = typeof raw === 'string' ? JSON.parse(raw) : raw;
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Configuration invalide.');
  return value as Record<string, unknown>;
}

export function boundedSetting(value: unknown, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) throw new Error(`Choisissez une valeur entre ${min} et ${max}.`);
  return value;
}

export function shortText(value: unknown, max: number, required = true): string {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`Texte ${required ? 'obligatoire, ' : ''}${max} caractères maximum.`);
  return value.trim();
}

export function parseNotifications(raw: unknown): NotificationSettings {
  const value = readJsonObject(raw);
  if (typeof value.enabled !== 'boolean' || !Array.isArray(value.messages)) throw new Error('Configuration des notifications invalide.');
  let position: NotificationSettings['position'] = 'bottom-left';
  if (value.position !== undefined) {
    if (value.position !== 'bottom-left' && value.position !== 'bottom-right') throw new Error('Position de notification invalide.');
    position = value.position;
  }
  const ids = new Set<string>();
  const messages = value.messages.map((rawMessage) => {
    const message = readJsonObject(rawMessage);
    const id = shortText(message.id, 80);
    if (!/^[a-z0-9-]+$/.test(id) || ids.has(id)) throw new Error('Identifiant de notification invalide ou dupliqué.');
    ids.add(id);
    const href = safeWebUrl(message.href);
    if (!href || typeof message.enabled !== 'boolean') throw new Error('Renseignez un lien local ou une URL HTTPS valide.');
    const showImage = message.showImage ?? true;
    if (typeof showImage !== 'boolean') throw new Error('Le réglage de l’image est invalide.');
    const image = shortText(message.image ?? '', 700, false);
    if (image && !safeWebUrl(image)) throw new Error('Renseignez un chemin local ou une URL HTTPS valide pour l’image.');
    return { id, enabled: message.enabled, showImage, image, imageAlt: shortText(message.imageAlt ?? '', 160, false), badge: shortText(message.badge, 45), title: shortText(message.title, 120), text: shortText(message.text, 400), linkLabel: shortText(message.linkLabel, 65), href };
  });
  if (value.enabled && !messages.some((message) => message.enabled)) throw new Error('Activez au moins un message ou désactivez les notifications.');
  const settings = { enabled: value.enabled, position, intervalSeconds: boundedSetting(value.intervalSeconds, 120, 1800), firstDelaySeconds: boundedSetting(value.firstDelaySeconds, 0, 1800), durationSeconds: boundedSetting(value.durationSeconds, 10, 60), messages };
  if (JSON.stringify(settings).length > 10000) throw new Error('La liste de notifications est trop longue pour être enregistrée.');
  return settings;
}
