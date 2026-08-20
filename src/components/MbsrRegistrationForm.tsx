const participationQuestions = [
  {
    id: 'reden-deelname',
    number: 1,
    label: 'Kun je in het kort iets zeggen over je reden van deelname?',
    type: 'textarea',
  },
  {
    id: 'alle-bijeenkomsten',
    number: 2,
    label: 'Kun je aan alle bijeenkomsten deelnemen?',
    type: 'choice',
  },
  {
    id: 'training-gevonden',
    number: 3,
    label: 'Hoe heb je van deze training gehoord?',
    type: 'text',
  },
  {
    id: 'dagelijks-oefenen',
    number: 4,
    label: 'Ben je bereid om dagelijks 45 minuten te oefenen?',
    type: 'choice',
  },
] as const;

export function MbsrRegistrationForm() {
  return (
    <form className="registration-form" aria-describedby="registration-prototype-note">
      <section className="form-section" aria-labelledby="personal-details-heading">
        <div className="form-section-header">
          <p className="eyebrow">Stap 1</p>
          <h2 id="personal-details-heading">Persoonlijke gegevens</h2>
          <p>Vul hier de gegevens in die nodig zijn voor het kennismakings- en intakegesprek.</p>
        </div>

        <div className="registration-fields">
          <label className="field-wide">
            Naam
            <input type="text" name="naam" autoComplete="name" placeholder="Voor- en achternaam" />
          </label>
          <label>
            Geboortedatum
            <input type="date" name="geboortedatum" autoComplete="bday" />
          </label>
          <label>
            Telefoonnummer
            <input type="tel" name="telefoon" autoComplete="tel" placeholder="06 12 34 56 78" />
          </label>
          <label>
            E-mailadres
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="naam@voorbeeld.nl"
            />
          </label>
          <label>
            Beroep of functie
            <input type="text" name="beroep" autoComplete="organization-title" />
          </label>
          <label>
            Startdatum training
            <input type="date" name="startdatum" />
          </label>
        </div>
      </section>

      <section className="form-section" aria-labelledby="participation-heading">
        <div className="form-section-header">
          <p className="eyebrow">Stap 2</p>
          <h2 id="participation-heading">Over je deelname</h2>
          <p>Deze vragen helpen om het intakegesprek goed voor te bereiden.</p>
        </div>

        <div className="question-list">
          {participationQuestions.map((question) => (
            <fieldset className="form-question" key={question.id}>
              <legend>
                <span>Vraag {question.number}</span>
                {question.label}
              </legend>
              {question.type === 'textarea' ? (
                <textarea name={question.id} rows={5} />
              ) : question.type === 'choice' ? (
                <div className="choice-group">
                  <label className="choice-option">
                    <input type="radio" name={question.id} value="ja" />
                    Ja
                  </label>
                  <label className="choice-option">
                    <input type="radio" name={question.id} value="nee" />
                    Nee
                  </label>
                  <label className="choice-option">
                    <input type="radio" name={question.id} value="weet-ik-nog-niet" />
                    Weet ik nog niet
                  </label>
                </div>
              ) : (
                <input type="text" name={question.id} />
              )}
            </fieldset>
          ))}
        </div>
      </section>

      <section className="form-section" aria-labelledby="additional-heading">
        <div className="form-section-header">
          <p className="eyebrow">Tot slot</p>
          <h2 id="additional-heading">Aanvullende informatie</h2>
        </div>
        <label>
          Heb je nog vragen of opmerkingen die van belang zijn?
          <textarea name="vragen-of-opmerkingen" rows={6} />
        </label>
      </section>

      <div className="form-submit-panel">
        <div>
          <h2>Formulier gereedmaken</h2>
          <p id="registration-prototype-note" className="form-note">
            Dit is een ontwerpversie. Ingevulde gegevens worden nog niet opgeslagen of verzonden.
          </p>
        </div>
        <button type="button" className="button primary" disabled>
          Verzenden wordt later toegevoegd
        </button>
      </div>
    </form>
  );
}
