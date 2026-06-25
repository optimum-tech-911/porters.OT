import type { Testimonial } from '../types/testimonial';

// TODO: client validation — tous les noms, rôles et témoignages doivent être confirmés par le client
export const testimonials: Testimonial[] = [
  {
    name: 'Thomas L.', // TODO: client validation
    role: 'Consultant IT', // TODO: client validation
    quote:
      'Grâce à The Porters, j\'ai pu me concentrer sur mes missions sans me soucier de la gestion administrative. Leur accompagnement personnalisé et leur réactivité font toute la différence au quotidien.', // TODO: client validation
    city: 'Paris',
  },
  {
    name: 'Sophie M.', // TODO: client validation
    role: 'Consultante en management', // TODO: client validation
    quote:
      'J\'ai choisi The Porters pour leur transparence sur les frais de gestion et la qualité de leur suivi. Depuis deux ans, je bénéficie d\'une vraie sécurité tout en gardant ma liberté de consultante indépendante.', // TODO: client validation
    city: 'Lyon',
  },
  {
    name: 'Karim D.', // TODO: client validation
    role: 'Expert cybersécurité', // TODO: client validation
    quote:
      'Le portage salarial avec The Porters m\'a permis de travailler sur des projets internationaux en toute sérénité. La gestion des contrats et de la facturation est impeccable, et l\'équipe est toujours disponible.', // TODO: client validation
    city: 'Montpellier',
  },
  {
    name: 'Claire B.', // TODO: client validation
    role: 'Chef de projet digital', // TODO: client validation
    quote:
      'Après plusieurs années en freelance, j\'ai opté pour le portage salarial chez The Porters. Le gain de temps sur l\'administratif est considérable, et je profite d\'une couverture sociale complète sans renoncer à mon indépendance.', // TODO: client validation
    city: 'Paris',
  },
];
