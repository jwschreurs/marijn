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
                          Marijn met aandacht biedt mindfulness, trainingen en persoonlijke begeleiding voor
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
              De begeleiding is geschikt voor particulieren, professionals en teams. De toon is
              rustig en toegankelijk, met oefeningen en inzichten die je direct kunt toepassen in
              het dagelijks leven of op het werk.
            </p>
            <ul>
              <li>Mindfulness voor meer rust en bewustzijn</li>
              <li>Trainingen voor particulieren en organisaties</li>
              <li>Persoonlijke begeleiding op maat</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Aanbod"
            title="Trainingen en begeleiding"
            text="Een overzicht van de mogelijkheden. Data, locaties en praktische informatie kunnen eenvoudig worden aangevuld."
            headingLevel="h2"
          />
          <div className="card-grid">
            {trainingen.map((training) => (
              <TrainingCard key={training.slug} training={training} />
            ))}
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container quote-block">
          <p className="quote">
            “Aandacht brengt rust. Rust geeft ruimte. En in die ruimte ontstaat beweging.”
          </p>
        </div>
      </section>
    </main>
  );
}
