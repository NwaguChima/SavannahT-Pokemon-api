import { Request } from 'express';
import { Document } from 'mongoose';

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

export interface PokemonDetails {
  id: number;
  name: string;
  abilities: PokemonAbility[];
  types: PokemonType[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface EvolutionChainSpecies {
  name: string;
  url: string;
}

export interface EvolutionDetail {
  min_level?: number;
  trigger: {
    name: string;
    url: string;
  };
  item?: {
    name: string;
    url: string;
  };
}

export interface ChainLink {
  species: EvolutionChainSpecies;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionChain {
  id: number;
  chain: ChainLink;
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
}

export interface IFavorite extends Document {
  pokemonId: number;
  pokemonName: string;
  pokemonSprite?: string;
  addedAt: Date;
}

export interface FavoriteInput {
  pokemonId: number;
  pokemonName: string;
  pokemonSprite?: string;
}

export interface CustomRequest extends Request {
  user?: any;
}

export interface ApiResponse<T> {
  status: string;
  results?: number;
  data: T;
}

export interface ErrorResponse {
  status: string;
  message: string;
}
