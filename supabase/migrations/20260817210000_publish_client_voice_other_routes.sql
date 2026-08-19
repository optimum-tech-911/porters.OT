-- Publish the 2026-08-17 editorial rewrite to every route.
--
-- The visible site reads its text from cms_content_blocks, so rewritten source
-- copy stays invisible until it is published here.
--
-- Scope, decided per block against a full backup of the live table:
--   * 0 blocks whose SOURCE copy was rewritten -> republished below.
--   * 204 blocks whose source still matches its seeded fallback while the live
--     text differs are hand-made CMS edits. They are deliberately NOT touched.
--   * the 3 protected hero lines in src/cms/runtime-overrides.json have no source
--     row at all and therefore cannot be selected here.
--   * 13 keys the site renders but the CMS has never seen are inserted, so an
--     editor can reach them.
--
-- Idempotent: a block already carrying the new wording is skipped and no
-- version row is written for it.

begin;
-- No block needed republishing in this pass.


insert into public.cms_content_blocks
  (content_key, route_path, element_type, fallback_content, draft_content, published_content)
values
    ('contactform.label.name', '/_global', 'label', 'Nom complet *',
     'Nom complet *', 'Nom complet *'),
    ('contactform.label.email', '/_global', 'label', 'Email *',
     'Email *', 'Email *'),
    ('contactform.label.phone', '/_global', 'label', 'Téléphone',
     'Téléphone', 'Téléphone'),
    ('contactform.label.company', '/_global', 'label', 'Société (optionnel)',
     'Société (optionnel)', 'Société (optionnel)'),
    ('contactform.label.availability', '/_global', 'label', 'Vos disponibilités *',
     'Vos disponibilités *', 'Vos disponibilités *'),
    ('contactform.label.profile', '/_global', 'label', 'Vous êtes *',
     'Vous êtes *', 'Vous êtes *'),
    ('contactform.label.message', '/_global', 'label', 'Message *',
     'Message *', 'Message *'),
    ('contactform.label.submit', '/_global', 'button', 'Préparer l’email',
     'Préparer l’email', 'Préparer l’email'),
    ('rendezvous.topic.1.duration', '/rendez-vous', 'label', '30 min',
     '30 min', '30 min'),
    ('rendezvous.topic.2.duration', '/rendez-vous', 'label', '45 min',
     '45 min', '45 min'),
    ('rendezvous.topic.3.duration', '/rendez-vous', 'label', '45 min',
     '45 min', '45 min'),
    ('rendezvous.topic.4.duration', '/rendez-vous', 'label', '45 min',
     '45 min', '45 min'),
    ('rendezvous.topic.5.duration', '/rendez-vous', 'label', '30 min',
     '30 min', '30 min')
on conflict (content_key) do nothing;

commit;
