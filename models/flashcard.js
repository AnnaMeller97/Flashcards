const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  headword: { type: String, required: true },
  inputLanguage: {
    type: String,
    required: true,
  },
  outputLanguage: {
    type: String,
    required: true,
  },
  translations: [{ type: String, required: true }],
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
