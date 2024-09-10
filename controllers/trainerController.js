const { body, validationResult } = require("express-validator");
const {
  addTrainer,
  getTrainers,
  getPokemonImgURL,
  getTrainerByID,
  editTrainer,
  deleteTrainer,
} = require("../db/queries");

const listOfPokemon = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
  "spearow",
  "fearow",
  "ekans",
  "arbok",
  "pikachu",
  "raichu",
  "sandshrew",
  "sandslash",
  "nidoran-f",
  "nidorina",
  "nidoqueen",
  "nidoran-m",
  "nidorino",
  "nidoking",
  "clefairy",
  "clefable",
  "vulpix",
  "ninetales",
  "jigglypuff",
  "wigglytuff",
  "zubat",
  "golbat",
  "oddish",
  "gloom",
  "vileplume",
  "paras",
  "parasect",
  "venonat",
  "venomoth",
  "diglett",
  "dugtrio",
  "meowth",
  "persian",
  "psyduck",
  "golduck",
  "mankey",
  "primeape",
  "growlithe",
  "arcanine",
  "poliwag",
  "poliwhirl",
  "poliwrath",
  "abra",
  "kadabra",
  "alakazam",
  "machop",
  "machoke",
  "machamp",
  "bellsprout",
  "weepinbell",
  "victreebel",
  "tentacool",
  "tentacruel",
  "geodude",
  "graveler",
  "golem",
  "ponyta",
  "rapidash",
  "slowpoke",
  "slowbro",
  "magnemite",
  "magneton",
  "farfetchd",
  "doduo",
  "dodrio",
  "seel",
  "dewgong",
  "grimer",
  "muk",
  "shellder",
  "cloyster",
  "gastly",
  "haunter",
  "gengar",
  "onix",
  "drowzee",
  "hypno",
  "krabby",
  "kingler",
  "voltorb",
  "electrode",
  "exeggcute",
  "exeggutor",
  "cubone",
  "marowak",
  "hitmonlee",
  "hitmonchan",
  "lickitung",
  "koffing",
  "weezing",
  "rhyhorn",
  "rhydon",
  "chansey",
  "tangela",
  "kangaskhan",
  "horsea",
  "seadra",
  "goldeen",
  "seaking",
  "staryu",
  "starmie",
  "mr-mime",
  "scyther",
  "jynx",
  "electabuzz",
  "magmar",
  "pinsir",
  "tauros",
  "magikarp",
  "gyarados",
  "lapras",
  "ditto",
  "eevee",
  "vaporeon",
  "jolteon",
  "flareon",
  "porygon",
  "omanyte",
  "omastar",
  "kabuto",
  "kabutops",
  "aerodactyl",
  "snorlax",
  "articuno",
  "zapdos",
  "moltres",
  "dratini",
  "dragonair",
  "dragonite",
  "mewtwo",
  "mew",
];

const validatePokemon = [
  body("pokemon1").trim().isIn(listOfPokemon).withMessage(`Pokemon 1 must be part of the suggested list`),
  body("pokemon2").trim().isIn(listOfPokemon).withMessage(`Pokemon 2 must be part of the suggested list`),
  body("pokemon3").trim().isIn(listOfPokemon).withMessage(`Pokemon 3 must be part of the suggested list`),
  body("pokemon4").trim().isIn(listOfPokemon).withMessage(`Pokemon 4 must be part of the suggested list`),
  body("pokemon5").trim().isIn(listOfPokemon).withMessage(`Pokemon 5 must be part of the suggested list`),
  body("pokemon6").trim().isIn(listOfPokemon).withMessage(`Pokemon 6 must be part of the suggested list`),
];
module.exports = {
  get: async (req, res) => {
    const trainerData = await getTrainers();
    res.render("trainerView", { title: "Trainers", trainerData: trainerData });
  },

  getCreateTrainer: (req, res) => {
    res.render("createTrainerView", { title: "Create Trainer", data: "" });
  },

  postCreateTrainer: [
    validatePokemon,
    async (req, res) => {
      const { name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6 } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("createTrainerView", {
          title: "Create Trainer",
          errors: errors.array(),
          data: {
            name: name,
            pokemon1: pokemon1,
            pokemon2: pokemon2,
            pokemon3: pokemon3,
            pokemon4: pokemon4,
            pokemon5: pokemon5,
            pokemon6: pokemon6,
          },
        });
      }
      const pokemon1URL = await getPokemonImgURL(pokemon1);
      const pokemon2URL = await getPokemonImgURL(pokemon2);
      const pokemon3URL = await getPokemonImgURL(pokemon3);
      const pokemon4URL = await getPokemonImgURL(pokemon4);
      const pokemon5URL = await getPokemonImgURL(pokemon5);
      const pokemon6URL = await getPokemonImgURL(pokemon6);
      addTrainer(
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
      );
      res.redirect("/trainer");
    },
  ],

  getEditTrainer: async (req, res) => {
    const trainerData = await getTrainerByID(req.params.trainerID);
    res.render("createTrainerView", { title: "Edit Trainer", data: trainerData });
  },

  postEditTrainer: [
    validatePokemon,
    async (req, res) => {
      const errors = validationResult(req);
      let data = req.body;
      data.id = req.params.trainerID;
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .render("createTrainerView", { title: "Edit Trainer", data: data, errors: errors.array() });
      }
      const { name, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6 } = req.body;
      const pokemon1URL = await getPokemonImgURL(pokemon1);
      const pokemon2URL = await getPokemonImgURL(pokemon2);
      const pokemon3URL = await getPokemonImgURL(pokemon3);
      const pokemon4URL = await getPokemonImgURL(pokemon4);
      const pokemon5URL = await getPokemonImgURL(pokemon5);
      const pokemon6URL = await getPokemonImgURL(pokemon6);
      editTrainer(
        req.params.trainerID,
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
      );
      res.redirect("/trainer");
    },
  ],

  postDeleteTrainer: async (req, res) => {
    deleteTrainer(req.params.trainerID);
    res.redirect("/trainer");
  },
};
