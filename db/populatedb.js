const fs = require("fs");
const { Client } = require("pg");
require("dotenv").config();

// async function getPokemonData() {
//   const apiCall = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
//   const data = await apiCall.json();
//   fs.writeFile("db/testdata.json", JSON.stringify(data), (err) => {
//     if (err) {
//       console.error(err);
//     }
//   });
// }
// getPokemonData();

async function createPokemonDataBase() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`,
  });
  await client.connect();
  for (let i = 1; i <= 151; i++) {
    const apiCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const apiCallFlavorText = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    const data = await apiCall.json();
    const flavorTextData = await apiCallFlavorText.json();
    const name = data.name;
    const imgURL = data.sprites.other["official-artwork"].front_default;
    //[2] for Pokemon Yellow flavor text
    //Replace ' with '' to escape it
    const flavorText = flavorTextData.flavor_text_entries[2].flavor_text.replace(/\n|\f/g, " ").replace(/'/g, "''");
    let types = "";
    let moves = "";
    data.types.forEach((type) => {
      types += type.type.name + ", ";
    });
    types = types.replace(/,\s*$/, "");
    data.moves.forEach((move) => {
      moves += move.move.name + ", ";
    });
    moves = moves.replace(/,\s*$/, "");
    const SQL = `
    CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY,
    name VARCHAR ( 255 ),
    img_url VARCHAR ( 255 ),
    flavor_text TEXT,
    types VARCHAR ( 255 ),
    moves TEXT
    );
    
    INSERT INTO pokemon (id, name, img_url, flavor_text, types, moves)
    VALUES
      ('${i}', '${name}', '${imgURL}', '${flavorText}', '${types}', '${moves}');
    `;
    await client.query(SQL);
  }
  await client.end();
  console.log("done");
}

createPokemonDataBase();
