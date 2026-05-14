import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";

const gameCards = [
  { title: "Rock Paper Scissors", to: "/games/rps" },
  { title: "Memory Game", to: "/games/memory" },
  { title: "Reaction Game", to: "/games/reaction" },
];

function GamesHubPage() {
  return (
    <div className="app-shell">
      <SiteHeader title="JAK Games" />
      <main className="screen">
        <h2 className="section-title">Select a Game</h2>
        <div className="hub-actions">
          <Link className="btn home-btn" to="/leaderboard">
            Leaderboard
          </Link>
          <Link className="btn game-btn" to="/hangman">
            Hangman
          </Link>
        </div>
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

export default GamesHubPage;
