import { useState } from "react";
import axios from "axios";
import "./SkillGapAnalysis.css";

function SkillGapAnalysis({ user, onBack }) {
  const [currentSkills, setCurrentSkills] = useState(
    user?.skills || ""
  );
  const [targetCareer, setTargetCareer] = useState(
    user?.goals || ""
  );
  const [education, setEducation] = useState(
    user?.education || "BTech CSE"
  );
  const [experience, setExperience] = useState("Beginner");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/skill-gap-analysis",
        {
          current_skills: currentSkills,
          target_career: targetCareer,
          education,
          experience_level: experience,
        }
      );

      setAnalysis(response.data);
    } catch (err) {
      console.error("Skill Gap Analysis Error:", err);
      setError(
        typeof err.response?.data?.detail === "string"
          ? err.response.data.detail
          : err.response?.data?.message ||
              "Unable to analyse your skills. Please check the backend."
      );
    } finally {
      setLoading(false);
    }
  }

  if (analysis) {
    return (
      <div className="career-page">
        <div className="career-container">
          <button className="back-button" onClick={() => setAnalysis(null)}>
            ← Back to Form
          </button>

          <header className="career-header">
            <span className="career-badge">✦ YOUR SKILL REPORT</span>
            <h1>Skill Gap Analysis Results</h1>
            <p>Here is your AI-generated skill development report.</p>
          </header>

          <section className="skill-report">
            {analysis.summary && (
              <>
                <h2>Analysis Summary</h2>
                <p>{analysis.summary}</p>
              </>
            )}

            {Array.isArray(analysis.current_strengths) && (
              <>
                <h2>Your Current Strengths</h2>
                <ul>
                  {analysis.current_strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}

            {Array.isArray(analysis.missing_skills) && (
              <>
                <h2>Skills to Develop</h2>
                {analysis.missing_skills.map((skill, index) => (
                  <article className="skill-report-card" key={index}>
                    <h3>{skill.skill}</h3>
                    <p>
                      <strong>Importance:</strong>{" "}
                      {skill.importance || "Not specified"}
                    </p>
                    <p>
                      <strong>Priority:</strong>{" "}
                      {skill.priority || "Not specified"}
                    </p>
                    <p>
                      <strong>Why it matters:</strong>{" "}
                      {skill.reason || "No explanation provided"}
                    </p>
                    {skill.learning_resource && (
                      <p>
                        <strong>Suggested resource:</strong>{" "}
                        {skill.learning_resource}
                      </p>
                    )}
                  </article>
                ))}
              </>
            )}

            {Array.isArray(analysis.action_plan) && (
              <>
                <h2>Your Action Plan</h2>
                <ol>
                  {analysis.action_plan.map((step, index) => (
                    <li key={index}>
                      {typeof step === "string"
                        ? step
                        : `${step.task || step.title || "Learning task"}${
                            step.duration ? ` — ${step.duration}` : ""
                          }`}
                    </li>
                  ))}
                </ol>
              </>
            )}

            <button
              className="career-submit-button"
              onClick={onBack}
            >
              Back to Dashboard
            </button>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="career-page">
      <div className="career-container">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>

        <header className="career-header">
          <span className="career-badge">✦ KNOW YOUR NEXT STEP</span>
          <h1>Skill Gap Analysis</h1>
          <p>
            Discover which skills you already have and what you need
            to learn for your target career.
          </p>
        </header>

        <section className="career-form-card">
          <h2>Analyse Your Skills</h2>
          <p className="career-form-description">
            Tell us about your current abilities and your target career.
          </p>

          <form className="career-form" onSubmit={handleSubmit}>
            <div className="career-field">
              <label htmlFor="sg-education">Education</label>
              <input
                id="sg-education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                required
                placeholder="Example: BTech CSE, 3rd year"
              />
            </div>

            <div className="career-field">
              <label htmlFor="sg-skills">Current Skills</label>
              <textarea
                id="sg-skills"
                value={currentSkills}
                onChange={(e) => setCurrentSkills(e.target.value)}
                rows={3}
                required
                placeholder="Example: Python, HTML, CSS, SQL"
              />
            </div>

            <div className="career-field">
              <label htmlFor="sg-target">Target Career</label>
              <input
                id="sg-target"
                value={targetCareer}
                onChange={(e) => setTargetCareer(e.target.value)}
                required
                placeholder="Example: AI Engineer or Full Stack Developer"
              />
            </div>

            <div className="career-field">
              <label htmlFor="sg-experience">Experience Level</label>
              <select
                id="sg-experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <button
              type="submit"
              className="career-submit-button"
              disabled={loading}
            >
              {loading ? "Analysing Skills..." : "Analyse My Skill Gaps →"}
            </button>
          </form>

          {loading && (
            <p role="status">
              AI is comparing your skills with your target career...
            </p>
          )}

          {error && (
            <div className="career-error" role="alert">
              {error}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default SkillGapAnalysis;

