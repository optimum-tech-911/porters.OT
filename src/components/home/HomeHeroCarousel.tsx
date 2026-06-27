import { useEffect, useState } from 'react';

type HeroImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  objectPosition?: string;
};

type HeroAudience = {
  id: 'consultant' | 'entreprise';
  tabLabel: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  stat: { value: string; label: string };
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  desktopImages: HeroImage[];
  mobileImages: HeroImage[];
};

type Props = {
  audiences: HeroAudience[];
};

const AUTO_ROTATE_MS = 7000;

function HeroPhotoLayers({ images, activePhoto, variant }: {
  images: HeroImage[];
  activePhoto: number;
  variant: 'desktop' | 'mobile';
}) {
  const visibleIndex = images.length > 0 ? activePhoto % images.length : 0;

  return (
    <div className={`hero-photo-stack hero-photo-stack-${variant}`}>
      {images.map((image, index) => {
        const isActive = index === visibleIndex;

        return (
          <div
            key={image.src}
            className={`hero-photo-layer ${isActive ? 'is-active' : ''}`}
            aria-hidden={!isActive}
          >
            <img
              src={image.src}
              width={image.width}
              height={image.height}
              alt={isActive ? image.alt : ''}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              style={{ objectPosition: image.objectPosition ?? 'center' }}
            />
          </div>
        );
      })}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h11M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeHeroCarousel({ audiences }: Props) {
  const [activeAudience, setActiveAudience] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const audience = audiences[activeAudience] ?? audiences[0];
  const photoCount = Math.max(audience?.desktopImages.length ?? 0, audience?.mobileImages.length ?? 0);
  const autoPaused = reducedMotion || userPaused || pageHidden || photoCount <= 1;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setReducedMotion(mediaQuery.matches);
    const syncVisibility = () => setPageHidden(document.hidden);

    syncMotionPreference();
    syncVisibility();
    mediaQuery.addEventListener('change', syncMotionPreference);
    document.addEventListener('visibilitychange', syncVisibility);

    return () => {
      mediaQuery.removeEventListener('change', syncMotionPreference);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => {
    setActivePhoto(0);
  }, [activeAudience]);

  useEffect(() => {
    if (autoPaused) return;

    const timer = window.setInterval(() => {
      setActivePhoto((current) => (current + 1) % photoCount);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [autoPaused, photoCount]);

  if (!audience) return null;

  return (
    <section
      className={`audience-hero ${autoPaused ? 'is-paused' : ''}`}
      aria-label="Présentation The Porters"
    >
      <div className="audience-hero-stage">
        <div className="audience-hero-media">
          <HeroPhotoLayers images={audience.desktopImages} activePhoto={activePhoto} variant="desktop" />
          <HeroPhotoLayers images={audience.mobileImages} activePhoto={activePhoto} variant="mobile" />
        </div>
        <div className="audience-hero-scrim" aria-hidden="true" />

        <div className="audience-hero-inner">
          <div
            key={audience.id}
            id={`hero-panel-${audience.id}`}
            className="audience-hero-copy"
            role="tabpanel"
            aria-labelledby={`hero-tab-${audience.id}`}
          >
            <p className="audience-hero-eyebrow">
              <span className="audience-hero-eyebrow-line" aria-hidden="true" />
              <span className="audience-hero-eyebrow-text">{audience.eyebrow}</span>
            </p>
            <h1>{audience.headline}</h1>
            <p className="audience-hero-subhead">{audience.subhead}</p>

            <div className="audience-stat audience-stat-mobile" aria-live="polite">
              <strong>{audience.stat.value}</strong>
              <span>{audience.stat.label}</span>
            </div>

            <div className="audience-hero-actions">
              <a href={audience.primaryCta.href} className="hero-action hero-action-primary hero-action-arrive-primary">
                {audience.primaryCta.label}
                <ArrowIcon />
              </a>
              <a href={audience.secondaryCta.href} className="hero-action hero-action-secondary hero-action-arrive-secondary">
                {audience.secondaryCta.label}
              </a>
            </div>
          </div>

          <div key={`stat-${audience.id}`} className="audience-stat audience-stat-desktop" aria-live="polite">
            <span className="audience-stat-kicker">The Porters en chiffres</span>
            <strong>{audience.stat.value}</strong>
            <span>{audience.stat.label}</span>
          </div>
        </div>
      </div>

      <div className="audience-hero-strip">
        <div className="audience-hero-strip-inner">
          <div className="audience-tabs" role="tablist" aria-label="Choisir votre parcours">
            {audiences.map((item, index) => {
              const isActive = index === activeAudience;

              return (
                <button
                  key={item.id}
                  id={`hero-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`hero-panel-${item.id}`}
                  className={`audience-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveAudience(index)}
                >
                  <span className="audience-tab-index">0{index + 1}</span>
                  <span className="audience-tab-label">{item.tabLabel}</span>
                  {isActive && (
                    <span className="audience-tab-progress" aria-hidden="true">
                      <span key={`${item.id}-${activePhoto}`} />
                    </span>
                  )}
                </button>
              );
            })}

            {photoCount > 1 && !reducedMotion && (
              <button
                type="button"
                className="audience-autoplay-toggle"
                aria-label={userPaused ? 'Relancer les images' : 'Mettre les images en pause'}
                onClick={() => setUserPaused((current) => !current)}
              >
                {userPaused ? (
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m7 5 7 5-7 5V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7 5v10M13 5v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                )}
              </button>
            )}
          </div>

          <div className="audience-trust" aria-label="Nos engagements">
            <div className="audience-trust-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16v11H4zM4 10h16M8 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>Paie dans les 5 premiers jours ouvrés</span>
            </div>
            <div className="audience-trust-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 8.5h16v10H4zM7 5.5h10v3H7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M8 13h8M12 10v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
              <span>Avance de trésorerie selon conditions</span>
            </div>
            <div className="audience-trust-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c.8-3.4 3.2-5 7.5-5s6.7 1.6 7.5 5M17 9l1.3 1.3L21 7.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>Un interlocuteur unique</span>
            </div>
            <div className="audience-trust-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m12 3 7 3v5c0 4.6-2.8 7.8-7 10-4.2-2.2-7-5.4-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>10 % de frais, affichés clairement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
