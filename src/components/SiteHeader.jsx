import { Link } from "react-router-dom";
import logo from "../../images/JAK_Games.png";

function SiteHeader({ title, homeLink = "/" }) {
  return (
    <header className="site-header">
      <div className="site-header-bar">
        <Link className="site-brand" to={homeLink}>
          <img src={logo} alt="JAK Games Logo" className="site-brand-logo" />
          <div className="site-brand-copy">
            <span className="site-brand-kicker">Arcade Hub</span>
            <h1 className="main_header">{title}</h1>
          </div>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <Link className="site-nav-link" to="/">
            Home
          </Link>
          <Link className="site-nav-link" to="/games">
            Games
          </Link>
          <Link className="site-nav-link" to="/hangman">
            Hangman
          </Link>
          <Link className="site-nav-link" to="/leaderboard">
            Leaderboard
          </Link>
          <a
            className="btn home-btn site-discord-btn"
            href="https://discord.gg/eCXNTyHtK"
            rel="noreferrer"
            target="_blank"
          >
            Discord
          </a>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
