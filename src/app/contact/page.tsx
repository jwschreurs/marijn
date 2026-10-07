import { getSiteContent } from '@/lib/content';
import { SectionTitle } from '@/components/SectionTitle';
import { TrainingInquiryForm } from '@/components/TrainingInquiryForm';

export default async function ContactPage() {
  const { copy, siteConfig } = await getSiteContent();
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow={copy.contact.eyebrow1}
            title={copy.contact.title1}
            text={copy.contact.text1}
            align="center"
          />
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column form-layout">
          <div className="contact-card">
            <p>
              <strong>{copy.contact.label1}</strong>
              <br />
              {siteConfig.name}
            </p>
            <p>
              <strong>{copy.contact.label2}</strong>
              <br />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
            <p>
              <strong>{copy.contact.label3}</strong>
              <br />
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>{siteConfig.phone}</a>
            </p>
            <p>
              <strong>{copy.contact.label4}</strong>
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
