export const POKEMON_CONSTANTS = {
  DEFAULT_LIMIT: 10,
  DEFAULT_OFFSET: 0,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
  MIN_OFFSET: 0,
  MAX_POKEMON_ID: 1025,
  MIN_POKEMON_ID: 1,
  MAX_NAME_LENGTH: 50,
  VALID_NAME_REGEX: /^[a-zA-Z0-9-]+$/,
  SPRITE_ALLOWED_DOMAINS: ['raw.githubusercontent.com', 'pokeapi.co'],
} as const;
