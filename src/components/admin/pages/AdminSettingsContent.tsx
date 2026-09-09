import { useState, type SubmitEvent } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import { supabase } from '../../../lib/supabase';

export default function AdminSettingsContent() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [securityMessage, setSecurityMessage] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  async function updatePassword(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSecurityMessage('');
    setSecurityError('');

    if (newPassword.length < 12) {
      setSecurityError('Le nouveau mot de passe doit contenir au moins 12 caractères.');
      return;
    }
    if (newPassword !== confirmation) {
      setSecurityError('Les deux mots de passe ne correspondent pas.');
      return;
    }

    setSavingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setSavingPassword(false);
    if (error) {
      setSecurityError(error.message || 'Le mot de passe n’a pas pu être modifié.');
      return;
    }

    setNewPassword('');
    setConfirmation('');
    setSecurityMessage('Mot de passe modifié avec succès. Utilisez-le lors de votre prochaine connexion.');
  }

  return (
    <div>
      <AdminPageHeader
        title="Paramètres"
        subtitle="Sécurité de votre compte administrateur"
      />

      <form className="admin-card" style={{ marginBottom: '1.5rem' }} onSubmit={updatePassword}>
        <div className="admin-settings-section">
          <h3 className="admin-settings-section-title">Sécurité du compte</h3>
          <p style={{ margin: '-0.4rem 0 1rem', color: 'var(--admin-text-secondary)', fontSize: '0.75rem', lineHeight: 1.6 }}>
            Remplacez immédiatement tout mot de passe temporaire. La modification est enregistrée directement dans Supabase Auth.
          </p>
          <div className="admin-settings-row">
            <div>
              <label className="admin-settings-label" htmlFor="new-admin-password">Nouveau mot de passe</label>
              <div className="admin-settings-description">12 caractères minimum</div>
            </div>
            <input
              id="new-admin-password"
              className="admin-settings-input"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              minLength={12}
              required
            />
          </div>
          <div className="admin-settings-row">
            <div>
              <label className="admin-settings-label" htmlFor="confirm-admin-password">Confirmation</label>
              <div className="admin-settings-description">Saisissez le même mot de passe</div>
            </div>
            <input
              id="confirm-admin-password"
              className="admin-settings-input"
              type="password"
              autoComplete="new-password"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              minLength={12}
              required
            />
          </div>
          {securityError && <div className="cms-admin-alert cms-admin-alert--error" role="alert">{securityError}</div>}
          {securityMessage && <div className="cms-admin-alert cms-admin-alert--success" role="status">{securityMessage}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="admin-btn admin-btn-primary" type="submit" disabled={savingPassword}>
              {savingPassword ? 'Modification…' : 'Modifier le mot de passe'}
            </button>
          </div>
        </div>
      </form>

    </div>
  );
}
