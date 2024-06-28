const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    callback(null, MIME_TYPES.hasOwnProperty(file.mimetype));
  },
}).single("image");

const uploadAndConvert = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Pas de fichier télechargé" });
    }

    const newFilename = `${req.file.originalname.split(" ").join("_")}${Date.now()}.webp`;

    sharp(req.file.buffer)
      .webp({ quality: 80 })
      .toFile(path.join("images", newFilename), (err) => {
        if (err) {
          return res.status(500).json({ error: "Erreur lors de la conversion du fichier" });
        }

        req.file.filename = newFilename;
        next();
      });
  });
};

module.exports = uploadAndConvert;