
import { useState } from "react";

import "./App.css";

import CareerGuidance from "./careerGuidance";
import SkillGapAnalysis from "./skillGapAnalysis";
import PersonalizedRoadmap from "./PersonalizedRoadmap";
import PlacementPreparation from "./PlacementPreparation";
import ResumeAnalyzer from "./ResumeAnalyzer";
import ProgressTracking from "./ProgressTracking";
import Chatbot from "./Chatbot";

const modules = [
  {
    icon: "◎",
    title: "AI Career Guidance",
    description:
      "Explore career options based on your education, interests, skills, and goals.",
    color: "purple",
  },
  {
    icon: "⌕",
    title: "Skill Gap Analysis",
    description:
      "Discover the skills you need to develop for your dream job.",
    color: "green",
  },
  {
    icon: "◫",
    title: "Personalized Roadmap",
    description:
      "Follow a structured learning plan to achieve your career goals.",
    color: "blue",
  },
  {
    icon: "▣",
    title: "Placement Preparation",
    description:
      "Prepare for interviews and improve your placement readiness.",
    color: "orange",
  },
  {
    icon: "▤",
    title: "Resume Analyzer",
    description:
      "Review your resume and identify areas for improvement.",
    color: "pink",
  },
  {
    icon: "▥",
    title: "Progress Tracking",
    description:
      "Monitor your learning activities and career progress.",
    color: "teal",
  },
  {
    icon: "💬",
    title: "AI Career Chatbot",
    description:
      "Chat with your AI career companion for career advice, skill development, and interview preparation.",
    color: "purple",
  },
];

function Dashboard({ user, onLogout }) {
  const name = user?.full_name || "Student";

  const [activeModule, setActiveModule] = useState(null);

  // AI Career Guidance
  if (activeModule === "AI Career Guidance") {
    return (
      <CareerGuidance
        user={user}
        onBack={() => setActiveModule(null)}
      />
    );
  }

  // Skill Gap Analysis
  if (activeModule === "Skill Gap Analysis") {
    return (
      <SkillGapAnalysis
        user={user}
        onBack={() => setActiveModule(null)}
      />
    );
  }

  // Personalized Roadmap
  if (activeModule === "Personalized Roadmap") {
    return (
      <PersonalizedRoadmap
        user={user}
        onBack={() => setActiveModule(null)}
      />
    );
  }

  // Placement Preparation
  if (activeModule === "Placement Preparation") {
    return (
      <PlacementPreparation
        onBack={() => setActiveModule(null)}
      />
    );
  }

  // Resume Analyzer
  if (activeModule === "Resume Analyzer") {
    return (
      <ResumeAnalyzer
        onBack={() => setActiveModule(null)}
      />
    );
  }

  // Progress Tracking
  if (activeModule === "Progress Tracking") {
    return (
      <ProgressTracking
        onBack={() => setActiveModule(null)}
      />
    );
  }

  // AI Career Chatbot
  if (activeModule === "AI Career Chatbot") {
    return (
      <Chatbot
        onBack={() => setActiveModule(null)}
      />
    );
  }

  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <div className="nav-inner">
          <a className="logo" href="#dashboard">
            <span className="logo-icon">🚀</span>
            <span>
              Career Nova <b>AI</b>
            </span>
          </a>

          <button
            type="button"
            className="login-btn"
            onClick={onLogout}
          >
            Logout ↗
          </button>
        </div>
      </header>

      <main>
        {/* Dashboard Welcome */}
        <section
          className="section"
          id="dashboard"
          style={{ minHeight: "75vh" }}
        >
          <div className="section-topline">
            <div>
              <div className="eyebrow small-eyebrow">
                <span>✦</span> YOUR PERSONAL CAREER SPACE
              </div>

              <h1>
                Welcome,{" "}
                <span className="gradient-text">{name}!</span>
              </h1>

              <p className="section-description">
                Your career journey starts here. Explore your modules
                and take the next step toward your dream career.
              </p>
            </div>
          </div>

          {/* Seven Career Modules */}
          <div className="feature-grid">
            {modules.map((module, index) => (
              <article
                className="feature-card"
                key={module.title}
                style={{ "--card-index": index }}
              >
                <div
                  className={`feature-icon ${module.color}`}
                >
                  {module.icon}
                </div>

                <h3>{module.title}</h3>

                <p>{module.description}</p>

                <button
                  type="button"
                  className={`round-arrow ${module.color}`}
                  aria-label={`Open ${module.title}`}
                  onClick={() => setActiveModule(module.title)}
                >
                  →
                </button>
              </article>
            ))}
          </div>

          {/* User Profile */}
          <section
            style={{
              marginTop: "40px",
              padding: "28px",
              borderRadius: "20px",
              background: "#f7f3ff",
              overflowWrap: "anywhere",
            }}
          >
            <div className="eyebrow small-eyebrow">
              <span>✦</span> YOUR INFORMATION
            </div>

            <h2>Your Profile</h2>

            <p>
              <strong>Full Name:</strong>{" "}
              {user?.full_name || "Not available"}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email || "Not available"}
            </p>

            <p>
              <strong>Education:</strong>{" "}
              {user?.education || "Not added"}
            </p>

            <p>
              <strong>Interests:</strong>{" "}
              {user?.interests || "Not added"}
            </p>

            <p>
              <strong>Skills:</strong>{" "}
              {user?.skills || "Not added"}
            </p>

            <p>
              <strong>Goals:</strong>{" "}
              {user?.goals || "Not added"}
            </p>
          </section>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <a
                className="logo footer-logo"
                href="#dashboard"
              >
                <span className="logo-icon">🚀</span>
                <span>
                  Career Nova <b>AI</b>
                </span>
              </a>

              <p>Your Future, Your Roadmap.</p>
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

export default Dashboard;

