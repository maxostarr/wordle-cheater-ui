<script lang="ts">
  import { runCheater } from "./cheater";
  let letters = Array.from({ length: 5 }, () => ({ letter: " ", value: -1 }));
  let letterIndex = 0;
  window.addEventListener("keypress", (e) => {
    let key = e.key;
    if (key.length === 1 && key.match(/[a-z]/i) && letterIndex < 5) {
      letters[letterIndex++] = { letter: key.toLocaleLowerCase(), value: 0 };
    }
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      if (letterIndex > 0) {
        letters[--letterIndex] = { letter: " ", value: -1 };
      }
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
  <div class="row">
    {#each letters as letter}
      <span class="letterContainer">
        <span class="letter">{letter.letter.toUpperCase()}</span>
      </span>
    {/each}
  </div>
  <div class="row">
    {#each suggestedLetters as letter}
      <span class="letterContainer">
        <span class="letter">{letter.toUpperCase()}</span>
      </span>
    {/each}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .letterContainer {
    display: inline-block;
    width: 10vw;
    height: 10vw;
    background-color: darkslategray;
    color: white;
    font-size: xx-large;
    margin: 0.3em;
    border-radius: 0.5em;
  }

  .row {
    display: grid;
    width: max-content;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0.3em;
  }

  .letter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
