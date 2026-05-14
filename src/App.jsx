import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import logo from "../images/JAK_Games.png";
import { words } from "./data/hangmanWords.js";

const memoryEmojis = ["🐶", "🐱", "🐸", "🦊"];
const keyboardLetters = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode(65 + index),
);
const hangmanDifficultyMap = {
  easy: { label: "Easy", remainingGuesses: 6 },
  medium: { label: "Medium", remainingGuesses: 5 },
  hard: { label: "Hard", remainingGuesses: 4 },
  advanced: { label: "Advanced", remainingGuesses: 3 },
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GamesHubPage />} />
      <Route path="/games/rps" element={<RpsPage />} />
      <Route path="/games/memory" element={<MemoryPage />} />
      <Route path="/games/reaction" element={<ReactionPage />} />
      <Route path="/hangman" element={<HangmanPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function SiteHeader({ title, homeLink = "/" }) {
  return (
    <header>
      <div className="header">
        <h1 className="main_header">{title}</h1>
        <div className="home_button_div">
          <Link className="btn home-btn" to={homeLink}>
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <div className="app-shell">
      <header>
        <div className="home-page-header">
          <img src={logo} alt="JAK Games Logo" className="home-logo" />
          <h1 className="main_header">JAK&apos;s Footy Games</h1>
          <a
            className="btn game-btn"
            href="https://discord.gg/eCXNTyHtK"
            rel="noreferrer"
            target="_blank"
          >
            Join Our Discord
          </a>
        </div>
      </header>

      <main id="home-screen" className="screen">
        <div className="home-content">
          <h2 className="welcome-header">Welcome to JAK&apos;s Footy Games</h2>
          <p className="home-text">
            Welcome to JAK&apos;s Footy Games. The number one game website!
          </p>
          <div className="home-actions">
            <Link className="btn game-btn enter-btn" to="/games">
              Enter Games
            </Link>
            <Link className="btn game-btn enter-btn" to="/hangman">
              Enter Hangman Game
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function GamesHubPage() {
  const gameCards = [
    { title: "Rock Paper Scissors", to: "/games/rps" },
    { title: "Memory Game", to: "/games/memory" },
    { title: "Reaction Game", to: "/games/reaction" },
  ];

  return (
    <div className="app-shell">
      <SiteHeader title="JAK Games" />
      <main className="screen">
        <h2 className="section-title">Select a Game</h2>
        <div className="game-container">
          {gameCards.map((game) => (
            <Link key={game.to} className="game-card" to={game.to}>
              <h3>{game.title}</h3>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function RpsPage() {
  const [resultText, setResultText] = useState("Make your move!");
  const [winnerText, setWinnerText] = useState("");

  function playRound(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    setResultText(`You picked ${playerChoice}. Computer picked ${computerChoice}.`);

    if (playerChoice === computerChoice) {
      setWinnerText("You Tied");
      return;
    }

    const playerWon =
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper");

    setWinnerText(playerWon ? "Winner: Player" : "Winner: Computer");
  }

  return (
    <GameLayout title="Rock Paper Scissors">
      <div className="buttons">
        <button className="btn game-btn" onClick={() => playRound("rock")} type="button">
          Rock
        </button>
        <button className="btn game-btn" onClick={() => playRound("paper")} type="button">
          Paper
        </button>
        <button
          className="btn game-btn"
          onClick={() => playRound("scissors")}
          type="button"
        >
          Scissors
        </button>
      </div>

      <p id="rps-result" className="status-text">
        {resultText}
      </p>
      <h2 className="winner_header">{winnerText}</h2>
    </GameLayout>
  );
}

function MemoryPage() {
  const [cards, setCards] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [winnerText, setWinnerText] = useState("");
  const timeoutRef = useRef(null);

  function startGame() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const shuffledCards = [...memoryEmojis, ...memoryEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: `${emoji}-${index}`, emoji }));

    setCards(shuffledCards);
    setSelectedIds([]);
    setMatchedIds([]);
    setWinnerText("");
  }

  useEffect(() => {
    startGame();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cards.length > 0 && matchedIds.length === cards.length) {
      setWinnerText("YOU WIN!!!");
    }
  }, [cards.length, matchedIds.length]);

  function handleCardClick(card) {
    if (selectedIds.length === 2 || selectedIds.includes(card.id) || matchedIds.includes(card.id)) {
      return;
    }

    const nextSelectedIds = [...selectedIds, card.id];
    setSelectedIds(nextSelectedIds);

    if (nextSelectedIds.length < 2) {
      return;
    }

    const [firstId, secondId] = nextSelectedIds;
    const firstCard = cards.find((entry) => entry.id === firstId);
    const secondCard = cards.find((entry) => entry.id === secondId);

    if (firstCard?.emoji === secondCard?.emoji) {
      setMatchedIds((current) => [...current, firstId, secondId]);
      setSelectedIds([]);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setSelectedIds([]);
    }, 800);
  }

  return (
    <GameLayout title="Memory Game">
      <div id="memory-board">
        {cards.map((card) => {
          const isFlipped = selectedIds.includes(card.id) || matchedIds.includes(card.id);
          const cardClassName = `card${isFlipped ? " flipped" : ""}${matchedIds.includes(card.id) ? " matched" : ""}`;

          return (
            <button
              key={card.id}
              className={cardClassName}
              onClick={() => handleCardClick(card)}
              type="button"
            >
              {card.emoji}
            </button>
          );
        })}
      </div>

      <div id="winner-div">{winnerText}</div>

      <div className="action-row">
        <button className="btn action-btn" onClick={startGame} type="button">
          Start Game
        </button>
        <button className="btn action-btn" onClick={startGame} type="button">
          Restart
        </button>
      </div>
    </GameLayout>
  );
}

function ReactionPage() {
  const [phase, setPhase] = useState("idle");
  const [message, setMessage] = useState("");
  const startTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function startGame() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setPhase("waiting");
    setMessage("Wait for green...");

    const delay = Math.random() * 3000 + 2000;
    timeoutRef.current = setTimeout(() => {
      startTimeRef.current = Date.now();
      setPhase("ready");
      setMessage("");
    }, delay);
  }

  function handleBoxClick() {
    if (phase === "ready") {
      const reactionTime = Date.now() - startTimeRef.current;
      setPhase("idle");
      setMessage(`Reaction Time: ${reactionTime} ms`);
      return;
    }

    if (phase === "waiting") {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setPhase("idle");
      setMessage("Too Early!");
    }
  }

  const reactionBoxClassName = `reaction-box${phase === "ready" ? " ready" : ""}`;
  const reactionLabel = phase === "ready" ? "CLICK!" : "WAIT";

  return (
    <GameLayout title="Reaction Game">
      <p className="reaction-instructions">
        Click the box as fast as you can when it appears!
      </p>

      <button className="btn action-btn start-btn" onClick={startGame} type="button">
        Start Game
      </button>

      <button
        id="reaction-box"
        className={reactionBoxClassName}
        onClick={handleBoxClick}
        type="button"
      >
        {reactionLabel}
      </button>

      <p id="reaction-time" className="status-text">
        {message}
      </p>
    </GameLayout>
  );
}

function GameLayout({ title, children }) {
  return (
    <div className="app-shell">
      <SiteHeader title="JAK Games" homeLink="/games" />
      <main className="screen">
        <h2 className="section-title">{title}</h2>
        {children}
        <Link className="btn back-btn" to="/games">
          Back
        </Link>
      </main>
    </div>
  );
}

function HangmanPage() {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");
  const [selectedWord, setSelectedWord] = useState("");
  const [category, setCategory] = useState("");
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);

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
  }

  useEffect(() => {
    initGame("easy");
  }, []);

  const revealedCharacters = useMemo(
    () =>
      selectedWord
        .toUpperCase()
        .split("")
        .map((character) => (character === " " || correctLetters.includes(character) ? character : "_")),
    [correctLetters, selectedWord],
  );

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
      return;
    }

    if (remainingGuesses <= 0) {
      setGameOver(true);
      setMessage(`Game Over! The word was: ${selectedWord}`);
    }
  }, [correctLetters, remainingGuesses, selectedWord]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (/^[a-z]$/i.test(event.key)) {
        handleGuess(event.key.toUpperCase());
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

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

  const hangmanVisibility = getHangmanVisibility(difficultySettings.label, wrongLetters.length);
  const messageClassName = `game-message${message.includes("Won") ? " message-success" : ""}${message.includes("Game Over") ? " message-danger" : ""}`;

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
                const className = `keyboard-letter${isCorrect ? " correct used" : ""}${isWrong ? " wrong used" : ""}`;

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

            <button className="reset-btn" id="reset-btn" onClick={() => initGame(difficulty)} type="button">
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

export default App;
