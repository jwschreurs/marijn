import { agendaItems, pageCopy, siteConfig, trainingen } from '@/data/site';

export type ContentOverrides = Record<string, string>;
export type ContentField = {
  id: string; group: string; label: string; value: string; multiline: boolean;
};
export type ContentSnapshot = {
  overrides: ContentOverrides; revision: number; updatedAt: string | null;
};
export const MAX_CONTENT_BYTES = 200_000;
export const MAX_TEXT_LENGTH = 5_000;
const defaults = { siteConfig, trainingen, agendaItems, copy: pageCopy };
const groups: Record<string, string> = {
  home: 'Homepage', about: 'Over mij', legacyAbout: 'Over Marijn (oude pagina)',
  mindfulness: 'Mindfulness', contact: 'Contact', agenda: 'Agenda — inleiding',
  trainingOverview: 'Trainingen — overzicht', trainingDetail: 'Trainingen — vaste teksten',
  registration: 'Inschrijven — inleiding', header: 'Menu en logo', footer: 'Voettekst',
  trainingCard: 'Trainingskaarten', inquiryForm: 'Contactformulier',
  registrationForm: 'Inschrijfformulier', metadata: 'Zoekresultaten',
};
const labels: Record<string, string> = {
  name: 'Naam', tagline: 'Ondertitel', email: 'E-mailadres', phone: 'Telefoon',
  kvk: 'KvK-nummer', btwId: 'BTW-id', agbCode: 'AGB-code', location: 'Locatie / werkgebied',
  intro: 'Introductie', title: 'Titel', duration: 'Duur', audience: 'Doelgroep',
  summary: 'Samenvatting', description: 'Beschrijving', highlights: 'Kenmerken',
  details: 'Toelichting', contentSections: 'Tekstblok', paragraphs: 'Alinea',
  closingParagraphs: 'Afsluitende alinea', items: 'Opsomming', text: 'Tekst',
  schedule: 'Planning', season: 'Periode', groups: 'Groep', meetings: 'Bijeenkomst',
  retreat: 'Stiltedag', label: 'Label', time: 'Tijd', date: 'Datum',
  investment: 'Investering', introduction: 'Inleiding', price: 'Prijs',
  taxNote: 'Btw-toelichting', includes: 'Inbegrepen', employerNote: 'Werkgeversvergoeding',
  reimbursementNote: 'Vergoeding', heading: 'Kop', paragraph: 'Alinea', item: 'Opsomming',
  link: 'Linktekst', button: 'Knoptekst', option: 'Keuze', question: 'Vraag',
  eyebrow: 'Boventitel', placeholder: 'Voorbeeld in invoerveld', alt: 'Afbeeldingsbeschrijving',
  accessibleLabel: 'Toegankelijk label', navigation: 'Menu-item', metadataTitle: 'Titel in zoekresultaten', metadataDescription: 'Beschrijving in zoekresultaten',
};
function editable(path: string[]) {
  return path.join('.') !== 'siteConfig.intro' && !path.includes('slug') && !path.includes('emphasizedPhrases');
}
function labelFor(part: string) {
  const match = part.match(/^([a-zA-Z]+)(\d+)$/);
  if (match) return (labels[match[1]] ?? match[1]) + ' ' + match[2];
  return /^\d+$/.test(part) ? String(Number(part) + 1) : labels[part] ?? part;
}
function describe(path: string[]) {
  if (path[0] === 'copy') return { group: groups[path[1]] ?? path[1], label: path.slice(2).map(labelFor).join(' · ') };
  if (path[0] === 'trainingen') return { group: 'Training — ' + trainingen[Number(path[1])].title, label: path.slice(2).map(labelFor).join(' · ') };
  if (path[0] === 'agendaItems') return { group: 'Agenda — item ' + (Number(path[1]) + 1), label: path.slice(2).map(labelFor).join(' · ') };
  return { group: 'Bedrijfs- en contactgegevens', label: path.slice(1).map(labelFor).join(' · ') };
}
const fields: ContentField[] = [];
function collect(value: unknown, path: string[] = []) {
  if (typeof value === 'string' && editable(path)) {
    const id = path.join('.');
    fields.push({ id, ...describe(path), value, multiline: value.length > 100 || /paragraph|description|summary|text\d|intro|Note/.test(id) });
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) collect(child, [...path, key]);
  }
}
collect(defaults);
const fieldById = new Map(fields.map(field => [field.id, field]));
export function getContentFields(overrides: ContentOverrides = {}): ContentField[] {
  return fields.map(field => ({ ...field, value: overrides[field.id] ?? field.value }));
}
export function parseOverrides(value: unknown, strict = true): ContentOverrides {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('De teksten hebben een ongeldig formaat.');
  if (new TextEncoder().encode(JSON.stringify(value)).length > MAX_CONTENT_BYTES) throw new Error('De teksten zijn samen te groot.');
  const result: ContentOverrides = {};
  for (const [id, text] of Object.entries(value)) {
    const field = fieldById.get(id);
    if (!field) {
      if (strict) throw new Error('Er is een onbekend tekstveld. Herlaad het beheer.');
      continue;
    }
    if (typeof text !== 'string' || !text.trim() || text.length > MAX_TEXT_LENGTH || text.includes('\u0000')) {
      throw new Error(field.label + ': vul een tekst in van maximaal ' + MAX_TEXT_LENGTH + ' tekens.');
    }
    if (id === 'siteConfig.email' && !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(text)) throw new Error('Vul een geldig contact-e-mailadres in.');
    if (id === 'siteConfig.phone' && !/^\+?[\d () .-]{6,30}$/.test(text)) throw new Error('Vul een geldig telefoonnummer in.');
    result[id] = text;
  }
  return result;
}
function applyText<T>(value: T, overrides: ContentOverrides, path: string[] = []): T {
  if (typeof value === 'string') return (overrides[path.join('.')] ?? value) as T;
  if (Array.isArray(value)) return value.map((child, i) => applyText(child, overrides, [...path, String(i)])) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, applyText(child, overrides, [...path, key])])) as T;
  return value;
}
export function resolveContent(overrides: ContentOverrides) {
  return applyText(defaults, overrides);
}
