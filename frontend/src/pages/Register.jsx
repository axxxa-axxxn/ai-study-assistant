import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
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

import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await registerUser(formData);

      navigate("/login");
    } catch (err) {
      setError(err.message || "Unable to create your account.");
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
                Start your journey
              </div>

              <h2>
                Your learning.
                <br />
                <span>Reimagined.</span>
              </h2>

              <p>
                Create your account and bring your study material, quizzes,
                progress, and AI assistance together in one place.
              </p>

              <div className="auth-feature-list">
                <div className="auth-feature">
                  <div className="auth-feature-icon">
                    <Brain size={17} />
                  </div>

                  <div>
                    <strong>Intelligent Assistance</strong>
                    <span>Ask questions and understand difficult concepts.</span>
                  </div>
                </div>

                <div className="auth-feature">
                  <div className="auth-feature-icon">
                    <BookOpen size={17} />
                  </div>

                  <div>
                    <strong>Focused Study</strong>
                    <span>Keep your learning experience organized.</span>
                  </div>
                </div>

                <div className="auth-feature">
                  <div className="auth-feature-icon">
                    <Sparkles size={17} />
                  </div>

                  <div>
                    <strong>Keep Improving</strong>
                    <span>Monitor your progress and build better habits.</span>
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
            <Sparkles size={16} />
            <div>
              <strong>Smart Learning</strong>
              <span>Built for students</span>
            </div>
          </div>

          <div className="auth-floating-card auth-floating-card-two">
            <BookOpen size={15} />
            <span>Learn & improve</span>
          </div>
        </div>

        {/* ================= REGISTER FORM ================= */}
        <div className="auth-form-section">
          <div className="auth-card auth-register-card">
            <div className="auth-card-header">
              <div className="auth-mobile-logo">
                <GraduationCap size={23} />
              </div>

              <div>
                <span className="auth-form-kicker">GET STARTED</span>

                <h1>Create your account</h1>

                <p>
                  Join AI Study Assistant and start learning smarter.
                </p>
              </div>
            </div>

            {error && (
              <div className="auth-error">
                <span>!</span>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="auth-form">
              <div className="auth-input-group">
                <label htmlFor="name">Full name</label>

                <div className="auth-input-wrapper">
                  <User size={18} />

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

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
                <label htmlFor="password">Password</label>

                <div className="auth-input-wrapper">
                  <Lock size={18} />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>ALREADY HAVE AN ACCOUNT?</span>
            </div>

            <p className="auth-footer">
              Already registered?
              <Link to="/login">
                Sign in
                <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;