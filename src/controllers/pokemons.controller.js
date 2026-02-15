import { _getPokemonById, _getPokemonList } from '../models/pokemons.model.js';

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

export const getPokemonList = async (req, res) => {
    let page = req.query.page;
    let type = req.query.type;
    
    // Pour convertir en cgiffre si erreur de frappe
    page = parseInt(page) || 1;
    
    if (page < 1) {
        page = 1;
    }
    
    type = type || null;
 
    try {
        const resultat = await _getPokemonList(page, type);
        res.status(200).json(resultat);
    } catch (erreur) {
        console.log(`Erreur SQL - code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        res.status(500).json({
            erreur: "Echec lors de la récupération de la liste des pokemons"
        });
    }
};