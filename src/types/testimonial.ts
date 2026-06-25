export interface Testimonial {
  /** TODO: client validation — all testimonial names and content must be confirmed */
  name: string;
  role: string;
  company?: string;
  quote: string;
  city?: string;
}
