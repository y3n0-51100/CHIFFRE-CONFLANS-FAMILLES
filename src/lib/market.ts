/**
 * Rattachement des familles du magasin à un univers de marché,
 * et hypothèses de croissance annuelle par univers (marché français).
 *
 * Ces hypothèses sont des ordres de grandeur prudents à réviser chaque année
 * (sources habituelles : IPEA/FNAEM pour le meuble, GfK/GIFAM pour l'électroménager
 * et les produits techniques). Elles sont modifiables directement dans l'écran Budget.
 */

export type Universe = 'MEUBLE' | 'DECO' | 'GEM' | 'PEM' | 'TECH' | 'AUTRE';

export const UNIVERSE_LABELS: Record<Universe, string> = {
  MEUBLE: 'Meuble',
  DECO: 'Décoration / Textile',
  GEM: 'Gros électroménager',
  PEM: 'Petit électroménager',
  TECH: 'Image, son & tech',
  AUTRE: 'Autre',
};

const MAP: Record<string, Universe> = {
  'ARMOIRE - DRESSING': 'MEUBLE',
  'BIBLIO - RANGEMENT': 'MEUBLE',
  BUREAU: 'MEUBLE',
  'CAC - LITS': 'MEUBLE',
  'CUISINE - BUFFET': 'MEUBLE',
  LITERIE: 'MEUBLE',
  'MEUBLES DE SEJOUR': 'MEUBLE',
  'PETIT MEUBLE SEJOUR': 'MEUBLE',
  'RANGEMENT MODULAIRE': 'MEUBLE',
  SIEGE: 'MEUBLE',
  'TABLE ET CHAISE': 'MEUBLE',
  OUTDOOR: 'MEUBLE',
  SDB: 'MEUBLE',
  UTILITAIRE: 'MEUBLE',

  LUMINAIRE: 'DECO',
  'OBJET DE DECORATION': 'DECO',
  TAPIS: 'DECO',
  'TEXTILE JOUR': 'DECO',
  'TEXTILE NUIT': 'DECO',

  CUISINIERE: 'GEM',
  'CUISSON ENCASTRABLE': 'GEM',
  FROID: 'GEM',
  LAVAGE: 'GEM',
  'ACCESSOIRES BLANC': 'GEM',

  'PEM - ASPI - AIR - FMO': 'PEM',

  TV: 'TECH',
  SON: 'TECH',
  TELEPHONIE: 'TECH',
  'NOUVELLES TECHNOLOGIES': 'TECH',
  'ACCESSOIRES BRUN': 'TECH',
};

export function universeOf(family: string): Universe {
  return MAP[family] ?? 'AUTRE';
}

export type Scenario = 'prudent' | 'base' | 'favorable';

export const SCENARIO_LABELS: Record<Scenario, string> = {
  prudent: 'Prudent',
  base: 'Central',
  favorable: 'Favorable',
};

/** Croissance de marché annuelle retenue par défaut, en %. */
export const DEFAULT_MARKET: Record<Universe, Record<Scenario, number>> = {
  MEUBLE: { prudent: -2.0, base: 0.0, favorable: 2.0 },
  DECO: { prudent: -2.5, base: -0.5, favorable: 1.5 },
  GEM: { prudent: -1.0, base: 1.0, favorable: 2.5 },
  PEM: { prudent: -0.5, base: 1.5, favorable: 3.0 },
  TECH: { prudent: -4.0, base: -1.5, favorable: 1.0 },
  AUTRE: { prudent: -2.0, base: 0.0, favorable: 2.0 },
};
