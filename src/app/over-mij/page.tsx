import { SectionTitle } from '@/components/SectionTitle';

export default function OverMijPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Over mij"
            title="Welkom! Mijn naam is Marijn van der Lende"
            text="Ik ben mindfulnesstrainer en GGZ-agoog."
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>Even voorstellen</h2>
            <p>
              Ik woon in Winterswijk, in de Achterhoek, samen met mijn drie katten. In mijn vrije
              tijd geniet ik van wandelen, de natuur, lekker eten en tijd doorbrengen met vrienden.
              Ik geloof in de waarde van vertragen en aandacht hebben voor de kleine dingen die
              vaak vanzelfsprekend lijken.
            </p>
          </article>
          <article className="content-card content-card--large">
            <h2>Ervaring in de geestelijke gezondheidszorg</h2>
            <p>
              Sinds 2013 werk ik in de geestelijke gezondheidszorg. In mijn werk heb ik veel mensen
              begeleid die vast zijn gelopen door stress, ingrijpende gebeurtenissen of psychische
              klachten. Juist daar zag ik hoe gemakkelijk we het contact met onszelf kunnen
              verliezen.
            </p>
          </article>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>Mijn weg naar mindfulness</h2>
            <p>
              Ook in mijn eigen leven heb ik ervaren hoe snel je op de automatische piloot terecht
              kunt komen. Mindfulness helpt mij om opnieuw stil te staan, beter te luisteren naar
              mijn lichaam en met meer aandacht aanwezig te zijn in het moment.
            </p>
            <p>
              Niet omdat het leven daardoor makkelijker is, maar omdat er meer ruimte ontstaat om
              bewust te kiezen hoe je met jezelf en met moeilijke situaties omgaat.
            </p>
          </article>
          <article className="content-card content-card--large">
            <h2>Opleiding en achtergrond</h2>
            <p>
              Die ervaring, gecombineerd met mijn achtergrond in de geestelijke
              gezondheidszorg, heeft ertoe geleid dat ik de postacademische opleiding tot
              mindfulnesstrainer (MBSR/MBCT) aan het Radboudumc Expertisecentrum voor Mindfulness
              heb gevolgd.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <article className="content-card content-card--large">
            <h2>Mijn manier van begeleiden</h2>
            <p>
              In mijn trainingen vind ik het belangrijk dat je jezelf niets hoeft te bewijzen.
              Mindfulness gaat voor mij niet over ontspannen of ‘je hoofd leegmaken’. Het gaat over
              leren aanwezig zijn bij wat er op dit moment is, met een open en nieuwsgierige
              houding. Van daaruit ontstaat vaak meer rust, inzicht en keuzevrijheid.
            </p>
            <p>
              Ik begeleid je met aandacht, zonder oordeel en in een veilige omgeving waarin ruimte
              is voor jouw eigen ervaring.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
