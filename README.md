# Chiffre Conflans — analyse du CA par famille

Outil de pilotage du chiffre d'affaires du magasin, famille par famille, sur un
exercice comptable **du 1er avril au 31 mars**.

Deux indicateurs suivis en parallèle, tels qu'ils sortent de l'extraction BUT :

| Indicateur | Colonne du fichier source |
|---|---|
| Prise d'ordre (TTC) | `CATTC PRISE D'ORDRE` |
| Sortie (HT) | `CA HORS-TAXE SORTIE` |

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

Mot de passe d'accès : celui défini dans `src/lib/auth.ts`.

## Écrans

- **Synthèse** — cumul d'exercice, écart et évolution vs l'exercice de comparaison,
  chiffre mensuel comparé, cumul depuis le 1er avril, plus fortes progressions et baisses.
- **Familles** — tableau trié et filtrable de toutes les familles (CA, écart, évolution, poids),
  et, quand une famille est sélectionnée, son détail mensuel et sa tendance par exercice.
- **Budget** — budgets prévisionnels par famille et par mois, en trois scénarios.
- **Import** — dépôt du fichier Excel mensuel, contrôle avant enregistrement, gestion des mois.

### Filtres communs
- **Exercice** / **Comparé à** : n'importe quelle paire d'exercices présents en base.
- **Famille** : une famille ou toutes.
- **Périmètre** :
  - *Mois communs* — ne compare que les mois présents dans les deux exercices
    (comparaison honnête tant que l'exercice en cours n'est pas terminé) ;
  - *Exercice complet* — additionne tout ce qui est saisi, sans retraitement.

## Import mensuel

Déposer le fichier Excel de l'extraction dans l'écran **Import**. Le mois est déduit du
nom du fichier : `04.26.xlsx` = avril 2026. Plusieurs fichiers peuvent être déposés en une fois.

Le lecteur repère les colonnes par leur en-tête (pas par leur position), recompose les
familles, vérifie le total contre la ligne `Somme :` du fichier et signale tout écart
avant enregistrement. Un mois déjà présent est **remplacé** intégralement.

Les lignes de l'export sans libellé de rayon sont regroupées sous `(NON AFFECTE)` : elles
pèsent réellement dans le chiffre du magasin et sont conservées pour que les totaux collent.

> À noter : dans l'export source, la colonne `N-1` de la **sortie** est calculée sur la base
> de l'année en cours (`(N − N‑1) / N`) et non sur l'année précédente, ce qui donne des
> pourcentages aberrants (−697 %, −198 %…). L'outil ignore ces colonnes et recalcule toutes
> les évolutions à partir de l'historique réel, en `(N − N‑1) / N‑1`.

## Budgets prévisionnels

Le budget d'une famille est construit ainsi :

1. **Base** = CA de l'exercice de référence (le dernier disponible avant l'exercice budgété).
   S'il est incomplet, il est annualisé via la saisonnalité observée sur les exercices complets.
2. **Tendance magasin** = moyenne pondérée des évolutions annuelles de la famille
   (l'exercice le plus récent pèse davantage), écrêtée à ±15 % par défaut pour éviter
   qu'un coup ponctuel ne s'extrapole.
3. **Hypothèse de marché** = croissance attendue de l'univers de la famille (meuble, gros
   électroménager, petit électroménager, décoration/textile, image-son-tech), en trois
   scénarios : prudent, central, favorable.
4. **Croissance retenue** = 60 % de tendance magasin + 40 % de marché (curseur ajustable).

Le budget total est ensuite réparti sur les 12 mois selon la saisonnalité du magasin.

Les hypothèses de marché par défaut sont des ordres de grandeur prudents du marché français
(meuble quasi stable, électroménager légèrement porteur, image et son en repli). Elles sont
**modifiables directement dans l'écran Budget** et à réviser chaque année avec les
publications de branche (IPEA/FNAEM pour le meuble, GfK/GIFAM pour l'électroménager).
Le rattachement des familles aux univers se règle dans `src/lib/market.ts`.

## Stockage des données

Par défaut, l'outil fonctionne **sans serveur** : l'historique livré (avril 2024 → août 2026)
est embarqué dans l'application et les imports sont conservés dans le stockage local du
navigateur. Rien à installer, mais les données restent sur le poste utilisé.

### Mode Supabase (multi-postes)

Le projet Supabase est déjà provisionné :

| | |
|---|---|
| Projet | `chiffre-conflans-familles` |
| Référence | `xmydzxguxesdauykajhr` |
| URL API | `https://xmydzxguxesdauykajhr.supabase.co` |
| Région | Paris (eu-west-3) |
| Table | `monthly_sales` — 779 lignes chargées (avril 2024 → août 2026) |

