const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");

router.get("/", controller.get);
router.get("/searchName/", controller.getSearchName);
router.get("/searchType", controller.getSearchType);

module.exports = router;
