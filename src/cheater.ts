import fiveLetterWords from "./five_letter_words_sorted.json";

export const runCheater = (
  incorrectLetterIncorrectPosition: Array<[string, number]>,
  correctLetterCorrectPosition: Array<[string, number]>,
  correctLetterIncorrectPosition: Array<[string, number]>,
) => {
  console.log(
    "🚀 ~ file: cheater.ts ~ line 8 ~ correctLetterIncorrectPosition",
    correctLetterIncorrectPosition,
  );
  console.log(
    "🚀 ~ file: cheater.ts ~ line 8 ~ correctLetterCorrectPosition",
    correctLetterCorrectPosition,
  );
  console.log(
    "🚀 ~ file: cheater.ts ~ line 8 ~ incorrectLetterIncorrectPosition",
    incorrectLetterIncorrectPosition,
  );
  if (
    !incorrectLetterIncorrectPosition.length &&
    !correctLetterCorrectPosition.length &&
    !correctLetterIncorrectPosition.length
  ) {
    console.log("No words to guess");
    return [""];
  }
  console.log(`Starting with ${fiveLetterWords.length} words`);

  const lettersNotInTheWord = incorrectLetterIncorrectPosition
    .filter(
      ([letter]) =>
        !correctLetterIncorrectPosition.find(([l]) => l === letter) &&
        !correctLetterCorrectPosition.find(([l]) => l === letter),
    )
    .map(([letter]) => letter);
  console.log(
    "🚀 ~ file: cheater.ts ~ line 23 ~ lettersNotInTheWord",
    lettersNotInTheWord,
  );

  const notDoubleLetters = incorrectLetterIncorrectPosition.filter(
    ([letter]) => {
      return !lettersNotInTheWord.includes(letter);
    },
  );
  console.log(
    "🚀 ~ file: cheater.ts ~ line 47 ~ notDoubleLetters",
    notDoubleLetters,
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

  console.log(
    `Without wrong letters with ${eleminateWrongLettersInPosition.length} words`,
  );

  const eliminateWrongDuplicates = notDoubleLetters.reduce((prev, [letter]) => {
    return prev.filter(
      (word) => word.indexOf(letter) === word.lastIndexOf(letter),
    );
  }, eleminateWrongLettersInPosition);

  console.log(
    `Without wrong duplicates with ${eliminateWrongDuplicates.length} words`,
  );

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

  console.log(
    `With correct letters in position ${includeCorrectLetters.length} words`,
  );

  return includeCorrectLetters.length ? includeCorrectLetters : [""];
};
