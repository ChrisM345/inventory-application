const express = require("express");
const router = express.Router();
const controller = require("../controllers/trainerController");

router.get("/", controller.get);
router.get("/createTrainer", controller.getCreateTrainer);
router.post("/createTrainer", controller.postCreateTrainer);

module.exports = router;
