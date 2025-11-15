// In a large project, I will likely create type file for each of the features or pages

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string;
  other?: {
    'official-artwork'?: {
      front_default: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
}

export interface PokemonListResponse {
  status: string;
  results: number;
  data: {
    pokemon: Pokemon[];
  };
}

export interface PokemonDetailResponse {
  status: string;
  data: {
    pokemon: Pokemon;
    evolutions: string[];
  };
}

// Favorite Types
export interface Favorite {
  _id: string;
  pokemonId: number;
  pokemonName: string;
  pokemonSprite?: string;
  addedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface FavoritesResponse {
  status: string;
  results: number;
  data: {
    favorites: Favorite[];
  };
}

export interface AddFavoritePayload {
  pokemonId: number;
  pokemonName: string;
  pokemonSprite?: string;
}

export interface CheckFavoriteResponse {
  status: string;
  data: {
    isFavorite: boolean;
  };
}

export type PokemonFilter = 'all' | 'favorites';

export const QUERY_KEYS = {
  POKEMON_LIST: 'pokemonList',
  POKEMON_DETAIL: 'pokemonDetail',
  FAVORITES: 'favorites',
  CHECK_FAVORITE: 'checkFavorite',
} as const;
