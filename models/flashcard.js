const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  owner: { type: String, required: true },
  headword: { type: String, required: true },
  inputLanguage: {
    type: String,
    required: true,
  },
  outputLanguage: {
    type: String,
    required: true,
  },
  translations: [{ type: String, require: true }],
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
