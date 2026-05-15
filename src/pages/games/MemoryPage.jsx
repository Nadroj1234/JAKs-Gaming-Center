import { useEffect, useRef, useState } from "react";
import GameLayout from "../../components/GameLayout.jsx";
import { getStoredScores, recordMemoryWin } from "../../utils/scoreStorage.js";

const memoryEmojis = ["🐶", "🐱", "🐸", "🦊"];
const MEMORY_TIME_LIMIT_SEC = 60;

function MemoryPage() {
  const [cards, setCards] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [winnerText, setWinnerText] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [scoreSummary, setScoreSummary] = useState(getStoredScores().memory);
  const [timeRemainingSec, setTimeRemainingSec] = useState(MEMORY_TIME_LIMIT_SEC);

  const timeoutRef = useRef(null);

  function startGame() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setTimeRemainingSec(MEMORY_TIME_LIMIT_SEC);

    const shuffledCards = [...memoryEmojis, ...memoryEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: `${emoji}-${index}`,
        emoji,
      }));

    setCards(shuffledCards);
    setSelectedIds([]);
    setMatchedIds([]);
    setWinnerText("");
    setGameStarted(true);
    setMoveCount(0);
  }

  useEffect(() => {
    if (!gameStarted) {
      return undefined;
    }

    const interval = setInterval(() => {
      setTimeRemainingSec((current) => {
        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (cards.length > 0 && matchedIds.length === cards.length) {
      setWinnerText("YOU WIN!!!");
      setScoreSummary(recordMemoryWin(moveCount, timeRemainingSec).memory);

      setGameStarted(false);

      setCards([]);
      setSelectedIds([]);
      setMatchedIds([]);
    }
  }, [cards, matchedIds, moveCount, timeRemainingSec]);

  useEffect(() => {
    if (gameStarted && timeRemainingSec <= 0) {
      setWinnerText("Time's up! Press Start Game or Restart to try again.");
      setGameStarted(false);
      setCards([]);
      setSelectedIds([]);
      setMatchedIds([]);
    }
  }, [gameStarted, timeRemainingSec]);

  function handleCardClick(card) {
    if (
      selectedIds.length === 2 ||
      selectedIds.includes(card.id) ||
      matchedIds.includes(card.id)
    ) {
      return;
    }

    const nextSelectedIds = [...selectedIds, card.id];
    setSelectedIds(nextSelectedIds);

    if (nextSelectedIds.length < 2) {
      return;
    }

    const [firstId, secondId] = nextSelectedIds;

    setMoveCount((current) => current + 1);

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
      <div className="score-pill-row">
        <span className="score-pill">Time Left: {timeRemainingSec}s</span>
        <span className="score-pill">Moves: {moveCount}</span>
        <span className="score-pill">Wins: {scoreSummary.wins}</span>
        <span className="score-pill">
          Best Score:{" "}
          {scoreSummary.bestMoves === null
            ? "--"
            : `${scoreSummary.bestMoves} moves`}
        </span>
        <span className="score-pill">
          Best Time Left:{" "}
          {scoreSummary.bestTimeRemaining === null
            ? "--"
            : `${scoreSummary.bestTimeRemaining}s`}
        </span>
      </div>

      {gameStarted ? (
        <div id="memory-board">
          {cards.map((card) => {
            const isFlipped =
              selectedIds.includes(card.id) || matchedIds.includes(card.id);

            const cardClassName = `card${
              isFlipped ? " flipped" : ""
            }${matchedIds.includes(card.id) ? " matched" : ""}`;

            return (
              <button
                key={card.id}
                className={cardClassName}
                onClick={() => handleCardClick(card)}
                type="button"
              >
                {isFlipped ? card.emoji : "?"}
              </button>
            );
          })}
        </div>
      ) : null}

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

export default MemoryPage;
