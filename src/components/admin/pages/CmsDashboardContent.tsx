import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { CmsContentBlock } from '../../../types/cms';
import editablePages from '../../../cms/editable-pages.json';

const formatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function CmsDashboardContent() {
  const [blocks, setBlocks] = useState<CmsContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    void supabase
      .from('cms_content_blocks')
      .select('*')
      .order('updated_at', { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) setError('Impossible de charger le contenu. Vérifiez votre session administrateur.');
        else setBlocks((data || []) as CmsContentBlock[]);
        setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const stats = useMemo(() => ({
    total: blocks.length,
    drafts: blocks.filter((block) => block.status === 'draft').length,
    published: blocks.filter((block) => block.status === 'published').length,
    pages: new Set(blocks.filter((block) => block.route_path !== '/_global').map((block) => block.route_path)).size,
  }), [blocks]);

  const pageCounts = useMemo(() => {
    const counts = new Map<string, number>();
    blocks.forEach((block) => counts.set(block.route_path, (counts.get(block.route_path) || 0) + 1));
    return counts;
  }, [blocks]);

  return (
    <div className="cms-dashboard">
      <header className="cms-dashboard-hero">
        <div>
          <span className="cms-admin-kicker">Gestion du contenu</span>
          <h2>Modifiez le site là où il vit.</h2>
          <p>Ouvrez la page réelle, cliquez sur un texte, enregistrez un brouillon puis publiez-le instantanément.</p>
        </div>
        <a href="/admin/editor?path=/" className="admin-btn admin-btn-primary cms-open-editor">
          Ouvrir l’éditeur visuel <span aria-hidden="true">→</span>
        </a>
      </header>

      {error && <div className="cms-admin-alert cms-admin-alert--error" role="alert">{error}</div>}

      <div className="cms-stat-grid" aria-busy={loading}>
        <article><span>Textes enregistrés</span><strong>{loading ? '—' : stats.total}</strong><small>sur toutes les pages publiques</small></article>
        <article><span>Brouillons à publier</span><strong>{loading ? '—' : stats.drafts}</strong><small>{stats.drafts ? 'action requise' : 'tout est à jour'}</small></article>
        <article><span>Contenus publiés</span><strong>{loading ? '—' : stats.published}</strong><small>visibles par les visiteurs</small></article>
        <article><span>Pages connectées</span><strong>{loading ? '—' : stats.pages}</strong><small>{editablePages.length} routes publiques inventoriées</small></article>
      </div>

      <div className="cms-dashboard-grid">
        <section className="cms-admin-card">
          <div className="cms-admin-card-heading">
            <div><span>Pages</span><h3>Contenu modifiable</h3></div>
            <span className="cms-status-chip cms-status-chip--live">Opérationnel</span>
          </div>
          <div className="cms-page-directory">
            {editablePages.map((page) => (
              <a className="cms-page-row" href={`/admin/editor?path=${encodeURIComponent(page.route)}`} key={page.route}>
                <span className="cms-page-icon" aria-hidden="true">{page.name.charAt(0)}</span>
                <span><strong>{page.name}</strong><small>{page.route} · {loading ? '—' : pageCounts.get(page.route) || page.contentCount} textes</small></span>
                <span className="cms-page-action">Modifier <b aria-hidden="true">↗</b></span>
              </a>
            ))}
          </div>
        </section>

        <section className="cms-admin-card">
          <div className="cms-admin-card-heading">
            <div><span>Activité</span><h3>Dernières modifications</h3></div>
          </div>
          <div className="cms-recent-list">
            {loading && <p className="cms-admin-muted">Chargement…</p>}
            {!loading && blocks.slice(0, 8).map((block) => (
              <a key={block.id} href={`/admin/editor?path=${encodeURIComponent(block.route_path)}&key=${encodeURIComponent(block.content_key)}`}>
                <span className={`cms-change-dot cms-change-dot--${block.status}`} aria-hidden="true" />
                <span><strong>{block.content_key}</strong><small>{formatter.format(new Date(block.updated_at))}</small></span>
                <span className={`cms-status-chip cms-status-chip--${block.status}`}>
                  {block.status === 'draft' ? 'Brouillon' : `v${block.published_version}`}
                </span>
              </a>
            ))}
            {!loading && blocks.length === 0 && <p className="cms-admin-muted">Aucun contenu enregistré.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
