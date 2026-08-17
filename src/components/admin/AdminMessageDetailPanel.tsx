/** AdminMessageDetailPanel — Slide-over detail panel for a CRM message. */
import { useEffect, useState } from 'react';
import type { ContactMessage } from '../../types/admin';
import { adminUsers } from '../../data/admin-demo.data';
import { supabase } from '../../lib/supabase';
import AdminStatusBadge from './AdminStatusBadge';

interface Props {
  message: ContactMessage;
  onClose: () => void;
  onUpdated: (message: ContactMessage) => void;
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

const databaseStatus: Record<ContactMessage['status'], string> = {
  new: 'new',
  assigned: 'contacted',
  answered: 'qualified',
  archived: 'archived',
};

export default function AdminMessageDetailPanel({ message, onClose, onUpdated }: Props) {
  const [status, setStatus] = useState<ContactMessage['status']>(message.status);
  const [priority, setPriority] = useState<ContactMessage['priority']>(message.priority);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setStatus(message.status);
    setPriority(message.priority);
    setFeedback('');
  }, [message.id, message.priority, message.status]);

  const assignedUser = adminUsers.find((u) => u.id === message.assignedAdmin);

  async function saveMessage() {
    setSaving(true);
    setFeedback('');
    const { error } = await supabase
      .from('crm_inquiries')
      .update({ status: databaseStatus[status], priority })
      .eq('id', message.id);
    setSaving(false);
    if (error) {
      console.error('[Admin] Unable to update message:', error);
      setFeedback('La mise à jour a échoué. Vérifiez votre session admin.');
      return;
    }
    onUpdated({ ...message, status, priority });
    setFeedback('Message mis à jour.');
  }

  async function assignToMe() {
    setSaving(true);
    setFeedback('');
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setSaving(false);
      setFeedback('Votre session admin doit être reconnectée.');
      return;
    }
    const nextStatus: ContactMessage['status'] = status === 'new' ? 'assigned' : status;
    const { error } = await supabase
      .from('crm_inquiries')
      .update({ assigned_admin: userData.user.id, status: databaseStatus[nextStatus], priority })
      .eq('id', message.id);
    setSaving(false);
    if (error) {
      console.error('[Admin] Unable to assign message:', error);
      setFeedback('L’assignation a échoué.');
      return;
    }
    setStatus(nextStatus);
    onUpdated({ ...message, status: nextStatus, priority, assignedAdmin: userData.user.id });
    setFeedback('Message assigné à votre compte.');
  }

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
              <div className="admin-panel-field-value"><AdminStatusBadge status={status} /></div>
            </div>
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Priorité</div>
              <div className="admin-panel-field-value"><AdminStatusBadge status={priority} /></div>
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

          {message.subject && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Sujet</div>
              <div className="admin-panel-field-value">{message.subject}</div>
            </div>
          )}

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Page source</div>
            <div className="admin-panel-field-value" style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>
              {message.sourcePage}
            </div>
          </div>

          {(message.landingPage || message.utmSource || message.referrer || message.sessionId) && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Attribution</div>
              <div className="admin-panel-field-value" style={{ display: 'grid', gap: '.35rem', fontSize: '.8125rem' }}>
                {message.landingPage && <span>Arrivée : {message.landingPage}</span>}
                {message.utmSource && <span>UTM : {[message.utmSource, message.utmMedium, message.utmCampaign, message.utmContent, message.utmTerm].filter(Boolean).join(' · ')}</span>}
                {message.referrer && <span>Référent : {message.referrer}</span>}
                {message.sessionId && <span>Session : {message.sessionId}</span>}
              </div>
            </div>
          )}

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Message</div>
            <div className="admin-panel-field-value" style={{ background: 'var(--admin-bg)', padding: '1rem', borderRadius: 'var(--admin-radius-sm)', lineHeight: 1.6 }}>
              {message.message}
            </div>
          </div>

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Assigné à</div>
            <div className="admin-panel-field-value">
              {assignedUser ? assignedUser.name : message.assignedAdmin ? 'Votre équipe admin' : 'Non assigné'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="admin-panel-field">
              <label className="admin-panel-field-label" htmlFor="message-status">Changer le statut</label>
              <select id="message-status" className="admin-filter-select" value={status} onChange={(event) => setStatus(event.target.value as ContactMessage['status'])}>
                <option value="new">Nouveau</option>
                <option value="assigned">Assigné</option>
                <option value="answered">Répondu</option>
                <option value="archived">Archivé</option>
              </select>
            </div>
            <div className="admin-panel-field">
              <label className="admin-panel-field-label" htmlFor="message-priority">Priorité</label>
              <select id="message-priority" className="admin-filter-select" value={priority} onChange={(event) => setPriority(event.target.value as ContactMessage['priority'])}>
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>
          </div>

          {feedback && <p className="admin-panel-field-value" role="status">{feedback}</p>}

          <div className="admin-panel-field">
            <div className="admin-panel-field-label">Reçu le</div>
            <div className="admin-panel-field-value">{formatDate(message.createdAt)}</div>
          </div>


        </div>

        <div className="admin-panel-footer">
          <a className="admin-btn admin-btn-primary" href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || 'Votre demande The Porters'}`)}`}>
            Répondre
          </a>
          <button className="admin-btn admin-btn-secondary" type="button" disabled={saving} onClick={() => void saveMessage()}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
          <button className="admin-btn admin-btn-secondary" type="button" disabled={saving} onClick={() => void assignToMe()}>
            M’assigner
          </button>
          <button className="admin-btn admin-btn-ghost" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}
