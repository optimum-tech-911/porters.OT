import type { ReactNode } from 'react';

interface Props {
  role: 'assistant' | 'user';
  children: ReactNode;
  pending?: boolean;
}

export default function ChatMessage({ role, children, pending = false }: Props) {
  return (
    <div className={`tp-chat-message tp-chat-message--${role}`}>
      {role === 'assistant' && (
        <div className="tp-chat-avatar" aria-hidden="true">
          <span>TP</span>
        </div>
      )}
      <div className={`tp-chat-bubble ${pending ? 'is-pending' : ''}`}>
        {pending ? (
          <span className="tp-chat-typing" aria-label="Recherche en cours">
            <i />
            <i />
            <i />
          </span>
        ) : children}
      </div>
    </div>
  );
}

