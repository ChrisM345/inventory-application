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

async function addTrainer(name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6) {
  await pool.query(
    "INSERT INTO trainers (name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6]
  );
}

module.exports = {
  getPokemonData,
  getPokemonDetails,
  searchPokemonName,
  searchPokemonType,
  addTrainer,
};
