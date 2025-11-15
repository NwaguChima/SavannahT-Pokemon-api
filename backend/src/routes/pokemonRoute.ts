import express from 'express';
import {
  getAllPokemon,
  getPokemon,
  searchPokemon,
} from '../controllers/pokemonController';
import {
  validatePokemonId,
  validatePokemonSearch,
} from '../middlewares/validation';

const router = express.Router();

// Search route
router.get('/search/:name', validatePokemonSearch, searchPokemon);

// CRUD routes
router.get('/', getAllPokemon);
router.get('/:id', validatePokemonId, getPokemon);

export default router;
