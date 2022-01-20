import fiveLetterWords from "./five_letter_words.json";

export const runCheater = (
  wrongLetters: string[],
  correctLetterCorrectPosition: string[],
  correctLetterIncorrectPosition: Array<[string, number]>,
) => {
  if (
    !wrongLetters.length &&
    !correctLetterCorrectPosition.length &&
    !correctLetterIncorrectPosition.length
  ) {
    console.log("No words to guess");
    return "";
  }
  console.log(`Starting with ${fiveLetterWords.length} words`);

  // const wrongLetters = `i,a,e,l,u`.split(",");
  // const correctLetterCorrectPositions = ",,,,t".split(",");
  // const correctLettersWrongPosition: Array<[string, number]> = [
  //   ["b", 0],
  //   ["r", 1],
  //   ["r", 3],
  //   ["t", 3],
  // ];

  // sanity check
  wrongLetters.forEach((letter) => {
    if (correctLetterCorrectPosition.includes(letter)) {
      throw new Error(
        `${letter} is in both correct and wrong letter positions`,
      );
    }
  });

  const eleminateWrongLetters = wrongLetters.reduce((prev, letter) => {
    return prev.filter((word) => !word.includes(letter));
  }, fiveLetterWords);

  console.log(
    `Without wrong letters with ${eleminateWrongLetters.length} words`,
  );

  const includeCorrectLettersInPosition = correctLetterCorrectPosition.reduce(
    (prev, letter, i) => {
      return prev.filter((word) => (letter ? word[i] === letter : true));
    },
    eleminateWrongLetters,
  );

  const includeCorrectLetters = correctLetterIncorrectPosition.reduce(
    (prev, letter) => {
      return prev.filter(
        (word) =>
          word.indexOf(letter[0]) >= 0 && word.indexOf(letter[0]) !== letter[1],
      );
    },
    includeCorrectLettersInPosition,
  );

  console.log(
    `With correct letters in position ${includeCorrectLetters.length} words`,
  );

  return includeCorrectLetters[0].split("");
};
