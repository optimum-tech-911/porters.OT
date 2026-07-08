import { emitAssistantEvent, type AssistantResponse } from '../../lib/searchAssistant';

interface Props {
  response: AssistantResponse;
}

const categoryLabels: Record<string, string> = {
  page: 'Page',
  consultant: 'Consultants',
  entreprise: 'Entreprises',
  expertise: 'Expertise',
  faq: 'FAQ',
  agence: 'Agence',
  article: 'Article',
  ressource: 'Ressource',
  legal: 'Information légale',
};

export default function SearchResults({ response }: Props) {
  const trackClick = (url: string) => emitAssistantEvent('chatbot_result_clicked', { url });

  return (
    <div className="tp-chat-results">
      <div className="tp-chat-actions">
        {response.actions.map((action) => (
          <a
            key={`${action.url}-${action.label}`}
            href={action.url}
            className={action.primary ? 'is-primary' : undefined}
            onClick={() => trackClick(action.url)}
          >
            <span>{action.label}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 8h9M9 4.5 12.5 8 9 11.5" />
            </svg>
          </a>
        ))}
      </div>

      {response.confidence === 'low' && response.related.length > 0 && (
        <div className="tp-chat-related">
          <p>Pages proches</p>
          {response.related.map((item) => (
            <a key={item.id} href={item.url} onClick={() => trackClick(item.url)}>
              <span>
                <small>{categoryLabels[item.category] ?? item.category}</small>
                <strong>{item.title}</strong>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

