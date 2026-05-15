import { useEffect, useRef, useState } from "react";
import GameLayout from "../../components/GameLayout.jsx";
import { getStoredScores, recordReactionAttempt } from "../../utils/scoreStorage.js";

function ReactionPage() {
  const [phase, setPhase] = useState("idle");
  const [message, setMessage] = useState("");
  const [scoreSummary, setScoreSummary] = useState(getStoredScores().reaction);
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
      setScoreSummary(recordReactionAttempt(reactionTime).reaction);
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
      <div className="score-pill-row">
        <span className="score-pill">
          Best Time:{" "}
          {scoreSummary.bestTime === null ? "--" : `${scoreSummary.bestTime} ms`}
        </span>
        <span className="score-pill">Completed Attempts: {scoreSummary.gamesPlayed}</span>
      </div>

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

export default ReactionPage;
