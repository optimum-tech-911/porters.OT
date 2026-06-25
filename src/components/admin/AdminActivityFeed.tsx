/**
 * AdminActivityFeed — Vertical timeline of recent activity
 */
import type { ActivityItem } from '../../types/admin';

const typeIcons: Record<string, string> = {
  message: '✉',
  lead: '👤',
  meeting: '📅',
  calculator: '🧮',
  team: '⚙',
};

function formatRelativeTime(dateStr: string): string {
  const now = new Date('2026-06-24T12:00:00');
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays === 1) return 'Hier';
  return `Il y a ${diffDays}j`;
}

interface Props {
  activities: ActivityItem[];
  maxItems?: number;
}

export default function AdminActivityFeed({ activities, maxItems = 8 }: Props) {
  const items = activities.slice(0, maxItems);

  return (
    <div className="admin-activity-feed">
      {items.map((item) => (
        <div key={item.id} className="admin-activity-item">
          <div className={`admin-activity-icon ${item.type}`}>
            {typeIcons[item.type] || '•'}
          </div>
          <div className="admin-activity-content">
            <p className="admin-activity-text">{item.description}</p>
            <div className="admin-activity-time">
              {formatRelativeTime(item.date)} · {item.user}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
