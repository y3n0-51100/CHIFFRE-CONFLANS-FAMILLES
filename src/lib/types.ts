// Types métier partagés par toute l'application.

/** Une ligne = un mois × une famille (rayon). */
export interface Row {
  /** Clé période au format YYYY-MM (ex: "2025-04"). */
  period: string;
  /** Libellé de la famille / rayon, normalisé en majuscules. */
  family: string;
  /** CA TTC en prise d'ordre. */
  ordre: number;
  /** CA HT en sortie (livré / facturé). */
  sortie: number;
}

/** Résultat de lecture d'un fichier mensuel. */
export interface ParsedFile {
  period: string;
  rows: Row[];
  /** Totaux lus dans la ligne "Somme :" du fichier, pour contrôle. */
  fileTotals: { ordre: number; sortie: number } | null;
  warnings: string[];
}

export type Metric = 'ordre' | 'sortie';

/** Exercice comptable : 1er avril N -> 31 mars N+1. Identifié par l'année de départ. */
export type FiscalYear = number;
