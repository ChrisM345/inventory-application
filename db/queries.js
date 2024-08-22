const pool = require("./pool");

async function getPokemonData() {
  const { rows } = await pool.query(`SELECT * FROM pokemon ORDER BY id`);
  return rows;
}

module.exports = {
  getPokemonData,
};
