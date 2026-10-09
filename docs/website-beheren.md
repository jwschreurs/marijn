# Website beheren via Vercel

De beheerpagina staat op /beheer. Website en beheer draaien op Vercel; teksten staan in een Neon Postgres-database die je via Vercel Storage koppelt. Er is één beheerderswachtwoord. Supabase of een apart CMS is niet nodig.

## Eenmalig inrichten

1. Open het websiteproject in Vercel. Ga naar **Storage** en kies **Create Database** / de Marketplace. Kies **Neon** en een passende regio, bijvoorbeeld Frankfurt. Controleer het aangeboden abonnement voordat je het activeert.
2. Verbind de database met het websiteproject. De integratie stelt DATABASE_URL beschikbaar. Gebruik voor productie de productie-database. Koppel test- of previewdeployments aan een afzonderlijke database als je daarin wilt testen.
3. Open vanuit Vercel Storage de Neon-console en de **SQL Editor**. Voer het volledige bestand database/setup.sql uit. Het script is opnieuw uitvoerbaar en overschrijft bestaande teksten niet.
4. Open een terminal in dit project en voer uit: npm run beheer:wachtwoord. Kies en herhaal een wachtwoord van minimaal 14 tekens. De invoer blijft verborgen.
5. Kopieer de getoonde hash naar Vercel → project → **Settings → Environment Variables**, met de naam ADMIN_PASSWORD_HASH. Gebruik de volledige waarde vanaf scrypt:. Het gewone wachtwoord komt niet in de broncode of database.
6. Deploy deze code eenmalig met DATABASE_URL en ADMIN_PASSWORD_HASH ingesteld.
7. Open je website op /beheer, log in met het gekozen wachtwoord en probeer een kleine tekstwijziging. Controleer die in een nieuw tabblad en herstel de tekst desgewenst.

De database-URL en wachtwoordhash zijn alleen voor de server. Gebruik geen NEXT_PUBLIC_-prefix en commit geen .env-bestanden.

## Dagelijks gebruiken

- Kies een pagina of onderdeel. Je kunt ook in alle teksten zoeken.
- Pas een tekst aan. Bij **Bekijk je wijzigingen** kun je de huidige en nieuwe tekst vergelijken.
- Klik **Wijzigingen publiceren**. Wacht op de bevestiging.
- Open of ververs de website om de nieuwe tekst te zien. Hiervoor zijn geen build en deployment nodig.
- Log uit wanneer je klaar bent.

De sessie duurt acht uur. Wanneer je sessie verloopt, blijven je wijzigingen in het open beheervenster staan. Open de login via de foutmelding in een nieuw tabblad, log opnieuw in en probeer daarna te publiceren. Sluit of herlaad het oorspronkelijke venster niet voordat je wijzigingen zijn gepubliceerd.

Als een ander venster ondertussen publiceert, weigert het beheer een oudere versie te overschrijven. Kopieer je wijzigingen en herlaad het beheer om verder te werken met de nieuwste versie.

## Wat kun je aanpassen?

Teksten, koppen, knopteksten, menu-labels, afbeeldingsbeschrijvingen, contactgegevens, agenda-items, de bestaande trainingen, prijzen, planning, formulierteksten en zoekresultaatteksten. De opbouw, routes, afbeeldingen en het aantal trainingen en agenda-items blijven code. Voor zulke uitbreidingen is een deployment nodig.

Het contact- en inschrijfformulier kunnen via Microsoft 365 naar info@marijnmetaandacht.nl mailen. Hiervoor is een aparte eenmalige koppeling nodig; zie [Formulieren en e-mail](formulieren-mail.md). Inzendingen verschijnen in de mailbox; het beheer bevat geen inbox.

Waar de uitleg bij formulieren {email} bevat, vult de website automatisch het centrale contactadres in.

## Wachtwoord wijzigen of vergeten

Voer opnieuw npm run beheer:wachtwoord uit, vervang ADMIN_PASSWORD_HASH in Vercel en doe een nieuwe deployment zodat de server de nieuwe configuratie gebruikt. Alle sessies met het oude wachtwoord worden ongeldig. Alleen deze configuratiewijziging vereist een deployment; gewone tekstwijzigingen niet.

## Werking en onderhoud

- Huidige teksten in src/data/site.ts zijn de standaardinhoud. Stabiele veldnamen koppelen de inhoud aan de pagina's.
- De database bewaart alleen gepubliceerde wijzigingen. Nieuwe velden kunnen daardoor hun standaardtekst behouden na een deployment. Verander bestaande veldnamen niet zomaar.
- Elke pagina haalt de teksten tijdens het verzoek op; React deelt dezelfde uitlezing binnen dat verzoek. Er is geen inhoudssnapshot in de build.
- Publiceren gebruikt een atomische versiecontrole in Postgres en server-side veldvalidatie. Teksten worden door React ge-escaped; HTML invoeren verandert de paginaopbouw niet.
- Het wachtwoord is met scrypt gehasht. Sessiecookies zijn HttpOnly, SameSite=Strict en in productie Secure. Willekeurige sessietokens worden alleen gehasht opgeslagen. Elke publicatie controleert opnieuw de sessie. Postgres begrenst inlogpogingen over alle Vercel-instanties samen.
- Zonder DATABASE_URL blijft de oorspronkelijke website werken, met een melding op /beheer. Met een ingestelde maar onbereikbare database wordt geen verouderde standaardinhoud als actuele inhoud gepresenteerd.
- Ongepubliceerde wijzigingen staan alleen in het open browservenster. Gepubliceerde teksten staan blijvend in Postgres. Regel back-ups/herstel passend bij je gekozen Neon-abonnement.

## Validatie

npm run typecheck
npm run lint
npm run test
npm run build
npm run test:browser

De tests gebruiken lokale Postgres-uitvoering via PGlite voor opslaan, versieconflicten, sessieverloop, intrekking en inloglimieten. Ze gebruiken geen productiegegevens. De browsertest start de productiebuild met een tijdelijke testdatabase en controleert inloggen, publiceren zonder rebuild, versieconflicten, uitloggen en alle publieke pagina's op mobiel en desktop. Voer daarvoor eerst npm run build uit; Microsoft Edge moet lokaal geïnstalleerd zijn. Controleer na de echte koppeling ook inloggen, uitloggen en één tekstwijziging op de gedeployde website.

## Bronnen

- [Vercel Marketplace Storage](https://vercel.com/docs/marketplace-storage)
- [Neon via Vercel](https://vercel.com/marketplace/neon/neon)
