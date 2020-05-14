const express = require("express");
const { check } = require("express-validator");

const flashcardController = require("../controllers/flashcards-controller");

const router = express.Router();

router.get(
  "/:inputLanguage-:outputLanguage/:headword",
  flashcardController.getTranslations
);

router.get(
  "/flashcards/:headword",
  flashcardController.getFlashcardsByHeadword
);

router.get("/flashcards", flashcardController.getAllFlashcards);

router.post(
  "/",
  [
    check("headword").notEmpty(),
    check("inputLanguage").isIn([
      "de",
      "el",
      "en",
      "es",
      "fr",
      "it",
      "pl",
      "pt",
      "ru",
      "sl",
      "tr",
      "zh",
    ]),
    check("outputLanguage").isIn([
      "de",
      "el",
      "en",
      "es",
      "fr",
      "it",
      "pl",
      "pt",
      "ru",
      "sl",
      "tr",
      "zh",
    ]),
    check("translations").notEmpty(),
  ],
  flashcardController.createFlashcard
);

router.patch(
  "/flashcards/:id",
  [check("translations").notEmpty()],
  flashcardController.updateFlashcard
);

router.delete("/flashcards/:id", flashcardController.deleteFlashcardById);

module.exports = router;
