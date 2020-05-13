const Flashcard = require("../models/flashcard");
const ponsTranslations = require("../util/pons-translations");

const getTranslations = async (req, res, next) => {
  const { inLang, outLang, headword } = req.params;
  let translations = [];
  try {
    translations = await ponsTranslations.getTranslations(
      inLang,
      outLang,
      headword
    );
  } catch (error) {
    return next(error);
  }
  if (!translations.length) {
    res
      .status(404)
      .json({ message: "Could not find translations fo provided headword." });
  } else {
    res.status(200).json({ translations: translations });
  }
};

exports.getTranslations = getTranslations;
