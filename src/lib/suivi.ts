/**
 * Suivi quotidien du CA, de la marge et de la fréquentation sur un mois calendaire.
 *
 * L'objectif mensuel est réparti jour par jour selon le poids du même jour l'an
 * dernier. « L'an dernier » est décalé de 364 jours (52 semaines exactement) et
 * non d'un an : on compare ainsi un samedi à un samedi, ce qui est le seul
 * rapprochement qui ait un sens dans le commerce.
 */
import N1 from '../data/n1.json';

/** `freq` de l'export d'origine : entrées porte du jour (fréquentation, pas tickets). */
export type N1Day = { ca: number; marge: number; freq: number };
export type DayEntry = { ca?: number; marge?: number; tickets?: number; visiteurs?: number };
export type MonthData = {
  objCA: number;
  objMarge: number;
  days: Record<string, DayEntry>;
  /** Traçabilité : qui a enregistré en dernier, et quand. */
  updatedBy?: string;
  updatedAt?: string;
};

export const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
export const DAY_NAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

/** 52 semaines pleines : le jour N-1 tombe sur le même jour de semaine. */
const OFFSET_DAYS = 364;
const DATA_N1 = N1 as Record<string, N1Day>;

export const emptyMonth = (): MonthData => ({ objCA: 0, objMarge: 0, days: {} });

/** Identifiant du document Firestore d'un mois : `2026_04`. */
export const docId = (year: number, month: number): string =>
  `${year}_${String(month).padStart(2, '0')}`;

export const dateStr = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export const daysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate();

