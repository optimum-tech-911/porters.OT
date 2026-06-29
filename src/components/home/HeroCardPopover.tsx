type Props = {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
};

export default function HeroCardPopover({ eyebrow, title, body, points }: Props) {
  return (
    <span className="hero-card-popover">
      <span className="hero-card-popover-accent" aria-hidden="true" />
      <span className="hero-card-popover-eyebrow">{eyebrow}</span>
      <strong className="hero-card-popover-title">{title}</strong>
      <span className="hero-card-popover-body">{body}</span>
      <span className="hero-card-popover-points">
        {points.map((point) => (
          <span key={point}><i aria-hidden="true" />{point}</span>
        ))}
      </span>
      <span className="hero-card-popover-cta">Voir le détail <b aria-hidden="true">→</b></span>
      <span className="hero-card-popover-caret" aria-hidden="true" />
    </span>
  );
}
