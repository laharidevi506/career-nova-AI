import { useState } from "react";
import axios from "axios";

const API_URL = "https://career-nova-ai-backend.onrender.com";
function Auth({ onLoginSuccess, onBack }) {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    education: "",
    interests: "",
    skills: "",
    goals: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axios.post(`${API_URL}/login`, {
          email: form.email,
          password: form.password,
        });

        onLoginSuccess(response.data.user);
      } else {
        const response = await axios.post(`${API_URL}/register`, {
  full_name: form.full_name,
  email: form.email,
  password: form.password,
  education: form.education,
  interests: form.interests,
  skills: form.skills,
  goals: form.goals,
});

        setMessage(
          response.data.message ||
            "Account created successfully! Please log in."
        );

        setIsLogin(true);
        setForm((previous) => ({
          ...previous,
          password: "",
        }));
      }
    } catch (error) {
  console.error("Career Nova AI error:", error);

  const detail = error.response?.data?.detail;

  setMessage(
    typeof detail === "string"
      ? detail
      : Array.isArray(detail)
      ? detail.map((item) => item.msg).join(", ")
      : error.message || "Something went wrong."
  );
}finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "35px 16px",
      background:
        "linear-gradient(135deg, #f7f2ff 0%, #eee5ff 50%, #fdf5ff 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    card: {
      width: "100%",
      maxWidth: "650px",
      padding: "32px",
      background: "#ffffff",
      borderRadius: "22px",
      boxShadow: "0 12px 45px rgba(100, 65, 160, 0.14)",
      boxSizing: "border-box",
    },
    back: {
      border: "none",
      background: "transparent",
      color: "#7651bd",
      cursor: "pointer",
      fontSize: "14px",
      marginBottom: "20px",
      padding: "6px 0",
    },
    logo: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#7146bd",
      marginBottom: "14px",
    },
    heading: {
      fontSize: "30px",
      color: "#30234a",
      margin: "8px 0",
    },
    subtitle: {
      color: "#777084",
      lineHeight: 1.6,
      marginBottom: "25px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "17px",
    },
    label: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      color: "#403450",
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "17px",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ded5ee",
      borderRadius: "9px",
      fontSize: "14px",
      boxSizing: "border-box",
      outlineColor: "#9870e5",
      background: "#fff",
    },
    textarea: {
      width: "100%",
      minHeight: "85px",
      padding: "12px",
      border: "1px solid #ded5ee",
      borderRadius: "9px",
      fontSize: "14px",
      boxSizing: "border-box",
      resize: "vertical",
      fontFamily: "Arial, sans-serif",
    },
    submit: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(90deg, #8054d6, #a36be8)",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "8px",
    },
    message: {
      padding: "12px",
      borderRadius: "8px",
      background: "#f3edff",
      color: "#62409a",
      fontSize: "14px",
      overflowWrap: "anywhere",
    },
    switchText: {
      textAlign: "center",
      color: "#777084",
      marginTop: "22px",
      fontSize: "14px",
    },
    switchButton: {
      color: "#8054d6",
      fontWeight: "bold",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button
          type="button"
          onClick={onBack}
          style={styles.back}
        >
          ← Back to Home
        </button>

        <div style={styles.logo}>🚀 Career Nova AI</div>

        <h1 style={styles.heading}>
          {isLogin ? "Welcome Back!" : "Create Your Profile"}
        </h1>

        <p style={styles.subtitle}>
          {isLogin
            ? "Log in to continue your career journey."
            : "Tell us about yourself so we can help you plan your career."}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div style={styles.grid}>
                <label style={styles.label}>
                  Full Name *
                  <input
                    style={styles.input}
                    name="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.full_name}
                    onChange={handleChange}
                    minLength={2}
                    maxLength={100}
                    required
                  />
                </label>

                <label style={styles.label}>
                  Education *
                  <select
                    style={styles.input}
                    name="education"
                    value={form.education}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select education</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="BTech">BTech</option>
                    <option value="BSc">BSc</option>
                    <option value="BCA">BCA</option>
                    <option value="MTech">MTech</option>
                    <option value="MCA">MCA</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <label style={styles.label}>
                Interests *
                <textarea
                  style={styles.textarea}
                  name="interests"
                  placeholder="Example: Artificial Intelligence, Web Development, Data Science"
                  value={form.interests}
                  onChange={handleChange}
                  required
                />
              </label>

              <label style={styles.label}>
                Current Skills *
                <textarea
                  style={styles.textarea}
                  name="skills"
                  placeholder="Example: Python basics, HTML, Communication"
                  value={form.skills}
                  onChange={handleChange}
                  required
                />
              </label>

              <label style={styles.label}>
                Career Goals *
                <textarea
                  style={styles.textarea}
                  name="goals"
                  placeholder="Example: Become an AI Engineer and get an internship"
                  value={form.goals}
                  onChange={handleChange}
                  required
                />
              </label>
            </>
          )}

          <div style={styles.grid}>
            <label style={styles.label}>
              Email Address *
              <input
                style={styles.input}
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label style={styles.label}>
              Password *
              <input
                style={styles.input}
                name="password"
                type="password"
                placeholder={
                  isLogin
                    ? "Enter your password"
                    : "Create a password (8+ characters)"
                }
                value={form.password}
                onChange={handleChange}
                minLength={isLogin ? 1 : 8}
                maxLength={128}
                required
              />
            </label>
          </div>

          {message && (
            <p role="status" style={styles.message}>
              {message}
            </p>
          )}

          <button
            type="submit"
            style={{
              ...styles.submit,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Log In"
              : "Create My Profile"}
          </button>
        </form>

        <p style={styles.switchText}>
          {isLogin
            ? "New to Career Nova AI?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            style={styles.switchButton}
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setForm((previous) => ({
                ...previous,
                password: "",
              }));
            }}
          >
            {isLogin ? "Create Profile" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;

