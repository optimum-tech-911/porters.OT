import type { AdminNavItem } from '../types/admin';

export const adminNavItems: AdminNavItem[] = [
  { label: 'Tableau de bord', href: '/admin/dashboard', icon: 'dashboard', group: 'main' },
  { label: 'Éditeur visuel', href: '/admin/editor', icon: 'editor', group: 'main' },
  { label: 'Activité éditoriale', href: '/admin/activity', icon: 'activity', group: 'main' },
  { label: 'Notifications du site', href: '/admin/site-notifications', icon: 'notifications', group: 'main' },
  { label: 'Équipe du site', href: '/admin/public-team', icon: 'team', group: 'main' },
  { label: 'Messages', href: '/admin/messages', icon: 'messages', group: 'communication' },
  { label: 'Leads', href: '/admin/leads', icon: 'leads', group: 'communication' },
  { label: 'Simulateur', href: '/admin/calculator', icon: 'calculator', group: 'tools' },
  { label: 'Paramètres', href: '/admin/settings', icon: 'settings', group: 'management' },
];
