/**
 * AdminCalculatorContent — Calculator formula settings + submissions table
 * TODO: Formula settings should be stored in Supabase and versioned.
 * TODO: Implement formula versioning so historical submissions reference the
 *       correct formula at the time of calculation.
 */
import { useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminChartCard from '../AdminChartCard';
import AdminFilterBar, { type FilterConfig } from '../AdminFilterBar';
import AdminTable, { type Column } from '../AdminTable';
import AdminStatusBadge from '../AdminStatusBadge';
import { formulaSettings, calculatorSubmissions } from '../../../data/admin-demo.data';
import type { CalculatorSubmission } from '../../../types/admin';

const filters: FilterConfig[] = [
  {
    key: 'followUpStatus',
    label: 'Suivi',
    options: [
      { value: 'pending', label: 'En attente' },
      { value: 'contacted', label: 'Contacté' },
      { value: 'converted', label: 'Converti' },
      { value: 'not-interested', label: 'Non intéressé' },
    ],
  },
];

function formatCurrency(n: number): string {
  return n.toLocaleString('fr-FR') + ' €';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminCalculatorContent() {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return calculatorSubmissions.filter((sub) => {
      if (activeFilters.followUpStatus && sub.followUpStatus !== activeFilters.followUpStatus) return false;
      return true;
    });
  }, [activeFilters]);

  const columns: Column<CalculatorSubmission>[] = [
    {
      key: 'tjm',
      label: 'TJM',
      sortable: true,
      render: (row) => <span className="admin-table-cell-primary">{formatCurrency(row.tjm)}</span>,
    },
    {
      key: 'daysWorked',
      label: 'Jours',
      render: (row) => <span>{row.daysWorked}j</span>,
    },
    {
      key: 'expenses',
      label: 'Frais',
      render: (row) => <span>{formatCurrency(row.expenses)}</span>,
    },
    {
      key: 'estimatedNetSalary',
      label: 'Net estimé',
      sortable: true,
      render: (row) => (
        <span style={{ fontWeight: 600, color: '#2d7a4f' }}>{formatCurrency(row.estimatedNetSalary)}</span>
      ),
    },
    {
      key: 'email',
      label: 'Contact',
      render: (row) => (
        <div>
          <div>{row.email || '—'}</div>
          {row.phone && <div className="admin-table-cell-secondary">{row.phone}</div>}
        </div>
      ),
    },
    {
      key: 'formulaVersion',
      label: 'Version',
      render: (row) => (
        <span style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{row.formulaVersion}</span>
      ),
    },
    {
      key: 'followUpStatus',
      label: 'Suivi',
      render: (row) => <AdminStatusBadge status={row.followUpStatus} />,
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
        title="Simulateur"
        subtitle="Gestion de la formule de calcul et des soumissions"
      />

      {/* Formula Settings Card */}
      <AdminChartCard
        title="Paramètres de la formule"
        subtitle={`Version ${formulaSettings.version} — Dernière mise à jour : ${new Date(formulaSettings.lastUpdated).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--admin-text-secondary)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Frais de gestion
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#192B63' }}>
              {formulaSettings.managementFeePercent}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--admin-text-secondary)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Charges sociales estimées
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#192B63' }}>
              {formulaSettings.socialChargesPercent}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--admin-text-secondary)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Jours travaillés par défaut
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#192B63' }}>
              {formulaSettings.defaultWorkedDays}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--admin-text-secondary)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              Version formule
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#192B63', fontFamily: 'monospace' }}>
              {formulaSettings.version}
            </div>
          </div>
        </div>


      </AdminChartCard>

      {/* Submissions Table */}
      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 600, color: '#192B63', marginBottom: '1rem' }}>
          Soumissions ({calculatorSubmissions.length})
        </h3>

        <AdminFilterBar
          filters={filters}
          searchPlaceholder="Rechercher par email..."
          onFilterChange={setActiveFilters}
        />

        <AdminTable
          columns={columns}
          data={filtered}
          emptyMessage="Aucune soumission ne correspond à vos filtres."
        />
      </div>
    </div>
  );
}
