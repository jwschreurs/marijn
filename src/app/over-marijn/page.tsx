import { getSiteContent } from '@/lib/content';
import { SectionTitle } from '@/components/SectionTitle';

export default async function OverMarijnPage() {
  const { copy } = await getSiteContent();
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow={copy.legacyAbout.eyebrow1}
            title={copy.legacyAbout.title1}
            text={copy.legacyAbout.text1}
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <div className="content-card">
            <h2>{copy.legacyAbout.heading1}</h2>
            <p>{copy.legacyAbout.paragraph1}</p>
          </div>
          <div className="content-card">
            <h2>{copy.legacyAbout.heading2}</h2>
            <p>{copy.legacyAbout.paragraph2}</p>
          </div>
          <div className="content-card">
            <h2>{copy.legacyAbout.heading3}</h2>
            <p>{copy.legacyAbout.paragraph3}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
