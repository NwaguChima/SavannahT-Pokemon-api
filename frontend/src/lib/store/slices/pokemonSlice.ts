import type { Pokemon, PokemonFilter } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  selectedPokemon: Pokemon | null;
  filter: PokemonFilter;
  searchQuery: string;
  favoriteIds: number[];
}

const initialState: PokemonState = {
  selectedPokemon: null,
  filter: 'all',
  searchQuery: '',
  favoriteIds: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.selectedPokemon = action.payload;
    },
    setFilter: (state, action: PayloadAction<PokemonFilter>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFavoriteIds: (state, action: PayloadAction<number[]>) => {
      state.favoriteIds = action.payload;
    },
    addFavoriteId: (state, action: PayloadAction<number>) => {
      if (!state.favoriteIds.includes(action.payload)) {
        state.favoriteIds.push(action.payload);
      }
    },
    removeFavoriteId: (state, action: PayloadAction<number>) => {
      state.favoriteIds = state.favoriteIds.filter(
        (id) => id !== action.payload
      );
    },
    clearAllFavorites: (state) => {
      state.favoriteIds = [];
    },
  },
});

export const {
  setSelectedPokemon,
  setFilter,
  setSearchQuery,
  setFavoriteIds,
  addFavoriteId,
  removeFavoriteId,
  clearAllFavorites,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
