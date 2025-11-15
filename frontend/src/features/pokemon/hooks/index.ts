// NOTE: this would normally be all in separate files, and also will be kept in api folders closest to where they are used, if shared across component, then in the closes shared folder. Also the naming is just a convention I prefer for hooks.

export { usePokemonList } from './api/use-pokemon-list';
export { usePokemonDetail } from './api/use-pokemon-details';
export { usePokemonSearch } from './api/use-pokemon-search';
export { useFavorites } from './api/use-favorites';
export { useInfiniteScroll } from './helpers/use-infinite-scroll';
