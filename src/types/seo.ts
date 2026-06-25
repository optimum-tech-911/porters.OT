export interface PageSeo {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}

export interface MigrationEntry {
  oldUrl: string;
  newUrl: string | null;
  statusCode: 301 | 410;
  action: 'keep' | 'merge' | 'redirect' | 'delete';
  seoPriority: 'highest' | 'high' | 'medium' | 'low';
  notes: string;
}
