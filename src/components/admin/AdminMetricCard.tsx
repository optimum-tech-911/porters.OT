/**
 * AdminMetricCard — KPI metric card with icon, value, trend
 */
interface Props {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { direction: 'up' | 'down' | 'neutral'; value: string };
}

export default function AdminMetricCard({ label, value, icon, trend }: Props) {
  return (
    <div className="admin-metric-card">
      <div className="admin-metric-icon">{icon}</div>
      <div className="admin-metric-label">{label}</div>
      <div className="admin-metric-value">{value}</div>
      {trend && (
        <div className={`admin-metric-trend ${trend.direction}`}>
          {trend.direction === 'up' && '↑'}
          {trend.direction === 'down' && '↓'}
          {trend.direction === 'neutral' && '→'}
          {' '}{trend.value}
        </div>
      )}
    </div>
  );
}
