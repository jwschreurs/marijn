import { getSiteContent } from '@/lib/content';
import { SectionTitle } from '@/components/SectionTitle';
import Link from 'next/link';

export default async function MindfulnessPage() {
  const { copy } = await getSiteContent();
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow={copy.mindfulness.eyebrow1}
            title={copy.mindfulness.title1}
            text={copy.mindfulness.text1}
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>{copy.mindfulness.heading1}</h2>
            <p>{copy.mindfulness.paragraph1}</p>
            <p>{copy.mindfulness.paragraph2}</p>
            <p>{copy.mindfulness.paragraph3}</p>
          </article>
          <article className="content-card content-card--large">
            <h2>{copy.mindfulness.heading2}</h2>
            <p>{copy.mindfulness.paragraph4}</p>
            <p>{copy.mindfulness.paragraph5}</p>
            <p>{copy.mindfulness.paragraph6}</p>
          </article>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column">
          <div>
            <SectionTitle
              eyebrow={copy.mindfulness.eyebrow2}
              title={copy.mindfulness.title2}
              text={copy.mindfulness.text2}
              headingLevel="h2"
            />
            <p className="muted">{copy.mindfulness.paragraph7}</p>
          </div>
          <article className="content-card content-card--large">
            <ul className="feature-list">
              <li>{copy.mindfulness.item1}</li>
              <li>{copy.mindfulness.item2}</li>
              <li>{copy.mindfulness.item3}</li>
              <li>{copy.mindfulness.item4}</li>
              <li>{copy.mindfulness.item5}</li>
              <li>{copy.mindfulness.item6}</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>{copy.mindfulness.heading3}</h2>
            <p>{copy.mindfulness.paragraph8}</p>
            <p>{copy.mindfulness.paragraph9}</p>
          </article>
          <article className="content-card content-card--large">
            <h2>{copy.mindfulness.heading4}</h2>
            <p>{copy.mindfulness.paragraph10}</p>
            <p>{copy.mindfulness.paragraph11}</p>
            <Link href="/trainingen/mindfulness-basistraining" className="button primary inline-button">{copy.mindfulness.link1}</Link>
          </article>
        </div>
      </section>

      <section className="section soft-section" id="vergoeding">
        <div className="container narrow detail-stack">
          <SectionTitle
            eyebrow={copy.mindfulness.eyebrow3}
            title={copy.mindfulness.title3}
            text={copy.mindfulness.text3}
            headingLevel="h2"
          />
          <article className="content-card content-card--large">
            <p>{copy.mindfulness.paragraph12}</p>
            <p>{copy.mindfulness.paragraph13}</p>
            <p>{copy.mindfulness.paragraph14}</p>
            <p>{copy.mindfulness.paragraph15}</p>
            <div className="resource-links" aria-label={copy.mindfulness.accessibleLabel1}>
              <a href="https://www.vmbn.nl/over-mindfulness/vergoedingsmogelijkheden/" target="_blank" rel="noreferrer">{copy.mindfulness.link2}</a>
              <a href="https://www.zorgwijzer.nl/vergoeding/mindfulness" target="_blank" rel="noreferrer">{copy.mindfulness.link3}</a>
              <a href="https://www.zorgverzekering.info/mindfulness/" target="_blank" rel="noreferrer">{copy.mindfulness.link4}</a>
            </div>
            <Link href="/contact" className="button secondary inline-button">{copy.mindfulness.link5}</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
