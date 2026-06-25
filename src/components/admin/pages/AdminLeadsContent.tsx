/**
 * AdminLeadsContent — Lead management with filters, table, detail panel
 */
import { useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminFilterBar, { type FilterConfig } from '../AdminFilterBar';
import AdminTable, { type Column } from '../AdminTable';
import AdminStatusBadge from '../AdminStatusBadge';
import AdminLeadDetailPanel from '../AdminLeadDetailPanel';
import { leads, adminUsers } from '../../../data/admin-demo.data';
import type { Lead } from '../../../types/admin';

const filters: FilterConfig[] = [
  {
    key: 'source',
    label: 'Source',
    options: [
      { value: 'contact', label: 'Contact' },
      { value: 'simulator', label: 'Simulateur' },
      { value: 'appointment', label: 'Rendez-vous' },
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
  {
    key: 'assigned',
    label: 'Assigné à',
    options: adminUsers.map((u) => ({ value: u.id, label: u.name })),
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });
}

export default function AdminLeadsContent() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

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
  }, [activeFilters, searchQuery]);

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
        const user = adminUsers.find((u) => u.id === row.assignedAdmin);
        return <span>{user ? user.name : '—'}</span>;
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

      <AdminFilterBar
        filters={filters}
        searchPlaceholder="Rechercher un lead..."
        onFilterChange={setActiveFilters}
        onSearchChange={setSearchQuery}
      />

      <AdminTable
        columns={columns}
        data={filteredLeads}
        onRowClick={setSelectedLead}
        emptyMessage="Aucun lead ne correspond à vos filtres."
      />

      {selectedLead && (
        <AdminLeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
