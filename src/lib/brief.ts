/**
 * Point hebdomadaire rédigé automatiquement : ce qu'on dirait à l'équipe le lundi
 * matin, écrit à partir des chiffres saisis. Copiable dans un mail ou imprimable.
 */
import type { FamilyLine } from './analytics.ts';
import { fmtEur, fmtPct, fmtSignedEur } from './format.ts';
import { MONTH_NAMES, computeFreq, type DayRow, type Landing, type MonthTotals } from './suivi.ts';

export type BriefSection = { title: string; lines: string[] };
export type Brief = {
  title: string;
  subtitle: string;
  sections: BriefSection[];
};

const pct = (v: number | null): string => (v === null ? '—' : fmtPct(v));

/** Lundi de la semaine révolue (celle qui vient de se terminer). */
export function lastWeekRange(today = new Date()): { from: Date; to: Date } {
  const d = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  // getDay() : 0 = dimanche. On recule jusqu'au lundi de la semaine en cours, puis d'une semaine.
  const toMonday = (d.getDay() + 6) % 7;
  const monday = new Date(d);
  monday.setDate(d.getDate() - toMonday - 7);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return { from: monday, to: sunday };
}

const dateFr = (d: Date) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

/**
 * Assemble le brief. `week` = jours saisis de la semaine révolue, `totals`/`landing`
 * = mois en cours, `families` = comparaison d'exercices déjà filtrée par l'écran.
 */
