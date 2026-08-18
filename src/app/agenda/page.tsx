import { SectionTitle } from '@/components/SectionTitle';
import { agendaItems } from '@/data/site';
import Link from 'next/link';

export default function AgendaPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Agenda"
            title="Geplande trainingen en bijeenkomsten"
            text="Bekijk wanneer trainingen starten en welke bijeenkomsten op aanvraag beschikbaar zijn. Op de trainingspagina vind je alle praktische details."
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container agenda-list">
          {agendaItems.map((item) => (
            <article key={item.title} className="agenda-card">
              <div>
                <p className="card-meta">{item.date}</p>
                <h2>{item.title}</h2>
                <p className="card-target">{item.location}</p>
              </div>
              <div>
                <p>{item.description}</p>
                {item.title.includes('Stress Reduction') ? (
                  <Link href="/trainingen/mindfulness-basistraining" className="text-link">
                    Bekijk planning en investering
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
