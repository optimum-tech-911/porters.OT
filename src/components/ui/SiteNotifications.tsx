import { useEffect, useRef, useState } from 'react';
import { defaultNotifications, NOTIFICATIONS_KEY, parseNotifications, nextNotificationTime, safeWebUrl, type SiteMessage } from '../../data/site-notifications';
import { watchPublishedSettings } from '../../lib/published-settings';
import './site-notifications.css';

export function NotificationCard({ message, portraitSrc, onClose, preview = false }: { message: SiteMessage; portraitSrc?: string; onClose?: () => void; preview?: boolean }) {
  const imageSrc = message.showImage ? safeWebUrl(message.image) || portraitSrc : '';
  const opportunity = message.id.startsWith('opportunity-') || message.badge.toLocaleLowerCase('fr').includes('opportunit');
  return <aside className={`site-notice${preview ? ' site-notice--preview' : ''}${imageSrc ? ' site-notice--has-portrait' : ''}${opportunity ? ' site-notice--opportunity' : ' site-notice--editorial'}`} aria-label="Suggestion The Porters" data-cms-ignore>
    {opportunity && <div className="site-notice__market-art" aria-hidden="true">
      <span className="site-notice__market-ring" />
      <svg viewBox="0 0 180 122" focusable="false">
        <path className="site-notice__market-grid" d="M8 28h164M8 62h164M8 96h164M42 8v106M88 8v106M134 8v106" />
        <path className="site-notice__market-line" d="M12 92 46 72 77 81 111 43 144 52 170 20" />
        <path className="site-notice__market-bar site-notice__market-bar--one" d="M26 104V86" />
        <path className="site-notice__market-bar site-notice__market-bar--two" d="M68 104V67" />
        <path className="site-notice__market-bar site-notice__market-bar--three" d="M110 104V49" />
        <path className="site-notice__market-bar site-notice__market-bar--four" d="M152 104V29" />
      </svg>
    </div>}
    {onClose && <button className="site-notice__close" onClick={onClose} aria-label="Fermer cette suggestion">×</button>}
    <div className="site-notice__badge">{message.badge}</div>
    <span className="site-notice__brand">The Porters</span>
    <h2>{message.title}</h2>
    <p>{message.text}</p>
    <a href={safeWebUrl(message.href) || undefined} {...(message.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{message.linkLabel}<span aria-hidden="true">↗</span></a>
    {imageSrc && <img className="site-notice__portrait" src={imageSrc} alt={message.imageAlt} width="220" height="290" decoding="async" />}
  </aside>;
}

export default function SiteNotifications({ portraitSrc }: { portraitSrc: string }) {
  const [message, setMessage] = useState<SiteMessage | null>(null);
  const settings = useRef(defaultNotifications);
  const current = useRef<SiteMessage | null>(null);
  const nextAt = useRef(Infinity);
  const expiresAt = useRef(Infinity);
  const host = useRef<HTMLDivElement>(null);
  const cursor = useRef(0);

  function hide() {
    if (!current.current) return;
    current.current = null;
    setMessage(null);
    const now = Date.now();
    nextAt.current = now + settings.current.intervalSeconds * 1000;
  }

  useEffect(() => {
    if (window.location.pathname.replace(/\/$/, '') !== '' || new URLSearchParams(window.location.search).has('cms-editor')) return;
    const lastEnded = 0;
    const startedAt = Date.now();
    let ready = false;
    nextAt.current = nextNotificationTime(startedAt, lastEnded, settings.current);
    const unwatch = watchPublishedSettings(NOTIFICATIONS_KEY, parseNotifications, (value) => {
      const old = settings.current;
      settings.current = value;
      if (!value.enabled || (current.current && !value.messages.some((item) => item.enabled && item.id === current.current?.id))) hide();
      else if (current.current) {
        const updated = value.messages.find((item) => item.id === current.current?.id)!;
        current.current = updated;
        setMessage(updated);
      }
      if (cursor.current === 0) nextAt.current = nextNotificationTime(startedAt, lastEnded, value);
      else if (value.intervalSeconds > old.intervalSeconds) nextAt.current = Math.max(nextAt.current, Date.now() + value.intervalSeconds * 1000);
    }, () => { ready = true; tick(); });
    const tick = () => {
      const now = Date.now();
      const interacting = Boolean(host.current?.matches(':hover') || host.current?.contains(document.activeElement));
      const busy = document.hidden || Boolean(document.querySelector('.tp-chat-launcher[aria-expanded="true"],dialog[open]'));
      if (current.current) {
        if (busy || (now >= expiresAt.current && !interacting)) hide();
        return;
      }
      if (!ready || busy || now < nextAt.current || !settings.current.enabled || document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')) return;
      const available = settings.current.messages.filter((item) => item.enabled);
      if (!available.length) return;
      const next = available[cursor.current++ % available.length];
      current.current = next;
      setMessage(next);
      expiresAt.current = now + settings.current.durationSeconds * 1000;
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') hide(); };
    const timer = window.setInterval(tick, 1000);
    window.addEventListener('keydown', escape);
    window.addEventListener('tp:assistant-open', hide);
    return () => { unwatch(); window.clearInterval(timer); window.removeEventListener('keydown', escape); window.removeEventListener('tp:assistant-open', hide); };
  }, []);

  return <div ref={host} className={`site-notice-host site-notice-host--${settings.current.position}`} aria-live="polite" aria-atomic="true" data-cms-ignore>
    {message && <NotificationCard message={message} portraitSrc={portraitSrc} onClose={hide} />}
  </div>;
}
