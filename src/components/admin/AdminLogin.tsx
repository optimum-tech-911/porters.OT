import { useEffect, useState, type SubmitEvent } from 'react';
import { supabase } from '../../lib/supabase';

function safeNext(): string {
  const next = new URLSearchParams(window.location.search).get('next');
  return next?.startsWith('/admin') && !next.startsWith('/admin/login') ? next : '/admin/dashboard';
}

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get('error');
    if (reason === 'unauthorized') setError('Ce compte existe, mais il n’est pas autorisé à administrer le site.');

    void supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) return;
      const { data: admin } = await supabase
        .from('cms_admins')
        .select('user_id')
        .eq('user_id', data.session.user.id)
        .eq('enabled', true)
        .in('role', ['owner', 'editor'])
        .maybeSingle();
      if (admin) window.location.replace(safeNext());
    });
  }, []);

  async function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError || !data.user) {
      setError('Adresse e-mail ou mot de passe incorrect.');
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from('cms_admins')
      .select('user_id')
      .eq('user_id', data.user.id)
      .eq('enabled', true)
      .in('role', ['owner', 'editor'])
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setError('Ce compte n’est pas autorisé à administrer le site.');
      setLoading(false);
      return;
    }

    window.location.replace(safeNext());
  }

  return (
    <main className="admin-login-shell">
      <section className="admin-login-brand" aria-label="The Porters">
        <div>
          <span className="admin-login-kicker">Administration sécurisée</span>
          <h1>Le contenu du site,<br />simplement maîtrisé.</h1>
          <p>Modifiez les textes directement sur les vraies pages, prévisualisez vos changements et publiez-les sans redéployer le site.</p>
        </div>
        <small>Supabase Auth · Historique des versions · Publication instantanée</small>
      </section>

      <section className="admin-login-panel">
        <form className="admin-login-card" onSubmit={submit}>
          <div className="admin-login-wordmark">
            <span>The</span>
            <strong>Porters</strong>
          </div>
          <p className="admin-login-eyebrow">Espace administrateur</p>
          <h2>Connexion</h2>
          <p className="admin-login-intro">Utilisez le compte approuvé associé à votre équipe.</p>

          <label htmlFor="admin-email">Adresse e-mail</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="admin-password">Mot de passe</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <div className="admin-login-error" role="alert">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Connexion…' : 'Accéder à l’administration'}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
          <p className="admin-login-help">L’accès est réservé aux comptes administrateurs approuvés.</p>
        </form>
      </section>
    </main>
  );
}
