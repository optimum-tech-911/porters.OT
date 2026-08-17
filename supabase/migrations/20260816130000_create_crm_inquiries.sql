create table if not exists public.crm_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  kind text not null check (kind in ('contact', 'simulation')),
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'proposal', 'converted', 'archived')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  assigned_admin uuid references auth.users(id) on delete set null,
  first_name text,
  last_name text,
  name text,
  email text not null,
  phone text,
  company text,
  profile text,
  subject text,
  message text,
  simulator_mode text check (simulator_mode is null or simulator_mode in ('portage', 'freelance')),
  tjm numeric,
  days_worked integer,
  monthly_revenue numeric,
  professional_expenses numeric,
  estimated_net_monthly numeric,
  consent boolean not null default false,
  source_page text,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  session_id text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb
);

drop trigger if exists crm_inquiries_set_updated_at on public.crm_inquiries;
create trigger crm_inquiries_set_updated_at
before update on public.crm_inquiries
for each row execute function public.cms_set_updated_at();

create index if not exists crm_inquiries_created_at_idx on public.crm_inquiries (created_at desc);
create index if not exists crm_inquiries_kind_status_idx on public.crm_inquiries (kind, status);
create index if not exists crm_inquiries_email_idx on public.crm_inquiries (lower(email));

alter table public.crm_inquiries enable row level security;

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
  and (
    (
      kind = 'contact'
      and length(trim(coalesce(name, ''))) >= 2
      and length(trim(coalesce(message, ''))) >= 5
    )
    or
    (
      kind = 'simulation'
      and length(trim(coalesce(first_name, ''))) >= 1
      and length(trim(coalesce(last_name, ''))) >= 1
      and length(trim(coalesce(phone, ''))) >= 6
      and length(trim(coalesce(profile, ''))) >= 2
      and monthly_revenue between 1 and 1000000
      and professional_expenses between 0 and 1000000
    )
  )
);

drop policy if exists "CMS admins can read CRM inquiries" on public.crm_inquiries;
create policy "CMS admins can read CRM inquiries"
on public.crm_inquiries
for select
to authenticated
using (public.is_cms_admin());

drop policy if exists "CMS admins can update CRM inquiries" on public.crm_inquiries;
create policy "CMS admins can update CRM inquiries"
on public.crm_inquiries
for update
to authenticated
using (public.is_cms_admin())
with check (public.is_cms_admin());

drop policy if exists "CMS admins can delete CRM inquiries" on public.crm_inquiries;
create policy "CMS admins can delete CRM inquiries"
on public.crm_inquiries
for delete
to authenticated
using (public.is_cms_admin());

grant insert on public.crm_inquiries to anon, authenticated;
grant select, update, delete on public.crm_inquiries to authenticated;
