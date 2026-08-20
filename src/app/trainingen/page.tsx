import Image from 'next/image';
import { TrainingCard } from '@/components/TrainingCard';
import { trainingen } from '@/data/site';

export default function TrainingenPage() {
  return (
    <main>
      <section className="hero hero--training section section--tight">
        <div className="hero-image-background">
          <Image
            src="/boot.jpeg"
            alt="Zonsondergang boven zee, gezien vanaf een houten boot"
            fill
            className="hero-photo training-hero-photo"
            priority
            sizes="100vw"
          />
        </div>

        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">Trainingen</p>
            <h1>Trainingen met rust, aandacht en praktische handvatten</h1>
            <p className="lead">
              Voor particulieren, professionals en organisaties die willen werken aan aandacht,
              balans, veerkracht en bewust omgaan met stress.
            </p>
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
