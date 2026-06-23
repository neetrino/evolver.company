/** Evolver Armenia office — used for map embed and directions links. */
export const EVOLVER_ARMENIA_ADDRESS_LINES = [
  "Adonts 4/3, Penthouse",
  "0014 Yerevan",
  "Armenia",
] as const;

export const EVOLVER_ARMENIA_COORDINATES = {
  lat: 40.1953,
  lng: 44.5294,
} as const;

const EVOLVER_ARMENIA_MAP_QUERY = encodeURIComponent(
  "Adonts 4/3, Penthouse, Yerevan, Armenia",
);

/** Google Maps embed (no API key required). */
export const EVOLVER_ARMENIA_MAP_EMBED_URL = `https://www.google.com/maps?q=${EVOLVER_ARMENIA_MAP_QUERY}&z=17&output=embed`;

export const EVOLVER_ARMENIA_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${EVOLVER_ARMENIA_MAP_QUERY}`;
