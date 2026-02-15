import express from 'express';
import { getPokemonById, getPokemonList } from '../controllers/pokemons.controller.js';

const router = express.Router();

router.get('/liste', getPokemonList);
router.get('/:id', getPokemonById);

export default router;