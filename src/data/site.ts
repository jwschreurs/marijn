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
    audience: 'Twee vaste groepen van gemiddeld 8 tot 10 deelnemers',
    summary:
      'Leer stap voor stap hoe je mindfulness kunt toepassen in je dagelijks leven.',
    description:
      'Tijdens de 8-weekse Mindfulness Based Stress Reduction-training wisselen uitleg, meditatieoefeningen, beweging en reflectie elkaar af. Je leert stap voor stap hoe je mindfulness kunt toepassen in je dagelijks leven. Ook oefen je thuis 45 tot 60 minuten per dag tussen de bijeenkomsten door.',
    highlights: [
      'Acht bijeenkomsten van 2,5 uur',
      'Een gezamenlijke stiltedag van 6 uur',
      'Een persoonlijk intakegesprek',
      'Thuis oefenen met een werkboek en audiobestanden',
    ],
    details: [
      'Voorafgaand aan de training vindt een intakegesprek plaats waarin we samen bespreken of deelname op dit moment passend is.',
      'De training volg je in een vaste ochtend- of avondgroep van gemiddeld 8 tot 10 personen.',
    ],
    schedule: {
      season: 'Najaar 2026',
      location: 'Locatie wordt binnenkort bekendgemaakt',
      groups: [
        { name: 'Ochtendgroep', time: '10.00-12.30' },
        { name: 'Avondgroep', time: '19.30-22.00' },
      ],
      meetings: [
        { label: 'Bijeenkomst 1', date: 'Woensdag 7 oktober' },
        { label: 'Bijeenkomst 2', date: 'Woensdag 14 oktober' },
        { label: 'Bijeenkomst 3', date: 'Woensdag 21 oktober' },
        { label: 'Bijeenkomst 4', date: 'Woensdag 28 oktober' },
        { label: 'Bijeenkomst 5', date: 'Woensdag 4 november' },
        { label: 'Bijeenkomst 6', date: 'Woensdag 11 november' },
        { label: 'Bijeenkomst 7', date: 'Woensdag 18 november' },
        { label: 'Bijeenkomst 8', date: 'Woensdag 25 november' },
      ],
      retreat: {
        label: 'Gezamenlijke stiltedag',
        date: 'Zondag 15 november',
        time: '10.00-16.00',
      },
    },
    investment: {
      introduction:
        'Een 8-weekse MBSR-training is een investering in jezelf. Je leert vaardigheden die je ook na de training kunt blijven toepassen in het dagelijks leven.',
      price: '€ 425,-',
      taxNote: 'Dit tarief is vrijgesteld van btw.',
      includes: [
        'Een vrijblijvend kennismakingsgesprek',
        'Een persoonlijk intakegesprek',
        'Acht bijeenkomsten',
        'Een werkboek',
        'Audiobestanden om thuis mee te oefenen',
        'Begeleiding gedurende de training',
        'Een gezamenlijke stiltedag',
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
          'een gezamenlijke stiltedag',
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
    date: '7 oktober t/m 25 november 2026',
    location: 'Locatie wordt binnenkort bekendgemaakt',
    description:
      'Acht woensdagbijeenkomsten in een vaste ochtend- of avondgroep, met een gezamenlijke stiltedag op zondag 15 november.',
  },
  {
    title: 'Mindfulness voor organisaties',
    date: 'In overleg',
    location: 'Bij de organisatie op locatie',
    description:
      'Een 8-weekse MBSR-training voor teams rond aandacht, werkdruk, bewustzijn en veerkracht.',
  },
];
