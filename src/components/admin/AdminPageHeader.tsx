/**
 * AdminPageHeader — Page title area with optional actions
 */
interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function AdminPageHeader({ title, subtitle, children }: Props) {
  return (
    <div className="admin-page-header">
      <div className="admin-page-header-left">
        <h2 className="admin-page-title">{title}</h2>
        {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
      </div>
      {children && (
        <div className="admin-page-header-actions">
          {children}
        </div>
      )}
    </div>
  );
}
