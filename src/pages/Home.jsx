import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Globe2,
  FileCheck2,
  BookOpen,
  Building2,
  ArrowRight,
  ShieldCheck,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Home.css";

const services = [
  {
    icon: FileCheck2,
    title: "Check application status",
    description:
      "Look up a fictional practice application using its reference and date of birth.",
    link: "/check-visa",
    label: "Check status",
  },
  {
    icon: BookOpen,
    title: "Application guide",
    description:
      "Learn how the sample application lookup works and what information it uses.",
    link: "/check-visa",
    label: "View guide",
  },
  {
    icon: Building2,
    title: "About this project",
    description:
      "Explore this independent demonstration of a public-service website layout.",
    link: "#about",
    label: "Learn more",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim().toLowerCase();

    if (
      query.includes("visa") ||
      query.includes("status") ||
      query.includes("application")
    ) {
      window.location.href = "/check-visa";
      return;
    }

    document
      .getElementById("services")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <div className="home-page">
        <header className="home-header">
          <div className="home-topbar">
            <div className="home-container home-topbar-inner">
              <span>Independent Service Demo</span>
              <span className="demo-indicator">
                <span className="demo-dot" />
                Practice environment
              </span>
            </div>
          </div>

          <div className="home-container home-brand-row">
            <Link to="/" className="home-brand">
              <span className="home-brand-mark">
                <Globe2 size={31} />
              </span>

              <span className="home-brand-text">
                <strong>Public Services</strong>
                <small>Independent Demo Portal</small>
              </span>
            </Link>

            <button
              type="button"
              className="home-menu-toggle"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>

            <nav className={`home-nav ${menuOpen ? "is-open" : ""}`}>
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Services
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <Link
                to="/check-visa"
                onClick={() => setMenuOpen(false)}
              >
                Check status
              </Link>
              <Link
                to="/admin"
                className="home-nav-admin"
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>

          <div className="home-container home-nav-bottom">
            <span>Explore services</span>
            <ChevronRight size={15} />
            <a href="#services">All services</a>
            <ChevronRight size={15} />
            <Link to="/check-visa">Application status demo</Link>
          </div>
        </header>

        <main>
          <section className="home-hero">
            <div className="home-container home-hero-grid">
              <div className="home-hero-copy">
                <span className="home-eyebrow">
                  <span className="home-eyebrow-line" />
                  INDEPENDENT PRACTICE PROJECT
                </span>

                <h1>
                  Public Services
                  <span>Demo Portal</span>
                </h1>

                <p className="home-hero-description">
                  Explore a simple, accessible demonstration of online public
                  services. Find sample information and check fictional
                  application records in one place.
                </p>

                <div className="home-search-block">
                  <label htmlFor="home-search">What are you looking for?</label>

                  <form className="home-search" onSubmit={handleSearch}>
                    <input
                      id="home-search"
                      type="search"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search services..."
                      aria-label="Search demo services"
                    />

                    <button type="submit" aria-label="Search">
                      <Search size={22} />
                    </button>
                  </form>

                  <div className="home-search-hint">
                    Popular:
                    <Link to="/check-visa">Application status</Link>
                    <span>·</span>
                    <a href="#services">Services</a>
                  </div>
                </div>
              </div>

              <div className="home-assistant">
                <div className="assistant-top">
                  <div className="assistant-avatar">
                    <MessageCircle size={29} />
                  </div>

                  <div>
                    <div className="assistant-title-row">
                      <h2>Digital Assistant</h2>
                      <span className="assistant-beta">DEMO</span>
                    </div>
                    <p>Explore the available demo services</p>
                  </div>
                </div>

                <div className="assistant-chat">
                  <div className="assistant-message">
                    Hello! Welcome to the independent demo portal. How can I
                    help you today?
                  </div>

                  <p className="assistant-prompt">Choose a service to continue</p>

                  <Link
                    to="/check-visa"
                    className="assistant-option"
                  >
                    <span className="assistant-option-icon">
                      <FileCheck2 size={19} />
                    </span>

                    <span>
                      <strong>Check application status</strong>
                      <small>Use fictional demo information</small>
                    </span>

                    <ArrowRight size={18} />
                  </Link>

                  <a href="#services" className="assistant-option">
                    <span className="assistant-option-icon">
                      <BookOpen size={19} />
                    </span>

                    <span>
                      <strong>Browse services</strong>
                      <small>Explore the demo features</small>
                    </span>

                    <ArrowRight size={18} />
                  </a>

                  <div className="assistant-disclaimer">
                    <ShieldCheck size={16} />
                    This assistant is a static demonstration, not a live
                    government service.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="home-trust-strip">
            <div className="home-container trust-strip-inner">
              <div className="trust-item">
                <ShieldCheck size={23} />
                <span>
                  <strong>Demo environment</strong>
                  <small>For practice purposes</small>
                </span>
              </div>

              <div className="trust-item">
                <FileCheck2 size={23} />
                <span>
                  <strong>Sample records</strong>
                  <small>Fictional application data</small>
                </span>
              </div>

              <div className="trust-item">
                <Globe2 size={23} />
                <span>
                  <strong>Easy access</strong>
                  <small>Simple online interface</small>
                </span>
              </div>
            </div>
          </section>

          <section className="home-services" id="services">
            <div className="home-container">
              <div className="home-section-heading">
                <div>
                  <span className="home-section-kicker">EXPLORE</span>
                  <h2>Services and information</h2>
                  <p>
                    Find the demo features and information you need.
                  </p>
                </div>

                <Link to="/check-visa" className="home-view-all">
                  View application lookup
                  <ArrowRight size={17} />
                </Link>
              </div>

              <div className="home-service-grid">
                {services.map((service) => {
                  const Icon = service.icon;

                  return (
                    <article className="home-service-card" key={service.title}>
                      <div className="service-icon">
                        <Icon size={27} />
                      </div>

                      <h3>{service.title}</h3>
                      <p>{service.description}</p>

                      <Link to={service.link} className="service-link">
                        {service.label}
                        <ArrowRight size={16} />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="home-feature" id="about">
            <div className="home-container home-feature-inner">
              <div className="home-feature-icon">
                <ShieldCheck size={34} />
              </div>

              <div className="home-feature-copy">
                <span className="home-section-kicker">ABOUT THIS PROJECT</span>
                <h2>A simple and accessible demo experience</h2>
                <p>
                  This independent project demonstrates a public-service-style
                  interface and a sample application lookup. It is not affiliated
                  with or endorsed by any government authority.
                </p>
              </div>

              <Link to="/check-visa" className="home-feature-button">
                Explore demo
                <ArrowRight size={17} />
              </Link>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
