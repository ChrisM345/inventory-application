const pool = require("./pool");

async function getPokemonData() {
  const { rows } = await pool.query(`SELECT * FROM pokemon ORDER BY id`);
  return rows;
}

async function getPokemonDetails(pokemonID) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE id=${pokemonID}`);
  return rows;
}

async function getPokemonDetailsByName(pokemonName) {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE name='${pokemonName}'`);
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

async function getTrainerByID(id) {
  const { rows } = await pool.query(`SELECT * FROM trainers WHERE id=${id}`);
  return rows[0];
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

async function editTrainer(
  id,
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
  await pool.query(`UPDATE trainers 
    SET name = '${name}',
    pokemon1 = '${pokemon1}', pokemon1URL='${pokemon1URL}',
    pokemon2='${pokemon2}', pokemon2URL='${pokemon2URL}',
    pokemon3='${pokemon3}', pokemon3URL='${pokemon3URL}',
    pokemon4='${pokemon4}', pokemon4URL='${pokemon4URL}',
    pokemon5='${pokemon5}', pokemon5URL='${pokemon5URL}',
    pokemon6='${pokemon6}', pokemon6URL='${pokemon6URL}'
    WHERE id=${id}`);
}

async function deleteTrainer(id) {
  await pool.query(`DELETE from trainers WHERE id=${id}`);
  return;
}

module.exports = {
  getPokemonData,
  getPokemonDetails,
  getPokemonDetailsByName,
  getPokemonImgURL,
  searchPokemonName,
  searchPokemonType,
  getTrainers,
  addTrainer,
  getTrainerByID,
  editTrainer,
  deleteTrainer,
};
