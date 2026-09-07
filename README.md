# BUT Conflans — pilotage du magasin 275

> Ce dépôt et `exploitation-conflans` servent **le même site**, sur deux projets Cloudflare
> Pages différents (`famille-conflans` ici). Toute évolution doit être poussée sur les deux,
> sans quoi les deux URL divergent.

Site unique regroupant les outils de pilotage du magasin :

| Onglet | Ce qu'il fait | Données |
|---|---|---|
| **Aujourd'hui** | la journée en cours sur téléphone : saisie en quatre champs, objectif du jour, atterrissage du mois, alertes | Firebase |
| **Suivi CA / Marge** | saisie quotidienne du CA, de la marge et de la fréquentation, face à l'objectif réparti jour par jour | Firebase (`suiviCaMarge`) |
| **Prévisionnel** | 7 indicateurs suivis sur les 12 périodes de l'exercice, avec recalibrage automatique | Firebase (`previsionnel/magasin_275`) |
| **Synthèse** | chiffre de l'exercice, écart et évolution, tendance 12 mois, plus fortes hausses et baisses | Supabase |
| **Familles** | tableau trié et exportable, saisonnalité en carte de chaleur, détail d'une famille | Supabase |
| **Budget** | budgets prévisionnels par famille et par mois, en trois scénarios | Supabase |
| **Stock** | couverture en jours et rotation par famille, trésorerie immobilisée | Firebase (`stocks/magasin_275`) + Supabase |
| **Point hebdo** | le point du lundi matin rédigé automatiquement, à copier ou imprimer | les deux |
| **Import** | dépôt du fichier Excel mensuel, contrôle avant enregistrement | Supabase |

Les écrans visibles dépendent du rôle de la personne connectée (voir *Comptes et rôles*).

Les deux premiers écrans viennent du site *Exploitation Conflans* (ancien `index.html`), les
quatre suivants de *Chiffre Conflans*. Le portage n'a rien changé aux calculs ni aux données :
les écrans Firebase lisent et écrivent exactement où ils écrivaient déjà, dans le projet
`cosy-conflans`. Rien n'a été migré vers Supabase.

Thème clair ou sombre au choix (bouton en haut à droite), mémorisé sur le poste ; sans choix
explicite, l'application suit le réglage du système.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

Mot de passe d'accès : celui défini dans `src/lib/auth.ts`.

## Aujourd'hui

Écran d'entrée, pensé pour le téléphone en surface de vente : la journée (hier ou aujourd'hui),
sa saisie en quatre champs, le cumul du mois, l'atterrissage projeté, le reste à faire par jour
et les alertes en cours. C'est le même stockage que le suivi détaillé : ce qui est saisi ici
apparaît là-bas, et inversement.

## Suivi CA / Marge

L'objectif mensuel de CA et de marge est réparti jour par jour selon le poids du **même jour
l'an dernier**, décalé de 364 jours (52 semaines pleines) et non d'un an : on compare ainsi un
samedi à un samedi, seul rapprochement qui ait un sens dans le commerce. L'historique N-1
livré est figé dans `src/data/n1.json`.

Chaque saisie est enregistrée dans Firestore après un court silence de frappe ; le bandeau en
haut à droite indique l'état de la liaison. Les sous-totaux hebdomadaires ferment le lundi.

### Atterrissage du mois

Le cumul dit où on en est, pas où on va finir. La projection ramène le réalisé au mois complet
en divisant par la **part de mois déjà couverte**, mesurée en poids N-1 et non en nombre de
jours : dix jours creux ne pèsent pas autant que dix jours de week-end. En dessous de 15 % de
mois écoulé, aucune projection n'est affichée — elle ne voudrait rien dire.

En face, le **reste à faire** : ce qu'il manque pour tenir l'objectif, et la moyenne quotidienne
correspondante sur les jours restants.

### Fréquentation et transformation

Le fichier N-1 contient un compteur de fréquentation (`freq`) que l'ancien outil chargeait sans
jamais l'afficher. Ce sont les **entrées porte** du jour. En saisissant les **visiteurs** et les
**tickets** du jour, l'outil calcule le taux de transformation, le panier moyen, le CA par
visiteur et l'indice de fréquentation vs N-1. C'est ce qui permet de trancher entre « il y a eu
moins de monde » et « on a moins bien vendu » — un cumul de CA seul ne le dit pas.

### Comparaison N-1 à périmètre égal

Le CA N-1 affiché ne porte que sur les **jours réellement saisis**, pas sur le mois N-1 entier.
L'ancien outil comparait 6 jours saisis à un mois complet et annonçait −73 % : c'était faux.
Le total N-1 du mois entier reste utilisé, mais pour ce à quoi il sert : répartir l'objectif.

### Alertes

Affichées en haut du suivi et de l'écran Aujourd'hui, dès que les chiffres le justifient :
trois jours consécutifs sous l'objectif, atterrissage à plus de 3 % de l'objectif, taux de marge
sous la cible de plus de 1,5 point, fréquentation en repli de plus de 10 %, saisie en retard de
plus de deux jours.

