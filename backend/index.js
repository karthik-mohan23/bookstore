require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// model
const BookModel = require("./models/bookModel");
// routes
const booksRoute = require("./routes/booksRoute");
// cors
const cors = require("cors");

const app = express();

// Middleware for handling cors policy
app.use(cors());

// Middleware for parsing request body
app.use(express.json());

// routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Bookstore app");
});

app.use("/books", booksRoute);

// connect to db
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connect to db");
    // listen to server only if we successfully connect to DB
    app.listen(process.env.PORT, () => console.log("Server up and running"));
  })
  .catch((error) => console.log(error));
