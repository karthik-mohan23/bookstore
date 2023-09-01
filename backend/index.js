const express = require("express");

const { PORT } = require("./config");

const app = express();

// routes
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Bookstore app");
});

app.listen(PORT, () => "Server up and running");