## Prévisionnel

Sept indicateurs (CA PO TTC, CA sortie, MB Glo C.E.X, MB Prime, MB Déco PO, stocks, R.C.A.I)
suivis sur 12 périodes, P1 = avril. Trois vues : **saisie mensuelle**, **tableau de bord**
annuel et **cumulé** (indicateurs en lignes, périodes en colonnes).

Le **recalibrage** ajuste les objectifs des mois non encore saisis pour que l'objectif annuel
reste tenable : ce qui reste à faire est réparti sur les mois à venir au prorata de leurs
objectifs d'origine. Un objectif ajusté est marqué `↺`, l'objectif d'origine reste affiché.
Les stocks et le R.C.A.I ne sont pas recalibrés (un stock est une photo à date, pas un cumul).

Un mois peut être **verrouillé** : ses champs passent en lecture seule une fois la période
close. Une alerte s'affiche dès qu'un R.C.A.I réalisé creuse le déficit prévu.
Les objectifs annuels sont dans `src/lib/previsionnel.ts`, à réviser à chaque exercice.

### Plus de double saisie

Le CA du mois existe déjà ailleurs dans l'outil : dans l'import Excel des familles (prise
d'ordre TTC et sortie HT) et dans le suivi quotidien. Le prévisionnel le **propose** au lieu de
le faire retaper — sous le champ concerné (« Import familles : 131 743 € — reprendre ») ou d'un
coup par le bandeau en haut. Rien n'est écrit sans validation, et un mois verrouillé n'est
jamais touché. L'import prime sur le suivi quotidien, plus fiable une fois le mois clos.

## Stock

Le stock se saisit famille par famille, au moment du relevé. Croisé avec le CA sortie de
l'exercice, il donne la **couverture en jours de vente** et le nombre de rotations par an.

Le stock étant valorisé au prix d'achat et le CA au prix de vente, les ventes sont ramenées à
leur coût d'achat via un taux de marge moyen paramétrable — sans quoi la couverture est
sous-estimée d'autant. Au-delà de la couverture cible (75 jours par défaut), la part
excédentaire est affichée comme **trésorerie immobilisée** : c'est le gisement de cash du
magasin, famille par famille.

## Point hebdo

Le point du lundi matin, rédigé à partir des chiffres saisis : semaine révolue (lundi →
dimanche) avec écart à l'objectif et comparaison N-1, fréquentation et transformation, meilleure
et plus décevante journée, cumul et atterrissage du mois, familles qui tirent et qui décrochent.

Deux boutons : **copier le texte** (pour un mail ou un message à l'équipe) et **imprimer / PDF**.
Rien n'est inventé : une semaine non saisie donne un brief vide.

> L'envoi automatique par mail n'est pas branché : il demanderait un service d'envoi et une clé
> à héberger côté serveur. En l'état, le brief est prêt en un clic, l'envoi reste manuel.

## Analyse par famille (Synthèse, Familles, Budget, Import)

Exercice comptable **du 1er avril au 31 mars**. Deux indicateurs suivis en parallèle, tels
qu'ils sortent de l'extraction BUT :

| Indicateur | Colonne du fichier source |
|---|---|
| Prise d'ordre (TTC) | `CATTC PRISE D'ORDRE` |
| Sortie (HT) | `CA HORS-TAXE SORTIE` |

### Filtres communs
- **Exercice** / **Comparé à** : n'importe quelle paire d'exercices présents en base.
- **Famille** : une famille ou toutes.
- **Univers** : meuble, décoration/textile, gros et petit électroménager, image-son-tech.
- **Périmètre** :
  - *Mois communs* — ne compare que les mois présents dans les deux exercices
    (comparaison honnête tant que l'exercice en cours n'est pas terminé) ;
  - *Exercice complet* — additionne tout ce qui est saisi, sans retraitement.

### Import mensuel

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

### Budgets prévisionnels par famille

Le budget d'une famille est construit ainsi :

1. **Base** = CA de l'exercice de référence (le dernier disponible avant l'exercice budgété).
   S'il est incomplet, il est annualisé via la saisonnalité observée sur les exercices complets.
2. **Tendance magasin** = moyenne pondérée des évolutions annuelles de la famille
   (l'exercice le plus récent pèse davantage), écrêtée à ±15 % par défaut.
3. **Hypothèse de marché** = croissance attendue de l'univers de la famille, en trois
   scénarios : prudent, central, favorable.
4. **Croissance retenue** = 60 % de tendance magasin + 40 % de marché (curseur ajustable).

Le budget total est ensuite réparti sur les 12 mois selon la saisonnalité du magasin.
Les hypothèses de marché sont modifiables dans l'écran **Budget** et à réviser chaque année
(IPEA/FNAEM pour le meuble, GfK/GIFAM pour l'électroménager). Le rattachement des familles aux
univers se règle dans `src/lib/market.ts`.

## Comptes et rôles

Deux façons d'entrer :

- **compte nominatif** (Supabase Auth) : e-mail et mot de passe personnels. Le rôle et les rayons
  sont lus dans la table `profiles`, et **chaque saisie est signée du nom de la personne**
  (« Dernière modification par… »).
- **poste partagé** : le mot de passe unique historique, conservé pour ne pas bloquer l'usage
  actuel. Il ouvre tout, mais ne trace rien.

| Rôle | Écrans | Saisie |
|---|---|---|
| `directeur` | tous | oui |
| `chef_rayon` | Aujourd'hui, Suivi, Synthèse, Familles, Stock, Point hebdo | oui |
| `vendeur` | Aujourd'hui, Familles | non |

Le prévisionnel porte le R.C.A.I et le compte d'exploitation : il reste réservé à la direction.
Un chef de rayon dont la fiche porte des `rayons` ne voit que ces familles, partout dans l'outil.

Créer un compte (depuis un poste de confiance, jamais depuis le navigateur) :

```bash
# Appliquer d'abord supabase/migrations/0002_profiles.sql dans le projet Supabase.
SUPABASE_URL=https://xmydzxguxesdauykajhr.supabase.co \
SUPABASE_SERVICE_KEY=<clé service_role> \
npm run user:create -- marie@exemple.fr "Marie Dupont" chef_rayon "LITERIE,SIEGE"
```

Le mot de passe initial est généré et affiché une seule fois.

## Stockage des données

Deux bases, chacune pour ce qu'elle portait déjà :

- **Firebase** (projet `cosy-conflans`) — suivi quotidien, prévisionnel et stock. La
  configuration est dans `src/lib/firebase.ts` ; elle est publique par construction, comme toute
  clé web Firebase, l'accès réel étant filtré par les règles Firestore.

  Le **cache local persistant** est activé : une saisie faite sans réseau est conservée sur le
  poste et repart vers la base dès que la connexion revient. Le bandeau affiche alors
  « Hors ligne · saisie conservée ». C'est ce qui rend l'outil utilisable en surface de vente.
- **Supabase** (projet `chiffre-conflans-familles`, réf. `xmydzxguxesdauykajhr`, Paris
  eu-west-3, table `monthly_sales`) — historique du chiffre par famille.

Sans variables Supabase, l'analyse par famille bascule sur l'historique livré avec
l'application (avril 2024 → août 2026) et le stockage local du navigateur. Pour activer la
base commune :

```bash
cp .env.example .env
# VITE_SUPABASE_URL=https://xmydzxguxesdauykajhr.supabase.co
# VITE_SUPABASE_ANON_KEY=<clé publiable, dashboard Supabase > Project Settings > API Keys>
```

Pour recharger l'historique de zéro dans un autre projet :

```bash
SUPABASE_URL=https://xxxx.supabase.co SUPABASE_KEY=<clé> npm run push:supabase
```

Le fichier `.env` n'est pas versionné ; en production, `.env.production` est lu au moment du
build.

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

`wrangler.toml` déclare `pages_build_output_dir = "dist"`, `.nvmrc` fixe Node 22 et
`public/_redirects` renvoie toutes les URL vers `index.html`. **Le champ `name` de
`wrangler.toml` doit être exactement le nom du projet Pages branché sur ce dépôt**
(ici `famille-conflans`), sinon le déploiement échoue.

Les variables Supabase sont versionnées dans `.env.production`, que Vite lit pendant la build
de production : Cloudflare les reprend automatiquement. Elles ne contiennent que la clé
publiable — la clé de service ne doit jamais y figurer. Pour pointer vers un autre projet
Supabase : modifier `.env.production`, ou déclarer les mêmes variables dans *Settings ›
Variables and Secrets* du projet Pages (elles prennent alors le dessus). Dans les deux cas
elles sont lues **au build** : après modification, relancer un déploiement.

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
src/data/n1.json      historique quotidien N-1 (CA, marge, fréquentation)
src/lib/              session, firebase, suivi, useMonth, previsionnel, crosslink, alerts,
                      brief, stock, fiscal, parse, analytics, budget, market, store
src/components/       Aujourd'hui / Suivi / Prévisionnel / Synthèse / Familles / Budget /
                      Stock / Point hebdo / Import
```

## Impression et PDF

Les écrans Suivi, Prévisionnel, Stock et Point hebdo ont un bouton **Imprimer / PDF** : la mise
en page d'impression masque la navigation et les contrôles, repasse en couleurs claires même
si l'écran est en thème sombre, et évite de couper les cartes entre deux pages. « Enregistrer
au format PDF » dans la fenêtre d'impression du navigateur produit le document.

## Sécurité

Le mot de passe du poste partagé protège l'accès à l'interface, il ne chiffre pas les données,
et **il se lit dans le code servi au navigateur** (Ctrl+U) : c'est un verrou d'usage pour un
outil interne, pas un contrôle d'accès. Tant que l'outil reste au bureau, cela passe ; dès que
l'accès s'élargit, il faut basculer sur les comptes nominatifs et, dans la foulée :

- passer les policies Supabase de `anon` à `authenticated` ;
- resserrer les règles Firestore sur les utilisateurs authentifiés ;
- retirer le mot de passe partagé de `src/lib/auth.ts`.
