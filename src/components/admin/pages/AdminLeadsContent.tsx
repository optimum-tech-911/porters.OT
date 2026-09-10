/**
 * AdminLeadsContent — Lead management with filters, table, detail panel
 */
import { useEffect, useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminFilterBar, { type FilterConfig } from '../AdminFilterBar';
import AdminTable, { type Column } from '../AdminTable';
import AdminStatusBadge from '../AdminStatusBadge';
import AdminLeadDetailPanel from '../AdminLeadDetailPanel';
import { useAdminDirectory } from '../useAdminDirectory';
import { supabase } from '../../../lib/supabase';
import type { Lead } from '../../../types/admin';

interface CrmInquiryRow {
  id: string;
  created_at: string;
  updated_at: string;
  kind: 'contact' | 'simulation';
  inquiry_type: 'contact' | 'appointment' | 'application' | 'simulation';
  status: string;
  assigned_admin: string | null;
  first_name: string | null;
  last_name: string | null;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  profile: string | null;
  subject: string | null;
  message: string | null;
  simulator_mode: 'portage' | 'freelance' | null;
  tjm: number | null;
  days_worked: number | null;
  monthly_revenue: number | null;
  professional_expenses: number | null;
  estimated_net_monthly: number | null;
  source_page: string | null;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  session_id: string | null;
  user_agent: string | null;
  metadata: Record<string, unknown> | null;
}

const baseFilters: FilterConfig[] = [
  {
    key: 'source',
    label: 'Source',
    options: [
      { value: 'contact', label: 'Contact' },
      { value: 'simulator', label: 'Simulateur' },
      { value: 'appointment', label: 'Rendez-vous' },
      { value: 'application', label: 'Candidature' },
      { value: 'resources', label: 'Ressources' },
    ],
  },
  {
    key: 'status',
    label: 'Statut',
    options: [
      { value: 'new', label: 'Nouveau' },
      { value: 'contacted', label: 'Contacté' },
      { value: 'qualified', label: 'Qualifié' },
      { value: 'proposal', label: 'Proposition' },
      { value: 'converted', label: 'Converti' },
      { value: 'lost', label: 'Perdu' },
    ],
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
}

export default function AdminLeadsContent() {
  const admins = useAdminDirectory();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filters = useMemo<FilterConfig[]>(() => [
    ...baseFilters,
    {
      key: 'assigned',
      label: 'Assigné à',
      options: admins.map((admin) => ({ value: admin.user_id, label: admin.display_name })),
    },
  ], [admins]);

  useEffect(() => {
    let active = true;
    void supabase
      .from('crm_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error('[Admin] Unable to load leads:', error);
          setLoadError('Impossible de charger les demandes. Vérifiez la migration Supabase et votre session admin.');
          setLoading(false);
          return;
        }
        const mapped = ((data || []) as CrmInquiryRow[]).map<Lead>((row) => {
          const name = row.name || [row.first_name, row.last_name].filter(Boolean).join(' ') || 'Contact sans nom';
          const statusMap: Record<string, Lead['status']> = {
            new: 'new',
            contacted: 'contacted',
            qualified: 'qualified',
            proposal: 'proposal',
            converted: 'converted',
            archived: 'lost',
          };
          const score = Math.min(100, (row.kind === 'simulation' ? 72 : 52) + (row.phone ? 8 : 0) + (row.company ? 8 : 0) + (row.utm_source ? 4 : 0));
          return {
            id: row.id,
            name,
            email: row.email,
            phone: row.phone || '',
            company: row.company || '',
            source: row.inquiry_type === 'simulation' || row.kind === 'simulation' ? 'simulator' : row.inquiry_type,
            status: statusMap[row.status] || 'new',
            assignedAdmin: row.assigned_admin,
            lastInteraction: row.updated_at || row.created_at,
            score,
            createdAt: row.created_at,
            profile: row.profile || undefined,
            subject: row.subject || undefined,
            message: row.message || undefined,
            simulatorMode: row.simulator_mode || undefined,
            tjm: row.tjm ?? undefined,
            daysWorked: row.days_worked ?? undefined,
            monthlyRevenue: row.monthly_revenue ?? undefined,
            professionalExpenses: row.professional_expenses ?? undefined,
            estimatedNetMonthly: row.estimated_net_monthly ?? undefined,
            sourcePage: row.source_page || undefined,
            landingPage: row.landing_page || undefined,
            referrer: row.referrer || undefined,
            utmSource: row.utm_source || undefined,
            utmMedium: row.utm_medium || undefined,
            utmCampaign: row.utm_campaign || undefined,
            utmContent: row.utm_content || undefined,
            utmTerm: row.utm_term || undefined,
            sessionId: row.session_id || undefined,
            userAgent: row.user_agent || undefined,
            metadata: row.metadata || undefined,
          };
        });
        setLeads(mapped);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (activeFilters.source && lead.source !== activeFilters.source) return false;
      if (activeFilters.status && lead.status !== activeFilters.status) return false;
      if (activeFilters.assigned && lead.assignedAdmin !== activeFilters.assigned) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilters, leads, searchQuery]);

  const columns: Column<Lead>[] = [
    {
      key: 'name',
      label: 'Nom',
      sortable: true,
      render: (row) => (
        <div>
          <div className="admin-table-cell-primary">{row.name}</div>
          <div className="admin-table-cell-secondary">{row.company || '—'}</div>
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <span style={{ fontSize: '0.8125rem' }}>{row.email}</span>,
    },
    {
      key: 'source',
      label: 'Source',
      render: (row) => <AdminStatusBadge status={row.source} />,
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (row) => <AdminStatusBadge status={row.status} />,
    },
    {
      key: 'score',
      label: 'Score',
      sortable: true,
      render: (row) => {
        const scoreClass = row.score >= 70 ? 'high' : row.score >= 40 ? 'medium' : 'low';
        return (
          <div className="admin-score-bar">
            <div className="admin-score-track">
              <div className={`admin-score-fill ${scoreClass}`} style={{ width: `${row.score}%` }} />
            </div>
            <span className="admin-score-value">{row.score}</span>
          </div>
        );
      },
    },
    {
      key: 'assignedAdmin',
      label: 'Assigné',
      render: (row) => {
        const admin = admins.find((item) => item.user_id === row.assignedAdmin);
        return <span>{admin?.display_name || (row.assignedAdmin ? 'Administrateur' : '—')}</span>;
      },
    },
    {
      key: 'lastInteraction',
      label: 'Dernier contact',
      sortable: true,
      render: (row) => <span>{formatDate(row.lastInteraction)}</span>,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Leads"
        subtitle={`${leads.length} leads · ${leads.filter((l) => l.status === 'new').length} nouveaux`}
      />

      {loading && <p className="admin-empty-state">Chargement des demandes…</p>}
      {loadError && <p className="admin-empty-state">{loadError}</p>}

      <AdminFilterBar
        filters={filters}
        searchPlaceholder="Rechercher un lead..."
        onFilterChange={setActiveFilters}
        onSearchChange={setSearchQuery}
      />

      {!loading && !loadError && <AdminTable
        columns={columns}
        data={filteredLeads}
        onRowClick={setSelectedLead}
        emptyMessage="Aucun lead ne correspond à vos filtres."
      />}

      {selectedLead && (
        <AdminLeadDetailPanel
          lead={selectedLead}
          admins={admins}
          onUpdated={(updatedLead) => {
            setLeads((current) => current.map((lead) => lead.id === updatedLead.id ? updatedLead : lead));
            setSelectedLead(updatedLead);
          }}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
