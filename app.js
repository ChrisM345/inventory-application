const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRoute = require("./routes/indexRoute");
const pokemonRoute = require("./routes/pokemonRoute");
const trainerRoute = require("./routes/trainerRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use("/", indexRoute);
app.use("/pokemon/", pokemonRoute);
app.use("/trainer/", trainerRoute);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
