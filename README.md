# Marijn met aandacht

Nederlandstalige website voor mindfulness, trainingen en begeleiding, gebouwd met Next.js, React en TypeScript.

## Lokaal draaien

Vereist Node.js 20.9 of nieuwer.

```bash
npm install
npm run dev
```

Open daarna [http://localhost:3000](http://localhost:3000).

## Controles

```bash
npm run typecheck
npm run lint
npm run build
```

## Wat is aangepast in v2

- Header met logo op alle pagina's
- Meerdere pagina's toegevoegd
- Training detailpagina's toegevoegd
- Contactpagina toegevoegd
- Nieuwere Next.js en React versies
- TypeScript- en ESLint-controles toegevoegd

## Pagina's

- /
- /over-marijn
- /trainingen
- /trainingen/mindfulness-basistraining
- /trainingen/workshop-voor-teams
- /trainingen/individuele-begeleiding
- /contact

## Deployment

De applicatie is geschikt voor deployment op Vercel. Koppel de GitHub-repository aan een Vercel-project; pushes naar de gekozen productiebranch kunnen vervolgens automatisch worden uitgerold.

## Teksten beheren

Via /beheer kun je na eenmalige inrichting inloggen en websiteteksten publiceren zonder nieuwe build. Het beheer gebruikt Neon via Vercel Storage. Zie [de inrichtings- en gebruikshandleiding](docs/website-beheren.md).

Extra scripts: npm run beheer:wachtwoord voor het instellen van het beheerderswachtwoord en npm run test voor de inhouds-, wachtwoord- en database-integratietests.

### Veelgestelde vragen en blog

De pagina's `/faq` en `/blog` staan in het hoofdmenu. Kies in `/beheer` bij **Pagina of onderdeel** voor **Veelgestelde vragen** of **Blog**. Hier kun je ook de inleiding en vaste teksten aanpassen.

- Gebruik **Vraag toevoegen** om een vraag en antwoord toe te voegen. Met **Omhoog** wijzig je de volgorde.
- Gebruik **Blogbericht toevoegen** voor een artikel. Vul een titel, een uniek webadres, datum, samenvatting en artikeltekst in. Selecteer tekst en gebruik de knoppen voor **Vet**, **Cursief**, tussenkoppen, opsommingen, genummerde lijsten en links. Enter begint een nieuwe alinea; Shift+Enter maakt een nieuwe regel. **Opmaak wissen** verwijdert opmaak van de selectie. **Ongedaan maken** en **Opnieuw** werken tijdens het bewerken.
- Ondersteunde opmaak uit geplakte tekst wordt meegenomen. Afbeeldingen, lettertypen, kleuren en tabellen worden niet overgenomen. Via **Voorbeeld van het artikel** zie je de opmaak voor de website. Bij **Link** kun je een geselecteerde tekst koppelen aan een volledig webadres of een intern pad zoals `/contact`; zonder geselecteerde tekst wordt het adres zelf ingevoegd. Titel en samenvatting blijven gewone tekst.
- Bestaande artikelen blijven leesbaar en bewerkbaar; er is geen databasemigratie nodig. De editor bewaart nieuwe opmaak als gevalideerde documentgegevens naast de gewone tekst. De publieke pagina zet die om in toegestane React-elementen, zonder opgeslagen HTML uit te voeren. De editor gebruikt [Tiptap](https://tiptap.dev/docs/editor/getting-started/install/nextjs) uitsluitend in het beheer.
- Een blogbericht begint als **Concept**. Klik op **Wijzigingen publiceren** om het concept op te slaan; het blijft verborgen op de website. Kies **Gepubliceerd** en klik opnieuw op die knop om het zichtbaar te maken op `/blog` en `/blog/het-gekozen-webadres`.
- De datum bepaalt de volgorde (nieuwste eerst). Dit is geen geplande publicatie. Verander een gedeeld webadres niet: er wordt geen doorverwijzing aangemaakt.
- Verwijderen wordt pas definitief na **Wijzigingen publiceren**. Een verwijderd of teruggezet conceptartikel is niet meer publiek bereikbaar.

De inhoud gebruikt de bestaande database, login en versiecontrole; er is geen aanvullende database-inrichting nodig. Per onderdeel zijn maximaal 100 items mogelijk; de bestaande totale opslaglimiet per publicatie blijft 200 kB. Voor de eerste introductie van deze functionaliteit is wel een nieuwe deployment nodig. Daarna vereisen inhoudswijzigingen geen nieuwe build.

## Formulieren versturen

Contactaanvragen en MBSR-aanmeldingen worden via Microsoft 365 gemaild. Zie [de installatiehandleiding](docs/formulieren-mail.md) voor de Microsoft-koppeling, database-aanvulling, Vercel-instellingen en oplevercontrole.

Voor automatische ontvangstbevestigingen en de verplichte botcontrole: [spambescherming instellen](docs/spambescherming.md). Zet de Turnstile-sleutels vóór deployment in Vercel.
