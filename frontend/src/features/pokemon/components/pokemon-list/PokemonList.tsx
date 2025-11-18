import Loader from '@/shared/components/loader/Loader';
import PokemonCard from '../pokemon-card/PokemonCard';
import styles from './PokemonList.module.scss';
import { POKEMON_CONSTANTS } from '@shared/constants';
import { type Pokemon } from '@/types';
import { useInfiniteScroll, usePokemonList } from '../../hooks';
import { getApiErrorMessage } from '@/shared/utils/get-api-error-message';
import { useMemo } from 'react';

interface PokemonListProps {
  favoriteIds: number[];
  onToggleFavorite: (pokemon: Pokemon) => void;
  onSelectPokemon: (pokemon: Pokemon) => void;
  showOnlyFavorites: boolean;
}

const PokemonList = ({
  favoriteIds,
  onToggleFavorite,
  onSelectPokemon,
  showOnlyFavorites,
}: PokemonListProps) => {
  const {
    allPokemon,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePokemonList();

  // Filter by favorites if needed
  const displayedPokemon = useMemo(() => {
    return showOnlyFavorites
      ? allPokemon.filter((pokemon) => favoriteIds.includes(pokemon.id))
      : allPokemon;
  }, [showOnlyFavorites, allPokemon, favoriteIds]);

  // Only enable infinite scroll when showing all Pokemon (not favorites)
  const shouldEnableScroll = !showOnlyFavorites && hasNextPage;

  const { observerTarget } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage: shouldEnableScroll ?? false,
    isFetchingNextPage,
  });

  if (isLoading) {
    return <Loader size="lg" text="Loading Pokémon..." variant="pokeball" />;
  }

  if (error) {
    const message = getApiErrorMessage(
      error,
      'Failed to load Pokémon. Please try again.'
    );

    return (
      <div className={styles.list__error}>
        <p>{message}</p>
      </div>
    );
  }

  if (displayedPokemon.length === 0) {
    return (
      <div className={styles.list__empty}>
        <p>
          {showOnlyFavorites
            ? 'No favorites yet. Start adding some!'
            : 'No Pokémon found'}
        </p>
      </div>
    );
  }

  return (
    <section className={styles.list}>
      <div className={styles.list__grid}>
        {displayedPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={favoriteIds.includes(pokemon.id)}
            onToggleFavorite={onToggleFavorite}
            onClick={onSelectPokemon}
          />
        ))}
      </div>

      {/* Intersection observer target - only show when not in favorites view */}
      {!showOnlyFavorites && (
        <div ref={observerTarget} className={styles.list__observer}>
          {isFetchingNextPage && <Loader size="sm" text="Loading more..." />}
          {!hasNextPage && allPokemon.length > 0 && (
            <p className={styles.list__end}>
              You've seen all {POKEMON_CONSTANTS.MAX_POKEMON} Pokémon!
            </p>
          )}
        </div>
      )}
    </section>
  );
};
export default PokemonList;
