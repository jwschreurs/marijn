import { SectionTitle } from '@/components/SectionTitle';

export default function OverMijPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Over mij"
            title="Aandacht voor wie jij bent en wat jij nodig hebt"
            text="Op deze pagina kun je meer vertellen over Marijn, haar achtergrond, ervaring en manier van werken. De tekst is bewust persoonlijk en rustig gehouden."
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container content-grid">
          <div className="content-card">
            <h2>Mijn benadering</h2>
            <p>
              Ik werk vanuit rust, aandacht en vertrouwen. Niet door harder te duwen, maar door
              samen te kijken wat er speelt en wat nodig is om meer ruimte te ervaren. Mindfulness
              helpt om dichter bij jezelf te blijven, ook wanneer het druk of veeleisend is.
            </p>
          </div>
          <div className="content-card">
            <h2>Voor mens en werk</h2>
            <p>
              De begeleiding richt zich op mensen die bewuster willen leven en werken. Dat kan
              individueel zijn, maar ook binnen teams of organisaties waar aandacht voor welzijn,
              focus en veerkracht belangrijk is.
            </p>
          </div>
          <div className="content-card">
            <h2>Praktisch en toegankelijk</h2>
            <p>
              De trainingen zijn laagdrempelig en praktisch. Er is ruimte voor oefening, reflectie
              en persoonlijke vragen. Zo wordt mindfulness geen theorie, maar iets dat je kunt
              meenemen in je dagelijkse leven.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
