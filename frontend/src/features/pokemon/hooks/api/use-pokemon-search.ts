import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { pokemonApi } from '@lib/api/pokemon';
import { TOAST_MESSAGES } from '@shared/constants';
import type { Pokemon } from '@/types';
import { isValidPokemonIdentifier } from '@/shared/utils/pokemon-helpers';

export const usePokemonSearch = (
  onPokemonFound: (pokemon: Pokemon) => void
) => {
  const [searchValue, setSearchValue] = useState('');

  const searchMutation = useMutation({
    mutationFn: (name: string) => pokemonApi.searchPokemon(name),
    onSuccess: (data) => {
      onPokemonFound(data.data.pokemon);
      setSearchValue('');
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.SEARCH_ERROR);
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim().toLowerCase();

    if (!trimmedValue) {
      return;
    }

    if (!isValidPokemonIdentifier(trimmedValue)) {
      toast.error('Please enter a valid Pokémon name or ID (1-150)');
      return;
    }

    searchMutation.mutate(trimmedValue);
  };

  return {
    searchValue,
    setSearchValue,
    handleSearch,
    isSearching: searchMutation.isPending,
  };
};
