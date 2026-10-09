import { formConfirmationCopy, siteConfig } from '@/data/site';
import type { FormKind, FormMessage } from './public-form-schema';
// No submitted name or message: recipients never receive attacker-controlled copy.
export function confirmationMessage(kind: FormKind): FormMessage {
  const copy = formConfirmationCopy[kind];
  return {
    subject: copy.subject,
    text: copy.body + '\n\n' + siteConfig.name + '\n' + siteConfig.email + '\n\n' + formConfirmationCopy.unrequested,
    replyTo: siteConfig.email,
  };
}
export async function trySendConfirmation(
  kind: FormKind, recipient: string, reserve: () => Promise<boolean>,
  send: (recipient: string, message: FormMessage) => Promise<void>,
): Promise<boolean> {
  if (recipient.toLowerCase() === siteConfig.email.toLowerCase()) return false;
  try {
    if (!(await reserve())) return false;
    await send(recipient, confirmationMessage(kind));
    return true;
  } catch {
    // The owner's message is already accepted. Never ask the visitor to resubmit it.
    console.error('Formulier: ontvangstbevestiging niet bevestigd.');
    return false;
  }
}
