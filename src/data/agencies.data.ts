import type { Agency } from '../types/agency';

export const agencies: Agency[] = [
  {
    slug: 'paris',
    city: 'Paris',
    region: 'Île-de-France',
    address: '10 rue de la Paix', // TODO: client validation
    postalCode: '75002', // TODO: client validation
    phone: '+33 1 00 00 00 00', // TODO: client validation
    email: 'paris@porters.fr', // TODO: client validation
    heroTitle: 'The Porters Paris — Portage salarial en Île-de-France',
    heroSubtitle: 'Votre partenaire de confiance pour le portage salarial à Paris',
    description:
      'The Porters Paris accompagne les consultants indépendants en Île-de-France avec une offre de portage salarial sur mesure. Notre agence parisienne vous propose un suivi personnalisé, une gestion administrative complète et un réseau professionnel dynamique au cœur de la capitale.',
    teamMembers: [],
    localFaq: [
      {
        question: 'Où se trouve l\'agence The Porters à Paris ?',
        answer:
          'Notre agence parisienne est située en plein cœur de Paris, facilement accessible en transports en commun. Contactez-nous pour obtenir l\'adresse exacte et prendre rendez-vous.',
      },
      {
        question: 'Quels services propose The Porters Paris ?',
        answer:
          'The Porters Paris propose l\'ensemble des services de portage salarial : gestion administrative, facturation, accompagnement juridique, optimisation de rémunération et mise en réseau avec d\'autres consultants franciliens.',
      },
      {
        question: 'Le portage salarial est-il adapté au marché parisien ?',
        answer:
          'Absolument. Paris concentre une part importante des missions de conseil en France, dans des secteurs comme l\'IT, le management de transition, la finance et le marketing digital. Le portage salarial est une solution idéale pour les consultants indépendants parisiens.',
      },
    ],
    coordinates: { lat: 48.8566, lng: 2.3522 },
    seo: {
      title: 'Portage salarial à Paris — The Porters Île-de-France',
      description:
        'The Porters Paris : votre société de portage salarial en Île-de-France. Accompagnement personnalisé, gestion simplifiée et réseau professionnel pour consultants indépendants.',
    },
  },
  {
    slug: 'lyon',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    address: '15 place Bellecour', // TODO: client validation
    postalCode: '69002', // TODO: client validation
    phone: '+33 4 00 00 00 00', // TODO: client validation
    email: 'lyon@porters.fr', // TODO: client validation
    heroTitle: 'The Porters Lyon — Portage salarial en Auvergne-Rhône-Alpes',
    heroSubtitle: 'L\'expertise du portage salarial au cœur de la région lyonnaise',
    description:
      'The Porters Lyon est votre interlocuteur privilégié pour le portage salarial en Auvergne-Rhône-Alpes. Notre équipe lyonnaise vous accompagne dans le développement de votre activité de consultant indépendant, avec un ancrage local fort et une connaissance approfondie du tissu économique régional.',
    teamMembers: [],
    localFaq: [
      {
        question: 'Pourquoi choisir The Porters à Lyon ?',
        answer:
          'The Porters Lyon offre un accompagnement de proximité avec une équipe dédiée qui connaît parfaitement le marché rhônalpin. Nous vous aidons à développer votre activité dans un bassin économique dynamique, le deuxième de France.',
      },
      {
        question: 'Quels secteurs sont porteurs pour le portage salarial à Lyon ?',
        answer:
          'Lyon est particulièrement dynamique dans les secteurs de l\'IT, de la santé, de l\'industrie pharmaceutique et du conseil en management. Le portage salarial permet aux consultants de ces secteurs de bénéficier d\'une grande flexibilité tout en conservant la sécurité du salariat.',
      },
      {
        question: 'Comment contacter l\'agence The Porters Lyon ?',
        answer:
          'Vous pouvez nous contacter par téléphone, par email ou via le formulaire de prise de rendez-vous sur notre site. Notre équipe lyonnaise se fera un plaisir de vous accueillir dans nos locaux.',
      },
    ],
    coordinates: { lat: 45.7640, lng: 4.8357 },
    seo: {
      title: 'Portage salarial à Lyon — The Porters Auvergne-Rhône-Alpes',
      description:
        'The Porters Lyon : société de portage salarial en Auvergne-Rhône-Alpes. Accompagnement sur mesure pour consultants indépendants à Lyon et dans toute la région.',
    },
  },
  {
    slug: 'montpellier',
    city: 'Montpellier',
    region: 'Occitanie',
    address: '5 place de la Comédie', // TODO: client validation
    postalCode: '34000', // TODO: client validation
    phone: '+33 4 00 00 00 00', // TODO: client validation
    email: 'montpellier@porters.fr', // TODO: client validation
    heroTitle: 'The Porters Montpellier — Portage salarial en Occitanie',
    heroSubtitle: 'Le portage salarial au soleil du sud de la France',
    description:
      'The Porters Montpellier accompagne les consultants indépendants en Occitanie. Notre agence montpelliéraine vous offre un cadre de travail stimulant dans une métropole en pleine croissance, reconnue pour son dynamisme dans le numérique, la santé et l\'innovation.',
    teamMembers: [],
    localFaq: [
      {
        question: 'The Porters est-il présent à Montpellier ?',
        answer:
          'Oui, The Porters dispose d\'une agence à Montpellier pour accompagner les consultants indépendants d\'Occitanie. Notre équipe locale vous propose un suivi personnalisé et des événements de networking réguliers.',
      },
      {
        question: 'Le portage salarial se développe-t-il à Montpellier ?',
        answer:
          'Montpellier est l\'une des métropoles françaises les plus dynamiques en termes de croissance. Le portage salarial y connaît un fort développement, porté par les secteurs du numérique, de la santé et des services aux entreprises.',
      },
    ],
    coordinates: { lat: 43.6108, lng: 3.8767 },
    seo: {
      title: 'Portage salarial à Montpellier — The Porters Occitanie',
      description:
        'The Porters Montpellier : votre société de portage salarial en Occitanie. Accompagnement personnalisé pour consultants indépendants à Montpellier et dans le sud de la France.',
    },
  },
];
