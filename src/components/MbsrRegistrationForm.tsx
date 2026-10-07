import { getSiteContent } from '@/lib/content';
export async function MbsrRegistrationForm() {
  const { copy, siteConfig } = await getSiteContent();
  return (
    <form
      className="registration-form"
      aria-describedby="registration-guidance registration-prototype-note"
    >
      <section className="form-section" aria-labelledby="registration-guidance-heading">
        <div className="form-section-header">
          <p className="eyebrow">{copy.registrationForm.paragraph1}</p>
          <h2 id="registration-guidance-heading">{copy.registrationForm.heading1}</h2>
        </div>
        <div id="registration-guidance" className="privacy-copy">
          <p>{copy.registrationForm.paragraph2}</p>
          <p>{copy.registrationForm.paragraph3}</p>
        </div>
      </section>

      <section className="form-section" aria-labelledby="personal-details-heading">
        <div className="form-section-header">
          <p className="eyebrow">{copy.registrationForm.paragraph4}</p>
          <h2 id="personal-details-heading">{copy.registrationForm.heading2}</h2>
          <p>{copy.registrationForm.paragraph5}</p>
        </div>

        <div className="registration-fields">
          <label className="field-wide">{copy.registrationForm.label1}<input type="text" name="naam" autoComplete="name" placeholder={copy.registrationForm.placeholder1} />
          </label>
          <label>{copy.registrationForm.label2}<input
              type="email"
              name="email"
              autoComplete="email"
              placeholder={copy.registrationForm.placeholder2}
            />
          </label>
          <label>{copy.registrationForm.label3}<input type="tel" name="telefoon" autoComplete="tel" placeholder={copy.registrationForm.placeholder3} />
          </label>
          <label className="field-wide">{copy.registrationForm.label4}<input type="text" name="adres" autoComplete="street-address" />
          </label>
          <label>{copy.registrationForm.label5}<input type="date" name="startdatum" />
          </label>
        </div>
      </section>

      <section className="form-section" aria-labelledby="participation-heading">
        <div className="form-section-header">
          <p className="eyebrow">{copy.registrationForm.paragraph6}</p>
          <h2 id="participation-heading">{copy.registrationForm.heading3}</h2>
          <p>{copy.registrationForm.paragraph7}</p>
        </div>

        <div className="question-list">
          <fieldset className="form-question">
            <legend>
              <span>{copy.registrationForm.label6}</span>{copy.registrationForm.question1}</legend>
            <p className="form-question-help">{copy.registrationForm.paragraph8}</p>
            <textarea name="reden-deelname" rows={6} />
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>{copy.registrationForm.label7}</span>{copy.registrationForm.question2}</legend>
            <div className="choice-group">
              <label className="choice-option">
                <input type="radio" name="alle-bijeenkomsten" value="ja" />{copy.registrationForm.label8}</label>
              <label className="choice-option">
                <input type="radio" name="alle-bijeenkomsten" value="nee" />{copy.registrationForm.label9}</label>
            </div>
            <label className="follow-up-field">{copy.registrationForm.label10}<textarea name="afwezige-bijeenkomsten" rows={3} />
            </label>
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>{copy.registrationForm.label11}</span>{copy.registrationForm.question3}</legend>
            <div className="choice-group">
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="website" />{copy.registrationForm.label12}</label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="social-media" />{copy.registrationForm.label13}</label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="omgeving" />{copy.registrationForm.label14}</label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="andere-organisatie" />{copy.registrationForm.label15}</label>
              <label className="choice-option">
                <input type="radio" name="training-gevonden" value="anders" />{copy.registrationForm.label16}</label>
            </div>
            <label className="follow-up-field">{copy.registrationForm.label17}<input type="text" name="training-gevonden-anders" />
            </label>
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>{copy.registrationForm.label18}</span>{copy.registrationForm.question4}</legend>
            <div className="choice-group">
              <label className="choice-option">
                <input type="radio" name="dagelijks-oefenen" value="ja" />{copy.registrationForm.label19}</label>
              <label className="choice-option">
                <input type="radio" name="dagelijks-oefenen" value="nee" />{copy.registrationForm.label20}</label>
              <label className="choice-option">
                <input type="radio" name="dagelijks-oefenen" value="bespreken-tijdens-intake" />{copy.registrationForm.label21}</label>
            </div>
          </fieldset>

          <fieldset className="form-question">
            <legend>
              <span>{copy.registrationForm.label22}</span>{copy.registrationForm.question5}</legend>
            <textarea name="vragen-of-opmerkingen" rows={6} />
          </fieldset>
        </div>
      </section>

      <section className="form-section" aria-labelledby="privacy-heading">
        <div className="form-section-header">
          <p className="eyebrow">{copy.registrationForm.paragraph9}</p>
          <h2 id="privacy-heading">{copy.registrationForm.heading4}</h2>
        </div>
        <div className="privacy-copy">
          <p>{copy.registrationForm.paragraph10}</p>
          <p>{copy.registrationForm.paragraph11}</p>
          <p>{copy.registrationForm.paragraph12}</p>
        </div>
      </section>

      <div className="form-submit-panel">
        <div>
          <h2>{copy.registrationForm.heading5}</h2>
          <p id="registration-prototype-note" className="form-note">{copy.registrationForm.paragraph13.replace('{email}', siteConfig.email)}</p>
        </div>
        <button type="button" className="button primary" disabled>{copy.registrationForm.button1}</button>
      </div>
    </form>
  );
}
