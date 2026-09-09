import { useState } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import CmsSettingsPanel from '../CmsSettingsPanel';
import TeamCarousel from '../../about/TeamCarousel';
import { defaultPublicTeam, parsePublicTeam, PUBLIC_TEAM_KEY, TEAM_MEDIA_BUCKET, type PublicTeamMember } from '../../../data/public-team';
import { supabase } from '../../../lib/supabase';

function PortraitUpload({ member, onUploaded }: { member: PublicTeamMember; onUploaded: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return <label>Importer un portrait
    <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" disabled={busy} onChange={async (event) => {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;
      setError('');
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type) || file.size > 10 * 1024 * 1024) { setError('Choisissez une image JPG, PNG, WebP ou AVIF de moins de 10 Mo.'); return; }
      setBusy(true);
      try {
        const bitmap = await createImageBitmap(file);
        const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Votre navigateur ne peut pas préparer cette image.');
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
        const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((result) => result ? resolve(result) : reject(new Error('Image illisible.')), 'image/webp', .88));
        const signature = new Uint8Array(await blob.slice(0, 12).arrayBuffer());
        if (blob.type !== 'image/webp' || String.fromCharCode(...signature.slice(0, 4)) !== 'RIFF' || String.fromCharCode(...signature.slice(8, 12)) !== 'WEBP') throw new Error('La conversion du portrait a échoué.');
        const filename = `${member.id}-${crypto.randomUUID()}.webp`;
        const { error: uploadError } = await supabase.storage.from(TEAM_MEDIA_BUCKET).upload(filename, blob, { contentType: 'image/webp', cacheControl: '31536000', upsert: false });
        if (uploadError) throw new Error('L’envoi du portrait a échoué. Vérifiez votre connexion et l’activation du stockage des portraits. Vous pouvez aussi utiliser un lien d’image.');
        const { data } = supabase.storage.from(TEAM_MEDIA_BUCKET).getPublicUrl(filename);
        onUploaded(data.publicUrl);
      } catch (failure) { setError(failure instanceof Error ? failure.message : 'Import impossible.'); }
      finally { setBusy(false); }
    }} />
    <small>{busy ? 'Préparation et envoi du portrait…' : 'JPG, PNG, WebP ou AVIF · 10 Mo maximum. Le portrait sera visible après publication.'}</small>
    {error && <span role="alert" className="site-settings__error">{error}</span>}
  </label>;
}

export default function PublicTeamContent() {
  return <div><AdminPageHeader title="Équipe du site" subtitle="Portraits, fonctions et citations de la page Qui sommes-nous." />
    <CmsSettingsPanel contentKey={PUBLIC_TEAM_KEY} route="/qui-sommes-nous" defaults={defaultPublicTeam} parse={parsePublicTeam}>
      {(value, change) => <>
        <div className="site-settings__card">
          <div className="site-settings__grid"><label>Titre de la présentation<input value={value.heading} maxLength={120} onChange={(e) => change({ ...value, heading: e.target.value })} /></label>
            <label>Durée par personne (secondes)<input type="number" min={6} max={30} value={value.intervalSeconds} onChange={(e) => change({ ...value, intervalSeconds: Number(e.target.value) })} /></label></div>
          <label className="site-settings__check"><input type="checkbox" checked={value.autoplay} onChange={(e) => change({ ...value, autoplay: e.target.checked })} />Défilement automatique</label>
          <small>La lecture s’arrête au survol, au clavier et lorsque la section quitte l’écran. Une citation vide reste masquée sur le site.</small>
        </div>
        {value.members.map((member, index) => {
          const update = (field: keyof PublicTeamMember, next: string | boolean) => change((current) => ({ ...current, members: current.members.map((item) => item.id === member.id ? { ...item, [field]: next } : item) }));
          const move = (offset: number) => {
            const members = [...value.members];
            [members[index], members[index + offset]] = [members[index + offset], members[index]];
            change({ ...value, members });
          };
          return <div className="site-settings__card" key={member.id}>
            <div className="site-settings__actions"><h2>{member.name || 'Nouveau membre'}</h2>
              <button type="button" className="admin-btn admin-btn-secondary" disabled={index === 0} onClick={() => move(-1)} aria-label={`Monter ${member.name}`}>↑</button>
              <button type="button" className="admin-btn admin-btn-secondary" disabled={index === value.members.length - 1} onClick={() => move(1)} aria-label={`Descendre ${member.name}`}>↓</button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => change({ ...value, members: value.members.filter((item) => item.id !== member.id) })}>Retirer</button>
            </div>
            <label className="site-settings__check"><input type="checkbox" checked={member.visible} onChange={(e) => update('visible', e.target.checked)} />Afficher sur le site</label>
            <div className="site-settings__grid"><div>
              {member.image && <img className="site-settings__portrait" src={member.image} alt={`Portrait de ${member.name}`} />}
              <PortraitUpload member={member} onUploaded={(url) => update('image', url)} />
              <label>Ou lien du portrait<input value={member.image} maxLength={700} onChange={(e) => update('image', e.target.value)} /></label>
            </div><div>
              <label>Nom<input value={member.name} maxLength={120} onChange={(e) => update('name', e.target.value)} /></label>
              <label>Fonction<input value={member.role} maxLength={160} onChange={(e) => update('role', e.target.value)} /></label>
              <label>Profil LinkedIn (facultatif)<input value={member.linkedin} maxLength={700} onChange={(e) => update('linkedin', e.target.value)} /></label>
            </div></div>
            <label>Citation<textarea value={member.quote} maxLength={700} placeholder="Ajoutez la citation validée par cette personne." onChange={(e) => update('quote', e.target.value)} /><small>{member.quote.length} / 700 caractères</small></label>
          </div>;
        })}
        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => change({ ...value, members: [...value.members, { id: crypto.randomUUID(), name: '', role: '', quote: '', image: '', linkedin: '', visible: false }] })}>Ajouter une personne</button>
        <div className="site-settings__card" style={{ marginTop: '2rem' }}><h2>Aperçu avant publication</h2><TeamCarousel preview={value} /></div>
      </>}
    </CmsSettingsPanel>
  </div>;
}
