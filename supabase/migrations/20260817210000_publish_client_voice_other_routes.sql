-- Publish the 2026-08-17 editorial rewrite to every route.
--
-- The visible site reads its text from cms_content_blocks, so rewritten source
-- copy stays invisible until it is published here.
--
-- Scope, decided per block against a full backup of the live table:
--   * 6 blocks whose SOURCE copy was rewritten -> republished below.
--   * 248 blocks whose source still matches its seeded fallback while the live
--     text differs are hand-made CMS edits. They are deliberately NOT touched.
--   * the 3 protected hero lines in src/cms/runtime-overrides.json have no source
--     row at all and therefore cannot be selected here.
--   * 32 keys the site renders but the CMS has never seen are inserted, so an
--     editor can reach them.
--
-- Idempotent: a block already carrying the new wording is skipped and no
-- version row is written for it.

begin;

with incoming (content_key, new_content) as (
  values
    ('pages.portage-salarial.auto.heading.1qnyctv', 'Ce que couvrent nos frais'),
    ('pages.portage-salarial.auto.paragraph.9f1zwi', 'Nos frais de gestion sont prélevés sur votre chiffre d’affaires mensuel et couvrent sept prestations. Votre simulation en donne le montant avant toute signature.'),
    ('pages.portage-salarial.auto.paragraph.gdhka1', 'Frais de gestion'),
    ('pages.rse.auto.heading.1co03gw', 'Ce sur quoi nous nous appuyons'),
    ('pages.rse.auto.heading.1nsallb', 'Notre démarche RSE.'),
    ('pages.rse.auto.paragraph.f0xscj', 'Les référentiels sur lesquels nous nous appuyons, et ce que nous ne revendiquons pas.')
),
updated as (
  update public.cms_content_blocks as b
     set fallback_content  = i.new_content,
         draft_content     = i.new_content,
         published_content = i.new_content,
         status            = 'published',
         published_version = b.published_version + 1,
         published_at      = now()
    from incoming i
   where b.content_key = i.content_key
     and (b.published_content <> i.new_content or b.fallback_content <> i.new_content)
  returning b.id, b.published_version, b.published_content, b.published_format
)
insert into public.cms_content_versions
  (content_block_id, version_number, content, format, action)
select id, published_version, published_content, published_format, 'publish'
from updated;


insert into public.cms_content_blocks
  (content_key, route_path, element_type, fallback_content, draft_content, published_content)
