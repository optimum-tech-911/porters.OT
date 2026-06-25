/**
 * AdminSettingsContent — Admin settings page (demo)
 * TODO: Connect all settings to Supabase when backend is ready.
 * TODO: Before production, /admin must be protected with Supabase Auth + RLS,
 *       or temporarily hidden behind Cloudflare Access / password protection.
 */
import AdminPageHeader from '../AdminPageHeader';
import { formulaSettings } from '../../../data/admin-demo.data';

export default function AdminSettingsContent() {
  return (
    <div>
      <AdminPageHeader
        title="Paramètres"
        subtitle="Configuration de l'espace d'administration"
      >
        <button className="admin-btn admin-btn-primary" disabled>
          Enregistrer
        </button>
      </AdminPageHeader>

      {/* Company Info */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-settings-section">
          <h3 className="admin-settings-section-title">Informations de l'entreprise</h3>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Nom de l'entreprise</div>
              <div className="admin-settings-description">Nom affiché dans l'admin</div>
            </div>
            <input className="admin-settings-input" value="The Porters" disabled />
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Site web</div>
              <div className="admin-settings-description">URL du site public</div>
            </div>
            <input className="admin-settings-input" value="https://www.porters.fr" disabled />
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Email de contact</div>
              <div className="admin-settings-description">Email principal de l'entreprise</div>
            </div>
            <input className="admin-settings-input" value="contact@porters.fr" disabled />
          </div>
        </div>
      </div>

      {/* Admin Preferences */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-settings-section">
          <h3 className="admin-settings-section-title">Préférences d'administration</h3>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Langue de l'interface</div>
              <div className="admin-settings-description">Langue affichée dans l'admin</div>
            </div>
            <select className="admin-filter-select" disabled>
              <option>Français</option>
            </select>
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Fuseau horaire</div>
            </div>
            <select className="admin-filter-select" disabled>
              <option>Europe/Paris (UTC+2)</option>
            </select>
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Format de date</div>
            </div>
            <select className="admin-filter-select" disabled>
              <option>JJ/MM/AAAA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-settings-section">
          <h3 className="admin-settings-section-title">Préférences de notification</h3>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Notifications email</div>
              <div className="admin-settings-description">Recevoir un email pour chaque nouveau message</div>
            </div>
            <label className="admin-toggle">
              <input type="checkbox" defaultChecked disabled />
              <span className="admin-toggle-track" />
            </label>
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Notifications in-app</div>
              <div className="admin-settings-description">Afficher les notifications dans le panneau</div>
            </div>
            <label className="admin-toggle">
              <input type="checkbox" defaultChecked disabled />
              <span className="admin-toggle-track" />
            </label>
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Notifications SMS</div>
              <div className="admin-settings-description">Recevoir un SMS pour les rendez-vous urgents</div>
            </div>
            <label className="admin-toggle">
              <input type="checkbox" disabled />
              <span className="admin-toggle-track" />
            </label>
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Résumé quotidien</div>
              <div className="admin-settings-description">Recevoir un résumé par email chaque matin</div>
            </div>
            <label className="admin-toggle">
              <input type="checkbox" defaultChecked disabled />
              <span className="admin-toggle-track" />
            </label>
          </div>
        </div>
      </div>

      {/* Calculator Default Settings */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-settings-section">
          <h3 className="admin-settings-section-title">Simulateur — Paramètres par défaut</h3>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Frais de gestion</div>
            </div>
            <input className="admin-settings-input" value={`${formulaSettings.managementFeePercent}%`} disabled style={{ width: 100 }} />
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Charges sociales estimées</div>
            </div>
            <input className="admin-settings-input" value={`${formulaSettings.socialChargesPercent}%`} disabled style={{ width: 100 }} />
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Jours travaillés par défaut</div>
            </div>
            <input className="admin-settings-input" value={formulaSettings.defaultWorkedDays} disabled style={{ width: 100 }} />
          </div>
          <div className="admin-settings-row">
            <div>
              <div className="admin-settings-label">Version de la formule</div>
            </div>
            <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{formulaSettings.version}</span>
          </div>
        </div>
      </div>

      {/* Analytics & Privacy */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-settings-section">
          <h3 className="admin-settings-section-title">Analytics & Confidentialité</h3>
          <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-secondary)', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '0.75rem' }}>
              Aucun outil de tracking n'est actuellement actif sur le site The Porters.
              Les données analytics affichées dans l'admin sont des données de démonstration.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              Avant d'activer un outil analytics en production, les éléments suivants devront être mis en place :
            </p>
            <ul style={{ paddingLeft: '1.25rem' }}>
              <li>Choix d'un outil respectueux de la vie privée (Plausible, Umami, ou événements Supabase)</li>
              <li>Bandeau de consentement RGPD conforme</li>
              <li>Politique de confidentialité mise à jour</li>
              <li>Configuration du stockage des données (durée de rétention, anonymisation)</li>
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}
