import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader.jsx";

function HomePage() {
  return (
    <div className="app-shell site-surface">
      <SiteHeader title="JAK Games" />

      <main id="home-screen" className="screen home-screen">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow">Play quick. Track progress. Come back stronger.</p>
            <h2 className="welcome-header">JAK&apos;s Footy Games, built like a real arcade site.</h2>
            <p className="home-text">
              Jump into fast browser games, chase better scores, and keep your local
              leaderboard growing every time you play.
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
              <p>Arcade classics, reaction tests, and word challenges in one place.</p>
            </article>
            <article className="hero-stat-card">
              <span className="hero-stat-label">Progress</span>
              <strong>Local Score Saving</strong>
              <p>Your wins, best times, streaks, and move counts stick around automatically.</p>
            </article>
            <article className="hero-stat-card">
              <span className="hero-stat-label">Community</span>
              <strong>Discord Ready</strong>
              <p>Share scores and challenge friends from the linked server.</p>
            </article>
          </div>
        </section>

        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Why It Feels Better</p>
            <h3 className="section-title">A small arcade with real structure</h3>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <h4>Game Hub</h4>
              <p>Browse multiple games from one clean landing page instead of jumping between disconnected files.</p>
            </article>
            <article className="feature-card">
              <h4>Leaderboard</h4>
              <p>Track your best performances with saved scores, streaks, move counts, and fastest times.</p>
            </article>
            <article className="feature-card">
              <h4>Instant Play</h4>
              <p>Everything loads fast in the browser and routes smoothly between pages like a full site.</p>
            </article>
          </div>
        </section>

        <section className="content-section split-section">
          <div className="highlight-card">
            <p className="eyebrow">Featured Route</p>
            <h3>Head to the arcade lobby</h3>
            <p>
              The game hub now feels more like a destination page, with direct links to
              your main modes and a cleaner path into the leaderboard.
            </p>
            <Link className="btn game-btn" to="/games">
              Open Game Hub
            </Link>
          </div>

          <div className="highlight-card alt-card">
            <p className="eyebrow">Word Challenge</p>
            <h3>Hangman lives as its own feature</h3>
            <p>
              Hangman now stands on its own page while still feeding into the same saved
              score system and overall site flow.
            </p>
            <Link className="btn home-btn" to="/hangman">
              Play Hangman
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>JAK Games</strong>
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
