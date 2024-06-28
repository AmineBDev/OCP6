const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.DB_USER_PASS,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));
