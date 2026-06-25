/**
 * AdminTeamContent — Team/admin member management
 * TODO: Connect to Supabase Auth users table when backend is ready.
 */
import AdminPageHeader from '../AdminPageHeader';
import AdminStatusBadge from '../AdminStatusBadge';
import { adminUsers } from '../../../data/admin-demo.data';

const roleLabels: Record<string, string> = {
  owner: 'Propriétaire',
  manager: 'Manager',
  sales: 'Commercial',
  consultant: 'Consultant',
  viewer: 'Lecteur',
};

const permissionLabels: Record<string, string> = {
  all: 'Accès complet',
  messages: 'Messages',
  leads: 'Leads',
  meetings: 'Rendez-vous',
  calendar: 'Calendrier',
  analytics: 'Analytics',
  team: 'Équipe',
};

export default function AdminTeamContent() {
  return (
    <div>
      <AdminPageHeader
        title="Équipe"
        subtitle={`${adminUsers.length} membres de l'équipe`}
      >
        <button className="admin-btn admin-btn-primary" disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Inviter un membre
        </button>
      </AdminPageHeader>

      <div className="admin-grid-3" style={{ marginBottom: '1.5rem' }}>
        {adminUsers.map((user) => (
          <div key={user.id} className="admin-team-card">
            <div className="admin-team-avatar">
              {user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
            </div>
            <div className="admin-team-name">{user.name}</div>
            <div className="admin-team-email">{user.email}</div>
            <AdminStatusBadge status={user.role} label={roleLabels[user.role]} />

            <div className="admin-team-meta">
              <div className="admin-team-meta-row">
                <span className="admin-team-meta-label">Statut</span>
                <span className="admin-team-meta-value">
                  <AdminStatusBadge status={user.status} />
                </span>
              </div>
              <div className="admin-team-meta-row">
                <span className="admin-team-meta-label">Calendrier</span>
                <span className="admin-team-meta-value">
                  {user.permissions.includes('calendar') || user.permissions.includes('all') ? 'Assigné' : 'Non assigné'}
                </span>
              </div>
              <div className="admin-team-meta-row">
                <span className="admin-team-meta-label">Notifications</span>
                <span className="admin-team-meta-value">
                  {user.notificationPrefs ? (
                    <span style={{ fontSize: '0.6875rem' }}>
                      {user.notificationPrefs.email ? 'Email' : ''}{' '}
                      {user.notificationPrefs.inApp ? 'App' : ''}{' '}
                      {user.notificationPrefs.sms ? 'SMS' : ''}
                    </span>
                  ) : '—'}
                </span>
              </div>
            </div>

            {/* Permissions */}
            <div style={{ marginTop: '0.75rem', width: '100%' }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--admin-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.375rem' }}>
                Permissions
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {user.permissions.map((perm) => (
                  <span
                    key={perm}
                    style={{
                      padding: '0.125rem 0.5rem',
                      borderRadius: 100,
                      fontSize: '0.625rem',
                      fontWeight: 500,
                      background: 'rgba(25,43,99,0.06)',
                      color: 'var(--admin-text-secondary)',
                    }}
                  >
                    {permissionLabels[perm] || perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
}
