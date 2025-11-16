import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApi } from '@lib/api/pokemon';
import { POKEMON_CONSTANTS } from '@shared/constants';
import { QUERY_KEYS, type Pokemon } from '@/types';

export const usePokemonList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.POKEMON_LIST],
    queryFn: ({ pageParam = 0 }) =>
      pokemonApi.getPokemonList(POKEMON_CONSTANTS.ITEMS_PER_PAGE, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (acc, page) => acc + page.data.pokemon.length,
        0
      );
      if (totalFetched >= POKEMON_CONSTANTS.MAX_POKEMON) {
        return undefined;
      }
      return totalFetched;
    },
    initialPageParam: 0,
    staleTime: Infinity,
  });

  // Flatten all pages into single array
  const allPokemon: Pokemon[] =
    data?.pages.flatMap((page) => page.data.pokemon) || [];

  return {
    allPokemon,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  };
};
