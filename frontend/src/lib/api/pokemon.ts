import type {
  AddFavoritePayload,
  CheckFavoriteResponse,
  FavoritesResponse,
  PokemonDetailResponse,
  PokemonListResponse,
} from '@/types';
import apiClient from './client';

export const pokemonApi = {
  getPokemonList: async (limit: number = 20, offset: number = 0) => {
    const response = await apiClient.get<PokemonListResponse>('/pokemon', {
      params: { limit, offset },
    });
    return response.data;
  },

  getPokemonDetails: async (id: number) => {
    const response = await apiClient.get<PokemonDetailResponse>(
      `/pokemon/${id}`
    );
    return response.data;
  },

  searchPokemon: async (name: string) => {
    const response = await apiClient.get<PokemonDetailResponse>(
      `/pokemon/search/${name}`
    );
    return response.data;
  },

  getFavorites: async () => {
    const response = await apiClient.get<FavoritesResponse>('/favorites');
    return response.data;
  },

  addFavorite: async (payload: AddFavoritePayload) => {
    const response = await apiClient.post('/favorites', payload);
    return response.data;
  },

  removeFavorite: async (pokemonId: number) => {
    const response = await apiClient.delete(`/favorites/${pokemonId}`);
    return response.data;
  },

  checkFavorite: async (pokemonId: number) => {
    const response = await apiClient.get<CheckFavoriteResponse>(
      `/favorites/check/${pokemonId}`
    );
    return response.data;
  },

  clearAllFavorites: async () => {
    const response = await apiClient.delete('/favorites/clear');
    return response.data;
  },
};
