import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@lib/store/hooks';
import { setSelectedPokemon, setFilter } from '@lib/store/slices/pokemonSlice';
import ConfirmationModal from '@/shared/components/confirmation-modal/ConfirmationModal';
import { type Pokemon } from '@/types';
import Header from '../../components/header/Header';
import SearchBar from '../../components/search-bar/SearchBar';
import FilterBar from '../../components/filter-bar/FilterBar';
import PokemonList from '../../components/pokemon-list/PokemonList';
import { useFavorites } from '../../hooks';
import styles from './PokemonHome.module.scss';
import Loader from '@/shared/components/loader/Loader';

// This will not add any impact, I only added because of the requirement, but this has no effect on the application, or it's performance
const PokemonDetail = lazy(
  () => import('../../components/pokemon-details/PokemonDetails')
);

const PokemonHomePage = () => {
  const dispatch = useAppDispatch();
  const { selectedPokemon, filter, favoriteIds } = useAppSelector(
    (state) => state.pokemon
  );
  const [showDetail, setShowDetail] = useState(false);

  const {
    toggleFavorite,
    openClearConfirmation,
    closeClearConfirmation,
    confirmClearAllFavorites,
    showConfirmModal,
    isClearingFavorites,
    isTogglingFavorite,
  } = useFavorites();

  const handleToggleFavorite = useCallback(
    (pokemon: Pokemon) => {
      const isFavorite = favoriteIds.includes(pokemon.id);
      toggleFavorite(pokemon, isFavorite);
    },
    [favoriteIds, toggleFavorite]
  );

  const handleSelectPokemon = useCallback(
    (pokemon: Pokemon) => {
      dispatch(setSelectedPokemon(pokemon));
      setShowDetail(true);
    },
    [dispatch]
  );

  const handleCloseDetail = useCallback(() => {
    setShowDetail(false);
    dispatch(setSelectedPokemon(null));
  }, [dispatch]);

  const handleFilterChange = useCallback(
    (newFilter: typeof filter) => {
      dispatch(setFilter(newFilter));
    },
    [dispatch]
  );

  const isSelectedFavorite = useMemo(
    () => (selectedPokemon ? favoriteIds.includes(selectedPokemon.id) : false),
    [selectedPokemon, favoriteIds]
  );

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.page__content}>
        <section className={styles.page__search}>
          <SearchBar onPokemonFound={handleSelectPokemon} />
        </section>

        <section className={styles.page__filter}>
          <FilterBar
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            favoriteCount={favoriteIds.length}
            onClearFavorites={openClearConfirmation}
          />
        </section>

        <PokemonList
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          onSelectPokemon={handleSelectPokemon}
          showOnlyFavorites={filter === 'favorites'}
        />
      </main>

      {selectedPokemon && (
        <Suspense
          fallback={
            <div>
              <Loader size="sm" variant="pokeball" />
            </div>
          }
        >
          <PokemonDetail
            isOpen={showDetail}
            pokemon={selectedPokemon}
            isFavorite={isSelectedFavorite}
            onToggleFavorite={handleToggleFavorite}
            onClose={handleCloseDetail}
            isDisabled={isTogglingFavorite}
          />
        </Suspense>
      )}

      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Clear All Favorites?"
        message="Are you sure you want to remove all Pokémon from your favorites? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        onConfirm={confirmClearAllFavorites}
        onCancel={closeClearConfirmation}
        isLoading={isClearingFavorites}
      />
    </div>
  );
};
export default PokemonHomePage;
