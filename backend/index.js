require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// model
const BookModel = require("./models/bookModel");

const app = express();

// Middleware for parsing request body
app.use(express.json());

// routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Bookstore app");
});

// route for saving new book
app.post("/books", async (req, res) => {
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

// connect to db
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connect to db");
    // listen to server only if we successfully connect to DB
    app.listen(process.env.PORT, () => console.log("Server up and running"));
  })
  .catch((error) => console.log(error));
