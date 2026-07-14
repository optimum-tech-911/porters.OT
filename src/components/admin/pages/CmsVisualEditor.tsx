import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { CmsFormat } from '../../../cms/content';
import type { CmsContentBlock, CmsContentVersion } from '../../../types/cms';
import editablePages from '../../../cms/editable-pages.json';

const defaults: Required<CmsFormat> = {
  size: 'default',
  weight: 'default',
  alignment: 'default',
  color: 'default',
  lineHeight: 'default',
};

const versionDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short' });

export default function CmsVisualEditor() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [route, setRoute] = useState('/');
  const [iframeRoute, setIframeRoute] = useState('/');
  const [mounted, setMounted] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [blocks, setBlocks] = useState<CmsContentBlock[]>([]);
  const [selected, setSelected] = useState<CmsContentBlock | null>(null);
  const [content, setContent] = useState('');
  const [format, setFormat] = useState<CmsFormat>({});
  const [versions, setVersions] = useState<CmsContentVersion[]>([]);
  const [previewState, setPreviewState] = useState<'draft' | 'published'>('draft');
  const [loadingFrame, setLoadingFrame] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [frameError, setFrameError] = useState('');
  const [pageMenuOpen, setPageMenuOpen] = useState(false);
  const [pageSearch, setPageSearch] = useState('');

  const dirty = useMemo(() => Boolean(selected) && (
    content !== selected?.draft_content || JSON.stringify(format || {}) !== JSON.stringify(selected?.draft_format || {})
  ), [content, format, selected]);

  const post = useCallback((message: Record<string, unknown>) => {
    iframeRef.current?.contentWindow?.postMessage(message, window.location.origin);
  }, []);

  const currentPage = useMemo(() => editablePages.find((page) => page.route === route), [route]);
  const filteredPages = useMemo(() => {
    const query = pageSearch.trim().toLocaleLowerCase('fr');
    if (!query) return editablePages;
    return editablePages.filter((page) => `${page.name} ${page.route}`.toLocaleLowerCase('fr').includes(query));
  }, [pageSearch]);

  const updateEditorUrl = useCallback((nextRoute: string, preserveKey = false) => {
    const url = new URL(window.location.href);
    url.searchParams.set('path', nextRoute);
    if (!preserveKey) url.searchParams.delete('key');
    window.history.replaceState({}, '', url);
  }, []);

  const prepareNavigation = useCallback((nextRoute: string) => {
    setLoadingFrame(true);
    setFrameError('');
    setError('');
    setNotice('');
    setSelected(null);
    setVersions([]);
    setBlocks([]);
    setRoute(nextRoute);
  }, []);

  const approveNavigation = useCallback((nextRoute: string, url: string) => {
    if (dirty && !window.confirm('Vous avez des modifications non enregistrées. Quitter cette page sans les enregistrer ?')) return;
    prepareNavigation(nextRoute);
    post({ type: 'cms:navigate-approved', url });
  }, [dirty, post, prepareNavigation]);

  const openPage = useCallback((nextRoute: string) => {
    if (nextRoute === route) {
      setPageMenuOpen(false);
      return;
    }
    if (dirty && !window.confirm('Vous avez des modifications non enregistrées. Quitter cette page sans les enregistrer ?')) return;
    prepareNavigation(nextRoute);
    setIframeRoute(nextRoute);
    setIframeKey((current) => current + 1);
    setPageMenuOpen(false);
    updateEditorUrl(nextRoute);
  }, [dirty, prepareNavigation, route, updateEditorUrl]);

  const retryFrame = useCallback(() => {
    prepareNavigation(route);
    setIframeRoute(route);
    setIframeKey((current) => current + 1);
  }, [prepareNavigation, route]);

  const loadVersions = useCallback(async (blockId: string) => {
    const { data, error: queryError } = await supabase
      .from('cms_content_versions')
      .select('*')
      .eq('content_block_id', blockId)
      .order('version_number', { ascending: false });
    if (queryError) setError('Historique indisponible.');
    else setVersions((data || []) as CmsContentVersion[]);
  }, []);

  const chooseBlock = useCallback((block: CmsContentBlock) => {
    setSelected(block);
    setContent(block.draft_content);
    setFormat(block.draft_format || {});
    setNotice('');
    setError('');
    void loadVersions(block.id);
  }, [loadVersions]);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('path') || '/';
    const valid = editablePages.some((page) => page.route === requested) ? requested : '/';
    setRoute(valid);
    setIframeRoute(valid);
    setMounted(true);
    updateEditorUrl(valid, true);
  }, [updateEditorUrl]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !event.data?.type) return;

      if (event.data.type === 'cms:ready') {
        const incoming = (event.data.blocks || []) as CmsContentBlock[];
        const requestedKey = new URLSearchParams(window.location.search).get('key');
        setBlocks(incoming);
        const nextRoute = event.data.route || '/';
        setRoute(nextRoute);
        setLoadingFrame(false);
        setFrameError('');
        updateEditorUrl(nextRoute);

        const requested = requestedKey ? incoming.find((block) => block.content_key === requestedKey) : undefined;
        if (requested) chooseBlock(requested);
      }

      if (event.data.type === 'cms:navigate-request' && typeof event.data.url === 'string') {
        approveNavigation(event.data.route || '/', event.data.url);
      }
      if (event.data.type === 'cms:select' && event.data.block) chooseBlock(event.data.block as CmsContentBlock);
      if (event.data.type === 'cms:error') {
        setLoadingFrame(false);
        setFrameError(event.data.message || 'L’éditeur n’a pas pu charger cette page.');
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [approveNavigation, chooseBlock, updateEditorUrl]);

  useEffect(() => {
    if (!loadingFrame) return;
    const timeout = window.setTimeout(() => {
      setLoadingFrame(false);
      setFrameError('La page met trop de temps à répondre. Vérifiez votre connexion puis réessayez.');
    }, 15000);
    return () => window.clearTimeout(timeout);
  }, [iframeKey, loadingFrame, route]);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (!dirty) return;
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  useEffect(() => {
    if (!selected) return;
    post({ type: 'cms:update-preview', key: selected.content_key, content, format });
  }, [content, format, post, selected]);

  async function persistDraft(nextContent = content, nextFormat = format): Promise<CmsContentBlock | null> {
    if (!selected) return null;
    if (!nextContent.trim()) {
      setError('Le contenu ne peut pas être vide.');
      return null;
    }

    setBusy(true);
    setError('');
    const { data, error: mutationError } = await supabase.rpc('cms_save_draft', {
      requested_key: selected.content_key,
      requested_content: nextContent,
      requested_format: nextFormat,
    });
    setBusy(false);

    if (mutationError || !data) {
      setError(mutationError?.message || 'Le brouillon n’a pas pu être enregistré.');
      return null;
    }

    const block = data as CmsContentBlock;
    setSelected(block);
    setBlocks((current) => current.map((item) => item.id === block.id ? block : item));
    post({ type: 'cms:replace-block', block });
    setNotice('Brouillon enregistré.');
    return block;
  }

  async function publish() {
    if (!selected) return;
    let saved = selected;
    if (dirty) {
      const result = await persistDraft();
      if (!result) return;
      saved = result;
    }

    if (!window.confirm(`Publier maintenant « ${saved.content_key} » sur le site ?`)) return;
    setBusy(true);
    setError('');
    const { data, error: publishError } = await supabase.rpc('cms_publish_content', {
      requested_key: saved.content_key,
    });
    setBusy(false);

    if (publishError || !data) {
      setError(publishError?.message || 'La publication a échoué.');
      return;
    }

    const block = data as CmsContentBlock;
    chooseBlock(block);
    setBlocks((current) => current.map((item) => item.id === block.id ? block : item));
    post({ type: 'cms:replace-block', block });
    setNotice(`Version ${block.published_version} publiée. Les visiteurs la verront au prochain chargement.`);
  }

  async function restore(version: CmsContentVersion) {
    if (!selected || !window.confirm(`Restaurer la version ${version.version_number} comme nouveau brouillon ?`)) return;
    setBusy(true);
    const { data, error: restoreError } = await supabase.rpc('cms_restore_version', {
      requested_version_id: version.id,
    });
    setBusy(false);

    if (restoreError || !data) {
      setError(restoreError?.message || 'La restauration a échoué.');
      return;
    }

    const block = data as CmsContentBlock;
    chooseBlock(block);
    setBlocks((current) => current.map((item) => item.id === block.id ? block : item));
    post({ type: 'cms:replace-block', block });
    setNotice(`Version ${version.version_number} restaurée en brouillon. Vérifiez-la puis publiez-la.`);
  }

  function updateFormat<Key extends keyof CmsFormat>(key: Key, value: CmsFormat[Key]) {
    setFormat((current) => ({ ...current, [key]: value }));
  }

  function switchPreview(state: 'draft' | 'published') {
    setPreviewState(state);
    post({ type: 'cms:set-preview-state', state });
  }

  return (
    <div className="cms-editor-shell">
      <div className="cms-editor-toolbar">
        <div>
          <a href="/admin/dashboard" className="cms-editor-back" aria-label="Retour au tableau de bord">←</a>
          <button type="button" className="cms-page-picker-button" onClick={() => setPageMenuOpen(true)} aria-haspopup="dialog" aria-expanded={pageMenuOpen}>
            <span><small>Page affichée</small><strong>{currentPage?.name || route}</strong></span><b aria-hidden="true">⌄</b>
          </button>
        </div>
        <div className="cms-preview-toggle" aria-label="Mode de prévisualisation">
          <button className={previewState === 'draft' ? 'active' : ''} onClick={() => switchPreview('draft')}>Brouillon</button>
          <button className={previewState === 'published' ? 'active' : ''} onClick={() => switchPreview('published')}>Publié</button>
        </div>
        <div className="cms-editor-toolbar-status">
          <span className={dirty ? 'is-dirty' : 'is-saved'}>{dirty ? 'Modifications non enregistrées' : 'Aucune modification locale'}</span>
          <a href={route} target="_blank" rel="noreferrer">Voir la page ↗</a>
        </div>
      </div>

      {pageMenuOpen && (
        <div className="cms-page-picker-layer" role="dialog" aria-modal="true" aria-labelledby="cms-page-picker-title" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setPageMenuOpen(false);
        }}>
          <section className="cms-page-picker-card">
            <header><div><small>Navigation de l’éditeur</small><h2 id="cms-page-picker-title">Choisir une page</h2></div><button type="button" onClick={() => setPageMenuOpen(false)} aria-label="Fermer">×</button></header>
            <label className="cms-page-picker-search">Rechercher une page<input autoFocus value={pageSearch} onChange={(event) => setPageSearch(event.target.value)} placeholder="Nom ou adresse…" /></label>
            <div className="cms-page-picker-list">
              {filteredPages.map((page) => (
                <button type="button" key={page.route} className={page.route === route ? 'active' : ''} onClick={() => openPage(page.route)}>
                  <span><strong>{page.name}</strong><small>{page.route}</small></span><em>{page.contentCount} textes</em><b aria-hidden="true">→</b>
                </button>
              ))}
              {filteredPages.length === 0 && <p>Aucune page ne correspond à cette recherche.</p>}
            </div>
          </section>
        </div>
      )}

      <div className="cms-editor-workspace">
        <section className="cms-editor-canvas">
          {loadingFrame && <div className="cms-frame-loading"><span className="admin-auth-spinner" /> Chargement de la page…</div>}
          {frameError && !loadingFrame && <div className="cms-frame-error" role="alert"><strong>Impossible de charger la page</strong><p>{frameError}</p><button type="button" onClick={retryFrame}>Réessayer</button></div>}
          {mounted && <iframe
            key={iframeKey}
            ref={iframeRef}
            title="Aperçu du site The Porters"
            src={`${iframeRoute}?cms-editor=1`}
          />}
        </section>

        <aside className="cms-editor-panel">
          {!selected ? (
            <div className="cms-editor-empty">
              <span aria-hidden="true">✦</span>
              <h2>Sélectionnez un texte</h2>
              <p>Survolez la page puis cliquez sur un élément entouré en doré pour le modifier.</p>
              <small>{blocks.length} éléments disponibles sur cette page</small>
            </div>
          ) : (
            <>
              <div className="cms-editor-panel-head">
                <div><span>Élément sélectionné</span><h2>{selected.element_type === 'heading' ? 'Titre' : selected.element_type === 'button' ? 'Bouton' : 'Texte'}</h2></div>
                <span className={`cms-status-chip cms-status-chip--${selected.status}`}>{selected.status === 'draft' ? 'Brouillon' : 'Publié'}</span>
              </div>

              <div className="cms-key-card"><small>Clé stable</small><code>{selected.content_key}</code><span>{selected.route_path}</span></div>

              <label className="cms-field-label" htmlFor="cms-content">Contenu</label>
              <textarea id="cms-content" value={content} onChange={(event) => setContent(event.target.value)} rows={selected.element_type === 'heading' ? 4 : 7} maxLength={10000} />
              <div className="cms-character-count">{content.length} / 10 000</div>

              <div className="cms-format-grid">
                <label>Taille
                  <select value={format.size || 'default'} onChange={(event) => updateFormat('size', event.target.value as CmsFormat['size'])}>
                    <option value="default">Par défaut</option><option value="small">Petite</option><option value="large">Grande</option><option value="xlarge">Très grande</option>
                  </select>
                </label>
                <label>Graisse
                  <select value={format.weight || 'default'} onChange={(event) => updateFormat('weight', event.target.value as CmsFormat['weight'])}>
                    <option value="default">Par défaut</option><option value="regular">Normale</option><option value="medium">Medium</option><option value="semibold">Semi-gras</option><option value="bold">Gras</option>
                  </select>
                </label>
                <label>Alignement
                  <select value={format.alignment || 'default'} onChange={(event) => updateFormat('alignment', event.target.value as CmsFormat['alignment'])}>
                    <option value="default">Par défaut</option><option value="left">Gauche</option><option value="center">Centre</option><option value="right">Droite</option>
                  </select>
                </label>
                <label>Couleur
                  <select value={format.color || 'default'} onChange={(event) => updateFormat('color', event.target.value as CmsFormat['color'])}>
                    <option value="default">Par défaut</option><option value="navy">Bleu marque</option><option value="gold">Doré</option><option value="dark">Sombre</option><option value="light">Clair</option><option value="muted">Atténué</option>
                  </select>
                </label>
                <label>Interligne
                  <select value={format.lineHeight || 'default'} onChange={(event) => updateFormat('lineHeight', event.target.value as CmsFormat['lineHeight'])}>
                    <option value="default">Par défaut</option><option value="compact">Compact</option><option value="normal">Normal</option><option value="relaxed">Aéré</option>
                  </select>
                </label>
                <button type="button" className="cms-reset-format" onClick={() => setFormat({ ...defaults })}>Réinitialiser le style</button>
              </div>

              {error && <div className="cms-admin-alert cms-admin-alert--error" role="alert">{error}</div>}
              {notice && <div className="cms-admin-alert cms-admin-alert--success" role="status">{notice}</div>}

              <div className="cms-editor-actions">
                <button type="button" className="admin-btn admin-btn-secondary" disabled={!dirty || busy} onClick={() => {
                  setContent(selected.draft_content); setFormat(selected.draft_format || {}); setNotice('Modifications locales annulées.');
                }}>Annuler</button>
                <button type="button" className="admin-btn admin-btn-secondary" disabled={!dirty || busy} onClick={() => void persistDraft()}>{busy ? 'Enregistrement…' : 'Enregistrer le brouillon'}</button>
                <button type="button" className="admin-btn admin-btn-primary" disabled={busy} onClick={() => void publish()}>Publier</button>
              </div>

              <details className="cms-history" open>
                <summary>Historique des versions <span>{versions.length}</span></summary>
                <div>
                  {versions.map((version) => (
                    <article key={version.id}>
                      <span><strong>Version {version.version_number}</strong><small>{versionDate.format(new Date(version.created_at))}</small></span>
                      <button type="button" disabled={busy || version.version_number === selected.published_version} onClick={() => void restore(version)}>
                        {version.version_number === selected.published_version ? 'Actuelle' : 'Restaurer'}
                      </button>
                    </article>
                  ))}
                </div>
              </details>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
