const pool = require("./pool");

async function getPokemonData() {
  const { rows } = await pool.query(`SELECT * FROM pokemon ORDER BY id`);
  return rows;
}

async function getPokemonDetails(pokemonID) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE id=${pokemonID}`);
  return rows;
}

async function searchPokemonName(name) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE name LIKE '%${name}%'`);
  return rows;
}

async function searchPokemonType(type) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE types LIKE '%${type}%'`);
  return rows;
}

module.exports = {
  getPokemonData,
  getPokemonDetails,
  searchPokemonName,
  searchPokemonType,
};
