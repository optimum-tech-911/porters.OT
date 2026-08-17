/** AdminLeadDetailPanel — Slide-over detail panel for a CRM lead. */
import { useEffect, useState } from 'react';
import type { Lead } from '../../types/admin';
import { adminUsers } from '../../data/admin-demo.data';
import { supabase } from '../../lib/supabase';
import AdminStatusBadge from './AdminStatusBadge';

interface Props {
  lead: Lead;
  onClose: () => void;
  onUpdated: (lead: Lead) => void;
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

const databaseStatus: Record<Lead['status'], string> = {
  new: 'new',
  contacted: 'contacted',
  qualified: 'qualified',
  proposal: 'proposal',
  converted: 'converted',
  lost: 'archived',
};

export default function AdminLeadDetailPanel({ lead, onClose, onUpdated }: Props) {
  const [status, setStatus] = useState<Lead['status']>(lead.status);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setStatus(lead.status);
    setFeedback('');
  }, [lead.id, lead.status]);

  const assignedUser = adminUsers.find((u) => u.id === lead.assignedAdmin);

  const scoreClass = lead.score >= 70 ? 'high' : lead.score >= 40 ? 'medium' : 'low';

  async function saveStatus() {
    setSaving(true);
    setFeedback('');
    const { error } = await supabase
      .from('crm_inquiries')
      .update({ status: databaseStatus[status] })
      .eq('id', lead.id);
    setSaving(false);
    if (error) {
      console.error('[Admin] Unable to update lead:', error);
      setFeedback('La mise à jour a échoué. Vérifiez votre session admin.');
      return;
    }
    onUpdated({ ...lead, status, lastInteraction: new Date().toISOString() });
    setFeedback('Statut enregistré.');
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
    const nextStatus: Lead['status'] = status === 'new' ? 'contacted' : status;
    const { error } = await supabase
      .from('crm_inquiries')
      .update({ assigned_admin: userData.user.id, status: databaseStatus[nextStatus] })
      .eq('id', lead.id);
    setSaving(false);
    if (error) {
      console.error('[Admin] Unable to assign lead:', error);
      setFeedback('L’assignation a échoué.');
      return;
    }
    setStatus(nextStatus);
    onUpdated({ ...lead, status: nextStatus, assignedAdmin: userData.user.id, lastInteraction: new Date().toISOString() });
    setFeedback('Lead assigné à votre compte.');
  }

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
              <div className="admin-panel-field-value"><AdminStatusBadge status={status} /></div>
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

          {lead.profile && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Profil métier</div>
              <div className="admin-panel-field-value">{lead.profile}</div>
            </div>
          )}

          {lead.source === 'simulator' && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Scénario de simulation</div>
              <div className="admin-panel-field-value" style={{ display: 'grid', gap: '.45rem', background: 'var(--admin-bg)', padding: '1rem', borderRadius: 'var(--admin-radius-sm)' }}>
                <span>Parcours : {lead.simulatorMode === 'freelance' ? 'Activité freelance' : 'Portage salarial'}</span>
                {typeof lead.monthlyRevenue === 'number' && <span>CA mensuel : {lead.monthlyRevenue.toLocaleString('fr-FR')} €</span>}
                {lead.simulatorMode === 'freelance' && typeof lead.tjm === 'number' && <span>TJM : {lead.tjm.toLocaleString('fr-FR')} €</span>}
                {lead.simulatorMode === 'freelance' && typeof lead.daysWorked === 'number' && <span>Jours facturés : {lead.daysWorked}</span>}
                {typeof lead.professionalExpenses === 'number' && <span>Frais professionnels : {lead.professionalExpenses.toLocaleString('fr-FR')} €</span>}
                {typeof lead.estimatedNetMonthly === 'number' && <strong>Net mensuel estimé : {lead.estimatedNetMonthly.toLocaleString('fr-FR')} €</strong>}
              </div>
            </div>
          )}

          {lead.message && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Contexte</div>
              <div className="admin-panel-field-value">{lead.message}</div>
            </div>
          )}

          {(lead.sourcePage || lead.landingPage || lead.utmSource || lead.referrer || lead.sessionId) && (
            <div className="admin-panel-field">
              <div className="admin-panel-field-label">Attribution</div>
              <div className="admin-panel-field-value" style={{ display: 'grid', gap: '.35rem', fontSize: '.8125rem' }}>
                {lead.sourcePage && <span>Page : {lead.sourcePage}</span>}
                {lead.landingPage && <span>Arrivée : {lead.landingPage}</span>}
                {lead.utmSource && <span>UTM : {[lead.utmSource, lead.utmMedium, lead.utmCampaign, lead.utmContent, lead.utmTerm].filter(Boolean).join(' · ')}</span>}
                {lead.referrer && <span>Référent : {lead.referrer}</span>}
                {lead.sessionId && <span>Session : {lead.sessionId}</span>}
              </div>
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
              {assignedUser ? assignedUser.name : lead.assignedAdmin ? 'Votre équipe admin' : 'Non assigné'}
            </div>
          </div>

          <div className="admin-panel-field">
            <label className="admin-panel-field-label" htmlFor="lead-status">Changer le statut</label>
            <select
              id="lead-status"
              className="admin-filter-select"
              value={status}
              onChange={(event) => setStatus(event.target.value as Lead['status'])}
            >
              <option value="new">Nouveau</option>
              <option value="contacted">Contacté</option>
              <option value="qualified">Qualifié</option>
              <option value="proposal">Proposition</option>
              <option value="converted">Converti</option>
              <option value="lost">Archivé / perdu</option>
            </select>
          </div>

          {feedback && <p className="admin-panel-field-value" role="status">{feedback}</p>}

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
          <button className="admin-btn admin-btn-primary" type="button" disabled={saving} onClick={() => void saveStatus()}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </button>
          <button className="admin-btn admin-btn-secondary" type="button" disabled={saving} onClick={() => void assignToMe()}>
            M’assigner
          </button>
          <a className="admin-btn admin-btn-secondary" href={`mailto:${lead.email}?subject=${encodeURIComponent(`Votre demande The Porters`)}`}>
            Contacter
          </a>
          <button className="admin-btn admin-btn-ghost" type="button" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </>
  );
}
