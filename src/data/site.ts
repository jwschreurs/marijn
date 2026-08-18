export type Training = {
  slug: string;
  title: string;
  duration: string;
  audience: string;
  summary: string;
  description: string;
  highlights: string[];
  details?: string[];
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
  phone: '06 12 34 56 78',
  location: 'Regio Twente en op locatie',
  intro:
    'Mindfulness, training en persoonlijke begeleiding voor meer rust, balans en bewustzijn in leven en werk.',
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
    title: 'Mindfulness op het werk',
    duration: 'Dagdeel of maatwerk',
    audience: 'Voor teams en organisaties',
    summary:
      'Een praktische training voor meer focus, veerkracht en aandacht binnen het werk.',
    description:
      'Deze training is bedoeld voor organisaties die aandacht willen geven aan welzijn, werkdruk en bewuste samenwerking. De inhoud kan worden afgestemd op de vraag van het team, met ruimte voor praktische oefeningen en herkenbare situaties uit de werkpraktijk.',
    highlights: ['Geschikt voor teams', 'Maatwerk mogelijk', 'Direct toepasbaar in de werkdag'],
  },
  {
    slug: 'individuele-begeleiding',
    title: 'Individuele begeleiding',
    duration: 'Op afspraak',
    audience: 'Persoonlijk traject',
    summary:
      'Persoonlijke begeleiding afgestemd op jouw vraag, tempo en dagelijkse praktijk.',
    description:
      'Soms is er behoefte aan individuele aandacht. In een persoonlijk traject kijken we samen naar wat er speelt en wat jou kan helpen om meer rust, helderheid en balans te ervaren. De begeleiding is praktisch, rustig en afgestemd op jouw situatie.',
    highlights: ['Eén-op-één begeleiding', 'Ruimte voor jouw vraag', 'Rustige en persoonlijke aanpak'],
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
    title: 'Introductieworkshop mindfulness',
    date: 'Op aanvraag',
    location: 'Op locatie of in overleg',
    description:
      'Een laagdrempelige kennismaking met mindfulness, geschikt voor particulieren, teams en organisaties.',
  },
  {
    title: 'Training mindfulness op het werk',
    date: 'In overleg',
    location: 'Bij de organisatie op locatie',
    description:
      'Een praktische sessie voor teams rond aandacht, werkdruk, focus en veerkracht.',
  },
];
