module.exports = {
  get: (req, res) => {
    res.render("trainerView", { title: "Trainers" });
  },

  getCreateTrainer: (req, res) => {
    res.render("createTrainerView", { title: "Create Trainer" });
  },
  postCreateTrainer: (req, res) => {
    console.log("post new trainer");
    console.log(req.body);
    res.redirect("/trainer");
  },
};
