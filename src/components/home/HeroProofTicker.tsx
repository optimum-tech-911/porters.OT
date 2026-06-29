import { heroExperience, type HeroAudienceId } from './heroExperience.data';

export default function HeroProofTicker({ audienceId }: { audienceId: HeroAudienceId }) {
  return (
    <ul className="hero-proof-ticker" aria-label="Repères clés">
      {heroExperience[audienceId].ticker.map((item, index) => (
        <li key={item} style={{ '--ticker-index': index } as React.CSSProperties}>{item}</li>
      ))}
    </ul>
  );
}