values
    ('pages.consultants.auto.button.1ft44l5', '/consultants', 'button', 'Je simule mes revenus',
     'Je simule mes revenus', 'Je simule mes revenus'),
    ('pages.consultants.auto.button.co4dn6', '/consultants', 'button', 'Je prends rendez-vous',
     'Je prends rendez-vous', 'Je prends rendez-vous'),
    ('pages.portage-salarial.auto.button.1agnlz9', '/portage-salarial', 'button', 'Je découvre le parrainage <span aria-hidden="true" data-astro-cid-gpe2ahup="">→</span>',
     'Je découvre le parrainage <span aria-hidden="true" data-astro-cid-gpe2ahup="">→</span>', 'Je découvre le parrainage <span aria-hidden="true" data-astro-cid-gpe2ahup="">→</span>'),
    ('pages.portage-salarial.auto.heading.1e1o8bm', '/portage-salarial', 'heading', 'Recommandez',
     'Recommandez', 'Recommandez'),
    ('pages.portage-salarial.auto.heading.1hhwqlk', '/portage-salarial', 'heading', 'Conditions confirmées',
     'Conditions confirmées', 'Conditions confirmées'),
    ('pages.portage-salarial.auto.heading.1xfppdk', '/portage-salarial', 'heading', 'Vous connaissez quelqu’un à qui cela servirait ?',
     'Vous connaissez quelqu’un à qui cela servirait ?', 'Vous connaissez quelqu’un à qui cela servirait ?'),
    ('pages.portage-salarial.auto.heading.p030lf', '/portage-salarial', 'heading', 'Mise en relation',
     'Mise en relation', 'Mise en relation'),
    ('pages.portage-salarial.auto.paragraph.138d0x9', '/portage-salarial', 'paragraph', 'La personne nous contacte de votre part, ou vous nous transmettez ses coordonnées — avec son accord.',
     'La personne nous contacte de votre part, ou vous nous transmettez ses coordonnées — avec son accord.', 'La personne nous contacte de votre part, ou vous nous transmettez ses coordonnées — avec son accord.'),
    ('pages.portage-salarial.auto.paragraph.14lginf', '/portage-salarial', 'paragraph', 'Gestion administrative complète',
     'Gestion administrative complète', 'Gestion administrative complète'),
    ('pages.portage-salarial.auto.paragraph.16dzxq9', '/portage-salarial', 'paragraph', 'Financement des formations',
     'Financement des formations', 'Financement des formations'),
    ('pages.portage-salarial.auto.paragraph.16gba4u', '/portage-salarial', 'paragraph', 'Garantie financière',
     'Garantie financière', 'Garantie financière'),
    ('pages.portage-salarial.auto.paragraph.16hq9l8', '/portage-salarial', 'paragraph', 'Avance de trésorerie',
     'Avance de trésorerie', 'Avance de trésorerie'),
    ('pages.portage-salarial.auto.paragraph.176ujsy', '/portage-salarial', 'paragraph', 'Contrat, facturation, paie, déclarations sociales et fiscales.',
     'Contrat, facturation, paie, déclarations sociales et fiscales.', 'Contrat, facturation, paie, déclarations sociales et fiscales.'),
    ('pages.portage-salarial.auto.paragraph.18c89xg', '/portage-salarial', 'paragraph', 'CPF, OPCO, certifications. Nous vous orientons sur les dispositifs mobilisables selon votre situation.',
     'CPF, OPCO, certifications. Nous vous orientons sur les dispositifs mobilisables selon votre situation.', 'CPF, OPCO, certifications. Nous vous orientons sur les dispositifs mobilisables selon votre situation.'),
    ('pages.portage-salarial.auto.paragraph.18tj454', '/portage-salarial', 'paragraph', 'L’équipe vous confirme l’éligibilité et les conditions en vigueur avant toute mise en relation.',
     'L’équipe vous confirme l’éligibilité et les conditions en vigueur avant toute mise en relation.', 'L’équipe vous confirme l’éligibilité et les conditions en vigueur avant toute mise en relation.'),
    ('pages.portage-salarial.auto.paragraph.1buro92', '/portage-salarial', 'paragraph', 'Parlez de nous à un consultant indépendant ou à une entreprise.',
     'Parlez de nous à un consultant indépendant ou à une entreprise.', 'Parlez de nous à un consultant indépendant ou à une entreprise.'),
    ('pages.portage-salarial.auto.paragraph.1id1ce8', '/portage-salarial', 'paragraph', 'Responsabilité civile professionnelle',
     'Responsabilité civile professionnelle', 'Responsabilité civile professionnelle'),
    ('pages.portage-salarial.auto.paragraph.1q26vu5', '/portage-salarial', 'paragraph', 'Étape 1',
     'Étape 1', 'Étape 1'),
    ('pages.portage-salarial.auto.paragraph.1t8ufay', '/portage-salarial', 'paragraph', 'Interlocuteur unique',
     'Interlocuteur unique', 'Interlocuteur unique'),
    ('pages.portage-salarial.auto.paragraph.1velxbc', '/portage-salarial', 'paragraph', 'Nous vous proposons des missions issues de nos partenaires ; vous restez libre de trouver les vôtres.',
     'Nous vous proposons des missions issues de nos partenaires ; vous restez libre de trouver les vôtres.', 'Nous vous proposons des missions issues de nos partenaires ; vous restez libre de trouver les vôtres.'),
    ('pages.portage-salarial.auto.paragraph.1ygkead', '/portage-salarial', 'paragraph', 'Vous êtes payé dès le premier mois, avant même que votre client nous règle sa première facture. Le calendrier de paie vous est expliqué avant le démarrage.',
     'Vous êtes payé dès le premier mois, avant même que votre client nous règle sa première facture. Le calendrier de paie vous est expliqué avant le démarrage.', 'Vous êtes payé dès le premier mois, avant même que votre client nous règle sa première facture. Le calendrier de paie vous est expliqué avant le démarrage.'),
    ('pages.portage-salarial.auto.paragraph.49hgu5', '/portage-salarial', 'paragraph', 'Apport d’affaires',
     'Apport d’affaires', 'Apport d’affaires'),
    ('pages.portage-salarial.auto.paragraph.6liuh2', '/portage-salarial', 'paragraph', 'Étape 2',
     'Étape 2', 'Étape 2'),
    ('pages.portage-salarial.auto.paragraph.6okau9', '/portage-salarial', 'paragraph', 'Vous êtes couvert en cas de dommage causé chez un client.',
     'Vous êtes couvert en cas de dommage causé chez un client.', 'Vous êtes couvert en cas de dommage causé chez un client.'),
    ('pages.portage-salarial.auto.paragraph.8of6qw', '/portage-salarial', 'paragraph', 'Programme de parrainage',
     'Programme de parrainage', 'Programme de parrainage'),
    ('pages.portage-salarial.auto.paragraph.ao32w3', '/portage-salarial', 'paragraph', 'Dispositif obligatoire qui sécurise le versement de votre salaire.',
     'Dispositif obligatoire qui sécurise le versement de votre salaire.', 'Dispositif obligatoire qui sécurise le versement de votre salaire.'),
    ('pages.portage-salarial.auto.paragraph.u85f6z', '/portage-salarial', 'paragraph', 'Étape 3',
     'Étape 3', 'Étape 3'),
    ('pages.portage-salarial.auto.paragraph.wxld7f', '/portage-salarial', 'paragraph', 'Un consultant qui hésite sur son statut, ou une entreprise qui cherche un profil IT. Présentez-nous la personne : l’équipe confirme l’éligibilité et les conditions en vigueur avant toute mise en relation, et aucune coordonnée n’est transmise sans son accord.',
     'Un consultant qui hésite sur son statut, ou une entreprise qui cherche un profil IT. Présentez-nous la personne : l’équipe confirme l’éligibilité et les conditions en vigueur avant toute mise en relation, et aucune coordonnée n’est transmise sans son accord.', 'Un consultant qui hésite sur son statut, ou une entreprise qui cherche un profil IT. Présentez-nous la personne : l’équipe confirme l’éligibilité et les conditions en vigueur avant toute mise en relation, et aucune coordonnée n’est transmise sans son accord.'),
    ('pages.portage-salarial.auto.paragraph.xoh46f', '/portage-salarial', 'paragraph', 'Une seule personne suit votre dossier.',
     'Une seule personne suit votre dossier.', 'Une seule personne suit votre dossier.'),
    ('pages.rse.auto.paragraph.1rot2vm', '/rse', 'paragraph', 'The Porters est signataire de la Charte de la diversité : le recrutement repose sur les compétences, l’expérience et le savoir-être.',
     'The Porters est signataire de la Charte de la diversité : le recrutement repose sur les compétences, l’expérience et le savoir-être.', 'The Porters est signataire de la Charte de la diversité : le recrutement repose sur les compétences, l’expérience et le savoir-être.'),
    ('pages.rse.auto.paragraph.1sap1at', '/rse', 'paragraph', 'Nous distinguons les référentiels que nous utilisons dans nos pratiques des labels effectivement détenus. Notre démarche est une trajectoire structurée : à ce jour, nous ne revendiquons aucune certification.',
     'Nous distinguons les référentiels que nous utilisons dans nos pratiques des labels effectivement détenus. Notre démarche est une trajectoire structurée : à ce jour, nous ne revendiquons aucune certification.', 'Nous distinguons les référentiels que nous utilisons dans nos pratiques des labels effectivement détenus. Notre démarche est une trajectoire structurée : à ce jour, nous ne revendiquons aucune certification.'),
    ('pages.rse.auto.paragraph.yorddf', '/rse', 'paragraph', 'Une charte Numérique Responsable est diffusée en interne et un référent est désigné. Nos pratiques s’appuient sur le RGESN pour l’éco-conception, ainsi que sur le RGAA et les recommandations WCAG pour l’accessibilité numérique.',
     'Une charte Numérique Responsable est diffusée en interne et un référent est désigné. Nos pratiques s’appuient sur le RGESN pour l’éco-conception, ainsi que sur le RGAA et les recommandations WCAG pour l’accessibilité numérique.', 'Une charte Numérique Responsable est diffusée en interne et un référent est désigné. Nos pratiques s’appuient sur le RGESN pour l’éco-conception, ainsi que sur le RGAA et les recommandations WCAG pour l’accessibilité numérique.')
on conflict (content_key) do nothing;

commit;
