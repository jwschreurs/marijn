export type Training = {
  slug: string;
  title: string;
  duration: string;
  audience: string;
  summary: string;
  description: string;
  highlights: string[];
};

export const siteConfig = {
  name: 'Marijn van der Lende',
  tagline: 'mindfulness voor mens en werk',
  email: 'info@jouwdomein.nl',
  phone: '06 12 34 56 78',
  location: 'Regio Enschede en op locatie',
  intro:
    'Rust, aandacht en praktische mindfulness voor mensen, teams en organisaties.',
};

export const trainingen: Training[] = [
  {
    slug: 'mindfulness-basistraining',
    title: 'Mindfulness basistraining',
    duration: '8 weken',
    audience: 'Voor professionals en particulieren',
    summary:
      'Een toegankelijke training waarin aandacht, ademhaling en bewust aanwezig zijn centraal staan.',
    description:
      'Deze training biedt een rustige opbouw waarin deelnemers stap voor stap kennismaken met mindfulness. Er is aandacht voor stress, herstel, focus en het leren toepassen van mindfulness in het dagelijks leven en werk.',
    highlights: ['Praktische oefeningen', 'Ruimte voor reflectie', 'Direct toepasbaar in werk en privé'],
  },
  {
    slug: 'workshop-voor-teams',
    title: 'Workshop voor teams',
    duration: 'Dagdeel of maatwerk',
    audience: 'Voor organisaties',
    summary:
      'Praktische sessies over aandacht, werkdruk, veerkracht en bewust samenwerken binnen teams.',
    description:
      'Deze workshop is geschikt voor organisaties die werkdruk, focus en welzijn op een toegankelijke manier bespreekbaar willen maken. De inhoud kan worden afgestemd op teamdoelen, cultuur en beschikbare tijd.',
    highlights: ['Op maat gemaakt', 'Geschikt voor teams', 'Focus op veerkracht en samenwerking'],
  },
  {
    slug: 'individuele-begeleiding',
    title: 'Individuele begeleiding',
    duration: 'Op afspraak',
    audience: 'Persoonlijk traject',
    summary:
      'Persoonlijke begeleiding afgestemd op jouw vraag, tempo en dagelijkse praktijk.',
    description:
      'Voor wie behoefte heeft aan persoonlijke begeleiding biedt dit traject ruimte voor maatwerk. Het accent ligt op aandacht, inzicht en het ontwikkelen van een manier van werken en leven die beter in balans voelt.',
    highlights: ['Eén-op-één', 'Persoonlijke afstemming', 'Rustige en veilige aanpak'],
  },
];
