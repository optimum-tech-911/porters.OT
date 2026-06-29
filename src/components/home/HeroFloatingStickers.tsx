import { heroExperience, type HeroAudienceId } from './heroExperience.data';
import HeroCardPopover from './HeroCardPopover';

export default function HeroFloatingStickers({ audienceId }: { audienceId: HeroAudienceId }) {
  const stickers = heroExperience[audienceId].stickers;

  return (
    <aside className="hero-floating-stickers" aria-label="Promesses The Porters">
      {stickers.map((sticker, index) => (
        <div
          key={sticker.title}
          className="hero-floating-sticker-item"
          style={{ '--sticker-index': index } as React.CSSProperties}
        >
          <a className="hero-floating-sticker" href={sticker.href} aria-label={`${sticker.title} — ${sticker.text}`}>
            <span className="hero-proof-image-wrap">
              <img src={sticker.image.src} alt="" width="256" height="256" />
            </span>
            <span>
              <strong>{sticker.title}</strong>
              <small>{sticker.text}</small>
            </span>
            <span className="hero-card-arrow" aria-hidden="true">↗</span>
            <HeroCardPopover
              eyebrow={sticker.detail.eyebrow}
              title={sticker.title}
              body={sticker.detail.body}
              points={sticker.detail.points}
            />
          </a>
        </div>
      ))}
    </aside>
  );
}
