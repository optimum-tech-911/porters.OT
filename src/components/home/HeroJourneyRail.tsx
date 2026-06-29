import { heroExperience, type HeroAudienceId } from './heroExperience.data';
import useAutoScrollRail from './useAutoScrollRail';

type Props = {
  audienceId: HeroAudienceId;
  reducedMotion: boolean;
};

export default function HeroJourneyRail({ audienceId, reducedMotion }: Props) {
  const steps = heroExperience[audienceId].journey;
  const { activeIndex, bindings, railRef, selectIndex } = useAutoScrollRail({
    disabled: reducedMotion,
    intervalMs: 4000,
    itemCount: steps.length,
    resetKey: audienceId,
  });

  return (
    <div className="hero-journey-carousel">
      <div
        ref={railRef}
        className="hero-journey-rail"
        aria-label="Votre parcours en trois étapes"
        tabIndex={0}
        {...bindings}
      >
        {steps.map((step, index) => (
          <a
            href={step.href}
            key={step.title}
            data-rail-item
            className={`hero-journey-step ${index === activeIndex ? 'is-active' : ''}`}
          >
            <span className="hero-journey-number">0{index + 1}</span>
            <span className="hero-journey-icon">
              <img src={step.image.src} alt="" width="256" height="256" />
            </span>
            <span className="hero-journey-copy">
              <strong>{step.title}</strong>
              <small>{step.text}</small>
            </span>
            <span className="hero-journey-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <div className="hero-journey-controls" role="group" aria-label="Choisir une étape">
        <span className="hero-journey-dots">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Afficher l’étape ${index + 1} : ${step.title}`}
              aria-current={index === activeIndex ? 'step' : undefined}
              onClick={() => selectIndex(index)}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
