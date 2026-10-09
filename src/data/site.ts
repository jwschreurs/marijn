export type Training = {
  slug: string;
  title: string;
  duration: string;
  audience: string;
  summary: string;
  description: string;
  highlights: string[];
  details?: string[];
  contentSections?: Array<{
    title: string;
    paragraphs: TrainingContentParagraph[];
    items?: string[];
    closingParagraphs?: TrainingContentParagraph[];
  }>;
  schedule?: {
    season: string;
    location: string;
    groups: Array<{
      name: string;
      time: string;
    }>;
    meetings: Array<{
      label: string;
      date: string;
    }>;
    retreat: {
      label: string;
      date: string;
      time: string;
    };
  };
  investment?: {
    introduction: string;
    price: string;
    taxNote: string;
    includes: string[];
    employerNote: string;
    reimbursementNote: string;
  };
};

export type TrainingContentParagraph = {
  text: string;
  emphasizedPhrases?: string[];
  strong?: boolean;
};

export type AgendaItem = {
  title: string;
  date: string;
  location: string;
  description: string;
};

export const siteConfig = {
  name: 'Marijn met aandacht',
  tagline: 'Mindfulness voor mens en werk',
  email: 'info@marijnmetaandacht.nl',
  phone: '06 13 95 75 83',
  kvk: '42136968',
  btwId: 'NL005527527B41',
  agbCode: '90122395',
  location: 'Regio Achterhoek en op locatie in overleg',
  intro:
    'Mindfulness en training voor meer rust, balans en bewustzijn in leven en werk.',
};