Pour l'activer, créer un fichier `.env` à la racine :

```bash
cp .env.example .env
# VITE_SUPABASE_URL=https://xmydzxguxesdauykajhr.supabase.co
# VITE_SUPABASE_ANON_KEY=<clé publiable, dashboard Supabase > Project Settings > API Keys>
```

Le fichier `.env` n'est pas versionné. Au démarrage, le bandeau en haut à droite affiche
« Supabase » et tous les imports vont dans la table `monthly_sales`.

Pour recharger l'historique de zéro dans un autre projet :

```bash
SUPABASE_URL=https://xxxx.supabase.co SUPABASE_KEY=<clé> npm run push:supabase
```

Si la base est injoignable (réseau coupé, projet en pause), l'écran affiche l'erreur et un
bouton « Réessayer » plutôt que de rester en chargement.

Les policies livrées ouvrent la table au rôle `anon` : l'accès réel est filtré par le mot de
passe de l'application. Pour un cloisonnement plus strict, passer les policies sur
`authenticated` et brancher Supabase Auth.

## Déploiement (Cloudflare Pages)

Réglages du projet Pages — les trois lignes qui comptent :

| Réglage | Valeur |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(vide, la racine du dépôt)* |

Sans commande de build, Cloudflare publie le dépôt tel quel : `index.html` pointe alors
vers `/src/main.tsx`, que le navigateur ne sait pas exécuter — la page reste blanche.
C'est la cause à vérifier en premier devant un écran vide (Ctrl+U : si le HTML servi
contient `/src/main.tsx` au lieu de `/assets/index-*.js`, le build n'a pas tourné).

Variables d'environnement à déclarer dans le projet Pages (onglet *Settings › Variables*),
sinon l'application démarre en stockage local sur chaque poste :

```
VITE_SUPABASE_URL=https://xmydzxguxesdauykajhr.supabase.co
VITE_SUPABASE_ANON_KEY=<clé publiable>
```

Elles sont lues **au moment du build** : après les avoir ajoutées ou modifiées, relancer
un déploiement pour qu'elles soient prises en compte.

`wrangler.toml` déclare déjà `pages_build_output_dir = "dist"`, `.nvmrc` fixe Node 22 et
`public/_redirects` renvoie toutes les URL vers `index.html`. Le champ `name` de
`wrangler.toml` doit rester identique au nom du projet Pages, sinon le déploiement échoue.

## Regénérer le jeu de données livré

Les 29 exports d'origine sont conservés dans `data/sources/`. Après en avoir ajouté :

```bash
npm run seed
```

## Structure

```
data/sources/         exports Excel d'origine
scripts/              génération du seed, chargement Supabase
supabase/migrations/  schéma SQL
src/lib/              fiscal (exercice avril-mars), parse, analytics, budget, market, store
src/components/       écrans Synthèse / Familles / Budget / Import
```

## Sécurité

Le mot de passe protège l'accès à l'interface, il ne chiffre pas les données : c'est un
verrou d'usage pour un outil interne, pas un contrôle d'accès serveur. Ne pas publier
l'application sur une URL publique sans passer par Supabase Auth.
