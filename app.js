const express = require("express");

const flashcardsRoutes = require("./routes/flashcards-routes");
const userRoutes = require("./routes/users-routes");

const app = express();

app.use(userRoutes);

app.listen(5000);
