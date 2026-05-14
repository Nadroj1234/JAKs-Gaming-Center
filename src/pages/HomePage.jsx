import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";

function HomePage() {
  return (
    <div className="app-shell site-surface">
      <SiteHeader title="JAK's Footy Games" />

      <main id="home-screen" className="screen home-screen">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">
              Play quick. Track progress. Come back stronger.
            </p>
            <h2 className="welcome-header">
              JAK&apos;s Footy Games, built like a real arcade site.
            </h2>
            <p className="home-text">
              Jump into fast browser games, chase better scores, and keep your
              local leaderboard growing every time you play.
            </p>
            <div className="home-actions">
              <Link className="btn game-btn enter-btn" to="/games">
                Explore Games
              </Link>
              <Link className="btn game-btn enter-btn" to="/hangman">
                Open Hangman
              </Link>
              <Link className="btn home-btn leaderboard-btn" to="/leaderboard">
                View Leaderboard
              </Link>
            </div>
          </div>

          <div className="hero-card-stack">
            <article className="hero-stat-card">
              <span className="hero-stat-label">Game Modes</span>
              <strong>4 Live Games</strong>
              <p>
                Arcade classics, reaction tests, and word challenges in one
                place.
              </p>
            </article>
            <article className="hero-stat-card">
              <span className="hero-stat-label">Progress</span>
              <strong>Local Score Saving</strong>
              <p>
                Your wins, best times, streaks, and move counts stick around
                automatically.
              </p>
            </article>
            <article className="hero-stat-card">
              <span className="hero-stat-label">Community</span>
              <strong>Discord Ready</strong>
              <p>Share scores and challenge friends from the linked server.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>JAK's Footy Games</strong>
          <p>Fast browser games with persistent local score tracking.</p>
        </div>
        <div className="site-footer-links">
          <Link to="/games">Games</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/hangman">Hangman</Link>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
