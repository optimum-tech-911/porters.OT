/**
 * AdminChartCard — Card wrapper for chart visualizations
 */
interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function AdminChartCard({ title, subtitle, children, action }: Props) {
  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <div>
          <h3 className="admin-card-title">{title}</h3>
          {subtitle && <p className="admin-card-subtitle">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
