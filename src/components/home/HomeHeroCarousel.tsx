import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from 'react';

type HeroSlide = {
  label: string;
  titleLines: string[];
  description: string;
  mobileDescription?: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: { src: string; width: number; height: number };
  alt: string;
  mobileObjectPosition: string;
  desktopObjectPosition: string;
  mobileTitleMaxWidth?: string;
  mobileTextMaxWidth?: string;
};

type Props = {
  slides: HeroSlide[];
};

const AUTO_ROTATE_MS = 7000;
const SWIPE_THRESHOLD = 48;

export default function HomeHeroCarousel({ slides }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => setReducedMotion(mediaQuery.matches);

    syncReducedMotion();
    mediaQuery.addEventListener('change', syncReducedMotion);

    return () => {
      mediaQuery.removeEventListener('change', syncReducedMotion);
    };
  }, []);

  useEffect(() => {
    if (slides.length <= 1 || reducedMotion || userPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ROTATE_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [reducedMotion, slides.length, userPaused]);

  const goToSlide = (index: number, shouldPause = true) => {
    setActiveIndex(index);
    if (shouldPause) {
      setUserPaused(true);
    }
  };

  const goToNext = () => {
    goToSlide((activeIndex + 1) % slides.length);
  };

  const goToPrevious = () => {
    goToSlide((activeIndex - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX ?? null;

    if (startX === null || endX === null) {
      touchStartX.current = null;
      return;
    }

    const deltaX = endX - startX;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden h-[calc(100svh-5rem)] min-h-[44rem] max-h-[48rem] lg:h-auto lg:min-h-0 lg:max-h-none lg:pt-20 lg:pb-28"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 lg:hidden">
        {slides.map((slide, index) => (
          <div
            key={`${slide.label}-mobile`}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            role="img"
            aria-label={slide.alt}
            >
            <img
              src={slide.image.src}
              alt=""
              width={slide.image.width}
              height={slide.image.height}
              className="h-full w-full object-cover"
              style={{ objectPosition: slide.mobileObjectPosition }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,243,0.08)_0%,rgba(250,248,243,0.02)_28%,rgba(11,16,32,0.05)_46%,rgba(11,16,32,0.34)_72%,rgba(11,16,32,0.72)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_72%,rgba(11,16,32,0.66)_0%,rgba(11,16,32,0.46)_30%,rgba(11,16,32,0.16)_54%,rgba(11,16,32,0)_76%)]" />
            <div className="absolute inset-x-0 bottom-0 h-[50%] bg-[linear-gradient(180deg,rgba(11,16,32,0)_0%,rgba(11,16,32,0.26)_38%,rgba(11,16,32,0.74)_100%)]" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 hidden pointer-events-none lg:block">
        {slides.map((slide, index) => (
          <div
            key={`${slide.label}-desktop`}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden="true"
          >
            <img
              src={slide.image.src}
              alt=""
              width={slide.image.width}
              height={slide.image.height}
              className="h-full w-full object-cover lg:object-right"
              style={{ objectPosition: slide.desktopObjectPosition }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,243,1)_0%,rgba(250,248,243,0.99)_28%,rgba(250,248,243,0.86)_40%,rgba(250,248,243,0.52)_52%,rgba(250,248,243,0.18)_62%,rgba(250,248,243,0.04)_70%,rgba(250,248,243,0)_78%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_50%,rgba(250,248,243,0.92)_0%,rgba(250,248,243,0.7)_24%,rgba(250,248,243,0.24)_44%,rgba(250,248,243,0)_62%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,243,0)_0%,rgba(250,248,243,0)_68%,rgba(25,43,99,0.04)_100%)]" />
          </div>
        ))}
      </div>

      <div className="container relative mx-auto h-full px-4 sm:px-6 lg:px-8 lg:h-auto">
        <div className="flex h-full items-end pb-8 sm:pb-10 lg:block lg:h-auto lg:pb-0">
          <div className="relative mx-auto w-[90%] max-w-[34rem] lg:mx-0 lg:w-auto lg:max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={slide.label}
                className={`transition-opacity duration-500 ease-out ${
                  index === activeIndex ? 'relative opacity-100' : 'pointer-events-none absolute inset-0 opacity-0'
                }`}
                aria-hidden={index === activeIndex ? undefined : true}
              >
                <div className="px-3 py-5 sm:px-7 sm:py-8 lg:px-0 lg:py-0">
                  <p className="mb-3 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-porters-gold drop-shadow-[0_1px_2px_rgba(11,16,32,0.5)] sm:text-sm lg:mb-4 lg:drop-shadow-none">
                    {slide.label}
                  </p>
                  <h1
                    className="mb-3 max-w-[var(--mobile-title-max-width)] text-[1.95rem] leading-[1.02] text-porters-white drop-shadow-[0_4px_18px_rgba(11,16,32,0.55)] sm:text-[3.15rem] lg:mb-4 lg:max-w-none lg:text-porters-navy lg:drop-shadow-none"
                    style={{ '--mobile-title-max-width': slide.mobileTitleMaxWidth ?? '18rem' } as CSSProperties}
                  >
                    {slide.titleLines.map((line, lineIndex) => (
                      <span key={`${slide.label}-line-${lineIndex}`} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="mt-3 block h-[3px] w-24 rounded-full bg-porters-gold sm:w-28 lg:mt-2 lg:w-[10.5rem]" />
                  </h1>
                  <p
                    className="mb-5 text-[1rem] leading-[1.55] text-porters-white/92 drop-shadow-[0_2px_12px_rgba(11,16,32,0.45)] sm:max-w-[32rem] sm:text-lg lg:hidden"
                    style={{ maxWidth: slide.mobileTextMaxWidth ?? '18rem' }}
                  >
                    {slide.mobileDescription ?? slide.description}
                  </p>
                  <p className="hidden mb-10 max-w-2xl text-lg leading-relaxed text-porters-black/72 lg:block">
                    {slide.description}
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <a
                      href={slide.primaryCta.href}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-[0.35rem] border-2 border-porters-white bg-porters-white px-5 py-3 text-[0.95rem] font-semibold text-porters-navy shadow-[0_12px_28px_rgba(11,16,32,0.22)] transition-all duration-200 hover:border-porters-gold hover:bg-porters-white hover:text-porters-navy sm:w-auto lg:border-porters-navy lg:bg-porters-navy lg:text-porters-white lg:hover:text-porters-white"
                      onClick={() => setUserPaused(true)}
                    >
                      {slide.primaryCta.label}
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                    <a
                      href={slide.secondaryCta.href}
                      className="inline-flex w-full items-center justify-center rounded-[0.35rem] border-2 border-porters-white/90 bg-transparent px-5 py-3 text-[0.95rem] font-semibold text-porters-white shadow-[0_8px_20px_rgba(11,16,32,0.12)] transition-all duration-200 hover:border-porters-gold hover:text-porters-gold sm:w-auto lg:border-porters-navy lg:bg-transparent lg:text-porters-navy lg:shadow-none"
                      onClick={() => setUserPaused(true)}
                    >
                      {slide.secondaryCta.label}
                    </a>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-5 hidden items-center gap-2 lg:flex">
              <button
                type="button"
                aria-label="Slide précédente"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-porters-navy/14 bg-porters-white/90 text-porters-navy transition-colors duration-200 hover:border-porters-gold hover:text-porters-gold"
                onClick={goToPrevious}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 3.5 5.5 8 10 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Slide suivante"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-porters-navy/14 bg-porters-white/90 text-porters-navy transition-colors duration-200 hover:border-porters-gold hover:text-porters-gold"
                onClick={goToNext}
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 3.5 10.5 8 6 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="sr-only">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.label}-dot`}
                  type="button"
                  aria-label={`Afficher la slide ${index + 1}`}
                  aria-pressed={index === activeIndex}
                  className={`h-3 w-3 rounded-full border transition-all duration-200 ${
                    index === activeIndex
                      ? 'border-porters-gold bg-porters-gold'
                      : 'border-porters-white/45 bg-porters-white/12 lg:border-porters-navy/20 lg:bg-porters-navy/10'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
