import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

/**
 * Validate Pokemon ID parameter
 */
export const validatePokemonId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, pokemonId } = req.params;
  const idToValidate = id || pokemonId;

  if (!idToValidate) {
    return next(new AppError('Pokemon ID is required', 400));
  }

  // Check if it's a valid number or string
  if (isNaN(Number(idToValidate)) && typeof idToValidate !== 'string') {
    return next(new AppError('Invalid Pokemon ID format', 400));
  }

  next();
};

/**
 * Validate Pokemon search name parameter
 */
export const validatePokemonSearch = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;

  if (!name) {
    return next(new AppError('Pokemon name is required for search', 400));
  }

  if (typeof name !== 'string' || name.trim().length === 0) {
    return next(new AppError('Invalid Pokemon name format', 400));
  }

  next();
};

/**
 * Validate add favorite request body
 */
export const validateAddFavorite = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { pokemonId, pokemonName } = req.body;

  if (!pokemonId) {
    return next(new AppError('Pokemon ID is required', 400));
  }

  if (!pokemonName) {
    return next(new AppError('Pokemon name is required', 400));
  }

  if (isNaN(Number(pokemonId))) {
    return next(new AppError('Pokemon ID must be a number', 400));
  }

  if (typeof pokemonName !== 'string' || pokemonName.trim().length === 0) {
    return next(new AppError('Invalid Pokemon name format', 400));
  }

  // Validate pokemonSprite if provided
  if (req.body.pokemonSprite && typeof req.body.pokemonSprite !== 'string') {
    return next(new AppError('Pokemon sprite must be a valid URL string', 400));
  }

  next();
};
