import type { Pokemon } from '@/types';

// Note: in a standard app each helper will have it's own file and will be put closer to its feature

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Format Pokemon name
 */
export const formatPokemonName = (name: string): string => {
  return name.split('-').map(capitalize).join(' ');
};

/**
 * Get Pokemon sprite URL with fallback
 */
export const getPokemonSprite = (pokemon: Pokemon): string => {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    ''
  );
};

/**
 * Get type color
 */
export const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  return typeColors[type.toLowerCase()] || '#777';
};

/**
 * Format height (decimeters to meters)
 */
export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)} m`;
};

/**
 * Format weight (hectograms to kilograms)
 */
export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)} kg`;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  // @ts-ignore
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if string is valid pokemon ID or name
 */
export const isValidPokemonIdentifier = (value: string): boolean => {
  if (!value || value.trim().length === 0) return false;

  if (!isNaN(Number(value))) {
    const id = Number(value);
    return id >= 1 && id <= 150;
  }

  return /^[a-zA-Z0-9-]+$/.test(value);
};
