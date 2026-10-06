import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  BookOpen,
  Brain,
  ShieldCheck,
} from "lucide-react";

import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);

      if (!data.access_token) {
        throw new Error("Login failed: no access token received.");
      }

      login(data.access_token, data.user);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Decorative background */}
      <div className="auth-bg-shape auth-bg-shape-one"></div>
      <div className="auth-bg-shape auth-bg-shape-two"></div>
      <div className="auth-bg-grid"></div>

      <div className="auth-container">
        {/* ================= LEFT BRAND PANEL ================= */}
        <div className="auth-showcase">
          <div className="auth-showcase-content">
            <div className="auth-brand">
              <div className="auth-brand-icon">
                <GraduationCap size={25} strokeWidth={2.4} />
              </div>

              <div>
                <strong>AI Study Assistant</strong>
                <span>Smart learning platform</span>
              </div>
            </div>

            <div className="auth-showcase-main">
              <div className="auth-mini-badge">
                <span></span>
                AI-powered learning
              </div>

              <h2>
                Learn smarter.
                <br />
                <span>Achieve more.</span>
              </h2>

              <p>
                Your intelligent study companion for understanding concepts,
                practicing quizzes, tracking progress, and preparing for exams.
              </p>

              <div className="auth-feature-list">
                <div className="auth-feature">
                  <div className="auth-feature-icon">
                    <Brain size={17} />
                  </div>

                  <div>
                    <strong>AI Study Assistant</strong>
                    <span>Get intelligent help with your study material.</span>
                  </div>
                </div>

                <div className="auth-feature">
                  <div className="auth-feature-icon">
                    <BookOpen size={17} />
                  </div>

                  <div>
                    <strong>Organized Learning</strong>
                    <span>Study your subjects in one focused workspace.</span>
                  </div>
                </div>

                <div className="auth-feature">
                  <div className="auth-feature-icon">
                    <Sparkles size={17} />
                  </div>

                  <div>
                    <strong>Personalized Progress</strong>
                    <span>Track your learning journey as you improve.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-showcase-footer">
              <ShieldCheck size={14} />
              <span>Secure and designed for focused learning</span>
            </div>
          </div>

          <div className="auth-orbit auth-orbit-one"></div>
          <div className="auth-orbit auth-orbit-two"></div>

          <div className="auth-floating-card auth-floating-card-one">
            <Brain size={16} />
            <div>
              <strong>AI Assistant</strong>
              <span>Ready to help</span>
            </div>
          </div>

          <div className="auth-floating-card auth-floating-card-two">
            <Sparkles size={15} />
            <span>Study smarter</span>
          </div>
        </div>

        {/* ================= LOGIN FORM ================= */}
        <div className="auth-form-section">
          <div className="auth-card">
            <div className="auth-card-header">
              <div className="auth-mobile-logo">
                <GraduationCap size={23} />
              </div>

              <div>
                <span className="auth-form-kicker">WELCOME BACK</span>

                <h1>Welcome back</h1>

                <p>
                  Sign in to continue your learning journey.
                </p>
              </div>
            </div>

            {error && (
              <div className="auth-error">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-input-group">
                <label htmlFor="email">Email address</label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <div className="auth-label-row">
                  <label htmlFor="password">Password</label>
                </div>

                <div className="auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="auth-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>NEW TO AI STUDY ASSISTANT?</span>
            </div>

            <p className="auth-footer">
              Don't have an account?
              <Link to="/register">
                Create an account
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;