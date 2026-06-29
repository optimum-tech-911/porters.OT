import { heroExperience, type HeroAudienceId } from './heroExperience.data';
import useAutoScrollRail from './useAutoScrollRail';

type Props = {
  audienceId: HeroAudienceId;
  reducedMotion: boolean;
};

export default function HeroMobileProofScroller({ audienceId, reducedMotion }: Props) {
  const items = heroExperience[audienceId].mobileProofs;
  const { activeIndex, bindings, railRef, selectIndex } = useAutoScrollRail({
    disabled: reducedMotion,
    intervalMs: 4000,
    itemCount: items.length,
    resetKey: audienceId,
  });

  return (
    <div className="hero-mobile-proof-shell">
      <div
        ref={railRef}
        className="hero-mobile-proof-scroller"
        aria-label="Promesses clés"
        tabIndex={0}
        {...bindings}
      >
        {items.map((item, index) => (
          <a
            href={item.href}
            key={item.title}
            data-rail-item
            className={`hero-mobile-proof-pill ${index === activeIndex ? 'is-active' : ''}`}
          >
            <span className="hero-mobile-proof-image">
              <img src={item.image.src} alt="" width="256" height="256" />
            </span>
            <span>{item.title}</span>
            <span className="hero-mobile-proof-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <div className="hero-mobile-proof-controls" role="group" aria-label="Choisir une promesse">
        <span className="hero-mobile-proof-dots">
          {items.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Afficher : ${item.title}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => selectIndex(index)}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
