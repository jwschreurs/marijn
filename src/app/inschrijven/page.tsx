import { getSiteContent } from '@/lib/content';
import type { Metadata } from 'next';
import { MbsrRegistrationForm } from '@/components/MbsrRegistrationForm';
import { SectionTitle } from '@/components/SectionTitle';

export async function generateMetadata(): Promise<Metadata> {
  const { copy } = await getSiteContent();
  return { title: copy.registration.metadataTitle, description: copy.registration.metadataDescription };
}

export default async function RegistrationPage() {
  const { copy } = await getSiteContent();
  return (
    <main>
      <section className="section page-hero registration-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow={copy.registration.eyebrow1}
            title={copy.registration.title1}
            text={copy.registration.text1}
            align="center"
          />
        </div>
      </section>

      <section className="section registration-section">
        <div className="container registration-container">
          <MbsrRegistrationForm />
        </div>
      </section>
    </main>
  );
}
