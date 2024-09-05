const { getPokemonDetails, getPokemonDetailsByName } = require("../db/queries");

module.exports = {
  get: async (req, res) => {
    const pokemonData = await getPokemonDetails(req.params.pokemonID);
    res.render("pokemonView", { title: `pokemon details - ${req.params.pokemonName}`, data: pokemonData });
  },
  getPokemonName: async (req, res) => {
    const pokemonData = await getPokemonDetailsByName(req.params.pokemonName);
    res.render("pokemonView", { title: `pokemon details - ${req.params.pokemonName}`, data: pokemonData });
  },
};
