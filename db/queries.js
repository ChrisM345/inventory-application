const pool = require("./pool");

async function getPokemonData() {
  const { rows } = await pool.query(`SELECT * FROM pokemon ORDER BY id`);
  return rows;
}

async function getPokemonDetails(pokemonID) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE id=${pokemonID}`);
  return rows;
}

async function getPokemonImgURL(name) {
  const { rows } = await pool.query(`SELECT img_url FROM pokemon WHERE name='${name}'`);
  return rows[0].img_url;
}

async function searchPokemonName(name) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE name LIKE '%${name}%'`);
  return rows;
}

async function searchPokemonType(type) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE types LIKE '%${type}%'`);
  return rows;
}

async function getTrainers() {
  const { rows } = await pool.query(`SELECT * FROM trainers ORDER BY id`);
  return rows;
}

async function addTrainer(
  name,
  pokemon1,
  pokemon1URL,
  pokemon2,
  pokemon2URL,
  pokemon3,
  pokemon3URL,
  pokemon4,
  pokemon4URL,
  pokemon5,
  pokemon5URL,
  pokemon6,
  pokemon6URL
) {
  await pool.query(
    "INSERT INTO trainers (name, pokemon1, pokemon1URL, pokemon2, pokemon2URL, pokemon3, pokemon3URL, pokemon4, pokemon4URL, pokemon5, pokemon5URL, pokemon6, pokemon6URL) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
    [
      name,
      pokemon1,
      pokemon1URL,
      pokemon2,
      pokemon2URL,
      pokemon3,
      pokemon3URL,
      pokemon4,
      pokemon4URL,
      pokemon5,
      pokemon5URL,
      pokemon6,
      pokemon6URL,
    ]
  );
}

module.exports = {
  getPokemonData,
  getPokemonDetails,
  getPokemonImgURL,
  searchPokemonName,
  searchPokemonType,
  getTrainers,
  addTrainer,
};
