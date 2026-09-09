-- Distinguish contact, appointment, application and simulator requests while
-- keeping the existing contact/simulation inbox split backwards compatible.
begin;

alter table public.crm_inquiries
  add column if not exists inquiry_type text not null default 'contact';

update public.crm_inquiries
set inquiry_type = 'simulation'
where kind = 'simulation' and inquiry_type = 'contact';

alter table public.crm_inquiries
  drop constraint if exists crm_inquiries_inquiry_type_check,
  add constraint crm_inquiries_inquiry_type_check
    check (inquiry_type in ('contact', 'appointment', 'application', 'simulation')),
  drop constraint if exists crm_inquiries_contact_lengths_check,
  add constraint crm_inquiries_contact_lengths_check check (
    length(email) <= 320
    and length(coalesce(name, '')) <= 200
    and length(coalesce(first_name, '')) <= 100
    and length(coalesce(last_name, '')) <= 100
    and length(coalesce(phone, '')) <= 60
    and length(coalesce(company, '')) <= 180
    and length(coalesce(profile, '')) <= 160
    and length(coalesce(subject, '')) <= 300
    and length(coalesce(message, '')) <= 5000
    and length(coalesce(source_page, '')) <= 500
    and length(coalesce(landing_page, '')) <= 2000
    and length(coalesce(referrer, '')) <= 2000
    and length(coalesce(session_id, '')) <= 160
    and jsonb_typeof(metadata) = 'object'
  );

create index if not exists crm_inquiries_type_created_at_idx
  on public.crm_inquiries (inquiry_type, created_at desc);

drop policy if exists "Public can create CRM inquiries" on public.crm_inquiries;
create policy "Public can create CRM inquiries"
on public.crm_inquiries
for insert
to anon, authenticated
with check (
  consent = true
  and length(trim(email)) between 5 and 320
  and position('@' in email) > 1
  and source = 'website'
  and status = 'new'
  and assigned_admin is null
  and (
    (
      kind = 'contact'
      and inquiry_type in ('contact', 'appointment', 'application')
      and length(trim(coalesce(name, ''))) >= 2
      and length(trim(coalesce(message, ''))) >= 5
    )
    or
    (
      kind = 'simulation'
      and inquiry_type = 'simulation'
      and length(trim(coalesce(first_name, ''))) >= 1
      and length(trim(coalesce(last_name, ''))) >= 1
      and length(trim(coalesce(phone, ''))) >= 6
      and length(trim(coalesce(profile, ''))) >= 2
      and monthly_revenue between 1 and 1000000
      and professional_expenses between 0 and 1000000
    )
  )
);

comment on column public.crm_inquiries.inquiry_type is
  'Public request type: contact, appointment, application or simulation.';

commit;
