/**
 * AdminLeadDetailPanel — Slide-over detail panel for a lead
 * TODO: Connect edit/save actions to Supabase when backend is ready.
 */
import type { Lead } from '../../types/admin';
import { adminUsers } from '../../data/admin-demo.data';
import AdminStatusBadge from './AdminStatusBadge';

interface Props {
  lead: Lead;
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

export default function AdminLeadDetailPanel({ lead, onClose }: Props) {
  const assignedUser = adminUsers.find((u) => u.id === lead.assignedAdmin);

  const scoreClass = lead.score >= 70 ? 'high' : lead.score >= 40 ? 'medium' : 'low';

  return (
    <>
      <div className="admin-panel-overlay" onClick={onClose} />
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h3 className="admin-panel-title">Détail du lead</h3>
          <button className="admin-panel-close" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="admin-panel-body">
          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Nom</div>
            <div className="admin-panel-field-value" style={{ fontWeight: 600, fontSize: '1.125rem', color: '#192B63' }}>
              {lead.name}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Statut</div>
              <div className="admin-panel-field-value"><AdminStatusBadge status={lead.status} /></div>
            </div>
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Source</div>
              <div className="admin-panel-field-value"><AdminStatusBadge status={lead.source} /></div>
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Email</div>
            <div className="admin-panel-field-value">{lead.email}</div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Téléphone</div>
            <div className="admin-panel-field-value">{lead.phone}</div>
          </div>

          {lead.company && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Entreprise</div>
              <div className="admin-panel-field-value">{lead.company}</div>
            </div>
          )}

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Score de qualification</div>
            <div className="admin-panel-field-value">
              <div className="admin-score-bar">
                <div className="admin-score-track" style={{ maxWidth: 120 }}>
                  <div
                    className={`admin-score-fill ${scoreClass}`}
                    style={{ width: `${lead.score}%` }}
                  />
                </div>
                <span className="admin-score-value">{lead.score}/100</span>
              </div>
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Assigné à</div>
            <div className="admin-panel-field-value">
              {assignedUser ? assignedUser.name : 'Non assigné'}
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Dernière interaction</div>
            <div className="admin-panel-field-value">{formatDate(lead.lastInteraction)}</div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Créé le</div>
            <div className="admin-panel-field-value">{formatDate(lead.createdAt)}</div>
          </div>


        </div>

        <div className="admin-panel-footer">
          <button className="admin-btn admin-btn-primary" disabled>
            Modifier
          </button>
          <button className="admin-btn admin-btn-secondary" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}
