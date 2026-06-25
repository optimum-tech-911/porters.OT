/**
 * AdminNotificationsContent — In-app notifications page
 * TODO: Connect to Supabase real-time notifications when backend is ready.
 */
import { useState, useMemo } from 'react';
import AdminPageHeader from '../AdminPageHeader';
import AdminNotificationItem from '../AdminNotificationItem';
import { notifications as allNotifications } from '../../../data/admin-demo.data';
import type { NotificationType } from '../../../types/admin';

type FilterTab = 'all' | 'unread' | NotificationType;

const tabs: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Toutes' },
  { key: 'unread', label: 'Non lues' },
  { key: 'meeting', label: 'Rendez-vous' },
  { key: 'lead', label: 'Leads' },
  { key: 'message', label: 'Messages' },
  { key: 'calculator', label: 'Simulateur' },
];

export default function AdminNotificationsContent() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const handleMarkRead = (id: string) => {
    setReadIds((prev) => new Set([...prev, id]));
  };

  const handleMarkAllRead = () => {
    setReadIds(new Set(allNotifications.map((n) => n.id)));
  };

  const notificationsWithState = useMemo(() => {
    return allNotifications.map((n) => ({
      ...n,
      read: n.read || readIds.has(n.id),
    }));
  }, [readIds]);

  const filtered = useMemo(() => {
    return notificationsWithState.filter((n) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'unread') return !n.read;
      return n.type === activeTab;
    });
  }, [activeTab, notificationsWithState]);

  const unreadCount = notificationsWithState.filter((n) => !n.read).length;

  return (
    <div>
      <AdminPageHeader
        title="Notifications"
        subtitle={`${unreadCount} notification${unreadCount !== 1 ? 's' : ''} non lue${unreadCount !== 1 ? 's' : ''}`}
      >
        <button
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
        >
          Tout marquer comme lu
        </button>
      </AdminPageHeader>

      {/* Tabs */}
      <div className="admin-tabs">
        {tabs.map((tab) => {
          const count = tab.key === 'all'
            ? notificationsWithState.length
            : tab.key === 'unread'
              ? unreadCount
              : notificationsWithState.filter((n) => n.type === tab.key).length;
          return (
            <button
              key={tab.key}
              className={`admin-tab${activeTab === tab.key ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              <span className="admin-tab-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div className="admin-card" style={{ padding: 0 }}>
        {filtered.length > 0 ? (
          filtered.map((n) => (
            <AdminNotificationItem
              key={n.id}
              notification={n}
              onMarkRead={handleMarkRead}
            />
          ))
        ) : (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            </div>
            <p className="admin-empty-title">Aucune notification</p>
            <p className="admin-empty-message">Pas de notification dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
