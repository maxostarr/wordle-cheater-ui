<script lang="ts">
  import { runCheater } from "./cheater";

  let oldGuesses = [];
  let letters = Array.from({ length: 5 }, () => ({ letter: " ", value: -1 }));
  // let letters = "irate".split("").map((l) => ({ letter: l, value: 0 }));

  let letterIndex = 0;
  let suggestionIndex = 0;
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

  $: wrongLetters = getWrongLetters([...oldGuesses, ...letters]);

  $: correctLetterCorrectPosition = getcorrectLetterCorrectPosition([
    ...oldGuesses,
    ...letters,
  ]);

  $: correctLetterIncorrectPosition = getCorrectLetterIncorrectPosition([
    ...oldGuesses,
    ...letters,
  ]);

  $: cheaterResult = runCheater(
    wrongLetters,
    correctLetterCorrectPosition,
    correctLetterIncorrectPosition,
  );

  $: suggestedLetters = cheaterResult[suggestionIndex].split("");

  function getWrongLetters(letters): Array<[string, number]> {
    return (
      letters
        // .filter((l) => l.value === 0)
        .map((l, i) => l.value === 0 && ([l.letter, i % 5] as [string, number]))
        .filter((l) => l)
    );
  }

  function getcorrectLetterCorrectPosition(letters): Array<[string, number]> {
    return (
      letters
        // .filter((l) => l.value === 1)
        .map((l, i) => l.value === 1 && ([l.letter, i % 5] as [string, number]))
        .filter((l) => l)
    );
  }

  function getCorrectLetterIncorrectPosition(letters): Array<[string, number]> {
    return (
      letters
        // .filter((l) => l.value === 2)
        .map((l, i) => l.value === 2 && ([l.letter, i % 5] as [string, number]))
        .filter((l) => l)
    );
  }

  const handleLetterContainerClick = (index) => (e) => {
    suggestionIndex = 0;
    letters[index] = {
      ...letters[index],
      value: (letters[index].value + 1) % 3,
    };
    console.log(
      "🚀 ~ file: App.svelte ~ line 47 ~ handleLetterContainerClick ~ letters[index]",
      letters[index],
    );
  };

  const handleSuggestionLetterClick = (index) => (e) => {
    oldGuesses = [...oldGuesses, ...letters];
    letters = suggestedLetters.map((l) => ({ letter: l, value: 0 }));
    handleLetterContainerClick(index)(e);
  };

  const handleNextGuessClick = (e) => {
    suggestionIndex = (suggestionIndex + 1) % cheaterResult.length;
  };

  const handleResetClick = (e) => {
    oldGuesses = [];
    // letters = "irate".split("").map((l) => ({ letter: l, value: 0 }));
    letters = Array.from({ length: 5 }, () => ({ letter: " ", value: -1 }));
    letterIndex = 0;
    suggestionIndex = 0;
  };
</script>

<main>
  <div class="row">
    {#each oldGuesses as letter}
      <!-- {#each oldGuess as letter} -->
      <span class={"letterContainer val" + letter.value}>
        <span class="letter">{letter.letter.toUpperCase()}</span>
      </span>
      <!-- {/each} -->
    {/each}
    {#each letters as letter, index}
      <span
        class={"letterContainer val" + letter.value}
        on:click={handleLetterContainerClick(index)}
      >
        <span class="letter">{letter.letter.toUpperCase()}</span>
      </span>
    {/each}
  </div>
  <div class="row suggestion">
    {#each suggestedLetters as letter, index}
      <span
        class="letterContainer"
        on:click={handleSuggestionLetterClick(index)}
      >
        <span class="letter">{letter.toUpperCase()}</span>
      </span>
    {/each}
  </div>
  <!-- <pre>
		{JSON.stringify(wrongLetters)}
		{JSON.stringify(correctLetterCorrectPosition)}
		{JSON.stringify(correctLetterIncorrectPosition)}
		
	</pre> -->
  <div class="buttons">
    <button class="next" on:click={handleNextGuessClick}>Next Guess</button>
    <button class="reset" on:click={handleResetClick}>Reset</button>
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
    width: 7vw;
    height: 7vw;
    background-color: darkslategray;
    color: white;
    margin: 0.3rem;
    border-radius: 0.5rem;
  }

  .val0 {
    background-color: darkslategray;
  }
  .val1 {
    background-color: greenyellow;
  }
  .val2 {
    background-color: orange;
  }

  .row {
    display: grid;
    width: max-content;
    grid-template-columns: repeat(5, 1fr);
    font-size: 3em;
    grid-gap: 0.3rem;
  }

  .suggestion {
    border: 0.5px solid white;
    border-radius: 0.5rem;
  }

  .buttons {
    padding-top: 2em;
    display: flex;
    width: 50vw;
    justify-content: space-around;
  }

  button {
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.5em;
  }

  .next {
    background-color: #4caf50;
  }

  .reset {
    background-color: #f44336;
  }

  .letter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    user-select: none;
    cursor: pointer;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
