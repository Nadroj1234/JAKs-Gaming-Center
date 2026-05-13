import { words } from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const difficulty_dropdown = document.getElementById("difficulty_drop");
  const wordDisplay = document.getElementById("word-display");
  const keyboard = document.getElementById("keyboard");
  const remainingGuessesEl = document.getElementById("remaining-guesses");
  const gameMessageEl = document.getElementById("game-message");
  const resetBtn = document.getElementById("reset-btn");
  const categoryContainer = document.getElementById("category");

  // Hangman SVG Parts
  const hangmanParts = {
    head: document.getElementById("head"),
    body: document.getElementById("body"),
    leftArm: document.getElementById("left-arm"),
    rightArm: document.getElementById("right-arm"),
    leftLeg: document.getElementById("left-leg"),
    rightLeg: document.getElementById("right-leg"),
    face: document.getElementById("face"),
  };

  // Game Variables
  let selectedWord = "";
  let correctLetters = [];
  let wrongLetters = [];
  let remainingGuesses = 6;
  let gameOver = false;
  let difficulty = "Easy";

  // Initialize Game
  function initGame() {
    correctLetters = [];
    wrongLetters = [];
    gameOver = false;

    gameMessageEl.textContent = "";
    gameMessageEl.style.color = "white";

    // Get difficulty
    const d = get_difficulty(difficulty_dropdown);
    remainingGuesses = d.remainingGuesses;
    difficulty = d.difficulty;

    // Pick random category + word
    const categories = Object.keys(words);

    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];

    const wordList = words[randomCategory];

    selectedWord = wordList[Math.floor(Math.random() * wordList.length)];

    // Update category
    categoryContainer.textContent = "Category: " + randomCategory;

    // Update guesses
    remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;

    // Hide hangman parts
    Object.values(hangmanParts).forEach((part) => {
      part.style.display = "none";
    });

    // Clear word display
    wordDisplay.innerHTML = "";

    // Split phrase into words
    const wordsInPhrase = selectedWord.split(" ");

    wordsInPhrase.forEach((word, wordIndex) => {
      const wordEl = document.createElement("div");

      wordEl.classList.add("word-group");

      // Create letters
      for (let i = 0; i < word.length; i++) {
        const letterEl = document.createElement("div");

        letterEl.classList.add("word-letter");

        letterEl.dataset.letter = word[i].toUpperCase();

        letterEl.textContent = "_";

        wordEl.appendChild(letterEl);
      }

      wordDisplay.appendChild(wordEl);

      // Space between words
      if (wordIndex < wordsInPhrase.length - 1) {
        const spaceEl = document.createElement("div");

        spaceEl.classList.add("word-space");

        wordDisplay.appendChild(spaceEl);
      }
    });

    // Create keyboard
    keyboard.innerHTML = "";

    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);

      const keyEl = document.createElement("button");

      keyEl.classList.add("keyboard-letter", "btn", "btn-outline-light");

      keyEl.textContent = letter;

      keyEl.dataset.letter = letter;

      keyEl.addEventListener("click", () => handleGuess(letter));

      keyboard.appendChild(keyEl);
    }
  }

  // Handle Guess
  function handleGuess(letter) {
    if (
      gameOver ||
      correctLetters.includes(letter) ||
      wrongLetters.includes(letter)
    ) {
      return;
    }

    // Correct guess
    if (selectedWord.toUpperCase().includes(letter)) {
      correctLetters.push(letter);

      updateWordDisplay();

      const key = document.querySelector(
        `.keyboard-letter[data-letter="${letter}"]`,
      );

      if (key) {
        key.classList.add("correct", "used");
      }

      // Win check
      if (checkWin()) {
        gameOver = true;

        gameMessageEl.textContent = "Congrats! You Won!";

        gameMessageEl.style.color = "lime";
      }
    }

    // Wrong guess
    else {
      wrongLetters.push(letter);

      remainingGuesses--;

      remainingGuessesEl.textContent = `Remaining guesses: ${remainingGuesses}`;

      const key = document.querySelector(
        `.keyboard-letter[data-letter="${letter}"]`,
      );

      if (key) {
        key.classList.add("wrong", "used");
      }

      updateHangmanDrawing(difficulty);

      // Lose check
      if (remainingGuesses === 0) {
        gameOver = true;

        gameMessageEl.textContent = `Game Over! The word was: ${selectedWord}`;

        gameMessageEl.style.color = "red";

        hangmanParts.face.style.display = "block";

        // Reveal word
        document.querySelectorAll(".word-letter").forEach((el) => {
          el.textContent = el.dataset.letter;
        });
      }
    }
  }

  // Update Word Display
  function updateWordDisplay() {
    document.querySelectorAll(".word-letter").forEach((el) => {
      const letter = el.dataset.letter;

      if (correctLetters.includes(letter)) {
        el.textContent = letter;
      }
    });
  }

  // Check Win
  function checkWin() {
    return selectedWord
      .toUpperCase()
      .split("")
      .every((letter) => letter === " " || correctLetters.includes(letter));
  }

  // Update Hangman Drawing
  function updateHangmanDrawing(difficulty) {
    if (difficulty === "Easy") {
      switch (wrongLetters.length) {
        case 1:
          hangmanParts.head.style.display = "block";
          break;

        case 2:
          hangmanParts.body.style.display = "block";
          break;

        case 3:
          hangmanParts.leftArm.style.display = "block";
          break;

        case 4:
          hangmanParts.rightArm.style.display = "block";
          break;

        case 5:
          hangmanParts.leftLeg.style.display = "block";
          break;

        case 6:
          hangmanParts.rightLeg.style.display = "block";
          break;
      }
    }

    if (difficulty === "Medium") {
      switch (wrongLetters.length) {
        case 1:
          hangmanParts.head.style.display = "block";
          break;

        case 2:
          hangmanParts.body.style.display = "block";
          break;

        case 3:
          hangmanParts.leftArm.style.display = "block";
          hangmanParts.rightArm.style.display = "block";
          break;

        case 4:
          hangmanParts.leftLeg.style.display = "block";
          break;

        case 5:
          hangmanParts.rightLeg.style.display = "block";
          break;
      }
    }

    if (difficulty === "Hard") {
      switch (wrongLetters.length) {
        case 1:
          hangmanParts.head.style.display = "block";
          break;

        case 2:
          hangmanParts.body.style.display = "block";
          break;

        case 3:
          hangmanParts.leftArm.style.display = "block";
          hangmanParts.rightArm.style.display = "block";
          break;

        case 4:
          hangmanParts.leftLeg.style.display = "block";
          hangmanParts.rightLeg.style.display = "block";
          break;
      }
    }

    if (difficulty === "Advanced") {
      switch (wrongLetters.length) {
        case 1:
          hangmanParts.head.style.display = "block";
          break;

        case 2:
          hangmanParts.body.style.display = "block";

          hangmanParts.leftArm.style.display = "block";

          hangmanParts.rightArm.style.display = "block";

          break;

        case 3:
          hangmanParts.leftLeg.style.display = "block";

          hangmanParts.rightLeg.style.display = "block";

          break;
      }
    }
  }

  // Keyboard Support
  document.addEventListener("keydown", (e) => {
    if (/^[a-z]$/i.test(e.key)) {
      handleGuess(e.key.toUpperCase());
    }
  });

  // Reset Button
  resetBtn.addEventListener("click", initGame);

  // Difficulty Change
  difficulty_dropdown.addEventListener("change", () => {
    initGame();
  });

  // Start Game
  initGame();
});

// Difficulty Function
function get_difficulty(difficulty_dropdown) {
  const diff = difficulty_dropdown.value;

  if (diff === "easy") {
    return {
      difficulty: "Easy",
      remainingGuesses: 6,
    };
  }

  if (diff === "medium") {
    return {
      difficulty: "Medium",
      remainingGuesses: 5,
    };
  }

  if (diff === "hard") {
    return {
      difficulty: "Hard",
      remainingGuesses: 4,
    };
  }

  if (diff === "advanced") {
    return {
      difficulty: "Advanced",
      remainingGuesses: 3,
    };
  }

  // Default fallback
  return {
    difficulty: "Easy",
    remainingGuesses: 6,
  };
}
