import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import pokeApiClient from '../utils/pokemonApiClient';
import { PokemonDetails, ApiResponse } from '../types';

/**
 * Get all Pokemon (first 150)
 */
export const getAllPokemon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const limit = parseInt(req.query.limit as string) || 150;
    const offset = parseInt(req.query.offset as string) || 0;

    const pokemonList = await pokeApiClient.getPokemonList(limit, offset);

    // Fetch detailed data for each Pokemon
    const pokemonPromises = pokemonList.results.map((pokemon) =>
      pokeApiClient.getPokemonDetails(pokemon.name)
    );

    const detailedPokemon = await Promise.all(pokemonPromises);

    res.status(200).json({
      status: 'success',
      results: detailedPokemon.length,
      data: {
        pokemon: detailedPokemon,
      },
    });
  }
);

/**
 * Get a single Pokemon by ID or name
 */
export const getPokemon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const pokemon = await pokeApiClient.getPokemonDetails(id);

    if (!pokemon) {
      return next(new AppError('No Pokemon found with that ID', 404));
    }

    // Fetch evolution chain
    let evolutionChain: string[] = [];
    try {
      const species = await pokeApiClient.getPokemonSpecies(id);
      const evolutionData = await pokeApiClient.getEvolutionChain(
        species.evolution_chain.url
      );
      evolutionChain = pokeApiClient.extractEvolutions(evolutionData);
    } catch (error) {
      console.log('Evolution chain not available for this Pokemon');
    }

    res.status(200).json({
      status: 'success',
      data: {
        pokemon,
        evolutions: evolutionChain,
      },
    });
  }
);

/**
 * Search Pokemon by name
 */
export const searchPokemon = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.params;

    if (!name) {
      return next(new AppError('Please provide a Pokemon name to search', 400));
    }

    try {
      const pokemon = await pokeApiClient.getPokemonDetails(name.toLowerCase());

      res.status(200).json({
        status: 'success',
        data: {
          pokemon,
        },
      });
    } catch (error) {
      return next(new AppError('No Pokemon found with that name', 404));
    }
  }
);
