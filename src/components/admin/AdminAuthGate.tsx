import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminAuthGate() {
  const [message, setMessage] = useState('Vérification de votre session…');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let active = true;

    const withTimeout = async <T,>(request: PromiseLike<T>, timeout = 9000): Promise<T> => {
      let timeoutId = 0;
      try {
        return await Promise.race([
          Promise.resolve(request),
          new Promise<T>((_, reject) => {
            timeoutId = window.setTimeout(
              () => reject(new Error('La vérification administrateur a expiré.')),
              timeout,
            );
          }),
        ]);
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    async function verify() {
      try {
        setError('');
        const { data: { session }, error: sessionError } = await withTimeout(supabase.auth.getSession());
        if (!active) return;

        if (sessionError || !session) {
          const next = `${window.location.pathname}${window.location.search}`;
          window.location.replace(`/admin/login?next=${encodeURIComponent(next)}`);
          return;
        }

        setMessage('Vérification de vos autorisations…');
        const { data: admin, error: adminError } = await withTimeout(
          supabase
            .from('cms_admins')
            .select('user_id,enabled,role')
            .eq('user_id', session.user.id)
            .eq('enabled', true)
            .in('role', ['owner', 'editor'])
            .maybeSingle(),
        );

        if (!active) return;
        if (adminError || !admin) {
          await supabase.auth.signOut();
          window.location.replace('/admin/login?error=unauthorized');
          return;
        }

        setVerified(true);
      } catch (verificationError) {
        if (!active) return;
        console.warn('[Admin auth] Verification failed:', verificationError);
        setError('La connexion au tableau de bord n’a pas pu être vérifiée. Votre contenu reste intact.');
        setMessage('Tableau de bord momentanément indisponible');
      }
    }

    void verify();
    return () => { active = false; };
  }, []);

  if (verified) return null;

  return (
    <div className={`admin-auth-gate${error ? ' admin-auth-gate--error' : ''}`} role={error ? 'alert' : 'status'} aria-live="polite">
      <div className="admin-auth-panel">
        <span className="admin-auth-mark" aria-hidden="true">TP</span>
        {!error && <span className="admin-auth-spinner" aria-hidden="true" />}
        <p>{message}</p>
        {error && <small>{error}</small>}
        {error && (
          <div className="admin-auth-actions">
            <button type="button" onClick={() => window.location.reload()}>Réessayer</button>
            <a href="/admin/login">Revenir à la connexion</a>
          </div>
        )}
      </div>
    </div>
  );
}
