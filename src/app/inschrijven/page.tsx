import type { Metadata } from 'next';
import { MbsrRegistrationForm } from '@/components/MbsrRegistrationForm';
import { SectionTitle } from '@/components/SectionTitle';

export const metadata: Metadata = {
  title: 'Inschrijven MBSR-training | Marijn met aandacht',
  description:
    'Inschrijfformulier voor de MBSR-training van Marijn met aandacht.',
};

export default function RegistrationPage() {
  return (
    <main>
      <section className="section page-hero registration-hero">
        <div className="container narrow">
          <SectionTitle
            eyebrow="MBSR-training"
            title="Inschrijfformulier"
            text="Vul het formulier in ter voorbereiding op het persoonlijke intakegesprek. Deze versie is bedoeld om de inhoud en vormgeving te bekijken."
            align="center"
          />
        </div>
      </section>

      <section className="section registration-section">
        <div className="container registration-container">
          <MbsrRegistrationForm />
        </div>
      </section>
    </main>
  );
}
