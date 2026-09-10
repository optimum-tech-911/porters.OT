type Metadata = Record<string, unknown>;

interface Props {
  metadata?: Metadata;
  userAgent?: string;
}

const labels: Record<string, string> = {
  requestType: 'Type de demande',
  appointmentTopic: 'Sujet du rendez-vous',
  availability: 'Disponibilités',
  city: 'Ville ou zone de recherche',
  linkedin: 'Profil LinkedIn',
  situation: 'Situation',
  simulatorMode: 'Point de départ du simulateur',
  sourceSerial: 'Identifiant du calcul',
  revenueType: 'Base de calcul',
  managementFeePercent: 'Frais de gestion',
  socialChargesPercent: 'Charges sociales',
  ope: 'Opération de calcul',
  tjm: 'TJM saisi',
  ca: 'Chiffre d’affaires saisi',
  salary: 'Salaire saisi',
  cout: 'Coût total saisi',
  notbillable_fees: 'Frais non refacturables',
  contract_type: 'Nature du contrat',
  management_fee: 'Taux de frais de gestion',
  management_fee_fix: 'Frais de gestion fixes',
  nombre_jours: 'Nombre de jours',
  overtime: 'Heures supplémentaires',
  sans_mutuelle: 'Sans mutuelle',
  mutuelle_type: 'Type de mutuelle',
  duree_prestation: 'Durée de prestation',
  cout_total: 'Calcul sur coût total',
};

const moneyKeys = new Set(['tjm', 'ca', 'salary', 'cout', 'notbillable_fees', 'management_fee_fix']);
const percentKeys = new Set(['managementFeePercent', 'socialChargesPercent', 'management_fee']);
const valueLabels: Record<string, string> = {
  application: 'Candidature',
  appointment: 'Rendez-vous',
  contact: 'Contact',
  simulation: 'Simulation',
  tjm: 'Mon TJM',
  revenue: 'Mon chiffre d’affaires',
  gross: 'Mon salaire brut',
  net: 'Mon salaire net',
  total: 'Le coût total salaire',
};

function labelFor(key: string) {
  return labels[key] || key.replace(/_/g, ' ').replace(/^./, (letter) => letter.toUpperCase());
}

function displayValue(key: string, value: unknown): string {
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (typeof value === 'number') {
    const formatted = value.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
    if (moneyKeys.has(key)) return `${formatted} €`;
    if (percentKeys.has(key)) return `${formatted} %`;
    return formatted;
  }
  if (typeof value === 'object' && value !== null) return JSON.stringify(value);
  return valueLabels[String(value)] || String(value);
}

function safeLink(value: unknown) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

export default function CrmMetadataDetails({ metadata, userAgent }: Props) {
  const source = metadata && typeof metadata === 'object' ? metadata : {};
  const payload = source.payload && typeof source.payload === 'object' && !Array.isArray(source.payload)
    ? source.payload as Metadata
    : {};
  const entries = [
    ...Object.entries(source).filter(([key, value]) => key !== 'payload' && value !== null && value !== undefined && value !== ''),
    ...Object.entries(payload).filter(([, value]) => value !== null && value !== undefined && value !== ''),
  ];

  if (entries.length === 0 && !userAgent) return null;

  return (
    <div className="admin-panel-field">
      <div className="admin-panel-field-label">Informations transmises</div>
      <div className="admin-panel-field-value" style={{ display: 'grid', gap: '.55rem', background: 'var(--admin-bg)', padding: '1rem', borderRadius: 'var(--admin-radius-sm)', overflowWrap: 'anywhere' }}>
        {entries.map(([key, value], index) => {
          const href = key === 'linkedin' ? safeLink(value) : null;
          return <div key={`${key}-${index}`} style={{ display: 'grid', gap: '.15rem' }}>
            <strong style={{ fontSize: '.72rem', color: 'var(--admin-text-muted)' }}>{labelFor(key)}</strong>
            {href ? <a href={href} target="_blank" rel="noreferrer">{displayValue(key, value)}</a> : <span>{displayValue(key, value)}</span>}
          </div>;
        })}
        {userAgent && <details>
          <summary style={{ cursor: 'pointer', fontSize: '.75rem', fontWeight: 700 }}>Contexte technique</summary>
          <span style={{ display: 'block', marginTop: '.35rem', fontSize: '.72rem' }}>{userAgent}</span>
        </details>}
      </div>
    </div>
  );
}
