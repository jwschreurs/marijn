import { SectionTitle } from '@/components/SectionTitle';

export default function OverMarijnPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Over Marijn"
            title="Een rustige en persoonlijke benadering"
            text="Gebruik deze pagina om iets te vertellen over achtergrond, visie, werkwijze en ervaring."
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <div className="content-card">
            <h2>Visie</h2>
            <p>
              Mindfulness kan helpen om meer rust, helderheid en aandacht te ervaren in werk en
              dagelijks leven. Vanuit een zachte en professionele aanpak ontstaat ruimte om bewuster
              keuzes te maken.
            </p>
          </div>
          <div className="content-card">
            <h2>Werkwijze</h2>
            <p>
              De begeleiding is praktisch, toegankelijk en afgestemd op de vraag van de deelnemer of
              organisatie. Geen overdaad aan theorie, maar oefeningen en inzichten die direct
              toepasbaar zijn.
            </p>
          </div>
          <div className="content-card">
            <h2>Voor wie</h2>
            <p>
              Voor mensen die op zoek zijn naar meer balans, meer focus of meer rust. Ook geschikt
              voor teams en organisaties die aandacht willen geven aan welzijn, werkdruk en
              veerkracht.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
