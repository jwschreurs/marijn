import { siteConfig, trainingen } from '@/data/site';

type TrainingInquiryFormProps = {
  defaultInterest?: string;
};

export function TrainingInquiryForm({ defaultInterest = '' }: TrainingInquiryFormProps) {
  return (
    <form
      className="contact-form"
      action={`mailto:${siteConfig.email}`}
      method="post"
      encType="text/plain"
    >
      <label>
        Naam
        <input type="text" name="Naam" placeholder="Jouw naam" required />
      </label>
      <label>
        E-mailadres
        <input type="email" name="E-mail" placeholder="naam@voorbeeld.nl" required />
      </label>
      <label>
        Interesse
        <select name="Interesse" defaultValue={defaultInterest} required>
          <option value="" disabled>
            Kies een optie
          </option>
          {trainingen.map((training) => (
            <option key={training.slug} value={training.title}>
              {training.title}
            </option>
          ))}
          <option value="Kennismakingsgesprek">Kennismakingsgesprek</option>
        </select>
      </label>
      <label>
        Bericht
        <textarea
          name="Bericht"
          rows={5}
          placeholder="Waar wil je meer over weten?"
        />
      </label>
      <button type="submit" className="button primary">
        Verstuur aanvraag
      </button>
      <p className="form-note">
        Dit is nu een eenvoudige mail-oplossing. Later kan dit worden gekoppeld aan bijvoorbeeld
        Resend, Formspree of Microsoft Forms.
      </p>
    </form>
  );
}
