import { getSiteContent } from '@/lib/content';

type TrainingInquiryFormProps = {
  defaultInterest?: string;
};

export async function TrainingInquiryForm({ defaultInterest = '' }: TrainingInquiryFormProps) {
  const { copy, siteConfig, trainingen } = await getSiteContent();
  return (
    <form
      className="contact-form"
      action={`mailto:${siteConfig.email}`}
      method="post"
      encType="text/plain"
    >
      <label>{copy.inquiryForm.label1}<input type="text" name="Naam" placeholder={copy.inquiryForm.placeholder1} required />
      </label>
      <label>{copy.inquiryForm.label2}<input type="email" name="E-mail" placeholder={copy.inquiryForm.placeholder2} required />
      </label>
      <label>{copy.inquiryForm.label3}<select name="Interesse" defaultValue={defaultInterest} required>
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
          name="Bericht"
          rows={5}
          placeholder={copy.inquiryForm.placeholder3}
        />
      </label>
      <button type="submit" className="button primary">{copy.inquiryForm.button1}</button>
      <p className="form-note">{copy.inquiryForm.paragraph1.replace('{email}', siteConfig.email)}</p>
    </form>
  );
}
