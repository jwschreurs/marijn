import { SectionTitle } from '@/components/SectionTitle';
import Link from 'next/link';

export default function MindfulnessPage() {
  return (
    <main>
      <section className="section page-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="Mindfulness"
            title="Wat is mindfulness?"
            text="Mindfulness helpt je automatische patronen te herkennen en bewuster om te gaan met wat je denkt, voelt en lichamelijk ervaart."
            align="center"
          />
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>Leven op de automatische piloot</h2>
            <p>
              Veel mensen leven een groot deel van de dag op de automatische piloot. We zijn bezig
              met wat er nog moet gebeuren, denken na over wat al geweest is of reageren automatisch
              op situaties zonder dat we ons daarvan bewust zijn. Dat is heel menselijk. Ons brein
              is voortdurend bezig om ons veilig te houden, problemen op te lossen en vooruit te
              denken.
            </p>
            <p>
              Soms helpt dat ons. Soms werkt het juist tegen ons. Misschien blijf je piekeren terwijl
              je wilt slapen, raak je sneller geïrriteerd onder druk of merk je pas hoe moe je bent
              wanneer je lichaam aan de bel trekt.
            </p>
            <p>
              Mindfulness helpt je deze patronen te herkennen. Niet om gedachten of gevoelens weg
              te krijgen, maar om er met meer aandacht en minder automatisch mee om te gaan. Zo
              ontstaat ruimte voor keuzes die beter aansluiten bij wat voor jou belangrijk is.
            </p>
          </article>
          <article className="content-card content-card--large">
            <h2>Wat betekent mindfulness?</h2>
            <p>
              Mindfulness betekent met aandacht aanwezig zijn bij wat er op dit moment gebeurt. Dat
              geldt voor wat je denkt, voelt en lichamelijk ervaart, maar ook voor wat er om je heen
              gebeurt.
            </p>
            <p>
              Daarbij oefen je een open, nieuwsgierige en niet-oordelende houding. Je hoeft
              ervaringen niet direct te veranderen of op te lossen. Juist door eerst op te merken
              wat er is, ontstaat vaak meer inzicht, rust en keuzevrijheid.
            </p>
            <p>
              Mindfulness gaat niet over positief denken of alles accepteren zoals het is. Het gaat
              over bewust aanwezig zijn, zodat je kunt kiezen hoe je met een situatie om wilt gaan.
            </p>
          </article>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column">
          <div>
            <SectionTitle
              eyebrow="Mogelijke effecten"
              title="Wat kan mindfulness je brengen?"
              text="Iedereen beoefent mindfulness vanuit een eigen aanleiding. Door regelmatig te oefenen kun je veranderingen opmerken in hoe je met stress, gedachten en gevoelens omgaat."
              headingLevel="h2"
            />
            <p className="muted">
              Mindfulness neemt moeilijke situaties niet weg. Wel kan het je helpen er met meer
              mildheid, bewustzijn en veerkracht mee om te gaan.
            </p>
          </div>
          <article className="content-card content-card--large">
            <ul className="feature-list">
              <li>Stresssignalen eerder herkennen</li>
              <li>Minder worden meegesleept door piekergedachten</li>
              <li>Bewuster reageren in plaats van automatisch</li>
              <li>Meer contact ervaren met je lichaam</li>
              <li>Beter omgaan met lastige gevoelens</li>
              <li>Meer rust, aandacht en balans ervaren in het dagelijks leven</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <article className="content-card content-card--large">
            <h2>Hoe leer je mindfulness?</h2>
            <p>
              Mindfulness is geen theorie, maar een vaardigheid die je ontwikkelt door te oefenen.
              Tijdens de 8-weekse Mindfulness Based Stress Reduction-training wisselen uitleg,
              meditatieoefeningen, beweging en reflectie elkaar af.
            </p>
            <p>
              Je leert stap voor stap hoe je mindfulness kunt toepassen in je dagelijks leven en
              oefent ook thuis tussen de bijeenkomsten door. Veel deelnemers merken dat regelmatig
              oefenen ervoor zorgt dat mindfulness steeds meer een vanzelfsprekend onderdeel van
              hun leven wordt.
            </p>
          </article>
          <article className="content-card content-card--large">
            <h2>Waarom een MBSR-training?</h2>
            <p>
              De MBSR-training is ontwikkeld door Jon Kabat-Zinn en is wereldwijd een van de meest
              onderzochte en toegepaste mindfulnesstrainingen. De training combineert eeuwenoude
              mindfulnessoefeningen met inzichten uit de moderne wetenschap en psychologie.
            </p>
            <p>
              De focus ligt niet alleen op het verminderen van stress, maar ook op het ontwikkelen
              van meer bewustzijn, veerkracht en een andere manier van omgaan met de uitdagingen die
              het leven met zich meebrengt.
            </p>
            <Link href="/trainingen/mindfulness-basistraining" className="button primary inline-button">
              Bekijk de MBSR-training
            </Link>
          </article>
        </div>
      </section>

      <section className="section soft-section" id="vergoeding">
        <div className="container narrow detail-stack">
          <SectionTitle
            eyebrow="Praktische informatie"
            title="Vergoeding van een mindfulnesstraining"
            text="Bij sommige zorgverzekeraars is een gedeeltelijke vergoeding van een 8-weekse MBSR-training mogelijk vanuit de aanvullende verzekering."
            headingLevel="h2"
          />
          <article className="content-card content-card--large">
            <p>
              De hoogte en voorwaarden verschillen per zorgverzekeraar en aanvullend pakket. Een
              verzekeraar kan aanvullende voorwaarden stellen, zoals een verwijzing van de huisarts,
              registratie van de trainer of een AGB-code op de factuur.
            </p>
            <p>
              Ook buiten de zorgverzekering zijn soms mogelijkheden. Denk aan een bijdrage van je
              werkgever, een opleidings- of vitaliteitsbudget, een arbodienst, het UWV of de
              gemeente.
            </p>
            <p>
              Ik ben aangesloten bij de VMBN (Vereniging Mindfulness Based Trainers Nederland) en
              ingeschreven in het Mindfulness Register (SMR). Ook beschik ik over een AGB-code. Als
              jouw verzekeraar deze als voorwaarde stelt, wordt de code op de factuur vermeld.
            </p>
            <p>
              Voorwaarden kunnen veranderen. Neem daarom altijd vooraf contact op met je eigen
              zorgverzekeraar of werkgever.
            </p>
            <div className="resource-links" aria-label="Meer informatie over vergoedingen">
              <a href="https://www.vmbn.nl/over-mindfulness/vergoedingsmogelijkheden/" target="_blank" rel="noreferrer">
                Vergoedingsmogelijkheden bij de VMBN
              </a>
              <a href="https://www.zorgwijzer.nl/vergoeding/mindfulness" target="_blank" rel="noreferrer">
                Vergoedingen per verzekeraar bij Zorgwijzer
              </a>
              <a href="https://www.zorgverzekering.info/mindfulness/" target="_blank" rel="noreferrer">
                Zorgverzekering.info
              </a>
            </div>
            <Link href="/contact" className="button secondary inline-button">
              Vraag naar de mogelijkheden
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
