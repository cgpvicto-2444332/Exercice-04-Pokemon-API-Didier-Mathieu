import { _getPokemonById } from '../models/pokemons.model.js';

export const getPokemonById = async (req, res) => {
    const { id } = req.params;

    try {
        const pokemon = await _getPokemonById(id);
        
        if (pokemon == null) {
            res.status(404).json({
                erreur: `Pokemon introuvable avec l'id ${id}`
            });
            return;
        }

        res.status(200).json(pokemon);
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        res.status(500).json({
            erreur: `Echec lors de la récupération du pokemon avec l'id ${id}`
        });
    }
};