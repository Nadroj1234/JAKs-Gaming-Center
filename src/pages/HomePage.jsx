import { Link } from "react-router-dom";
import logo from "../../images/JAK_Games.png";

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
            <Link className="btn home-btn leaderboard-btn" to="/leaderboard">
              View Leaderboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
