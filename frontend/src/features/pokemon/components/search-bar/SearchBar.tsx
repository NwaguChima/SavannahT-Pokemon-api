import type { Pokemon } from '@/types';
import Input from '@/shared/components/input/Input';
import Button from '@/shared/components/button/Button';
import styles from './SearchBar.module.scss';
import { usePokemonSearch } from '../../hooks';

interface SearchBarProps {
  onPokemonFound: (pokemon: Pokemon) => void;
}

const SearchBar = ({ onPokemonFound }: SearchBarProps) => {
  const { searchValue, setSearchValue, handleSearch, isSearching } =
    usePokemonSearch(onPokemonFound);

  return (
    <form className={styles.search} onSubmit={handleSearch}>
      <Input
        type="text"
        placeholder="Search Pokémon by name or ID..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        icon={<span>🔍</span>}
      />
      <Button
        type="submit"
        variant="secondary"
        isLoading={isSearching}
        disabled={!searchValue.trim()}
      >
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
