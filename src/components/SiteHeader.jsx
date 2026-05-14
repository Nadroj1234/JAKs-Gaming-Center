import { Link } from "react-router-dom";

function SiteHeader({ title, homeLink = "/" }) {
  return (
    <header>
      <div className="header">
        <h1 className="main_header">{title}</h1>
        <div className="home_button_div">
          <Link className="btn home-btn" to={homeLink}>
            Home
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
