-- Seed only the CMS fields introduced for the Group offer explorer and the
-- Entreprise individuelle comparison. Existing administrator content is never
-- updated by this migration.
begin;

create temporary table cms_group_offer_release (
  content_key text primary key,
  route_path text not null,
  element_type text not null,
  content text not null
) on commit drop;

insert into cms_group_offer_release (content_key, route_path, element_type, content)
values
  ('pages.qui-sommes-nous.auto.button.15v7dxy', '/qui-sommes-nous', 'button', 'Voir ce que couvrent les frais'),
  ('pages.qui-sommes-nous.auto.button.yye7y5', '/qui-sommes-nous', 'button', 'Parler de votre situation'),
  ('pages.qui-sommes-nous.auto.heading.1assxe3', '/qui-sommes-nous', 'heading', 'Tout ce qui encadre votre mission,<br data-astro-cid-auz7fwxu="">réuni au même endroit.'),
  ('pages.qui-sommes-nous.auto.heading.1ujxtoa', '/qui-sommes-nous', 'heading', 'Un accompagnement qui reste humain'),
  ('pages.qui-sommes-nous.auto.heading.5jjmao', '/qui-sommes-nous', 'heading', 'Protection, responsabilité et garanties'),
  ('pages.qui-sommes-nous.auto.heading.bg82up', '/qui-sommes-nous', 'heading', 'Missions partenaires et parcours de formation'),
  ('pages.qui-sommes-nous.auto.heading.vsderf', '/qui-sommes-nous', 'heading', 'Contrats, facturation et paie pris en charge'),
  ('pages.qui-sommes-nous.auto.paragraph.12850xv', '/qui-sommes-nous', 'paragraph', 'Financement des formations'),
  ('pages.qui-sommes-nous.auto.paragraph.13g1hl', '/qui-sommes-nous', 'paragraph', 'Gestion administrative'),
  ('pages.qui-sommes-nous.auto.paragraph.14jgw5f', '/qui-sommes-nous', 'paragraph', 'Une orientation sur les dispositifs de formation mobilisables : CPF, OPCO et certifications.'),
  ('pages.qui-sommes-nous.auto.paragraph.15j4vws', '/qui-sommes-nous', 'paragraph', 'Avance de trésorerie'),
  ('pages.qui-sommes-nous.auto.paragraph.15o5yla', '/qui-sommes-nous', 'paragraph', 'Gestion quotidienne'),
  ('pages.qui-sommes-nous.auto.paragraph.17g9jkl', '/qui-sommes-nous', 'paragraph', 'Missions partenaires et parcours de formation'),
  ('pages.qui-sommes-nous.auto.paragraph.19odi2c', '/qui-sommes-nous', 'paragraph', 'Suivi personnalisé'),
  ('pages.qui-sommes-nous.auto.paragraph.1aibwij', '/qui-sommes-nous', 'paragraph', 'Vous gardez la liberté de trouver vos missions et pouvez aussi accéder aux opportunités proposées par nos partenaires.'),
  ('pages.qui-sommes-nous.auto.paragraph.1but7bi', '/qui-sommes-nous', 'paragraph', 'Garantie financière obligatoire pour sécuriser le versement du salaire.'),
  ('pages.qui-sommes-nous.auto.paragraph.1fdtrid', '/qui-sommes-nous', 'paragraph', 'Suivi personnalisé'),
  ('pages.qui-sommes-nous.auto.paragraph.1gztx9e', '/qui-sommes-nous', 'paragraph', 'Garantie financière'),
  ('pages.qui-sommes-nous.auto.paragraph.1h00ae0', '/qui-sommes-nous', 'paragraph', 'Contrat de prestation, contrat de travail, facturation et suivi des règlements.'),
  ('pages.qui-sommes-nous.auto.paragraph.1i0bnq5', '/qui-sommes-nous', 'paragraph', 'Le même point de contact pour votre contrat, votre activité déclarée et votre paie.'),
  ('pages.qui-sommes-nous.auto.paragraph.1ichzte', '/qui-sommes-nous', 'paragraph', 'Cadre sécurisé'),
  ('pages.qui-sommes-nous.auto.paragraph.1mpibce', '/qui-sommes-nous', 'paragraph', 'Protection, responsabilité et garanties'),
  ('pages.qui-sommes-nous.auto.paragraph.1stxa22', '/qui-sommes-nous', 'paragraph', 'Votre activité s’inscrit dans le cadre du salariat porté, avec les protections et garanties prévues pour la mission.'),
  ('pages.qui-sommes-nous.auto.paragraph.5v3icv', '/qui-sommes-nous', 'paragraph', 'Responsabilité civile professionnelle pour les dommages causés chez un client.'),
  ('pages.qui-sommes-nous.auto.paragraph.6dolad', '/qui-sommes-nous', 'paragraph', 'Paie, déclarations sociales et fiscales liées à votre activité portée.'),
  ('pages.qui-sommes-nous.auto.paragraph.bmxdwz', '/qui-sommes-nous', 'paragraph', 'Contrats, facturation et paie pris en charge'),
  ('pages.qui-sommes-nous.auto.paragraph.cy9hx3', '/qui-sommes-nous', 'paragraph', 'Développement'),
  ('pages.qui-sommes-nous.auto.paragraph.fni28c', '/qui-sommes-nous', 'paragraph', 'Développement'),
  ('pages.qui-sommes-nous.auto.paragraph.fxcxow', '/qui-sommes-nous', 'paragraph', 'Responsabilité civile professionnelle'),
  ('pages.qui-sommes-nous.auto.paragraph.h6tyce', '/qui-sommes-nous', 'paragraph', 'Interlocuteur unique'),
  ('pages.qui-sommes-nous.auto.paragraph.ijvanw', '/qui-sommes-nous', 'paragraph', 'Un interlocuteur unique suit votre dossier et vous répond sur les sujets qui comptent pendant la mission.'),
  ('pages.qui-sommes-nous.auto.paragraph.jle9h4', '/qui-sommes-nous', 'paragraph', 'Concrètement inclus'),
  ('pages.qui-sommes-nous.auto.paragraph.k21fc', '/qui-sommes-nous', 'paragraph', 'Une offre lisible avant de vous engager.'),
  ('pages.qui-sommes-nous.auto.paragraph.ky0hop', '/qui-sommes-nous', 'paragraph', 'Gestion quotidienne'),
  ('pages.qui-sommes-nous.auto.paragraph.nr6y9r', '/qui-sommes-nous', 'paragraph', 'Apport d’affaires'),
  ('pages.qui-sommes-nous.auto.paragraph.ulftck', '/qui-sommes-nous', 'paragraph', 'Un accompagnement qui reste humain'),
  ('pages.qui-sommes-nous.auto.paragraph.uo449t', '/qui-sommes-nous', 'paragraph', 'L’offre The Porters'),
  ('pages.qui-sommes-nous.auto.paragraph.v7bw9v', '/qui-sommes-nous', 'paragraph', 'Cadre sécurisé'),
  ('pages.qui-sommes-nous.auto.paragraph.wvjhdc', '/qui-sommes-nous', 'paragraph', 'Un cadre expliqué avant le démarrage, avec des réponses adaptées à votre situation.'),
  ('pages.qui-sommes-nous.auto.paragraph.y4ngv6', '/qui-sommes-nous', 'paragraph', 'Des propositions de missions, sans exclusivité sur votre recherche de clients.'),
  ('pages.qui-sommes-nous.auto.paragraph.ydzzu5', '/qui-sommes-nous', 'paragraph', 'L’administratif sort de votre quotidien pour vous laisser concentré sur votre expertise et votre client.'),
  ('pages.qui-sommes-nous.auto.paragraph.zb68kw', '/qui-sommes-nous', 'paragraph', 'De la mise en place du contrat jusqu’à la paie, l’équipe prend en charge le cadre administratif et reste disponible pendant toute la mission.'),
  ('portage.comparison.status.ei', '/portage-salarial', 'button', 'Entreprise individuelle'),
  ('portage.comparison.ei.0', '/portage-salarial', 'paragraph', 'Travailleur non salarié'),
  ('portage.comparison.ei.1', '/portage-salarial', 'paragraph', 'Engagée par l’entrepreneur individuel'),
  ('portage.comparison.ei.2', '/portage-salarial', 'paragraph', 'Comptabilité et obligations à votre charge'),
  ('portage.comparison.ei.3', '/portage-salarial', 'paragraph', 'Non ouverte par la seule activité indépendante'),
  ('portage.comparison.ei.4', '/portage-salarial', 'paragraph', 'Régime des indépendants'),
  ('portage.comparison.ei.5', '/portage-salarial', 'paragraph', 'Pas de plafond propre au statut EI');

insert into public.cms_content_blocks (
  content_key, route_path, element_type, fallback_content,
  draft_content, published_content, draft_format, published_format,
  status, published_version
)
select
  content_key, route_path, element_type, content,
  content, content, '{}'::jsonb, '{}'::jsonb,
  'published', 1
from cms_group_offer_release
on conflict (content_key) do nothing;

insert into public.cms_content_versions (
  content_block_id, version_number, content, format, action
)
select block.id, 1, block.published_content, block.published_format, 'seed'
from public.cms_content_blocks as block
join cms_group_offer_release as release using (content_key)
where block.published_version = 1
  and not exists (
    select 1
    from public.cms_content_versions as version
    where version.content_block_id = block.id
      and version.version_number = 1
  );

commit;
