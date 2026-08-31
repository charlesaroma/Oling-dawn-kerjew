import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

const COLUMNS = [
  { key: 'fullName', label: 'Full Name' },
  { key: 'category', label: 'Category' },
  { key: 'gender', label: 'Gender' },
  { key: 'age', label: 'Age' },
  { key: 'phone', label: 'Phone' },
  { key: 'location', label: 'Location' },
  { key: 'nin', label: 'NIN' },
  { key: 'passportNumber', label: 'Passport' },
  { key: 'registeredDate', label: 'Registered' },
];

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  const str = String(value ?? '');
  return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export function exportProfilesCSV(profiles, filename = 'odkhc-profiles.csv') {
  const header = COLUMNS.map((c) => c.label).join(',');
  const rows = profiles.map((p) => COLUMNS.map((c) => csvEscape(p[c.key])).join(','));
  const csv = [header, ...rows].join('\n');
  downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), filename);
}

export function exportProfilesPDF(profiles, filename = 'odkhc-profiles.pdf') {
  const doc = new jsPDF({ orientation: 'landscape' });
  doc.setFontSize(14);
  doc.text('Oling Dawn Kerjew Projects — Registered Profiles', 14, 14);
  autoTable(doc, {
    startY: 20,
    head: [COLUMNS.map((c) => c.label)],
    body: profiles.map((p) => COLUMNS.map((c) => String(p[c.key] ?? ''))),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [11, 20, 31] },
  });
  doc.save(filename);
}
