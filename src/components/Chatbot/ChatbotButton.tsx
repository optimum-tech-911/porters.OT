import { useCallback, useState } from 'react';
import { emitAssistantEvent } from '../../lib/searchAssistant';
import ChatbotPanel from './ChatbotPanel';
import './chatbot.css';

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = () => {
    setOpen((current) => {
      if (!current) emitAssistantEvent('chatbot_opened');
      return !current;
    });
  };

  return (
    <>
      <ChatbotPanel open={open} onClose={close} />
      <button
        type="button"
        className={`tp-chat-launcher ${open ? 'is-open' : ''}`}
        onClick={toggle}
        aria-label={open ? 'Fermer l’assistant The Porters' : 'Ouvrir l’assistant The Porters'}
        aria-expanded={open}
      >
        <span className="tp-chat-launcher-label">Une question ?</span>
        <span className="tp-chat-launcher-icon">
          {open ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5.5 17.5 3.5 21l4.8-1.4c1.1.5 2.4.8 3.7.8 5 0 9-3.7 9-8.3S17 3.8 12 3.8 3 7.5 3 12.1c0 2 .9 3.9 2.5 5.4Z" />
              <path d="M8 12h.01M12 12h.01M16 12h.01" />
            </svg>
          )}
          {!open && <i aria-hidden="true" />}
        </span>
      </button>
    </>
  );
}

