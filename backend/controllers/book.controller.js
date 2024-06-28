const bookModel = require("../models/book.model");
const fs = require("fs");

module.exports.readBook = (req, res) => {
  bookModel
    .find()
    .then((books) => res.status(200).json(books))
    .catch((err) =>
      res.status(400).json("Erreur pour recuperer la data : ", err)
    );
};

module.exports.readBestRatedBooks = (req, res) => {
  bookModel
    .find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((bestBooks) => res.status(200).json(bestBooks))
    .catch((err) =>
      res.status(400).json("Erreur pour recuperer la data : ", err)
    );
};

module.exports.readOneBook = (req, res) => {
  bookModel
    .findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }
      res.status(200).json(book);
    })
    .catch((err) => res.status(400).json({ err }));
};

module.exports.createBook = (req, res) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._userId;
  delete bookObject._id;

  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ message: "Utilisateur non identifié" });
  }

  const book = new bookModel({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
      }`,
  });

  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Livre enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

module.exports.addRating = (req, res) => {
  const { userId, grade } = req.body;

  if (!req.auth || !req.auth.userId) {
    return res.status(401).json({ message: "Utilisateur non identifié" });
  }

  if (isNaN(grade) || grade < 0 || grade > 5) {
    return res
      .status(400)
      .json({ message: "La note doit être comprise entre 0 et 5" });
  }

  bookModel
    .findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }

      const existingRating = book.ratings.find(
        (rating) => rating.userId === userId
      );
      if (existingRating) {
        return res.status(403).json({ message: "L'utilisateur a déjà voté" });
      }

      book.ratings.push({ userId, grade });

      // Calcule la moyenne des ratings
      const totalRatings = book.ratings.length;
      let sumRatings = 0;
      if (totalRatings > 0) {
        sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
      }
      book.averageRating = parseFloat((sumRatings / totalRatings).toFixed(1));

      return book.save();
    })
    .then((savedBook) => {
      res.status(201).json(savedBook);

    })
    .catch((error) => {
      res.status(400).json({ error: error.message });

    });
};

module.exports.updateBook = (req, res) => {
  const bookObject = req.file
    ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename
        }`,
    }
    : { ...req.body };

  delete bookObject._userId;

  bookModel
    .findById(req.params.id)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }

      if (book.userId !== req.auth.userId) {
        return res.status(403).json({
          message:
            "Accès interdit : vous n'êtes pas le propriétaire de ce livre",
        });
      }

      // suppression de l'ancienne image si nouvelle image
      if (req.file && book.imageUrl) {
        const oldFilename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${oldFilename}`, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression de l'ancienne image : ",
              err
            );
            return res.status(500).json({
              error: "Erreur serveur lors de la suppression de l'image",
            });
          }
        });
      }

      bookModel
        .findByIdAndUpdate(req.params.id, { $set: bookObject }, { new: true })
        .then((updatedBook) =>
          res
            .status(200)
            .json({ message: "Livre modifié !", book: updatedBook })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

module.exports.deleteBook = (req, res) => {
  const bookId = req.params.id;

  bookModel.findById(bookId).then((book) => {
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    if (book.userId !== req.auth.userId) {
      return res.status(403).json({
        message: "Accès interdit : vous n'êtes pas le propriétaire de ce livre",
      });
    }

    const filename = book.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      bookModel
        .findByIdAndDelete(bookId)
        .then((deleted) =>
          res.status(200).json({ message: "Livre supprimé !", book: deleted })
        )
        .catch((err) => res.status(400).json({ err }));
    });
  });
};
