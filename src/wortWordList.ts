import words from "./five_letter_words.json";
import { writeFileSync } from "fs";

const letterMap = {};

for (const word of words) {
  for (const letter of word) {
    if (letterMap[letter] === undefined) {
      letterMap[letter] = 0;
    }
    letterMap[letter]++;
  }
}

function calcWordScore(word: string) {
  return word.split("").reduce((p, l) => p + letterMap[l], 0);
}

const wordGreaterThan = (a: string, b: string) =>
  calcWordScore(b) - calcWordScore(a);

const sorted = words.sort(wordGreaterThan);

writeFileSync("five_letter_words_sorted.json", JSON.stringify(sorted));
