export type Training = {
  slug: string;
  title: string;
  duration: string;
  audience: string;
  summary: string;
  description: string;
  highlights: string[];
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
    title: 'Mindfulness basistraining',
    duration: '8 weken',
    audience: 'Voor particulieren en professionals',
    summary:
      'Een toegankelijke training waarin je leert vertragen, waarnemen en met meer aandacht aanwezig zijn.',
    description:
      'In de mindfulness basistraining maak je stap voor stap kennis met praktische oefeningen voor aandacht, ademhaling en bewustwording. Je leert signalen van stress eerder herkennen en ontwikkelt manieren om met meer rust en mildheid te reageren op wat er speelt.',
    highlights: ['Wekelijkse bijeenkomsten', 'Praktische oefeningen voor thuis', 'Aandacht voor stress, grenzen en balans'],
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
    title: 'Start mindfulness basistraining',
    date: 'Nieuwe data volgen binnenkort',
    location: 'Regio Twente',
    description:
      'Een 8-weekse training voor wie kennis wil maken met mindfulness en meer rust wil brengen in het dagelijks leven.',
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
