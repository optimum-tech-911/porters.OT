/**
 * AdminMessageDetailPanel — Slide-over detail panel for a message
 * TODO: Connect status change and assignment to Supabase when backend is ready.
 */
import type { ContactMessage } from '../../types/admin';
import { adminUsers } from '../../data/admin-demo.data';
import AdminStatusBadge from './AdminStatusBadge';

interface Props {
  message: ContactMessage;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminMessageDetailPanel({ message, onClose }: Props) {
  const assignedUser = adminUsers.find((u) => u.id === message.assignedAdmin);

  return (
    <>
      <div className="admin-panel-overlay" onClick={onClose} />
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h3 className="admin-panel-title">Détail du message</h3>
          <button className="admin-panel-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="admin-panel-body">
          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Expéditeur</div>
            <div className="admin-panel-field-value" style={{ fontWeight: 600, fontSize: '1.125rem', color: '#192B63' }}>
              {message.senderName}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Statut</div>
              <div className="admin-panel-field-value"><AdminStatusBadge status={message.status} /></div>
            </div>
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Priorité</div>
              <div className="admin-panel-field-value"><AdminStatusBadge status={message.priority} /></div>
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Email</div>
            <div className="admin-panel-field-value">{message.email}</div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Téléphone</div>
            <div className="admin-panel-field-value">{message.phone}</div>
          </div>

          {message.company && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Entreprise</div>
              <div className="admin-panel-field-value">{message.company}</div>
            </div>
          )}

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Page source</div>
            <div className="admin-panel-field-value" style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
              {message.sourcePage}
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Message</div>
            <div className="admin-panel-field-value" style={{ background: 'var(--admin-bg)', padding: '1rem', borderRadius: 'var(--admin-radius-sm)', lineHeight: 1.6 }}>
              {message.message}
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Assigné à</div>
            <div className="admin-panel-field-value">
              {assignedUser ? assignedUser.name : 'Non assigné'}
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Reçu le</div>
            <div className="admin-panel-field-value">{formatDate(message.createdAt)}</div>
          </div>


        </div>

        <div className="admin-panel-footer">
          <button className="admin-btn admin-btn-primary" disabled>
            Répondre
          </button>
          <button className="admin-btn admin-btn-secondary" disabled>
            Assigner
          </button>
          <button className="admin-btn admin-btn-ghost" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}
