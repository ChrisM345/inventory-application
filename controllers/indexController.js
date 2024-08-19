const db = require("../db/queries");

module.exports = {
  get: (req, res) => {
    res.render("indexView", { title: "Index"});
  },
};
