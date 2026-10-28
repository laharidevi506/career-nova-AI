import { useState } from "react";
import axios from "axios";
import "./PersonalizedRoadmap.css";

function PersonalizedRoadmap({ user, onBack }) {
  const [form, setForm] = useState({
    target_career: "",
    current_skills: "",
    daily_study_hours: 2,
    duration_weeks: 12,
    education: user?.education || "",
  });

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: name === "daily_study_hours" || name === "duration_weeks"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/personalized-roadmap",
        form
      );

      setRoadmap(response.data);
    } catch (err) {
      console.error("Personalized Roadmap Error:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to generate your roadmap. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (roadmap) {
    return (
      <div className="roadmap-page">
        <header className="roadmap-header">
          <button className="roadmap-back" onClick={() => setRoadmap(null)}>
            ← Back to Form
          </button>
          <h1>Your Personalized Roadmap</h1>
          <p>Your AI-generated learning journey starts here.</p>
        </header>

        <main className="roadmap-content">
          <section className="roadmap-overview">
            <span className="roadmap-badge">AI GENERATED</span>
            <h2>{roadmap.career}</h2>
            <p>{roadmap.overview}</p>

            <div className="roadmap-stats">
              <div>
                <strong>{roadmap.total_duration}</strong>
                <span>Total Duration</span>
              </div>
              <div>
                <strong>{roadmap.daily_study_hours} hrs/day</strong>
                <span>Daily Study Time</span>
              </div>
              <div>
                <strong>{roadmap.phases?.length || 0}</strong>
                <span>Learning Phases</span>
              </div>
            </div>
          </section>

          <h2 className="roadmap-section-title">Your Learning Journey</h2>

          <div className="roadmap-timeline">
            {roadmap.phases?.map((phase, index) => (
              <article className="roadmap-phase" key={phase.phase ?? index}>
                <div className="roadmap-phase-number">
                  {phase.phase ?? index + 1}
                </div>

                <div className="roadmap-phase-card">
                  <span className="roadmap-week">{phase.week_range}</span>
                  <h3>{phase.title}</h3>

                  <h4>Learning Goals</h4>
                  <ul>
                    {phase.goals?.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>

                  <h4>Topics to Learn</h4>
                  <div className="roadmap-tags">
                    {phase.topics?.map((topic, i) => (
                      <span key={i}>{topic}</span>
                    ))}
                  </div>

                  <h4>Practical Tasks</h4>
                  <ul>
                    {phase.tasks?.map((task, i) => (
                      <li key={i}>{task}</li>
                    ))}
                  </ul>

                  <div className="roadmap-project">
                    <strong>🛠️ Project</strong>
                    <p>{phase.project}</p>
                  </div>

                  <h4>Learning Resources</h4>
                  <ul>
                    {phase.resources?.map((resource, i) => (
                      <li key={i}>{resource}</li>
                    ))}
                  </ul>

                  <div className="roadmap-milestone">
                    <strong>🎯 Milestone:</strong> {phase.milestone}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="roadmap-extra">
            <h2>Final Projects</h2>

            {roadmap.final_projects?.map((project, index) => (
              <article className="roadmap-extra-card" key={index}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {project.skills_used?.join(", ")}
                </p>
              </article>
            ))}
          </section>

          <section className="roadmap-extra">
            <h2>Career Tips</h2>
            <ul>
              {roadmap.career_tips?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </section>

          <div className="roadmap-actions">
            <button onClick={() => setRoadmap(null)}>
              Create Another Roadmap
            </button>
            <button onClick={onBack}>Back to Dashboard</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="roadmap-page">
      <header className="roadmap-header">
        <button className="roadmap-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <span className="roadmap-badge">CAREER NOVA AI</span>
        <h1>Personalized Learning Roadmap</h1>
        <p>
          Turn your career goal into a structured learning journey powered by AI.
        </p>
      </header>

      <main className="roadmap-form-container">
        <form className="roadmap-form" onSubmit={handleSubmit}>
          <h2>Build Your Roadmap</h2>
          <p>Tell us about your goals and available study time.</p>

          <label htmlFor="target_career">Target Career</label>
          <input
            id="target_career"
            name="target_career"
            value={form.target_career}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
            required
            minLength={2}
            maxLength={200}
          />

          <label htmlFor="current_skills">Current Skills</label>
          <textarea
            id="current_skills"
            name="current_skills"
            value={form.current_skills}
            onChange={handleChange}
            placeholder="e.g. Python, HTML, CSS, JavaScript"
            required
            minLength={1}
            maxLength={2000}
            rows={4}
          />

          <label htmlFor="education">Education</label>
          <input
            id="education"
            name="education"
            value={form.education}
            onChange={handleChange}
            placeholder="e.g. B.Tech Computer Science, 3rd year"
            required
            minLength={2}
            maxLength={200}
          />

          <div className="roadmap-form-row">
            <div>
              <label htmlFor="daily_study_hours">Daily Study Hours</label>
              <select
                id="daily_study_hours"
                name="daily_study_hours"
                value={form.daily_study_hours}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((hours) => (
                  <option key={hours} value={hours}>
                    {hours} {hours === 1 ? "hour" : "hours"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="duration_weeks">Roadmap Duration</label>
              <select
                id="duration_weeks"
                name="duration_weeks"
                value={form.duration_weeks}
                onChange={handleChange}
              >
                {[4, 8, 12, 16, 24, 36, 52].map((weeks) => (
                  <option key={weeks} value={weeks}>
                    {weeks} weeks
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="roadmap-error">{error}</div>}

          <button
            type="submit"
            className="roadmap-submit"
            disabled={loading}
          >
            {loading ? "Generating Your Roadmap..." : "Generate My Roadmap →"}
          </button>

          {loading && (
            <p className="roadmap-loading">
              Gemini AI is creating your personalized learning plan. This may
              take a little while.
            </p>
          )}
        </form>
      </main>
    </div>
  );
}

export default PersonalizedRoadmap;

