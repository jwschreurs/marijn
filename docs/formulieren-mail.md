# Formulieren per e-mail ontvangen

Het inschrijfformulier op /inschrijven en de contactformulieren op /contact en de trainingspagina's mailen hun inhoud naar **info@marijnmetaandacht.nl**. De bezoeker krijgt een bevestiging op de pagina. Een antwoord op de ontvangen e-mail is gericht aan de bezoeker.

Er wordt geen bezoekersmailbox benaderd. De website verstuurt via een eigen Microsoft-app; het gewone mailboxwachtwoord is niet nodig. Er gaat geen automatische bevestigingsmail naar de bezoeker.

## Eenmalig: Microsoft 365

Dit onderdeel vereist toegang tot Microsoft Entra en Exchange-beheer. Laat het zo nodig uitvoeren door de beheerder van de Microsoft 365-omgeving.

1. Open [Microsoft Entra](https://entra.microsoft.com). Maak bij **App registrations → New registration** een app **Marijn websiteformulieren** voor uitsluitend deze organisatie. Een redirect URI is niet nodig.
2. Bewaar de **Directory (tenant) ID** en **Application (client) ID**.
3. Maak onder **Certificates & secrets → Client secrets** een secret. Bewaar de **Value**, niet de Secret ID. Noteer de vervaldatum: vernieuw het secret vóór die datum.
4. Zoek dezelfde app onder **Enterprise applications** en noteer daar de **Object ID**. Dit is een andere ID dan de Object ID onder App registrations.

De app krijgt uitsluitend verzendrecht voor de gekozen mailbox via Exchange Application RBAC. Voeg geen organisatiebreed Graph Mail.Send-recht in Entra toe: zulke rechten gelden naast de beperkte Exchange-toewijzing. [Microsoft: Application RBAC](https://learn.microsoft.com/en-us/exchange/permissions-exo/application-rbac)

Voer als Microsoft 365-beheerder in PowerShell uit (de eerste regel is alleen nodig als de module ontbreekt):

~~~powershell
Install-Module ExchangeOnlineManagement -Scope CurrentUser
Connect-ExchangeOnline

$formAppId = Read-Host 'Application (client) ID'
$formPrincipalId = Read-Host 'Object ID uit Enterprise applications'
$formMailbox = Get-Mailbox -Identity 'info@marijnmetaandacht.nl'

$formMailbox | Format-List PrimarySmtpAddress, UserPrincipalName, RecipientTypeDetails

New-ServicePrincipal -AppId $formAppId -ObjectId $formPrincipalId -DisplayName 'Marijn websiteformulieren'
New-ManagementScope -Name 'Marijn website mailbox' -RecipientRestrictionFilter ("PrimarySmtpAddress -eq '" + $formMailbox.PrimarySmtpAddress + "'")
New-ManagementRoleAssignment -Name 'Marijn website verzenden' -Role 'Application Mail.Send' -App $formPrincipalId -CustomResourceScope 'Marijn website mailbox'
Test-ServicePrincipalAuthorization -Identity $formPrincipalId -Resource $formMailbox.PrimarySmtpAddress
~~~

Controleer dat Application Mail.Send voor deze mailbox InScope=True teruggeeft. Controleer ook een andere mailbox, als die bestaat: daarvoor moet InScope=False gelden. Laat wijzigingen even verwerken voordat je de website test. Voer de aanmaakopdrachten niet opnieuw uit als de objecten al bestaan; controleer dan de bestaande toewijzing.

MS365_SENDER wordt de **UserPrincipalName** van de gekozen mailbox, zoals hierboven getoond. Als info@marijnmetaandacht.nl een alias is, kan die waarde dus anders zijn. De ontvanger blijft info@marijnmetaandacht.nl. De gebruikte Microsoft Graph-route accepteert een gebruikers-ID of UPN. [Microsoft: sendMail](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0)

## Database en Vercel

1. Voer **database/formulieren.sql** uit in de SQL Editor van de bestaande Neon-database. Dit voegt twee technische tabellen toe en verandert bestaande webteksten niet.
2. Voeg in Vercel → project → **Settings → Environment Variables** de volgende waarden toe voor **Production**:

| Naam | Waarde |
| --- | --- |
| MS365_TENANT_ID | Directory (tenant) ID |
| MS365_CLIENT_ID | Application (client) ID |
| MS365_CLIENT_SECRET | De secret Value |
| MS365_SENDER | De UserPrincipalName van de verzendende mailbox |

DATABASE_URL blijft nodig. Zet de vier mailwaarden ook in .env.local als je lokaal echt wilt testen. Gebruik nooit NEXT_PUBLIC_ en commit .env.local niet.

3. Commit en push de formuliercode; merge indien nodig naar de productiebranch. Deploy daarna met deze instellingen. Een redeploy van oudere code voegt de formulieren niet toe.
4. Open /inschrijven. De verzendknop hoort beschikbaar te zijn zodra de mailinstellingen aanwezig zijn.

De server vraagt met deze appgegevens een tijdelijk token aan bij Microsoft. [Microsoft: client credentials](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow)

## Oplevercontrole

Stuur via de gedeployde website één duidelijk herkenbare testaanmelding met fictieve gegevens en je eigen e-mailadres. Controleer de ontvangst bij info@marijnmetaandacht.nl, de antwoorden op alle vragen en het Reply-To-adres. Controleer ook één contactaanvraag.

De bevestiging betekent dat Microsoft de verzending heeft geaccepteerd. Controleer de daadwerkelijke ontvangst apart, inclusief ongewenste e-mail. Bij een fout blijven de ingevulde velden staan. Bij een onzekere netwerkuitkomst vraagt de website om contact op te nemen vóór opnieuw verzenden.

## Onderhoud en werking

- Naam en e-mailadres zijn verplicht. Bij contactaanvragen is ook de interesse verplicht. Overige inschrijfvelden zijn optioneel.
- De server controleert inhoud, lengte, e-mailadres en keuzewaarden. Berichten zijn gewone tekst.
- De ontvanger komt uit siteConfig.email in src/data/site.ts, niet uit een ingestuurd formulier of een CMS-override. Een wijziging van het zichtbare contactadres wijzigt niet ongemerkt de bezorging.
- Een verborgen lokveld en database-limieten beperken spam: vijf pogingen per IP per uur en vijftig totaal per uur. Next.js controleert de herkomst van Server Actions.
- Dubbele verzoeken met dezelfde inzendcode worden tegengehouden. Er zijn geen automatische verzendretries. Dit voorkomt dubbele mails bij onzekere uitkomsten.
- Formulierinhoud wordt niet in Neon opgeslagen of gelogd. Neon bevat alleen een inzendcode, HMAC-vingerafdruk, verzendstatus en tellers. Oude technische records worden bij volgende pogingen na een dag opgeruimd. Ontvangen en verzonden mails blijven in Microsoft 365 volgens de mailboxinstellingen.
- Vercel-logs tonen alleen technische foutcodes, bijvoorbeeld token-http-401 (appgegevens) of send-http-403 (verzendrechten). Ze tonen geen ingevulde gegevens of tokens.
- Zonder mailconfiguratie staat een alternatief e-mailadres bij het formulier en is versturen uitgeschakeld.
- Vernieuw een verlopen client secret in Vercel en deploy opnieuw.

## Lokale controle zonder echte e-mail

~~~text
npm run typecheck
npm run lint
npm run test
npm run build
npm run test:browser
~~~

De browsertests gebruiken een tijdelijke database en onderscheppen Microsoft-verzoeken vóór verzending. Ze gebruiken uitsluitend fictieve persoonsgegevens. De tests bewijzen geen echte ontvangst in Microsoft 365; daarvoor blijft de oplevercontrole nodig.
