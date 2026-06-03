import { SectionTitle } from '@/components/SectionTitle';
import { TrainingInquiryForm } from '@/components/TrainingInquiryForm';
import { siteConfig } from '@/data/site';

export default function ContactPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Contact"
            title="Neem contact op voor een kennismaking"
            text="Wil je meer weten over een training, individuele begeleiding of een mogelijkheid voor jouw organisatie? Laat gerust een bericht achter."
            align="center"
          />
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column form-layout">
          <div className="contact-card">
            <p>
              <strong>Naam</strong>
              <br />
              {siteConfig.name}
            </p>
            <p>
              <strong>E-mail</strong>
              <br />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              <strong>Telefoon</strong>
              <br />
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
            </p>
            <p>
              <strong>Werkgebied</strong>
              <br />
              {siteConfig.location}
            </p>
            <p className="muted">
              De contactgegevens zijn placeholders. Deze kun je aanpassen in
              <code> src/data/site.ts</code>.
            </p>
          </div>
          <TrainingInquiryForm />
        </div>
      </section>
    </main>
  );
}
