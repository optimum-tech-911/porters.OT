/** Administer the live simulator assumptions and review calculator leads. */
import { useEffect, useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminChartCard from '../AdminChartCard';
import AdminFilterBar, { type FilterConfig } from '../AdminFilterBar';
import AdminTable, { type Column } from '../AdminTable';
import AdminStatusBadge from '../AdminStatusBadge';
import { calculatorSubmissions } from '../../../data/admin-demo.data';
import type { CalculatorSubmission } from '../../../types/admin';
import { supabase } from '../../../lib/supabase';
import {
  defaultSimulatorSettings,
  parseSimulatorSettings,
  SIMULATOR_SETTINGS_KEY,
  SIMULATOR_SETTINGS_ROUTE,
  type SimulatorSettings,
} from '../../../data/simulator-settings';

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
  const [settings, setSettings] = useState<SimulatorSettings>(defaultSimulatorSettings);
  const [settingsExist, setSettingsExist] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsNotice, setSettingsNotice] = useState('');
  const [settingsError, setSettingsError] = useState('');

  useEffect(() => {
    let active = true;
    void supabase
      .from('cms_content_blocks')
      .select('draft_content')
      .eq('content_key', SIMULATOR_SETTINGS_KEY)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setSettingsError('Les paramètres du simulateur n’ont pas pu être chargés.');
        if (data?.draft_content) {
          setSettings(parseSimulatorSettings(data.draft_content));
          setSettingsExist(true);
        }
        setLoadingSettings(false);
      });
    return () => {
      active = false;
    };
  }, []);

  function updateSetting<K extends keyof SimulatorSettings>(key: K, value: SimulatorSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setSettingsNotice('');
    setSettingsError('');
  }

  async function saveSettings() {
    const normalized = parseSimulatorSettings(settings);
    setSettings(normalized);
    setSavingSettings(true);
    setSettingsNotice('');
    setSettingsError('');
    const payload = JSON.stringify(normalized);

    if (!settingsExist) {
      const { error: createError } = await supabase.rpc('cms_create_content_block', {
        requested_key: SIMULATOR_SETTINGS_KEY,
        requested_route: SIMULATOR_SETTINGS_ROUTE,
        requested_element_type: 'paragraph',
        requested_fallback: payload,
      });
      if (createError && createError.code !== '23505') {
        setSavingSettings(false);
        setSettingsError(createError.message || 'Impossible d’initialiser les paramètres.');
        return;
      }
      setSettingsExist(true);
    }

    const { error: draftError } = await supabase.rpc('cms_save_draft', {
      requested_key: SIMULATOR_SETTINGS_KEY,
      requested_content: payload,
      requested_format: {},
    });
    if (draftError) {
      setSavingSettings(false);
      setSettingsError(draftError.message || 'Le brouillon n’a pas pu être enregistré.');
      return;
    }

    const { error: publishError } = await supabase.rpc('cms_publish_content', {
      requested_key: SIMULATOR_SETTINGS_KEY,
    });
    setSavingSettings(false);
    if (publishError) {
      setSettingsError(publishError.message || 'Les paramètres n’ont pas pu être publiés.');
      return;
    }
    setSettingsNotice('Paramètres publiés. Ils sont maintenant utilisés par le simulateur.');
  }

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

      <AdminChartCard
        title="Paramètres publiés du simulateur"
        subtitle="Ces valeurs et textes alimentent directement le simulateur public. Chaque publication est versionnée dans le CMS."
      >
        <fieldset disabled={loadingSettings || savingSettings} style={{ border: 0, padding: 0, margin: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {([
              ['managementFeePercent', 'Frais de gestion (%)', 0, 30, 0.1],
              ['socialChargesPercent', 'Charges sociales (%)', 0, 70, 0.1],
              ['monthlyExpenses', 'Frais professionnels (€)', 0, 10000, 50],
              ['defaultMonthlyRevenue', 'CA mensuel par défaut (€)', 3000, 25000, 100],
              ['defaultTjm', 'TJM par défaut (€)', 250, 1200, 10],
              ['defaultWorkedDays', 'Jours facturés par défaut', 4, 22, 1],
            ] as const).map(([key, label, min, max, step]) => (
              <label key={key} style={{ display: 'grid', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-text-secondary)', letterSpacing: '0.05em' }}>
                  {label}
                </span>
                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={settings[key]}
                  onChange={(event) => updateSetting(key, Number(event.target.value))}
                  style={{ minHeight: '2.75rem', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.65rem 0.75rem', color: '#192B63', background: '#fff', font: 'inherit', fontWeight: 650 }}
                />
              </label>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            {([
              ['portageDescription', 'Texte du parcours portage'],
              ['freelanceDescription', 'Texte du parcours freelance'],
              ['resultDisclaimer', 'Précision sous le résultat'],
              ['legalNotice', 'Mention indicative en bas de page'],
            ] as const).map(([key, label]) => (
              <label key={key} style={{ display: 'grid', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--admin-text-secondary)', letterSpacing: '0.05em' }}>
                  {label}
                </span>
                <textarea
                  rows={2}
                  maxLength={1000}
                  value={settings[key]}
                  onChange={(event) => updateSetting(key, event.target.value)}
                  style={{ width: '100%', resize: 'vertical', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '0.75rem', color: '#192B63', background: '#fff', font: 'inherit', lineHeight: 1.5 }}
                />
              </label>
            ))}
          </div>
        </fieldset>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.8rem', marginTop: '1.25rem' }}>
          <button
            type="button"
            onClick={() => void saveSettings()}
            disabled={loadingSettings || savingSettings}
            style={{ minHeight: '2.75rem', border: 0, borderRadius: '999px', padding: '0.7rem 1.2rem', background: '#192B63', color: '#fff', font: 'inherit', fontWeight: 700, cursor: loadingSettings || savingSettings ? 'wait' : 'pointer', opacity: loadingSettings || savingSettings ? 0.65 : 1 }}
          >
            {loadingSettings ? 'Chargement…' : savingSettings ? 'Publication…' : 'Enregistrer et publier'}
          </button>
          {settingsNotice && <p role="status" style={{ margin: 0, color: '#2d7a4f', fontSize: '0.82rem', fontWeight: 650 }}>{settingsNotice}</p>}
          {settingsError && <p role="alert" style={{ margin: 0, color: '#b42318', fontSize: '0.82rem', fontWeight: 650 }}>{settingsError}</p>}
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
