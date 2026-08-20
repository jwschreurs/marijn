import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle } from '@/components/SectionTitle';
import { TrainingCard } from '@/components/TrainingCard';
import { siteConfig, trainingen } from '@/data/site';

export default function HomePage() {
  return (
    <main>
          <section className="hero section section--tight">
              <div className="hero-image-background">
                  <Image
                      src="/hero-marijn.jpeg"
                      alt="Rustige mindfulness achtergrond met uitzicht over een tempelcomplex"
                      fill
                      className="hero-photo"
                      priority
                      sizes="100vw"
                  />
              </div>

              <div className="container hero-grid">
                  <div className="hero-content">
                      <p className="eyebrow">{siteConfig.tagline}</p>
                      <h1>Meer rust, aandacht en balans in leven en werk.</h1>
                      <p className="lead">
                          Marijn met aandacht biedt mindfulness en trainingen voor
                          mensen en organisaties die bewuster willen omgaan met stress, drukte en verandering.
                      </p>
                      <div className="hero-actions">
                          <Link href="/trainingen" className="button primary">
                              Bekijk trainingen
                          </Link>
                          <Link href="/contact" className="button secondary">
                              Neem contact op
                          </Link>
                      </div>
                  </div>
              </div>
          </section>

      <section className="section soft-section">
        <div className="container two-column">
          <SectionTitle
            eyebrow="Met aandacht"
            title="Praktisch, rustig en mensgericht"
            text="Mindfulness hoeft niet ingewikkeld te zijn. Het gaat om leren opmerken wat er gebeurt, ruimte maken en van daaruit bewust reageren. In kleine stappen, met aandacht voor jouw eigen situatie."
            headingLevel="h2"
          />
          <div className="info-panel">
            <p>
              Het aanbod is geschikt voor particulieren en organisaties. De toon is
              rustig en toegankelijk, met oefeningen en inzichten die je direct kunt toepassen in
              het dagelijks leven of op het werk.
            </p>
            <ul>
              <li>Mindfulness voor meer rust en bewustzijn</li>
              <li>Trainingen voor organisaties</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Aanbod"
            title="Trainingen"
            headingLevel="h2"
          />
          <div className="card-grid">
            {trainingen.map((training) => (
              <TrainingCard key={training.slug} training={training} />
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section" aria-label="Inspirerende quote">
        <div className="container quote-block">
          <p className="quote">
            “I never said it would be easy, I only said it would be worth it.” – Mae West
          </p>
        </div>
      </section>
    </main>
  );
}
