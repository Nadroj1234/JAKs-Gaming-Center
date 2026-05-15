import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";
import { getStoredScores } from "../utils/scoreStorage.js";

function LeaderboardPage() {
  const [scores, setScores] = useState(getStoredScores());

  useEffect(() => {
    function refreshScores() {
      setScores(getStoredScores());
    }

    refreshScores();
    window.addEventListener("focus", refreshScores);

    return () => {
      window.removeEventListener("focus", refreshScores);
    };
  }, []);

  return (
    <div className="app-shell">
      <SiteHeader title="Leaderboard" />
      <main className="screen leaderboard-screen">
        <section className="leaderboard-card">
          <h2 className="section-title">Your Local Scores</h2>

          <div className="leaderboard-grid">
            <article className="leaderboard-panel">
              <h3>Rock Paper Scissors</h3>
              <p>Rounds Played: {scores.rps.rounds}</p>
              <p>Wins: {scores.rps.wins}</p>
              <p>Ties: {scores.rps.ties}</p>
              <p>Losses: {scores.rps.losses}</p>
              <p>Best Win Streak: {scores.rps.bestWinStreak}</p>
            </article>

            <article className="leaderboard-panel">
              <h3>Memory Game</h3>
              <p>Wins: {scores.memory.wins}</p>
              <p>Games Completed: {scores.memory.gamesPlayed}</p>
              <p>
                Best Score:{" "}
                {scores.memory.bestMoves === null
                  ? "No score yet"
                  : `${scores.memory.bestMoves} moves`}
              </p>
              <p>
                Best Time Left:{" "}
                {scores.memory.bestTimeRemaining === null
                  ? "No score yet"
                  : `${scores.memory.bestTimeRemaining}s`}
              </p>
            </article>

            <article className="leaderboard-panel">
              <h3>Reaction Game</h3>
              <p>Completed Attempts: {scores.reaction.gamesPlayed}</p>
              <p>
                Best Time:{" "}
                {scores.reaction.bestTime === null
                  ? "No score yet"
                  : `${scores.reaction.bestTime} ms`}
              </p>
            </article>

            <article className="leaderboard-panel">
              <h3>Hangman</h3>
              <p>Games Played: {scores.hangman.gamesPlayed}</p>
              <p>Wins: {scores.hangman.wins}</p>
              <p>Losses: {scores.hangman.losses}</p>
              <p>Best Win Streak: {scores.hangman.bestWinStreak}</p>
              <p>
                Best Time Left:{" "}
                {scores.hangman.bestTimeRemaining === null
                  ? "No score yet"
                  : `${scores.hangman.bestTimeRemaining}s`}
              </p>
            </article>
          </div>

          <div className="leaderboard-sections">
            <section className="leaderboard-table-card">
              <h3>Fastest Reaction Times</h3>
              <LeaderboardList
                emptyText="Play the reaction game to set your first score."
                items={scores.reaction.attempts.map((attempt, index) => ({
                  id: `${attempt.playedAt}-${index}`,
                  primary: `${attempt.timeMs} ms`,
                  secondary: formatDate(attempt.playedAt),
                }))}
              />
            </section>

            <section className="leaderboard-table-card">
              <h3>Best Memory Runs</h3>
              <LeaderboardList
                emptyText="Finish a memory game to add a score."
                items={scores.memory.recentWins
                  .slice()
                  .sort((first, second) => first.moves - second.moves)
                  .map((win, index) => ({
                    id: `${win.playedAt}-${index}`,
                    primary: `${win.moves} moves`,
                    secondary: `${formatDate(win.playedAt)} - ${win.timeRemainingSec}s left`,
                  }))}
              />
            </section>

            <section className="leaderboard-table-card">
              <h3>Recent RPS Results</h3>
              <LeaderboardList
                emptyText="Play Rock Paper Scissors to track your record."
                items={scores.rps.recentResults.map((result, index) => ({
                  id: `${result.playedAt}-${index}`,
                  primary: capitalize(result.outcome),
                  secondary: formatDate(result.playedAt),
                }))}
              />
            </section>

            <section className="leaderboard-table-card">
              <h3>Recent Hangman Results</h3>
              <LeaderboardList
                emptyText="Play Hangman to track wins and losses."
                items={scores.hangman.recentResults.map((result, index) => ({
                  id: `${result.playedAt}-${index}`,
                  primary: `${capitalize(result.outcome)} - ${result.difficulty}`,
                  secondary: `${formatDate(result.playedAt)} - ${result.remainingGuesses} guesses left - ${result.timeRemainingSec}s left`,
                }))}
              />
            </section>
          </div>

          <div className="hub-actions">
            <Link className="btn game-btn" to="/games">
              Play More Games
            </Link>
            <Link className="btn home-btn" to="/hangman">
              Open Hangman
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function LeaderboardList({ emptyText, items }) {
  if (items.length === 0) {
    return <p className="leaderboard-empty">{emptyText}</p>;
  }

  return (
    <div className="leaderboard-list">
      {items.map((item, index) => (
        <div className="leaderboard-row" key={item.id}>
          <span className="leaderboard-rank">#{index + 1}</span>
          <div className="leaderboard-copy">
            <strong>{item.primary}</strong>
            <span>{item.secondary}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatDate(value) {
  return new Date(value).toLocaleDateString();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default LeaderboardPage;
