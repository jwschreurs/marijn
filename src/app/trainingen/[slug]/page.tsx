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
            {training.details?.map((detail) => <p key={detail}>{detail}</p>)}
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

      {training.schedule ? (
        <section className="section soft-section">
          <div className="container detail-stack">
            <SectionTitle
              eyebrow={training.schedule.season}
              title="Planning en groepen"
              text={`${training.schedule.location}. Kies bij aanmelding voor de vaste ochtend- of avondgroep.`}
              headingLevel="h2"
            />

            <div className="schedule-groups">
              {training.schedule.groups.map((group) => (
                <article key={group.name} className="content-card schedule-group">
                  <h3>{group.name}</h3>
                  <p className="schedule-time">{group.time}</p>
                  <p>Alle acht bijeenkomsten vinden plaats op woensdag.</p>
                </article>
              ))}
            </div>

            <div className="schedule-layout">
              <article className="content-card content-card--large">
                <h3>De acht bijeenkomsten</h3>
                <ol className="schedule-list">
                  {training.schedule.meetings.map((meeting) => (
                    <li key={meeting.label}>
                      <span>{meeting.label}</span>
                      <strong>{meeting.date}</strong>
                    </li>
                  ))}
                </ol>
              </article>
              <article className="content-card retreat-card">
                <p className="eyebrow">Onderdeel van de training</p>
                <h3>{training.schedule.retreat.label}</h3>
                <p>
                  <strong>{training.schedule.retreat.date}</strong>
                  <br />
                  {training.schedule.retreat.time}
                </p>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      {training.investment ? (
        <section className="section">
          <div className="container two-column form-layout">
            <div>
              <SectionTitle
                eyebrow="Investering en tarieven"
                title={training.investment.price}
                text={training.investment.introduction}
                headingLevel="h2"
              />
              <p className="muted">{training.investment.taxNote}</p>
              <p>{training.investment.employerNote}</p>
              <p>{training.investment.reimbursementNote}</p>
              <Link href="/mindfulness#vergoeding" className="text-link">
                Lees meer over vergoedingsmogelijkheden
              </Link>
            </div>
            <article className="content-card content-card--large">
              <h3>De investering is inclusief</h3>
              <ul className="feature-list">
                {training.investment.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contact" className="button primary inline-button">
                Neem contact op
              </Link>
            </article>
          </div>
        </section>
      ) : null}
    </main>
  );
}
