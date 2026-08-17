/**
 * AdminMessagesContent — Contact messages inbox with filters and detail panel
 */
import { useEffect, useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminFilterBar, { type FilterConfig } from '../AdminFilterBar';
import AdminTable, { type Column } from '../AdminTable';
import AdminStatusBadge from '../AdminStatusBadge';
import AdminMessageDetailPanel from '../AdminMessageDetailPanel';
import { adminUsers } from '../../../data/admin-demo.data';
import { supabase } from '../../../lib/supabase';
import type { ContactMessage } from '../../../types/admin';

interface ContactInquiryRow {
  id: string;
  created_at: string;
  status: string;
  priority: string;
  assigned_admin: string | null;
  name: string | null;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string | null;
  source_page: string | null;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  session_id: string | null;
}

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
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let active = true;
    void supabase
      .from('crm_inquiries')
      .select('*')
      .eq('kind', 'contact')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error('[Admin] Unable to load contact messages:', error);
          setLoadError('Impossible de charger les messages. Vérifiez la migration Supabase et votre session admin.');
          setLoading(false);
          return;
        }
        const statusMap: Record<string, ContactMessage['status']> = {
          new: 'new',
          contacted: 'assigned',
          qualified: 'answered',
          converted: 'answered',
          archived: 'archived',
        };
        setContactMessages(((data || []) as ContactInquiryRow[]).map((row) => ({
          id: row.id,
          senderName: row.name || 'Contact sans nom',
          email: row.email,
          phone: row.phone || '',
          company: row.company || '',
          message: row.message || '',
          sourcePage: row.source_page || '/',
          status: statusMap[row.status] || 'new',
          assignedAdmin: row.assigned_admin,
          priority: (['high', 'medium', 'low'].includes(row.priority) ? row.priority : 'medium') as ContactMessage['priority'],
          createdAt: row.created_at,
          subject: row.subject || undefined,
          landingPage: row.landing_page || undefined,
          referrer: row.referrer || undefined,
          utmSource: row.utm_source || undefined,
          utmMedium: row.utm_medium || undefined,
          utmCampaign: row.utm_campaign || undefined,
          utmContent: row.utm_content || undefined,
          utmTerm: row.utm_term || undefined,
          sessionId: row.session_id || undefined,
        })));
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

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

      {loading && <p className="admin-empty-state">Chargement des messages…</p>}
      {loadError && <p className="admin-empty-state">{loadError}</p>}

      <AdminFilterBar
        filters={filters}
        searchPlaceholder="Rechercher un message..."
        onFilterChange={setActiveFilters}
        onSearchChange={setSearchQuery}
      />

      {!loading && !loadError && <AdminTable
        columns={columns}
        data={filteredMessages}
        onRowClick={setSelectedMessage}
        emptyMessage="Aucun message ne correspond à vos filtres."
      />}

      {selectedMessage && (
        <AdminMessageDetailPanel
          message={selectedMessage}
          onUpdated={(updatedMessage) => {
            setContactMessages((current) => current.map((message) => message.id === updatedMessage.id ? updatedMessage : message));
            setSelectedMessage(updatedMessage);
          }}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
}
