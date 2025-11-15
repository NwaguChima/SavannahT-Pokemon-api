import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import Favorite from '../models/favoriteModel';
import { FavoriteInput } from '../types';

/**
 * Get all favorite Pokemon
 */
export const getAllFavorites = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const favorites = await Favorite.find().sort({ addedAt: -1 });

    res.status(200).json({
      status: 'success',
      results: favorites.length,
      data: {
        favorites,
      },
    });
  }
);

/**
 * Add a Pokemon to favorites
 */
export const addFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pokemonId, pokemonName, pokemonSprite }: FavoriteInput = req.body;

    if (!pokemonId || !pokemonName) {
      return next(new AppError('Please provide both Pokemon ID and name', 400));
    }

    // Check if already in favorites
    const existingFavorite = await Favorite.findOne({ pokemonId });

    if (existingFavorite) {
      return next(new AppError('This Pokemon is already in favorites', 400));
    }

    const favorite = await Favorite.create({
      pokemonId,
      pokemonName,
      pokemonSprite,
    });

    res.status(201).json({
      status: 'success',
      data: {
        favorite,
      },
    });
  }
);

/**
 * Remove a Pokemon from favorites
 */
export const removeFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pokemonId } = req.params;

    if (!pokemonId) {
      return next(new AppError('Please provide a Pokemon ID', 400));
    }

    const favorite = await Favorite.findOneAndDelete({
      pokemonId: parseInt(pokemonId),
    });

    if (!favorite) {
      return next(new AppError('No favorite found with that Pokemon ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: null,
      message: 'Favorite removed successfully',
    });
  }
);

/**
 * Check if a Pokemon is in favorites
 */
export const checkFavorite = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pokemonId } = req.params;

    const favorite = await Favorite.findOne({
      pokemonId: parseInt(pokemonId),
    });

    res.status(200).json({
      status: 'success',
      data: {
        isFavorite: !!favorite,
      },
    });
  }
);

/**
 * Clear all favorites
 */
export const clearAllFavorites = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Favorite.deleteMany({});

    res.status(200).json({
      status: 'success',
      data: null,
      message: 'All favorites cleared successfully',
    });
  }
);
