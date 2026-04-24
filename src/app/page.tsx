import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle } from '@/components/SectionTitle';
import { TrainingCard } from '@/components/TrainingCard';
import { TrainingInquiryForm } from '@/components/TrainingInquiryForm';
import { siteConfig, trainingen } from '@/data/site';

export default function HomePage() {
  return (
    <main>
      <section className="hero section section--tight">
        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">{siteConfig.tagline}</p>
            <h1>Rust, aandacht en ruimte om bewuster te leven en te werken.</h1>
            <p className="lead">
              Een moderne, zachte website-opzet op basis van het bestaande logo. Geschikt als
              informatieve bedrijfssite met trainingen, contact en een eenvoudige aanmelding.
            </p>
            <div className="hero-actions">
              <Link href="/trainingen" className="button primary">
                Bekijk trainingen
              </Link>
              <Link href="/contact" className="button secondary">
                Plan een kennismaking
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <Image
              src="/logo.png"
              alt="Logo van Marijn van der Lende"
              width={920}
              height={614}
              className="hero-logo"
              priority
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-column">
          <SectionTitle
            eyebrow="Over de website"
            title="Een rustige uitstraling die past bij het logo"
            text="De stijl van deze website is gebaseerd op de zachte tinten uit het logo: warm perzik, saliegroen, lichtgrijs en veel witruimte."
          />
          <div className="info-panel">
            <p>
              Deze versie is bewust eenvoudig gehouden. Zo blijft de website makkelijk te beheren,
              snel te laden en later eenvoudig uit te breiden met extra pagina&apos;s of een echte
              afspraakmodule.
            </p>
            <ul>
              <li>Homepage met duidelijke introductie</li>
              <li>Over-pagina voor werkwijze en achtergrond</li>
              <li>Trainingenoverzicht met detailpagina&apos;s</li>
              <li>Contactpagina en eenvoudige aanmelding</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <SectionTitle
            eyebrow="Trainingen"
            title="Aanbod in een overzichtelijke opzet"
            text="Hier kun je straks echte data, prijzen, locaties en extra uitleg invullen."
          />
          <div className="card-grid">
            {trainingen.map((training) => (
              <TrainingCard key={training.slug} training={training} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container quote-block">
          <p className="quote">
            “Aandacht brengt rust. Rust geeft ruimte. En in die ruimte ontstaat beweging.”
          </p>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container two-column form-layout">
          <div>
            <SectionTitle
              eyebrow="Kennismaken"
              title="Eenvoudig aanmelden voor een training of gesprek"
              text="Voor lage kosten is een formulier vaak slimmer dan direct een uitgebreide boekingsmodule."
            />
            <p className="muted">
              Alleen als bezoekers echt tijdsloten moeten kiezen, is het slim om later bijvoorbeeld
              Cal.com of Microsoft Bookings te koppelen.
            </p>
          </div>
          <TrainingInquiryForm />
        </div>
      </section>
    </main>
  );
}
