import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import pokeApiClient from '../utils/pokemonApiClient';
import { POKEMON_CONSTANTS } from '../constants';

/**
 * Get all Pokemon (first 150)
 */
export const getAllPokemon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit =
      parseInt(req.query.limit as string) || POKEMON_CONSTANTS.DEFAULT_LIMIT;
    const offset =
      parseInt(req.query.offset as string) || POKEMON_CONSTANTS.DEFAULT_OFFSET;

    if (
      limit < POKEMON_CONSTANTS.MIN_LIMIT ||
      limit > POKEMON_CONSTANTS.MAX_LIMIT
    ) {
      return next(
        new AppError(
          `Limit must be between ${POKEMON_CONSTANTS.MIN_LIMIT} and ${POKEMON_CONSTANTS.MAX_LIMIT}`,
          400
        )
      );
    }

    if (offset < POKEMON_CONSTANTS.MIN_OFFSET) {
      return next(new AppError('Offset must be non-negative', 400));
    }

    const pokemonList = await pokeApiClient.getPokemonList(limit, offset);

    const detailedPokemon = await Promise.all(
      pokemonList.results.map((pokemon) =>
        pokeApiClient.getPokemonDetails(pokemon.name)
      )
    );

    res.status(200).json({
      status: 'success',
      results: detailedPokemon.length,
      data: { pokemon: detailedPokemon },
    });
  }
);

/**
 * Get a single Pokemon by ID or name
 */
export const getPokemon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id?.trim()) {
      return next(new AppError('Pokemon ID or name is required', 400));
    }

    const isNumericId = /^\d+$/.test(id);
    if (isNumericId) {
      const numId = parseInt(id);
      if (
        numId < POKEMON_CONSTANTS.MIN_POKEMON_ID ||
        numId > POKEMON_CONSTANTS.MAX_POKEMON_ID
      ) {
        return next(
          new AppError(
            `Pokemon ID must be between ${POKEMON_CONSTANTS.MIN_POKEMON_ID} and ${POKEMON_CONSTANTS.MAX_POKEMON_ID}`,
            400
          )
        );
      }
    }

    let pokemon;
    try {
      pokemon = await pokeApiClient.getPokemonDetails(id);
    } catch {
      return next(new AppError('No Pokemon found with that ID or name', 404));
    }

    if (!pokemon) {
      return next(new AppError('No Pokemon found with that ID', 404));
    }

    const hasValidSprite =
      pokemon.sprites?.front_default ||
      pokemon.sprites?.other?.['official-artwork']?.front_default;

    if (!hasValidSprite) {
      pokemon.sprites = { ...pokemon.sprites, front_default: '' };
    }

    let evolutionChain: string[] = [];
    try {
      const species = await pokeApiClient.getPokemonSpecies(id);
      if (species?.evolution_chain?.url) {
        const evolutionData = await pokeApiClient.getEvolutionChain(
          species.evolution_chain.url
        );
        evolutionChain = pokeApiClient.extractEvolutions(evolutionData);
      }
    } catch (error) {
      console.log('Evolution chain not available for this Pokemon:', error);
    }

    res.status(200).json({
      status: 'success',
      data: { pokemon, evolutions: evolutionChain },
    });
  }
);

/**
 * Search Pokemon by name
 */
export const searchPokemon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;

    if (!name?.trim()) {
      return next(new AppError('Please provide a Pokemon name to search', 400));
    }

    if (!POKEMON_CONSTANTS.VALID_NAME_REGEX.test(name)) {
      return next(
        new AppError(
          'Invalid Pokemon name format. Use only letters, numbers, and hyphens',
          400
        )
      );
    }

    if (name.length > POKEMON_CONSTANTS.MAX_NAME_LENGTH) {
      return next(new AppError('Pokemon name too long', 400));
    }

    try {
      const pokemon = await pokeApiClient.getPokemonDetails(name.toLowerCase());

      if (!pokemon.id || !pokemon.name) {
        return next(new AppError('Invalid Pokemon data received', 500));
      }

      res.status(200).json({
        status: 'success',
        data: { pokemon },
      });
    } catch {
      return next(new AppError('No Pokemon found with that name', 404));
    }
  }
);

export const validatePokemonExists = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pokemonId, pokemonName, pokemonSprite } = req.body;

    if (!pokemonId || !pokemonName) {
      return next(new AppError('Pokemon ID and name are required', 400));
    }

    if (
      !Number.isInteger(pokemonId) ||
      pokemonId < POKEMON_CONSTANTS.MIN_POKEMON_ID
    ) {
      return next(
        new AppError('Invalid Pokemon ID. Must be a positive integer', 400)
      );
    }

    if (pokemonId > POKEMON_CONSTANTS.MAX_POKEMON_ID) {
      return next(new AppError('Pokemon ID out of range', 400));
    }

    try {
      const pokemon = await pokeApiClient.getPokemonDetails(
        pokemonId.toString()
      );

      if (!pokemon) {
        return next(new AppError('Pokemon does not exist', 404));
      }

      if (pokemon.name.toLowerCase() !== pokemonName.toLowerCase()) {
        return next(new AppError('Pokemon ID and name do not match', 400));
      }

      if (pokemonSprite) {
        try {
          new URL(pokemonSprite);
        } catch {
          return next(new AppError('Invalid sprite URL format', 400));
        }

        const isAllowedDomain = POKEMON_CONSTANTS.SPRITE_ALLOWED_DOMAINS.some(
          (domain) => pokemonSprite.includes(domain)
        );

        if (!isAllowedDomain) {
          return next(new AppError('Sprite URL must be from PokeAPI', 400));
        }
      }

      req.body.verifiedPokemon = pokemon;
      next();
    } catch {
      return next(new AppError('Failed to verify Pokemon existence', 500));
    }
  }
);
