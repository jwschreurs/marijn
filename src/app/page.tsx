import { getSiteContent } from '@/lib/content';
import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle } from '@/components/SectionTitle';
import { TrainingCard } from '@/components/TrainingCard';

export default async function HomePage() {
  const { copy, siteConfig, trainingen } = await getSiteContent();
  return (
    <main>
          <section className="hero section section--tight">
              <div className="hero-image-background">
                  <Image
                      src="/hero-marijn.jpeg"
                      alt={copy.home.alt1}
                      fill
                      className="hero-photo"
                      priority
                      sizes="100vw"
                  />
              </div>

              <div className="container hero-grid">
                  <div className="hero-content">
                      <p className="eyebrow">{siteConfig.tagline}</p>
                      <h1>{copy.home.heading1}</h1>
                      <p className="lead">{copy.home.paragraph1}</p>
                      <div className="hero-actions">
                          <Link href="/trainingen" className="button primary">{copy.home.link1}</Link>
                          <Link href="/contact" className="button secondary">{copy.home.link2}</Link>
                      </div>
                  </div>
              </div>
          </section>

      <section className="section soft-section">
        <div className="container two-column">
          <SectionTitle
            eyebrow={copy.home.eyebrow1}
            title={copy.home.title1}
            text={copy.home.text1}
            headingLevel="h2"
          />
          <div className="info-panel">
            <p>{copy.home.paragraph2}</p>
            <ul>
              <li>{copy.home.item1}</li>
              <li>{copy.home.item2}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow={copy.home.eyebrow2}
            title={copy.home.title2}
            headingLevel="h2"
          />
          <div className="card-grid">
            {trainingen.map((training) => (
              <TrainingCard key={training.slug} training={training} />
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section" aria-label={copy.home.accessibleLabel1}>
        <div className="container quote-block">
          <p className="quote">{copy.home.paragraph3}</p>
        </div>
      </section>
    </main>
  );
}
