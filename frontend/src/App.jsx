import { useState } from "react";
import "./App.css";
import Auth from "./Auth";
import Dashboard from "./dashboard";

const features = [
  {
    icon: "◎",
    title: "AI Career Guidance",
    description:
      "Explore career options based on your education, skills, interests, and goals.",
    color: "purple",
  },
  {
    icon: "⌕",
    title: "Skill Gap Analysis",
    description:
      "Compare your current skills with the skills required for your target job role.",
    color: "green",
  },
  {
    icon: "◫",
    title: "Personalized Roadmap",
    description:
      "Follow a structured 30-day, 60-day, or 90-day learning plan based on your goals.",
    color: "blue",
  },
  {
    icon: "▣",
    title: "Placement Preparation",
    description:
      "Prepare for interviews, improve your resume, and monitor your career readiness.",
    color: "orange",
  },
  {
    icon: "▤",
    title: "Resume Analyzer",
    description:
      "Identify areas where your resume could better match your target role.",
    color: "pink",
  },
  {
    icon: "▥",
    title: "Progress Tracking",
    description:
      "Track completed learning activities and monitor your progress toward your goals.",
    color: "teal",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  // Show authentication page
  if (showAuth) {
    return (
     <Auth
  onLoginSuccess={(user) => {
    localStorage.setItem("user", JSON.stringify(user));

    setCurrentUser(user);
    setShowAuth(false);
    setShowDashboard(true);
  }}
  onBack={() => setShowAuth(false)}
/>
    );
  }

  // Show dashboard after successful login
  if (showDashboard) {
    return (
      <Dashboard
        user={currentUser}
        onLogout={() => {
          setCurrentUser(null);
          setShowDashboard(false);
          setMenuOpen(false);
        }}
      />
    );
  }

  // Scroll to a section on the homepage
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <div className="nav-inner">
          <a
            className="logo"
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="logo-icon">🚀</span>

            <span>
              Career Nova <b>AI</b>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            <button
              className="nav-link active"
              onClick={() => scrollTo("home")}
            >
              Home
            </button>

            <button
              className="nav-link"
              onClick={() => scrollTo("features")}
            >
              Features
            </button>

            <button
              className="login-btn"
              onClick={() => setShowAuth(true)}
            >
              <span>♙</span> Login
            </button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="eyebrow">
                <span>✦</span> YOUR PERSONAL AI CAREER MENTOR
              </div>

              <h1>
                Discover Your Potential.
                <br />
                Build Your <span className="gradient-text">Future.</span>
              </h1>

              <p className="hero-description">
                Find the right career, identify your missing skills, and
                follow a personalized learning roadmap to prepare for your
                dream job.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-btn"
                  onClick={() => setShowAuth(true)}
                >
                  <span>🚀</span> Get Started <span>→</span>
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => scrollTo("features")}
                >
                  <span className="play-icon">▶</span> Explore Modules
                </button>
              </div>

              <div className="student-proof">
                <div className="avatar-stack">
                  <span>👩🏻</span>
                  <span>👨🏽</span>
                  <span>👩🏽</span>
                  <span>👨🏻</span>
                </div>

                <p>
                  Start building your <strong>future today</strong>
                </p>
              </div>
            </div>

            {/* Career Illustration */}
            <div className="hero-visual">
              <div className="visual-orb orb-one"></div>
              <div className="visual-orb orb-two"></div>

              <div className="floating-card skills-card">
                <span className="floating-icon">✦</span>
                <p>Your Skills</p>
                <span>+</span>
                <p>Our AI</p>
                <span>=</span>
                <strong>Your Future ♥</strong>
              </div>

              <div className="floating-card better-card">
                <span className="mini-icon green-icon">↗</span>

                <div>
                  <strong>Better Skills</strong>
                  <small>Keep improving</small>
                </div>
              </div>

              <div className="floating-card right-card">
                <span className="mini-icon purple-icon">◎</span>

                <div>
                  <strong>Right Career</strong>
                  <small>Find your path</small>
                </div>
              </div>

              <div className="floating-card growth-card">
                <span className="mini-icon blue-icon">🚀</span>

                <div>
                  <strong>Growth</strong>
                  <small>Build your future</small>
                </div>
              </div>

              <div className="mentor-scene">
                <div className="mentor-halo"></div>

                <div className="mentor-books">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                <div className="mentor-person">
                  <div className="mentor-hair"></div>

                  <div className="mentor-face">
                    <span className="eye eye-left"></span>
                    <span className="eye eye-right"></span>
                    <span className="smile"></span>
                  </div>

                  <div className="mentor-neck"></div>
                  <div className="mentor-body"></div>
                  <div className="mentor-arm"></div>
                </div>

                <div className="mentor-laptop">
                  <span>✦</span>
                </div>

                <div className="mentor-plant">
                  <span></span>
                  <span></span>
                  <span></span>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="features-section section"
          id="features"
        >
          <div className="section-topline">
            <div>
              <div className="eyebrow small-eyebrow">
                <span>✦</span> YOUR CAREER, SIMPLIFIED
              </div>

              <h2>Your Complete Career Toolkit</h2>

              <p className="section-description">
                A single platform to help you understand, plan, and prepare
                for your future career.
              </p>
            </div>
          </div>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <article
                className="feature-card"
                key={feature.title}
                style={{ "--card-index": index }}
              >
                <div className={`feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>

                <button
                  className={`round-arrow ${feature.color}`}
                  aria-label={`Learn about ${feature.title}`}
                  onClick={() =>
                    alert(
                      `${feature.title} will be developed as part of Career Nova AI.`
                    )
                  }
                >
                  →
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <a className="logo footer-logo" href="#home">
                <span className="logo-icon">🚀</span>

                <span>
                  Career Nova <b>AI</b>
                </span>
              </a>

              <p>Your Future, Your Roadmap.</p>
            </div>

            <div className="footer-links">
              <button onClick={() => scrollTo("home")}>
                Home
              </button>

              <button onClick={() => scrollTo("features")}>
                Features
              </button>
            </div>

            <div className="footer-socials">
              <span title="Career Nova AI">✦</span>
              <span title="Learn and grow">in</span>
              <span title="Video learning">▶</span>
            </div>

            <p className="copyright">
              © 2026 Career Nova AI. Built for a brighter future.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

