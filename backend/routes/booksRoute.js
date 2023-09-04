const express = require("express");
const BookModel = require("../models/bookModel");

const router = express.Router();

// route for saving new book
router.post("/", async (req, res) => {
  try {
    // basic validation
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }
    // if successful create and store book document
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await BookModel.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all Books from database
router.get("/", async (req, res) => {
  try {
    const books = await BookModel.find({});
    // returns an array of book object
    // but here we change the response to get length of items in the array
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
// Route to get a single Book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findById(id);
    // returns an array of book object
    // but here we change the response to get length of items in the array
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to update a book
router.put("/:id", async (req, res) => {
  const { title, author, publishYear } = req.body;
  if (!title || !author || !publishYear) {
    return res.status(400).send({
      message: "Send all required fields: title,author,publishYear",
    });
  }

  try {
    const { id } = req.params;
    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body);
    // if book is not found
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    // if book is found
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findByIdAndDelete(id);

    // if no book
    if (!book) {
      return res.status(404).json({ message: "book not found" });
    }
    // if there is a book by that id
    return res.status(200).send("book deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
