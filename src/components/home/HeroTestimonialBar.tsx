import { useEffect, useState } from 'react';

type Props = {
  audienceId: 'consultant' | 'entreprise';
  reducedMotion: boolean;
};

const testimonials = [
  {
    quote: 'Enfin un portage clair, humain et réactif.',
    author: 'Delphine — Product Owner, Paris',
  },
  {
    quote: 'Je reste concentré sur mes missions, The Porters gère le cadre.',
    author: 'Andy P. — Chef de projet digital',
  },
];

export default function HeroTestimonialBar({ audienceId, reducedMotion }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => setActiveIndex(0), [audienceId]);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const testimonial = testimonials[activeIndex];
  const showTestimonial = (index: number) => {
    setActiveIndex(((index % testimonials.length) + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="hero-testimonial-bar"
      aria-label="Témoignage client"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
    >
      <span className="hero-testimonial-mark" aria-hidden="true">“</span>
      <span key={`${audienceId}-${activeIndex}`} className="hero-testimonial-copy">
        <strong>« {testimonial.quote} »</strong>
        <small>{testimonial.author}</small>
      </span>
      <span className="hero-testimonial-controls" role="group" aria-label="Choisir un témoignage">
        <span className="hero-testimonial-dots">
          {testimonials.map((item, index) => (
            <button
              key={item.author}
              type="button"
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Afficher le témoignage de ${item.author}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => showTestimonial(index)}
            />
          ))}
        </span>
      </span>
    </section>
  );
}
