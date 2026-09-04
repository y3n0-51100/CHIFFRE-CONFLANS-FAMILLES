/** Export CSV séparé par points-virgules, décimales à la française : ouvrable direct dans Excel. */
export function downloadCsv(filename: string, headers: string[], rows: (string | number | null)[][]): void {
  const cell = (v: string | number | null): string => {
    if (v === null || v === undefined) return '';
    if (typeof v === 'number') return Number.isFinite(v) ? v.toFixed(2).replace('.', ',') : '';
    return /[";\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
  };
  const body = [headers, ...rows].map((r) => r.map(cell).join(';')).join('\r\n');
  // BOM UTF-8 pour qu'Excel garde les accents.
  const blob = new Blob(['﻿' + body], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
