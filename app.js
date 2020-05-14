const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const flashcardsRoutes = require("./routes/flashcards-routes");
const userRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use(flashcardsRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-6llqj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
