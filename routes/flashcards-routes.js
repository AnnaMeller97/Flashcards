const express = require("express");

const flashcardController = require("../controllers/flashcards-controller");

const router = express.Router();

router.get("/:inLang-:outLang/:headword", flashcardController.getTranslations);

module.exports = router;
