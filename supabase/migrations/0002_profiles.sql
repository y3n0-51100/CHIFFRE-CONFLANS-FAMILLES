-- Comptes nominatifs : rôle et périmètre de chaque personne du magasin.
--
-- L'authentification elle-même est gérée par Supabase Auth (table auth.users).
-- Cette table ne porte que ce que l'application a besoin de savoir : le nom
-- affiché, le rôle et, pour un chef de rayon, les familles qui lui sont confiées.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nom text not null,
  role text not null default 'vendeur' check (role in ('directeur', 'chef_rayon', 'vendeur')),
  -- Familles confiées. Vide = tout le magasin (direction).
  rayons text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Chacun lit sa propre fiche ; la direction lit tout le monde.
drop policy if exists "profiles_read_self" on public.profiles;
create policy "profiles_read_self" on public.profiles
  for select using (
    auth.uid() = id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'directeur'
    )
  );

-- La création et la modification des comptes passent par la clé de service
-- (script scripts/create-user.ts), jamais par le navigateur.
