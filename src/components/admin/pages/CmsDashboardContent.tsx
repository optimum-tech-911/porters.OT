import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import type { CmsContentBlock } from '../../../types/cms';
import editablePages from '../../../cms/editable-pages.json';
import { SIMULATOR_SETTINGS_KEY } from '../../../data/simulator-settings';

const formatter = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

interface RecentInquiry {
  id: string;
  created_at: string;
  kind: 'contact' | 'simulation';
  status: string;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string;
  subject: string | null;
}

export default function CmsDashboardContent() {
  const [recentBlocks, setRecentBlocks] = useState<CmsContentBlock[]>([]);
  const [stats, setStats] = useState({ total: 0, drafts: 0, published: 0 });
  const [publicTotal, setPublicTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadToken, setReloadToken] = useState(0);
  const [crmStats, setCrmStats] = useState({ total: 0, new: 0, contacts: 0, simulations: 0 });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [crmLoading, setCrmLoading] = useState(true);
  const [crmError, setCrmError] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    async function loadDashboard() {
      try {
        // PostgREST limits ordinary selects to 1,000 rows. Exact head counts
        // keep the dashboard truthful as the CMS grows beyond that threshold.
        const [totalResult, draftResult, publishedResult, publicResult, recentResult] = await Promise.all([
          supabase.from('cms_content_blocks').select('id', { count: 'exact', head: true }),
          supabase.from('cms_content_blocks').select('id', { count: 'exact', head: true }).eq('status', 'draft'),
          supabase.from('cms_content_blocks').select('id', { count: 'exact', head: true }).eq('status', 'published'),
          supabase.from('cms_published_content').select('content_key', { count: 'exact', head: true }),
          supabase.from('cms_content_blocks').select('*').order('updated_at', { ascending: false }).limit(8),
        ]);

        if (!active) return;
        const queryError = totalResult.error
          || draftResult.error
          || publishedResult.error
          || publicResult.error
          || recentResult.error;
        if (queryError) throw queryError;

        const total = totalResult.count || 0;
        const nextPublicTotal = publicResult.count || 0;
        setStats({
          total,
          drafts: draftResult.count || 0,
          published: publishedResult.count || 0,
        });
        setPublicTotal(nextPublicTotal);
        setRecentBlocks((recentResult.data || []) as CmsContentBlock[]);

        if (nextPublicTotal !== total) {
          setError(`La vue publique expose ${nextPublicTotal.toLocaleString('fr-FR')} textes sur ${total.toLocaleString('fr-FR')}. Vérifiez la configuration Supabase avant de publier.`);
        }
      } catch (queryError) {
        if (!active) return;
        console.warn('[CMS admin] Dashboard health check failed:', queryError);
        setError('Impossible de vérifier le contenu et sa vue publique. Vérifiez votre session administrateur et la connexion Supabase.');
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDashboard();
    return () => { active = false; };
  }, [reloadToken]);

  useEffect(() => {
    let active = true;
    setCrmLoading(true);
    setCrmError('');

    void Promise.all([
      supabase.from('crm_inquiries').select('id', { count: 'exact', head: true }),
      supabase.from('crm_inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('crm_inquiries').select('id', { count: 'exact', head: true }).eq('kind', 'contact'),
      supabase.from('crm_inquiries').select('id', { count: 'exact', head: true }).eq('kind', 'simulation'),
      supabase
        .from('crm_inquiries')
        .select('id,created_at,kind,status,name,first_name,last_name,email,subject')
        .order('created_at', { ascending: false })
        .limit(6),
    ]).then(([total, fresh, contacts, simulations, recent]) => {
      if (!active) return;
      const queryError = total.error || fresh.error || contacts.error || simulations.error || recent.error;
      if (queryError) {
        console.warn('[CRM admin] Dashboard summary unavailable:', queryError);
        setCrmError('Le suivi CRM attend la migration Supabase crm_inquiries.');
      } else {
        setCrmStats({
          total: total.count || 0,
          new: fresh.count || 0,
          contacts: contacts.count || 0,
          simulations: simulations.count || 0,
        });
        setRecentInquiries((recent.data || []) as RecentInquiry[]);
      }
      setCrmLoading(false);
    });

    return () => { active = false; };
  }, [reloadToken]);

  const publicViewAccessible = !loading && !error && stats.total > 0 && publicTotal === stats.total;

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

      {error && (
        <div className="cms-admin-alert cms-admin-alert--error" role="alert">
          <span>{error}</span>{' '}
          <button type="button" onClick={() => setReloadToken((current) => current + 1)}>Réessayer</button>
        </div>
      )}

      <div className="cms-stat-grid" aria-busy={loading}>
        <article><span>Textes enregistrés</span><strong>{loading ? '—' : stats.total.toLocaleString('fr-FR')}</strong><small>comptage exact dans le CMS</small></article>
        <article><span>Brouillons à publier</span><strong>{loading ? '—' : stats.drafts}</strong><small>{stats.drafts ? 'action requise' : 'tout est à jour'}</small></article>
        <article><span>Contenus publiés</span><strong>{loading ? '—' : stats.published.toLocaleString('fr-FR')}</strong><small>{loading ? 'vérification en cours' : `${publicTotal.toLocaleString('fr-FR')} accessibles par la vue publique`}</small></article>
        <article><span>Pages connectées</span><strong>{editablePages.length}</strong><small>routes publiques inventoriées</small></article>
      </div>

      <section className="cms-admin-card" style={{ marginBottom: '1.5rem' }} aria-busy={crmLoading}>
        <div className="cms-admin-card-heading">
          <div><span>Demandes commerciales</span><h3>Contacts et simulations</h3></div>
          <a href="/admin/leads" className="admin-btn admin-btn-ghost admin-btn-sm">Ouvrir le CRM →</a>
        </div>

        {crmError ? (
          <div className="cms-admin-alert cms-admin-alert--error" role="alert">
            <span>{crmError}</span>
          </div>
        ) : (
          <>
            <div className="cms-stat-grid">
              <article><span>Total capté</span><strong>{crmLoading ? '—' : crmStats.total}</strong><small>formulaires consentis</small></article>
              <article><span>Nouveaux</span><strong>{crmLoading ? '—' : crmStats.new}</strong><small>à traiter</small></article>
              <article><span>Messages</span><strong>{crmLoading ? '—' : crmStats.contacts}</strong><small>depuis le contact</small></article>
              <article><span>Simulations</span><strong>{crmLoading ? '—' : crmStats.simulations}</strong><small>résultats débloqués</small></article>
            </div>
            <div className="cms-recent-list" style={{ marginTop: '1rem' }}>
              {crmLoading && <p className="cms-admin-muted">Chargement…</p>}
              {!crmLoading && recentInquiries.map((inquiry) => {
                const displayName = inquiry.name
                  || [inquiry.first_name, inquiry.last_name].filter(Boolean).join(' ')
                  || inquiry.email;
                return (
                  <a key={inquiry.id} href={inquiry.kind === 'contact' ? '/admin/messages' : '/admin/leads'}>
                    <span className={`cms-change-dot cms-change-dot--${inquiry.status === 'new' ? 'draft' : 'published'}`} aria-hidden="true" />
                    <span>
                      <strong>{displayName}</strong>
                      <small>{inquiry.kind === 'simulation' ? 'Simulation' : inquiry.subject || 'Message'} · {formatter.format(new Date(inquiry.created_at))}</small>
                    </span>
                    <span className={`cms-status-chip cms-status-chip--${inquiry.status === 'new' ? 'draft' : 'published'}`}>
                      {inquiry.status === 'new' ? 'Nouveau' : inquiry.status}
                    </span>
                  </a>
                );
              })}
              {!crmLoading && recentInquiries.length === 0 && <p className="cms-admin-muted">Aucune demande enregistrée.</p>}
            </div>
          </>
        )}
      </section>

      <div className="cms-dashboard-grid">
        <section className="cms-admin-card">
          <div className="cms-admin-card-heading">
            <div><span>Pages</span><h3>Contenu modifiable</h3></div>
            <span className={`cms-status-chip cms-status-chip--${publicViewAccessible ? 'live' : 'draft'}`}>
              {loading ? 'Vérification…' : publicViewAccessible ? 'Accès vérifié' : 'À vérifier'}
            </span>
          </div>
          <div className="cms-page-directory">
            {editablePages.map((page) => (
              <a className="cms-page-row" href={`/admin/editor?path=${encodeURIComponent(page.route)}`} key={page.route}>
                <span className="cms-page-icon" aria-hidden="true">{page.name.charAt(0)}</span>
                <span><strong>{page.name}</strong><small>{page.route} · {page.contentCount} textes inventoriés</small></span>
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
            {!loading && recentBlocks.map((block) => (
              <a key={block.id} href={block.content_key === SIMULATOR_SETTINGS_KEY
                ? '/admin/calculator'
                : `/admin/editor?path=${encodeURIComponent(block.route_path)}&key=${encodeURIComponent(block.content_key)}`}>
                <span className={`cms-change-dot cms-change-dot--${block.status}`} aria-hidden="true" />
                <span><strong>{block.content_key === SIMULATOR_SETTINGS_KEY ? 'Paramètres du simulateur' : block.content_key}</strong><small>{formatter.format(new Date(block.updated_at))}</small></span>
                <span className={`cms-status-chip cms-status-chip--${block.status}`}>
                  {block.status === 'draft' ? 'Brouillon' : `v${block.published_version}`}
                </span>
              </a>
            ))}
            {!loading && recentBlocks.length === 0 && <p className="cms-admin-muted">Aucun contenu enregistré.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
