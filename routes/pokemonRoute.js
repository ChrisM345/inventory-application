const express = require("express");
const router = express.Router();
const controller = require("../controllers/pokemonController");

router.get("/:pokemonID/:pokemonName", controller.get);
router.get("/:pokemonName", controller.getPokemonName);

module.exports = router;
