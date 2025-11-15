import { POKEMON_CONSTANTS } from '@shared/constants';
import { type Pokemon } from '@/types';
import Loader from '@/shared/components/loader/Loader';
import PokemonCard from '../pokemon-card/PokemonCard';
import styles from './PokemonList.module.scss';
import { useInfiniteScroll, usePokemonList } from '../../hooks';

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
  const displayedPokemon = showOnlyFavorites
    ? allPokemon.filter((pokemon) => favoriteIds.includes(pokemon.id))
    : allPokemon;

  // Only enable infinite scroll when showing all Pokemon (not favorites)
  const shouldEnableScroll = !showOnlyFavorites && hasNextPage;

  const { observerTarget } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage: shouldEnableScroll ?? false,
    isFetchingNextPage,
  });

  if (isLoading) {
    return <Loader size="lg" text="Loading Pokémon..." />;
  }

  if (error) {
    return (
      <div className={styles.list__error}>
        <p>Failed to load Pokémon. Please try again.</p>
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
    <div className={styles.list}>
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
    </div>
  );
};
export default PokemonList;
