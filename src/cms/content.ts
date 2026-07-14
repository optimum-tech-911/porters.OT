import registry from './content-registry.json';

export type CmsElementType = 'heading' | 'paragraph' | 'button' | 'label' | 'quote' | 'list_item' | 'name';

export type CmsFormat = {
  size?: 'default' | 'small' | 'large' | 'xlarge';
  weight?: 'default' | 'regular' | 'medium' | 'semibold' | 'bold';
  alignment?: 'default' | 'left' | 'center' | 'right';
  color?: 'default' | 'navy' | 'gold' | 'dark' | 'light' | 'muted';
  lineHeight?: 'default' | 'compact' | 'normal' | 'relaxed';
};

export type CmsRegistryEntry = {
  key: string;
  route: string;
  type: CmsElementType;
  content: string;
};

const entries = registry as CmsRegistryEntry[];
const byKey = new Map(entries.map((entry) => [entry.key, entry]));

export const cmsRegistry = entries;

export function cmsText(key: string): string {
  const entry = byKey.get(key);
  if (!entry) throw new Error(`Unknown CMS content key: ${key}`);
  return entry.content;
}

export function cmsAttrs(key: string, mirrorAttribute?: string): Record<string, string> {
  const entry = byKey.get(key);
  if (!entry) throw new Error(`Unknown CMS content key: ${key}`);

  return {
    'data-cms-key': entry.key,
    'data-cms-route': entry.route,
    'data-cms-element-type': entry.type,
    ...(mirrorAttribute ? { 'data-cms-mirror-attribute': mirrorAttribute } : {}),
  };
}
