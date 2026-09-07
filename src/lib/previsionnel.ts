/**
 * Prévisionnel de l'exercice : 12 périodes (P1 = avril) et 7 indicateurs suivis
 * face à un objectif annuel figé, avec recalibrage automatique des mois à venir.
 */

export type Mois = { code: string; label: string; abr: string };
export type Indicateur = {
  id: string;
  label: string;
  /** Les objectifs des mois non saisis sont réajustés pour tenir l'objectif annuel. */
  recalculable: boolean;
  /** Vrai si dépasser l'objectif est une bonne nouvelle (faux pour un stock). */
  ecartBon: boolean;
  /** Un stock est une photo à date : il ne se cumule pas sur l'exercice. */
  isStock: boolean;
  obj: number[];
};

export const MOIS: Mois[] = [
  { code: 'P1', label: 'Avril', abr: 'AVR' },
  { code: 'P2', label: 'Mai', abr: 'MAI' },
  { code: 'P3', label: 'Juin', abr: 'JUN' },
  { code: 'P4', label: 'Juillet', abr: 'JUL' },
  { code: 'P5', label: 'Août', abr: 'AOÛ' },
  { code: 'P6', label: 'Septembre', abr: 'SEP' },
  { code: 'P7', label: 'Octobre', abr: 'OCT' },
  { code: 'P8', label: 'Novembre', abr: 'NOV' },
  { code: 'P9', label: 'Décembre', abr: 'DÉC' },
  { code: 'P10', label: 'Janvier', abr: 'JAN' },
  { code: 'P11', label: 'Février', abr: 'FÉV' },
  { code: 'P12', label: 'Mars', abr: 'MAR' },
];

export const INDICATEURS: Indicateur[] = [
  { id: 'ca_po', label: 'CA PO TTC', recalculable: true, ecartBon: true, isStock: false,
    obj: [150000, 120000, 120000, 216000, 174000, 174000, 180000, 186000, 192000, 216000, 180000, 150000] },
  { id: 'ca_sortie', label: 'CA Sortie', recalculable: true, ecartBon: true, isStock: false,
    obj: [131250, 105000, 105000, 189000, 152250, 152250, 157500, 162750, 168000, 189000, 157500, 131250] },
  { id: 'mb_glo', label: 'MB Glo C.E.X', recalculable: true, ecartBon: true, isStock: false,
    obj: [48125, 40865.47, 38500, 66600, 53650, 55825, 57750, 59675, 61600, 63000, 57750, 48125] },
  { id: 'mb_prime', label: 'MB Prime', recalculable: true, ecartBon: true, isStock: false,
    obj: [46350, 41200, 47380, 66950, 50470, 56650, 55620, 60770, 47380, 72100, 41200, 53560] },
  { id: 'mb_deco', label: 'MB Déco PO', recalculable: true, ecartBon: true, isStock: false,
    obj: [1575, 1840, 2254, 3120, 2989, 2475, 2160, 2891, 4186, 5180, 1960, 2028] },
  { id: 'stocks', label: 'Stocks', recalculable: false, ecartBon: false, isStock: true,
    obj: [339743.05, 357954.95, 389999.82, 421739.08, 380000.15, 379999.70, 379999.60, 429999.55, 419999.95, 399999.54, 404779.01, 369999.92] },
  { id: 'rcai', label: 'R.C.A.I', recalculable: false, ecartBon: true, isStock: false,
    obj: [-3096.75, -20513.28, -29191.62, 15202.31, -6252.02, -14627.84, -3427.33, -4893.80, 123.39, -176.33, 2752.59, -8113.59] },
];

export type PrevState = {
  realises: Record<string, number>;
  commentaires: Record<string, string>;
  moisVerrouilles: string[];
  reseauMoyennes: Record<string, number>;
  modifTimestamps: Record<string, string>;
  /** Traçabilité : qui a enregistré en dernier, et quand. */
  updatedBy?: string;
  updatedAt?: string;
};

export const emptyPrevState = (): PrevState => ({
  realises: {}, commentaires: {}, moisVerrouilles: [], reseauMoyennes: {}, modifTimestamps: {},
});

export const cellKey = (moisCode: string, indId: string): string => `${moisCode}_${indId}`;

/** Objectifs recalibrés : ce qui reste à faire, réparti sur les mois non encore saisis. */
export function computeAdjusted(state: PrevState): Record<string, number> {
  const adj: Record<string, number> = {};
  INDICATEURS.forEach((ind) => {
    if (!ind.recalculable) return;
    const annualObj = ind.obj.reduce((a, b) => a + b, 0);
    let cumReal = 0;
    let lastIdx = -1;
    MOIS.forEach((m, i) => {
      const v = state.realises[cellKey(m.code, ind.id)];
      if (v !== undefined) { cumReal += Number(v); lastIdx = i; }
    });
    if (lastIdx === -1) return;
    const remaining = annualObj - cumReal;
    const future = MOIS.filter((m, i) => i > lastIdx && state.realises[cellKey(m.code, ind.id)] === undefined);
    const sumOrigFuture = future.reduce((acc, m) => acc + ind.obj[MOIS.indexOf(m)], 0);
    if (sumOrigFuture === 0) return;
    future.forEach((m) => {
      adj[cellKey(m.code, ind.id)] = ind.obj[MOIS.indexOf(m)] * (remaining / sumOrigFuture);
    });
  });
  return adj;
}

export type Objectif = { val: number; recalibre: boolean };

export function getObjectif(adj: Record<string, number>, moisCode: string, indId: string): Objectif {
  const key = cellKey(moisCode, indId);
  if (adj[key] !== undefined) return { val: adj[key], recalibre: true };
  const ind = INDICATEURS.find((i) => i.id === indId)!;
  return { val: ind.obj[MOIS.findIndex((m) => m.code === moisCode)], recalibre: false };
}

/** Cumul réalisé sur l'exercice pour un indicateur (les stocks ne se cumulent pas). */
export function cumulAnnuel(state: PrevState, ind: Indicateur): { real: number | null; obj: number } {
  const obj = ind.obj.reduce((a, b) => a + b, 0);
  let sum = 0;
  let has = false;
  MOIS.forEach((m) => {
    const v = state.realises[cellKey(m.code, ind.id)];
    if (v !== undefined) { sum += Number(v); has = true; }
  });
  return { real: has ? sum : null, obj };
}

/** Classe de couleur d'un écart, selon le sens favorable de l'indicateur. */
export function ecartClass(ecart: number | null, ind: Indicateur): '' | 'bon' | 'mauvais' {
  if (ecart === null || ecart === undefined) return '';
  return (ind.ecartBon ? ecart >= 0 : ecart <= 0) ? 'bon' : 'mauvais';
}
