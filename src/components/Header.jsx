import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Independent Practice Demo</span>
          <span className="demo-label">DEMO ONLY</span>
        </div>
      </div>

      <div className="container brand-row">
        <Link to="/" className="brand">
          <div className="brand-logo">D</div>
          <div>
            <div className="brand-title">
              visa<span>.demo</span>
            </div>
            <small>Independent practice interface</small>
          </div>
        </Link>

        <div className="languages">
          EN <span>|</span> EL
        </div>
      </div>

      <nav className="container main-nav">
        <a href="#services">Services</a>
        <a href="#websites">Websites</a>
        <a href="#news">News</a>
        <a href="#information">Information</a>
      </nav>
    </header>
  );
}
