import { useEffect, useState, type ReactNode } from 'react';
import HeroFloatingStickers from './HeroFloatingStickers';
import HeroJourneyRail from './HeroJourneyRail';
import HeroMobileProofScroller from './HeroMobileProofScroller';
import HeroProofTicker from './HeroProofTicker';
import HeroTestimonialBar from './HeroTestimonialBar';
import HeroCardPopover from './HeroCardPopover';
import { heroProofImages } from './heroExperience.data';

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
  children?: ReactNode;
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

export default function HomeHeroCarousel({ audiences, children }: Props) {
  const [activeAudience, setActiveAudience] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);
  const audience = audiences[activeAudience] ?? audiences[0];
  const photoCount = Math.max(audience?.desktopImages.length ?? 0, audience?.mobileImages.length ?? 0);
  const autoPaused = reducedMotion || pageHidden || photoCount <= 1;

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

  const statDetail = audience.id === 'entreprise'
    ? {
        eyebrow: 'Parcours entreprise',
        body: 'Un cadre lisible pour qualifier le besoin, contractualiser l’intervention et suivre les éléments administratifs de la mission.',
        points: ['Expertises IT et transformation', 'Un point de contact identifiable'],
      }
    : {
        eyebrow: 'Parcours consultant',
        body: 'Un cadre salarial pour exercer en autonomie tout en déléguant la gestion contractuelle, sociale et administrative.',
        points: ['Autonomie commerciale conservée', 'Suivi pendant la mission'],
      };

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

            <div className="audience-hero-actions">
              <a href={audience.primaryCta.href} className="hero-action hero-action-primary hero-action-arrive-primary">
                {audience.primaryCta.label}
                <ArrowIcon />
              </a>
              <a href={audience.secondaryCta.href} className="hero-action hero-action-secondary hero-action-arrive-secondary">
                {audience.secondaryCta.label}
              </a>
            </div>

            <HeroProofTicker audienceId={audience.id} />
            <HeroMobileProofScroller audienceId={audience.id} reducedMotion={reducedMotion} />
            <HeroTestimonialBar key={`testimonial-${audience.id}`} audienceId={audience.id} reducedMotion={reducedMotion} />
            {children && <div className="hero-google-reviews">{children}</div>}
          </div>

          <a
            key={`stat-${audience.id}`}
            className="hero-floating-sticker hero-stat-card audience-stat-desktop"
            href={audience.id === 'entreprise' ? '/entreprises' : '/qui-sommes-nous'}
            aria-label={`${audience.stat.value} : ${audience.stat.label}`}
          >
            <span className="hero-proof-image-wrap">
              <img
                src={audience.id === 'entreprise' ? heroProofImages.security.src : heroProofImages.advisor.src}
                alt=""
                width="256"
                height="256"
              />
            </span>
            <span>
              <strong>{audience.stat.value}</strong>
              <small>{audience.stat.label}</small>
            </span>
            <span className="hero-card-arrow" aria-hidden="true">↗</span>
            <HeroCardPopover
              eyebrow={statDetail.eyebrow}
              title={`${audience.stat.value} ${audience.stat.label}`}
              body={statDetail.body}
              points={statDetail.points}
            />
          </a>
        </div>

        <HeroFloatingStickers key={`stickers-${audience.id}`} audienceId={audience.id} />
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

          </div>

          <HeroJourneyRail audienceId={audience.id} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
