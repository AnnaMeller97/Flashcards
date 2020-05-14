const { validationResult } = require("express-validator");

const Flashcard = require("../models/flashcard");
const ponsTranslations = require("../util/pons-translations");

const getTranslations = async (req, res, next) => {
  const { inputLanguage, outputLanguage, headword } = req.params;

  let translations;
  try {
    translations = await ponsTranslations.getTranslations(
      inputLanguage,
      outputLanguage,
      headword
    );
  } catch (error) {
    return next(error);
  }

  if (!translations.length) {
    return next(
      res
        .status(404)
        .json({ message: "Could not find translations for provided headword." })
    );
  }

  res.status(200).json({ translations: translations });
};
const getFlashcardsByHeadword = async (req, res, next) => {
  const { headword } = req.params;

  let flashcards;
  try {
    flashcards = await Flashcard.find({ headword: headword });
  } catch (error) {
    return res.status(500).json("Fetching data failed.");
  }

  if (!flashcards) {
    return next(
      res
        .status(404)
        .json({ message: "Could not find flashcards with provided headword." })
    );
  }

  res.status(200).json({ flashcards: flashcards });
};
const getAllFlashcards = async (req, res, next) => {
  let flashcards;
  try {
    flashcards = await Flashcard.find();
  } catch (error) {
    return next(
      res.status(500).json({ message: "Fetching flashcards failed." })
    );
  }

  res.status(200).json({ flashcards: flashcards });
};
const createFlashcard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(res.status(400).json({ message: "Invalid input data" }));
  }

  const {
    owner,
    headword,
    inputLanguage,
    outputLanguage,
    translations,
  } = req.body;

  const createdFlashcard = new Flashcard({
    owner,
    headword,
    inputLanguage,
    outputLanguage,
    translations,
  });

  try {
    await createdFlashcard.save();
  } catch (error) {
    return res.status(500).json({ message: "Creating flashcard failed." });
  }

  res.status(201).json({ flashcard: createdFlashcard });
};
const updateFlashcard = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(res.status(400).json({ message: "Invalid input data" }));
  }

  const { translations } = req.body;
  const flashcardId = req.params.id;

  let flashcard;
  try {
    flashcard = await Flashcard.findById(flashcardId);
  } catch (error) {
    return next(
      res.status(500).json({ message: "Updating flashcard failed XD." })
    );
  }

  flashcard.translations = translations;

  try {
    await flashcard.save();
  } catch (error) {
    return next(
      res.status(500).json({ message: "Updating flashcard failed." })
    );
  }

  res.status(200).json({ flashcard: flashcard });
};
const deleteFlashcardById = async (req, res, next) => {
  const flashcardId = req.params.id;

  let flashcard;
  try {
    flashcard = await Flashcard.findByIdAndDelete(flashcardId);
  } catch (error) {
    return next(
      res.status(500).json({ message: "Deleting flashcard failed." })
    );
  }

  res.status(200).json({ message: "Deleted flashcard." });
};

exports.getTranslations = getTranslations;
exports.createFlashcard = createFlashcard;
exports.getFlashcardsByHeadword = getFlashcardsByHeadword;
exports.getAllFlashcards = getAllFlashcards;
exports.deleteFlashcardById = deleteFlashcardById;
exports.updateFlashcard = updateFlashcard;
