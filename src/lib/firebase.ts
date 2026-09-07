/**
 * Accès Firestore des écrans d'exploitation : suivi quotidien (`suiviCaMarge`),
 * prévisionnel (`previsionnel/magasin_275`) et stock par famille (`stocks/magasin_275`).
 *
 * Le cache local persistant est activé : une saisie faite dans une zone sans réseau
 * est conservée sur le poste et repart vers la base dès que la connexion revient.
 * C'est ce qui rend l'outil utilisable en surface de vente.
 *
 * La configuration ci-dessous est publique par construction (elle vit de toute façon
 * dans le bundle servi au navigateur) : l'accès réel est filtré par les règles
 * Firestore et par l'authentification de l'application.
 */
import { initializeApp } from 'firebase/app';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB1PNvmmnZZ2DibHdKjluG64gbYUTcAm_I',
  authDomain: 'cosy-conflans.firebaseapp.com',
  projectId: 'cosy-conflans',
  storageBucket: 'cosy-conflans.firebasestorage.app',
  messagingSenderId: '701291286359',
  appId: '1:701291286359:web:5c7b1b236d7e90ea0bf812',
};

export const db = initializeFirestore(initializeApp(firebaseConfig), {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export const COLLECTION_SUIVI = 'suiviCaMarge';
export const COLLECTION_PREV = 'previsionnel';
export const COLLECTION_STOCK = 'stocks';
export const DOC_MAGASIN = 'magasin_275';

/** État de la liaison Firestore, affiché dans le bandeau des écrans concernés. */
export type SyncState = 'loading' | 'ok' | 'saving' | 'error' | 'offline';

export const syncLabel = (s: SyncState): string =>
  s === 'ok' ? 'Firebase · à jour'
  : s === 'saving' ? 'Enregistrement…'
  : s === 'offline' ? 'Hors ligne · saisie conservée'
  : s === 'error' ? 'Firebase · injoignable'
  : 'Firebase · connexion…';

export const syncTone = (s: SyncState): string =>
  s === 'ok' ? 'ok' : s === 'error' ? 'error' : s === 'offline' ? 'warn' : 'loading';
