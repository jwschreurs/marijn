import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionTitle } from '@/components/SectionTitle';
import { TrainingInquiryForm } from '@/components/TrainingInquiryForm';
import { trainingen } from '@/data/site';

export function generateStaticParams() {
  return trainingen.map((training) => ({ slug: training.slug }));
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const training = trainingen.find((item) => item.slug === slug);

  if (!training) {
    notFound();
  }

  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow={training.duration}
            title={training.title}
            text={training.summary}
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-column form-layout">
          <article className="content-card content-card--large">
            <p className="card-target">{training.audience}</p>
            <p>{training.description}</p>
            <ul className="feature-list">
              {training.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link href="/contact" className="button secondary inline-button">
              Eerst een vraag stellen
            </Link>
          </article>
          <div>
            <TrainingInquiryForm defaultInterest={training.title} />
          </div>
        </div>
      </section>
    </main>
  );
}
