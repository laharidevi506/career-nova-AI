import { useEffect, useState } from "react";
import "./ProgressTracking.css";

const API = "http://127.0.0.1:8000";

function ProgressTracking({ onBack }) {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [category, setCategory] = useState("General");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(String(parsedUser.id || ""));
      } catch {
        setError("Unable to read the logged-in user. Please log in again.");
      }
    }
  }, []);

  useEffect(() => {
    if (userId) loadTasks();
  }, [userId]);

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/progress/${encodeURIComponent(userId)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to load progress.");
      }

      setTasks(Array.isArray(data.tasks) ? data.tasks : []);
    } catch (err) {
      setError(err.message || "Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  async function addTask(event) {
    event.preventDefault();

    if (!taskTitle.trim()) return;

    try {
      setError("");

      const response = await fetch(`${API}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: Number(userId),
          task_title: taskTitle.trim(),
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to add task.");
      }

      setTaskTitle("");
      await loadTasks();
    } catch (err) {
      setError(err.message || "Unable to add task.");
    }
  }

  async function toggleTask(task) {
    try {
      setError("");

      const response = await fetch(
        `${API}/progress/${task.id}/toggle`,
        { method: "PATCH" }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to update task.");
      }

      await loadTasks();
    } catch (err) {
      setError(err.message || "Unable to update task.");
    }
  }

  async function deleteTask(taskId) {
    try {
      setError("");

      const response = await fetch(`${API}/progress/${taskId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Unable to delete task.");
      }

      await loadTasks();
    } catch (err) {
      setError(err.message || "Unable to delete task.");
    }
  }

  const completed = tasks.filter((task) => task.is_completed).length;
  const percentage = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  if (!userId) {
    return (
      <main className="progress-page">
        <button className="progress-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <section className="progress-empty">
          <h2>Login Required</h2>
          <p>Please log in to track your personal learning progress.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="progress-page">
      <button className="progress-back" onClick={onBack}>
        ← Back to Dashboard
      </button>

      <section className="progress-hero">
        <div>
          <span className="progress-eyebrow">YOUR LEARNING JOURNEY</span>
          <h1>Progress Tracking</h1>
          <p>Small steps every day lead to big achievements.</p>
        </div>
        <div className="progress-hero-icon">🚀</div>
      </section>

      {error && <div className="progress-error">{error}</div>}

      <section className="progress-stats">
        <article className="progress-stat">
          <span>📚</span>
          <p>Total Tasks</p>
          <strong>{tasks.length}</strong>
        </article>

        <article className="progress-stat">
          <span>✅</span>
          <p>Completed</p>
          <strong>{completed}</strong>
        </article>

        <article className="progress-stat">
          <span>⏳</span>
          <p>Remaining</p>
          <strong>{tasks.length - completed}</strong>
        </article>

        <article className="progress-stat">
          <span>🎯</span>
          <p>Overall Progress</p>
          <strong>{percentage}%</strong>
        </article>
      </section>

      <section className="progress-card">
        <div className="progress-section-heading">
          <div>
            <h2>Your Progress</h2>
            <p>Keep moving towards your goals.</p>
          </div>
          <strong>{percentage}%</strong>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Overall learning progress"
        >
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </section>

      <section className="progress-card">
        <h2>➕ Add a Learning Task</h2>
        <p className="progress-muted">
          Add a goal, practice activity, or project to track.
        </p>

        <form className="progress-form" onSubmit={addTask}>
          <label>
            Task name
            <input
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
              placeholder="e.g. Complete Python functions"
              maxLength={200}
              required
            />
          </label>

          <label>
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>General</option>
              <option>Programming</option>
              <option>Web Development</option>
              <option>AI and Machine Learning</option>
              <option>Database</option>
              <option>Placement Preparation</option>
              <option>Project</option>
            </select>
          </label>

          <button type="submit" disabled={loading}>
            Add Task +
          </button>
        </form>
      </section>

      <section className="progress-card">
        <div className="progress-section-heading">
          <div>
            <h2>My Learning Tasks</h2>
            <p className="progress-muted">
              Mark a task complete when you finish it.
            </p>
          </div>
          <span className="progress-task-count">{tasks.length} tasks</span>
        </div>

        {loading ? (
          <p>Loading your progress...</p>
        ) : tasks.length === 0 ? (
          <div className="progress-empty">
            <span>🌱</span>
            <h3>Your journey starts here!</h3>
            <p>Add your first learning task above.</p>
          </div>
        ) : (
          <div className="progress-task-list">
            {tasks.map((task) => (
              <article className="progress-task" key={task.id}>
                <label className="progress-task-label">
                  <input
                    type="checkbox"
                    checked={Boolean(task.is_completed)}
                    onChange={() => toggleTask(task)}
                  />
                  <span>
                    <strong
                      className={
                        task.is_completed ? "progress-task-done" : ""
                      }
                    >
                      {task.task_title}
                    </strong>
                    <small>{task.category}</small>
                  </span>
                </label>

                <button
                  type="button"
                  className="progress-delete"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.task_title}`}
                >
                  Delete
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ProgressTracking;

