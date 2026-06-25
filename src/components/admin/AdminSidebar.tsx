/**
 * AdminSidebar — Dark navy sidebar navigation
 * Uses brand palette. Active state with gold accent.
 * TODO: When Supabase Auth is connected, show current user's permissions
 *       and only display nav items they have access to.
 */
import { adminNavItems } from '../../data/admin-demo.data';

const iconMap: Record<string, JSX.Element> = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  messages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
  leads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  meetings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  calculator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10.01" /><line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" /><line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" /><line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" /><line x1="12" y1="18" x2="16" y2="18" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  ),
};

const groupLabels: Record<string, string> = {
  main: '',
  communication: 'Communication',
  tools: 'Outils',
  management: 'Gestion',
};

interface Props {
  currentPath: string;
}

export default function AdminSidebar({ currentPath }: Props) {
  const groups = ['main', 'communication', 'tools', 'management'] as const;

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return currentPath === '/admin' || currentPath === '/admin/' || currentPath === '/admin/dashboard' || currentPath === '/admin/dashboard/';
    }
    return currentPath === href || currentPath === href + '/';
  };

  return (
    <aside className="admin-sidebar" id="admin-sidebar">
      {/* Brand */}
      <div className="admin-sidebar-brand">
        <a href="/admin/dashboard" style={{ textDecoration: 'none' }}>
          <div className="brand-wordmark brand-wordmark-light" style={{ transform: 'scale(0.85)', transformOrigin: 'left' }}>
            <span className="brand-wordmark-the">The</span>
            <span className="brand-wordmark-porters">Porters</span>
          </div>
        </a>
        <div style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.25rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Administration
        </div>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">
        {groups.map((group) => {
          const items = adminNavItems.filter((item) => item.group === group);
          if (items.length === 0) return null;
          return (
            <div className="admin-sidebar-group" key={group}>
              {groupLabels[group] && (
                <div className="admin-sidebar-group-label">{groupLabels[group]}</div>
              )}
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-item${isActive(item.href) ? ' active' : ''}`}
                >
                  <span className="admin-nav-icon">
                    {iconMap[item.icon] || null}
                  </span>
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="admin-nav-badge">{item.badge}</span>
                  )}
                </a>
              ))}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="admin-sidebar-footer">
        <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)' }}>
          © 2026 The Porters
        </div>
      </div>
    </aside>
  );
}
