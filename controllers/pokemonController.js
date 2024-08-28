const { getPokemonDetails } = require("../db/queries");

module.exports = {
  get: async (req, res) => {
    const pokemonData = await getPokemonDetails(req.params.pokemonID);
    res.render("pokemonView", { title: `pokemon details - ${req.params.pokemonName}`, data: pokemonData });
  },
};
