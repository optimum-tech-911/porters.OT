export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** URL to photo — leave empty string if not available */
  photo: string;
  linkedin?: string;
  email?: string;
  agencySlug?: string;
}

export interface Agency {
  slug: string;
  city: string;
  region: string;
  /** TODO: client validation — address must be confirmed */
  address: string;
  postalCode: string;
  phone: string;
  email: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  proofNote?: string;
  serviceCards?: { title: string; description: string }[];
  contentSections?: {
    eyebrow?: string;
    title: string;
    paragraphs: string[];
  }[];
  highlight?: {
    title: string;
    body: string;
  };
  teamMembers: TeamMember[];
  localFaq: { question: string; answer: string }[];
  coordinates: { lat: number; lng: number };
  seo: PageSeo;
}

export interface PageSeo {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, unknown>;
}
