import { getSiteContent } from '@/lib/content';
import Image from 'next/image';
import { TrainingCard } from '@/components/TrainingCard';

export default async function TrainingenPage() {
  const { copy, trainingen } = await getSiteContent();
  return (
    <main>
      <section className="hero hero--training section section--tight">
        <div className="hero-image-background">
          <Image
            src="/boot.jpeg"
            alt={copy.trainingOverview.alt1}
            fill
            className="hero-photo training-hero-photo"
            priority
            sizes="100vw"
          />
        </div>

        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">{copy.trainingOverview.paragraph1}</p>
            <h1>{copy.trainingOverview.heading1}</h1>
            <p className="lead">{copy.trainingOverview.paragraph2}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card-grid">
          {trainingen.map((training) => (
            <TrainingCard key={training.slug} training={training} />
          ))}
        </div>
      </section>
    </main>
  );
}
