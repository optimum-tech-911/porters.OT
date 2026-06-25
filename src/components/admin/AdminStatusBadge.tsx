/**
 * AdminStatusBadge — Color-coded pill badge for statuses
 */

const statusLabels: Record<string, string> = {
  new: 'Nouveau',
  assigned: 'Assigné',
  answered: 'Répondu',
  archived: 'Archivé',
  pending: 'En attente',
  confirmed: 'Confirmé',
  done: 'Terminé',
  cancelled: 'Annulé',
  'no-show': 'Absent',
  contacted: 'Contacté',
  qualified: 'Qualifié',
  proposal: 'Proposition',
  converted: 'Converti',
  lost: 'Perdu',
  'not-interested': 'Non intéressé',
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Basse',
  owner: 'Propriétaire',
  manager: 'Manager',
  sales: 'Commercial',
  consultant: 'Consultant',
  viewer: 'Lecteur',
  contact: 'Contact',
  simulator: 'Simulateur',
  appointment: 'Rendez-vous',
  resources: 'Ressources',
  enterprise: 'Entreprise',
  active: 'Actif',
  inactive: 'Inactif',
};

interface Props {
  status: string;
  label?: string;
}

export default function AdminStatusBadge({ status, label }: Props) {
  const displayLabel = label || statusLabels[status] || status;
  return (
    <span className={`admin-badge admin-badge-${status}`}>
      {displayLabel}
    </span>
  );
}
