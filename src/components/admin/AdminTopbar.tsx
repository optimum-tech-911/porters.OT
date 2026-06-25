/**
 * AdminTopbar — Sticky top bar with search, notifications, profile
 * TODO: Connect search to Supabase full-text search when backend is ready.
 * TODO: Connect notification bell to real-time Supabase notifications.
 */
import { notifications as allNotifications, adminUsers } from '../../data/admin-demo.data';

interface Props {
  pageTitle: string;
}

export default function AdminTopbar({ pageTitle }: Props) {
  const unreadCount = allNotifications.filter((n) => !n.read).length;
  const currentUser = adminUsers[0]; // Demo: always Guillaume

  const handleHamburger = () => {
    document.dispatchEvent(new CustomEvent('admin-toggle-sidebar'));
  };

  return (
    <header className="admin-topbar">
      {/* Hamburger (mobile) */}
      <button
        className="admin-hamburger"
        onClick={handleHamburger}
        aria-label="Ouvrir le menu"
        type="button"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Left side */}
      <div className="admin-topbar-left">
        <h1 className="admin-topbar-title">{pageTitle}</h1>

        {/* Search */}
        <div className="admin-topbar-search">
          <svg className="admin-topbar-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher..."
            aria-label="Rechercher"
            readOnly
          />
          {/* TODO: Connect to Supabase search */}
        </div>
      </div>

      {/* Right side */}
      <div className="admin-topbar-right">
        {/* Notifications bell */}
        <a href="/admin/notifications" className="admin-topbar-btn" aria-label="Notifications" style={{ textDecoration: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          {unreadCount > 0 && <span className="admin-topbar-badge" />}
        </a>

        {/* Profile */}
        <div className="admin-topbar-profile">
          <div className="admin-topbar-avatar">
            {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div className="admin-topbar-profile-info">
            <div className="admin-topbar-profile-name">{currentUser.name}</div>
            <div className="admin-topbar-profile-role">
              {currentUser.role === 'owner' ? 'Propriétaire' : currentUser.role}
            </div>
          </div>
          {/* TODO: Add dropdown menu with logout, profile settings */}
        </div>
      </div>
    </header>
  );
}
