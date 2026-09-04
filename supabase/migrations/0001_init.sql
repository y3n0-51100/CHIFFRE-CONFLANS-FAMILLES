-- Schéma de l'outil d'analyse du chiffre par famille (magasin BUT Conflans).
-- Exercice comptable : 1er avril -> 31 mars.

create table if not exists public.monthly_sales (
  id          bigint generated always as identity primary key,
  -- Période calendaire au format YYYY-MM (ex: 2026-04 pour avril 2026).
  period      text        not null check (period ~ '^\d{4}-(0[1-9]|1[0-2])$'),
  -- Libellé de la famille / rayon, normalisé en majuscules sans accent.
  family      text        not null,
  -- CA TTC en prise d'ordre.
  ordre       numeric(14,2) not null default 0,
  -- CA HT en sortie (livré / facturé).
  sortie      numeric(14,2) not null default 0,
  created_at  timestamptz not null default now(),
  unique (period, family)
);

create index if not exists monthly_sales_period_idx on public.monthly_sales (period);
create index if not exists monthly_sales_family_idx on public.monthly_sales (family);

-- Vue de confort : exercice comptable et position du mois dans l'exercice.
create or replace view public.monthly_sales_fiscal
with (security_invoker = on) as
select
  s.*,
  case when substring(s.period from 6 for 2)::int >= 4
       then substring(s.period from 1 for 4)::int
       else substring(s.period from 1 for 4)::int - 1
  end as fiscal_year,
  ((substring(s.period from 6 for 2)::int - 4 + 12) % 12) as fiscal_month_index
from public.monthly_sales s;

alter table public.monthly_sales enable row level security;

-- L'application se connecte avec la clé publiable (anon) et n'expose que des données
-- de pilotage interne : accès complet accordé au rôle anon.
-- Pour restreindre à des comptes nominatifs, remplacer `anon` par `authenticated`
-- et activer Supabase Auth côté application.
drop policy if exists monthly_sales_read on public.monthly_sales;
create policy monthly_sales_read on public.monthly_sales for select to anon using (true);

drop policy if exists monthly_sales_write on public.monthly_sales;
create policy monthly_sales_write on public.monthly_sales for insert to anon with check (true);

drop policy if exists monthly_sales_update on public.monthly_sales;
create policy monthly_sales_update on public.monthly_sales for update to anon using (true) with check (true);

drop policy if exists monthly_sales_delete on public.monthly_sales;
create policy monthly_sales_delete on public.monthly_sales for delete to anon using (true);
