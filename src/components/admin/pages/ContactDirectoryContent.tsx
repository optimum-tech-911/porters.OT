import AdminPageHeader from '../AdminPageHeader';
import CmsSettingsPanel from '../CmsSettingsPanel';
import ContactDirectory from '../../contact/ContactDirectory';
import {
  CONTACT_DIRECTORY_KEY,
  CONTACT_DIRECTORY_ROUTE,
  defaultContactDirectory,
  parseContactDirectory,
  type ContactAgency,
} from '../../../data/contact-directory';

export default function ContactDirectoryContent() {
  return <div>
    <AdminPageHeader title="Contact et agences" subtitle="Coordonnées affichées dans la colonne droite de la page Contact." />
    <CmsSettingsPanel contentKey={CONTACT_DIRECTORY_KEY} route={CONTACT_DIRECTORY_ROUTE} defaults={defaultContactDirectory} parse={parseContactDirectory}>
      {(value, change) => <>
        <div className="site-settings__card">
          <h2>Contact général</h2>
          <div className="site-settings__grid">
            <label>Titre<input value={value.generalHeading} maxLength={120} onChange={(event) => change({ ...value, generalHeading: event.target.value })} /></label>
            <label>Email général<input type="email" value={value.generalEmail} maxLength={320} placeholder="Laisser vide pour le masquer" onChange={(event) => change({ ...value, generalEmail: event.target.value })} /></label>
          </div>
          <small>L’email peut rester vide si vous souhaitez masquer entièrement cette coordonnée.</small>
        </div>

        <div className="site-settings__card">
          <h2>Section des agences</h2>
          <div className="site-settings__grid">
            <label>Titre<input value={value.agenciesHeading} maxLength={120} onChange={(event) => change({ ...value, agenciesHeading: event.target.value })} /></label>
            <label>Libellé du lien final<input value={value.directoryLinkLabel} maxLength={120} placeholder="Laisser vide pour masquer" onChange={(event) => change({ ...value, directoryLinkLabel: event.target.value })} /></label>
            <label>Destination du lien<input value={value.directoryLinkHref} maxLength={700} placeholder="/agences" onChange={(event) => change({ ...value, directoryLinkHref: event.target.value })} /></label>
          </div>
        </div>

        {value.agencies.map((agency, index) => {
          const update = (field: keyof ContactAgency, next: string) => change((current) => ({
            ...current,
            agencies: current.agencies.map((item) => item.id === agency.id ? { ...item, [field]: next } : item),
          }));
          const move = (offset: number) => {
            const agencies = [...value.agencies];
            [agencies[index], agencies[index + offset]] = [agencies[index + offset], agencies[index]];
            change({ ...value, agencies });
          };
          return <div className="site-settings__card" key={agency.id}>
            <div className="site-settings__actions">
              <h2>{agency.name || 'Nouvelle agence'}</h2>
              <button type="button" className="admin-btn admin-btn-secondary" disabled={index === 0} onClick={() => move(-1)} aria-label={`Monter ${agency.name}`}>↑</button>
              <button type="button" className="admin-btn admin-btn-secondary" disabled={index === value.agencies.length - 1} onClick={() => move(1)} aria-label={`Descendre ${agency.name}`}>↓</button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => {
                if (window.confirm(`Retirer « ${agency.name} » de la page Contact ?`)) change({ ...value, agencies: value.agencies.filter((item) => item.id !== agency.id) });
              }}>Supprimer</button>
            </div>
            <div className="site-settings__grid">
              <label>Nom affiché<input value={agency.name} maxLength={160} onChange={(event) => update('name', event.target.value)} /></label>
              <label>Adresse ou texte de rendez-vous<textarea value={agency.address} maxLength={300} placeholder="Facultatif" onChange={(event) => update('address', event.target.value)} /></label>
              <label>Téléphone<input type="tel" value={agency.phone} maxLength={80} placeholder="Facultatif" onChange={(event) => update('phone', event.target.value)} /></label>
              <label>Email<input type="email" value={agency.email} maxLength={320} placeholder="Facultatif" onChange={(event) => update('email', event.target.value)} /></label>
              <label>Lien vers la page agence<input value={agency.href} maxLength={700} placeholder="Facultatif, ex. /agences/paris" onChange={(event) => update('href', event.target.value)} /></label>
            </div>
          </div>;
        })}

        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => change({
          ...value,
          agencies: [...value.agencies, { id: crypto.randomUUID(), name: 'Nouvelle agence', address: '', phone: '', email: '', href: '' }],
        })}>Ajouter une agence</button>

        <div className="site-settings__card" style={{ marginTop: '2rem' }}>
          <h2>Aperçu avant publication</h2>
          <div style={{ maxWidth: '32rem' }}><ContactDirectory preview={value} /></div>
        </div>
      </>}
    </CmsSettingsPanel>
  </div>;
}
