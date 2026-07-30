import type { FaqGroup } from '../types/faq';

// copy-plan §9.10 : la réponse directe dans la première phrase, la nuance après.
// Jamais « Cela dépend » en ouverture.
// Faits publiables uniquement. Les paramètres datés (IJ maladie, mutuelle, délais
// de paie, frais de rupture) sont décrits comme mécanismes, sans chiffre, tant
// qu'ils ne sont pas reconfirmés — voir les TODO-CLIENT.
export const faqGroups: FaqGroup[] = [
  {
    title: 'Comprendre le portage salarial',
    slug: 'comprendre',
    items: [
      {
        question: 'Comment fonctionne le portage salarial ?',
        answer:
          'Trois acteurs et deux contrats. Vous trouvez et réalisez votre mission ; l’entreprise cliente signe un contrat de prestation avec The Porters ; The Porters vous salarie et transforme votre chiffre d’affaires en salaire. Vous gardez votre autonomie commerciale et bénéficiez du statut de salarié.',
      },
      {
        question: 'Le portage salarial est-il reconnu légalement ?',
        // F-B01 (PUBLISHABLE)
        answer:
          'Oui. Il est encadré par le Code du travail, par l’accord national interprofessionnel de 2008 et par l’ordonnance du 2 avril 2015. Ce cadre définit les droits et obligations du salarié porté, de l’entreprise cliente et de la société de portage.',
      },
      {
        question: 'Y a-t-il un portage pour les salariés et un autre pour les freelances ?',
        answer:
          'Non. Il n’existe qu’un seul portage salarial. Que vous veniez d’un CDI, d’une micro-entreprise ou d’une SASU, le mécanisme est identique : un contrat de travail avec nous, un contrat de prestation avec votre client. Ce qui change, c’est votre point de départ, pas le dispositif.',
      },
      {
        question: 'Quels métiers IT peuvent être portés ?',
        // F-B10 (PUBLISHABLE)
        answer:
          'Toutes les prestations intellectuelles : cybersécurité, développement, DevOps, cloud, data engineering, IA, Product Ownership, Scrum Master, coaching agile, chefferie de projet IT, AMOA et conseil. Seules les professions réglementées et les services à la personne sont exclus.',
      },
      {
        question: 'Quelle différence avec la micro-entreprise ou la SASU ?',
        answer:
          'Vous ne créez pas de société et vous ne produisez aucun document administratif. Vous conservez une couverture sociale de salarié — chômage et retraite complémentaire comprises — là où la micro-entreprise n’en ouvre pas. En contrepartie, des frais de gestion sont prélevés sur votre chiffre d’affaires, et vous restez responsable de votre prospection et de votre TJM.',
      },
      {
        question: 'Puis-je cumuler le portage avec autre chose ?',
        // F-B08 (PUBLISHABLE)
        answer:
          'Oui, avec un emploi salarié ou avec une retraite. Le cumul avec un emploi salarié suppose l’accord de votre employeur et un maximum de 48 heures de travail hebdomadaire, tous employeurs confondus.',
      },
      {
        question: 'Puis-je travailler pour un client à l’étranger ?',
        // F-B09 (PUBLISHABLE)
        answer:
          'Oui. Votre mission peut se dérouler en France ou à l’étranger, pour un client français ou étranger, sur site ou en télétravail.',
      },
    ],
  },
  {
    title: 'Rémunération, frais et simulateur',
    slug: 'remuneration',
    items: [
      {
        question: 'Combien mon TJM me laisse-t-il en net ?',
        answer:
          'Le simulateur vous donne une estimation à partir de votre TJM, de vos jours facturés et de vos frais professionnels. L’écart entre chiffre d’affaires et net vient de trois postes : les frais de gestion, les cotisations sociales et les frais professionnels remboursés. Le résultat reste indicatif jusqu’à validation de votre situation.',
      },
      {
        question: 'Que couvrent les frais de gestion ?',
        // copy-bank CB-12 / livre blanc « PAS DE FRAIS CACHÉS »
        answer:
          'Sept prestations : l’avance de trésorerie, l’apport d’affaires, un interlocuteur unique, la gestion administrative complète, la responsabilité civile professionnelle, le financement des formations (CPF, OPCO, certifications) et la garantie financière. Le détail figure sur la page Frais et rémunération.',
      },
      {
        question: 'Quel est votre taux de frais de gestion ?',
        // TODO-CLIENT: F-C15 / Q5 — le client a validé la publication du taux mais ne
        // l'a pas encore communiqué. Remplacer cette réponse par le taux réel.
        answer:
          'Il vous est communiqué avant la signature, jamais après, et il est prélevé sur votre chiffre d’affaires mensuel. Aucun frais de dossier, d’entrée ou de sortie ne s’y ajoute.',
      },
      {
        question: 'Quand suis-je payé ?',
        // TODO-CLIENT: F-C14 — publier les deux échéances réelles une fois confirmées.
        answer:
          'Chaque mois, selon la date à laquelle vous transmettez votre compte rendu d’activité. Deux sessions de paie existent ; votre conseiller vous indique les échéances applicables avant le démarrage.',
      },
      {
        question: 'Que se passe-t-il si mon client règle à 45 ou 60 jours ?',
        // TODO-CLIENT: F-B14 — le livre blanc décrit une avance de trésorerie. À
        // reconfirmer pour 2026 avant de l'affirmer ici.
        answer:
          'Votre salaire ne suit pas le calendrier de règlement de votre client. Le traitement du délai et les conditions d’avance sont précisés au cadrage de la mission.',
      },
      {
        question: 'Comment sont gérés les frais professionnels ?',
        answer:
          'Ils vous sont remboursés lorsqu’ils sont réels, justifiés et liés à votre activité : internet, téléphone, matériel, logiciels, déplacements, repas ou hébergement selon la situation. Ils ne sont pas financés par les frais de gestion — ce sont deux choses distinctes.',
      },
      {
        question: 'À quoi sert le compte de trésorerie ?',
        // F-B11 (PUBLISHABLE)
        answer:
          'À mettre une part de votre rémunération brute de côté. Vous pouvez ainsi lisser une paie d’un mois sur l’autre, financer des congés en maintenant votre rémunération, provisionner une fin de contrat ou débloquer un acompte selon vos besoins.',
      },
    ],
  },
  {
    title: 'Missions, congés et aléas',
    slug: 'missions',
    items: [
      {
        question: 'Trouvez-vous les missions à ma place ?',
        answer:
          'Non, aucune mission n’est garantie. Nous vous proposons des missions issues de nos partenaires, et vous restez libre de trouver les vôtres. Nous intervenons aussi sur votre positionnement, la présentation de votre offre et le cadrage de vos opportunités.',
      },
      {
        question: 'Puis-je garder mes propres clients ?',
        // F-B07 (PUBLISHABLE)
        answer:
          'Oui. Vous vous constituez votre propre clientèle et vous en restez pleinement responsable. Vous choisissez vos missions et négociez vos tarifs, sans lien hiérarchique ni chez le client ni chez nous.',
      },
      {
        question: 'Combien de congés payés ai-je ?',
        // F-B06 (PUBLISHABLE)
        answer:
          'Vous acquérez 2,5 jours ouvrés par mois, comme tout salarié. Ils vous sont versés chaque mois sur votre bulletin sous l’intitulé « Indemnités de congés payés », ou provisionnés sur votre compte de trésorerie si vous préférez maintenir votre rémunération pendant vos congés.',
      },
      {
        question: 'Que se passe-t-il si je tombe malade ?',
        // TODO-CLIENT: F-C09, F-C10 — taux, carence et seuil de relais prévoyance
        // datent de 2024 et sont révisés régulièrement. Aucun chiffre publié.
        answer:
          'Vous percevez des indemnités journalières de la Sécurité sociale, comme tout salarié, puis la prévoyance prend le relais sur les arrêts longs. Les paramètres exacts vous sont confirmés par le service paie.',
      },
      {
        question: 'Que se passe-t-il entre deux missions ?',
        answer:
          'Votre contrat de travail se poursuit, mais une période sans mission ne génère pas de chiffre d’affaires et donc pas de salaire. C’est précisément ce que le compte de trésorerie permet d’anticiper : lisser une période creuse avec de la réserve constituée pendant les mois facturés.',
      },
      {
        question: 'Mes droits au chômage sont-ils préservés ?',
        answer:
          'Oui. Vous cotisez chaque mois à l’assurance chômage et vous ouvrez des droits comme tout salarié. En cas de rupture conventionnelle, vous pouvez prétendre à l’Aide au retour à l’emploi.',
      },
    ],
  },
  {
    title: 'Entrée et sortie',
    slug: 'entree-sortie',
    items: [
      {
        question: 'Comment se passe mon arrivée ?',
        answer:
          'Vous recevez une simulation de salaire chiffrée, l’infographie des frais professionnels, un mode opératoire et une formation à LAYA, notre outil de gestion. Puis une intégration individuelle, en visioconférence ou sur place. Un interlocuteur unique suit ensuite votre dossier.',
      },
      {
        question: 'Que se passe-t-il quand je veux partir ?',
        // TODO-CLIENT: F-C07 — montant des frais de rupture conventionnelle à
        // reconfirmer par la paie avant publication.
        answer:
          'Vous partez quand vous voulez : démission, rupture de période d’essai ou rupture conventionnelle. Nous vous remettons le solde de tout compte, le certificat de travail, l’attestation destinée à France Travail et le reçu pour solde de tout compte. Une rupture conventionnelle suppose des fonds suffisants sur votre compte de trésorerie pour couvrir la prime et les frais associés.',
      },
      {
        question: 'Suis-je engagé sur une durée minimale ?',
        answer:
          'Non. Votre contrat de travail suit vos missions, et aucune durée d’engagement ne vous est imposée. Les modalités de rupture sont celles du droit du travail.',
      },
    ],
  },
  {
    title: 'Pour les entreprises',
    slug: 'entreprises',
    items: [
      {
        question: 'Pourquoi passer par un consultant en portage salarial ?',
        answer:
          'Vous mobilisez un expert autonome sans créer de relation d’emploi. Un seul contrat de prestation, une seule facture, et aucune gestion de paie de votre côté. C’est adapté à un besoin IT, data, cloud, cyber, projet ou transformation sur un périmètre défini.',
      },
      {
        question: 'Qui signe le contrat avec l’entreprise cliente ?',
        answer:
          'The Porters. Le consultant reste salarié porté par The Porters pendant toute la mission, et vous n’avez qu’un interlocuteur contractuel.',
      },
      {
        question: 'Comment sélectionnez-vous les profils ?',
        // F-D01, F-D02, F-D03 (PUBLISHABLE)
        answer:
          'En cinq étapes : analyse du parcours réel, évaluation sur les référentiels métiers CIGREF, SYNTEC et ROME, deux entretiens structurés — RH et technique — puis tests ou mise en situation selon le périmètre, et enfin une validation interne. Les profils vous sont transmis sous forme anonymisée.',
      },
      {
        question: 'Et si mon interlocuteur est absent ?',
        // F-D07 (PUBLISHABLE)
        answer:
          'Chaque mission est suivie par un binôme, avec un relais identifié. Aucun suivi ne dépend d’une seule personne.',
      },
    ],
  },
];
