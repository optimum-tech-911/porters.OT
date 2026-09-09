import { Fragment, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type {
  CmsActivityAction,
  CmsAdminActivitySummary,
  CmsContentActivity,
} from '../../../types/cms';
import AdminPageHeader from '../AdminPageHeader';

const PAGE_SIZE = 25;
const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const actionLabels: Record<CmsActivityAction, string> = {
  create: 'Texte créé',
  draft_save: 'Brouillon enregistré',
  publish: 'Publication',
  restore: 'Version restaurée',
};

const formatLabels: Record<string, string> = {
  size: 'Taille',
  weight: 'Graisse',
  alignment: 'Alignement',
  color: 'Couleur',
  lineHeight: 'Interligne',
};

function asCount(value: number | string | null | undefined) {
  return Number(value || 0);
}

function formatSettings(value: object | null) {
  if (!value || Object.keys(value).length === 0) return 'Style par défaut';
  return Object.entries(value)
    .map(([key, setting]) => `${formatLabels[key] || key} : ${String(setting)}`)
    .join(' · ');
}

function editorHref(activity: CmsContentActivity) {
  return `/admin/editor?path=${encodeURIComponent(activity.route_path)}&key=${encodeURIComponent(activity.content_key)}`;
}

export default function CmsActivityContent() {
  const [summaries, setSummaries] = useState<CmsAdminActivitySummary[]>([]);
  const [activities, setActivities] = useState<CmsContentActivity[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState('all');
  const [selectedAction, setSelectedAction] = useState<'all' | CmsActivityAction>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    setLoadingSummary(true);
    void supabase
      .from('cms_admin_activity_summary')
      .select('*')
      .order('change_count', { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) {
          console.warn('[CMS activity] Summary unavailable:', queryError);
          setError('Le résumé d’activité est indisponible. Vérifiez que la migration d’audit Supabase est appliquée.');
        } else {
          setSummaries((data || []) as CmsAdminActivitySummary[]);
        }
        setLoadingSummary(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    setLoadingActivity(true);
    setError('');

    let query = supabase
      .from('cms_content_activity')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

    if (selectedAdmin === 'all') query = query.not('changed_by', 'is', null);
    else if (selectedAdmin === 'system') query = query.is('changed_by', null);
    else query = query.eq('changed_by', selectedAdmin);

    if (selectedAction !== 'all') query = query.eq('action', selectedAction);

    void query.then(({ data, error: queryError, count }) => {
      if (!active) return;
      if (queryError) {
        console.warn('[CMS activity] Events unavailable:', queryError);
        setError('L’historique détaillé est indisponible. Vérifiez que la migration d’audit Supabase est appliquée.');
        setActivities([]);
        setTotal(0);
      } else {
        setActivities((data || []) as CmsContentActivity[]);
        setTotal(count || 0);
      }
      setLoadingActivity(false);
    });

    return () => { active = false; };
  }, [page, selectedAction, selectedAdmin]);

  const adminNames = useMemo(
    () => new Map(summaries.map((summary) => [summary.user_id, summary.display_name])),
    [summaries],
  );
  const totals = useMemo(() => summaries.reduce((result, summary) => ({
    changes: result.changes + asCount(summary.change_count),
    publications: result.publications + asCount(summary.publication_count),
    accounts: result.accounts + 1,
  }), { changes: 0, publications: 0, accounts: 0 }), [summaries]);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function selectAdmin(userId: string) {
    setSelectedAdmin(userId);
    setExpandedId(null);
    setPage(1);
  }

  function selectAction(action: 'all' | CmsActivityAction) {
    setSelectedAction(action);
    setExpandedId(null);
    setPage(1);
  }

  return (
    <div className="cms-activity-page">
      <AdminPageHeader
        title="Activité éditoriale"
        subtitle="Toutes les modifications attribuables aux comptes administrateurs depuis le premier historique enregistré."
      >
        <a className="admin-btn admin-btn-primary" href="/admin/editor?path=/">Ouvrir l’éditeur</a>
      </AdminPageHeader>

      <div className="cms-activity-history-note" role="note">
        <strong>Périmètre historique</strong>
        <span>Les publications sont reprises depuis la création du CMS. Les anciens brouillons écrasés avant l’installation de cet audit n’existent plus ; chaque nouvel enregistrement est désormais conservé avec son avant/après.</span>
      </div>

      <div className="cms-activity-total-grid" aria-busy={loadingSummary}>
        <article><span>Modifications connues</span><strong>{loadingSummary ? '—' : totals.changes.toLocaleString('fr-FR')}</strong><small>brouillons, restaurations et publications historiques modifiées</small></article>
        <article><span>Publications</span><strong>{loadingSummary ? '—' : totals.publications.toLocaleString('fr-FR')}</strong><small>versions mises en ligne par un compte identifié</small></article>
        <article><span>Comptes administrateurs</span><strong>{loadingSummary ? '—' : totals.accounts}</strong><small>comptes actuels, actifs ou désactivés</small></article>
      </div>

      <section className="cms-activity-section">
        <div className="cms-activity-section-head">
          <div><span>Par compte</span><h3>Contribution totale</h3></div>
          {selectedAdmin !== 'all' && <button type="button" onClick={() => selectAdmin('all')}>Afficher tous les comptes</button>}
        </div>
        <div className="cms-account-grid" aria-busy={loadingSummary}>
          {loadingSummary && <p className="cms-admin-muted">Chargement des comptes…</p>}
          {!loadingSummary && summaries.map((summary) => (
            <button
              type="button"
              key={summary.user_id}
              className={`cms-account-activity-card${selectedAdmin === summary.user_id ? ' active' : ''}`}
              onClick={() => selectAdmin(summary.user_id)}
            >
              <span className="cms-account-avatar" aria-hidden="true">
                {summary.display_name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
              </span>
              <span className="cms-account-identity">
                <strong>{summary.display_name}</strong>
                <small>{summary.role === 'owner' ? 'Propriétaire' : 'Éditeur'} · {summary.enabled ? 'actif' : 'désactivé'}</small>
              </span>
              <span className="cms-account-stat"><strong>{asCount(summary.change_count).toLocaleString('fr-FR')}</strong><small>modifications</small></span>
              <span className="cms-account-stat"><strong>{asCount(summary.publication_count).toLocaleString('fr-FR')}</strong><small>publications</small></span>
              <span className="cms-account-stat"><strong>{asCount(summary.text_count).toLocaleString('fr-FR')}</strong><small>textes touchés</small></span>
              <span className="cms-account-last">
                {summary.last_activity_at ? `Dernière activité ${dateFormatter.format(new Date(summary.last_activity_at))}` : 'Aucune activité enregistrée'}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="cms-activity-section">
        <div className="cms-activity-section-head">
          <div><span>Détail exact</span><h3>Historique des changements</h3></div>
          <small>{loadingActivity ? 'Chargement…' : `${total.toLocaleString('fr-FR')} événement${total === 1 ? '' : 's'}`}</small>
        </div>

        <div className="admin-filter-bar cms-activity-filters">
          <select className="admin-filter-select" aria-label="Filtrer par administrateur" value={selectedAdmin} onChange={(event) => selectAdmin(event.target.value)}>
            <option value="all">Tous les comptes</option>
            {summaries.map((summary) => <option value={summary.user_id} key={summary.user_id}>{summary.display_name}</option>)}
            <option value="system">Système / compte supprimé</option>
          </select>
          <select className="admin-filter-select" aria-label="Filtrer par action" value={selectedAction} onChange={(event) => selectAction(event.target.value as 'all' | CmsActivityAction)}>
            <option value="all">Toutes les actions</option>
            <option value="draft_save">Brouillons enregistrés</option>
            <option value="publish">Publications</option>
            <option value="restore">Restaurations</option>
            <option value="create">Textes créés</option>
          </select>
        </div>

        {error && <div className="cms-admin-alert cms-admin-alert--error" role="alert">{error}</div>}

        <div className="cms-activity-table-wrap" aria-busy={loadingActivity}>
          {loadingActivity && <div className="cms-activity-loading"><span className="admin-auth-spinner" /> Chargement de l’historique…</div>}
          {!loadingActivity && activities.length === 0 && <div className="cms-activity-empty"><strong>Aucune modification trouvée</strong><span>Essayez un autre compte ou un autre type d’action.</span></div>}
          {!loadingActivity && activities.length > 0 && (
            <table className="admin-table cms-activity-table">
              <thead><tr><th>Date</th><th>Compte</th><th>Action</th><th>Page et texte</th><th>Modification</th><th><span className="sr-only">Détails</span></th></tr></thead>
              <tbody>
                {activities.map((activity) => {
                  const expanded = expandedId === activity.id;
                  const changedLabel = activity.text_changed && activity.format_changed
                    ? 'Texte et style'
                    : activity.text_changed
                      ? 'Texte'
                      : activity.format_changed
                        ? 'Style uniquement'
                        : 'Aucun écart de contenu';
                  return (
                    <Fragment key={activity.id}>
                      <tr className={expanded ? 'is-expanded' : ''}>
                        <td><time dateTime={activity.created_at}>{dateFormatter.format(new Date(activity.created_at))}</time></td>
                        <td><strong>{activity.changed_by ? adminNames.get(activity.changed_by) || 'Compte supprimé' : 'Système'}</strong></td>
                        <td><span className={`cms-activity-action cms-activity-action--${activity.action}`}>{actionLabels[activity.action]}</span>{activity.origin === 'version_history' && <small className="cms-activity-origin">Historique publié</small>}</td>
                        <td><strong className="cms-activity-route">{activity.route_path}</strong><code>{activity.content_key}</code></td>
                        <td><span>{changedLabel}</span><small>{activity.previous_content === null ? 'Première valeur enregistrée' : `${activity.previous_content.length.toLocaleString('fr-FR')} → ${activity.new_content.length.toLocaleString('fr-FR')} caractères`}</small></td>
                        <td><button type="button" className="cms-activity-detail-button" aria-expanded={expanded} onClick={() => setExpandedId(expanded ? null : activity.id)}>{expanded ? 'Fermer' : 'Voir exactement'}</button></td>
                      </tr>
                      {expanded && (
                        <tr className="cms-activity-detail-row">
                          <td colSpan={6}>
                            <div className="cms-activity-detail">
                              <header>
                                <div><span>Changement #{activity.id}</span><strong>{activity.content_key}</strong></div>
                                <a href={editorHref(activity)}>Ouvrir ce texte dans l’éditeur →</a>
                              </header>
                              <div className="cms-activity-compare">
                                <section className="before"><span>Avant</span><pre>{activity.previous_content ?? '— Aucun contenu précédent —'}</pre><small>{formatSettings(activity.previous_format)}</small></section>
                                <section className="after"><span>Après</span><pre>{activity.new_content}</pre><small>{formatSettings(activity.new_format)}</small></section>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
          {!loadingActivity && total > PAGE_SIZE && (
            <div className="admin-pagination">
              <span>{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} sur {total.toLocaleString('fr-FR')}</span>
              <div className="admin-pagination-buttons">
                <button type="button" className="admin-pagination-btn" disabled={page === 1} onClick={() => { setExpandedId(null); setPage((current) => current - 1); }}>← Précédent</button>
                <span className="cms-activity-page-count">Page {page} sur {pageCount}</span>
                <button type="button" className="admin-pagination-btn" disabled={page === pageCount} onClick={() => { setExpandedId(null); setPage((current) => current + 1); }}>Suivant →</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
