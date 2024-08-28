const { getPokemonData, searchPokemonName, searchPokemonType } = require("../db/queries");

module.exports = {
  get: async (req, res) => {
    const pokemonData = await getPokemonData();
    res.render("indexView", { title: "Pokedex", data: pokemonData });
  },

  getSearchName: async (req, res) => {
    const searchTerm = req.query.pokemonName.toLowerCase();
    const pokemonData = await searchPokemonName(searchTerm);
    res.render("indexView", { title: "Pokedex Search Results", data: pokemonData, search: searchTerm });
  },

  getSearchType: async (req, res) => {
    const searchTerm = req.query.pokemonType.toLowerCase();
    const pokemonData = await searchPokemonType(searchTerm);
    res.render("indexView", { title: "Pokedex Search Results", data: pokemonData, search: searchTerm });
  },
};