function addDays(d: Date, n: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export const getN1Data = (date: Date): N1Day | null => DATA_N1[dateStr(addDays(date, -OFFSET_DAYS))] ?? null;

/** Total N-1 du mois, base de la répartition journalière de l'objectif. */
export function computeN1MonthTotal(year: number, month: number): { ca: number; marge: number } {
  let ca = 0;
  let marge = 0;
  for (let d = 1; d <= daysInMonth(year, month); d++) {
    const n1 = getN1Data(new Date(year, month - 1, d));
    if (n1) {
      ca += n1.ca;
      marge += n1.marge;
    }
  }
  return { ca, marge };
}

export type DayRow = {
  type: 'day';
  day: number;
  dow: number;
  key: string;
  n1ca: number;
  n1marge: number;
  n1freq: number;
  weight: number;
  weightMarge: number;
  objDayCA: number;
  objDayMarge: number;
  realCA: number | null;
  realMarge: number | null;
  tickets: number | null;
  visiteurs: number | null;
};

export type WeekRow = {
  type: 'week';
  num: number;
  ca: number;
  marge: number;
  objCA: number;
  objMarge: number;
};

export type MonthTotals = {
  cumCA: number;
  cumMarge: number;
  cumObjCA: number;
  cumObjMarge: number;
  /** N-1 du mois entier : sert à la répartition, pas à la comparaison. */
  n1CA: number;
  n1Marge: number;
  /** N-1 des seuls jours saisis : la seule comparaison honnête en cours de mois. */
  n1CAFilled: number;
  n1MargeFilled: number;
  n1FreqFilled: number;
  cumTickets: number;
  cumVisiteurs: number;
  filledDays: number;
  totalDays: number;
  /** Part du mois déjà couverte, en poids N-1 (0 → 1). */
  coverage: number;
};

/**
 * Construit les lignes du tableau (jours + sous-totaux hebdomadaires) et les
 * cumuls du mois. Une semaine est close le lundi, comme dans l'outil d'origine.
 */
export function computeMonth(year: number, month: number, data: MonthData) {
  const objCA = data.objCA || 0;
  const objMarge = data.objMarge || 0;
  const n1Total = computeN1MonthTotal(year, month);
  const totalDays = daysInMonth(year, month);
  const rows: (DayRow | WeekRow)[] = [];

  let weekNum = 0;
  let wCA = 0, wMarge = 0, wObjCA = 0, wObjMarge = 0;
  let coveredWeight = 0;
  const totals: MonthTotals = {
    cumCA: 0, cumMarge: 0, cumObjCA: 0, cumObjMarge: 0,
    n1CA: 0, n1Marge: 0, n1CAFilled: 0, n1MargeFilled: 0, n1FreqFilled: 0,
    cumTickets: 0, cumVisiteurs: 0, filledDays: 0, totalDays, coverage: 0,
  };

  const closeWeek = () => {
    rows.push({ type: 'week', num: ++weekNum, ca: wCA, marge: wMarge, objCA: wObjCA, objMarge: wObjMarge });
    wCA = 0; wMarge = 0; wObjCA = 0; wObjMarge = 0;
  };

  for (let d = 1; d <= totalDays; d++) {
    const date = new Date(year, month - 1, d);
    const key = dateStr(date);
    const n1 = getN1Data(date);
    const n1ca = n1 ? n1.ca : 0;
    const n1mg = n1 ? n1.marge : 0;
    const n1freq = n1 ? n1.freq : 0;
    const weight = n1Total.ca > 0 ? n1ca / n1Total.ca : 0;
    const weightMarge = n1Total.marge > 0 ? n1mg / n1Total.marge : 0;
    const objDayCA = weight * objCA;
    // La marge suit sa propre saisonnalité si elle est connue, sinon celle du CA.
    const objDayMarge = n1Total.marge > 0 ? weightMarge * objMarge : weight * objMarge;

    const saved = data.days?.[key] ?? {};
    const realCA = typeof saved.ca === 'number' ? saved.ca : null;
    const realMarge = typeof saved.marge === 'number' ? saved.marge : null;
    const tickets = typeof saved.tickets === 'number' ? saved.tickets : null;
    const visiteurs = typeof saved.visiteurs === 'number' ? saved.visiteurs : null;

    if (date.getDay() === 1 && d > 1) closeWeek();

    rows.push({
      type: 'day', day: d, dow: date.getDay(), key,
      n1ca, n1marge: n1mg, n1freq, weight, weightMarge,
      objDayCA, objDayMarge, realCA, realMarge, tickets, visiteurs,
    });

    if (realCA !== null) {
      wCA += realCA;
      totals.cumCA += realCA;
      totals.filledDays++;
      // Périmètre comparable : on n'additionne le N-1 que des jours réellement saisis.
      totals.n1CAFilled += n1ca;
      totals.n1MargeFilled += n1mg;
      totals.n1FreqFilled += n1freq;
      coveredWeight += weight;
    }
    if (realMarge !== null) { wMarge += realMarge; totals.cumMarge += realMarge; }
    if (tickets !== null) totals.cumTickets += tickets;
    if (visiteurs !== null) totals.cumVisiteurs += visiteurs;
    wObjCA += objDayCA; wObjMarge += objDayMarge;
    totals.cumObjCA += objDayCA; totals.cumObjMarge += objDayMarge;
    totals.n1CA += n1ca; totals.n1Marge += n1mg;

    if (d === totalDays) closeWeek();
  }

  // Sans historique N-1 exploitable, on retombe sur un prorata de jours.
  totals.coverage = n1Total.ca > 0 ? coveredWeight : totals.filledDays / totalDays;

  return { rows, totals, objCA, objMarge };
}

export type Landing = {
  /** Projection de clôture du mois au rythme constaté. */
  ca: number | null;
  marge: number | null;
  /** Écart projeté à l'objectif. */
  gapCA: number | null;
  /** Part du mois couverte par les jours saisis (0 → 1). */
  coverage: number;
  /** Sous 15 % de mois écoulé, la projection ne veut rien dire. */
  reliable: boolean;
  /** Reste à faire pour tenir l'objectif, et moyenne quotidienne correspondante. */
  restCA: number | null;
  perDay: number | null;
  daysLeft: number;
};

/**
 * Atterrissage du mois : le réalisé est ramené au mois complet via la
 * saisonnalité N-1 des jours déjà passés. Répond à « où va-t-on finir ? »,
 * ce qu'un simple cumul ne dit pas.
 */
export function computeLanding(totals: MonthTotals, objCA: number): Landing {
  const daysLeft = totals.totalDays - totals.filledDays;
  const reliable = totals.coverage >= 0.15 && totals.filledDays > 0;
  const ca = reliable ? totals.cumCA / totals.coverage : null;
  const marge = reliable && totals.cumMarge > 0 ? totals.cumMarge / totals.coverage : null;
  const restCA = objCA > 0 ? objCA - totals.cumCA : null;
  return {
    ca,
    marge,
    gapCA: ca !== null && objCA > 0 ? ca - objCA : null,
    coverage: totals.coverage,
    reliable,
    restCA,
    perDay: restCA !== null && daysLeft > 0 ? restCA / daysLeft : null,
    daysLeft,
  };
}

export type FreqStats = {
  visiteurs: number | null;
  visiteursN1: number | null;
  /** Indice de fréquentation vs N-1, en %. */
  indice: number | null;
  tickets: number | null;
  /** Tickets / visiteurs, en %. */
  transfo: number | null;
  /** CA / tickets. */
  panier: number | null;
  caParVisiteur: number | null;
  caParVisiteurN1: number | null;
};

/**
 * Lecture d'une journée ou d'un cumul : moins de monde, ou moins bien vendu ?
 * Le N-1 vient du compteur de fréquentation de l'export d'origine (`freq`).
 */
export function computeFreq(ca: number, tickets: number, visiteurs: number, n1ca: number, n1freq: number): FreqStats {
  return {
    visiteurs: visiteurs > 0 ? visiteurs : null,
    visiteursN1: n1freq > 0 ? n1freq : null,
    indice: visiteurs > 0 && n1freq > 0 ? ((visiteurs - n1freq) / n1freq) * 100 : null,
    tickets: tickets > 0 ? tickets : null,
    transfo: tickets > 0 && visiteurs > 0 ? (tickets / visiteurs) * 100 : null,
    panier: tickets > 0 && ca > 0 ? ca / tickets : null,
    caParVisiteur: visiteurs > 0 && ca > 0 ? ca / visiteurs : null,
    caParVisiteurN1: n1freq > 0 && n1ca > 0 ? n1ca / n1freq : null,
  };
}

/** Les n derniers jours saisis, du plus récent au plus ancien. */
export function lastFilledDays(rows: (DayRow | WeekRow)[], n: number): DayRow[] {
  return rows.filter((r): r is DayRow => r.type === 'day' && r.realCA !== null).slice(-n).reverse();
}

/** Ligne du jour demandé (ou null s'il n'appartient pas au mois calculé). */
export function findDay(rows: (DayRow | WeekRow)[], key: string): DayRow | null {
  return rows.find((r): r is DayRow => r.type === 'day' && r.key === key) ?? null;
}
