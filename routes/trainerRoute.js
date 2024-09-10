const express = require("express");
const router = express.Router();
const controller = require("../controllers/trainerController");

router.get("/", controller.get);
router.get("/createTrainer", controller.getCreateTrainer);
router.post("/createTrainer", controller.postCreateTrainer);
router.get("/:trainerID/edit", controller.getEditTrainer);
router.post("/:trainerID/edit", controller.postEditTrainer);
router.post("/:trainerID/delete", controller.postDeleteTrainer);

module.exports = router;
