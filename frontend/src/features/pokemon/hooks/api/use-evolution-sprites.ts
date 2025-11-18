import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/types';
import axios from 'axios';
import { getApiErrorMessage } from '@/shared/utils/get-api-error-message';
import { toast } from 'sonner';
import { POKEMON_CONSTANTS } from '@/shared/constants';

interface EvolutionSprites {
  [key: string]: string;
}

const fetchEvolutionSprites = async (
  evolutions: string[]
): Promise<EvolutionSprites> => {
  if (!evolutions.length) return {};

  const sprites: EvolutionSprites = {};

  const fetchPromises = evolutions.map(async (evoName) => {
    try {
      //  NOTE: would normally be routed from the backend or at least setup properly from the env to the api layer, but just to save time
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${evoName.toLowerCase()}`
      );
      sprites[evoName] = response.data.sprites.front_default || '';
    } catch (error) {
      const message = getApiErrorMessage(
        error,
        `Failed to fetch sprite for ${evoName}`
      );
      toast.error(message);
      sprites[evoName] = '';
    }
  });

  await Promise.all(fetchPromises);
  return sprites;
};

export const useEvolutionSprites = (evolutions: string[]) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.EVOLUTION_SPRITES, evolutions],
    queryFn: () => fetchEvolutionSprites(evolutions),
    enabled: evolutions.length > 0,
    staleTime: POKEMON_CONSTANTS.EVOLUTION_CACHE_TIME,
  });

  return {
    evolutionSprites: data || {},
    isLoading,
    error,
  };
};
