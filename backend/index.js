const express = require("express");

const { PORT } = require("./config");

const app = express();

app.listen(PORT, () => "Server up and running");