export const trainingen: Training[] = [
  {
    slug: 'mindfulness-basistraining',
    title: 'Mindfulness Based Stress Reduction (MBSR)',
    duration: '8 weken en een stiltedag',
    audience: 'Een vaste groep van gemiddeld 8 tot 10 deelnemers',
    summary:
      'Leer stap voor stap hoe je mindfulness kunt toepassen in je dagelijks leven.',
    description:
      'Tijdens de 8-weekse Mindfulness Based Stress Reduction-training wisselen uitleg, meditatieoefeningen, beweging en reflectie elkaar af. Je leert stap voor stap hoe je mindfulness kunt toepassen in je dagelijks leven. Ook oefen je thuis 45 tot 60 minuten per dag tussen de bijeenkomsten door.',
    highlights: [
      'Acht bijeenkomsten van 2,5 uur',
      'Een stiltedag van 6 uur',
      'Een persoonlijk intakegesprek',
      'Thuis oefenen met een werkboek en audiobestanden',
    ],
    details: [
      'Voorafgaand aan de training vindt een intakegesprek plaats waarin we samen bespreken of deelname op dit moment passend is.',
      'De training volg je in een vaste ochtend groep van gemiddeld 8 tot 10 personen.',
    ],
    schedule: {
      season: 'Najaar 2026',
      location: 'Locatie wordt binnenkort bekendgemaakt',
      groups: [
        { name: 'Ochtendgroep', time: '09.30-12.00' },
      ],
      meetings: [
        { label: 'Bijeenkomst 1', date: 'Woensdag  4 november' },
        { label: 'Bijeenkomst 2', date: 'Woensdag 11 november' },
        { label: 'Bijeenkomst 3', date: 'Woensdag 18 november' },
        { label: 'Bijeenkomst 4', date: 'Woensdag 25 november' },
        { label: 'Bijeenkomst 5', date: 'Woensdag  2 december' },
        { label: 'Bijeenkomst 6', date: 'Woensdag  9 december' },
        { label: 'Bijeenkomst 7', date: 'Woensdag 16 december' },
        { label: 'Bijeenkomst 8', date: 'Woensdag 23 december' },
      ],
      retreat: {
        label: 'Stiltedag',
        date: 'Datum volgt nog',
        time: '10.00-16.00',
      },
    },
    investment: {
      introduction:
        'Een 8-weekse MBSR-training is een investering in jezelf. Je leert vaardigheden die je ook na de training kunt blijven toepassen in het dagelijks leven.',
      price: '€ 475,-',
      taxNote: 'Dit tarief is vrijgesteld van btw.',
      includes: [
        'Een vrijblijvend kennismakingsgesprek',
        'Een persoonlijk intakegesprek',
        'Acht bijeenkomsten',
        'Een werkboek',
        'Audiobestanden om thuis mee te oefenen',
        'Begeleiding gedurende de training',
        'Een stiltedag',
      ],
      employerNote:
        'Wordt de training door een werkgever vergoed? Neem dan gerust contact op voor de mogelijkheden en een passend aanbod.',
      reimbursementNote:
        'Bij een aantal zorgverzekeraars is een gedeeltelijke vergoeding vanuit de aanvullende verzekering mogelijk. Controleer altijd vooraf de voorwaarden van je eigen polis.',
    },
  },
  {
    slug: 'mindfulness-op-het-werk',
    title: 'Mindfulness voor organisaties',
    duration: '8 weken en een stiltedag',
    audience: 'Voor organisaties en teams',
    summary:
      'Een geprotocolleerde MBSR-training voor meer aandacht, bewustzijn en veerkracht in werk en dagelijks leven.',
    description:
      'Werk vraagt veel van mensen. Hoge werkdruk, voortdurende prikkels, volle agenda’s en het steeds schakelen tussen verschillende taken kunnen ervoor zorgen dat we vooral blijven doorgaan. Juist in een omgeving waarin veel van medewerkers wordt gevraagd, kan het waardevol zijn om bewust aandacht te leren geven aan wat er speelt.',
    details: [
      'Met mindfulness ontwikkelen deelnemers vaardigheden om met meer aandacht en bewustzijn om te gaan met hun werk en dagelijks leven. Ze leren onder andere automatische reactiepatronen herkennen, eerder signalen van spanning opmerken en bewuster omgaan met gedachten, gevoelens en lichamelijke signalen.',
    ],
    highlights: [],
    contentSections: [
      {
        title: 'Wat kan mindfulness brengen?',
        paragraphs: [
          {
            text: 'Mindfulness neemt moeilijke situaties of werkdruk niet weg. Wel kan het helpen om er met meer bewustzijn, mildheid en veerkracht mee om te gaan.',
          },
          { text: 'Een MBSR-training kan deelnemers ondersteunen bij:' },
        ],
        items: [
          'het eerder herkennen van stresssignalen',
          'het bewuster omgaan met werkdruk en wat het werk van hen vraagt',
          'minder meegesleept worden door piekergedachten',
          'bewuster reageren in plaats van automatisch handelen',
          'beter omgaan met lastige gevoelens en situaties',
          'meer contact ervaren met het lichaam en lichamelijke signalen',
          'het ontwikkelen van meer rust, aandacht en balans',
        ],
      },
      {
        title: 'Geprotocolleerde MBSR-training',
        paragraphs: [
          {
            text: 'Vanuit Marijn met aandacht bied ik een 8-weekse, geprotocolleerde MBSR-training (Mindfulness-Based Stress Reduction) aan voor organisaties en teams.',
            emphasizedPhrases: [
              'Marijn met aandacht',
              'MBSR-training (Mindfulness-Based Stress Reduction)',
            ],
          },
          {
            text: 'De training bestaat uit acht wekelijkse bijeenkomsten en een stiltedag. Deelnemers krijgen praktische oefeningen en handvatten die zij niet alleen tijdens de training, maar ook in hun dagelijks leven en op het werk kunnen toepassen.',
          },
          {
            text: 'De training kan bijvoorbeeld worden ingezet binnen het beleid rondom duurzame inzetbaarheid, vitaliteit en medewerkerswelzijn.',
            emphasizedPhrases: [
              'duurzame inzetbaarheid, vitaliteit en medewerkerswelzijn',
            ],
          },
          {
            text: 'Ik geloof daarbij niet in mindfulness als oplossing voor alles. Mindfulness gaat niet over het wegnemen van stressvolle omstandigheden, maar over het ontwikkelen van meer bewustzijn in hoe we ons daartoe verhouden.',
          },
        ],
      },
      {
        title: 'Investering en tarieven',
        paragraphs: [
          {
            text: 'De investering voor een MBSR-training voor organisaties wordt in overleg bepaald en is afhankelijk van onder andere de groepsgrootte, locatie en eventuele specifieke wensen van de organisatie.',
          },
          {
            text: 'Ik bied de mogelijkheid om de training op locatie binnen de organisatie te verzorgen. Eventuele reis- en locatiegebonden kosten worden vooraf in overleg besproken.',
            emphasizedPhrases: ['op locatie binnen de organisatie'],
          },
        ],
      },
      {
        title: 'De investering is inclusief',
        paragraphs: [
          { text: 'Deelnemers ontvangen gedurende het volledige traject:' },
        ],
        items: [
          'een persoonlijk kennismakings- en intakegesprek',
          'acht wekelijkse MBSR-bijeenkomsten',
          'een stiltedag',
          'een werkboek en ondersteunend oefenmateriaal',
          'audiobestanden voor de thuisbeoefening',
          'begeleiding gedurende het gehele trainingsprogramma',
        ],
        closingParagraphs: [
          {
            text: 'Wil je weten wat een MBSR-training binnen jouw organisatie zou kosten? Neem gerust contact op voor een vrijblijvend gesprek en een passend voorstel.',
          },
        ],
      },
      {
        title: 'Interesse voor jouw organisatie?',
        paragraphs: [
          {
            text: 'Wil je onderzoeken wat een MBSR-training kan betekenen voor jouw medewerkers of team? Ik denk graag mee over een passend aanbod en de mogelijkheden binnen jouw organisatie.',
          },
          {
            text: 'Neem gerust contact op met Marijn met aandacht.',
            strong: true,
          },
        ],
      },
    ],
  },
];

