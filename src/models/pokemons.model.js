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
    
    let requetePokemons = "SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon";
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

export { 
    _getPokemonById,
    _getPokemonList
};