import express from 'express';
import { getPokemonById, getPokemonList, ajouterPokemon, modifierPokemon, supprimerPokemon } from '../controllers/pokemons.controller.js';

const router = express.Router();

router.get('/liste', getPokemonList);
router.get('/:id', getPokemonById);
router.put('/:id', modifierPokemon);
router.delete('/:id', supprimerPokemon);
router.post('/', ajouterPokemon);

export default router;