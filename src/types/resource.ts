export interface Resource {
  slug: string;
  title: string;
  description: string;
  type: 'guide' | 'livre-blanc' | 'checklist' | 'infographie';
  /** TODO: client validation — actual download URLs needed */
  downloadUrl: string;
  coverImage?: string;
  publishedAt: string;
  seo: {
    title: string;
    description: string;
  };
}
