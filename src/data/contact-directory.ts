import { agencies } from './agencies.data';
import { readJsonObject, safeWebUrl, shortText } from './site-notifications';

export const CONTACT_DIRECTORY_KEY = 'site.contact.directory.v1';
export const CONTACT_DIRECTORY_ROUTE = '/contact';

export type ContactAgency = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  href: string;
};

export type ContactDirectorySettings = {
  generalHeading: string;
  generalEmail: string;
  agenciesHeading: string;
  agencies: ContactAgency[];
  directoryLinkLabel: string;
  directoryLinkHref: string;
};

export const defaultContactDirectory: ContactDirectorySettings = {
  generalHeading: 'Contact général',
  generalEmail: 'contact@porters.fr',
  agenciesHeading: 'Nos agences',
  agencies: agencies.map((agency) => ({
    id: agency.slug,
    name: `The Porters ${agency.city}`,
    address: agency.address && agency.postalCode
      ? `${agency.address}, ${agency.postalCode} ${agency.city}`
      : 'Rendez-vous à distance ou selon les modalités confirmées par l’équipe.',
    phone: agency.phone,
    email: agency.email,
    href: `/agences/${agency.slug}`,
  })),
  directoryLinkLabel: 'Voir toutes nos agences',
  directoryLinkHref: '/agences',
};

function optionalEmail(value: unknown): string {
  const email = shortText(value ?? '', 320, false);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Adresse email invalide.');
  return email;
}

export function parseContactDirectory(raw: unknown): ContactDirectorySettings {
  const value = readJsonObject(raw);
  if (!Array.isArray(value.agencies) || value.agencies.length > 20) throw new Error('Liste d’agences invalide (20 maximum).');

  const ids = new Set<string>();
  const parsed: ContactDirectorySettings = {
    generalHeading: shortText(value.generalHeading ?? '', 120, false),
    generalEmail: optionalEmail(value.generalEmail),
    agenciesHeading: shortText(value.agenciesHeading ?? '', 120, false),
    agencies: value.agencies.map((rawAgency) => {
      const agency = readJsonObject(rawAgency);
      const id = shortText(agency.id, 80);
      if (!/^[a-z0-9-]+$/.test(id) || ids.has(id)) throw new Error('Identifiant d’agence invalide ou dupliqué.');
      ids.add(id);
      const hrefValue = shortText(agency.href ?? '', 700, false);
      const href = hrefValue ? safeWebUrl(hrefValue) : '';
      if (hrefValue && !href) throw new Error('Le lien d’une agence doit être un chemin local ou une URL HTTPS.');
      return {
        id,
        name: shortText(agency.name, 160),
        address: shortText(agency.address ?? '', 300, false),
        phone: shortText(agency.phone ?? '', 80, false),
        email: optionalEmail(agency.email),
        href,
      };
    }),
    directoryLinkLabel: shortText(value.directoryLinkLabel ?? '', 120, false),
    directoryLinkHref: shortText(value.directoryLinkHref ?? '', 700, false),
  };

  if (parsed.directoryLinkHref && !safeWebUrl(parsed.directoryLinkHref)) throw new Error('Le lien vers les agences doit être un chemin local ou une URL HTTPS.');
  if (JSON.stringify(parsed).length > 10000) throw new Error('Les coordonnées dépassent la capacité maximale de 10 000 caractères.');
  return parsed;
}
