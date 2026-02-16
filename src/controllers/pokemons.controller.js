import { _getPokemonById, _getPokemonList, _ajouterPokemon } from '../models/pokemons.model.js';

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

export const ajouterPokemon = async (req, res) => {
    const champsRequis = [
        "nom",
        "type_primaire",
        "pv",
        "attaque",
        "defense"
    ];
    
    const champsManquants = [];

    for (let i = 0; i < champsRequis.length; i++) {
        const champ = champsRequis[i];
        if (req.body[champ] === null || req.body[champ] === "") {
            champsManquants.push(champ);
        }
    }
    
    if (champsManquants.length > 0) {
        return res.status(400).json({
            erreur: "Le format des données est invalide",
            champ_manquant: champsManquants
        });
    }
    
    const nouveauPokemon = {
        id: null,
        nom: req.body.nom,
        type_primaire: req.body.type_primaire,
        type_secondaire: req.body.type_secondaire,
        pv: req.body.pv,
        attaque: req.body.attaque,
        defense: req.body.defense
    };
    
    try {
        const resultat = await _ajouterPokemon(nouveauPokemon);

        nouveauPokemon.id = resultat.insertId;
        
        res.status(201).json({
            message: `Le pokemon [${nouveauPokemon.nom}] a été ajouté avec succès`,
            pokemon: nouveauPokemon
        });
    } catch (erreur) {
        res.status(500);
        res.send({
            erreur: `Echec lors de la création du pokemon [${nouveauPokemon.nom}]`
        });
        return;
    }
};