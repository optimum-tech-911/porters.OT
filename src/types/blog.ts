export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Rich text content — HTML string for V1 */
  content: string;
  /** Publication date in ISO format */
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured: boolean;
  category: BlogCategory;
  faq?: { question: string; answer: string }[];
  expertiseHref?: string;
  seo: {
    title: string;
    description: string;
  };
}

export type BlogCategory =
  | 'devenir-consultant'
  | 'fonctionnement'
  | 'secteurs'
  | 'actualites';

export interface BlogCategoryInfo {
  slug: BlogCategory;
  label: string;
  description: string;
}
