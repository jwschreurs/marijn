import { getSiteContent } from '@/lib/content';
import { siteConfig as deliveryConfig } from '@/data/site';
import { readMailConfig } from '@/lib/microsoft-mail';
import { hasDatabase } from '@/lib/database';
import { readTurnstileConfig } from '@/lib/turnstile';
import { PublicForm } from '@/components/PublicForm';

type TrainingInquiryFormProps = {
  defaultInterest?: string;
};

export async function TrainingInquiryForm({ defaultInterest = '' }: TrainingInquiryFormProps) {
  const { copy, trainingen } = await getSiteContent();
  const spamConfig = readTurnstileConfig(process.env);
  return (
    <PublicForm kind="inquiry" className="contact-form" buttonLabel={copy.inquiryForm.submitLabel}
      email={deliveryConfig.email} siteKey={spamConfig?.siteKey ?? ''} configured={Boolean(readMailConfig(process.env)) && hasDatabase() && Boolean(spamConfig)}>
      <label>{copy.inquiryForm.label1}<input type="text" name="naam" maxLength={150} autoComplete="name" placeholder={copy.inquiryForm.placeholder1} required />
      </label>
      <label>{copy.inquiryForm.label2}<input type="email" name="email" maxLength={254} autoComplete="email" placeholder={copy.inquiryForm.placeholder2} required />
      </label>
      <label>{copy.inquiryForm.label3}<select name="interesse" defaultValue={defaultInterest} required>
          <option value="" disabled>{copy.inquiryForm.option1}</option>
          {trainingen.map((training) => (
            <option key={training.slug} value={training.title}>
              {training.title}
            </option>
          ))}
          <option value="Kennismakingsgesprek">{copy.inquiryForm.option2}</option>
        </select>
      </label>
      <label>{copy.inquiryForm.label4}<textarea
          name="bericht" maxLength={5000}
          rows={5}
          placeholder={copy.inquiryForm.placeholder3}
        />
      </label>
      <p className="form-note">{copy.inquiryForm.deliveryNote.replace('{email}', deliveryConfig.email)}</p>
    </PublicForm>
  );
}
