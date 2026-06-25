/**
 * AdminEmptyState — Generic empty state with icon and message
 */
interface Props {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export default function AdminEmptyState({
  title = 'Aucun résultat',
  message = 'Aucune donnée ne correspond à vos critères.',
  action,
}: Props) {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="15" x2="16" y2="15" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      <p className="admin-empty-title">{title}</p>
      <p className="admin-empty-message">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
