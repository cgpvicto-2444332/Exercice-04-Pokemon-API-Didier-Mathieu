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

}

export { 
    _getPokemonById
};