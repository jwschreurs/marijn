import { SectionTitle } from '@/components/SectionTitle';
import Link from 'next/link';

export default function MindfulnessPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Mindfulness"
            title="Bewust aanwezig zijn, met vriendelijke aandacht"
            text="Mindfulness helpt je om op te merken wat er in het moment gebeurt. In je lichaam, in je gedachten en in je reactie op de wereld om je heen."
            align="center"
          />
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column">
          <div className="content-card content-card--large">
            <h2>Wat is mindfulness?</h2>
            <p>
              Mindfulness is het trainen van aandacht. Je leert bewust stil te staan bij wat je
              ervaart, zonder daar direct iets van te moeten vinden of oplossen. Dat geeft ruimte om
              anders om te gaan met stress, spanning, gedachten en emoties.
            </p>
            <p>
              Het doel is niet om altijd ontspannen te zijn. Het gaat juist om leren aanwezig zijn
              bij wat er is, zodat je bewuster keuzes kunt maken.
            </p>
          </div>
          <div className="content-card content-card--large">
            <h2>Wat kan het brengen?</h2>
            <ul className="feature-list">
              <li>Meer rust in je hoofd en lichaam</li>
              <li>Beter herkennen van stresssignalen</li>
              <li>Meer focus en aandacht</li>
              <li>Bewuster omgaan met grenzen</li>
              <li>Meer mildheid naar jezelf en anderen</li>
            </ul>
            <Link href="/trainingen" className="button primary inline-button">
              Bekijk de trainingen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
