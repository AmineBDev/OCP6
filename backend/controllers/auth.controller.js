const userModel = require("../models/user.model");

module.exports.signUp = (req, res) => {
  const { email, password } = req.body;

  userModel
    .create({ email, password })
    .then((user) => {
      res.status(201).json({ message: "Utilisateur créé avec succès !" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Erreur interne du serveur", error: err });
    });
};
