-- Generated from src/cms/content-registry.json by scripts/generate-cms-seed.mjs.
-- Re-run npm run cms:seed after changing registered fallback content.

insert into public.cms_content_blocks (
  content_key, route_path, element_type, fallback_content,
  draft_content, published_content, draft_format, published_format,
  status, published_version
)
select
  seed.content_key, seed.route_path, seed.element_type, seed.content,
  seed.content, seed.content, '{}'::jsonb, '{}'::jsonb,
  'published', 1
from (values
  ('home.hero.eyebrow', '/', 'label', 'Portage salarial · Experts du numérique'),
  ('home.hero.title', '/', 'heading', 'Votre expertise.
Votre liberté.
Un cadre qui vous protège.'),
  ('home.hero.description', '/', 'paragraph', 'Vous développez vos missions. The Porters transforme votre activité en salaire et prend en charge les contrats, la facturation, la paie et le suivi administratif.'),
  ('home.hero.primary_cta', '/', 'button', 'Parler à un conseiller'),
  ('home.hero.secondary_cta', '/', 'button', 'Découvrir le portage'),
  ('home.hero.enterprise_cta', '/', 'button', 'Je suis une entreprise'),
  ('home.hero.trust.interlocutors', '/', 'list_item', 'Interlocuteurs identifiés'),
  ('home.hero.trust.employee_framework', '/', 'list_item', 'Cadre salarié'),
  ('home.hero.trust.it_expertise', '/', 'list_item', 'Expertise IT'),
  ('home.hero.team.eric.tone', '/', 'label', 'Vision'),
  ('home.hero.team.eric.name', '/', 'name', 'Eric BENSAID'),
  ('home.hero.team.eric.role', '/', 'label', 'Fondateur'),
  ('home.hero.team.eric.description', '/', 'paragraph', 'Une vision portée par l’expertise IT et la proximité humaine.'),
  ('home.hero.team.eric.primary_cta', '/', 'button', 'Découvrir le groupe'),
  ('home.hero.team.eric.secondary_cta', '/', 'button', 'Prendre rendez-vous'),
  ('home.hero.team.ambre.tone', '/', 'label', 'Entreprises'),
  ('home.hero.team.ambre.name', '/', 'name', 'Ambre LAMBERT'),
  ('home.hero.team.ambre.role', '/', 'label', 'Directrice commerciale IT'),
  ('home.hero.team.ambre.description', '/', 'paragraph', 'Un point d’entrée pour qualifier les besoins entreprises et cadrer les missions.'),
  ('home.hero.team.ambre.primary_cta', '/', 'button', 'Je suis une entreprise'),
  ('home.hero.team.ambre.secondary_cta', '/', 'button', 'Voir les expertises'),
  ('home.hero.team.lisa.tone', '/', 'label', 'Consultants'),
  ('home.hero.team.lisa.name', '/', 'name', 'Lisa Delrieu'),
  ('home.hero.team.lisa.role', '/', 'label', 'Chargée de recrutement'),
  ('home.hero.team.lisa.description', '/', 'paragraph', 'Un accompagnement pour orienter les profils, clarifier les missions et faciliter les échanges.'),
  ('home.hero.team.lisa.primary_cta', '/', 'button', 'Je suis consultant'),
  ('home.hero.team.lisa.secondary_cta', '/', 'button', 'Parler à un conseiller'),
  ('home.ecosystem.label', '/', 'label', 'Un écosystème habitué aux projets exigeants'),
  ('home.journeys.eyebrow', '/', 'label', 'Choisir son parcours'),
  ('home.journeys.title', '/', 'heading', 'Un cadre adapté à votre situation professionnelle'),
  ('home.journeys.description', '/', 'paragraph', 'Identifiez le parcours qui correspond à votre mission, à votre statut et au niveau d’accompagnement attendu.'),
  ('home.journeys.consultant.title', '/', 'heading', 'Consultant indépendant'),
  ('home.journeys.consultant.description', '/', 'paragraph', 'Sécurisez vos missions avec un contrat salarié, une paie lisible et une gestion administrative prise en charge.'),
  ('home.journeys.consultant.cta', '/', 'button', 'Parcours consultant'),
  ('home.journeys.it_expert.title', '/', 'heading', 'Expert IT en mission'),
  ('home.journeys.it_expert.description', '/', 'paragraph', 'Transformez une mission déjà négociée en cadre contractuel clair, du TJM jusqu’au démarrage.'),
  ('home.journeys.it_expert.cta', '/', 'button', 'Cadre du portage'),
  ('home.journeys.enterprise.title', '/', 'heading', 'Entreprise cliente'),
  ('home.journeys.enterprise.description', '/', 'paragraph', 'Intégrez une expertise externe avec un cadre de mission simple, suivi et documenté.'),
  ('home.journeys.enterprise.cta', '/', 'button', 'Offre entreprises'),
  ('home.journeys.transition.title', '/', 'heading', 'En transition'),
  ('home.journeys.transition.description', '/', 'paragraph', 'Comparez vos options, vos revenus cibles et le niveau de gestion que vous souhaitez déléguer.'),
  ('home.journeys.transition.cta', '/', 'button', 'Simulation revenus'),
  ('home.offer.eyebrow', '/', 'label', 'Ce que nous prenons en charge'),
  ('home.offer.title', '/', 'heading', 'Vous développez votre expertise. Nous rendons le cadre plus simple.'),
  ('home.offer.description', '/', 'paragraph', 'Survolez ou sélectionnez une étape pour comprendre comment le suivi s’organise autour de votre mission.'),
  ('home.offer.cta', '/', 'button', 'Découvrir le fonctionnement'),
  ('home.offer.human.title', '/', 'heading', 'Accompagnement humain'),
  ('home.offer.human.description', '/', 'paragraph', 'Un interlocuteur identifiable pour comprendre votre mission, votre statut et les étapes à venir.'),
  ('home.offer.employee.title', '/', 'heading', 'Cadre salarié'),
  ('home.offer.employee.description', '/', 'paragraph', 'Un contrat de travail et la protection sociale associée, sans renoncer à votre autonomie commerciale.'),
  ('home.offer.admin.title', '/', 'heading', 'Cadre administratif suivi'),
  ('home.offer.admin.description', '/', 'paragraph', 'Contrats, facturation, déclarations sociales et bulletins de paie sont pris en charge.'),
  ('home.offer.it.title', '/', 'heading', 'Expertise IT & transformation'),
  ('home.offer.it.description', '/', 'paragraph', 'Des échanges adaptés aux métiers cyber, data, IA, cloud, DevOps, produit, projet et agilité.'),
  ('home.offer.advisor_cta', '/', 'button', 'Échanger avec un conseiller'),
  ('home.jobs.eyebrow', '/', 'label', 'Recrutement'),
  ('home.jobs.title', '/', 'heading', 'Les opportunités en cours'),
  ('home.jobs.description', '/', 'paragraph', 'Retrouvez les postes ouverts et les offres mises à jour de The Porters directement sur notre espace HelloWork.'),
  ('home.jobs.point.current', '/', 'list_item', 'Postes ouverts mis à jour'),
  ('home.jobs.point.direct', '/', 'list_item', 'Candidature directe'),
  ('home.jobs.point.full', '/', 'list_item', 'Accès au parcours complet'),
  ('home.jobs.external_cta', '/', 'button', 'Voir les offres sur HelloWork'),
  ('home.jobs.internal_cta', '/', 'button', 'Découvrir le recrutement'),
  ('home.jobs.preview.platform', '/', 'label', 'HelloWork'),
  ('home.jobs.preview.company', '/', 'name', 'The Porters'),
  ('home.jobs.preview.status', '/', 'label', 'Offres en cours'),
  ('home.jobs.preview.focus', '/', 'label', 'Focus'),
  ('home.jobs.preview.profiles', '/', 'paragraph', 'Profils business, recrutement et accompagnement'),
  ('home.support.eyebrow', '/', 'label', 'L’accompagnement dans la durée'),
  ('home.support.title', '/', 'heading', 'Suivi'),
  ('home.support.title_detail', '/', 'heading', 'humain, contractuel et administratif pendant la mission'),
  ('home.support.subtitle', '/', 'heading', 'Être indépendant ne veut pas dire être seul'),
  ('home.support.description', '/', 'paragraph', 'Un interlocuteur connaît votre dossier et répond concrètement sur le contrat, la facturation, la paie, les frais et la relation client.'),
  ('home.support.profiles', '/', 'label', 'Profils IT, produit, data et transformation'),
  ('home.support.feature.quote', '/', 'quote', 'Je voulais devenir indépendante mais je ne souhaitais pas non plus créer ma propre entreprise pour le moment. J’ai entendu parler du portage salarial et j’ai pu me lancer grâce à The Porters. À mi-chemin entre l’indépendance et le salariat, je me sens à la fois libre et accompagnée.'),
  ('home.support.feature.name', '/', 'name', 'Delphine'),
  ('home.support.feature.role', '/', 'label', 'Product Owner en portage salarial — Paris'),
  ('home.support.chloe.quote', '/', 'quote', '« Grâce au portage salarial, je me sens plus libre et sécurisée. Les charges sont transparentes, je continue à toucher mes indemnités chômage et retraite. »'),
  ('home.support.chloe.name', '/', 'name', 'Chloé'),
  ('home.support.chloe.role', '/', 'label', 'Consultante data en portage — Lyon'),
  ('home.support.andy.quote', '/', 'quote', '« Le jour où j’ai passé le cap du portage salarial, j’ai retrouvé une vraie respiration : je reste indépendant, mais je ne porte plus tout seul l’administratif. »'),
  ('home.support.andy.name', '/', 'name', 'Andy P.'),
  ('home.support.andy.role', '/', 'label', 'Product manager freelance — Paris'),
  ('home.reviews.eyebrow', '/', 'label', 'Avis Google'),
  ('home.reviews.title', '/', 'heading', 'La qualité de service se lit dans les retours'),
  ('home.faq.eyebrow', '/', 'label', 'Questions fréquentes'),
  ('home.faq.title', '/', 'heading', 'Les réponses avant les décisions'),
  ('home.faq.description', '/', 'paragraph', 'Statut, revenus, frais et missions : retrouvez les points essentiels avant d’avancer.'),
  ('home.faq.cta', '/', 'button', 'Consulter toute la FAQ'),
  ('home.final_cta.eyebrow', '/', 'label', 'Votre prochaine étape'),
  ('home.final_cta.title', '/', 'heading', 'Prêt à donner un nouveau cadre à votre indépendance ?'),
  ('home.final_cta.description', '/', 'paragraph', 'Choisissez vos missions. Nous cadrons les contrats, la facturation, la paie et le suivi administratif.'),
  ('home.final_cta.simulator', '/', 'button', 'Simuler mes revenus'),
  ('home.final_cta.advisor', '/', 'button', 'Parler à un conseiller')
) as seed(content_key, route_path, element_type, content)
on conflict (content_key) do update
set route_path = excluded.route_path,
    element_type = excluded.element_type,
    fallback_content = excluded.fallback_content;

insert into public.cms_content_versions (
  content_block_id, version_number, content, format, action
)
select block.id, 1, block.published_content, block.published_format, 'seed'
from public.cms_content_blocks as block
where block.published_version = 1
  and not exists (
    select 1 from public.cms_content_versions as version
    where version.content_block_id = block.id and version.version_number = 1
  );
