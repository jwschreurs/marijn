import { getSiteContent } from '@/lib/content';
import { SectionTitle } from '@/components/SectionTitle';
import Link from 'next/link';

export default async function AgendaPage() {
  const { copy, agendaItems } = await getSiteContent();
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow={copy.agenda.eyebrow1}
            title={copy.agenda.title1}
            text={copy.agenda.text1}
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container agenda-list">
          {agendaItems.map((item, index) => (
            <article key={item.title} className="agenda-card">
              <div>
                <p className="card-meta">{item.date}</p>
                <h2>{item.title}</h2>
                <p className="card-target">{item.location}</p>
              </div>
              <div>
                <p>{item.description}</p>
                {index === 0 ? (
                  <Link href="/trainingen/mindfulness-basistraining" className="text-link">{copy.agenda.link1}</Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
