'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { consumeLoginAttempt, createAdminSession, isAdminConfigured, removeAdminSession, requireAdmin } from '@/lib/admin-auth';
import { verifyPassword } from '@/lib/password';
import { database } from '@/lib/database';
import { writeSnapshot } from '@/lib/content-storage';
import { parseOverrides } from '@/lib/content-schema';

export async function login(_previous: { error: string }, form: FormData): Promise<{ error: string }> {
  if (!isAdminConfigured()) return { error: 'Het beheer is nog niet ingericht.' };
  const password = form.get('password');
  if (typeof password !== 'string' || !password || password.length > 256) return { error: 'Vul je wachtwoord in.' };
  try {
    if (!(await consumeLoginAttempt())) return { error: 'Te veel inlogpogingen. Probeer het over 15 minuten opnieuw.' };
    if (!(await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH!))) return { error: 'Het wachtwoord klopt niet.' };
    await createAdminSession();
  } catch {
    return { error: 'Inloggen lukt momenteel niet. Probeer het later opnieuw.' };
  }
  redirect('/beheer');
}

export async function logout() {
  await removeAdminSession();
  redirect('/beheer/inloggen');
}

export async function publishContent(values: unknown, revision: unknown) {
  try {
    await requireAdmin();
  } catch {
    return { ok: false as const, error: 'Je sessie is verlopen of het beheer is niet bereikbaar. Log opnieuw in en probeer het nogmaals.' };
  }
  if (!Number.isSafeInteger(revision) || typeof revision !== 'number' || revision < 0) {
    return { ok: false as const, error: 'De tekstversie klopt niet. Herlaad het beheer.' };
  }
  let overrides;
  try {
    overrides = parseOverrides(values);
  } catch (error) {
    return { ok: false as const, error: error instanceof Error ? error.message : 'Controleer de ingevulde teksten.' };
  }
  try {
    const result = await writeSnapshot(database(), overrides, revision);
    if (!result) {
      return { ok: false as const, error: 'Er is vanuit een ander venster gepubliceerd. Je wijzigingen staan nog hier. Kopieer ze en herlaad deze pagina voordat je opnieuw publiceert.' };
    }
    revalidatePath('/', 'layout');
    return { ok: true as const, ...result };
  } catch {
    return { ok: false as const, error: 'Publiceren kon niet worden bevestigd. Je wijzigingen staan nog hier. Bekijk de website en probeer het opnieuw zodra de verbinding is hersteld.' };
  }
}
