import { useState } from "react";
import GameLayout from "../../components/GameLayout.jsx";
import { getStoredScores, recordRpsResult } from "../../utils/scoreStorage.js";

function RpsPage() {
  const [resultText, setResultText] = useState("Make your move!");
  const [winnerText, setWinnerText] = useState("");
  const [scoreSummary, setScoreSummary] = useState(getStoredScores().rps);

  function playRound(playerChoice) {
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    setResultText(`You picked ${playerChoice}. Computer picked ${computerChoice}.`);

    if (playerChoice === computerChoice) {
      setWinnerText("You Tied");
      setScoreSummary(recordRpsResult("tie").rps);
      return;
    }

    const playerWon =
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper");

    setScoreSummary(recordRpsResult(playerWon ? "win" : "loss").rps);
    setWinnerText(playerWon ? "Winner: Player" : "Winner: Computer");
  }

  return (
    <GameLayout title="Rock Paper Scissors">
      <div className="score-pill-row">
        <span className="score-pill">Wins: {scoreSummary.wins}</span>
        <span className="score-pill">Ties: {scoreSummary.ties}</span>
        <span className="score-pill">Losses: {scoreSummary.losses}</span>
        <span className="score-pill">Best Streak: {scoreSummary.bestWinStreak}</span>
      </div>

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

export default RpsPage;
