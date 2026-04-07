export interface ExportColumn {
  header: string;
  key: string;
  format?: (value: unknown) => string;
}

function escapeCsvCell(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function exportToCsv(columns: ExportColumn[], rows: Record<string, unknown>[]): string {
  const header = columns.map((c) => escapeCsvCell(c.header)).join(",");
  const body = rows
    .map((row) =>
      columns
        .map((col) => {
          const val = row[col.key];
          const formatted = col.format ? col.format(val) : val;
          return escapeCsvCell(formatted);
        })
        .join(",")
    )
    .join("\n");
  return `${header}\n${body}`;
}

export function exportToPdf(
  title: string,
  columns: ExportColumn[],
  rows: Record<string, unknown>[]
): string {
  const thCells = columns.map((c) => `<th>${c.header}</th>`).join("");
  const bodyRows = rows
    .map((row) => {
      const cells = columns
        .map((col) => {
          const val = row[col.key];
          const formatted = col.format ? col.format(val) : (val ?? "");
          return `<td>${formatted}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  body { font-family: Arial, sans-serif; font-size: 12px; margin: 32px; color: #111; }
  h1 { font-size: 18px; color: #1E40AF; margin-bottom: 8px; }
  p.meta { color: #64748b; font-size: 11px; margin-bottom: 20px; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #1E40AF; color: #fff; padding: 8px 12px; text-align: left; font-size: 11px; }
  td { padding: 7px 12px; border-bottom: 1px solid #e2e8f0; font-size: 11px; }
  tr:nth-child(even) td { background: #f8fafc; }
  .footer { margin-top: 24px; font-size: 10px; color: #94a3b8; text-align: center; }
  @media print { body { margin: 0; } }
</style>
</head>
<body>
  <h1>${title}</h1>
  <p class="meta">Dakar Sport — Exporté le ${new Date().toLocaleDateString("fr-SN")}</p>
  <table>
    <thead><tr>${thCells}</tr></thead>
    <tbody>${bodyRows}</tbody>
  </table>
  <div class="footer">Dakar Sport — Avenue G. Pompidou, Dakar, Sénégal</div>
</body>
</html>`;
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPdf(filename: string, html: string): void {
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) win.onload = () => win.print();
  URL.revokeObjectURL(url);
}
