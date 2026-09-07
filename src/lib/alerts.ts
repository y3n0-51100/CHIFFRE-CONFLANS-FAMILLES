/**
 * Détection des décrochages. L'outil ne se contente plus d'attendre qu'on vienne
 * regarder : il dit ce qui ne va pas, sur le mois en cours comme sur les familles.
 */
import type { FamilyLine } from './analytics.ts';
import { fmtEur, fmtPct, fmtSignedEur } from './format.ts';
import { DAY_NAMES, type DayRow, type Landing, type MonthTotals, type WeekRow } from './suivi.ts';

export type Alert = {
  tone: 'down' | 'warn' | 'up';
  title: string;
  detail: string;
};

/** Jours consécutifs, du plus récent au plus ancien, terminés sous l'objectif du jour. */
function streakUnder(rows: (DayRow | WeekRow)[]): DayRow[] {
  const filled = rows.filter((r): r is DayRow => r.type === 'day' && r.realCA !== null);
  const out: DayRow[] = [];
  for (let i = filled.length - 1; i >= 0; i--) {
    const d = filled[i];
    if (d.objDayCA > 0 && (d.realCA ?? 0) < d.objDayCA) out.push(d);
    else break;
  }
  return out;
}

/**
 * Alertes du mois en cours : série de journées manquées, atterrissage sous
 * l'objectif, marge qui s'érode, fréquentation en repli, saisie en retard.
 */
export function monthAlerts(
  rows: (DayRow | WeekRow)[],
  totals: MonthTotals,
  landing: Landing,
  objCA: number,
  objMarge: number,
  today = new Date(),
): Alert[] {
  const out: Alert[] = [];

  const streak = streakUnder(rows);
  if (streak.length >= 3) {
    const manque = streak.reduce((s, d) => s + (d.objDayCA - (d.realCA ?? 0)), 0);
    out.push({
      tone: 'down',
      title: `${streak.length} jours d'affilée sous l'objectif`,
      detail: `Depuis ${DAY_NAMES[streak[streak.length - 1].dow].toLowerCase()} ${streak[streak.length - 1].day}, il manque ${fmtEur(manque)} cumulés.`,
    });
  }

  if (landing.reliable && landing.gapCA !== null && objCA > 0) {
    const ecart = (landing.gapCA / objCA) * 100;
    if (ecart <= -3) {
      out.push({
        tone: ecart <= -8 ? 'down' : 'warn',
        title: `Atterrissage à ${fmtEur(landing.ca)}`,
        detail: `Au rythme actuel, le mois finit ${fmtSignedEur(landing.gapCA)} sous l'objectif (${fmtPct(ecart)}).` +
          (landing.perDay !== null ? ` Il faut tenir ${fmtEur(landing.perDay)} par jour sur les ${landing.daysLeft} jours restants.` : ''),
      });
    } else if (ecart >= 3) {
      out.push({
        tone: 'up',
        title: `Atterrissage à ${fmtEur(landing.ca)}`,
        detail: `Au rythme actuel, l'objectif est dépassé de ${fmtEur(landing.gapCA)}.`,
      });
    }
  }

  if (totals.cumCA > 0 && totals.cumMarge > 0 && objCA > 0 && objMarge > 0) {
    const taux = (totals.cumMarge / totals.cumCA) * 100;
    const cible = (objMarge / objCA) * 100;
    if (taux < cible - 1.5) {
      out.push({
        tone: 'warn',
        title: `Taux de marge à ${taux.toFixed(1).replace('.', ',')} %`,
        detail: `La cible du mois est de ${cible.toFixed(1).replace('.', ',')} %. ` +
          `Chaque point perdu coûte ${fmtEur(totals.cumCA / 100)} sur le réalisé du mois.`,
      });
    }
  }

  if (totals.cumVisiteurs > 0 && totals.n1FreqFilled > 0) {
    const indice = ((totals.cumVisiteurs - totals.n1FreqFilled) / totals.n1FreqFilled) * 100;
    if (indice <= -10) {
      out.push({
        tone: 'warn',
        title: `Fréquentation en repli de ${Math.abs(indice).toFixed(0)} %`,
        detail: `${totals.cumVisiteurs} visiteurs sur les jours saisis, contre ${Math.round(totals.n1FreqFilled)} l'an dernier. ` +
          `Le problème est devant la porte, pas seulement en rayon.`,
      });
    }
  }

  // Saisie en retard : sans données, tout le reste de l'écran est faux.
  const filled = rows.filter((r): r is DayRow => r.type === 'day' && r.realCA !== null);
  const last = filled[filled.length - 1];
  const firstDay = rows.find((r): r is DayRow => r.type === 'day');
  if (last && firstDay) {
    const lastDate = new Date(today.getFullYear(), today.getMonth(), last.day);
    const sameMonth = today.getDate() >= last.day;
    const retard = Math.floor((today.getTime() - lastDate.getTime()) / 86400000) - 1;
    if (sameMonth && retard >= 2) {
      out.push({
        tone: 'warn',
        title: `Saisie en retard de ${retard} jours`,
        detail: `Dernier jour renseigné : le ${last.day}. Les projections ne valent que ce que vaut la saisie.`,
      });
    }
  }

  return out;
}

/** Familles qui décrochent nettement, et celles qui tirent le magasin. */
export function familyAlerts(lines: FamilyLine[], minDelta = 3000, seuilPct = 20): Alert[] {
  const out: Alert[] = [];
  const moved = lines.filter((l) => l.compare > 0 && l.pct !== null);

  moved
    .filter((l) => (l.pct as number) <= -seuilPct && l.compare - l.current >= minDelta)
    .sort((a, b) => a.delta - b.delta)
    .slice(0, 3)
    .forEach((l) =>
      out.push({
        tone: 'down',
        title: `${l.family} : ${fmtPct(l.pct)}`,
        detail: `${fmtSignedEur(l.delta)} par rapport à l'exercice comparé, pour ${l.share.toFixed(1).replace('.', ',')} % du chiffre.`,
      }),
    );

  const best = [...moved].sort((a, b) => b.delta - a.delta)[0];
  if (best && best.delta >= minDelta) {
    out.push({
      tone: 'up',
      title: `${best.family} : ${fmtPct(best.pct)}`,
      detail: `${fmtSignedEur(best.delta)} : la plus forte progression du magasin sur la période.`,
    });
  }
  return out;
}
