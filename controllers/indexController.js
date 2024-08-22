const { getPokemonData } = require("../db/queries");

module.exports = {
  get: async (req, res) => {
    pokemonData = await getPokemonData();
    res.render("indexView", { title: "Pokedex", data: pokemonData });
  },
};
