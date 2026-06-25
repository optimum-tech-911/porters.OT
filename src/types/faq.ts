export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  slug: string;
  items: FaqItem[];
}
