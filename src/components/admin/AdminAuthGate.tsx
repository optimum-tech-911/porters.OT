import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminAuthGate() {
  const [message, setMessage] = useState('Vérification de votre session…');

  useEffect(() => {
    let active = true;

    async function verify() {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (!active) return;

      if (sessionError || !session) {
        const next = `${window.location.pathname}${window.location.search}`;
        window.location.replace(`/admin/login?next=${encodeURIComponent(next)}`);
        return;
      }

      setMessage('Vérification de vos autorisations…');
      const { data: admin, error: adminError } = await supabase
        .from('cms_admins')
        .select('user_id,enabled,role')
        .eq('user_id', session.user.id)
        .eq('enabled', true)
        .in('role', ['owner', 'editor'])
        .maybeSingle();

      if (!active) return;
      if (adminError || !admin) {
        await supabase.auth.signOut();
        window.location.replace('/admin/login?error=unauthorized');
        return;
      }

      document.body.classList.remove('admin-auth-pending');
    }

    void verify();
    return () => { active = false; };
  }, []);

  return (
    <div className="admin-auth-gate" role="status" aria-live="polite">
      <span className="admin-auth-spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
