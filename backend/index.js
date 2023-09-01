require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Bookstore app");
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
