import { getSiteContent } from '@/lib/content';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionTitle } from '@/components/SectionTitle';
import { TrainingInquiryForm } from '@/components/TrainingInquiryForm';
import { trainingen as defaultTrainingen, type TrainingContentParagraph } from '@/data/site';

function TrainingParagraph({ paragraph }: { paragraph: TrainingContentParagraph }) {
  const phrases = paragraph.emphasizedPhrases ?? [];
  const pattern = phrases.length
    ? new RegExp(`(${phrases.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
    : null;
  const content = pattern
    ? paragraph.text.split(pattern).map((part, index) =>
        phrases.includes(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part,
      )
    : paragraph.text;

  return <p>{paragraph.strong ? <strong>{content}</strong> : content}</p>;
}

export function generateStaticParams() {
  return defaultTrainingen.map((training) => ({ slug: training.slug }));
}

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { copy, trainingen } = await getSiteContent();
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
            {training.highlights.length > 0 ? (
              <ul className="feature-list">
                {training.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            ) : null}
            {training.contentSections?.map((section) => (
              <section className="training-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <TrainingParagraph key={paragraph.text} paragraph={paragraph} />
                ))}
                {section.items ? (
                  <ul className="feature-list">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.closingParagraphs?.map((paragraph) => (
                  <TrainingParagraph key={paragraph.text} paragraph={paragraph} />
                ))}
              </section>
            ))}
            <div className="training-actions">
              {training.slug === 'mindfulness-basistraining' ? (
                <Link href="/inschrijven" className="button primary">{copy.trainingDetail.link1}</Link>
              ) : null}
              <Link href="/contact" className="button secondary">{copy.trainingDetail.link2}</Link>
            </div>
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
              title={copy.trainingDetail.title1}
              text={`${training.schedule.location}.`}
              headingLevel="h2"
            />

            <div className="schedule-groups">
              {training.schedule.groups.map((group) => (
                <article key={group.name} className="content-card schedule-group">
                  <h3>{group.name}</h3>
                  <p className="schedule-time">{group.time}</p>
                  <p>{copy.trainingDetail.paragraph1}</p>
                </article>
              ))}
            </div>

            <div className="schedule-layout">
              <article className="content-card content-card--large">
                <h3>{copy.trainingDetail.heading1}</h3>
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
                <p className="eyebrow">{copy.trainingDetail.paragraph2}</p>
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
                eyebrow={copy.trainingDetail.eyebrow1}
                title={training.investment.price}
                text={training.investment.introduction}
                headingLevel="h2"
              />
              <p className="muted">{training.investment.taxNote}</p>
              <p>{training.investment.employerNote}</p>
              <p>{training.investment.reimbursementNote}</p>
              <Link href="/mindfulness#vergoeding" className="text-link">{copy.trainingDetail.link3}</Link>
            </div>
            <article className="content-card content-card--large">
              <h3>{copy.trainingDetail.heading2}</h3>
              <ul className="feature-list">
                {training.investment.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/contact" className="button primary inline-button">{copy.trainingDetail.link4}</Link>
            </article>
          </div>
        </section>
      ) : null}
    </main>
  );
}
