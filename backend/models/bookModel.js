const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  //   field for created & updated time
  { timestamps: true }
);

// Create the "Book" model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
