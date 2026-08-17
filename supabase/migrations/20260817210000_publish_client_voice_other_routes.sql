-- Publish the 2026-08-17 editorial rewrite to every route.
--
-- The visible site reads its text from cms_content_blocks, so rewritten source
-- copy stays invisible until it is published here.
--
-- Scope, decided per block against a full backup of the live table:
--   * 77 blocks whose SOURCE copy was rewritten -> republished below.
--   * 74 blocks whose source still matches its seeded fallback while the live
--     text differs are hand-made CMS edits. They are deliberately NOT touched.
--   * the 3 protected hero lines in src/cms/runtime-overrides.json have no source
--     row at all and therefore cannot be selected here.
--   * 4 keys the site renders but the CMS has never seen are inserted, so an
--     editor can reach them.
--
-- Idempotent: a block already carrying the new wording is skipped and no
-- version row is written for it.

begin;

with incoming (content_key, new_content) as (
  values
    ('pages.blog.bien-choisir-societe-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.bien-choisir-societe-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.choisir-statut-independant.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.choisir-statut-independant.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.consultant-informatique-independant-galeres.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.consultant-informatique-independant-galeres.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.contrat-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.contrat-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.devenir-freelance-informatique.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.devenir-freelance-informatique.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.frais-gestion-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.frais-gestion-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.guide-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.guide-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.optimiser-remuneration-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.optimiser-remuneration-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-consultant-cybersecurite.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-consultant-cybersecurite.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-consultant-data-ia.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-consultant-data-ia.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-devops-freelance.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-devops-freelance.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-entreprises.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-entreprises.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-informatique.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-informatique.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-international.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-international.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-product-owner-scrum-master.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-product-owner-scrum-master.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.portage-salarial-solution-flexible.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.portage-salarial-solution-flexible.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.role-charge-de-compte-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.role-charge-de-compte-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.secteurs-adaptes-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.secteurs-adaptes-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.blog.trouver-missions-portage-salarial.auto.button.1jbsm65', 'Je parle à un conseiller'),
    ('pages.blog.trouver-missions-portage-salarial.auto.button.1q8ls5y', 'Je simule mes revenus'),
    ('pages.consultants.auto.button.1upc42x', 'Je prends rendez-vous'),
    ('pages.consultants.auto.button.nviywh', 'Je parle à un conseiller'),
    ('pages.consultants.auto.button.oofb2a', 'Je simule mes revenus'),
    ('pages.consultants.auto.button.wvc156', 'Je simule mes revenus'),
    ('pages.consultants.auto.paragraph.14a6447', 'Je lis le détail'),
    ('pages.consultants.auto.paragraph.1nrab1u', 'Je lis le détail'),
    ('pages.consultants.auto.paragraph.1vd65na', 'Je lis le détail'),
    ('pages.consultants.auto.paragraph.1xh2v6g', 'Je lis le détail'),
    ('pages.consultants.auto.paragraph.9erv7', 'Je lis le détail'),
    ('pages.consultants.auto.paragraph.rwkztd', 'Je lis le détail'),
    ('pages.entreprises.auto.button.13ayosw', 'Je confie mon besoin <span aria-hidden="true" data-astro-cid-5bmr6dtb="">→</span>'),
    ('pages.expertises.agilite-coaching.auto.button.gwvn35', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-rnckc5ic="">→</span>'),
    ('pages.expertises.agilite-coaching.auto.button.s7gcxm', 'Je parle de ma mission'),
    ('pages.expertises.auto.button.1q8ls5y', 'Je découvre les domaines <span aria-hidden="true" data-astro-cid-siqzw6pp="">↓</span>'),
    ('pages.expertises.cloud-devops.auto.button.gwvn35', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-rnckc5ic="">→</span>'),
    ('pages.expertises.cloud-devops.auto.button.s7gcxm', 'Je parle de ma mission'),
    ('pages.expertises.cybersecurite.auto.button.gwvn35', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-rnckc5ic="">→</span>'),
    ('pages.expertises.cybersecurite.auto.button.s7gcxm', 'Je parle de ma mission'),
    ('pages.expertises.data-ia.auto.button.gwvn35', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-rnckc5ic="">→</span>'),
    ('pages.expertises.data-ia.auto.button.s7gcxm', 'Je parle de ma mission'),
    ('pages.expertises.developpement-integration.auto.button.gwvn35', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-rnckc5ic="">→</span>'),
    ('pages.expertises.developpement-integration.auto.button.s7gcxm', 'Je parle de ma mission'),
    ('pages.expertises.product-project-management.auto.button.gwvn35', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-rnckc5ic="">→</span>'),
    ('pages.expertises.product-project-management.auto.button.s7gcxm', 'Je parle de ma mission'),
    ('pages.faq.auto.button.bubqhp', 'Je parle à un conseiller <span data-astro-cid-vagwt47q="">→</span>'),
    ('pages.faq.auto.button.vjh4vq', 'Je simule mes revenus <span data-astro-cid-vagwt47q="">→</span>'),
    ('pages.livres-blancs.auto.button.1ca9ilv', 'Je parle de ma situation <span aria-hidden="true" data-astro-cid-hdoqvdln="">↗</span>'),
    ('pages.livres-blancs.checklist-demarrer-portage-salarial.auto.button.134vnmm', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-bdolhkxr="">→</span>'),
    ('pages.livres-blancs.checklist-demarrer-portage-salarial.auto.button.1hthkth', 'Je parle à un conseiller'),
    ('pages.livres-blancs.comparatif-statuts-freelances.auto.button.134vnmm', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-bdolhkxr="">→</span>'),
    ('pages.livres-blancs.comparatif-statuts-freelances.auto.button.1hthkth', 'Je parle à un conseiller'),
    ('pages.livres-blancs.guide-complet-portage-salarial.auto.button.134vnmm', 'Je simule mes revenus <span aria-hidden="true" data-astro-cid-bdolhkxr="">→</span>'),
    ('pages.livres-blancs.guide-complet-portage-salarial.auto.button.1hthkth', 'Je parle à un conseiller'),
    ('pages.portage-salarial.auto.button.14m5iej', 'Je comprends les frais <span aria-hidden="true" data-astro-cid-gpe2ahup="">→</span>'),
    ('pages.portage-salarial.auto.button.pc30mw', 'Je consulte la FAQ <span aria-hidden="true" data-astro-cid-gpe2ahup="">→</span>'),
    ('pages.simulateur.auto.button.1iq9isv', 'Je parle à un conseiller'),
    ('pages.tarifs.auto.button.1unfqlc', 'Je prends rendez-vous'),
    ('pages.tarifs.auto.button.nviywh', 'Je découvre les prestations'),
    ('pages.tarifs.auto.button.wvc156', 'Je simule mes revenus')
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
    ('home.offer.it.cta', '/', 'button', 'Je découvre les expertises',
     'Je découvre les expertises', 'Je découvre les expertises'),
    ('home.offer.employee.cta', '/', 'button', 'Comprendre le cadre',
     'Comprendre le cadre', 'Comprendre le cadre'),
    ('home.offer.admin.cta', '/', 'button', 'Voir l’accompagnement',
     'Voir l’accompagnement', 'Voir l’accompagnement'),
    ('home.offer.human.cta', '/', 'button', 'Rencontrer l’équipe',
     'Rencontrer l’équipe', 'Rencontrer l’équipe')
on conflict (content_key) do nothing;

commit;
