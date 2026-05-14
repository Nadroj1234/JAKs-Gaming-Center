import { Link } from "react-router-dom";
import SiteHeader from "./SiteHeader.jsx";

function GameLayout({ title, children }) {
  return (
    <div className="app-shell">
      <SiteHeader title="JAK Games" homeLink="/games" />
      <main className="screen game-layout-screen">
        <section className="game-layout-card">
          <h2 className="section-title">{title}</h2>
          <div className="game-layout-content">{children}</div>
          <Link className="btn back-btn game-layout-back" to="/games">
            Back
          </Link>
        </section>
      </main>
    </div>
  );
}

export default GameLayout;
