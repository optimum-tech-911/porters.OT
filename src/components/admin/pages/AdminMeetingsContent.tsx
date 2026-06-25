/**
 * AdminMeetingsContent — Meeting management with filters and table
 */
import { useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminFilterBar, { type FilterConfig } from '../AdminFilterBar';
import AdminTable, { type Column } from '../AdminTable';
import AdminStatusBadge from '../AdminStatusBadge';
import { meetings } from '../../../data/admin-demo.data';
import type { Meeting } from '../../../types/admin';

const filters: FilterConfig[] = [
  {
    key: 'status',
    label: 'Statut',
    options: [
      { value: 'pending', label: 'En attente' },
      { value: 'confirmed', label: 'Confirmé' },
      { value: 'done', label: 'Terminé' },
      { value: 'cancelled', label: 'Annulé' },
      { value: 'no-show', label: 'Absent' },
    ],
  },
  {
    key: 'type',
    label: 'Type',
    options: [
      { value: 'consultant', label: 'Consultant' },
      { value: 'enterprise', label: 'Entreprise' },
      { value: 'simulator', label: 'Simulateur' },
      { value: 'contact', label: 'Contact' },
    ],
  },
  {
    key: 'member',
    label: 'Membre',
    options: [...new Set(meetings.map((m) => m.assignedMember))].map((m) => ({
      value: m,
      label: m,
    })),
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function AdminMeetingsContent() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeetings = useMemo(() => {
    return meetings.filter((mtg) => {
      if (activeFilters.status && mtg.status !== activeFilters.status) return false;
      if (activeFilters.type && mtg.type !== activeFilters.type) return false;
      if (activeFilters.member && mtg.assignedMember !== activeFilters.member) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          mtg.title.toLowerCase().includes(q) ||
          mtg.attendeeName.toLowerCase().includes(q) ||
          mtg.attendeeCompany.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilters, searchQuery]);

  const columns: Column<Meeting>[] = [
    {
      key: 'title',
      label: 'Rendez-vous',
      sortable: true,
      render: (row) => (
        <div>
          <div className="admin-table-cell-primary">{row.title}</div>
          <div className="admin-table-cell-secondary">{row.attendeeCompany || row.attendeeName}</div>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (row) => (
        <div>
          <div>{formatDate(row.date)}</div>
          <div className="admin-table-cell-secondary">{row.time} · {row.duration} min</div>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (row) => <AdminStatusBadge status={row.type} />,
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (row) => <AdminStatusBadge status={row.status} />,
    },
    {
      key: 'assignedMember',
      label: 'Membre',
      render: (row) => <span>{row.assignedMember}</span>,
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (row) => (
        <div className="admin-table-cell-truncate" style={{ maxWidth: 200 }}>{row.notes}</div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Rendez-vous"
        subtitle={`${meetings.length} rendez-vous · ${meetings.filter((m) => m.status === 'pending' || m.status === 'confirmed').length} à venir`}
      >
        {/* TODO: Connect to real meeting creation flow */}
        <button className="admin-btn admin-btn-primary" disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Nouveau rendez-vous
        </button>
      </AdminPageHeader>

      <AdminFilterBar
        filters={filters}
        searchPlaceholder="Rechercher un rendez-vous..."
        onFilterChange={setActiveFilters}
        onSearchChange={setSearchQuery}
      />

      <AdminTable
        columns={columns}
        data={filteredMeetings}
        emptyMessage="Aucun rendez-vous ne correspond à vos filtres."
      />
    </div>
  );
}
