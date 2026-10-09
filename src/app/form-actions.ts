'use server';

import { createHmac } from 'node:crypto';
import { headers } from 'next/headers';
import { siteConfig } from '@/data/site';
import { getSiteContent } from '@/lib/content';
import { database, hasDatabase } from '@/lib/database';
import { MailDeliveryError, readMailConfig, sendMicrosoftMail } from '@/lib/microsoft-mail';
import { FormValidationError, parsePublicForm, type FormResult } from '@/lib/public-form-schema';
import { readTurnstileConfig, verifyTurnstile } from '@/lib/turnstile';
import { trySendConfirmation } from '@/lib/form-confirmation';
import { claimDelivery, finishDelivery, takeFormAttempt, reserveConfirmation } from '@/lib/public-form-storage';

export async function submitPublicForm(kind: unknown, data: FormData, id: string): Promise<FormResult> {
  const fallback = 'Verzenden lukt momenteel niet. Je invoer blijft staan. Mail naar ' + siteConfig.email + ' of probeer het later opnieuw.';
  const uncertain = 'We kunnen niet bevestigen of je formulier is verzonden. Je invoer blijft staan. Neem contact op via ' + siteConfig.email + ' voordat je opnieuw verstuurt.';
  const success: FormResult = { status: 'success', message: kind === 'registration'
    ? 'Bedankt! Je aanmelding is verzonden. Marijn neemt contact met je op voor het intakegesprek. Je deelname is nog niet definitief.'
    : 'Bedankt! Je aanvraag is verzonden. Marijn neemt contact met je op.' };
  const error = (message: string): FormResult => ({ status: 'error', message });
  if (!(data instanceof FormData) || typeof id !== 'string' || !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i.test(id)) return error('Herlaad de pagina voordat je het formulier verstuurt.');
  if (data.get('website')) return error('Het formulier kon niet worden verstuurd.');
  const config = readMailConfig(process.env);
  const spamConfig = readTurnstileConfig(process.env);
  if (!config || !spamConfig || !hasDatabase()) return error(fallback);
  let sql: ReturnType<typeof database>;
  let claimed = false;
  try {
    const { trainingen } = await getSiteContent();
    const message = parsePublicForm(kind, data, trainingen.map(training => training.title));
    const incoming = await headers();
    const ip = process.env.VERCEL === '1' ? incoming.get('x-vercel-forwarded-for') ?? 'unknown' : 'local';
    const hash = (value: string) => createHmac('sha256', config.clientSecret).update(value).digest('hex');
    sql = database();
    if (!(await takeFormAttempt(sql, 'ip:' + hash(ip)))) return error('Er zijn te veel verzendpogingen gedaan. Probeer het over een uur opnieuw of mail naar ' + siteConfig.email + '.');
    const tokens = data.getAll('cf-turnstile-response');
    if (tokens.length !== 1 || !(await verifyTurnstile(spamConfig, tokens[0], kind === 'registration' ? 'registration' : 'inquiry'))) {
      return error('De spamcontrole is niet gelukt of verlopen. Doorloop de controle opnieuw. Je invoer blijft staan.');
    }
    const claim = await claimDelivery(sql, id, hash(JSON.stringify(message)));
    if (claim === 'sent') return success;
    if (claim === 'uncertain') return error(uncertain);
    if (claim === 'conflict') return error('Je hebt dit formulier al eerder verstuurd. Herlaad de pagina als je een nieuwe aanvraag wilt doen.');
    claimed = true;
    await sendMicrosoftMail(config, siteConfig.email, message);
    // Mail is accepted already: a storage failure must not invite a duplicate send.
    try { await finishDelivery(sql, id, 'sent'); } catch { console.error('Formulier: verzendstatus opslaan mislukt.'); }
    const confirmed = await trySendConfirmation(kind === 'registration' ? 'registration' : 'inquiry', message.replyTo,
      () => reserveConfirmation(sql, hash('recipient:' + message.replyTo.toLowerCase())),
      (recipient, confirmation) => sendMicrosoftMail(config, recipient, confirmation));
    return { ...success, message: success.message + (confirmed
      ? ' Je ontvangt ook een bevestiging per e-mail. Controleer eventueel je spammap.'
      : ' Een aparte e-mailbevestiging is deze keer niet verstuurd of kon niet worden bevestigd. Je hoeft het formulier niet opnieuw te versturen.') };
  } catch (failure) {
    if (failure instanceof FormValidationError) return error(failure.message);
    if (claimed) {
      const outcome = failure instanceof MailDeliveryError ? failure.outcome : 'uncertain';
      try { await finishDelivery(database(), id, outcome); } catch { /* Keep the claim to prevent a duplicate. */ }
      console.error('Formulier:', failure instanceof MailDeliveryError ? failure.code : 'send-unknown');
      return error(outcome === 'uncertain' ? uncertain : fallback);
    }
    console.error('Formulier: voorbereiding mislukt.');
    return error(fallback);
  }
}
