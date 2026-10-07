import { emitKeypressEvents } from 'node:readline';
import { hashPassword } from '../src/lib/password';

if (!process.stdin.isTTY) throw new Error('Open dit commando in een interactieve terminal.');
function readHidden(prompt: string): Promise<string> {
  process.stdout.write(prompt);
  emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.resume();
  return new Promise(resolve => {
    let value = '';
    function onKey(text: string, key: { name?: string; ctrl?: boolean }) {
      if (key.ctrl && key.name === 'c') process.exit(1);
      if (key.name === 'return') {
        process.stdin.removeListener('keypress', onKey);
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\n');
        resolve(value);
      } else if (key.name === 'backspace') value = value.slice(0, -1);
      else if (text && !key.ctrl && !/[\x00-\x1f\x7f]/.test(text)) value += text;
    }
    process.stdin.on('keypress', onKey);
  });
}
async function main() {
  const password = await readHidden('Kies je beheerderswachtwoord (minimaal 14 tekens, invoer is verborgen): ');
  const confirmation = await readHidden('Herhaal je wachtwoord: ');
  if (password !== confirmation) throw new Error('De wachtwoorden komen niet overeen.');
  const hash = await hashPassword(password);
  process.stdout.write('\nPlaats deze volledige waarde in Vercel bij ADMIN_PASSWORD_HASH:\n' + hash + '\n');
}
main().catch(error => {
  process.stderr.write((error instanceof Error ? error.message : 'Wachtwoord instellen is mislukt.') + '\n');
  process.exitCode = 1;
});
