import { url } from '@/lib/url';

export const endpoints = {
  ALL_POKEMON: url('pokemon'),
  POKEMON_DETAIL: url('pokemon/:id'),
  SEARCH_POKEMON: url('pokemon/search/:name'),
  FAVORITES: url('favorites'),
  REMOVE_FAVORITES: url('favorites/:pokemonId'),
  CHECK_FAVORITES: url('favorites/check/:pokemonId'),
  CLEAR_FAVORITES: url('favorites/clear'),
};
