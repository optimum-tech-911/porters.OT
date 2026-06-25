/**
 * AdminAnalyticsContent — Premium analytics dashboard with CSS/SVG charts
 * TODO: Connect to privacy-friendly analytics (Plausible, Umami, or custom Supabase events)
 * TODO: Implement GDPR consent handling before any real visitor tracking
 * TODO: Store analytics events in Supabase for custom dashboards
 * NOTE: All data is fictional demo data for UI preview only. No real tracking script is active.
 */
import AdminPageHeader from '../AdminPageHeader';
import AdminMetricCard from '../AdminMetricCard';
import AdminChartCard from '../AdminChartCard';
import { analyticsData } from '../../../data/admin-demo.data';

const donutColors = ['#192B63', '#D6B45A', '#3d6bce', '#2d7a4f', '#8896b3'];

function DonutChart({ data }: { data: { label: string; value: number }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;

  const slices = data.map((d, i) => {
    const start = cumulative;
    cumulative += (d.value / total) * 360;
    return { ...d, start, end: cumulative, color: donutColors[i % donutColors.length] };
  });

  // Build conic-gradient
  const gradient = slices
    .map((s) => `${s.color} ${s.start}deg ${s.end}deg`)
    .join(', ');

  return (
    <div className="admin-donut-container">
      <div
        className="admin-donut-chart"
        style={{
          background: `conic-gradient(${gradient})`,
          borderRadius: '50%',
          position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: '25%',
          background: 'var(--admin-card-bg)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '0.875rem',
          color: 'var(--admin-navy)',
        }}>
          {total}%
        </div>
      </div>
      <div className="admin-donut-legend">
        {slices.map((s) => (
          <div key={s.label} className="admin-donut-legend-item">
            <span className="admin-donut-legend-dot" style={{ background: s.color }} />
            <span>{s.label}</span>
            <span className="admin-donut-legend-value">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminAnalyticsContent() {
  return (
    <div>
      <AdminPageHeader
        title="Analytics"
        subtitle="Données de démonstration — aucun tracking réel actif"
      />

      {/* Top metrics */}
      <div className="admin-grid-4" style={{ marginBottom: '1.5rem' }}>
        <AdminMetricCard
          label="Visiteurs"
          value={analyticsData.visitors.toLocaleString('fr-FR')}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
          }
          trend={{ direction: 'up', value: '+18% ce mois' }}
        />
        <AdminMetricCard
          label="Visiteurs uniques"
          value={analyticsData.uniqueVisitors.toLocaleString('fr-FR')}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
            </svg>
          }
          trend={{ direction: 'up', value: '+12% ce mois' }}
        />
        <AdminMetricCard
          label="Conversions contact"
          value={analyticsData.contactConversions}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
            </svg>
          }
          trend={{ direction: 'up', value: 'Taux 7.6%' }}
        />
        <AdminMetricCard
          label="Clics rendez-vous"
          value={analyticsData.appointmentClicks}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          }
          trend={{ direction: 'up', value: '+8%' }}
        />
      </div>

      {/* Conversion Funnel + Top Pages */}
      <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
        <AdminChartCard title="Entonnoir de conversion" subtitle="Parcours visiteur → lead qualifié">
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

        <AdminChartCard title="Pages les plus visitées" subtitle="Top 10 par nombre de vues">
          <div className="admin-chart-bar-container">
            {analyticsData.topPages.map((page) => {
              const maxViews = analyticsData.topPages[0].views;
              const width = (page.views / maxViews) * 100;
              return (
                <div key={page.page} className="admin-chart-bar-row">
                  <span className="admin-chart-bar-label" title={page.page}>{page.page}</span>
                  <div className="admin-chart-bar-track">
                    <div className="admin-chart-bar-fill navy" style={{ width: `${width}%` }} />
                  </div>
                  <span className="admin-chart-bar-value">{page.views.toLocaleString('fr-FR')}</span>
                </div>
              );
            })}
          </div>
        </AdminChartCard>
      </div>

      {/* Devices + Browsers */}
      <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
        <AdminChartCard title="Appareils" subtitle="Répartition par type d'appareil">
          <DonutChart data={analyticsData.devices.map((d) => ({ label: d.device, value: d.percentage }))} />
        </AdminChartCard>

        <AdminChartCard title="Navigateurs" subtitle="Répartition par navigateur">
          <DonutChart data={analyticsData.browsers.map((b) => ({ label: b.browser, value: b.percentage }))} />
        </AdminChartCard>
      </div>

      {/* Traffic Sources */}
      <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
        <AdminChartCard title="Sources de trafic" subtitle="Origine des visiteurs">
          <div className="admin-chart-bar-container">
            {analyticsData.sources.map((source, i) => {
              const maxPct = analyticsData.sources[0].percentage;
              const width = (source.percentage / maxPct) * 100;
              const colorClasses = ['navy', 'gold', 'accent', 'navy', 'gold', 'accent', 'navy'];
              return (
                <div key={source.source} className="admin-chart-bar-row">
                  <span className="admin-chart-bar-label">{source.source}</span>
                  <div className="admin-chart-bar-track">
                    <div className={`admin-chart-bar-fill ${colorClasses[i % colorClasses.length]}`} style={{ width: `${width}%` }} />
                  </div>
                  <span className="admin-chart-bar-value">{source.visitors.toLocaleString('fr-FR')} ({source.percentage}%)</span>
                </div>
              );
            })}
          </div>
        </AdminChartCard>

        {/* Simulator funnel */}
        <AdminChartCard title="Simulateur" subtitle="Conversions du simulateur de salaire">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(25,43,99,0.03)', borderRadius: 'var(--admin-radius)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#192B63' }}>
                {analyticsData.simulatorStarts.toLocaleString('fr-FR')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>Simulations démarrées</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(45,122,79,0.05)', borderRadius: 'var(--admin-radius)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2d7a4f' }}>
                {analyticsData.simulatorCompletions.toLocaleString('fr-FR')}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>Simulations complétées</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(214,180,90,0.08)', borderRadius: 'var(--admin-radius)' }}>
            <span style={{ fontWeight: 700, color: '#a08530' }}>
              {((analyticsData.simulatorCompletions / analyticsData.simulatorStarts) * 100).toFixed(1)}%
            </span>
            <span style={{ color: 'var(--admin-text-secondary)', fontSize: '0.8125rem' }}> taux de complétion</span>
          </div>
        </AdminChartCard>
      </div>

      {/* Countries + Cities */}
      <div className="admin-grid-2" style={{ marginBottom: '1.5rem' }}>
        <AdminChartCard title="Pays" subtitle="Origine géographique des visiteurs">
          <div className="admin-chart-bar-container">
            {analyticsData.countries.map((c) => {
              const maxV = analyticsData.countries[0].visitors;
              const width = (c.visitors / maxV) * 100;
              return (
                <div key={c.country} className="admin-chart-bar-row">
                  <span className="admin-chart-bar-label">{c.country}</span>
                  <div className="admin-chart-bar-track">
                    <div className="admin-chart-bar-fill navy" style={{ width: `${width}%` }} />
                  </div>
                  <span className="admin-chart-bar-value">{c.visitors.toLocaleString('fr-FR')}</span>
                </div>
              );
            })}
          </div>
        </AdminChartCard>

        <AdminChartCard title="Villes" subtitle="Top villes françaises">
          <div className="admin-chart-bar-container">
            {analyticsData.cities.map((c) => {
              const maxV = analyticsData.cities[0].visitors;
              const width = (c.visitors / maxV) * 100;
              return (
                <div key={c.city} className="admin-chart-bar-row">
                  <span className="admin-chart-bar-label">{c.city}</span>
                  <div className="admin-chart-bar-track">
                    <div className="admin-chart-bar-fill gold" style={{ width: `${width}%` }} />
                  </div>
                  <span className="admin-chart-bar-value">{c.visitors.toLocaleString('fr-FR')}</span>
                </div>
              );
            })}
          </div>
        </AdminChartCard>
      </div>


    </div>
  );
}
