import express from 'express';
import { getPokemonById } from '../controllers/pokemons.controller.js';

const router = express.Router();

router.get('/:id', getPokemonById);

export default router;