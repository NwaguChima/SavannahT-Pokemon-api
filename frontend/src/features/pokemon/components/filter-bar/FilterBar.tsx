import type { PokemonFilter } from '@/types';
import Button from '@/shared/components/button/Button';
import styles from './FilterBar.module.scss';

interface FilterBarProps {
  currentFilter: PokemonFilter;
  onFilterChange: (filter: PokemonFilter) => void;
  favoriteCount: number;
  onClearFavorites: () => void;
}

const FilterBar = ({
  currentFilter,
  onFilterChange,
  favoriteCount,
  onClearFavorites,
}: FilterBarProps) => {
  return (
    <div className={styles.filter}>
      <div className={styles.filter__tabs}>
        <button
          className={`${styles.filter__tab} ${
            currentFilter === 'all' ? styles['filter__tab--active'] : ''
          }`}
          onClick={() => onFilterChange('all')}
        >
          All Pokémon
        </button>
        <button
          className={`${styles.filter__tab} ${
            currentFilter === 'favorites' ? styles['filter__tab--active'] : ''
          }`}
          onClick={() => onFilterChange('favorites')}
        >
          ⭐ Favorites ({favoriteCount})
        </button>
      </div>

      {favoriteCount > 0 && (
        <Button variant="outline" size="sm" onClick={onClearFavorites}>
          Clear All Favorites
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
