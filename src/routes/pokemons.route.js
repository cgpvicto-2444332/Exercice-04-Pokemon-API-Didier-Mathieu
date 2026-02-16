import express from 'express';
import { getPokemonById, getPokemonList, ajouterPokemon } from '../controllers/pokemons.controller.js';

const router = express.Router();

router.get('/liste', getPokemonList);
router.get('/:id', getPokemonById);
router.post('/', ajouterPokemon);

export default router;