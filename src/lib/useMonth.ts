/**
 * Chargement, calcul et enregistrement d'un mois de suivi.
 * Partagé par l'écran « Aujourd'hui » et par le suivi détaillé, pour que les
 * deux lisent exactement les mêmes chiffres et écrivent au même endroit.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { COLLECTION_SUIVI, db, type SyncState } from './firebase.ts';
import { computeLanding, computeMonth, docId, emptyMonth, type DayEntry, type MonthData } from './suivi.ts';
import { stamp, type Session } from './session.ts';

/** Délai avant écriture : la saisie au clavier ne déclenche pas un appel par touche. */
const SAVE_DELAY = 600;

export function useMonth(year: number, month: number, session: Session) {
  const [data, setData] = useState<MonthData>(emptyMonth);
  const [sync, setSync] = useState<SyncState>('loading');
  const timer = useRef<number | null>(null);
  const monthKey = docId(year, month);

  useEffect(() => {
    let alive = true;
    setSync('loading');
    getDoc(doc(db, COLLECTION_SUIVI, monthKey))
      .then((snap) => {
        if (!alive) return;
        setData(snap.exists() ? { ...emptyMonth(), ...(snap.data() as MonthData) } : emptyMonth());
        // `fromCache` sans réseau : les chiffres affichés viennent du poste.
        setSync(snap.metadata.fromCache && !navigator.onLine ? 'offline' : 'ok');
      })
      .catch(() => {
        if (!alive) return;
        setData(emptyMonth());
        setSync('error');
      });
    return () => { alive = false; };
  }, [monthKey]);

  /** Enregistre le mois après un court silence de saisie, signé de son auteur. */
  const save = (next: MonthData) => {
    setData(next);
    setSync('saving');
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      const payload = { ...next, ...stamp(session) };
      setDoc(doc(db, COLLECTION_SUIVI, monthKey), payload)
        .then(() => setSync(navigator.onLine ? 'ok' : 'offline'))
        .catch(() => setSync(navigator.onLine ? 'error' : 'offline'));
      // Hors ligne, Firestore ne résout la promesse qu'au retour du réseau :
      // la saisie est pourtant déjà acquise localement, on le dit tout de suite.
      if (!navigator.onLine) setSync('offline');
    }, SAVE_DELAY);
  };

  /** Écrit une valeur d'un jour ; une valeur vidée efface la case. */
  const setDay = (key: string, field: keyof DayEntry, value: number | null) => {
    const days = { ...data.days };
    const entry: DayEntry = { ...(days[key] ?? {}) };
    if (value === null) delete entry[field];
    else entry[field] = value;
    if (Object.keys(entry).length === 0) delete days[key];
    else days[key] = entry;
    save({ ...data, days });
  };

  const computed = useMemo(() => {
    const m = computeMonth(year, month, data);
    return { ...m, landing: computeLanding(m.totals, m.objCA) };
  }, [year, month, data]);

  return { data, sync, save, setDay, monthKey, ...computed };
}
