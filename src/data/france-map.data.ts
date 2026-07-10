export type FranceMapPin = {
  id: string;
  city: string;
  region: string;
  x: number;
  y: number;
  href: string;
  agencySlugs: string[];
  status?: string;
  labelSide?: 'left' | 'right' | 'bottom' | 'top';
};

export const franceMapPins: FranceMapPin[] = [
  {
    id: 'lille',
    city: 'Lille',
    region: 'Hauts-de-France',
    x: 54.7,
    y: 12.5,
    href: '/agences',
    agencySlugs: [],
    status: 'À confirmer',
    labelSide: 'right',
  },
  {
    id: 'paris',
    city: 'Paris',
    region: 'Île-de-France',
    x: 48.5,
    y: 33.2,
    href: '/agences/paris',
    agencySlugs: ['paris'],
    labelSide: 'right',
  },
  {
    id: 'lyon',
    city: 'Lyon',
    region: 'Auvergne-Rhône-Alpes',
    x: 66.4,
    y: 55,
    href: '/agences/lyon',
    agencySlugs: ['lyon'],
    labelSide: 'right',
  },
  {
    id: 'bordeaux',
    city: 'Bordeaux',
    region: 'Nouvelle-Aquitaine',
    x: 28.1,
    y: 64.6,
    href: '/agences',
    agencySlugs: [],
    status: 'À confirmer',
    labelSide: 'left',
  },
  {
    id: 'montpellier',
    city: 'Montpellier',
    region: 'Occitanie',
    x: 53.5,
    y: 78,
    href: '/agences/montpellier',
    agencySlugs: ['montpellier'],
    labelSide: 'left',
  },
  {
    id: 'aix-marseille',
    city: 'Aix-Marseille',
    region: "Provence-Alpes-Côte d'Azur",
    x: 70.2,
    y: 80,
    href: '/agences/aix-en-provence',
    agencySlugs: ['aix-en-provence', 'marseille'],
    labelSide: 'right',
  },
];

const toSvgPoint = (pin: FranceMapPin) => ({
  x: Math.round((pin.x / 100) * 507),
  y: Math.round((pin.y / 100) * 520),
});

const paris = toSvgPoint(franceMapPins.find((pin) => pin.id === 'paris')!);

export const franceMapRoutes = franceMapPins
  .filter((pin) => pin.id !== 'paris')
  .map((pin) => {
    const point = toSvgPoint(pin);
    const controlX = Math.round((paris.x + point.x) / 2);
    const controlY = Math.round((paris.y + point.y) / 2 - (pin.id === 'lille' ? 36 : pin.id === 'bordeaux' ? 18 : -14));

    return {
      id: pin.id,
      d: `M${paris.x} ${paris.y} Q${controlX} ${controlY} ${point.x} ${point.y}`,
    };
  });
