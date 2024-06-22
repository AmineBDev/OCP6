const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  book: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  ratings: [
    {
      _id: false,
      userId: {
        type: String,
        required: true,
      },
      grade: {
        type: Number,
        min: 1,
        required: true,
      },
    },
  ],
  averageRating: {
    type: Number,
  },
});

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;
