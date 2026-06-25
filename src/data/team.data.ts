import type { TeamMember } from '../types/team';

// TODO: client validation — tous les noms, rôles, bios et photos doivent être confirmés par le client
export const teamMembers: TeamMember[] = [
  {
    name: 'Guillaume Guilhen', // TODO: client validation
    role: 'Président-Fondateur',
    bio: 'Fondateur de The Porters, Guillaume accompagne les consultants indépendants depuis plus de 10 ans avec une vision centrée sur la qualité de service et la proximité.', // TODO: client validation
    photo: '', // TODO: client validation
    linkedin: '', // TODO: client validation
    email: '', // TODO: client validation
  },
  {
    name: 'Marie Dupont', // TODO: client validation
    role: 'Directrice des opérations',
    bio: 'Marie supervise l\'ensemble des opérations de The Porters et veille à offrir un accompagnement optimal à chaque consultant porté.', // TODO: client validation
    photo: '', // TODO: client validation
    linkedin: '', // TODO: client validation
    email: '', // TODO: client validation
  },
  {
    name: 'Antoine Martin', // TODO: client validation
    role: 'Responsable agence Paris',
    bio: 'Antoine dirige l\'agence parisienne de The Porters et accompagne les consultants indépendants d\'Île-de-France dans le développement de leur activité.', // TODO: client validation
    photo: '', // TODO: client validation
    linkedin: '', // TODO: client validation
    email: '', // TODO: client validation
    agencySlug: 'paris',
  },
  {
    name: 'Julie Bernard', // TODO: client validation
    role: 'Responsable agence Lyon',
    bio: 'Julie pilote l\'agence lyonnaise et met son expertise du marché régional au service des consultants en Auvergne-Rhône-Alpes.', // TODO: client validation
    photo: '', // TODO: client validation
    linkedin: '', // TODO: client validation
    email: '', // TODO: client validation
    agencySlug: 'lyon',
  },
];
