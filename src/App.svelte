<script lang="ts">
  import { runCheater } from "./cheater";
  let letters = Array.from({ length: 5 }, () => ({ letter: "", value: -1 }));
  let letterIndex = 0;
  window.addEventListener("keypress", (e) => {
    let key = e.key;
    if (key.length === 1 && key.match(/[a-z]/i) && letterIndex < 5) {
      letters[letterIndex++] = { letter: key, value: 0 };
      letters = [...letters];
    }
  });
  $: wrongLetters = getWrongLetters(letters);

  $: correctLetterCorrectPosition = getcorrectLetterCorrectPosition(letters);

  $: correctLetterIncorrectPosition =
    getCorrectLetterIncorrectPosition(letters);

  $: suggestedLetters = runCheater(
    wrongLetters,
    correctLetterCorrectPosition,
    correctLetterIncorrectPosition,
  );

  function getWrongLetters(letters): string[] {
    return letters.filter((l) => l.value === 0).map((l) => l.letter);
  }

  function getcorrectLetterCorrectPosition(letters): string[] {
    return letters.filter((l) => l.value === 1).map((l) => l.letter);
  }
  function getCorrectLetterIncorrectPosition(letters): Array<[string, number]> {
    return letters
      .filter((l) => l.value === 2)
      .map((l, i) => [l.letter, i] as [string, number]);
  }
</script>

<main>
  {#each letters as letter}
    <span>{letter.letter}</span>
  {/each}
  {#each suggestedLetters as letter}
    <span>{letter}</span>
  {/each}
  {suggestedLetters}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  span {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 1px solid black;
    margin: 0.1em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
