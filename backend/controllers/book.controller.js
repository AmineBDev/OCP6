const bookModel = require("../models/book.model");

module.exports.readBook = (req, res) => {
  bookModel
    .find()
    .then((books) => res.status(200).json(books))
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

module.exports.createBook = async (req, res) => {
  try {
    const bookObject = req.body;

    if (!req.auth || !req.auth.userId) {
      return res.status(401).json({ message: "Utilisateur non identifié" });
    }

    const book = new bookModel({
      ...bookObject,
      userId: req.auth.userId,
    });

    await book.save();
    res.status(201).json({ message: "Livre enregistré !" });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports.updateBook = (req, res) => {
  const bookId = req.params.id;

  bookModel
    .findById(bookId)
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

      bookModel
        .findByIdAndUpdate(bookId, { $set: req.body }, { new: true })
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

  bookModel
    .findById(bookId)
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

      bookModel
        .findByIdAndDelete(bookId)
        .then((deleted) =>
          res.status(200).json({ message: "Livre supprimé !", book: deleted })
        )
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(400).json({ err }));
};
