/**
 * AdminNotificationItem — Individual notification row
 * TODO: Connect mark-as-read to Supabase when backend is ready.
 */
import type { Notification } from '../../types/admin';

const typeIcons: Record<string, { emoji: string; className: string }> = {
  message: { emoji: '✉', className: 'message' },
  meeting: { emoji: '📅', className: 'meeting' },
  lead: { emoji: '👤', className: 'lead' },
  calculator: { emoji: '🧮', className: 'calculator' },
  system: { emoji: '⚙', className: 'team' },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface Props {
  notification: Notification;
  onMarkRead?: (id: string) => void;
}

export default function AdminNotificationItem({ notification, onMarkRead }: Props) {
  const iconInfo = typeIcons[notification.type] || typeIcons.system;

  return (
    <div className={`admin-notification-item${!notification.read ? ' unread' : ''}`}>
      <div className={`admin-notification-icon admin-activity-icon ${iconInfo.className}`}>
        {iconInfo.emoji}
      </div>
      <div className="admin-notification-body">
        <p className="admin-notification-title">{notification.title}</p>
        <p className="admin-notification-message">{notification.message}</p>
        <div className="admin-notification-time">{formatDate(notification.date)}</div>
      </div>
      <div className="admin-notification-actions">
        {!notification.read && (
          <button
            className="admin-btn admin-btn-ghost admin-btn-sm"
            onClick={() => onMarkRead?.(notification.id)}
            title="Marquer comme lu"
          >
            ✓
          </button>
        )}
      </div>
    </div>
  );
}