export const agendaItems: AgendaItem[] = [
  {
    title: 'Mindfulness Based Stress Reduction (MBSR)',
    date: '4 november t/m 23 december',
    location: 'Locatie wordt binnenkort bekendgemaakt',
    description:
      'Acht woensdagbijeenkomsten in een vaste ochtend- of avondgroep, met een stiltedag op zondag 15 november.',
  },
  {
    title: 'Mindfulness voor organisaties',
    date: 'In overleg',
    location: 'Bij de organisatie op locatie',
    description:
      'Een 8-weekse MBSR-training voor teams rond aandacht, werkdruk, bewustzijn en veerkracht.',
  },
];

// Editable page copy. Keys stay stable so published text survives deployments.
export const pageCopy = {
  "home": {
    "alt1": "Rustige mindfulness achtergrond met uitzicht over een tempelcomplex",
    "heading1": "Meer rust, aandacht en balans in leven en werk.",
    "paragraph1": "Marijn met aandacht biedt mindfulness en trainingen voor mensen en organisaties die bewuster willen omgaan met stress, drukte en verandering.",
    "link1": "Bekijk trainingen",
    "link2": "Neem contact op",
    "eyebrow1": "Met aandacht",
    "title1": "Praktisch, rustig en mensgericht",
    "text1": "Mindfulness hoeft niet ingewikkeld te zijn. Het gaat om leren opmerken wat er gebeurt, ruimte maken en van daaruit bewust reageren. In kleine stappen, met aandacht voor jouw eigen situatie.",
    "paragraph2": "Het aanbod is geschikt voor particulieren en organisaties. De toon is rustig en toegankelijk, met oefeningen en inzichten die je direct kunt toepassen in het dagelijks leven of op het werk.",
    "item1": "Mindfulness voor meer rust en bewustzijn",
    "item2": "Trainingen voor organisaties",
    "eyebrow2": "Aanbod",
    "title2": "Trainingen",
    "accessibleLabel1": "Inspirerende quote",
    "paragraph3": "“I never said it would be easy, I only said it would be worth it.” – Mae West"
  },
  "about": {
    "eyebrow1": "Over mij",
    "title1": "Welkom! Mijn naam is Marijn van der Lende",
    "text1": "Ik ben mindfulnesstrainer en GGZ-agoog.",
    "heading1": "Even voorstellen",
    "paragraph1": "Ik woon in Winterswijk, in de Achterhoek, samen met mijn drie katten. In mijn vrije tijd geniet ik van wandelen, de natuur, lekker eten en tijd doorbrengen met vrienden. Ik geloof in de waarde van vertragen en aandacht hebben voor de kleine dingen die vaak vanzelfsprekend lijken.",
    "heading2": "Ervaring in de geestelijke gezondheidszorg",
    "paragraph2": "Sinds 2013 werk ik in de geestelijke gezondheidszorg. In mijn werk heb ik veel mensen begeleid die vast zijn gelopen door stress, ingrijpende gebeurtenissen of psychische klachten. Juist daar zag ik hoe gemakkelijk we het contact met onszelf kunnen verliezen.",
    "heading3": "Mijn weg naar mindfulness",
    "paragraph3": "Ook in mijn eigen leven heb ik ervaren hoe snel je op de automatische piloot terecht kunt komen. Mindfulness helpt mij om opnieuw stil te staan, beter te luisteren naar mijn lichaam en met meer aandacht aanwezig te zijn in het moment.",
    "paragraph4": "Niet omdat het leven daardoor makkelijker is, maar omdat er meer ruimte ontstaat om bewust te kiezen hoe je met jezelf en met moeilijke situaties omgaat.",
    "heading4": "Opleiding en achtergrond",
    "paragraph5": "Die ervaring, gecombineerd met mijn achtergrond in de geestelijke gezondheidszorg, heeft ertoe geleid dat ik de postacademische opleiding tot mindfulnesstrainer (MBSR/MBCT) aan het Radboudumc Expertisecentrum voor Mindfulness heb gevolgd.",
    "heading5": "Mijn manier van begeleiden",
    "paragraph6": "In mijn trainingen vind ik het belangrijk dat je jezelf niets hoeft te bewijzen. Mindfulness gaat voor mij niet over ontspannen of ‘je hoofd leegmaken’. Het gaat over leren aanwezig zijn bij wat er op dit moment is, met een open en nieuwsgierige houding. Van daaruit ontstaat vaak meer rust, inzicht en keuzevrijheid.",
    "paragraph7": "Ik begeleid je met aandacht, zonder oordeel en in een veilige omgeving waarin ruimte is voor jouw eigen ervaring."
  },
  "legacyAbout": {
    "eyebrow1": "Over Marijn",
    "title1": "Een rustige en persoonlijke benadering",
    "text1": "Gebruik deze pagina om iets te vertellen over achtergrond, visie, werkwijze en ervaring.",
    "heading1": "Visie",
    "paragraph1": "Mindfulness kan helpen om meer rust, helderheid en aandacht te ervaren in werk en dagelijks leven. Vanuit een zachte en professionele aanpak ontstaat ruimte om bewuster keuzes te maken.",
    "heading2": "Werkwijze",
    "paragraph2": "De begeleiding is praktisch, toegankelijk en afgestemd op de vraag van de deelnemer of organisatie. Geen overdaad aan theorie, maar oefeningen en inzichten die direct toepasbaar zijn.",
    "heading3": "Voor wie",
    "paragraph3": "Voor mensen die op zoek zijn naar meer balans, meer focus of meer rust. Ook geschikt voor teams en organisaties die aandacht willen geven aan welzijn, werkdruk en veerkracht."
  },
  "mindfulness": {
    "eyebrow1": "Mindfulness",
    "title1": "Wat is mindfulness?",
    "text1": "Mindfulness helpt je automatische patronen te herkennen en bewuster om te gaan met wat je denkt, voelt en lichamelijk ervaart.",
    "heading1": "Leven op de automatische piloot",
    "paragraph1": "Veel mensen leven een groot deel van de dag op de automatische piloot. We zijn bezig met wat er nog moet gebeuren, denken na over wat al geweest is of reageren automatisch op situaties zonder dat we ons daarvan bewust zijn. Dat is heel menselijk. Ons brein is voortdurend bezig om ons veilig te houden, problemen op te lossen en vooruit te denken.",
    "paragraph2": "Soms helpt dat ons. Soms werkt het juist tegen ons. Misschien blijf je piekeren terwijl je wilt slapen, raak je sneller geïrriteerd onder druk of merk je pas hoe moe je bent wanneer je lichaam aan de bel trekt.",
    "paragraph3": "Mindfulness helpt je deze patronen te herkennen. Niet om gedachten of gevoelens weg te krijgen, maar om er met meer aandacht en minder automatisch mee om te gaan. Zo ontstaat ruimte voor keuzes die beter aansluiten bij wat voor jou belangrijk is.",
    "heading2": "Wat betekent mindfulness?",
    "paragraph4": "Mindfulness betekent met aandacht aanwezig zijn bij wat er op dit moment gebeurt. Dat geldt voor wat je denkt, voelt en lichamelijk ervaart, maar ook voor wat er om je heen gebeurt.",
    "paragraph5": "Daarbij oefen je een open, nieuwsgierige en niet-oordelende houding. Je hoeft ervaringen niet direct te veranderen of op te lossen. Juist door eerst op te merken wat er is, ontstaat vaak meer inzicht, rust en keuzevrijheid.",
    "paragraph6": "Mindfulness gaat niet over positief denken of alles accepteren zoals het is. Het gaat over bewust aanwezig zijn, zodat je kunt kiezen hoe je met een situatie om wilt gaan.",
    "eyebrow2": "Mogelijke effecten",
    "title2": "Wat kan mindfulness je brengen?",
    "text2": "Iedereen beoefent mindfulness vanuit een eigen aanleiding. Door regelmatig te oefenen kun je veranderingen opmerken in hoe je met stress, gedachten en gevoelens omgaat.",
    "paragraph7": "Mindfulness neemt moeilijke situaties niet weg. Wel kan het je helpen er met meer mildheid, bewustzijn en veerkracht mee om te gaan.",
    "item1": "Stresssignalen eerder herkennen",
    "item2": "Minder worden meegesleept door piekergedachten",
    "item3": "Bewuster reageren in plaats van automatisch",
    "item4": "Meer contact ervaren met je lichaam",
    "item5": "Beter omgaan met lastige gevoelens",
    "item6": "Meer rust, aandacht en balans ervaren in het dagelijks leven",
    "heading3": "Hoe leer je mindfulness?",
    "paragraph8": "Mindfulness is geen theorie, maar een vaardigheid die je ontwikkelt door te oefenen. Tijdens de 8-weekse Mindfulness Based Stress Reduction-training wisselen uitleg, meditatieoefeningen, beweging en reflectie elkaar af.",
    "paragraph9": "Je leert stap voor stap hoe je mindfulness kunt toepassen in je dagelijks leven en oefent ook thuis tussen de bijeenkomsten door. Veel deelnemers merken dat regelmatig oefenen ervoor zorgt dat mindfulness steeds meer een vanzelfsprekend onderdeel van hun leven wordt.",
    "heading4": "Waarom een MBSR-training?",
    "paragraph10": "De MBSR-training is ontwikkeld door Jon Kabat-Zinn en is wereldwijd een van de meest onderzochte en toegepaste mindfulnesstrainingen. De training combineert eeuwenoude mindfulnessoefeningen met inzichten uit de moderne wetenschap en psychologie.",
    "paragraph11": "De focus ligt niet alleen op het verminderen van stress, maar ook op het ontwikkelen van meer bewustzijn, veerkracht en een andere manier van omgaan met de uitdagingen die het leven met zich meebrengt.",
    "link1": "Bekijk de MBSR-training",
    "eyebrow3": "Praktische informatie",
    "title3": "Vergoeding van een mindfulnesstraining",
    "text3": "Bij sommige zorgverzekeraars is een gedeeltelijke vergoeding van een 8-weekse MBSR-training mogelijk vanuit de aanvullende verzekering.",
    "paragraph12": "De hoogte en voorwaarden verschillen per zorgverzekeraar en aanvullend pakket. Een verzekeraar kan aanvullende voorwaarden stellen, zoals een verwijzing van de huisarts, registratie van de trainer of een AGB-code op de factuur.",
    "paragraph13": "Ook buiten de zorgverzekering zijn soms mogelijkheden. Denk aan een bijdrage van je werkgever, een opleidings- of vitaliteitsbudget, een arbodienst, het UWV of de gemeente.",
    "paragraph14": "Ik ben aangesloten bij de VMBN (Vereniging Mindfulness Based Trainers Nederland) en ingeschreven in het Mindfulness Register (SMR). Ook beschik ik over een AGB-code. Als jouw verzekeraar deze als voorwaarde stelt, wordt de code op de factuur vermeld.",
    "paragraph15": "Voorwaarden kunnen veranderen. Neem daarom altijd vooraf contact op met je eigen zorgverzekeraar of werkgever.",
    "accessibleLabel1": "Meer informatie over vergoedingen",
    "link2": "Vergoedingsmogelijkheden bij de VMBN",
    "link3": "Vergoedingen per verzekeraar bij Zorgwijzer",
    "link4": "Zorgverzekering.info",
    "link5": "Vraag naar de mogelijkheden"
  },
  "contact": {
    "eyebrow1": "Contact",
    "title1": "Neem contact op voor een kennismaking",
    "text1": "Wil je meer weten over een training of de mogelijkheden voor jouw organisatie? Laat gerust een bericht achter.",
    "label1": "Naam",
    "label2": "E-mail",
    "label3": "Telefoon",
    "label4": "Werkgebied"
  },
  "agenda": {
    "eyebrow1": "Agenda",
    "title1": "Geplande trainingen en bijeenkomsten",
    "text1": "Bekijk wanneer trainingen starten en welke bijeenkomsten op aanvraag beschikbaar zijn. Op de trainingspagina vind je alle praktische details.",
    "link1": "Bekijk planning en investering"
  },
  "trainingOverview": {
    "alt1": "Zonsondergang boven zee, gezien vanaf een houten boot",
    "paragraph1": "Trainingen",
    "heading1": "Trainingen met rust, aandacht en praktische handvatten",
    "paragraph2": "Voor particulieren, professionals en organisaties die willen werken aan aandacht, balans, veerkracht en bewust omgaan met stress."
  },
  "trainingDetail": {
    "link1": "Inschrijven voor deze training",
    "link2": "Eerst een vraag stellen",
    "title1": "Planning en groepen",
    "paragraph1": "Alle acht bijeenkomsten vinden plaats op woensdag.",
    "heading1": "De acht bijeenkomsten",
    "paragraph2": "Onderdeel van de training",
    "eyebrow1": "Investering en tarieven",
    "link3": "Lees meer over vergoedingsmogelijkheden",
    "heading2": "De investering is inclusief",
    "link4": "Neem contact op"
  },
  "registration": {
    "eyebrow1": "MBSR-training",
    "title1": "Inschrijfformulier",
    "text1": "Vul het formulier in ter voorbereiding op je inschrijving en het persoonlijke intakegesprek.",
    "metadataTitle": "Inschrijven MBSR-training | Marijn met aandacht",
    "metadataDescription": "Inschrijfformulier voor de MBSR-training van Marijn met aandacht."
  },
  "header": {
    "accessibleLabel1": "Ga naar de homepage",
    "alt1": "Logo van Marijn met aandacht",
    "accessibleLabel2": "Menu openen of sluiten",
    "accessibleLabel3": "Hoofdnavigatie",
    "navigation1": "Home",
    "navigation2": "Over mij",
    "navigation3": "Mindfulness",
    "navigation4": "Trainingen",
    "navigation5": "Agenda",
    "navigation6": "Contact"
  },
  "footer": {
    "paragraph1": "Pagina's",
    "link1": "Over mij",
    "link2": "Mindfulness",
    "link3": "Trainingen",
    "link4": "Agenda",
    "link5": "Contact",
    "link6": "Ethische gedragscode VMBN",
    "link7": "Algemene voorwaarden",
    "paragraph2": "Contact",
    "label1": "E-mail:",
    "label2": "Telefoon:",
    "label3": "KvK:",
    "label4": "BTW-id:",
    "label5": "AGB-code:",
    "accessibleLabel1": "Keurmerken",
    "accessibleLabel2": "Bezoek de website van VMBN",
    "alt1": "VMBN-keurmerk",
    "accessibleLabel3": "Bezoek het Mindfulness Register",
    "alt2": "SMR Register mindfulnesstrainer"
  },
  "trainingCard": {
    "link1": "Bekijk training"
  },
  "inquiryForm": {
    "label1": "Naam",
    "placeholder1": "Jouw naam",
    "label2": "E-mailadres",
    "placeholder2": "naam@voorbeeld.nl",
    "label3": "Interesse",
    "option1": "Kies een optie",
    "option2": "Kennismakingsgesprek",
    "label4": "Bericht",
    "placeholder3": "Waar wil je meer over weten?",
    "submitLabel": "Verstuur aanvraag",
    "deliveryNote": "Je aanvraag wordt per e-mail naar {email} gestuurd. Marijn gebruikt je gegevens om je vraag te beantwoorden."
  },
  "registrationForm": {
    "paragraph1": "Vooraf",
    "heading1": "Aanmelding en voorbereiding intakegesprek",
    "paragraph2": "Dit formulier is bedoeld om je inschrijving voor de MBSR-training voor te bereiden en om het persoonlijke intakegesprek goed te kunnen voeren.",
    "paragraph3": "Vul alleen de gevraagde informatie in. Vermeld geen medische diagnoses, psychologische klachten, informatie over behandelingen of andere uitgebreide gezondheidsinformatie. Als je denkt dat zulke informatie relevant is voor je deelname, kunnen we dit tijdens het intakegesprek persoonlijk bespreken.",
    "paragraph4": "Stap 1",
    "heading2": "Persoonlijke gegevens",
    "paragraph5": "Vul hier de gegevens in die nodig zijn om je inschrijving voor te bereiden.",
    "label1": "Naam",
    "placeholder1": "Voor- en achternaam",
    "label2": "E-mailadres",
    "placeholder2": "naam@voorbeeld.nl",
    "label3": "Telefoonnummer",
    "placeholder3": "06 12 34 56 78",
    "label4": "Adres",
    "paragraph6": "Stap 2",
    "heading3": "Over je deelname",
    "paragraph7": "Deze vragen helpen om het intakegesprek goed voor te bereiden.",
    "label6": "Vraag 1",
    "question1": "Wat maakt dat je aan deze MBSR-training wilt deelnemen?",
    "paragraph8": "Beschrijf kort wat je aanspreekt in de training of wat je hoopt dat de training je brengt. Vermeld hier liever geen medische of psychologische informatie.",
    "label7": "Vraag 2",
    "question2": "Kun je bij alle bijeenkomsten aanwezig zijn?",
    "label8": "Ja",
    "label9": "Nee",
    "label10": "Zo nee, welke bijeenkomst(en) kun je naar verwachting niet bijwonen?",
    "label11": "Vraag 3",
    "question3": "Hoe heb je van deze MBSR-training gehoord?",
    "label12": "Via de website",
    "label13": "Via social media",
    "label14": "Via iemand uit mijn omgeving",
    "label15": "Via een andere website of organisatie",
    "label16": "Anders",
    "label17": "Anders, namelijk",
    "label18": "Vraag 4",
    "question4": "Ben je bereid om gedurende de training dagelijks ongeveer 45 minuten te oefenen?",
    "label19": "Ja",
    "label20": "Nee",
    "label21": "Ik wil dit graag tijdens het intakegesprek bespreken",
    "label22": "Vraag 5",
    "question5": "Heb je nog vragen of opmerkingen die je voorafgaand aan de training wilt bespreken?",
    "paragraph9": "Privacy",
    "heading4": "Privacy en verwerking van je gegevens",
    "paragraph10": "Dit formulier bevat persoonsgegevens. Deze gegevens worden uitsluitend gebruikt voor het voorbereiden, organiseren en uitvoeren van de MBSR-training en voor de bijbehorende administratie.",
    "paragraph11": "Neem in dit formulier geen medische diagnoses, psychologische klachten, informatie over behandelingen of andere gevoelige gezondheidsinformatie op. Als zulke informatie relevant is voor je deelname, bespreken we die tijdens het intakegesprek.",
    "paragraph12": "Je persoonsgegevens worden zorgvuldig behandeld en niet langer bewaard dan noodzakelijk. Gegevens die onderdeel zijn van de wettelijke financiële administratie kunnen vanwege wettelijke bewaarplichten langer worden bewaard.",
    "submitHeading": "Aanmelding versturen",
    "requiredNote": "Naam en e-mailadres zijn verplicht. De overige velden zijn optioneel.",
    "deliveryNote": "Je ingevulde formulier wordt per e-mail naar {email} gestuurd voor de voorbereiding van het intakegesprek. Je deelname is pas definitief na overleg.",
    "submitLabel": "Verstuur aanmelding"
  },
  "metadata": {
    "title": "Marijn met aandacht | Mindfulness voor mens en werk",
    "description": "Mindfulness en training voor meer rust, balans en bewustzijn in leven en werk."
  }
};

// Vaste ontvangstbevestiging; bevat geen door bezoekers ingevulde tekst.
export const formConfirmationCopy = {
  inquiry: {
    subject: "Je bericht aan Marijn met aandacht is ontvangen",
    body: "Bedankt voor je bericht. Je aanvraag is ontvangen en Marijn neemt contact met je op. Je hoeft het formulier niet opnieuw in te vullen.",
  },
  registration: {
    subject: "Je aanmelding bij Marijn met aandacht is ontvangen",
    body: "Bedankt voor je aanmelding voor de MBSR-training. Marijn neemt contact met je op voor het persoonlijke intakegesprek. Je deelname is nog niet definitief; die bevestigen we na overleg.",
  },
  unrequested: "Heb je zelf geen formulier ingevuld? Dan kun je deze e-mail negeren. Je bent niet aangemeld voor een nieuwsbrief.",
};