export function buildBrief(
  week: DayRow[],
  range: { from: Date; to: Date },
  totals: MonthTotals,
  landing: Landing,
  objCA: number,
  objMarge: number,
  families: FamilyLine[],
  monthLabel: string,
  author: string,
): Brief {
  const sections: BriefSection[] = [];

  // ── Semaine écoulée ────────────────────────────────────────────────
  const ca = week.reduce((s, d) => s + (d.realCA ?? 0), 0);
  const marge = week.reduce((s, d) => s + (d.realMarge ?? 0), 0);
  const objSem = week.reduce((s, d) => s + d.objDayCA, 0);
  const n1 = week.reduce((s, d) => s + d.n1ca, 0);
  const visiteurs = week.reduce((s, d) => s + (d.visiteurs ?? 0), 0);
  const tickets = week.reduce((s, d) => s + (d.tickets ?? 0), 0);
  const n1freq = week.reduce((s, d) => s + d.n1freq, 0);
  const freq = computeFreq(ca, tickets, visiteurs, n1, n1freq);

  const semaine: string[] = [];
  if (week.length === 0) {
    semaine.push('Aucune journée saisie sur la semaine : rien à commenter tant que les chiffres ne sont pas rentrés.');
  } else {
    const ecart = objSem > 0 ? ca - objSem : null;
    const evol = n1 > 0 ? ((ca - n1) / n1) * 100 : null;
    semaine.push(
      `CA de la semaine : ${fmtEur(ca)}${objSem > 0 ? ` pour un objectif de ${fmtEur(objSem)}` : ''}` +
      (ecart !== null ? `, soit ${fmtSignedEur(ecart)}.` : '.'),
    );
    if (evol !== null) {
      semaine.push(
        `Face à la même semaine l'an dernier (${fmtEur(n1)}) : ${pct(evol)}` +
        (evol >= 0 ? ', la dynamique est bonne.' : ', il faut reprendre du terrain.'),
      );
    }
    if (marge > 0) {
      const taux = (marge / ca) * 100;
      const cible = objCA > 0 && objMarge > 0 ? (objMarge / objCA) * 100 : null;
      semaine.push(
        `Marge dégagée : ${fmtEur(marge)}, soit ${taux.toFixed(1).replace('.', ',')} % de taux` +
        (cible !== null ? ` (cible ${cible.toFixed(1).replace('.', ',')} %).` : '.'),
      );
    }
    if (freq.visiteurs !== null) {
      semaine.push(
        `Fréquentation : ${freq.visiteurs} visiteurs` +
        (freq.indice !== null ? ` (${pct(freq.indice)} vs N-1)` : '') +
        (freq.transfo !== null ? `, ${freq.transfo.toFixed(1).replace('.', ',')} % de transformation` : '') +
        (freq.panier !== null ? `, panier moyen ${fmtEur(freq.panier)}.` : '.'),
      );
      if (freq.indice !== null && freq.caParVisiteur !== null && freq.caParVisiteurN1 !== null) {
        const perf = ((freq.caParVisiteur - freq.caParVisiteurN1) / freq.caParVisiteurN1) * 100;
        semaine.push(
          perf >= 0 && freq.indice < 0
            ? `Moins de monde, mais mieux vendu : ${fmtEur(freq.caParVisiteur)} par visiteur, ${pct(perf)} vs N-1.`
            : perf < 0 && freq.indice >= 0
              ? `Le trafic est là, la vente ne suit pas : ${fmtEur(freq.caParVisiteur)} par visiteur, ${pct(perf)} vs N-1.`
              : `CA par visiteur : ${fmtEur(freq.caParVisiteur)}, ${pct(perf)} vs N-1.`,
        );
      }
    }
    /** « le 3 » ne suffit pas quand la semaine chevauche deux mois. */
    const jour = (d: DayRow) => {
      const mois = Number(d.key.slice(5, 7));
      return `${d.day} ${MONTH_NAMES[mois - 1].toLowerCase()}`;
    };
    const best = [...week].sort((a, b) => (b.realCA ?? 0) - (a.realCA ?? 0))[0];
    const worst = [...week].sort((a, b) => ((a.realCA ?? 0) - a.objDayCA) - ((b.realCA ?? 0) - b.objDayCA))[0];
    if (best && worst && best.key !== worst.key) {
      semaine.push(
        `Meilleure journée : le ${jour(best)} avec ${fmtEur(best.realCA)}. ` +
        `La plus décevante : le ${jour(worst)}, ${fmtSignedEur((worst.realCA ?? 0) - worst.objDayCA)} vs objectif.`,
      );
    }
  }
  sections.push({ title: `Semaine du ${dateFr(range.from)} au ${dateFr(range.to)}`, lines: semaine });

  // ── Mois en cours ──────────────────────────────────────────────────
  const mois: string[] = [];
  mois.push(
    `Cumul ${monthLabel} : ${fmtEur(totals.cumCA)} sur ${totals.filledDays} jours saisis` +
    (objCA > 0 ? `, soit ${((totals.cumCA / objCA) * 100).toFixed(1).replace('.', ',')} % de l'objectif.` : '.'),
  );
  if (totals.n1CAFilled > 0) {
    const evol = ((totals.cumCA - totals.n1CAFilled) / totals.n1CAFilled) * 100;
    mois.push(`À périmètre de jours identique, l'an dernier faisait ${fmtEur(totals.n1CAFilled)} : ${pct(evol)}.`);
  }
  if (landing.reliable && landing.ca !== null) {
    mois.push(
      `Atterrissage projeté : ${fmtEur(landing.ca)}` +
      (landing.gapCA !== null ? `, soit ${fmtSignedEur(landing.gapCA)} vs objectif.` : '.') +
      (landing.perDay !== null && landing.daysLeft > 0
        ? ` Pour tenir l'objectif : ${fmtEur(landing.perDay)} par jour sur ${landing.daysLeft} jours.`
        : ''),
    );
  } else {
    mois.push('Trop peu de jours saisis pour projeter une fin de mois fiable.');
  }
  sections.push({ title: 'Où en est le mois', lines: mois });

  // ── Familles ───────────────────────────────────────────────────────
  const moved = families.filter((f) => f.compare > 0 && f.pct !== null);
  const up = [...moved].sort((a, b) => b.delta - a.delta).slice(0, 3);
  const down = [...moved].sort((a, b) => a.delta - b.delta).slice(0, 3);
  const fam: string[] = [];
  if (up.length) {
    fam.push('Ça tire : ' + up.map((f) => `${f.family} (${fmtSignedEur(f.delta)}, ${pct(f.pct)})`).join(' · ') + '.');
  }
  if (down.length) {
    fam.push('Ça décroche : ' + down.map((f) => `${f.family} (${fmtSignedEur(f.delta)}, ${pct(f.pct)})`).join(' · ') + '.');
  }
  const top3 = families.slice(0, 3);
  if (top3.length === 3) {
    fam.push(
      `${top3.map((f) => f.family).join(', ')} concentrent ` +
      `${top3.reduce((s, f) => s + f.share, 0).toFixed(0)} % du chiffre : c'est là que se joue l'exercice.`,
    );
  }
  if (fam.length) sections.push({ title: 'Familles', lines: fam });

  return {
    title: 'Point hebdomadaire — BUT Conflans',
    subtitle: `Établi le ${new Date().toLocaleDateString('fr-FR', { dateStyle: 'long' })} par ${author}`,
    sections,
  };
}

/** Version texte, pour coller dans un mail ou un message à l'équipe. */
export function briefToText(brief: Brief): string {
  return [
    brief.title,
    brief.subtitle,
    '',
    ...brief.sections.flatMap((s) => [s.title.toUpperCase(), ...s.lines.map((l) => `- ${l}`), '']),
  ].join('\n');
}
