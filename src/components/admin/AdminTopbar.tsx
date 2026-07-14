import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { CmsAdmin } from '../../types/cms';

interface Props {
  pageTitle: string;
}

export default function AdminTopbar({ pageTitle }: Props) {
  const [currentUser, setCurrentUser] = useState<CmsAdmin | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: admin } = await supabase
        .from('cms_admins')
        .select('user_id,display_name,role,enabled')
        .eq('user_id', data.user.id)
        .maybeSingle();
      if (admin) setCurrentUser(admin as CmsAdmin);
    });
  }, []);

  const handleHamburger = () => {
    document.dispatchEvent(new CustomEvent('admin-toggle-sidebar'));
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.replace('/admin/login');
  };

  const displayName = currentUser?.display_name || 'Administrateur';
  const initials = displayName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

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
        {/* Profile */}
        <div className="admin-topbar-profile">
          <div className="admin-topbar-avatar">
            {initials}
          </div>
          <div className="admin-topbar-profile-info">
            <div className="admin-topbar-profile-name">{displayName}</div>
            <div className="admin-topbar-profile-role">
              {currentUser?.role === 'owner' ? 'Propriétaire' : 'Éditeur'}
            </div>
          </div>
          <button type="button" className="admin-topbar-logout" onClick={logout} title="Se déconnecter" aria-label="Se déconnecter">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5M21 12H9" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
