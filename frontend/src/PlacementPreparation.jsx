import { useState } from "react";
import axios from "axios";
import "./PlacementPreparation.css";

function PlacementPreparation({ onBack }) {
  const [form, setForm] = useState({
    target_role: "Full Stack Developer",
    education: "",
    experience_level: "Beginner",
    programming_language: "Python",
    interview_type: "Technical and HR",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/placement-preparation",
        form
      );

      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Unable to generate preparation questions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="placement-page">
        <button className="placement-back" onClick={() => setResult(null)}>
          ← Back to Form
        </button>

        <header className="placement-header">
          <span className="placement-badge">AI-POWERED PREPARATION</span>
          <h1>Your Placement Preparation</h1>
          <p>{result.overview}</p>
        </header>

        <section className="placement-section">
          <h2>💻 Technical Interview Questions</h2>
          {result.technical_questions?.map((item, index) => (
            <article className="placement-card" key={index}>
              <span className="placement-number">
                Question {index + 1} · {item.difficulty}
              </span>
              <h3>{item.question}</h3>
              <h4>Sample Answer</h4>
              <p>{item.sample_answer}</p>
              <h4>Explanation</h4>
              <p>{item.explanation}</p>
            </article>
          ))}
        </section>

        <section className="placement-section">
          <h2>⌨️ Coding Practice</h2>
          {result.coding_questions?.map((item, index) => (
            <article className="placement-card" key={index}>
              <span className="placement-number">
                Problem {index + 1} · {item.difficulty}
              </span>
              <h3>{item.question}</h3>
              <h4>Approach</h4>
              <p>{item.approach}</p>
              <h4>Sample Solution</h4>
              <pre className="placement-code">
                <code>{item.sample_solution}</code>
              </pre>
            </article>
          ))}
        </section>

        <section className="placement-section">
          <h2>🤝 HR Interview Questions</h2>
          {result.hr_questions?.map((item, index) => (
            <article className="placement-card" key={index}>
              <span className="placement-number">
                Question {index + 1}
              </span>
              <h3>{item.question}</h3>
              <h4>Sample Answer</h4>
              <p>{item.sample_answer}</p>
              <h4>Interview Tips</h4>
              <ul>
                {item.tips?.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="placement-section">
          <h2>⭐ Preparation Tips</h2>
          <div className="placement-card">
            <ul>
              {result.preparation_tips?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>

        <button className="placement-primary" onClick={() => setResult(null)}>
          Generate Another Preparation Plan
        </button>
      </div>
    );
  }

  return (
    <div className="placement-page">
      <button className="placement-back" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <header className="placement-header">
        <span className="placement-badge">CAREER NOVA AI</span>
        <h1>Placement Preparation</h1>
        <p>
          Prepare for technical interviews, coding rounds, and HR discussions
          with a personalized AI-generated guide.
        </p>
      </header>

      <form className="placement-form" onSubmit={handleSubmit}>
        <label>
          Target Job Role
          <input
            name="target_role"
            value={form.target_role}
            onChange={handleChange}
            minLength={2}
            maxLength={200}
            required
          />
        </label>

        <label>
          Education
          <input
            name="education"
            placeholder="e.g. B.Tech Computer Science, 3rd year"
            value={form.education}
            onChange={handleChange}
            minLength={2}
            maxLength={200}
            required
          />
        </label>

        <label>
          Experience Level
          <select
            name="experience_level"
            value={form.experience_level}
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>

        <label>
          Programming Language
          <select
            name="programming_language"
            value={form.programming_language}
            onChange={handleChange}
          >
            <option>Python</option>
            <option>Java</option>
            <option>C</option>
            <option>C++</option>
            <option>JavaScript</option>
          </select>
        </label>

        <label>
          Interview Type
          <select
            name="interview_type"
            value={form.interview_type}
            onChange={handleChange}
          >
            <option>Technical and HR</option>
            <option>Technical</option>
            <option>HR</option>
            <option>Coding Round</option>
          </select>
        </label>

        {error && <p className="placement-error">{error}</p>}

        <button
          className="placement-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Generating Your Preparation..." : "Generate Preparation →"}
        </button>

        <p className="placement-note">
          AI-generated questions and answers are intended for practice.
        </p>
      </form>
    </div>
  );
}

export default PlacementPreparation;

