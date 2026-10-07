import { getSiteContent } from '@/lib/content';
import { SectionTitle } from '@/components/SectionTitle';

export default async function OverMijPage() {
  const { copy } = await getSiteContent();
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow={copy.about.eyebrow1}
            title={copy.about.title1}
            text={copy.about.text1}
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>{copy.about.heading1}</h2>
            <p>{copy.about.paragraph1}</p>
          </article>
          <article className="content-card content-card--large">
            <h2>{copy.about.heading2}</h2>
            <p>{copy.about.paragraph2}</p>
          </article>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>{copy.about.heading3}</h2>
            <p>{copy.about.paragraph3}</p>
            <p>{copy.about.paragraph4}</p>
          </article>
          <article className="content-card content-card--large">
            <h2>{copy.about.heading4}</h2>
            <p>{copy.about.paragraph5}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <article className="content-card content-card--large">
            <h2>{copy.about.heading5}</h2>
            <p>{copy.about.paragraph6}</p>
            <p>{copy.about.paragraph7}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
