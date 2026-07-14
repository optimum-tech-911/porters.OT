import { useEffect, useState, type SubmitEvent } from 'react';
import { supabase } from '../../lib/supabase';

function safeNext(): string {
  const next = new URLSearchParams(window.location.search).get('next');
  return next?.startsWith('/admin') && !next.startsWith('/admin/login') ? next : '/admin/dashboard';
}

export default function AdminLogin() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const reason = new URLSearchParams(window.location.search).get('error');
    if (reason === 'unauthorized') setError('Ce compte existe, mais il n’est pas autorisé à administrer le site.');
    if (new URLSearchParams(window.location.search).get('registered') === 'confirmed') {
      setNotice('Votre adresse e-mail est confirmée. Un propriétaire doit maintenant approuver ce compte avant tout accès à l’administration.');
    }

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
    setNotice('');

    if (mode === 'signup') {
      if (password !== passwordConfirmation) {
        setError('Les deux mots de passe ne correspondent pas.');
        setLoading(false);
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin/login?registered=confirmed` },
      });

      if (signUpError) {
        setError(signUpError.message || 'La création du compte a échoué.');
        setLoading(false);
        return;
      }

      if (data.session) await supabase.auth.signOut();
      setLoading(false);
      setPassword('');
      setPasswordConfirmation('');
      setNotice(data.session
        ? 'Compte créé. Il reste bloqué jusqu’à son approbation par un propriétaire dans la liste des administrateurs.'
        : 'Compte créé. Consultez votre e-mail pour confirmer votre adresse. Après confirmation, un propriétaire devra encore approuver votre accès.');
      return;
    }

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
          <h2>{mode === 'signin' ? 'Connexion' : 'Créer un compte'}</h2>
          <p className="admin-login-intro">{mode === 'signin'
            ? 'Utilisez le compte approuvé associé à votre équipe.'
            : 'Créez votre identité sécurisée. L’accès restera bloqué jusqu’à l’approbation d’un propriétaire.'}</p>

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
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />

          {mode === 'signup' && <>
            <label htmlFor="admin-password-confirmation">Confirmer le mot de passe</label>
            <input
              id="admin-password-confirmation"
              type="password"
              autoComplete="new-password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              minLength={8}
              required
            />
          </>}

          {error && <div className="admin-login-error" role="alert">{error}</div>}
          {notice && <div className="admin-login-success" role="status">{notice}</div>}

          <button type="submit" disabled={loading}>
            {loading ? (mode === 'signin' ? 'Connexion…' : 'Création…') : (mode === 'signin' ? 'Accéder à l’administration' : 'Créer mon compte')}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
          <button type="button" className="admin-login-switch" onClick={() => {
            setMode((current) => current === 'signin' ? 'signup' : 'signin');
            setError('');
            setNotice('');
            setPassword('');
            setPasswordConfirmation('');
          }}>{mode === 'signin' ? 'Créer un compte' : 'J’ai déjà un compte'}</button>
          <p className="admin-login-help">Créer un compte ne donne aucun droit d’administration. Seuls les comptes approuvés dans Supabase peuvent entrer.</p>
        </form>
      </section>
    </main>
  );
}
