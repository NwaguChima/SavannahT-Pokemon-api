import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '@lib/api/pokemon';
import { QUERY_KEYS } from '@/types';

export const usePokemonDetail = (pokemonId: number | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.POKEMON_DETAIL, pokemonId],
    queryFn: () => pokemonApi.getPokemonDetails(pokemonId!),
    enabled: !!pokemonId,
  });

  const evolutions = data?.data.evolutions || [];

  return {
    evolutions,
    isLoading,
    error,
  };
};
