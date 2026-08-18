import { SectionTitle } from '@/components/SectionTitle';
import { TrainingCard } from '@/components/TrainingCard';
import { trainingen } from '@/data/site';

export default function TrainingenPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Trainingen"
            title="Trainingen en begeleiding"
            text="Een overzichtelijke pagina waarin je eenvoudig het aanbod, data, prijzen en locaties kunt tonen."
            align="center"
          />
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
