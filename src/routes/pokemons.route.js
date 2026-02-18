import express from 'express';
import { getPokemonById, getPokemonList, ajouterPokemon, modifierPokemon } from '../controllers/pokemons.controller.js';

const router = express.Router();

router.get('/liste', getPokemonList);
router.get('/:id', getPokemonById);
router.put('/:id', modifierPokemon);
router.post('/', ajouterPokemon);

export default router;