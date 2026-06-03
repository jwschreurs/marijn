import { SectionTitle } from '@/components/SectionTitle';
import { agendaItems } from '@/data/site';

export default function AgendaPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Agenda"
            title="Geplande trainingen en bijeenkomsten"
            text="Hier kun je toekomstige data, locaties en praktische informatie plaatsen. Voor nu is de agenda ingericht als rustige startpagina met voorbeelditems."
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
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
