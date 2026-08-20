export function MbsrRegistrationForm() {
  return (
    <form
      className="registration-form"
      aria-describedby="registration-guidance registration-prototype-note"
    >
      <section className="form-section" aria-labelledby="registration-guidance-heading">
        <div className="form-section-header">
          <p className="eyebrow">Vooraf</p>
          <h2 id="registration-guidance-heading">Aanmelding en voorbereiding intakegesprek</h2>
        </div>
        <div id="registration-guidance" className="privacy-copy">
          <p>
            Dit formulier is bedoeld om je inschrijving voor de MBSR-training voor te bereiden en
            om het persoonlijke intakegesprek goed te kunnen voeren.
          </p>
          <p>
            Vul alleen de gevraagde informatie in. Vermeld geen medische diagnoses,
            psychologische klachten, informatie over behandelingen of andere uitgebreide
            gezondheidsinformatie. Als je denkt dat zulke informatie relevant is voor je deelname,
            kunnen we dit tijdens het intakegesprek persoonlijk bespreken.
          </p>
        </div>
      </section>

      <section className="form-section" aria-labelledby="personal-details-heading">
        <div className="form-section-header">
          <p className="eyebrow">Stap 1</p>
          <h2 id="personal-details-heading">Persoonlijke gegevens</h2>
          <p>Vul hier de gegevens in die nodig zijn om je inschrijving voor te bereiden.</p>
        </div>

        <div className="registration-fields">
          <label className="field-wide">
            Naam
            <input type="text" name="naam" autoComplete="name" placeholder="Voor- en achternaam" />
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
            Telefoonnummer
            <input type="tel" name="telefoon" autoComplete="tel" placeholder="06 12 34 56 78" />
          </label>
          <label className="field-wide">
            Adres
            <input type="text" name="adres" autoComplete="street-address" />
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
          <fieldset className="form-question">
            <legend>
              <span>Vraag 1</span>
              Wat maakt dat je aan deze MBSR-training wilt deelnemen?
            </legend>
            <p className="form-question-help">
              Beschrijf kort wat je aanspreekt in de training of wat je hoopt dat de training je
              brengt. Vermeld hier liever geen medische of psychologische informatie.
            </p>
            <textarea name="reden-deelname" rows={6} />
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>Vraag 2</span>
              Kun je bij alle bijeenkomsten aanwezig zijn?
            </legend>
            <div className="choice-group">
              <label className="choice-option">
                <input type="radio" name="alle-bijeenkomsten" value="ja" />
                Ja
              </label>
              <label className="choice-option">
                <input type="radio" name="alle-bijeenkomsten" value="nee" />
                Nee
              </label>
            </div>
            <label className="follow-up-field">
              Zo nee, welke bijeenkomst(en) kun je naar verwachting niet bijwonen?
              <textarea name="afwezige-bijeenkomsten" rows={3} />
            </label>
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>Vraag 3</span>
              Hoe heb je van deze MBSR-training gehoord?
            </legend>
            <div className="choice-group">
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="website" />
                Via de website
              </label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="social-media" />
                Via social media
              </label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="omgeving" />
                Via iemand uit mijn omgeving
              </label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="andere-organisatie" />
                Via een andere website of organisatie
              </label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="anders" />
                Anders
              </label>
            </div>
            <label className="follow-up-field">
              Anders, namelijk
              <input type="text" name="training-gevonden-anders" />
            </label>
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>Vraag 4</span>
              Ben je bereid om gedurende de training dagelijks ongeveer 45 minuten te oefenen?
            </legend>
            <div className="choice-group">
              <label className="choice-option">
                <input type="radio" name="dagelijks-oefenen" value="ja" />
                Ja
              </label>
              <label className="choice-option">
                <input type="radio" name="dagelijks-oefenen" value="nee" />
                Nee
              </label>
              <label className="choice-option">
                <input type="radio" name="dagelijks-oefenen" value="bespreken-tijdens-intake" />
                Ik wil dit graag tijdens het intakegesprek bespreken
              </label>
            </div>
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>Vraag 8</span>
              Heb je nog vragen of opmerkingen die je voorafgaand aan de training wilt bespreken?
            </legend>
            <textarea name="vragen-of-opmerkingen" rows={6} />
          </fieldset>
        </div>
      </section>

      <section className="form-section" aria-labelledby="privacy-heading">
        <div className="form-section-header">
          <p className="eyebrow">Privacy</p>
          <h2 id="privacy-heading">Privacy en verwerking van je gegevens</h2>
        </div>
        <div className="privacy-copy">
          <p>
            Dit formulier bevat persoonsgegevens. Deze gegevens worden uitsluitend gebruikt voor
            het voorbereiden, organiseren en uitvoeren van de MBSR-training en voor de bijbehorende
            administratie.
          </p>
          <p>
            Neem in dit formulier geen medische diagnoses, psychologische klachten, informatie over
            behandelingen of andere gevoelige gezondheidsinformatie op. Als zulke informatie
            relevant is voor je deelname, bespreken we die tijdens het intakegesprek.
          </p>
          <p>
            Je persoonsgegevens worden zorgvuldig behandeld en niet langer bewaard dan
            noodzakelijk. Gegevens die onderdeel zijn van de wettelijke financiële administratie
            kunnen vanwege wettelijke bewaarplichten langer worden bewaard.
          </p>
        </div>
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
