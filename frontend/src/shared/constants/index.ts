export const POKEMON_CONSTANTS = {
  MAX_POKEMON: 150,
  ITEMS_PER_PAGE: 20,
  SEARCH_DEBOUNCE_MS: 500,
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
