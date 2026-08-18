-- HOY Lifestyle quality foundation.
-- Deliberately fail-closed: only explicitly tested owner mutations are writable.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.lifestyle_regions (
  id uuid primary key default extensions.gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country_code text not null check (country_code ~ '^[A-Z]{2}$'),
  timezone text not null,
  default_currency text not null check (default_currency ~ '^[A-Z]{3}$'),
  status text not null default 'active' check (status in ('active','planned','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.lifestyle_providers (
  id uuid primary key default extensions.gen_random_uuid(),
  region_id uuid not null references public.lifestyle_regions(id) on delete restrict,
  external_key text, display_name text not null, locality text, category text,
  phone text, whatsapp text, website_url text check (website_url is null or website_url ~ '^https://'),
  status text not null default 'draft' check (status in ('draft','active','temporarily_closed','closed','suppressed')),
  publication_state text not null default 'draft' check (publication_state in ('draft','published','suppressed')),
  last_researched_at timestamptz, owner_confirmed_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(region_id, external_key)
);

create table if not exists public.lifestyle_locations (
  id uuid primary key default extensions.gen_random_uuid(),
  region_id uuid not null references public.lifestyle_regions(id) on delete restrict,
  provider_id uuid references public.lifestyle_providers(id) on delete set null,
  name text not null, locality text, address text,
  latitude numeric check (latitude is null or latitude between -90 and 90),
  longitude numeric check (longitude is null or longitude between -180 and 180),
  location_type text not null default 'venue',
  public_map_url text check (public_map_url is null or public_map_url ~ '^https://'),
  publication_state text not null default 'draft' check (publication_state in ('draft','published','suppressed')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.lifestyle_activities (
  id uuid primary key default extensions.gen_random_uuid(),
  region_id uuid not null references public.lifestyle_regions(id) on delete restrict,
  provider_id uuid references public.lifestyle_providers(id) on delete set null,
  location_id uuid references public.lifestyle_locations(id) on delete set null,
  external_key text, title text not null, category text not null,
  offer_summary text, audience text, environment text,
  hoy_now_fit text check (hoy_now_fit is null or hoy_now_fit in ('High','Medium','Low')),
  family_fit text not null default 'unknown' check (family_fit in ('yes','no','partial','unknown','not_applicable','temporarily_unavailable')),
  weather_dependency jsonb not null default '{}'::jsonb,
  publication_state text not null default 'draft' check (publication_state in ('draft','published','suppressed')),
  last_researched_at timestamptz,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(region_id, external_key)
);

create table if not exists public.lifestyle_schedules (
  id uuid primary key default extensions.gen_random_uuid(),
  provider_id uuid references public.lifestyle_providers(id) on delete cascade,
  activity_id uuid references public.lifestyle_activities(id) on delete cascade,
  schedule_type text not null check (schedule_type in ('opening_hours','departure','appointment','season')),
  weekday smallint check (weekday is null or weekday between 0 and 6),
  starts_time time, ends_time time, valid_from date, valid_to date,
  by_appointment boolean not null default false, timezone text not null default 'Europe/Madrid',
  source_url text check (source_url is null or source_url ~ '^https://'),
  verification_level text not null default 'RESEARCHED' check (verification_level in ('RESEARCHED','OWNER_CONFIRMED','HOY_VERIFIED','LIVE_TODAY','STALE','CONFLICT')),
  verified_at timestamptz, expires_at timestamptz,
  check (provider_id is not null or activity_id is not null)
);

create table if not exists public.lifestyle_availability_snapshots (
  id uuid primary key default extensions.gen_random_uuid(),
  activity_id uuid not null references public.lifestyle_activities(id) on delete cascade,
  status text not null check (status in ('available','limited','full','closed','weather_blocked','unknown')),
  remaining_capacity integer check (remaining_capacity is null or remaining_capacity >= 0),
  note text check (note is null or char_length(note) <= 240),
  starts_at timestamptz, ends_at timestamptz, expires_at timestamptz not null,
  source_type text not null check (source_type in ('owner','hoy','feed')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(), check (expires_at > created_at)
);

create table if not exists public.lifestyle_booking_channels (
  id uuid primary key default extensions.gen_random_uuid(),
  provider_id uuid references public.lifestyle_providers(id) on delete cascade,
  activity_id uuid references public.lifestyle_activities(id) on delete cascade,
  mode text not null check (mode in ('walk_in','phone','whatsapp','website','external_platform')),
  url text check (url is null or url ~ '^https://'), phone text, priority smallint not null default 100,
  active boolean not null default true, verified_at timestamptz,
  check (provider_id is not null or activity_id is not null)
);

create table if not exists public.lifestyle_eligibility_rules (
  id uuid primary key default extensions.gen_random_uuid(),
  activity_id uuid not null references public.lifestyle_activities(id) on delete cascade,
  min_age integer check (min_age is null or min_age >= 0),
  min_height_cm integer check (min_height_cm is null or min_height_cm >= 0),
  licence_required text not null default 'unknown' check (licence_required in ('yes','no','depends','unknown')),
  swim_required text not null default 'unknown' check (swim_required in ('yes','no','depends','unknown')),
  notes text, verified_at timestamptz
);

create table if not exists public.lifestyle_accessibility_attributes (
  id uuid primary key default extensions.gen_random_uuid(),
  activity_id uuid references public.lifestyle_activities(id) on delete cascade,
  location_id uuid references public.lifestyle_locations(id) on delete cascade,
  step_free text not null default 'unknown' check (step_free in ('yes','no','partial','unknown','not_applicable','temporarily_unavailable')),
  accessible_parking text not null default 'unknown' check (accessible_parking in ('yes','no','partial','unknown','not_applicable','temporarily_unavailable')),
  accessible_toilet text not null default 'unknown' check (accessible_toilet in ('yes','no','partial','unknown','not_applicable','temporarily_unavailable')),
  transfer_help text not null default 'unknown' check (transfer_help in ('yes','no','partial','unknown','not_applicable','temporarily_unavailable')),
  adaptive_equipment text not null default 'unknown' check (adaptive_equipment in ('yes','no','partial','unknown','not_applicable','temporarily_unavailable')),
  sensory_support jsonb not null default '{}'::jsonb, limitations text,
  verification_level text not null default 'RESEARCHED' check (verification_level in ('RESEARCHED','OWNER_CONFIRMED','HOY_VERIFIED','STALE','CONFLICT')),
  evidence_url text check (evidence_url is null or evidence_url ~ '^https://'), verified_at timestamptz,
  check (activity_id is not null or location_id is not null)
);

create table if not exists public.lifestyle_ownership_claims (
  id uuid primary key default extensions.gen_random_uuid(),
  provider_id uuid not null references public.lifestyle_providers(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','manager','live_updater')),
  status text not null default 'pending' check (status in ('pending','verified','rejected','revoked')),
  claimed_at timestamptz not null default now(), verified_at timestamptz,
  unique(provider_id,user_id)
);

create table if not exists public.lifestyle_data_sources (
  id uuid primary key default extensions.gen_random_uuid(),
  source_type text not null, url text not null check (url ~ '^https://'), publisher text,
  reliability_class text not null default 'secondary' check (reliability_class in ('official','owner','primary','secondary','listing')),
  fetched_at timestamptz not null default now()
);

create table if not exists public.lifestyle_verification_records (
  id uuid primary key default extensions.gen_random_uuid(),
  entity_type text not null, entity_id uuid not null, field_key text not null,
  level text not null check (level in ('RESEARCHED','OWNER_CONFIRMED','HOY_VERIFIED','LIVE_TODAY','STALE','CONFLICT')),
  source_id uuid references public.lifestyle_data_sources(id) on delete set null,
  verified_by uuid references auth.users(id) on delete set null,
  verified_at timestamptz not null default now(), expires_at timestamptz,
  public_visible boolean not null default true, conflict_note text
);

create index if not exists lifestyle_providers_region_idx on public.lifestyle_providers(region_id, publication_state, status);
create index if not exists lifestyle_locations_region_idx on public.lifestyle_locations(region_id, publication_state);
create index if not exists lifestyle_activities_region_idx on public.lifestyle_activities(region_id, publication_state, category);
create index if not exists lifestyle_activities_provider_idx on public.lifestyle_activities(provider_id);
create index if not exists lifestyle_schedules_activity_idx on public.lifestyle_schedules(activity_id, valid_from, valid_to);
create index if not exists lifestyle_availability_activity_idx on public.lifestyle_availability_snapshots(activity_id, expires_at desc);
create index if not exists lifestyle_claims_user_idx on public.lifestyle_ownership_claims(user_id, status);
create index if not exists lifestyle_verification_entity_idx on public.lifestyle_verification_records(entity_type, entity_id, field_key, verified_at desc);

alter table public.lifestyle_regions enable row level security;
alter table public.lifestyle_providers enable row level security;
alter table public.lifestyle_locations enable row level security;
alter table public.lifestyle_activities enable row level security;
alter table public.lifestyle_schedules enable row level security;
alter table public.lifestyle_availability_snapshots enable row level security;
alter table public.lifestyle_booking_channels enable row level security;
alter table public.lifestyle_eligibility_rules enable row level security;
alter table public.lifestyle_accessibility_attributes enable row level security;
alter table public.lifestyle_ownership_claims enable row level security;
alter table public.lifestyle_data_sources enable row level security;
alter table public.lifestyle_verification_records enable row level security;

grant select on public.lifestyle_regions, public.lifestyle_providers, public.lifestyle_locations, public.lifestyle_activities,
  public.lifestyle_schedules, public.lifestyle_availability_snapshots, public.lifestyle_booking_channels,
  public.lifestyle_eligibility_rules, public.lifestyle_accessibility_attributes, public.lifestyle_data_sources,
  public.lifestyle_verification_records to anon, authenticated;
grant select, insert on public.lifestyle_ownership_claims to authenticated;
grant update on public.lifestyle_providers, public.lifestyle_activities to authenticated;
grant insert on public.lifestyle_activities, public.lifestyle_availability_snapshots to authenticated;

create policy "regions public active read" on public.lifestyle_regions for select to anon, authenticated using (status='active');
create policy "providers public published read" on public.lifestyle_providers for select to anon, authenticated using (publication_state='published' and status in ('active','temporarily_closed'));
create policy "locations public published read" on public.lifestyle_locations for select to anon, authenticated using (publication_state='published');
create policy "activities public published read" on public.lifestyle_activities for select to anon, authenticated using (publication_state='published');
create policy "schedules public published read" on public.lifestyle_schedules for select to anon, authenticated using (
  (activity_id is not null and exists(select 1 from public.lifestyle_activities a where a.id=activity_id and a.publication_state='published')) or
  (provider_id is not null and exists(select 1 from public.lifestyle_providers p where p.id=provider_id and p.publication_state='published'))
);
create policy "availability public unexpired read" on public.lifestyle_availability_snapshots for select to anon, authenticated using (
  expires_at>now() and exists(select 1 from public.lifestyle_activities a where a.id=activity_id and a.publication_state='published')
);
create policy "booking public active read" on public.lifestyle_booking_channels for select to anon, authenticated using (
  active and ((activity_id is not null and exists(select 1 from public.lifestyle_activities a where a.id=activity_id and a.publication_state='published')) or
  (provider_id is not null and exists(select 1 from public.lifestyle_providers p where p.id=provider_id and p.publication_state='published')))
);
create policy "eligibility public read" on public.lifestyle_eligibility_rules for select to anon, authenticated using (
  exists(select 1 from public.lifestyle_activities a where a.id=activity_id and a.publication_state='published')
);
create policy "accessibility public read" on public.lifestyle_accessibility_attributes for select to anon, authenticated using (
  (activity_id is not null and exists(select 1 from public.lifestyle_activities a where a.id=activity_id and a.publication_state='published')) or
  (location_id is not null and exists(select 1 from public.lifestyle_locations l where l.id=location_id and l.publication_state='published'))
);
create policy "sources public read" on public.lifestyle_data_sources for select to anon, authenticated using (true);
create policy "verification public visible read" on public.lifestyle_verification_records for select to anon, authenticated using (public_visible);

create policy "claims own read" on public.lifestyle_ownership_claims for select to authenticated using ((select auth.uid())=user_id);
create policy "claims own pending insert" on public.lifestyle_ownership_claims for insert to authenticated with check ((select auth.uid())=user_id and status='pending');

create policy "providers member read" on public.lifestyle_providers for select to authenticated using (exists(
  select 1 from public.lifestyle_ownership_claims c where c.provider_id=lifestyle_providers.id and c.user_id=(select auth.uid()) and c.status='verified'
));
create policy "providers member update" on public.lifestyle_providers for update to authenticated
  using (exists(select 1 from public.lifestyle_ownership_claims c where c.provider_id=lifestyle_providers.id and c.user_id=(select auth.uid()) and c.status='verified' and c.role in ('owner','manager')))
  with check (exists(select 1 from public.lifestyle_ownership_claims c where c.provider_id=lifestyle_providers.id and c.user_id=(select auth.uid()) and c.status='verified' and c.role in ('owner','manager')));

create policy "activities member read" on public.lifestyle_activities for select to authenticated using (provider_id is not null and exists(
  select 1 from public.lifestyle_ownership_claims c where c.provider_id=lifestyle_activities.provider_id and c.user_id=(select auth.uid()) and c.status='verified'
));
create policy "activities member insert" on public.lifestyle_activities for insert to authenticated with check (provider_id is not null and exists(
  select 1 from public.lifestyle_ownership_claims c where c.provider_id=lifestyle_activities.provider_id and c.user_id=(select auth.uid()) and c.status='verified' and c.role in ('owner','manager')
));
create policy "activities member update" on public.lifestyle_activities for update to authenticated
  using (provider_id is not null and exists(select 1 from public.lifestyle_ownership_claims c where c.provider_id=lifestyle_activities.provider_id and c.user_id=(select auth.uid()) and c.status='verified' and c.role in ('owner','manager')))
  with check (provider_id is not null and exists(select 1 from public.lifestyle_ownership_claims c where c.provider_id=lifestyle_activities.provider_id and c.user_id=(select auth.uid()) and c.status='verified' and c.role in ('owner','manager')));

create policy "availability member insert" on public.lifestyle_availability_snapshots for insert to authenticated with check (
  created_by=(select auth.uid()) and expires_at<=now()+interval '24 hours' and exists(
    select 1 from public.lifestyle_activities a join public.lifestyle_ownership_claims c on c.provider_id=a.provider_id
    where a.id=lifestyle_availability_snapshots.activity_id and c.user_id=(select auth.uid()) and c.status='verified' and c.role in ('owner','manager','live_updater')
  )
);

-- Claim verification/revocation and all other owner mutations stay denied until
-- a dedicated policy plus authorization-equivalence tests exist.
