export const POKEMON_CONSTANTS = {
  MAX_POKEMON: 150,
  MIN_POKEMON: 1,
  ITEMS_PER_PAGE: 20,
  SEARCH_DEBOUNCE_MS: 500,
  CACHE_STALE_TIME: 1000 * 60 * 15, // 15 minutes
  EVOLUTION_CACHE_TIME: 1000 * 60 * 60, // 1 hour
  ID_PADDING_LENGTH: 3,
} as const;

export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const TOAST_MESSAGES = {
  ADD_FAVORITE_SUCCESS: 'Added to favorites!',
  REMOVE_FAVORITE_SUCCESS: 'Removed from favorites!',
  CLEAR_FAVORITES_SUCCESS: 'All favorites cleared!',
  ADD_FAVORITE_ERROR: 'Failed to add to favorites',
  REMOVE_FAVORITE_ERROR: 'Failed to remove from favorites',
  LOAD_POKEMON_ERROR: 'Failed to load Pokémon',
  SEARCH_ERROR: 'Failed to search Pokémon',
} as const;
