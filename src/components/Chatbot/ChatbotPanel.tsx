import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { emitAssistantEvent, localSearchAssistant, type AssistantResponse } from '../../lib/searchAssistant';
import ChatMessage from './ChatMessage';
import QuickQuestions from './QuickQuestions';
import SearchResults from './SearchResults';

interface ChatEntry {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  response?: AssistantResponse;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialMessages: ChatEntry[] = [
  {
    id: 1,
    role: 'assistant',
    text: 'Bonjour. Je peux vous orienter sur le portage salarial, les revenus, les expertises, les entreprises et les points de contact The Porters.',
  },
];

export default function ChatbotPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<ChatEntry[]>(initialMessages);
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);
  const responseTimerRef = useRef<number | undefined>(undefined);
  const titleId = useId();

  useEffect(() => () => {
    if (responseTimerRef.current) window.clearTimeout(responseTimerRef.current);
  }, []);

  useEffect(() => {
    if (!open) return;
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 120);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const previousOverflow = document.body.style.overflow;
    if (isMobile) document.body.style.overflow = 'hidden';

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      if (isMobile) document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, pending, open]);

  const ask = (question: string) => {
    const cleanQuestion = question.trim().slice(0, 220);
    if (!cleanQuestion || pending) return;

    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: 'user', text: cleanQuestion },
    ]);
    setQuery('');
    setPending(true);
    emitAssistantEvent('chatbot_question_asked');

    responseTimerRef.current = window.setTimeout(() => {
      const response = localSearchAssistant.answer(cleanQuestion);
      if (response.confidence === 'low') emitAssistantEvent('chatbot_no_result');
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: 'assistant',
          text: response.answer,
          response,
        },
      ]);
      setPending(false);
      responseTimerRef.current = undefined;
    }, 240);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(query);
  };

  const reset = () => {
    if (responseTimerRef.current) window.clearTimeout(responseTimerRef.current);
    responseTimerRef.current = undefined;
    setMessages(initialMessages);
    setQuery('');
    setPending(false);
    nextId.current = 2;
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  if (!open) return null;

  return (
    <section className="tp-chat-panel" role="dialog" aria-modal="false" aria-labelledby={titleId}>
      <header className="tp-chat-header">
        <div className="tp-chat-brand" aria-hidden="true">
          <span>TP</span>
          <i />
        </div>
        <div>
          <h2 id={titleId}>Assistant The Porters</h2>
          <p>Recherche privée dans le contenu du site</p>
        </div>
        <div className="tp-chat-header-actions">
          <button type="button" onClick={reset} aria-label="Recommencer la conversation" title="Recommencer">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M16 6V2m0 0h-4m4 0-2.7 2.7A6.5 6.5 0 1 0 16.4 11" />
            </svg>
          </button>
          <button type="button" onClick={onClose} aria-label="Fermer l’assistant">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 5 10 10M15 5 5 15" />
            </svg>
          </button>
        </div>
      </header>

      <div className="tp-chat-intro">
        Posez une question sur le portage salarial, les expertises ou nos accompagnements.
      </div>

      <div className="tp-chat-thread" ref={scrollRef} aria-live="polite" aria-relevant="additions">
        {messages.map((message) => (
          <ChatMessage key={message.id} role={message.role}>
            <p>{message.text}</p>
            {message.response && <SearchResults response={message.response} />}
          </ChatMessage>
        ))}
        {messages.length === 1 && <QuickQuestions onSelect={ask} disabled={pending} />}
        {pending && <ChatMessage role="assistant" pending>Recherche en cours</ChatMessage>}
      </div>

      <form className="tp-chat-composer" onSubmit={submit}>
        <label htmlFor="tp-chat-question">Votre question</label>
        <div>
          <input
            ref={inputRef}
            id="tp-chat-question"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex. Comment simuler mes revenus ?"
            maxLength={220}
            autoComplete="off"
            disabled={pending}
          />
          <button type="submit" disabled={pending || query.trim().length < 2} aria-label="Envoyer la question">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m3 10 13-6-4.5 12-2-4-6.5-2Z" />
              <path d="m9.5 12 2.5-2.5" />
            </svg>
          </button>
        </div>
        <p>Aucune donnée envoyée à un service externe.</p>
      </form>
    </section>
  );
}
