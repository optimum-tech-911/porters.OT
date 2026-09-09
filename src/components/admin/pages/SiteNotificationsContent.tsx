import { useState } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import CmsSettingsPanel from '../CmsSettingsPanel';
import { defaultNotifications, NOTIFICATION_MEDIA_BUCKET, NOTIFICATIONS_KEY, parseNotifications, type SiteMessage } from '../../../data/site-notifications';
import { NotificationCard } from '../../ui/SiteNotifications';
import popupWoman from '../../../assets/home/popup-woman-new.png';
import { supabase } from '../../../lib/supabase';

function NotificationImageUpload({ message, onUploaded }: { message: SiteMessage; onUploaded: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return <label>Importer une image
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
        if (blob.type !== 'image/webp' || String.fromCharCode(...signature.slice(0, 4)) !== 'RIFF' || String.fromCharCode(...signature.slice(8, 12)) !== 'WEBP') throw new Error('La conversion de l’image a échoué.');
        const filename = `${message.id}-${crypto.randomUUID()}.webp`;
        const { error: uploadError } = await supabase.storage.from(NOTIFICATION_MEDIA_BUCKET).upload(filename, blob, { contentType: 'image/webp', cacheControl: '31536000', upsert: false });
        if (uploadError) throw new Error('L’envoi de l’image a échoué. Vérifiez votre connexion et le stockage Supabase.');
        const { data } = supabase.storage.from(NOTIFICATION_MEDIA_BUCKET).getPublicUrl(filename);
        onUploaded(data.publicUrl);
      } catch (failure) { setError(failure instanceof Error ? failure.message : 'Import impossible.'); }
      finally { setBusy(false); }
    }} />
    <small>{busy ? 'Préparation et envoi de l’image…' : 'JPG, PNG, WebP ou AVIF · 10 Mo maximum. L’image sera visible après publication.'}</small>
    {error && <span role="alert" className="site-settings__error">{error}</span>}
  </label>;
}

export default function SiteNotificationsContent() {
  return <div><AdminPageHeader title="Notifications du site" subtitle="Suggestions discrètes sur la page d’accueil uniquement." />
    <CmsSettingsPanel contentKey={NOTIFICATIONS_KEY} route="/" defaults={defaultNotifications} parse={parseNotifications}>
      {(value, change) => <>
        <div className="site-settings__card">
          <label className="site-settings__check"><input type="checkbox" checked={value.enabled} onChange={(e) => change({ ...value, enabled: e.target.checked })} />Activer les notifications sur l’accueil</label>
          <div className="site-settings__grid">
            <label>Position<select value={value.position} onChange={(e) => change({ ...value, position: e.target.value as typeof value.position })}><option value="bottom-left">En bas à gauche</option><option value="bottom-right">En bas à droite</option></select></label>
            {([['intervalSeconds', 'Intervalle entre deux apparitions (secondes)', 120, 1800], ['firstDelaySeconds', 'Première apparition après (secondes)', 0, 1800], ['durationSeconds', 'Durée d’affichage (secondes)', 10, 60]] as const).map(([key, label, min, max]) => <label key={key}>{label}<input type="number" min={min} max={max} value={value[key]} onChange={(e) => change({ ...value, [key]: Number(e.target.value) })} /></label>)}
          </div>
          <small>Un message à la fois, sans masquer la page. Au moins deux minutes entre deux apparitions. Le message reste affiché pendant sa lecture au survol ou au clavier.</small>
        </div>
        {value.messages.map((message, index) => {
          const update = (field: string, next: string | boolean) => change({ ...value, messages: value.messages.map((item) => item.id === message.id ? { ...item, [field]: next } : item) });
          const move = (offset: number) => {
            const destination = index + offset;
            if (destination < 0 || destination >= value.messages.length) return;
            const messages = [...value.messages];
            [messages[index], messages[destination]] = [messages[destination], messages[index]];
            change({ ...value, messages });
          };
          return <div className="site-settings__card" key={message.id}>
            <div className="site-settings__actions"><h2>Message {index + 1}</h2><button type="button" className="admin-btn admin-btn-secondary" disabled={index === 0} onClick={() => move(-1)} aria-label="Monter ce message">↑</button><button type="button" className="admin-btn admin-btn-secondary" disabled={index === value.messages.length - 1} onClick={() => move(1)} aria-label="Descendre ce message">↓</button><button type="button" className="admin-btn admin-btn-secondary" onClick={() => change({ ...value, messages: value.messages.filter((item) => item.id !== message.id) })}>Retirer</button></div>
            <div className="site-settings__split"><div>
              <label className="site-settings__check"><input type="checkbox" checked={message.enabled} onChange={(e) => update('enabled', e.target.checked)} />Afficher ce message</label>
              {([['badge', 'Pastille', 45], ['title', 'Titre', 120], ['linkLabel', 'Texte du lien', 65], ['href', 'Destination du lien', 700]] as const).map(([key, label, max]) => <label key={key}>{label}<input value={message[key]} maxLength={max} onChange={(e) => update(key, e.target.value)} /></label>)}
              <label>Message<textarea value={message.text} maxLength={400} onChange={(e) => update('text', e.target.value)} /></label>
              <label className="site-settings__check"><input type="checkbox" checked={message.showImage} onChange={(e) => update('showImage', e.target.checked)} />Afficher une image</label>
              {message.showImage && <><NotificationImageUpload message={message} onUploaded={(url) => update('image', url)} /><label>Ou adresse de l’image<input value={message.image} maxLength={700} placeholder="Laissez vide pour utiliser l’image par défaut" onChange={(e) => update('image', e.target.value)} /></label><label>Texte alternatif de l’image<input value={message.imageAlt} maxLength={160} placeholder="Laissez vide si l’image est décorative" onChange={(e) => update('imageAlt', e.target.value)} /></label></>}
            </div><div><h3>Aperçu</h3><NotificationCard message={message} portraitSrc={popupWoman.src} preview /></div></div>
          </div>;
        })}
        <button type="button" className="admin-btn admin-btn-secondary" onClick={() => change({ ...value, messages: [...value.messages, { id: crypto.randomUUID(), enabled: false, showImage: false, image: '', imageAlt: '', badge: 'Actualité', title: 'Nouveau message', text: 'Votre message', linkLabel: 'En savoir plus', href: '/contact' }] })}>Ajouter un message</button>
      </>}
    </CmsSettingsPanel>
  </div>;
}
