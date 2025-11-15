import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { pokemonApi } from '@lib/api/pokemon';
import { useAppDispatch } from '@lib/store/hooks';
import {
  setFavoriteIds,
  addFavoriteId,
  removeFavoriteId,
  clearAllFavorites as clearAllFavoritesAction,
} from '@lib/store/slices/pokemonSlice';
import { TOAST_MESSAGES } from '@shared/constants';
import { QUERY_KEYS, type Pokemon } from '@/types';
import { getPokemonSprite } from '@/shared/utils/pokemon-helpers';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Fetch favorites
  const { data: favoritesData } = useQuery({
    queryKey: [QUERY_KEYS.FAVORITES],
    queryFn: pokemonApi.getFavorites,
  });

  // Update Redux state when favorites change
  useEffect(() => {
    if (favoritesData?.data.favorites) {
      const ids = favoritesData.data.favorites.map((fav) => fav.pokemonId);
      dispatch(setFavoriteIds(ids));
    }
  }, [favoritesData, dispatch]);

  // Add to favorites mutation
  const addFavoriteMutation = useMutation({
    mutationFn: (pokemon: Pokemon) =>
      pokemonApi.addFavorite({
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        pokemonSprite: getPokemonSprite(pokemon),
      }),
    onSuccess: (_, pokemon) => {
      dispatch(addFavoriteId(pokemon.id));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAVORITES] });
      toast.success(TOAST_MESSAGES.ADD_FAVORITE_SUCCESS);
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.ADD_FAVORITE_ERROR);
    },
  });

  // Remove from favorites mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: (pokemonId: number) => pokemonApi.removeFavorite(pokemonId),
    onSuccess: (_, pokemonId) => {
      dispatch(removeFavoriteId(pokemonId));
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAVORITES] });
      toast.success(TOAST_MESSAGES.REMOVE_FAVORITE_SUCCESS);
    },
    onError: () => {
      toast.error(TOAST_MESSAGES.REMOVE_FAVORITE_ERROR);
    },
  });

  // Clear all favorites mutation
  const clearFavoritesMutation = useMutation({
    mutationFn: pokemonApi.clearAllFavorites,
    onSuccess: () => {
      dispatch(clearAllFavoritesAction());
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAVORITES] });
      toast.success(TOAST_MESSAGES.CLEAR_FAVORITES_SUCCESS);
      setShowConfirmModal(false);
    },
    onError: () => {
      toast.error('Failed to clear favorites');
      setShowConfirmModal(false);
    },
  });

  const toggleFavorite = (pokemon: Pokemon, isFavorite: boolean) => {
    if (isFavorite) {
      removeFavoriteMutation.mutate(pokemon.id);
    } else {
      addFavoriteMutation.mutate(pokemon);
    }
  };

  const openClearConfirmation = () => {
    setShowConfirmModal(true);
  };

  const closeClearConfirmation = () => {
    setShowConfirmModal(false);
  };

  const confirmClearAllFavorites = () => {
    clearFavoritesMutation.mutate();
  };

  return {
    toggleFavorite,
    openClearConfirmation,
    closeClearConfirmation,
    confirmClearAllFavorites,
    showConfirmModal,
    isAddingFavorite: addFavoriteMutation.isPending,
    isRemovingFavorite: removeFavoriteMutation.isPending,
    isClearingFavorites: clearFavoritesMutation.isPending,
  };
};
