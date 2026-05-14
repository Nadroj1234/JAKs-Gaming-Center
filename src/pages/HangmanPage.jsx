import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { words } from "../data/hangmanWords.js";
import { getStoredScores, recordHangmanResult } from "../utils/scoreStorage.js";

const keyboardLetters = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index),
);

const hangmanDifficultyMap = {
  easy: { label: "Easy", remainingGuesses: 6 },
  medium: { label: "Medium", remainingGuesses: 5 },
  hard: { label: "Hard", remainingGuesses: 4 },
  advanced: { label: "Advanced", remainingGuesses: 3 },
};

function HangmanPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");
  const [selectedWord, setSelectedWord] = useState("");
  const [category, setCategory] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [scoreSummary, setScoreSummary] = useState(getStoredScores().hangman);
  const resultRecordedRef = useRef(false);

  const difficultySettings = hangmanDifficultyMap[difficulty];
  const remainingGuesses = difficultySettings.remainingGuesses - wrongLetters.length;

  function initGame(nextDifficulty = difficulty) {
    const categories = Object.keys(words);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const wordList = words[randomCategory];
    const nextWord = wordList[Math.floor(Math.random() * wordList.length)];

    setDifficulty(nextDifficulty);
    setSelectedWord(nextWord);
    setCategory(randomCategory);
    setCorrectLetters([]);
    setWrongLetters([]);
    setMessage("");
    setGameOver(false);
    resultRecordedRef.current = false;
  }

  useEffect(() => {
    initGame("easy");
  }, []);

  const revealedCharacters = useMemo(
    () =>
      selectedWord
        .toUpperCase()
        .split("")
        .map((character) =>
          character === " " || correctLetters.includes(character) ? character : "_",
        ),
    [correctLetters, selectedWord],
  );

  function handleGuess(letter) {
    if (
      !selectedWord ||
      gameOver ||
      correctLetters.includes(letter) ||
      wrongLetters.includes(letter)
    ) {
      return;
    }

    if (selectedWord.toUpperCase().includes(letter)) {
      setCorrectLetters((current) => [...current, letter]);
      return;
    }

    setWrongLetters((current) => [...current, letter]);
  }

  useEffect(() => {
    if (!selectedWord) {
      return;
    }

    const hasWon = selectedWord
      .toUpperCase()
      .split("")
      .every((character) => character === " " || correctLetters.includes(character));

    if (hasWon) {
      setGameOver(true);
      setMessage("Congrats! You Won!");
      if (!resultRecordedRef.current) {
        setScoreSummary(
          recordHangmanResult({
            won: true,
            difficulty: difficultySettings.label,
            remainingGuesses,
          }).hangman,
        );
        resultRecordedRef.current = true;
      }
      return;
    }

    if (remainingGuesses <= 0) {
      setGameOver(true);
      setMessage(`Game Over! The word was: ${selectedWord}`);
      if (!resultRecordedRef.current) {
        setScoreSummary(
          recordHangmanResult({
            won: false,
            difficulty: difficultySettings.label,
            remainingGuesses,
          }).hangman,
        );
        resultRecordedRef.current = true;
      }
    }
  }, [correctLetters, difficultySettings.label, remainingGuesses, selectedWord]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (/^[a-z]$/i.test(event.key)) {
        handleGuess(event.key.toUpperCase());
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const hangmanVisibility = getHangmanVisibility(
    difficultySettings.label,
    wrongLetters.length,
  );
  const messageClassName = `game-message${
    message.includes("Won") ? " message-success" : ""
  }${message.includes("Game Over") ? " message-danger" : ""}`;

  return (
    <div className="hangman-page">
      <div className="hangman-shell">
        <div className="hangman-toolbar">
          <button className="btn home-btn" onClick={() => navigate("/")} type="button">
            Home
          </button>
        </div>

        <div className="hangman-card">
          <div className="hangman-card-body">
            <h1 className="display-5">Hangman Game</h1>

            <div className="score-pill-row">
              <span className="score-pill">Wins: {scoreSummary.wins}</span>
              <span className="score-pill">Losses: {scoreSummary.losses}</span>
              <span className="score-pill">Best Streak: {scoreSummary.bestWinStreak}</span>
            </div>

            <div className="hangman-status">
              <p id="remaining-guesses" className="fs-5 mb-3">
                Remaining guesses: {remainingGuesses}
              </p>

              <div className="hangman-controls">
                <label htmlFor="difficulty_drop" className="fw-semibold">
                  Difficulty
                </label>
                <select
                  id="difficulty_drop"
                  className="form-select"
                  onChange={(event) => initGame(event.target.value)}
                  value={difficulty}
                >
                  {Object.entries(hangmanDifficultyMap).map(([value, settings]) => (
                    <option key={value} value={value}>
                      {settings.label}
                    </option>
                  ))}
                </select>
              </div>

              <p id="category" className="mt-3 fs-5">
                Category: {category}
              </p>
            </div>

            <div className="hangman-figure">
              <svg id="hangman-svg" width="220" height="220" viewBox="0 0 200 200">
                <line x1="20" y1="180" x2="100" y2="180" stroke="#ffffff" strokeWidth="4" />
                <line x1="60" y1="180" x2="60" y2="20" stroke="#ffffff" strokeWidth="4" />
                <line x1="60" y1="20" x2="140" y2="20" stroke="#ffffff" strokeWidth="4" />
                <line x1="140" y1="20" x2="140" y2="40" stroke="#ffffff" strokeWidth="4" />

                <circle
                  cx="140"
                  cy="60"
                  r="20"
                  stroke="#ffffff"
                  strokeWidth="3"
                  fill="transparent"
                  style={{ display: hangmanVisibility.head ? "block" : "none" }}
                />
                <line
                  x1="140"
                  y1="80"
                  x2="140"
                  y2="130"
                  stroke="#ffffff"
                  strokeWidth="3"
                  style={{ display: hangmanVisibility.body ? "block" : "none" }}
                />
                <line
                  x1="140"
                  y1="100"
                  x2="110"
                  y2="90"
                  stroke="#ffffff"
                  strokeWidth="3"
                  style={{ display: hangmanVisibility.leftArm ? "block" : "none" }}
                />
                <line
                  x1="140"
                  y1="100"
                  x2="170"
                  y2="90"
                  stroke="#ffffff"
                  strokeWidth="3"
                  style={{ display: hangmanVisibility.rightArm ? "block" : "none" }}
                />
                <line
                  x1="140"
                  y1="130"
                  x2="120"
                  y2="160"
                  stroke="#ffffff"
                  strokeWidth="3"
                  style={{ display: hangmanVisibility.leftLeg ? "block" : "none" }}
                />
                <line
                  x1="140"
                  y1="130"
                  x2="160"
                  y2="160"
                  stroke="#ffffff"
                  strokeWidth="3"
                  style={{ display: hangmanVisibility.rightLeg ? "block" : "none" }}
                />
                <g style={{ display: gameOver && remainingGuesses <= 0 ? "block" : "none" }}>
                  <line x1="130" y1="55" x2="135" y2="60" stroke="#ffffff" strokeWidth="2" />
                  <line x1="135" y1="55" x2="130" y2="60" stroke="#ffffff" strokeWidth="2" />
                  <line x1="145" y1="55" x2="150" y2="60" stroke="#ffffff" strokeWidth="2" />
                  <line x1="150" y1="55" x2="145" y2="60" stroke="#ffffff" strokeWidth="2" />
                  <path
                    d="M130 70 Q140 80 150 70"
                    stroke="#ffffff"
                    strokeWidth="2"
                    fill="transparent"
                  />
                </g>
              </svg>
            </div>

            <div className="word-display" id="word-display">
              {revealedCharacters.join("").split(" ").map((wordPart, wordIndex, parts) => (
                <div className="word-cluster" key={`${wordPart}-${wordIndex}`}>
                  <div className="word-group">
                    {wordPart.split("").map((character, index) => (
                      <div className="word-letter" key={`${character}-${index}`}>
                        {character}
                      </div>
                    ))}
                  </div>
                  {wordIndex < parts.length - 1 ? <div className="word-space" /> : null}
                </div>
              ))}
            </div>

            <div className="keyboard" id="keyboard">
              {keyboardLetters.map((letter) => {
                const isCorrect = correctLetters.includes(letter);
                const isWrong = wrongLetters.includes(letter);
                const className = `keyboard-letter${isCorrect ? " correct used" : ""}${
                  isWrong ? " wrong used" : ""
                }`;

                return (
                  <button
                    key={letter}
                    className={className}
                    disabled={isCorrect || isWrong || gameOver}
                    onClick={() => handleGuess(letter)}
                    type="button"
                  >
                    {letter}
                  </button>
                );
              })}
            </div>

            <div className={messageClassName} id="game-message">
              {message}
            </div>

            <button
              className="reset-btn"
              id="reset-btn"
              onClick={() => initGame(difficulty)}
              type="button"
            >
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getHangmanVisibility(difficultyLabel, wrongGuessCount) {
  const visibility = {
    head: false,
    body: false,
    leftArm: false,
    rightArm: false,
    leftLeg: false,
    rightLeg: false,
  };

  if (difficultyLabel === "Easy") {
    if (wrongGuessCount >= 1) visibility.head = true;
    if (wrongGuessCount >= 2) visibility.body = true;
    if (wrongGuessCount >= 3) visibility.leftArm = true;
    if (wrongGuessCount >= 4) visibility.rightArm = true;
    if (wrongGuessCount >= 5) visibility.leftLeg = true;
    if (wrongGuessCount >= 6) visibility.rightLeg = true;
  }

  if (difficultyLabel === "Medium") {
    if (wrongGuessCount >= 1) visibility.head = true;
    if (wrongGuessCount >= 2) visibility.body = true;
    if (wrongGuessCount >= 3) {
      visibility.leftArm = true;
      visibility.rightArm = true;
    }
    if (wrongGuessCount >= 4) visibility.leftLeg = true;
    if (wrongGuessCount >= 5) visibility.rightLeg = true;
  }

  if (difficultyLabel === "Hard") {
    if (wrongGuessCount >= 1) visibility.head = true;
    if (wrongGuessCount >= 2) visibility.body = true;
    if (wrongGuessCount >= 3) {
      visibility.leftArm = true;
      visibility.rightArm = true;
    }
    if (wrongGuessCount >= 4) {
      visibility.leftLeg = true;
      visibility.rightLeg = true;
    }
  }

  if (difficultyLabel === "Advanced") {
    if (wrongGuessCount >= 1) visibility.head = true;
    if (wrongGuessCount >= 2) {
      visibility.body = true;
      visibility.leftArm = true;
      visibility.rightArm = true;
    }
    if (wrongGuessCount >= 3) {
      visibility.leftLeg = true;
      visibility.rightLeg = true;
    }
  }

  return visibility;
}

export default HangmanPage;
