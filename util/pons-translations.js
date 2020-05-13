const axios = require("axios");

let translations = [];
const getTranslations = async (inLang, outLang, headword) => {
  await axios
    .get(
      `https://api.pons.com/v1/dictionary?l=${sortAndMerge(
        inLang,
        outLang
      )}&q=${encodeURIComponent(headword)}&in=${inLang}`,
      {
        headers: {
          "X-Secret": `${process.env.API_KEY}`,
        },
      }
    )
    .then((response) => {
      if (response.data) {
        translations = response.data[0].hits[0].roms[0].arabs[0].translations.map(
          (translation) => translation.target
        );
      } else {
        translations = [];
      }
    })
    .catch((error) => {
      return new Error(
        "Something went wrong, could not fetch the data from PONS"
      );
    });
  if (translations) {
    return translations.map((translation) => removeHtmlTags(translation));
  }
};

const sortAndMerge = (a, b) => {
  const arr = [a, b];
  arr.sort();
  return arr[0].concat(arr[1]);
};

const removeHtmlTags = (expression) => {
  return expression.replace(/<.*?.>/g, "");
};

exports.getTranslations = getTranslations;
