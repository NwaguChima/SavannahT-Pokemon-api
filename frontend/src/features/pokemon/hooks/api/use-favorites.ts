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
import { getApiErrorMessage } from '@/shared/utils/get-api-error-message';

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

  // Add to favorites mutation with optimistic update
  const addFavoriteMutation = useMutation({
    mutationFn: (pokemon: Pokemon) =>
      pokemonApi.addFavorite({
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        pokemonSprite: getPokemonSprite(pokemon),
      }),
    onMutate: async (pokemon) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.FAVORITES] });

      const previousFavorites = queryClient.getQueryData([
        QUERY_KEYS.FAVORITES,
      ]);

      dispatch(addFavoriteId(pokemon.id));

      return { previousFavorites };
    },
    onSuccess: (_, pokemon) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAVORITES] });
      toast.success(TOAST_MESSAGES.ADD_FAVORITE_SUCCESS);
    },
    onError: (error, pokemon, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          [QUERY_KEYS.FAVORITES],
          context.previousFavorites
        );
        dispatch(removeFavoriteId(pokemon.id));
      }

      const message = getApiErrorMessage(
        error,
        TOAST_MESSAGES.ADD_FAVORITE_ERROR
      );

      toast.error(message);
    },
  });

  // Remove from favorites mutation with optimistic update
  const removeFavoriteMutation = useMutation({
    mutationFn: (pokemonId: number) => pokemonApi.removeFavorite(pokemonId),
    onMutate: async (pokemonId) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.FAVORITES] });

      const previousFavorites = queryClient.getQueryData([
        QUERY_KEYS.FAVORITES,
      ]);

      dispatch(removeFavoriteId(pokemonId));

      return { previousFavorites };
    },
    onSuccess: (_, pokemonId) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAVORITES] });
      toast.success(TOAST_MESSAGES.REMOVE_FAVORITE_SUCCESS);
    },
    onError: (error, pokemonId, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(
          [QUERY_KEYS.FAVORITES],
          context.previousFavorites
        );
        dispatch(addFavoriteId(pokemonId));
      }

      const message = getApiErrorMessage(
        error,
        TOAST_MESSAGES.REMOVE_FAVORITE_ERROR
      );

      toast.error(message);
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
    onError: (error) => {
      const message = getApiErrorMessage(error, 'Failed to clear favorites');
      toast.error(message);
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
    isTogglingFavorite:
      addFavoriteMutation.isPending || removeFavoriteMutation.isPending,
  };
};
