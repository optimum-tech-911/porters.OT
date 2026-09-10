-- Keep the public CRM surface write-only. RLS already rejects anonymous reads
-- and mutations, while these grants also enforce least privilege at table level.
begin;

revoke select, update, delete, truncate, references, trigger
  on table public.crm_inquiries
  from anon;

grant insert on table public.crm_inquiries to anon;
grant insert, select, update, delete on table public.crm_inquiries to authenticated;

commit;
