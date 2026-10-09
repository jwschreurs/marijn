export type FormKind = 'inquiry' | 'registration';
export type FormResult = { status: 'success' | 'error'; message: string };
export type FormMessage = { subject: string; text: string; replyTo: string };
export class FormValidationError extends Error {}
export function parsePublicForm(kind: unknown, data: FormData, interests: string[]): FormMessage {
  if (kind !== 'inquiry' && kind !== 'registration') throw new FormValidationError('Dit formulier is niet bekend.');
  const read = (key: string, label: string, max: number, required = false, multiline = false) => {
    const values = data.getAll(key);
    if (values.length > 1 || (values.length === 1 && typeof values[0] !== 'string')) throw new FormValidationError(label + ': ongeldige invoer.');
    const value = String(values[0] ?? '').trim();
    if ((required && !value) || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value) || (!multiline && /[\r\n]/.test(value))) {
      throw new FormValidationError(label + ': vul een geldige waarde in (maximaal ' + max + ' tekens).');
    }
    return value;
  };
  const name = read('naam', 'Naam', 150, true);
  const email = read('email', 'E-mailadres', 254, true);
  if (!/^[^\s@<>,;:"\\]+@[^\s@<>,;:"\\]+\.[^\s@<>,;:"\\]+$/.test(email)) throw new FormValidationError('Vul een geldig e-mailadres in.');
  const rows: [string, string][] = [['Naam', name], ['E-mailadres', email]];
  if (kind === 'inquiry') {
    const interest = read('interesse', 'Interesse', 500, true);
    if (![...interests, 'Kennismakingsgesprek'].includes(interest)) throw new FormValidationError('Kies een geldige interesse.');
    rows.push(['Interesse', interest], ['Bericht', read('bericht', 'Bericht', 5000, false, true)]);
  } else {
    const phone = read('telefoon', 'Telefoonnummer', 30);
    if (phone && !/^\+?[\d ().-]{6,30}$/.test(phone)) throw new FormValidationError('Vul een geldig telefoonnummer in.');
    const date = read('startdatum', 'Startdatum training', 10);
    if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) throw new FormValidationError('Vul een geldige startdatum in.');
    const choice = (key: string, label: string, choices: Record<string, string>) => {
      const value = read(key, label, 80);
      if (value && !Object.hasOwn(choices, value)) throw new FormValidationError(label + ': kies een geldige optie.');
      return choices[value] ?? '';
    };
    rows.push(
      ['Telefoonnummer', phone],
      ['Adres', read('adres', 'Adres', 300)],
      ['Startdatum training', date],
      ['Reden deelname', read('reden-deelname', 'Reden deelname', 5000, false, true)],
      ['Aanwezig bij alle bijeenkomsten', choice('alle-bijeenkomsten', 'Aanwezigheid', { ja: 'Ja', nee: 'Nee' })],
      ['Verwachte afwezigheid', read('afwezige-bijeenkomsten', 'Verwachte afwezigheid', 2000, false, true)],
      ['Training gevonden via', choice('training-gevonden', 'Training gevonden via', { website: 'Website', 'social-media': 'Social media', omgeving: 'Omgeving', 'andere-organisatie': 'Andere website of organisatie', anders: 'Anders' })],
      ['Anders, namelijk', read('training-gevonden-anders', 'Anders, namelijk', 500)],
      ['Dagelijks oefenen', choice('dagelijks-oefenen', 'Dagelijks oefenen', { ja: 'Ja', nee: 'Nee', 'bespreken-tijdens-intake': 'Bespreken tijdens intake' })],
      ['Vragen of opmerkingen', read('vragen-of-opmerkingen', 'Vragen of opmerkingen', 5000, false, true)],
    );
  }
  const subject = kind === 'registration' ? 'Nieuwe aanmelding MBSR-training' : 'Nieuwe contactaanvraag';
  return { subject, replyTo: email, text: subject + '\n\n' + rows.map(([label, value]) => label + ':\n' + (value || '(niet ingevuld)')).join('\n\n') };
}
