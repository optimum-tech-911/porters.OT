import { useEffect, useRef, useState } from 'react';
import { defaultPublicTeam, parsePublicTeam, PUBLIC_TEAM_KEY, type PublicTeamSettings } from '../../data/public-team';
import { watchPublishedSettings } from '../../lib/published-settings';
import { safeWebUrl } from '../../data/site-notifications';
import './team-carousel.css';

export default function TeamCarousel({ preview }: { preview?: PublicTeamSettings }) {
  const [published, setPublished] = useState(defaultPublicTeam);
  const settings = preview ?? published;
  const members = settings.members.filter((person) => person.visible);
  const [activeId, setActiveId] = useState('');
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [editor, setEditor] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const index = Math.max(0, members.findIndex((person) => person.id === activeId));
  const running = settings.autoplay && !paused && !hovered && !focused && inView && pageVisible && !reduced && !editor && members.length > 1;

  useEffect(() => {
    if (preview) return;
    return watchPublishedSettings(PUBLIC_TEAM_KEY, parsePublicTeam, setPublished);
  }, [preview]);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion(); updateVisibility();
    setEditor(new URLSearchParams(window.location.search).has('cms-editor'));
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    return () => { media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); observer.disconnect(); };
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActiveId(members[(index + 1) % members.length].id), settings.intervalSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [running, index, settings.intervalSeconds, members]);

  const select = (next: number) => { setPaused(true); setActiveId(members[(next + members.length) % members.length].id); };
  if (!members.length) return null;
  return <div className="team-carousel" ref={root} role="region" aria-roledescription="carrousel" aria-label={settings.heading} data-cms-ignore onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <div className="team-carousel__header"><p>L’équipe The Porters</p><h2>{settings.heading}</h2></div>
    <div className="team-carousel__viewport">
      <div className="team-carousel__track" style={{ transform: `translateX(-${index * 100}%)` }} aria-live={running ? 'off' : 'polite'}>
        {members.map((person, position) => <article className="team-carousel__slide" key={person.id} role="group" aria-roledescription="diapositive" aria-label={`${position + 1} sur ${members.length} : ${person.name}`} aria-hidden={position !== index} inert={position !== index}>
          <div className="team-carousel__portrait">
            {safeWebUrl(person.image) ? <img key={person.image} src={safeWebUrl(person.image)} alt={person.name} width="800" height="800" loading={position === 0 ? 'eager' : 'lazy'} decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }} /> : null}
            <span aria-hidden="true">{person.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}</span>
            <div className="team-carousel__portrait-label" aria-hidden="true">THE PORTERS</div>
          </div>
          <div className="team-carousel__copy">
            <h3>{person.name}</h3><p className="team-carousel__role">{person.role}</p>
            {person.quote && <blockquote><span aria-hidden="true">“</span><p>{person.quote}</p></blockquote>}
            {safeWebUrl(person.linkedin) && <a className="team-carousel__link" href={safeWebUrl(person.linkedin)} target="_blank" rel="noopener noreferrer">Retrouver {person.name.split(' ')[0]} sur LinkedIn <span aria-hidden="true">↗</span></a>}
          </div>
        </article>)}
      </div>
    </div>
    {members.length > 1 && <div className="team-carousel__controls">
      <div className="team-carousel__dots">{members.map((person, position) => <button key={person.id} type="button" aria-label={`Voir ${person.name}`} aria-current={position === index ? 'true' : undefined} onClick={() => select(position)}><span /></button>)}</div>
      {settings.autoplay && !reduced && !editor && <button type="button" className="team-carousel__pause" onClick={() => { if (paused) { setHovered(false); setFocused(false); } setPaused(!paused); }} aria-label={paused ? 'Reprendre le défilement automatique' : 'Mettre le défilement automatique en pause'}>{paused ? 'Reprendre' : 'Pause'}</button>}
      <button type="button" className="team-carousel__arrow" aria-label="Personne précédente" onClick={() => select(index - 1)}>←</button>
      <button type="button" className="team-carousel__arrow" aria-label="Personne suivante" onClick={() => select(index + 1)}>→</button>
    </div>}
  </div>;
}
