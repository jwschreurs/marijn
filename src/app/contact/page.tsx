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
            title="Neem rustig contact op"
            text="Gebruik deze pagina voor e-mail, telefoon, werkgebied en een eenvoudige aanvraag voor training of kennismaking."
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-column form-layout">
          <div className="contact-card">
            <p>
              <strong>Bedrijfsnaam</strong>
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
          </div>
          <TrainingInquiryForm />
        </div>
      </section>
    </main>
  );
}
