import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";

const gameCards = [
  {
    title: "Rock Paper Scissors",
    to: "/games/rps",
    description:
      "A quick pick-and-counter match where streaks matter and every round counts.",
  },
  {
    title: "Memory Game",
    to: "/games/memory",
    description:
      "Match the board in as few moves as possible and try to beat your best score.",
  },
  {
    title: "Reaction Game",
    to: "/games/reaction",
    description:
      "Wait for the signal, click fast, and chase a lower reaction time every round.",
  },
];

function GamesHubPage() {
  return (
    <div className="app-shell site-surface">
      <SiteHeader title="JAK's Footy Games" />
      <main className="screen hub-screen">
        <section className="hub-hero">
          <div className="section-heading">
            <p className="eyebrow">Arcade Lobby</p>
            <h2 className="section-title">Choose your next challenge</h2>
            <p className="hub-subtext">
              Pick a quick match, chase a better personal best, or head into
              Hangman for a longer word challenge.
            </p>
          </div>

          <div className="hub-actions">
            <Link className="btn home-btn" to="/leaderboard">
              Leaderboard
            </Link>
            <Link className="btn game-btn" to="/hangman">
              Hangman
            </Link>
          </div>
        </section>

        <section className="game-grid">
          {gameCards.map((game) => (
            <Link
              key={game.to}
              className="game-card enhanced-card"
              to={game.to}
            >
              <span className="card-kicker">Quick Play</span>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <span className="card-cta">Launch Game</span>
            </Link>
          ))}
          <Link className="game-card enhanced-card special-card" to="/hangman">
            <span className="card-kicker">Word Mode</span>
            <h3>Hangman</h3>
            <p>
              Take on categories, difficulties, and a longer-form challenge with
              saved results.
            </p>
            <span className="card-cta">Open Hangman</span>
          </Link>
        </section>

        <section className="content-section compact-section">
          <div className="feature-grid">
            <article className="feature-card">
              <h4>Track Progress</h4>
              <p>
                Wins, streaks, reaction times, and memory scores save locally as
                you play.
              </p>
            </article>
            <article className="feature-card">
              <h4>Fast Sessions</h4>
              <p>
                Each game is designed for quick rounds so the site feels easy to
                revisit.
              </p>
            </article>
            <article className="feature-card">
              <h4>More Arcade Feel</h4>
              <p>
                The hub now works more like a real landing page instead of a
                plain menu.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>JAK's Footy Games</strong>
          <p>
            Choose a route, set a score, and keep climbing your local
            leaderboard.
          </p>
        </div>
        <div className="site-footer-links">
          <Link to="/">Home</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/hangman">Hangman</Link>
        </div>
      </footer>
    </div>
  );
}

export default GamesHubPage;
