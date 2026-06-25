/**
 * AdminDashboardContent — Dashboard overview with metrics, charts, activity
 */
import AdminPageHeader from '../AdminPageHeader';
import AdminMetricCard from '../AdminMetricCard';
import AdminChartCard from '../AdminChartCard';
import AdminActivityFeed from '../AdminActivityFeed';
import AdminNotificationItem from '../AdminNotificationItem';
import AdminQuickActions from '../AdminQuickActions';
import {
  dashboardMetrics,
  recentActivity,
  notifications,
  analyticsData,
} from '../../../data/admin-demo.data';

export default function AdminDashboardContent() {
  const latestNotifications = notifications.filter((n) => !n.read).slice(0, 5);
  const topPages = analyticsData.topPages.slice(0, 5);

  return (
    <div>
      <AdminPageHeader
        title="Tableau de bord"
        subtitle="Vue d'ensemble de l'activité The Porters"
      />

      {/* Metric Cards */}
      <div className="admin-grid-4" style={{ marginBottom: '1.5rem' }}>
        <AdminMetricCard
          label="Nouveaux leads"
          value={dashboardMetrics.newLeadsToday}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
          }
          trend={{ direction: 'up', value: '+12% vs hier' }}
        />
        <AdminMetricCard
          label="Messages"
          value={dashboardMetrics.newMessagesToday}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          }
          trend={{ direction: 'up', value: '+2 ce matin' }}
        />
        <AdminMetricCard
          label="Simulations"
          value={dashboardMetrics.simSubmissionsToday}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/>
            </svg>
          }
          trend={{ direction: 'neutral', value: 'Stable' }}
        />
        <AdminMetricCard
          label="RDV à venir"
          value={dashboardMetrics.upcomingMeetings}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }
          trend={{ direction: 'up', value: '3 cette semaine' }}
        />
      </div>

      {/* Main grid: Funnel + Activity */}
      <div className="admin-grid-main-sidebar" style={{ marginBottom: '1.5rem' }}>
        {/* Conversion Funnel */}
        <AdminChartCard title="Entonnoir de conversion" subtitle="Derniers 30 jours">
          <div className="admin-funnel">
            {analyticsData.funnelSteps.map((step, i) => {
              const maxCount = analyticsData.funnelSteps[0].count;
              const width = Math.max((step.count / maxCount) * 100, 8);
              const opacity = 1 - (i * 0.12);
              return (
                <div key={step.step} className="admin-funnel-step" style={{ marginBottom: '0.375rem' }}>
                  <span className="admin-funnel-label">{step.step}</span>
                  <div className="admin-funnel-bar" style={{
                    width: `${width}%`,
                    background: `rgba(25, 43, 99, ${opacity})`,
                    color: opacity > 0.5 ? '#fff' : '#192B63',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                  }}>
                    {step.count.toLocaleString('fr-FR')}
                  </div>
                  <span className="admin-funnel-value">{step.rate}%</span>
                </div>
              );
            })}
          </div>
        </AdminChartCard>

        {/* Recent Activity */}
        <AdminChartCard title="Activité récente" subtitle="Dernières actions">
          <AdminActivityFeed activities={recentActivity} maxItems={6} />
        </AdminChartCard>
      </div>

      {/* Second row: Notifications + Top Pages */}
      <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
        <AdminChartCard
          title="Notifications récentes"
          subtitle={`${latestNotifications.length} non lues`}
          action={
            <a href="/admin/notifications" className="admin-btn admin-btn-ghost admin-btn-sm">
              Tout voir →
            </a>
          }
        >
          <div>
            {latestNotifications.map((n) => (
              <AdminNotificationItem key={n.id} notification={n} />
            ))}
          </div>
        </AdminChartCard>

        <AdminChartCard title="Pages les plus visitées" subtitle="Demo — données fictives">
          <div className="admin-chart-bar-container">
            {topPages.map((page) => {
              const maxViews = topPages[0].views;
              const width = (page.views / maxViews) * 100;
              return (
                <div key={page.page} className="admin-chart-bar-row">
                  <span className="admin-chart-bar-label" title={page.page}>{page.page}</span>
                  <div className="admin-chart-bar-track">
                    <div
                      className="admin-chart-bar-fill navy"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <span className="admin-chart-bar-value">{page.views.toLocaleString('fr-FR')}</span>
                </div>
              );
            })}
          </div>
        </AdminChartCard>
      </div>

      {/* Quick Actions */}
      <AdminChartCard title="Actions rapides" subtitle="Accès direct aux fonctionnalités principales">
        <AdminQuickActions />
      </AdminChartCard>
    </div>
  );
}
