const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new userModel({
        email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.signIn = (req, res) => {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Identifiants invalides" });
      }
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ message: "Mot de passe incorrect" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
          expiresIn: "72h",
        });

        res.status(200).json({ userId: user._id, token: token });
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Erreur interne du serveur", error: err });
    });
};
