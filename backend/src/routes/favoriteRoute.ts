import express from 'express';
import {
  getAllFavorites,
  addFavorite,
  removeFavorite,
  checkFavorite,
  clearAllFavorites,
} from '../controllers/favoriteController';
import {
  validateAddFavorite,
  validatePokemonId,
} from '../middlewares/validation';

const router = express.Router();

// Check if a Pokemon is favorite
router.get('/check/:pokemonId', validatePokemonId, checkFavorite);

// Clear all favorites
router.delete('/clear', clearAllFavorites);

// CRUD routes
router.route('/').get(getAllFavorites).post(validateAddFavorite, addFavorite);

router.delete('/:pokemonId', validatePokemonId, removeFavorite);

export default router;
