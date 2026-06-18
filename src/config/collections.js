export const HOME_COLLECTIONS = [
  { label: 'Anarkali Suit', handle: 'anarkali-suit', image: null },
  { label: 'Co-ord Set', handle: 'co-ord-set', image: null },
  { label: 'Indo-Western', handle: 'indo-western-1', image: null },
  { label: 'Kurta Sets', handle: 'kurta-set', image: null },
  { label: 'Plus Size Store', handle: 'plus-size-store', image: null },
]

export const NAV_ITEMS = [
  { label: 'New Arrival', href: '/collections/new-arrivals' },
  {
    label: 'Traditional',
    href: '/collections/traditional',
    children: [
      { label: 'Anarkali Suit', href: '/collections/anarkali-suit' },
      { label: 'Dupatta Set', href: '/collections/dupatta-set' },
      { label: 'Kurta Sets', href: '/collections/kurta-set' },
      { label: 'Co-ord Set', href: '/collections/co-ord-set' },
    ],
  },
  {
    label: 'Indo-Western',
    href: '/collections/indo-western-1',
    children: [
      { label: 'Ethnic Gowns', href: '/collections/ethnic-gowns' },
      { label: 'Indo-Western Pairs', href: '/collections/indo-western-pairs' },
    ],
  },
  {
    label: 'Plus Size Store',
    href: '/collections/plus-size-store',
    children: [
      { label: 'Kurta Set', href: '/collections/plus-size-kurta-set' },
      { label: 'Suit Set', href: '/collections/plus-size-suit-set' },
      { label: 'Co-ord Set', href: '/collections/co-ord-set-plus-size' },
    ],
  },
  { label: 'Under 1199', href: '/collections/under-1199' },
]
