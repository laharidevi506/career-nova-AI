import { useState } from "react";
import "./ResumeAnalyzer.css";

function ResumeAnalyzer({ onBack }) {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload your resume first.");
      return;
    }

    if (!targetRole.trim()) {
      setError("Please enter your target job role.");
      return;
    }

    const extension = file.name.split(".").pop().toLowerCase();

    if (!["pdf", "docx"].includes(extension)) {
      setError("Please upload a PDF or DOCX resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("target_role", targetRole.trim());

      const response = await fetch(
  "https://career-nova-ai-backend.onrender.com/resume-analyzer",
  {
    method: "POST",
    body: formData,
  }
);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to analyze your resume."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the backend. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setTargetRole("");
    setResult(null);
    setError("");
  };

  // RESULTS SCREEN
  if (result) {
    const score = Math.max(
      0,
      Math.min(100, Number(result.resume_score) || 0)
    );

    return (
      <div className="resume-page">
        <header className="resume-header">
          <button className="resume-back" onClick={onBack}>
            ← Dashboard
          </button>

          <div>
            <h1>Resume Analysis Results</h1>
            <p>Your AI-powered resume review</p>
          </div>
        </header>

        <section className="resume-result-hero">
         <div
  className="resume-score-circle"
  style={{ "--score": `${score}%` }}
>
            <div className="resume-score-inner">
              <strong>{score}</strong>
              <span>/100</span>
            </div>
          </div>

          <div className="resume-hero-text">
            <span className="resume-badge">
              AI ANALYSIS COMPLETE
            </span>

            <h2>{result.target_role || targetRole}</h2>

            <h3>Resume Score</h3>

            <p>
              {result.summary ||
                "Your resume analysis has been completed."}
            </p>

            <div className="resume-score-track">
              <div
                className="resume-score-fill"
                style={{ width: `${score}%` }}
              />
            </div>

            <small>{score}% overall score</small>
          </div>
        </section>

        <div className="resume-result-grid">
          <ResultCard
            title="Strengths"
            icon="💪"
            items={result.strengths}
            type="success"
          />

          <ResultCard
            title="Weaknesses"
            icon="⚠️"
            items={result.weaknesses}
            type="warning"
          />

          <ResultCard
            title="Missing Skills"
            icon="🎯"
            items={result.missing_skills}
            type="skills"
          />

          <ResultCard
            title="ATS Feedback"
            icon="📄"
            items={result.ats_feedback}
            type="info"
          />

          <ResultCard
            title="Improvement Suggestions"
            icon="🚀"
            items={result.improvement_suggestions}
            type="suggestions"
          />

          <ResultCard
            title="Projects Feedback"
            icon="💻"
            items={result.projects_feedback}
            type="projects"
          />
        </div>

        <div className="resume-result-actions">
          <button
            className="resume-secondary-btn"
            onClick={handleReset}
          >
            Analyze Another Resume
          </button>

          <button
            className="resume-primary-btn"
            onClick={onBack}
          >
            Back to Dashboard →
          </button>
        </div>

        <p className="resume-disclaimer">
          This score is an AI-generated assessment, not a
          guarantee of ATS performance or selection.
        </p>
      </div>
    );
  }

  // UPLOAD SCREEN
  return (
    <div className="resume-page">
      <header className="resume-header">
        <button className="resume-back" onClick={onBack}>
          ← Dashboard
        </button>

        <div>
          <h1>Resume Analyzer</h1>
          <p>Improve your resume with AI-powered feedback</p>
        </div>
      </header>

      <section className="resume-intro">
        <div className="resume-intro-icon">📄</div>

        <h2>Make Your Resume Job-Ready</h2>

        <p>
          Upload your resume and discover your strengths,
          skill gaps, ATS compatibility suggestions, and
          ways to improve your chances of getting interviews.
        </p>
      </section>

      <form
        className="resume-form"
        onSubmit={handleSubmit}
      >
        <div className="resume-field">
          <label htmlFor="targetRole">
            Target Job Role <span>*</span>
          </label>

          <input
            id="targetRole"
            type="text"
            placeholder="e.g., Full Stack Developer"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            maxLength={200}
            required
          />

          <small>
            Enter the role you want to apply for.
          </small>
        </div>

        <div className="resume-field">
          <label htmlFor="resumeFile">
            Upload Resume <span>*</span>
          </label>

          <label
            htmlFor="resumeFile"
            className={`resume-upload-box ${
              file ? "resume-file-selected" : ""
            }`}
          >
            <div className="resume-upload-icon">
              {file ? "✅" : "☁️"}
            </div>

            <strong>
              {file
                ? file.name
                : "Click here to upload your resume"}
            </strong>

            <span>
              {file
                ? `${(file.size / 1024).toFixed(1)} KB`
                : "PDF or DOCX • Maximum 5 MB"}
            </span>

            <input
              id="resumeFile"
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setError("");
              }}
            />
          </label>

          {file && (
            <button
              type="button"
              className="resume-remove-file"
              onClick={() => setFile(null)}
            >
              Remove selected file
            </button>
          )}
        </div>

        {error && (
          <div className="resume-error" role="alert">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          className="resume-primary-btn resume-submit-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="resume-spinner" />
              Analyzing Resume...
            </>
          ) : (
            "✨ Analyze My Resume"
          )}
        </button>

        {loading && (
          <p className="resume-loading-text">
            AI is reviewing your resume. This may take a
            little time. Please wait...
          </p>
        )}
      </form>

      <section className="resume-features">
        <div>
          <span>📊</span>
          <h3>Resume Score</h3>
          <p>Understand your resume's overall quality.</p>
        </div>

        <div>
          <span>🎯</span>
          <h3>Skill Gap Analysis</h3>
          <p>Identify skills relevant to your target role.</p>
        </div>

        <div>
          <span>🚀</span>
          <h3>Actionable Feedback</h3>
          <p>Discover practical ways to improve.</p>
        </div>
      </section>
    </div>
  );
}

function ResultCard({ title, icon, items, type }) {
  return (
    <section className={`resume-result-card ${type}`}>
      <h3>
        <span>{icon}</span>
        {title}
      </h3>

      {!Array.isArray(items) || items.length === 0 ? (
        <p className="resume-empty-result">
          No specific feedback provided.
        </p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {typeof item === "string" ? (
                item
              ) : (
                <div className="resume-skill-item">
                  <strong>{item.skill}</strong>

                  {item.importance && (
                    <span
                      className={`resume-priority ${
                        item.importance.toLowerCase() === "high"
                          ? "high"
                          : item.importance.toLowerCase() === "medium"
                          ? "medium"
                          : "low"
                      }`}
                    >
                      {item.importance} Priority
                    </span>
                  )}

                  {item.reason && <p>{item.reason}</p>}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ResumeAnalyzer;