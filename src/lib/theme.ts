export type Theme = 'light' | 'dark';

const KEY = 'ccf.theme.v1';

/** Thème retenu : choix explicite de l'utilisateur, sinon préférence du système. */
export function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* stockage indisponible : on suit le système */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* rien à mémoriser */
  }
}
