/**
 * AdminMessagesContent — Contact messages inbox with filters and detail panel
 */
import { useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminFilterBar, { type FilterConfig } from '../AdminFilterBar';
import AdminTable, { type Column } from '../AdminTable';
import AdminStatusBadge from '../AdminStatusBadge';
import AdminMessageDetailPanel from '../AdminMessageDetailPanel';
import { contactMessages, adminUsers } from '../../../data/admin-demo.data';
import type { ContactMessage } from '../../../types/admin';

const filters: FilterConfig[] = [
  {
    key: 'status',
    label: 'Statut',
    options: [
      { value: 'new', label: 'Nouveau' },
      { value: 'assigned', label: 'Assigné' },
      { value: 'answered', label: 'Répondu' },
      { value: 'archived', label: 'Archivé' },
    ],
  },
  {
    key: 'priority',
    label: 'Priorité',
    options: [
      { value: 'high', label: 'Haute' },
      { value: 'medium', label: 'Moyenne' },
      { value: 'low', label: 'Basse' },
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
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminMessagesContent() {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = useMemo(() => {
    return contactMessages.filter((msg) => {
      if (activeFilters.status && msg.status !== activeFilters.status) return false;
      if (activeFilters.priority && msg.priority !== activeFilters.priority) return false;
      if (activeFilters.assigned && msg.assignedAdmin !== activeFilters.assigned) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          msg.senderName.toLowerCase().includes(q) ||
          msg.email.toLowerCase().includes(q) ||
          msg.company.toLowerCase().includes(q) ||
          msg.message.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeFilters, searchQuery]);

  const columns: Column<ContactMessage>[] = [
    {
      key: 'senderName',
      label: 'Expéditeur',
      sortable: true,
      render: (row) => (
        <div>
          <div className="admin-table-cell-primary">{row.senderName}</div>
          <div className="admin-table-cell-secondary">{row.company || '—'}</div>
        </div>
      ),
    },
    {
      key: 'message',
      label: 'Message',
      render: (row) => (
        <div className="admin-table-cell-truncate">{row.message}</div>
      ),
    },
    {
      key: 'sourcePage',
      label: 'Source',
      render: (row) => (
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{row.sourcePage}</span>
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      sortable: true,
      render: (row) => <AdminStatusBadge status={row.status} />,
    },
    {
      key: 'priority',
      label: 'Priorité',
      render: (row) => <AdminStatusBadge status={row.priority} />,
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
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      render: (row) => <span>{formatDate(row.createdAt)}</span>,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        subtitle={`${contactMessages.length} messages · ${contactMessages.filter((m) => m.status === 'new').length} nouveaux`}
      />

      <AdminFilterBar
        filters={filters}
        searchPlaceholder="Rechercher un message..."
        onFilterChange={setActiveFilters}
        onSearchChange={setSearchQuery}
      />

      <AdminTable
        columns={columns}
        data={filteredMessages}
        onRowClick={setSelectedMessage}
        emptyMessage="Aucun message ne correspond à vos filtres."
      />

      {selectedMessage && (
        <AdminMessageDetailPanel
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
}
