import { useEffect, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { supabase } from '../../lib/supabase';
import type { CmsContentBlock } from '../../types/cms';
import './site-settings.css';

type Props<T> = { contentKey: string; route: string; defaults: T; parse: (raw: unknown) => T; children: (value: T, change: Dispatch<SetStateAction<T>>) => ReactNode };

export default function CmsSettingsPanel<T>({ contentKey, route, defaults, parse, children }: Props<T>) {
  const [value, setValue] = useState(defaults);
  const [saved, setSaved] = useState('');
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [version, setVersion] = useState<number | null>(null);
  const [reload, setReload] = useState(0);
  const dirty = ready && JSON.stringify(value) !== saved;

  useEffect(() => {
    let active = true;
    setReady(false);
    setError('');
    void (async () => {
      try {
        const { data, error: readError } = await supabase.from('cms_content_blocks').select('draft_content,updated_at,published_version,status').eq('content_key', contentKey).maybeSingle();
        if (readError) throw readError;
        if (!active) return;
        const next = data ? parse(data.draft_content) : defaults;
        setValue(next); setSaved(JSON.stringify(next)); setUpdatedAt(data?.updated_at ?? null); setVersion(data?.published_version ?? null);
        setNotice(data ? (data.status === 'draft' ? 'Un brouillon est enregistré. Publiez pour le rendre visible sur le site.' : `Version ${data.published_version} publiée.`) : 'La première publication activera cette configuration dans le CMS.');
        setReady(true);
      } catch (failure) { if (active) setError(`Chargement impossible : ${failure instanceof Error ? failure.message : 'vérifiez la connexion et vos autorisations.'}`); }
    })();
    return () => { active = false; };
  }, [contentKey, reload]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  async function publish() {
    if (!ready || busy) return;
    setError(''); setNotice('');
    let payload: string;
    try { payload = JSON.stringify(parse(value)); } catch (failure) { setError(failure instanceof Error ? failure.message : 'Vérifiez les champs.'); return; }
    if (payload.length > 10000) { setError('Configuration trop longue (10 000 caractères maximum).'); return; }
    setBusy(true);
    try {
      const { data: latest, error: readError } = await supabase.from('cms_content_blocks').select('updated_at').eq('content_key', contentKey).maybeSingle();
      if (readError) throw readError;
      if ((latest?.updated_at ?? null) !== updatedAt) throw new Error('Cette configuration a été modifiée par un autre administrateur. Rechargez-la avant de publier.');
      let published: CmsContentBlock;
      if (!latest) {
        const { data, error: createError } = await supabase.rpc('cms_create_content_block', { requested_key: contentKey, requested_route: route, requested_element_type: 'paragraph', requested_fallback: payload });
        if (createError || !data) throw createError || new Error('Initialisation impossible.');
        published = data as CmsContentBlock;
      } else {
        const { data: draft, error: draftError } = await supabase.rpc('cms_save_draft', { requested_key: contentKey, requested_content: payload, requested_format: {} });
        if (draftError || !draft) throw draftError || new Error('Enregistrement impossible.');
        setUpdatedAt((draft as CmsContentBlock).updated_at);
        const { data, error: publishError } = await supabase.rpc('cms_publish_content', { requested_key: contentKey });
        if (publishError || !data) throw publishError || new Error('Brouillon enregistré, publication à réessayer.');
        published = data as CmsContentBlock;
      }
      setUpdatedAt(published.updated_at); setVersion(published.published_version); setSaved(payload); setValue(parse(payload));
      const { data: publicRow, error: publicError } = await supabase.from('cms_published_content').select('published_content').eq('content_key', contentKey).single();
      if (publicError || publicRow?.published_content !== payload) throw new Error('Publication enregistrée, mais sa lecture publique n’a pas pu être confirmée. Rechargez pour vérifier.');
      setNotice(`Version ${published.published_version} publiée et vérifiée. Les pages ouvertes se mettent à jour sous 30 secondes.`);
    } catch (failure) {
      setError(failure && typeof failure === 'object' && 'message' in failure ? String(failure.message) : 'Publication impossible. Réessayez.');
    } finally { setBusy(false); }
  }

  return <div className="site-settings">
    <div className="site-settings__toolbar">
      <span className={`cms-status-chip cms-status-chip--${ready ? 'live' : 'draft'}`}>{ready ? 'CMS connecté' : 'Connexion à vérifier'}</span>
      {version && <span>Version {version}</span>}
      <a href={route} target="_blank" rel="noreferrer">Voir la page ↗</a>
      <button className="admin-btn admin-btn-secondary" disabled={busy} onClick={() => { if (!dirty || window.confirm('Abandonner les modifications non publiées et recharger ?')) setReload((n) => n + 1); }}>Recharger</button>
      <button className="admin-btn admin-btn-primary" disabled={!ready || busy} onClick={publish}>{busy ? 'Publication…' : 'Publier sur le site'}</button>
    </div>
    {error && <p className="site-settings__error" role="alert">{error}</p>}
    {notice && <p className="site-settings__notice" role="status">{notice}</p>}
    <fieldset disabled={!ready || busy}>{children(value, (next) => { setValue(next); setError(''); setNotice('Modifications non publiées.'); })}</fieldset>
  </div>;
}
