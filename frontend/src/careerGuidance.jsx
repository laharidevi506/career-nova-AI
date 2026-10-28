import { useState } from "react";
import axios from "axios";
import "./careerGuidance.css";

function CareerGuidance({ user, onBack }) {
  const [education, setEducation] = useState(
    user?.education || "BTech CSE"
  );

  const [interests, setInterests] = useState(
    user?.interests || ""
  );

  const [skills, setSkills] = useState(
    user?.skills || ""
  );

  const [goals, setGoals] = useState(
    user?.goals || ""
  );

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setCareers([]);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/career-guidance",
        {
          education,
          interests,
          skills,
          goals,
        }
      );

      const results = response.data?.careers;

      if (Array.isArray(results) && results.length > 0) {
        setCareers(results);
        setShowResults(true);
      } else {
        setError(
          "No career recommendations found. Please try again."
        );
      }
    } catch (err) {
      console.error("Career Guidance Error:", err);

      setError(
        typeof err.response?.data?.detail === "string"
          ? err.response.data.detail
          : err.response?.data?.message ||
            err.message ||
            "Unable to get recommendations. Please check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  }

  // Separate career results screen
  if (showResults) {
    return (
      <div className="career-page">
        <div className="career-container">
          <button
            type="button"
            className="back-button"
            onClick={() => setShowResults(false)}
          >
            ← Back to Form
          </button>

          <header className="career-header">
            <span className="career-badge">
              ✦ YOUR PERSONAL CAREER MENTOR
            </span>

            <h1>Your Career Recommendations</h1>

            <p>
              Explore career paths selected for your education,
              interests, skills, and goals.
            </p>
          </header>

          <section className="career-results">
            <h2>Your Recommended Career Paths</h2>

            <p>
              Explore each career, understand its required skills,
              and start building relevant projects.
            </p>

            <div className="career-results-grid">
              {careers.map((career, index) => (
                <article
                  className="career-result-card"
                  key={`${career.title || "career"}-${index}`}
                >
                  <span className="career-number">
                    CAREER OPTION {index + 1}
                  </span>

                  <h3>{career.title}</h3>

                  <p>{career.description}</p>

                  <h4>Why This Career?</h4>
                  <p>{career.reason}</p>

                  <h4>Required Skills</h4>

                  {Array.isArray(career.required_skills) ? (
                    <ul>
                      {career.required_skills.map(
                        (skill, skillIndex) => (
                          <li key={`${skill}-${skillIndex}`}>
                            {skill}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p>{career.required_skills}</p>
                  )}

                  <h4>Suggested Project</h4>
                  <p>{career.project}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="career-result-actions">
            <button
              type="button"
              className="career-submit-button"
              onClick={() => setShowResults(false)}
            >
              ← Edit My Details
            </button>

            <button
              type="button"
              className="career-submit-button"
              onClick={onBack}
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Career guidance form screen
  return (
    <div className="career-page">
      <div className="career-container">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          ← Back to Dashboard
        </button>

        <header className="career-header">
          <span className="career-badge">
            ✦ YOUR PERSONAL CAREER MENTOR
          </span>

          <h1>AI Career Guidance</h1>

          <p>
            Discover career options that match your education,
            interests, skills, and goals.
          </p>
        </header>

        <section className="career-form-card">
          <h2>Tell Us About Yourself</h2>

          <p className="career-form-description">
            Complete the details below to explore suitable career paths.
          </p>

          <form
            onSubmit={handleSubmit}
            className="career-form"
          >
            <div className="career-field">
              <label htmlFor="education">Education</label>

              <input
                id="education"
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Example: BTech CSE, 3rd year"
                required
              />
            </div>

            <div className="career-field">
              <label htmlFor="interests">Interests</label>

              <input
                id="interests"
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Example: Python, AI, web development"
                required
              />
            </div>

            <div className="career-field">
              <label htmlFor="skills">Current Skills</label>

              <input
                id="skills"
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Example: Python basics, HTML, SQL"
                required
              />
            </div>

            <div className="career-field">
              <label htmlFor="goals">Career Goals</label>

              <textarea
                id="goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Example: Become a software developer and get an internship"
                rows={3}
                required
              />
            </div>

            <button
              type="submit"
              className="career-submit-button"
              disabled={loading}
            >
              {loading
                ? "✦ Finding Your Career Options..."
                : "Get Career Recommendations →"}
            </button>
          </form>

          {loading && (
            <p className="career-loading" role="status">
              Our AI career mentor is analysing your details.
              Please wait...
            </p>
          )}

          {error && (
            <div
              className="career-error"
              role="alert"
            >
              {error}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default CareerGuidance;