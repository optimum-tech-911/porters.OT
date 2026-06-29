import type { HeroIconName } from './heroExperience.data';

export default function HeroExperienceIcon({ name }: { name: HeroIconName }) {
  if (name === 'shield') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3 7 3v5c0 4.6-2.8 7.8-7 10-4.2-2.2-7-5.4-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'calculator') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="3.5" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'contract') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 3.5h7l3 3V20H7V3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3.5V7h3M10 11h4M10 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'profile') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="10" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 20c.7-3.8 2.7-5.7 6-5.7 2 0 3.6.7 4.6 2M17 11v6M14 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'rocket') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 5c2.2-1.5 4.7-1.7 5.8-1.6.1 1.2-.1 3.7-1.6 5.9l-5.7 5.6-3.4-3.4L14 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m9.5 7.3-3.2.5-2.1 2.1 4.9 1.6M16 10.7l-.5 3.2-2.1 2.1-.9-1.1M7.8 14.7C6.3 15 5.3 16 5 17.6c1.5-.3 2.6-1.3 2.8-2.9Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === 'brief') {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="16" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 6V4h6v2M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 20c.8-3.4 3.2-5 7.5-5s6.7 1.6 7.5 5M17 9l1.3 1.3L21 7.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
