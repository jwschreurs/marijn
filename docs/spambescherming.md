# Spambescherming en ontvangstbevestigingen

Beide formulieren gebruiken Cloudflare Turnstile, naast het bestaande verborgen spamveld en de verzendlimieten. De ontvangstbevestiging aan de bezoeker gaat via de bestaande Microsoft 365-koppeling.

## Cloudflare instellen

1. Open [het Cloudflare-dashboard](https://dash.cloudflare.com/), kies **Turnstile** en voeg een widget toe.
2. Geef die de naam **Marijn websiteformulieren**.
3. Voeg **marijnmetaandacht.nl** en **www.marijnmetaandacht.nl** toe als hostnames.
4. Kies **Managed**. Pre-clearance is niet nodig voor deze formulieren.
5. Bewaar de **Site Key** en **Secret Key**.

Je website blijft op Vercel. Een DNS-verhuizing is niet nodig. Zie [Cloudflare: widget aanmaken](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/).

## Sleutels invullen vóór deployment

Vul in .env.local én in Vercel → project → Settings → Environment Variables → **Production** in:

~~~dotenv
TURNSTILE_SITE_KEY=de_site_key
TURNSTILE_SECRET_KEY=de_secret_key
~~~

De Site Key is openbaar en wordt door de server aan het formulier meegegeven. De Secret Key blijft op de server; gebruik hiervoor nooit een NEXT_PUBLIC_-naam. Deel de secret niet in de chat en commit .env.local niet.

De standaard toegestane hostnames zijn marijnmetaandacht.nl en www.marijnmetaandacht.nl. Voor lokale of previewtests gebruik je een afzonderlijke widget en stel je TURNSTILE_HOSTNAMES in op de exacte, door jou beheerde hostnamen, gescheiden door komma's. Voeg die hostnamen ook in Cloudflare toe. Gebruik geen wildcard voor alle vercel.app-sites. Officiële dummy-sleutels worden bij VERCEL_ENV=production geweigerd.

Vervolgens commit, push, merge en deploy je de nieuwe code. Zonder geldige instellingen staat het formulier uit met een rechtstreeks e-mailadres als alternatief. **Deploy deze wijziging dus pas nadat de twee sleutels in Vercel staan.** Een nieuwe database-migratie of Microsoft-app is niet nodig.

## Wat de bescherming doet

De website valideert ieder token op de server bij Cloudflare, inclusief de hostname en het formulierdoel. Cloudflare-tokens zijn eenmalig bruikbaar en verlopen na vijf minuten. Een ongeldig, verlopen of ontbrekend token, of een fout bij Cloudflare, leidt niet tot een e-mail. Een verlopen controle kan opnieuw worden doorlopen zonder verlies van invoer. [Cloudflare: servervalidatie](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

Daarnaast gelden vijf pogingen per IP per uur en vijftig totaal per uur. De bezoeker kan geen ontvanger voor de mail aan Marijn instellen. Geen enkele botcontrole sluit alle handmatige spam uit.

## Bevestigingsmail

- Marijn ontvangt eerst de volledige aanvraag. Alleen na acceptatie door Microsoft wordt een ontvangstbevestiging aan de bezoeker geprobeerd.
- De bezoeker krijgt vaste Nederlandse tekst, zonder ingevulde naam, antwoorden, berichten of links uit het formulier.
- Bij een inschrijving staat expliciet dat deelname nog niet definitief is.
- Antwoorden op de bevestiging gaan naar info@marijnmetaandacht.nl.
- Maximaal één bevestigingspoging per e-mailadres per uur, gezamenlijk voor beide formulieren. Het adres wordt voor de teller met HMAC gehasht. Een volgende geldige aanvraag bereikt Marijn nog steeds.
- Naar het eigen info-adres wordt geen extra bevestiging gestuurd.
- Als de bevestiging faalt of wordt begrensd, blijft de aanvraag geslaagd. De pagina meldt dat een aparte bevestiging niet is verstuurd of niet kon worden bevestigd.
- Er zijn geen automatische retries. Een bevestigingsfout kan daardoor geen tweede aanvraag naar Marijn veroorzaken.

De vaste mailteksten staan in formConfirmationCopy in src/data/site.ts. Ze zijn niet door de bezoeker beïnvloedbaar en staan niet in het tekstbeheer.

## Controleren na deployment

Gebruik je eigen bezoekersadres, verschillend van het info-adres. Test zelf één contactaanvraag en één inschrijving. Controleer de pagina, de mail aan Marijn en de ontvangstbevestiging. Bij hetzelfde e-mailadres binnen een uur is alleen de eerste bevestiging te verwachten. Controleer eventueel de spammap. Test ook op een telefoon.

De lokale tests onderscheppen Cloudflare en Microsoft en versturen geen echte e-mails. Ze controleren geldige en ongeldige tokens, verlopen controles, invoerbehoud, bevestigingsfouten en limieten. De echte widget en daadwerkelijke bezorging moeten na het invullen van de sleutels nog worden gecontroleerd.

## Opmaak van de spamcontrole

De controle staat in een rustig vlak met een saliegroen icoon. Turnstile gebruikt het lichte thema en toont het compacte Cloudflare-vak alleen wanneer interactie nodig is (`appearance: interaction-only`). De controle zelf loopt nog steeds automatisch; de servervalidatie blijft verplicht. De inhoud van het Cloudflare-iframe wordt niet met eigen CSS overschreven.
