const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Pas d'autorization du header");
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw new Error("Pas de token fourni");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.auth = { userId: decodedToken.userId };
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "Utilisateur non identifié : ", err: err.message });
  }
};
