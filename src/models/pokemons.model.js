import pool from '../config/db.js';

const _getPokemonById = async (id) => {
    const requete = "SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE id = ?";

    try {
        const [resultats] = await pool.query(requete, [id]);
        return resultats[0] ?? null;
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : 
                    ${erreur.sqlMessage}`);
        throw erreur;
    }
}

const _getPokemonList = async (page = 1, type = null) => {
    const limit = 25;
    const offset = (page - 1) * limit;
    
    let requetePokemons = "SELECT id, nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon";
    let requeteCount = "SELECT COUNT(*) as total FROM pokemon";
    const params = [];
    
    if (type) {
        requetePokemons += " WHERE type_primaire = ?";
        requeteCount += " WHERE type_primaire = ?";
        params.push(type);
    }
    
    // OFFSET paramètre SQL : https://www.datacamp.com/doc/mysql/mysql-offset
    requetePokemons += " LIMIT ? OFFSET ?";
    params.push(limit);
    params.push(offset);
    
    try {
        const [countResult] = await pool.query(requeteCount, params);
        const nombrePokemonTotal = countResult[0].total;
        
        const [pokemons] = await pool.query(requetePokemons, params);
        
        // pour arrondir
        const totalPage = Math.ceil(nombrePokemonTotal / limit) || 1;
        
        return {
            pokemons,
            type: type || "",
            nombrePokemonTotal,
            page,
            totalPage
        };
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : 
                    ${erreur.sqlMessage}`);
        throw erreur;
    }
}

const _ajouterPokemon = async (nouveauPokemon) => {
    const requete = "INSERT INTO pokemon (nom, type_primaire, type_secondaire, pv, attaque, defense) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [nouveauPokemon.nom, nouveauPokemon.type_primaire, nouveauPokemon.type_secondaire, nouveauPokemon.pv, nouveauPokemon.attaque, nouveauPokemon.defense];
    
    try {
        const [resultats] = await pool.query(requete, params);
        return resultats ?? null;
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

const _modifierPokemon = async (pokemonAModifier) => {
    const requete = "UPDATE pokemon SET nom = ?, type_primaire = ?, type_secondaire = ?, pv = ?, attaque = ?, defense = ? WHERE id = ?";
    const params = [pokemonAModifier.nom, pokemonAModifier.type_primaire, pokemonAModifier.type_secondaire, pokemonAModifier.pv, pokemonAModifier.attaque, pokemonAModifier.defense, pokemonAModifier.id];
    
    try {
        const [resultats] = await pool.query(requete, params);
        return resultats ?? null;
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

const _supprimerPokemon = async (id) => {
    const requete = "DELETE FROM pokemon WHERE id = ?";
    const params = [id];
    
    try {
        const [resultats] = await pool.query(requete, params);
        return resultats ?? null;
    } catch (erreur) {
        console.log(`Erreur, code: ${erreur.code} sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
        throw erreur;
    }
};

export { 
    _getPokemonById,
    _getPokemonList,
    _ajouterPokemon,
    _modifierPokemon,
    _supprimerPokemon
};