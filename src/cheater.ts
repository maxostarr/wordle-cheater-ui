import fiveLetterWords from "./five_letter_words_sorted.json";

export const runCheater = (
  incorrectLetterIncorrectPosition: Array<[string, number]>,
  correctLetterCorrectPosition: Array<[string, number]>,
  correctLetterIncorrectPosition: Array<[string, number]>,
) => {
  if (
    !incorrectLetterIncorrectPosition.length &&
    !correctLetterCorrectPosition.length &&
    !correctLetterIncorrectPosition.length
  ) {
    return [""];
  }

  const lettersNotInTheWord = incorrectLetterIncorrectPosition
    .filter(
      ([letter]) =>
        !correctLetterIncorrectPosition.find(([l]) => l === letter) &&
        !correctLetterCorrectPosition.find(([l]) => l === letter),
    )
    .map(([letter]) => letter);

  const notDoubleLetters = incorrectLetterIncorrectPosition.filter(
    ([letter]) => {
      return !lettersNotInTheWord.includes(letter);
    },
  );

  // const wrongLetters = `i,a,e,l,u`.split(",");
  // const correctLetterCorrectPositions = ",,,,t".split(",");
  // const correctLettersWrongPosition: Array<[string, number]> = [
  //   ["b", 0],
  //   ["r", 1],
  //   ["r", 3],
  //   ["t", 3],
  // ];

  // sanity check
  // wrongLetters.forEach((letter) => {
  //   if (correctLetterCorrectPosition.includes(letter)) {
  //     throw new Error(
  //       `${letter} is in both correct and wrong letter positions`,
  //     );
  //   }
  // });

  const eleminateWrongLetters = lettersNotInTheWord.reduce((prev, letter) => {
    return prev.filter((word) => !word.includes(letter));
  }, fiveLetterWords);

  const eleminateWrongLettersInPosition =
    incorrectLetterIncorrectPosition.reduce((prev, letter) => {
      return prev.filter((word) => word[letter[1]] !== letter[0]);
    }, eleminateWrongLetters);

  const eliminateWrongDuplicates = notDoubleLetters.reduce((prev, [letter]) => {
    return prev.filter(
      (word) => word.indexOf(letter) === word.lastIndexOf(letter),
    );
  }, eleminateWrongLettersInPosition);

  const includeCorrectLettersInPosition = correctLetterCorrectPosition.reduce(
    (prev, letter, i) => {
      return prev.filter((word) => word[letter[1]] === letter[0]);
    },
    eliminateWrongDuplicates,
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

  return includeCorrectLetters.length ? includeCorrectLetters : [""];
};
